/**
 * Motor de animaciones del sitio.
 * Lenis (scroll suave) + GSAP ScrollTrigger (reveals cinematográficos)
 * + interacciones magnéticas. Todo se desactiva con prefers-reduced-motion.
 */
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function initSmoothScroll() {
  const lenis = new Lenis({
    duration: 1.15,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  });

  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  // Anclas internas con scroll suave
  document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target as HTMLElement, { offset: -72 });
      history.replaceState(null, "", id);
    });
  });
}

/** Divide elementos [data-split] en palabras para el reveal tipográfico. */
function splitWords(el: HTMLElement) {
  const text = el.textContent ?? "";
  el.setAttribute("aria-label", text.trim());
  const words = text.split(/(\s+)/);
  // background-clip:text no pinta a través de descendientes con transform:
  // el gradiente debe vivir en cada span interno, no en el contenedor.
  const gradient = el.classList.contains("text-gradient");
  if (gradient) el.classList.remove("text-gradient");
  el.textContent = "";
  for (const w of words) {
    if (/^\s+$/.test(w)) {
      el.appendChild(document.createTextNode(" "));
      continue;
    }
    if (!w) continue;
    const wrap = document.createElement("span");
    wrap.className = "word";
    wrap.setAttribute("aria-hidden", "true");
    const inner = document.createElement("span");
    if (gradient) inner.classList.add("text-gradient");
    inner.textContent = w;
    wrap.appendChild(inner);
    el.appendChild(wrap);
  }
  return el.querySelectorAll<HTMLElement>(".word > span");
}

function initHeroIntro() {
  const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

  document.querySelectorAll<HTMLElement>("[data-split]").forEach((el, i) => {
    const spans = splitWords(el);
    tl.to(
      spans,
      { y: 0, duration: 1.15, stagger: 0.045 },
      0.15 + i * 0.12
    );
  });

  const heroItems = document.querySelectorAll("[data-hero-fade]");
  if (heroItems.length) {
    tl.fromTo(
      heroItems,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 1, stagger: 0.09, clearProps: "transform" },
      0.7
    );
  }
}

function initScrollReveals() {
  // Reveals individuales
  gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
    const dir = el.dataset.reveal;
    const from: gsap.TweenVars = { opacity: 0, y: 36 };
    if (dir === "left") Object.assign(from, { y: 0, x: -48 });
    if (dir === "right") Object.assign(from, { y: 0, x: 48 });
    if (dir === "scale") Object.assign(from, { y: 0, scale: 0.92 });

    gsap.fromTo(el, from, {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      duration: 1.1,
      ease: "expo.out",
      clearProps: "transform",
      scrollTrigger: { trigger: el, start: "top 86%", once: true },
    });
  });

  // Grupos con stagger
  gsap.utils.toArray<HTMLElement>("[data-stagger]").forEach((group) => {
    const items = group.querySelectorAll("[data-stagger-item]");
    if (!items.length) return;
    gsap.fromTo(
      items,
      { opacity: 0, y: 28 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: "expo.out",
        stagger: 0.07,
        clearProps: "transform",
        scrollTrigger: { trigger: group, start: "top 84%", once: true },
      }
    );
  });

  // Línea de la trayectoria que se dibuja con el scroll
  const timelineLine = document.querySelector<HTMLElement>("[data-timeline-line]");
  if (timelineLine) {
    gsap.fromTo(
      timelineLine,
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: "none",
        transformOrigin: "top center",
        scrollTrigger: {
          trigger: timelineLine.parentElement,
          start: "top 75%",
          end: "bottom 55%",
          scrub: 0.6,
        },
      }
    );
  }

  // Parallax sutil en portadas de proyectos
  gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
    gsap.fromTo(
      el,
      { yPercent: -6 },
      {
        yPercent: 6,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 0.8 },
      }
    );
  });
}

function initMagnetic() {
  if (!window.matchMedia("(pointer: fine)").matches) return;
  document.querySelectorAll<HTMLElement>("[data-magnetic]").forEach((el) => {
    const strength = Number(el.dataset.magneticStrength ?? 0.32);
    const xTo = gsap.quickTo(el, "x", { duration: 0.5, ease: "expo.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.5, ease: "expo.out" });

    el.addEventListener("mousemove", (e) => {
      const r = el.getBoundingClientRect();
      xTo((e.clientX - (r.left + r.width / 2)) * strength);
      yTo((e.clientY - (r.top + r.height / 2)) * strength);
    });
    el.addEventListener("mouseleave", () => {
      xTo(0);
      yTo(0);
    });
  });
}

function initNavbar() {
  const nav = document.querySelector<HTMLElement>("[data-navbar]");
  if (!nav) return;

  const onScroll = () => {
    nav.classList.toggle("nav-scrolled", window.scrollY > 24);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  // Menú móvil
  const toggle = document.querySelector<HTMLButtonElement>("[data-menu-toggle]");
  const menu = document.querySelector<HTMLElement>("[data-mobile-menu]");
  if (toggle && menu) {
    const close = () => {
      menu.dataset.open = "false";
      toggle.setAttribute("aria-expanded", "false");
      document.body.style.removeProperty("overflow");
    };
    toggle.addEventListener("click", () => {
      const open = menu.dataset.open === "true";
      menu.dataset.open = String(!open);
      toggle.setAttribute("aria-expanded", String(!open));
      document.body.style.overflow = open ? "" : "hidden";
    });
    menu.querySelectorAll("a").forEach((a) => a.addEventListener("click", close));
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") close();
    });
  }

  // Enlace activo según sección visible
  const sections = document.querySelectorAll<HTMLElement>("section[id]");
  const links = nav.querySelectorAll<HTMLAnchorElement>('a[href^="#"]');
  if (sections.length && links.length && "IntersectionObserver" in window) {
    const map = new Map<string, HTMLAnchorElement>();
    links.forEach((l) => map.set(l.getAttribute("href")!.slice(1), l));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const link = map.get(entry.target.id);
          if (link && entry.isIntersecting) {
            links.forEach((l) => l.removeAttribute("data-active"));
            link.setAttribute("data-active", "true");
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach((s) => io.observe(s));
  }
}

function boot() {
  document.documentElement.classList.add("js");

  if (reducedMotion) {
    // Sin animaciones: todo visible, navegación funcional.
    initNavbar();
    return;
  }

  gsap.registerPlugin(ScrollTrigger);
  initSmoothScroll();
  initHeroIntro();
  initScrollReveals();
  initMagnetic();
  initNavbar();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", boot);
} else {
  boot();
}
