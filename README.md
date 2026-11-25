# modelpenny.com

ModelPenny's coming-soon page: one static page, served by GitHub Pages from this repo's `main` branch. No build step: the repo is served as it is, except the tools and this README (`_config.yml`).

The look, the words and the logo come from the ModelPenny design system, which the product repo links to. The headline is the one statement the page makes: "We work out what AI really costs you, so you don't have to." The receipt beside it is an example with made-up numbers and says so.

## Files

| Path | What it is |
| --- | --- |
| `index.html`, `404.html` | The pages |
| `css/site.css` | All the styles, light and dark, from the design system's tokens |
| `fonts/` | IBM Plex Sans and Mono, served from our own site so visitors' browsers never call Google. Licence: `fonts/OFL-ibm-plex.txt` |
| `assets/` | The logo lockups and the share image (`og.png`) |
| `favicon.svg`, `favicon.ico`, `apple-touch-icon.png` | The app icon: the coin on an obsidian tile |
| `tools/` | `og.html`, the share image's layout; `render_images.mjs` and `make_favicon.py` redraw the PNGs |
| `.claude/` | A guard that holds Claude back from starting heavy work, such as a test browser, while the computer is low on memory. Jekyll never publishes `.claude` |

## Changing it

Edit the HTML or CSS and open a pull request. If the headline changes, change `tools/og.html` too, then redraw the images: with Chrome open with remote control on port 9333 and `playwright-core` installed, run `node tools/render_images.mjs`, then `python tools/make_favicon.py`.
