/*
  MOOmentum Mental Fitness Character — app logic.

  Nothing is saved anywhere. Where someone is in the assessment lives in
  the page address (after the #), so the browser Back button works and a
  finished report can be bookmarked or shared as a link:

    #q=3&n=Sam&a=74            on question 3, answers so far
    #r=7486359267&n=Sam&d=...  a finished report

  Each score is one character: 1–9, with 0 standing for 10.
*/
(() => {
  const C = window.MOO_CONTENT;
  const PILLARS = C.pillars;
  const COUNT = PILLARS.length;
  const ADVANCE_DELAY = 280;
  const app = document.getElementById("app");
  let advanceTimer = null;

  // ---------- helpers ----------

  const esc = (text) =>
    String(text).replace(/[&<>"']/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[ch]);

  // *word* -> highlighted word
  const highlight = (text) => esc(text).replace(/\*(.+?)\*/g, "<b>$1</b>");

  const encodeScores = (scores) => scores.map((s) => (s === 10 ? "0" : String(s))).join("");
  const decodeScores = (text) => [...(text || "")].map((ch) => (ch === "0" ? 10 : Number(ch)));
  const validScores = (text) => new RegExp(`^[0-9]{${COUNT}}$`).test(text || "");

  const band = (score) => C.bands.find((b) => score <= b.max);
  const rank = (total) => C.ranks.find((r) => total < r.below).label;
  const icon = (p) => `brand/pillar-icons/${p.icon}.webp`;
  const twoDigits = (n) => String(n).padStart(2, "0");

  function today() {
    const d = new Date();
    return `${d.getFullYear()}-${twoDigits(d.getMonth() + 1)}-${twoDigits(d.getDate())}`;
  }

  function prettyDate(iso) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(iso || "")) return "";
    const [y, m, d] = iso.split("-").map(Number);
    return new Date(y, m - 1, d).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
  }

  const readState = () => new URLSearchParams(location.hash.slice(1));

  function go(params, { replace = false } = {}) {
    const clean = Object.fromEntries(Object.entries(params).filter(([, v]) => v !== "" && v != null));
    const hash = Object.keys(clean).length ? `#${new URLSearchParams(clean)}` : location.pathname + location.search;
    history[replace ? "replaceState" : "pushState"](null, "", hash);
    render();
  }

  // Move keyboard and screen-reader focus to the new screen's heading.
  function focusHeading() {
    const heading = app.querySelector("[data-focus]");
    if (heading) heading.focus({ preventScroll: true });
  }

  // ---------- screens ----------

  function renderIntro(state) {
    const t = C.intro;
    document.title = "MOOmentum Mental Fitness Character";
    app.innerHTML = `
      <main class="screen">
        <section class="card intro-card">
          <img class="front-logo" src="brand/front-logo.webp" alt="MOOmentum — Mental fitness and performance coaching" width="1934" height="517">
          <h1 class="headline" tabindex="-1" data-focus>${t.headline.map((line) => `<span>${highlight(line)}</span>`).join("")}</h1>
          <ul class="points">${t.points.map((p) => `<li>${esc(p)}</li>`).join("")}</ul>
          <form class="name-form" novalidate>
            <div class="ask">
              <img class="cow" src="brand/cow.webp" alt="" width="324" height="216">
              <label class="bubble" for="player">${esc(t.namePrompt)}</label>
            </div>
            <input id="player" name="player" maxlength="24" autocomplete="given-name" autocapitalize="words"
              placeholder="${esc(t.namePlaceholder)}" value="${esc(state.get("n") || "")}">
            <button class="btn primary big" type="submit"><span aria-hidden="true">▶</span> ${esc(t.startButton)}</button>
          </form>
        </section>
      </main>`;

    app.querySelector("form").addEventListener("submit", (event) => {
      event.preventDefault();
      go({ q: 1, n: app.querySelector("#player").value.trim() });
    });
  }

  function renderQuiz(state) {
    const answers = decodeScores(state.get("a")).filter((s) => s >= 1 && s <= 10).slice(0, COUNT);
    const name = state.get("n") || "";
    // Never skip ahead past the first unanswered question.
    const index = Math.min(Math.max(Number(state.get("q")) || 1, 1), answers.length + 1, COUNT) - 1;
    const pillar = PILLARS[index];
    const chosen = answers[index];
    const last = index === COUNT - 1;
    const t = C.quiz;

    document.title = `Question ${index + 1} of ${COUNT} · MOOmentum`;
    app.innerHTML = `
      <main class="screen">
        <section class="card quiz-card">
          <header class="quiz-head">
            <img class="brand-mark" src="brand/moo-mark.webp" alt="MOOmentum" width="866" height="614">
            <p class="count">PILLAR ${twoDigits(index + 1)} / ${COUNT}</p>
          </header>
          <div class="progress" role="progressbar" aria-label="Progress" aria-valuemin="0" aria-valuemax="${COUNT}" aria-valuenow="${index + 1}">
            <i style="width:${((index + 1) / COUNT) * 100}%"></i>
          </div>
          <div class="pillar-title">
            <img src="${icon(pillar)}" alt="" width="64" height="64">
            <p class="eyebrow">${esc(pillar.name)}</p>
          </div>
          <h2 id="question" tabindex="-1" data-focus>${esc(pillar.question)}</h2>
          <p class="instruction">${esc(t.instruction)}</p>
          <div class="scale" role="radiogroup" aria-labelledby="question">
            ${Array.from({ length: 10 }, (_, i) => i + 1)
              .map((n) => `<button type="button" role="radio" aria-checked="${chosen === n}" class="${chosen === n ? "selected" : ""}" data-score="${n}"
                aria-label="${n}${n === 1 ? `, ${t.lowLabel}` : n === 10 ? `, ${t.highLabel}` : ""}">${n}</button>`)
              .join("")}
          </div>
          <div class="scale-labels" aria-hidden="true"><span>1 · ${esc(t.lowLabel)}</span><span>10 · ${esc(t.highLabel)}</span></div>
          <footer class="quiz-actions">
            <button type="button" class="btn ghost" data-back>← Back</button>
            <button type="button" class="btn primary" data-next ${chosen ? "" : "disabled"}>${last ? "See my report" : "Next pillar"} →</button>
          </footer>
        </section>
      </main>`;

    const next = (scores) => {
      if (last) go({ r: encodeScores(scores), n: name, d: today() });
      else go({ q: index + 2, n: name, a: encodeScores(scores) });
    };

    const choose = (score) => {
      const updated = answers.slice();
      updated[index] = score;
      // Show the choice straight away, then move on.
      go({ q: index + 1, n: name, a: encodeScores(updated) }, { replace: true });
      advanceTimer = setTimeout(() => next(updated), ADVANCE_DELAY);
    };

    app.querySelectorAll("[data-score]").forEach((button) =>
      button.addEventListener("click", () => choose(Number(button.dataset.score))));
    app.querySelector("[data-next]").addEventListener("click", () => chosen && next(answers));
    app.querySelector("[data-back]").addEventListener("click", () =>
      index === 0 ? go({ n: name }) : go({ q: index, n: name, a: encodeScores(answers) }));

    quizKeys = (event) => {
      if (event.target.tagName === "INPUT" || event.metaKey || event.ctrlKey || event.altKey) return;
      if (/^[0-9]$/.test(event.key)) choose(event.key === "0" ? 10 : Number(event.key));
    };
  }

  function renderReport(state) {
    const scores = decodeScores(state.get("r"));
    const name = (state.get("n") || "").trim();
    const taken = prettyDate(state.get("d"));
    const total = scores.reduce((sum, s) => sum + s, 0);
    const ranked = scores.map((score, index) => ({ score, index, pillar: PILLARS[index] }));
    // Ties go to the pillar that comes first in the list.
    const strengths = [...ranked].sort((a, b) => b.score - a.score || a.index - b.index).slice(0, 3);
    const focus = ranked
      .filter((r) => !strengths.includes(r))
      .sort((a, b) => a.score - b.score || a.index - b.index)
      .slice(0, 3);
    const top = strengths[0];
    const R = C.report;

    document.title = name ? `${name}'s MOOmentum report` : "Your MOOmentum report";
    app.innerHTML = `
      <main class="screen">
        <article class="card report">
          <header class="report-head">
            <img class="brand-mark" src="brand/moo-mark.webp" alt="MOOmentum" width="866" height="614">
            <div class="who">
              <p class="eyebrow">Mental fitness report</p>
              <h1 tabindex="-1" data-focus>${esc(name || "Your report")}</h1>
              ${taken ? `<p class="taken">Taken ${esc(taken)}</p>` : ""}
            </div>
            <div class="overall">
              <span>Overall</span>
              <strong>${total}</strong>
              <small>/100 · ${esc(rank(total))}</small>
            </div>
          </header>

          <section class="character">
            <div class="stage">
              <img src="brand/characters/${top.pillar.character}.webp" alt="${esc(top.pillar.type)} character" width="1024" height="1536">
            </div>
            <div class="character-text">
              <p class="eyebrow">Your character type</p>
              <h2>${esc(top.pillar.type)}</h2>
              <p class="summary">${esc(top.pillar.summary)}</p>
              <p>Your strongest pillar is <strong>${esc(top.pillar.name)}</strong> (${top.score}/10). Use it as your signature strength while you build the rest.</p>
            </div>
          </section>

          <section class="block">
            <h2 class="section-title">Your ten pillars</h2>
            <ul class="legend">
              ${C.bands.map((b, i) => `<li><i class="${b.colour}"></i>${esc(b.label)} <span>(${i ? C.bands[i - 1].max + 1 : 1}–${b.max})</span></li>`).join("")}
            </ul>
            <ol class="stat-list">
              ${ranked.map(({ score, pillar }) => {
                const b = band(score);
                return `<li class="stat">
                  <img src="${icon(pillar)}" alt="" width="32" height="32">
                  <span class="stat-name">${esc(pillar.name)}</span>
                  <span class="stat-score"><b>${score}</b>/10</span>
                  <span class="dots" aria-hidden="true">${Array.from({ length: 10 }, (_, i) => `<i class="${i < score ? b.colour : ""}"></i>`).join("")}</span>
                  <span class="stat-band ${b.colour}">${esc(b.label)}</span>
                </li>`;
              }).join("")}
            </ol>
          </section>

          <section class="block">
            <h2 class="section-title">Your top strengths</h2>
            <ul class="strengths">
              ${strengths.map(({ score, pillar }) => `<li><img src="${icon(pillar)}" alt="" width="40" height="40"><span>${esc(pillar.name)}</span><b>${score}/10</b></li>`).join("")}
            </ul>
          </section>

          <section class="block">
            <h2 class="section-title">Your next mission</h2>
            <p class="lead">Your three lowest pillars right now, with small actions to try. Start small, repeat it, then level up.</p>
            <div class="missions">
              ${focus.map(({ score, pillar }, i) => `
                <section class="mission">
                  <header>
                    <span class="priority">Priority ${i + 1}</span>
                    <img src="${icon(pillar)}" alt="" width="44" height="44">
                    <div><h3>${esc(pillar.name)}</h3><p>${score}/10 · ${esc(band(score).label)}</p></div>
                  </header>
                  <ol>${pillar.actions.map((a) => `<li>${esc(a)}</li>`).join("")}</ol>
                </section>`).join("")}
            </div>
            <p class="tip"><strong>Player tip:</strong> ${esc(R.playerTip)}</p>
          </section>

          <section class="block keep no-print">
            <h2 class="section-title">${esc(R.keepTitle)}</h2>
            <p>${esc(R.keepText)}</p>
            <div class="keep-actions">
              <button type="button" class="btn primary" data-copy>Copy report link</button>
              <button type="button" class="btn ghost" data-print>Save as PDF</button>
              ${navigator.share ? `<button type="button" class="btn ghost" data-share>Share</button>` : ""}
            </div>
            <p class="status" role="status"></p>
          </section>

          <footer class="report-foot">
            <p class="starting">${esc(R.starting)}</p>
            <button type="button" class="btn primary no-print" data-retake>↻ Retake assessment</button>
            <p class="print-only">Open this report again: ${esc(location.href)}</p>
            <p class="disclaimer">${esc(R.disclaimer)}</p>
          </footer>
        </article>
      </main>`;

    const status = app.querySelector(".status");
    const say = (text) => { status.textContent = text; };

    app.querySelector("[data-copy]").addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(location.href);
        say("Link copied. Paste it somewhere safe, like your notes or an email to yourself.");
      } catch {
        window.prompt("Copy this link to keep your report:", location.href);
      }
    });
    app.querySelector("[data-print]").addEventListener("click", () => window.print());
    app.querySelector("[data-share]")?.addEventListener("click", () =>
      navigator.share({ title: document.title, url: location.href }).catch(() => {}));
    app.querySelector("[data-retake]").addEventListener("click", () => go({ n: name }));
  }

  // ---------- routing ----------

  let quizKeys = null;

  function render() {
    clearTimeout(advanceTimer);
    quizKeys = null;
    const state = readState();
    const before = app.dataset.screen;
    if (validScores(state.get("r"))) renderReport(state);
    else if (state.has("q")) renderQuiz(state);
    else renderIntro(state);

    // Only jump to the top when the screen or question actually changes.
    const now = `${[...state.keys()][0] || "intro"}:${state.get("q") || ""}`;
    if (now !== before) {
      window.scrollTo(0, 0);
      focusHeading();
    }
    app.dataset.screen = now;
  }

  document.addEventListener("keydown", (event) => quizKeys && quizKeys(event));
  window.addEventListener("popstate", render);
  window.addEventListener("hashchange", render);
  render();
})();
