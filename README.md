# Xenom.global — Decathlon Scorecards

Single-file, installable web app (PWA) for scoring the XENOM™ Decathlon of Fitness™ events.

Open `index.html` in any browser, or install it as a home-screen app on iOS / Android.

## Events

| Page | Event | Type | Scoring |
|------|-------|------|---------|
| `snatch.html` | 001 · 1RM Snatch | Plate calculator | Plates ×2 + bar (kg/lb) |
| `event-002.html` | 002 · Wall Walks + Rope Climbs | Ladder | +2 WW +1 RC per round, 8 min |
| `event-004.html` | 004 · Barbell Cycling | AMRAP rounds | 12 DL + 9 FS + 6 S2OH + 3 Thr per round, 5 min |
| `event-006.html` | 006 · Gymnastics Sprint | Rounds + AMRAP | 3×(15 T2R + 10 DB HS → 10 PU) + AMRAP C2B, 6 min |
| `event-007.html` | 007 · Rhino | Best of attempts | 5RM Pull, heaviest load counts, 3 min |
| `event-008.html` | 008 · Cardio Chipper | Chipper + AMRAP | 6-station chipper + AMRAP burpees, 12 min |
| `event-009.html` | 009 · Clean Ladder | Ladder + AMRAP | 10→2 reps at ascending weights + AMRAP, 8 min |
| `event-010.html` | 010 · Gym Triplet | AMRAP rounds | 6 HSPU + 8 PU + 12 Lunge per round, 12 min |

Events 003 (Echo Bike), 005 (Endurance Double) are single-value events (calories / time) and don't need a scorecard.

## How it works

- **Plate calculator (001):** Tap plates to toggle on/off (one of each, no stacking). Plate sum ×2 + bar weight. kg/lb toggle in settings.
- **AMRAP rounds (004, 010):** Each round has per-exercise rep inputs. Total = sum of all reps across all rounds (including partials from the last round). Arrow buttons navigate rounds.
- **Ladder (002, 009):** Each round has a specific rep target (and weight for 009). Enter reps completed per round. Total = sum of all reps.
- **Rounds + AMRAP (006):** Fixed 3-round structure with per-exercise inputs, plus an AMRAP section for the finisher.
- **Chipper + AMRAP (008):** Fixed sequence of 6 exercises with target reps, plus an AMRAP section.
- **Best of attempts (007):** Enter load per attempt. Heaviest 5RM counts.
- Everything is stored in your browser's local storage.

Served as a static site via GitHub Pages at `https://pleite.github.io/plates-calculator/`.
