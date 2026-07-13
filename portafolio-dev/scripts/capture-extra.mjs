// Capturas puntuales de los case studies nuevos y la grilla de minis.
import puppeteer from "puppeteer-core";
import { spawn } from "node:child_process";

const EDGE = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const PORT = 9224;

const edge = spawn(
  EDGE,
  [
    "--headless=new",
    "--disable-gpu",
    "--hide-scrollbars",
    "--no-first-run",
    `--remote-debugging-port=${PORT}`,
    `--user-data-dir=${process.env.TEMP}\\pptr-edge-p3`,
    "about:blank",
  ],
  { stdio: "ignore" }
);

let browser;
for (let i = 0; i < 30; i++) {
  await new Promise((r) => setTimeout(r, 500));
  try {
    browser = await puppeteer.connect({ browserURL: `http://127.0.0.1:${PORT}`, defaultViewport: null });
    break;
  } catch {}
}
if (!browser) { edge.kill(); throw new Error("sin conexión"); }

const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto("http://localhost:4322/", { waitUntil: "domcontentloaded" });
await new Promise((r) => setTimeout(r, 3500));

await page.evaluate(async () => {
  const h = document.body.scrollHeight;
  for (let y = 0; y <= h; y += 350) {
    window.scrollTo(0, y);
    await new Promise((r) => setTimeout(r, 50));
  }
});
await new Promise((r) => setTimeout(r, 800));

const shots = [
  ["proy-03", "proyecto-crm-whatsapp"],
  ["proy-04", "proyecto-mora"],
  ["proy-05", "proyecto-detector-fatiga"],
  ["proy-06", "proyecto-tinkuy"],
  ["minis", null],
];

for (const [name, id] of shots) {
  await page.evaluate((id) => {
    if (id) {
      const el = document.getElementById(id);
      if (el) window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY - 130);
    } else {
      const els = document.querySelectorAll("#proyectos .container-x");
      const last = els[els.length - 1];
      window.scrollTo(0, last.getBoundingClientRect().top + window.scrollY - 60);
    }
  }, id);
  await new Promise((r) => setTimeout(r, 1200));
  await page.screenshot({ path: `.captures/${name}.png` });
  console.log("ok", name);
}

await browser.close();
edge.kill();
console.log("FIN");
