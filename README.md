# MOOmentum 28-Day Mental Fitness Reset

A ten-pillar mental fitness assessment. People answer 10 quick questions and get a personal report showing their character type, their scores on each pillar, their top strengths, and three focus areas with small actions to try.

## How it works

1. **Name screen:** enter a name (optional) and press Start.
2. **Ten questions:** one pillar per screen, scored 1–10. Tapping a number moves on automatically, and Back lets people change answers.
3. **Report:** character type, all ten pillars, top three strengths, next mission (three lowest pillars with actions), and a player tip.

## No saved data

Nothing is stored on a server or in the browser. The answers live in the page address (after the `#`), so:

- the browser Back button works during the questions
- a finished report has its own link that can be bookmarked, copied or shared, and reopens the same report
- **Save as PDF** prints a clean two-page report

## Editing the wording

All text lives in [`site/content.js`](site/content.js): the front page, questions, character types and summaries, actions, score bands, ranks and report wording. Edit the text between the backticks and commit. The site republishes automatically.

Keep the ten pillars in the same order, because saved report links store the scores in that order.

## Files

- `site/index.html`: page shell
- `site/content.js`: all wording (edit this one)
- `site/app.js`: how the assessment and report work
- `site/styles.css`: look and layout, including the print/PDF layout
- `site/brand/`: logo, cow, pillar icons and character artwork

## Publishing

Every push to `main` publishes the `site/` folder to GitHub Pages (`.github/workflows/pages.yml`). There is no build step.

To preview locally, run `python3 -m http.server` inside `site/` and open http://localhost:8000.
