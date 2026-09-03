# Xenom.global — Decathlon Scorecards

Single-file, installable web app (PWA) for scoring decathlon events.

Open `index.html` in any browser, or install it as a home-screen app on iOS / Android.

## Events

| Page | Event | Scoring |
|------|-------|---------|
| `snatch.html` | 001 · Snatch RM | Weight plate calculator (kg/lb, plates ×2 + bar) |
| `hspu.html` | 002 · HSPU | 6 rounds · sum of good reps |
| `c2b.html` | 003 · C2B | 8 rounds · sum of good reps |
| `lunges.html` | 004 · Lunges | 12 rounds · sum of good reps |

## How it works
- **Snatch RM:** Tap plates to toggle on/off (one of each, no stacking). Plate sum ×2 + bar weight.
- **Round events:** Each round has a GOOD/FOUL toggle and a rep count. Total = sum of reps from good rounds. Arrow buttons navigate rounds.
- Everything is stored in your browser's local storage.

Served as a static site via GitHub Pages.
