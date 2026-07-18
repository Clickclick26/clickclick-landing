(function () {
  const EMAIL = "hello@clickclick.video";
  const ENDPOINT = "https://formsubmit.co/ajax/" + EMAIL;

  const modal = document.getElementById("lead-modal");
  const form = document.getElementById("lead-form");
  const formWrap = document.getElementById("lead-form-wrap");
  const success = document.getElementById("lead-success");
  const errorEl = document.getElementById("lead-error");
  const interestField = document.getElementById("lead-interest");
  const submitBtn = form && form.querySelector(".lead-submit");
  const dialog = modal && modal.querySelector(".lead-dialog");

  if (!modal || !form) return;

  let lastFocus = null;
  let closing = false;
  let closeTimer = null;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function openLead(interest) {
    if (closing) {
      closing = false;
      if (closeTimer) {
        clearTimeout(closeTimer);
        closeTimer = null;
      }
    }

    lastFocus = document.activeElement;
    if (interestField) interestField.value = interest || "General";
    formWrap.hidden = false;
    success.hidden = true;
    errorEl.hidden = true;
    errorEl.textContent = "";
    form.reset();
    if (interestField) interestField.value = interest || "General";

    modal.hidden = false;
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("lead-open");

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        modal.classList.add("is-open");
      });
    });

    const first = form.querySelector("input:not(.lead-honey), select, textarea");
    if (first) {
      window.setTimeout(() => first.focus(), reduceMotion ? 0 : 280);
    }
  }

  function finishClose() {
    if (!closing) return;
    closing = false;
    closeTimer = null;
    modal.hidden = true;
    modal.classList.remove("is-open");
    if (lastFocus && typeof lastFocus.focus === "function") lastFocus.focus();
  }

  function closeLead() {
    if (modal.hidden && !modal.classList.contains("is-open")) return;

    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("lead-open", "cursor-on-chat");

    if (reduceMotion) {
      modal.classList.remove("is-open");
      modal.hidden = true;
      if (lastFocus && typeof lastFocus.focus === "function") lastFocus.focus();
      return;
    }

    closing = true;
    modal.classList.remove("is-open");

    const onEnd = (e) => {
      if (e.target !== modal && e.target !== dialog) return;
      modal.removeEventListener("transitionend", onEnd);
      finishClose();
    };

    modal.addEventListener("transitionend", onEnd);
    if (closeTimer) clearTimeout(closeTimer);
    closeTimer = window.setTimeout(finishClose, 420);
  }

  document.addEventListener("click", (e) => {
    const opener = e.target.closest("[data-open-lead]");
    if (opener) {
      e.preventDefault();
      openLead(opener.getAttribute("data-lead-interest"));
      return;
    }
    if (e.target.closest("[data-lead-close]")) {
      closeLead();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && (!modal.hidden || modal.classList.contains("is-open"))) {
      closeLead();
    }
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    errorEl.hidden = true;
    errorEl.textContent = "";

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const formData = new FormData(form);
    if ((formData.get("_honey") || "").toString().trim()) return;

    const data = Object.fromEntries(formData.entries());
    delete data._honey;

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.querySelector("span").textContent = "Sending…";
    }

    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          ...data,
          _template: "table",
          _captcha: "false",
        }),
      });

      if (!res.ok) throw new Error("Send failed");

      formWrap.hidden = true;
      success.hidden = false;
    } catch (err) {
      errorEl.textContent =
        "Couldn’t send just now. Email us directly at " + EMAIL + " and we’ll pick it up.";
      errorEl.hidden = false;
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.querySelector("span").textContent = "Send to the team";
      }
    }
  });
})();
