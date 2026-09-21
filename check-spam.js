/*
 * "Check your spam" pop-up, shown once someone has applied or paid and an
 * email from us is on its way (21 Sep 2026). A lead asked for her code by
 * email four minutes before ours landed; Gmail's Promotions tab and spam
 * folders swallow first emails from a new sender, and nobody looks there
 * unless told to. Call window.ccCheckSpam() after the send; it shows once
 * per page load and closes on the button, the backdrop or Escape.
 */
(function () {
  var shown = false;

  function css() {
    if (document.getElementById('cc-spam-css')) return;
    var s = document.createElement('style');
    s.id = 'cc-spam-css';
    s.textContent =
      '.cc-spam{position:fixed;inset:0;z-index:9999;display:flex;align-items:center;justify-content:center;padding:16px;background:rgba(20,19,15,.55)}' +
      '.cc-spam-box{max-width:420px;width:100%;background:#fffdf8;color:#14130f;border-radius:18px;padding:26px 24px 22px;font-family:inherit;box-shadow:0 20px 60px rgba(0,0,0,.25)}' +
      '.cc-spam-box h2{margin:0 0 10px;font-size:1.3rem;line-height:1.25}' +
      '.cc-spam-box p{margin:0 0 12px;line-height:1.55;font-size:.98rem}' +
      '.cc-spam-box b{white-space:nowrap}' +
      '.cc-spam-box button{margin-top:6px;border:0;border-radius:999px;background:#14130f;color:#f0ead6;padding:12px 22px;font:inherit;font-weight:600;cursor:pointer}';
    document.head.appendChild(s);
  }

  window.ccCheckSpam = function (what) {
    if (shown) return;
    shown = true;
    css();
    var wrap = document.createElement('div');
    wrap.className = 'cc-spam';
    wrap.setAttribute('role', 'dialog');
    wrap.setAttribute('aria-modal', 'true');
    wrap.setAttribute('aria-labelledby', 'cc-spam-title');
    wrap.innerHTML =
      '<div class="cc-spam-box">' +
      '<h2 id="cc-spam-title">Check your spam folder</h2>' +
      '<p>' + (what || 'Your email') + ' comes from <b>hello@clickclick.video</b>. It usually lands within a few minutes.</p>' +
      '<p>If it is not in your inbox, look in <b>Spam</b> or <b>Promotions</b> and move it to your inbox, so the next one finds you.</p>' +
      '<button type="button">Got it</button>' +
      '</div>';
    function close() {
      document.removeEventListener('keydown', onKey);
      if (wrap.parentNode) wrap.parentNode.removeChild(wrap);
    }
    function onKey(e) { if (e.key === 'Escape') close(); }
    wrap.addEventListener('click', function (e) { if (e.target === wrap) close(); });
    wrap.querySelector('button').addEventListener('click', close);
    document.addEventListener('keydown', onKey);
    document.body.appendChild(wrap);
    wrap.querySelector('button').focus();
  };
})();
