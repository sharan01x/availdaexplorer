# Avail DA Explorer

**🔗 Live demo:** [https://sharan01x.github.io/availdaexplorer](https://sharan01x.github.io/availdaexplorer)

Sample HTML implementation of the Avail DA Explorer, built with the Avail Design System.

Based on the current **Avail DA Explorer** (availproject/infinity-explorer) — a fork of polkadot-js/apps tailored for the Avail network. This implementation adapts the same design system used by the Nexus Explorer into a DA Explorer context.

## Key Differences from Nexus Explorer

| Nexus Explorer | DA Explorer |
|---|---|
| Latest Block, Total RFFs, Fulfilled, Pending | Best Block, Finalized, Total Extrinsics, Total Events |
| RFFs (Rollup Finality Frauds) | Extrinsics with status badges (success/failed) |
| Nav: Home, Blocks, RFFs, Stats | Nav: Home, Blocks, Extrinsics, Latency, Node Info |
| Single content grid (blocks + RFFs) | Summary bar + Stats grid + DA metrics + Content grid |
| — | DA Metrics bar (Block Time, Epoch, Validators) |

## Design System

Shares the same Avail Design System as the Nexus Explorer:
- **Colors**: Blue palette (50–950), Grey light/dark, Red, Green, Amber semantic tokens
- **Typography**: Inter/Geist (sans), Delight (serif headings), JetBrains Mono (hashes/numbers)
- **Dark mode**: Class-based `.dark` toggle with localStorage persistence
- **Components**: Section cards with hover glow, stat cards, data rows, status badges, search bar
- **Background**: Halftone dot-grid animated canvas

## Local Development

```bash
# Serve locally (any static file server)
npx serve .
# Or Python
python3 -m http.server 8080
```

Then open `http://localhost:8080` (or whatever port).

## Files

- `index.html` — Main DA Explorer page
- `styles.css` — Full design system CSS
- `script.js` — Theme toggle, keyboard shortcuts, example data
- `assets/` — Fonts, icons, images, JS (shared with Nexus Explorer)