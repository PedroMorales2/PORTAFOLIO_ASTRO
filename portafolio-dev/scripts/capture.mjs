// Verificación visual: recorre la página y captura cada sección.
// Uso: node scripts/capture.mjs
import puppeteer from "puppeteer-core";
import { mkdirSync } from "node:fs";
import { spawn } from "node:child_process";

const EDGE = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const BASE = "http://localhost:4322";
const OUT = ".captures";
const PORT = 9223;

mkdirSync(OUT, { recursive: true });

// Edge lanzado a mano con puerto de depuración; puppeteer se conecta después.
const edge = spawn(
  EDGE,
  [
    "--headless=new",
    "--disable-gpu",
    "--hide-scrollbars",
    "--no-first-run",
    "--no-default-browser-check",
    `--remote-debugging-port=${PORT}`,
    `--user-data-dir=${process.env.TEMP}\\pptr-edge-profile2`,
    "about:blank",
  ],
  { stdio: "ignore", detached: false }
);

let browser;
for (let i = 0; i < 30; i++) {
  await new Promise((r) => setTimeout(r, 500));
  try {
    browser = await puppeteer.connect({
      browserURL: `http://127.0.0.1:${PORT}`,
      defaultViewport: null,
    });
    break;
  } catch {}
}
if (!browser) {
  edge.kill();
  throw new Error("No se pudo conectar a Edge");
}

const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto(BASE + "/", { waitUntil: "domcontentloaded", timeout: 60000 });
await new Promise((r) => setTimeout(r, 4000));

const sections = [
  "inicio",
  "sobre-mi",
  "trayectoria",
  "stack",
  "proyectos",
  "filosofia",
  "contacto",
];

// Scroll progresivo para disparar todos los ScrollTriggers
await page.evaluate(async () => {
  const h = document.body.scrollHeight;
  for (let y = 0; y <= h; y += 350) {
    window.scrollTo(0, y);
    await new Promise((r) => setTimeout(r, 60));
  }
});
await new Promise((r) => setTimeout(r, 1200));

for (const id of sections) {
  await page.evaluate((id) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY - 60);
  }, id);
  await new Promise((r) => setTimeout(r, 1300));
  await page.screenshot({ path: `${OUT}/${id}.png` });
  console.log(`✓ ${id}`);
}

// Vista móvil del hero
await page.setViewport({ width: 390, height: 844 });
await page.goto(BASE + "/", { waitUntil: "domcontentloaded" });
await new Promise((r) => setTimeout(r, 3000));
await page.screenshot({ path: `${OUT}/movil-hero.png` });
console.log("✓ movil-hero");

await browser.close();
edge.kill();
console.log("LISTO");
