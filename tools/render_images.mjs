// Draws the share image (assets/og.png) and the home-screen icon (apple-touch-icon.png), and the PNGs that
// make_favicon.py packs into favicon.ico, in a Chrome that is already open with remote control on port 9333.
// Run from the repo root: node tools/render_images.mjs, then python tools/make_favicon.py.
import { fileURLToPath } from "node:url";
import { chromium } from "playwright-core";

const root = fileURLToPath(new URL("..", import.meta.url)).replace(/\\/g, "/");
const browser = await chromium.connectOverCDP("http://127.0.0.1:9333");
const page = await browser.contexts()[0].newPage();
await page.route("http://mpsite.local/**", (route) => {
  const p = decodeURIComponent(new URL(route.request().url()).pathname);
  return route.fulfill({ path: `${root}${p.slice(1)}` }).catch(() => route.fulfill({ status: 404, body: "" }));
});
try {
  await page.emulateMedia({ colorScheme: "light" });
  await page.setViewportSize({ width: 1200, height: 630 });
  await page.goto("http://mpsite.local/tools/og.html", { waitUntil: "load" });
  // The share image shows the same coin and receipt as the page, copied from index.html.
  await page.evaluate(async () => {
    const home = new DOMParser().parseFromString(await (await fetch("/index.html")).text(), "text/html");
    document.getElementById("art").innerHTML = home.querySelector(".hero .art").innerHTML;
    await Promise.all([...document.images].map((img) => img.decode().catch(() => {})));
    await document.fonts.ready;
  });
  await page.screenshot({ path: `${root}assets/og.png` });

  // The app icon is the coin on an obsidian tile, drawn edge to edge.
  for (const size of [180, 256]) {
    await page.setViewportSize({ width: size, height: size });
    await page.setContent(`<style>html,body{margin:0;background:transparent}img{display:block;width:${size}px;height:${size}px}</style><img src="http://mpsite.local/favicon.svg">`);
    await page.waitForLoadState("load");
    await page.screenshot({ path: size === 180 ? `${root}apple-touch-icon.png` : `${root}tools/icon-256.png`, omitBackground: true });
  }
} finally {
  await page.close();
}
process.exit();
