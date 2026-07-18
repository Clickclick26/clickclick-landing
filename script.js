document.getElementById("year").textContent = new Date().getFullYear();

const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
if (finePointer) {
  document.body.classList.add("has-fine-pointer");

  const blob = document.getElementById("cursor-blob");
  const inner = document.getElementById("cursor-inner");
  let mx = -400;
  let my = -400;
  let bx = -400;
  let by = -400;

  document.addEventListener("mousemove", (e) => {
    mx = e.clientX;
    my = e.clientY;
    inner.style.transform =
      "translate3d(" + mx + "px," + my + "px,0) translate(-50%,-50%)";

    const onUi = e.target.closest(
      "#cc-btn, #cc-panel, #cc-label, #cookie-banner, #cookie-open, #cookie-tag, .cookie-tag, .cookie-btn, #lead-modal, .lead-dialog, .lead-close, .lead-submit"
    );
    document.body.classList.toggle("cursor-on-chat", !!onUi);
  });

  (function animBlob() {
    bx += (mx - bx) * 0.14;
    by += (my - by) * 0.14;
    blob.style.transform =
      "translate3d(" + bx + "px," + by + "px,0) translate(-50%,-50%)";
    requestAnimationFrame(animBlob);
  })();

  document.querySelectorAll("a, button").forEach((el) => {
    if (
      el.closest("#cc-panel") ||
      el.id === "cc-btn" ||
      el.id === "cookie-tag" ||
      el.closest("#cookie-banner") ||
      el.closest("#lead-modal")
    ) {
      return;
    }
    el.addEventListener("mouseenter", () =>
      document.body.classList.add("cursor-hover")
    );
    el.addEventListener("mouseleave", () =>
      document.body.classList.remove("cursor-hover")
    );
  });
}

window.addEventListener(
  "scroll",
  () => {
    document
      .getElementById("navbar")
      .classList.toggle("scrolled", window.scrollY > 50);
  },
  { passive: true }
);

const clientObs = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.querySelectorAll("li").forEach((li, i) => {
        setTimeout(() => li.classList.add("visible"), i * 120);
      });
      clientObs.unobserve(entry.target);
    });
  },
  { threshold: 0.4 }
);

const clientRow = document.querySelector(".client-row");
if (clientRow) clientObs.observe(clientRow);

function togglePillar(id) {
  const target = document.getElementById(id);
  if (!target) return;
  const isOpen = target.classList.contains("open");

  document.querySelectorAll(".service-pillar").forEach((p) => {
    p.classList.remove("open");
    const btn = p.querySelector(".pillar-header");
    if (btn) btn.setAttribute("aria-expanded", "false");
  });

  if (!isOpen) {
    target.classList.add("open");
    const btn = target.querySelector(".pillar-header");
    if (btn) btn.setAttribute("aria-expanded", "true");
  }
}

document.querySelectorAll(".pillar-header").forEach((btn) => {
  btn.addEventListener("click", () => togglePillar(btn.dataset.pillar));
});

document.querySelectorAll('a[href^="#pillar-"]').forEach((link) => {
  link.addEventListener("click", () => {
    const id = link.getAttribute("href").slice(1);
    setTimeout(() => togglePillar(id), 50);
  });
});
