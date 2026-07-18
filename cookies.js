(function () {
  const KEY = "cc-cookie-consent";
  const YT =
    "https://www.youtube-nocookie.com/embed/uGo14WQWrGI?autoplay=1&mute=1&loop=1&playlist=uGo14WQWrGI&controls=0";

  const banner = document.getElementById("cookie-banner");
  const managePanel = document.getElementById("cookie-manage");
  const mediaToggle = document.getElementById("cookie-media");
  const openBtn = document.getElementById("cookie-open");
  const poster = document.getElementById("showreel-poster");
  const frame = document.getElementById("showreel-frame");

  function readConsent() {
    try {
      return JSON.parse(localStorage.getItem(KEY) || "null");
    } catch (e) {
      return null;
    }
  }

  function writeConsent(consent) {
    localStorage.setItem(KEY, JSON.stringify(consent));
  }

  function loadShowreel() {
    if (!frame || frame.getAttribute("src")) return;
    frame.hidden = false;
    frame.src = frame.getAttribute("data-src") || YT;
    if (poster) poster.hidden = true;
  }

  function unloadShowreel() {
    if (!frame) return;
    frame.removeAttribute("src");
    frame.hidden = true;
    if (poster) poster.hidden = false;
  }

  function applyConsent(consent) {
    if (consent && consent.media) loadShowreel();
    else unloadShowreel();
  }

  function hideBanner() {
    banner.hidden = true;
    document.body.classList.remove("cookie-open");
  }

  function showBanner(showManage) {
    banner.hidden = false;
    document.body.classList.add("cookie-open");
    managePanel.hidden = !showManage;
    const consent = readConsent();
    if (mediaToggle) mediaToggle.checked = !!(consent && consent.media);
  }

  function decide(media) {
    const consent = { necessary: true, media: !!media, ts: Date.now() };
    writeConsent(consent);
    applyConsent(consent);
    hideBanner();
  }

  banner.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-cookie]");
    if (!btn) return;
    const action = btn.getAttribute("data-cookie");
    if (action === "accept") decide(true);
    else if (action === "reject") decide(false);
    else if (action === "manage") {
      managePanel.hidden = false;
    } else if (action === "save") {
      decide(mediaToggle && mediaToggle.checked);
    }
  });

  if (openBtn) {
    openBtn.addEventListener("click", () => showBanner(true));
  }

  if (poster) {
    poster.addEventListener("click", () => {
      const consent = readConsent();
      if (consent && consent.media) {
        loadShowreel();
        return;
      }
      showBanner(true);
      if (mediaToggle) mediaToggle.checked = true;
    });
  }

  const existing = readConsent();
  if (!existing) {
    showBanner(false);
  } else {
    applyConsent(existing);
  }
})();
