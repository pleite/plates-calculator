# Xenom.global — Decathlon Scorecards

Installable, offline-capable web app (PWA) for scoring the XENOM™ Decathlon of Fitness™ events.

Use the GitHub Pages site in a browser, or install it as a home-screen app on iOS or Android. Opening `index.html` directly still runs the calculators, but browsers require HTTPS or localhost for service workers and installation.

## Events

| Page | Event | Type | Scoring |
| ------ | ------- | ------ | --------- |
| `snatch.html` | 001 · 1RM Snatch | Plate calculator | Plates ×2 + bar (kg/lb) |
| `event-002.html` | 002 · Wall Walks + Rope Climbs | Ladder | +2 WW +1 RC per round, 8 min |
| `event-004.html` | 004 · Barbell Cycling | AMRAP rounds | 12 DL + 9 FS + 6 S2OH + 3 Thr per round, 5 min |
| `event-006.html` | 006 · Gymnastics Sprint | Rounds + AMRAP | 3×(15 T2R + 10 DB HS → 10 PU) + AMRAP C2B, 6 min |
| `event-008.html` | 008 · Cardio Chipper | Chipper + AMRAP | 6-station chipper + AMRAP burpees, 12 min |
| `event-009.html` | 009 · Clean Ladder | Ladder + AMRAP | 10→2 reps at ascending weights + AMRAP, 8 min |
| `event-010.html` | 010 · Gym Triplet | AMRAP rounds | 6 HSPU + 8 PU + 12 Lunge per round, 12 min |

Events 003 (Echo Bike), 005 (Endurance Double), and 007 (Rhino) are single-value events (calories / time / max load) and don't need a scorecard.

## How it works

- **Plate calculator (001):** Tap plates to toggle on/off (one of each, no stacking). Plate sum ×2 + bar weight. kg/lb toggle in settings.
- **AMRAP rounds (004, 010):** Each round has per-exercise rep inputs. Total = sum of all reps across all rounds (including partials from the last round). Arrow buttons navigate rounds.
- **Ladder (002, 009):** Each round has a specific rep target (and weight for 009). Enter reps completed per round. Total = sum of all reps.
- **Rounds + AMRAP (006):** Fixed 3-round structure with per-exercise inputs, plus an AMRAP section for the finisher.
- **Chipper + AMRAP (008):** Fixed sequence of 6 exercises with target reps, plus an AMRAP section.
- **Best of attempts (007):** Enter load per attempt. Heaviest 5RM counts.
- Everything is stored in your browser's local storage.

## History and recovery

- **Clear all** archives a non-empty score before resetting the current event.
- History is stored separately for each event, newest first, with up to 60 entries.
- **Restore** replaces the full event state, including its current round or step and AMRAP value.
- Empty clears and consecutive duplicate states are not added to history.
- Event 001 retains its existing plate-selection history, held memory, units, and bar configuration.
- Invalid saved JSON falls back to a valid default state. If browser storage is unavailable or full, the active calculator continues to work in memory for the current page session.

History is local to the browser profile. Clearing site data or iOS storage eviction can remove it; there is no cloud sync.

## PWA and offline use

The root `manifest.webmanifest` defines one app containing the hub and all scorecards. The root `sw.js` precaches every event page and shared asset so direct event routes can reload offline after the service worker has installed.

### Install

- **iOS:** Open the GitHub Pages URL in Safari, use Share, then **Add to Home Screen**.
- **Android:** Open the URL in Chrome and select **Install app** or **Add to Home screen**.
- Visit online once after deployment so the app shell and event pages are cached.

### Deploy updates

When changing a cached HTML, CSS, JavaScript, manifest, or icon file, increment `CACHE_NAME` in `sw.js`. The new worker installs the updated shell, activates, and removes older `xenom-scorecards-*` caches.

The manifest and service-worker paths are relative by design so the app works from the GitHub Pages project path `/plates-calculator/` rather than assuming site-root hosting.

## Mobile verification

Before publishing scoring changes, check at least one current iPhone and Android device:

1. Enter a partial and a completed score for every changed event and confirm the total.
2. Tap **Clear all**, confirm the displayed total resets, then restore the archived score.
3. Reload after restore and confirm the restored state persists.
4. Test portrait and landscape with the numeric keyboard open; the score, current round or step, focused input, and navigation must not overlap.
5. Enable airplane mode after one online visit and reload the hub plus a direct event page.
6. Return online after a cache-version deployment and confirm the updated app shell appears.

Served as a static site via GitHub Pages at `https://pleite.github.io/plates-calculator/`.
