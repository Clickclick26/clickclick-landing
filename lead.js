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

  if (!modal || !form) return;

  let lastFocus = null;

  function openLead(interest) {
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
    const first = form.querySelector("input:not(.lead-honey), select, textarea");
    if (first) first.focus();
  }

  function closeLead() {
    modal.hidden = true;
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("lead-open", "cursor-on-chat");
    if (lastFocus && typeof lastFocus.focus === "function") lastFocus.focus();
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
    if (e.key === "Escape" && !modal.hidden) closeLead();
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
