(function () {
  // Nothing leaves the browser. There is no server behind this page: the card
  // is drawn on a canvas and handed straight back to the person who made it.
  // Their logo is read from their own device and never uploaded.

  var W = 1080, H = 1920;
  var canvas = document.getElementById('ec-canvas');
  var ctx = canvas.getContext('2d');
  var el = function (id) { return document.getElementById(id); };
  var name = el('ec-name'), line1 = el('ec-line1'), line2 = el('ec-line2');
  var logoInput = el('ec-logo'), logoClear = el('ec-logo-clear');
  var inkColour = el('ec-ink-colour');

  // A business's brand is its own. These are starting points, not a house
  // style — the logo swatches and "your own" picker are what matter.
  var PRESETS = [
    { hex: '#141414', label: 'Black' },
    { hex: '#FFFFFF', label: 'White' },
    { hex: '#F0EAD6', label: 'Cream' },
    { hex: '#2F4A3A', label: 'Forest green' },
    { hex: '#1E2F4D', label: 'Navy' },
    { hex: '#B5562E', label: 'Terracotta' },
    { hex: '#7A1F2B', label: 'Burgundy' }
  ];

  // Each lettering style pairs a headline face with a readable face for the
  // small lines, so nobody has to know which two fonts go together.
  var STYLES = [
    { id: 'elegant', label: 'Elegant', head: '"DM Serif Display"', headW: '400', body: 'Poppins', caps: false },
    { id: 'classic', label: 'Classic', head: '"Playfair Display"', headW: '600', body: 'Montserrat', caps: false },
    { id: 'modern', label: 'Modern', head: 'Poppins', headW: '600', body: 'Poppins', caps: false },
    { id: 'clean', label: 'Clean', head: 'Montserrat', headW: '600', body: 'Montserrat', caps: false },
    { id: 'bold', label: 'Bold', head: '"Bebas Neue"', headW: '400', body: 'Montserrat', caps: true },
    { id: 'friendly', label: 'Friendly', head: 'Nunito', headW: '800', body: 'Nunito', caps: false },
    { id: 'handwritten', label: 'Handwritten', head: 'Pacifico', headW: '400', body: 'Nunito', caps: false }
  ];

  var state = {
    bg: PRESETS[0].hex,
    style: 'elegant',
    ink: 'auto',
    inkHex: '#F7F3E8',
    logo: null // an Image, once loaded
  };
  var logoData = null; // the downscaled data URL, for remembering

  // ---- remembering settings on this phone ----------------------------------
  // Per-device convenience only. Private windows and blocked storage throw,
  // so every touch is guarded and the page works the same without it.
  var KEY = 'ec-end-card-v1';
  function save() {
    try {
      localStorage.setItem(KEY, JSON.stringify({
        bg: state.bg, style: state.style, ink: state.ink, inkHex: state.inkHex,
        name: name.value, line1: line1.value, line2: line2.value, logo: logoData
      }));
    } catch (e) { /* storage full or unavailable — fine */ }
  }
  function restore() {
    var s;
    try { s = JSON.parse(localStorage.getItem(KEY) || 'null'); } catch (e) { s = null; }
    if (!s) return;
    if (s.bg) state.bg = s.bg;
    if (s.style) state.style = s.style;
    if (s.ink) state.ink = s.ink;
    if (s.inkHex) state.inkHex = s.inkHex;
    if (typeof s.name === 'string') name.value = s.name;
    if (typeof s.line1 === 'string') line1.value = s.line1;
    if (typeof s.line2 === 'string') line2.value = s.line2;
    if (s.logo) useLogo(s.logo, false);
  }

  // ---- colour ---------------------------------------------------------------
  function luminance(hex) {
    var n = parseInt(hex.slice(1), 16);
    var c = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map(function (v) {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
  }
  function ink() {
    if (state.ink === 'custom') return state.inkHex;
    return luminance(state.bg) > 0.35 ? '#141414' : '#F7F3E8';
  }
  function soft() {
    var hex = ink();
    var n = parseInt(hex.slice(1), 16);
    return 'rgba(' + ((n >> 16) & 255) + ',' + ((n >> 8) & 255) + ',' + (n & 255) + ',0.7)';
  }
  function toHex(r, g, b) {
    return '#' + [r, g, b].map(function (v) { return v.toString(16).padStart(2, '0'); }).join('');
  }

  // Pull the main colours out of their logo so the background can match it.
  // Bucket every opaque pixel, count, keep the biggest few that are clearly
  // different from each other. Transparent pixels are the logo's cut-out, not
  // part of the brand, so they are skipped.
  function logoColours(img) {
    var s = 64, c = document.createElement('canvas');
    c.width = s; c.height = s;
    var x = c.getContext('2d');
    x.drawImage(img, 0, 0, s, s);
    var d;
    try { d = x.getImageData(0, 0, s, s).data; } catch (e) { return []; }
    var buckets = {};
    for (var i = 0; i < d.length; i += 4) {
      if (d[i + 3] < 200) continue;
      var r = d[i] & 0xF0, g = d[i + 1] & 0xF0, b = d[i + 2] & 0xF0;
      var k = r + ',' + g + ',' + b;
      buckets[k] = (buckets[k] || 0) + 1;
    }
    var sorted = Object.keys(buckets).sort(function (a, b) { return buckets[b] - buckets[a]; });
    var total = 0;
    sorted.forEach(function (k) { total += buckets[k]; });
    var picked = [];
    for (var j = 0; j < sorted.length && picked.length < 5; j++) {
      // A colour covering under 6% of the logo is almost always the blend
      // where two colours meet at an edge, not a real brand colour.
      if (buckets[sorted[j]] < total * 0.06) break;
      var p = sorted[j].split(',').map(Number);
      var far = picked.every(function (q) {
        return Math.abs(p[0] - q[0]) + Math.abs(p[1] - q[1]) + Math.abs(p[2] - q[2]) > 90;
      });
      if (far) picked.push(p);
    }
    return picked.map(function (p) { return toHex(p[0] + 8, p[1] + 8, p[2] + 8); });
  }

  // How light the logo is overall, ignoring its transparent cut-out.
  function logoLightness(img) {
    var s = 48, c = document.createElement('canvas');
    c.width = s; c.height = s;
    var x = c.getContext('2d');
    x.drawImage(img, 0, 0, s, s);
    var d;
    try { d = x.getImageData(0, 0, s, s).data; } catch (e) { return 0.5; }
    var sum = 0, n = 0;
    for (var i = 0; i < d.length; i += 4) {
      if (d[i + 3] < 200) continue;
      sum += luminance(toHex(d[i], d[i + 1], d[i + 2]));
      n++;
    }
    return n ? sum / n : 0.5;
  }

  // ---- drawing --------------------------------------------------------------
  function styleOf() {
    for (var i = 0; i < STYLES.length; i++) if (STYLES[i].id === state.style) return STYLES[i];
    return STYLES[0];
  }

  function fitName(text, st) {
    var maxW = W * 0.8;
    if (st.caps) text = text.toUpperCase();
    for (var size = 150; size >= 60; size -= 4) {
      ctx.font = st.headW + ' ' + size + 'px ' + st.head + ', Georgia, serif';
      var words = text.split(/\s+/).filter(Boolean), lines = [], cur = '';
      for (var i = 0; i < words.length; i++) {
        var test = cur ? cur + ' ' + words[i] : words[i];
        if (ctx.measureText(test).width <= maxW) { cur = test; }
        else { if (cur) lines.push(cur); cur = words[i]; }
      }
      if (cur) lines.push(cur);
      var fits = lines.length <= 3 && lines.every(function (l) { return ctx.measureText(l).width <= maxW; });
      if (fits) return { size: size, lines: lines };
    }
    return { size: 60, lines: [text] };
  }

  // Shrink a long line to fit before resorting to cutting it off: a
  // slightly smaller address beats a shortened one.
  function fitLine(text, weight, size, family, maxW) {
    for (var s = size; s >= Math.round(size * 0.7); s -= 2) {
      ctx.font = weight + ' ' + s + 'px ' + family;
      if (ctx.measureText(text).width <= maxW) return { text: text, font: ctx.font };
    }
    while (text.length && ctx.measureText(text + '…').width > maxW) text = text.slice(0, -1);
    return { text: text + '…', font: ctx.font };
  }

  function draw() {
    var st = styleOf();
    ctx.fillStyle = state.bg;
    ctx.fillRect(0, 0, W, H);
    ctx.textAlign = 'center';
    ctx.textBaseline = 'alphabetic';

    var nm = name.value.trim(), l1 = line1.value.trim(), l2 = line2.value.trim();
    if (!nm && !state.logo) nm = 'Your business';

    // Logo box: at most 64% wide and 26% tall, aspect kept.
    var logoW = 0, logoH = 0;
    if (state.logo) {
      var maxW = W * 0.64, maxH = H * 0.26;
      var r = Math.min(maxW / state.logo.width, maxH / state.logo.height);
      logoW = state.logo.width * r; logoH = state.logo.height * r;
    }
    var n = nm ? fitName(nm, st) : { size: 0, lines: [] };
    // Smaller name when it sits under a logo, so the logo leads.
    if (state.logo && nm) n = { size: Math.min(n.size, 96), lines: fitName(nm, st).lines };

    var nameLH = n.size * 1.12;
    var l1H = 54 * 1.35, l2H = 46 * 1.4;
    var rule = (l1 || l2) ? 70 + 6 + 70 : 0;
    var gapLogo = state.logo && n.lines.length ? 60 : 0;

    var block = logoH + gapLogo + n.lines.length * nameLH + rule + (l1 ? l1H : 0) + (l2 ? l2H : 0);

    // The safe band: clear of the bottom fifth and the edges, which the app's
    // own caption and buttons cover once the video is posted.
    var top = H * 0.14, bottom = H * 0.76;
    var y = top + Math.max(0, (bottom - top - block) / 2);

    if (state.logo) {
      ctx.drawImage(state.logo, (W - logoW) / 2, y, logoW, logoH);
      y += logoH + gapLogo;
    }

    ctx.fillStyle = ink();
    ctx.font = st.headW + ' ' + n.size + 'px ' + st.head + ', Georgia, serif';
    n.lines.forEach(function (line) { y += nameLH; ctx.fillText(line, W / 2, y - n.size * 0.2); });

    if (l1 || l2) {
      y += 70;
      ctx.globalAlpha = 0.85;
      ctx.fillStyle = ink();
      ctx.fillRect(W / 2 - 60, y, 120, 6);
      ctx.globalAlpha = 1;
      y += 6 + 70;
    }
    var fam = st.body + ', system-ui, sans-serif';
    if (l1) {
      var a = fitLine(l1, '500', 54, fam, W * 0.84);
      ctx.fillStyle = ink();
      ctx.font = a.font;
      ctx.fillText(a.text, W / 2, y + 54 * 0.8);
      y += l1H;
    }
    if (l2) {
      var b = fitLine(l2, '400', 46, fam, W * 0.84);
      ctx.fillStyle = soft();
      ctx.font = b.font;
      ctx.fillText(b.text, W / 2, y + 46 * 0.85);
    }
  }

  function redraw() { draw(); save(); }

  // ---- swatches -------------------------------------------------------------
  function swatch(hex, label, into) {
    var b = document.createElement('button');
    b.type = 'button';
    b.className = 'ec-swatch';
    b.style.background = hex;
    b.dataset.hex = hex.toLowerCase();
    b.setAttribute('aria-label', label);
    b.addEventListener('click', function () { setBg(hex); });
    into.appendChild(b);
  }
  function markSwatches() {
    [].forEach.call(document.querySelectorAll('.ec-swatch'), function (s) {
      s.setAttribute('aria-pressed', s.dataset.hex === state.bg.toLowerCase() ? 'true' : 'false');
    });
  }
  function setBg(hex) { state.bg = hex; markSwatches(); redraw(); }

  var wrap = el('ec-swatches');
  PRESETS.forEach(function (p) { swatch(p.hex, p.label, wrap); });
  var custom = document.createElement('label');
  custom.className = 'ec-custom';
  custom.innerHTML = '<input type="color" value="#141414" aria-label="Choose your own colour" /> Your own';
  wrap.appendChild(custom);
  custom.querySelector('input').addEventListener('input', function (e) { setBg(e.target.value); });

  function showBrandSwatches(colours) {
    var box = el('ec-brand-swatches');
    box.innerHTML = '';
    colours.forEach(function (hex, i) { swatch(hex, 'Logo colour ' + (i + 1), box); });
    el('ec-brand-wrap').hidden = colours.length === 0;
    markSwatches();
  }

  // ---- lettering ------------------------------------------------------------
  var styleBox = el('ec-styles');
  STYLES.forEach(function (s) {
    var b = document.createElement('button');
    b.type = 'button';
    b.className = 'ec-style';
    b.dataset.style = s.id;
    b.innerHTML = '<b style="font-family:' + s.head.replace(/"/g, '&quot;') + ';font-weight:' + s.headW + '">' +
      (s.caps ? 'ABC' : 'Abc') + '</b><small>' + s.label + '</small>';
    b.addEventListener('click', function () { state.style = s.id; markStyles(); redraw(); });
    styleBox.appendChild(b);
  });
  function markStyles() {
    [].forEach.call(styleBox.querySelectorAll('.ec-style'), function (b) {
      b.setAttribute('aria-pressed', b.dataset.style === state.style ? 'true' : 'false');
    });
  }

  // ---- text colour ----------------------------------------------------------
  [].forEach.call(document.querySelectorAll('input[name="ec-ink"]'), function (r) {
    r.addEventListener('change', function () { state.ink = r.value; redraw(); });
  });
  inkColour.addEventListener('input', function () {
    state.inkHex = inkColour.value;
    state.ink = 'custom';
    document.querySelector('input[name="ec-ink"][value="custom"]').checked = true;
    redraw();
  });
  function markInk() {
    document.querySelector('input[name="ec-ink"][value="' + state.ink + '"]').checked = true;
    inkColour.value = state.inkHex;
  }

  // ---- logo -----------------------------------------------------------------
  // Downscale before keeping it, so a huge photo does not blow the storage
  // quota or slow the preview down.
  function useLogo(src, fromUpload) {
    var img = new Image();
    img.onload = function () {
      var max = 900, r = Math.min(1, max / Math.max(img.width, img.height));
      var c = document.createElement('canvas');
      c.width = Math.round(img.width * r); c.height = Math.round(img.height * r);
      c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
      logoData = c.toDataURL('image/png');
      var small = new Image();
      small.onload = function () {
        state.logo = small;
        logoClear.hidden = false;
        var colours = logoColours(small);
        showBrandSwatches(colours);
        // First upload: if the name is still the sample, a logo usually says
        // it already, so clear it rather than print the name twice.
        if (fromUpload && name.value === name.defaultValue) name.value = '';
        // Never default to the logo's own main colour: that colour is usually
        // the logo, so it disappears into the background. Found in testing,
        // where an orange mark vanished on an orange card. Logos are drawn
        // for white or black, so start on whichever suits this one and offer
        // its colours as options.
        if (fromUpload) setBg(logoLightness(small) > 0.6 ? '#141414' : '#FFFFFF');
        else redraw();
      };
      small.src = logoData;
    };
    img.src = src;
  }
  logoInput.addEventListener('change', function () {
    var f = logoInput.files && logoInput.files[0];
    if (!f) return;
    var reader = new FileReader();
    reader.onload = function () { useLogo(reader.result, true); };
    reader.readAsDataURL(f);
  });
  logoClear.addEventListener('click', function () {
    state.logo = null; logoData = null;
    logoInput.value = '';
    logoClear.hidden = true;
    showBrandSwatches([]);
    redraw();
  });

  [name, line1, line2].forEach(function (i) { i.addEventListener('input', redraw); });

  // ---- save -----------------------------------------------------------------
  function filename() {
    var base = (name.value || 'end-card').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    return (base || 'end-card') + '-end-card.png';
  }
  // On a phone the share sheet's "Save Image" puts it in Photos, which is
  // where an editing app looks. A plain download on iOS lands in Files, and
  // people then cannot find it. Share first, download second.
  el('ec-save').addEventListener('click', function () {
    canvas.toBlob(function (blob) {
      var file = new File([blob], filename(), { type: 'image/png' });
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        navigator.share({ files: [file] }).catch(function () {});
        return;
      }
      var a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = filename();
      document.body.appendChild(a);
      a.click();
      setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 1000);
    }, 'image/png');
  });

  // ---- start ----------------------------------------------------------------
  restore();
  markSwatches(); markStyles(); markInk();
  draw();
  // Every face has to be loaded before the canvas can use it, or the first
  // preview draws in a fallback font and looks wrong.
  if (document.fonts && document.fonts.load) {
    Promise.all(STYLES.map(function (s) {
      return Promise.all([
        document.fonts.load(s.headW + ' 100px ' + s.head),
        document.fonts.load('500 54px ' + s.body),
        document.fonts.load('400 46px ' + s.body)
      ]);
    })).then(draw, draw);
  }
})();
