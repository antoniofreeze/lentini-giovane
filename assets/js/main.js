/* ============================================================
   LENTINI GIOVANE — main.js
   ============================================================ */

const escapeHtml = (value = "") =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

// ---------- Candidate data ----------
const CANDIDATES = [
  { order:  1, name: "LA FERLA LUCA",            cv: "assets/docs/cv-giovane-01.pdf", casellario: "assets/docs/casellario-lentini-giovane-combinato.pdf" },
  { order:  2, name: "DE LUCA GIORGIA",           cv: "assets/docs/cv-giovane-02.pdf", casellario: "assets/docs/casellario-giovane-02.pdf" },
  { order:  3, name: "PUGLISI GRAZIANO",          cv: "assets/docs/cv-giovane-03.pdf", casellario: "assets/docs/casellario-lentini-giovane-combinato.pdf" },
  { order:  4, name: "FURNÒ ELENA CLAUDIA",       cv: "assets/docs/cv-giovane-04.pdf", casellario: "assets/docs/casellario-lentini-giovane-combinato.pdf" },
  { order:  5, name: "MIGLIORE FEDERICA",         cv: "assets/docs/cv-giovane-05.pdf", casellario: "assets/docs/casellario-lentini-giovane-combinato.pdf" },
  { order:  6, name: "MANGIAMELI LORENZO",        cv: "assets/docs/cv-giovane-06.pdf", casellario: "assets/docs/casellario-lentini-giovane-combinato.pdf" },
  { order:  7, name: "VECCHIO FRANCESCO",         cv: "assets/docs/cv-giovane-07.pdf", casellario: "assets/docs/casellario-giovane-07.pdf" },
  { order:  8, name: "CARBONARO LAURA",           cv: "assets/docs/cv-giovane-08.pdf", casellario: "assets/docs/casellario-lentini-giovane-combinato.pdf" },
  { order:  9, name: "SAMMATRICE LUDOVICA RITA",  cv: "assets/docs/cv-giovane-09.pdf" },
  { order: 10, name: "FISICARO ANDREA",           cv: "assets/docs/cv-giovane-10.pdf", casellario: "assets/docs/casellario-lentini-giovane-combinato.pdf" },
  { order: 11, name: "GNISCI CHIARINA",           cv: "assets/docs/cv-giovane-11.pdf", casellario: "assets/docs/casellario-lentini-giovane-combinato.pdf" },
  { order: 12, name: "FUCCIO ALFINA",             casellario: "assets/docs/casellario-giovane-12.pdf" },
  { order: 13, name: "FANCIULLO ALFIO",           casellario: "assets/docs/casellario-giovane-13.pdf" },
  { order: 14, name: "DE LEO INES",               casellario: "assets/docs/casellario-lentini-giovane-combinato.pdf" },
  { order: 15, name: "COMMENDATORE VALENTINA",    casellario: "assets/docs/casellario-lentini-giovane-combinato.pdf" },
  { order: 16, name: "VINCI VALENTINA",           cv: "assets/docs/cv-giovane-16.pdf", casellario: "assets/docs/casellario-lentini-giovane-combinato.pdf" },
];

// ---------- Icons ----------
const ICON_CV = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>`;
const ICON_CERT = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>`;

// ---------- Render candidates ----------
function renderCandidates() {
  const target = document.querySelector("[data-candidates]");
  if (!target) return;

  target.innerHTML = CANDIDATES.map((c) => {
    const cvBtn = c.cv
      ? `<a class="btn-doc" href="${escapeHtml(c.cv)}" target="_blank" rel="noopener noreferrer" aria-label="CV di ${escapeHtml(c.name)}">${ICON_CV} CV</a>`
      : "";
    const casBtn = c.casellario
      ? `<a class="btn-doc" href="${escapeHtml(c.casellario)}" target="_blank" rel="noopener noreferrer" aria-label="Casellario di ${escapeHtml(c.name)}">${ICON_CERT} Casellario</a>`
      : "";

    return `
      <article class="candidate-card reveal">
        <div class="candidate-top">
          <span class="candidate-num">${String(c.order).padStart(2, "0")}</span>
          <strong class="candidate-name">${escapeHtml(c.name)}</strong>
        </div>
        <div class="candidate-docs">${cvBtn}${casBtn}</div>
      </article>`;
  }).join("");
}

// ---------- Navigation ----------
function setupNavigation() {
  const button = document.querySelector("[data-nav-toggle]");
  const nav    = document.querySelector("[data-nav]");
  if (!button || !nav) return;

  button.addEventListener("click", () => {
    const isOpen = button.getAttribute("aria-expanded") === "true";
    button.setAttribute("aria-expanded", String(!isOpen));
    nav.classList.toggle("is-open", !isOpen);
    document.body.classList.toggle("is-nav-open", !isOpen);
  });

  nav.addEventListener("click", (e) => {
    if (e.target.closest("a")) {
      button.setAttribute("aria-expanded", "false");
      nav.classList.remove("is-open");
      document.body.classList.remove("is-nav-open");
    }
  });
}

// ---------- Header scroll ----------
function setupHeader() {
  const header = document.querySelector("[data-header]");
  if (!header) return;
  const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 40);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

// ---------- Reveal on scroll ----------
function setupReveal() {
  const items = document.querySelectorAll(".reveal");
  if (!items.length) return;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    items.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("is-visible");
        observer.unobserve(e.target);
      }
    }),
    { threshold: 0.12 }
  );

  items.forEach((el) => observer.observe(el));
}

// ---------- Init ----------
document.addEventListener("DOMContentLoaded", () => {
  renderCandidates();
  setupNavigation();
  setupHeader();

  // Reveal runs after candidates are in the DOM
  requestAnimationFrame(setupReveal);
});
