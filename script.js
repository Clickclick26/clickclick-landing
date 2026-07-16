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
    inner.style.left = mx + "px";
    inner.style.top = my + "px";
  });

  (function animBlob() {
    bx += (mx - bx) * 0.07;
    by += (my - by) * 0.07;
    blob.style.left = bx + "px";
    blob.style.top = by + "px";
    requestAnimationFrame(animBlob);
  })();

  document.querySelectorAll("a, button").forEach((el) => {
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
