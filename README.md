# MOOmentum Check

A ten-pillar mental fitness check. People answer 10 quick questions (about 2 minutes) and get a personal report to keep: their character type, their score on each pillar (1 to 7, total out of 70), their top strengths, and their next mission, which is their three lowest pillars, each with why it matters and three small actions. Player tip: pick one action and do it daily.

## How it works

1. **Name screen:** enter a name (optional) and press Start.
2. **Ten questions:** one pillar per screen, scored 1 to 7. Tapping a number moves on automatically, and Back lets people change answers.
3. **Report:** character type, all ten pillars, top three strengths and next mission.
4. **Restart:** the button at the bottom of the report starts again. The earlier scores travel in the link, so the new report shows before and after for every pillar.

## No saved data

Nothing is stored on a server or in the browser. The answers live in the page address (after the `#`), so:

- the browser Back button works during the questions
- a finished report has its own link that can be bookmarked, copied or shared, and reopens the same report
- **Save as PDF** prints a clean report

Reports made before the 1 to 7 scale (links without `s=7`) still open: their 1 to 10 scores are converted to 1 to 7.

## Editing the wording

All text lives in [`site/content.js`](site/content.js): the front page, questions, character types and summaries, why each pillar matters, actions, score bands, ranks and report wording. Edit the text between the backticks and commit. The site republishes automatically.

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
