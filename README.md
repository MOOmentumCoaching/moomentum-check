# MOOmentum 28-Day Mental Fitness Reset

A ten-pillar mental fitness assessment and 28-day plan. People answer 10 quick questions (about 2 minutes) and get a personal report showing their character type, their scores on each pillar, their top strengths, and a 28-day plan built from their three lowest pillars. On day 28 they retake it and see before and after.

## How it works

1. **Name screen:** enter a name (optional) and press Start.
2. **Ten questions:** one pillar per screen, scored 1–7. Tapping a number moves on automatically, and Back lets people change answers.
3. **Report:** character type, all ten pillars (total out of 70), top three strengths, and the 28-day plan:
   - Weeks 1–3: the lowest, second-lowest and third-lowest pillar, each with why it matters, three actions, "Pick one action. Do it daily." and seven daily tick boxes.
   - Week 4, Outperform week: keep the action that worked best, then **Retake and compare** on day 28.
4. **Retake and compare:** the earlier scores travel in the link, so the new report shows before and after for every pillar.

## No saved data on our side

Nothing is stored on a server. The answers live in the page address (after the `#`), so:

- the browser Back button works during the questions
- a finished report has its own link that can be bookmarked, copied or shared, and reopens the same report
- **Save as PDF** prints the report with the 28-day plan on its own page

The only thing kept in the browser is the plan's daily ticks, saved on that device only (localStorage) under the report link.

Reports made before the 1–7 scale (links without `s=7`) still open: their 1–10 scores are converted to 1–7.

## Editing the wording

All text lives in [`site/content.js`](site/content.js): the front page, questions, character types and summaries, why each pillar matters, actions, score bands, ranks, the 28-day plan and report wording. Edit the text between the backticks and commit. The site republishes automatically.

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
