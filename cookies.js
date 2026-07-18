(function () {
  const KEY = "cc-cookie-consent";

  const banner = document.getElementById("cookie-banner");
  const tag = document.getElementById("cookie-tag");
  const managePanel = document.getElementById("cookie-manage");
  const openBtn = document.getElementById("cookie-open");

  function readConsent() {
    try {
      return JSON.parse(localStorage.getItem(KEY) || "null");
    } catch (e) {
      return null;
    }
  }

  function writeConsent(choice) {
    localStorage.setItem(
      KEY,
      JSON.stringify({ necessary: true, media: true, choice: choice, ts: Date.now() })
    );
  }

  function hideBanner() {
    banner.hidden = true;
    document.body.classList.remove("cookie-open");
    if (tag) tag.hidden = false;
  }

  function showBanner(showManage) {
    banner.hidden = false;
    if (tag) tag.hidden = true;
    document.body.classList.add("cookie-open");
    managePanel.hidden = !showManage;
  }

  function decide(choice) {
    writeConsent(choice);
    hideBanner();
  }

  banner.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-cookie]");
    if (!btn) return;
    const action = btn.getAttribute("data-cookie");
    if (action === "accept") decide("accept");
    else if (action === "reject") decide("reject");
    else if (action === "manage") managePanel.hidden = false;
  });

  if (openBtn) {
    openBtn.addEventListener("click", () => showBanner(true));
  }

  if (tag) {
    tag.addEventListener("click", () => showBanner(true));
    tag.addEventListener("mouseenter", () => {
      document.body.classList.add("cursor-on-chat");
    });
    tag.addEventListener("mouseleave", () => {
      if (banner.hidden) document.body.classList.remove("cursor-on-chat");
    });
  }

  if (!readConsent()) {
    showBanner(false);
  } else if (tag) {
    tag.hidden = false;
  }
})();
