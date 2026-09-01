# Building a business case for a feature on an existing product

A reusable playbook. It describes how to validate, ideate, test and narrate a new feature for a product that is already live in the market, and how to turn that work into a single, structured, storytelling case-study webpage that a hiring manager (or a product council) can read top to bottom and believe.

This document is for the author and the build assistant only. Nothing in it ships to the site's frontend or backend. The worked example is SafeRide Priority, a safety and reliability layer proposed for the Uber rider app in Hyderabad.

---

## 1. The stance

A business case is an argument built from evidence. For an existing product the argument is always a **delta**: which metric moves, by how much, at what cost, measured against the baseline the product already has. Done means an approved budget, a pilot slot on the roadmap, and a value model a finance partner would sign: revenue lift, cost saved or experience gained against the baseline. Two failure modes to watch the whole way: **cannibalization** (the feature steals from something the product already earns) and **adoption drag** (the feature adds friction that suppresses the core flow).

Three principles run through every phase:

1. **Every claim has a tag.** SOURCED (a public source is linked), ASSUMPTION (we say so in plain words next to it), or PILOT HYPOTHESIS (a target we intend to test, never an outcome we claim). An outcome is never stated as achieved without data.
2. **The reader is a decision customer.** The case is written backwards from the person or forum that will fund, staff, approve or kill it. Name them in the first ten minutes.
3. **The prototype is evidence.** An interactive prototype is how the solution gate gets cleared without a live pilot. It is not decoration; it sits in the narrative exactly where the solution needs proof.

---

## 2. The spine: nine phases, four gates

Work discovery to delivery, gated four times. Each gate asks one question, spans a set of phases, and clears only when the required lenses beat their threshold and every core item in the span is evidenced. When a gate does not clear, it tells you what to test next. That is the loop.

| Phase | Name | What it is for |
|---|---|---|
| P0 | Frame | Ten minutes of setup that saves weeks. Name the case, its reader and its constraints before any research. |
| P1 | Discover | Map the world as it is. People, pains, money flows, timing. No solutions allowed in this phase. |
| P2 | Validate the problem | Prove the pain is real, painful, widespread and reachable. This is where weak cases should die, cheaply. |
| P3 | Ideate | Turn the validated pain into a value proposition, a concept, variants, and the assumptions the concept rests on. |
| P4 | Validate the solution | Prototype, experiment cards, willingness to pay, a feasibility spike, a pilot design, a loop log. |
| P5 | Materialize and build | Business model canvas, MVP scope, roadmap, operational plan, team and gaps, staged development, telemetry. |
| P6 | Monetize and validate | Revenue and pricing model, unit economics, pilot run and readout, retention and pull evidence. |
| P7 | Grow and scale | Positioning strategy, prioritized product-market combinations, marketing mix, growth model and north star, sales plan, channel tests. |
| P8 | Assemble the case | Financial plan, scenarios and sensitivity, model-specific metrics, investment ask, risk register, legal and IP, impact statement, the narrative and pitch map. |

| Gate | Question | Span | What clears it (reference thresholds) |
|---|---|---|---|
| G1 Problem gate | Is the problem real, painful, widespread and reachable? | P1–P2 | Desirability 70, Viability 60, Integrity 40; all 12 core items evidenced |
| G2 Solution gate | Does the solution earn desire, and can you build it? | P3–P4 | Desirability 70, Feasibility 65, Viability 50, Integrity 50; all 8 core items |
| G3 Money gate | Does one unit of this business make money? | P5–P6 | Desirability 60, Feasibility 60, Viability 70; all 7 core items |
| G4 Case gate | Does the whole case hold, end to end? | P1–P8 cumulative | Desirability 70, Feasibility 70, Viability 70, Integrity 60; all 34 core items |

**Lenses (DFVI).** Desirability (human), Feasibility (technology), Viability (business), Integrity (impact). Each checklist item carries one or two lenses and a weight (w1 to w3). An evidenced item earns weight times strength (weak, solid, strong). A lens bar shows points earned over points possible in the gate's span. The innovation sweet spot is where all four lenses hold.

**Core items.** Some items are marked core. A gate cannot clear while a core item in its span is still open, however high the lens scores are.

The full item list, with WHAT / WHY / HOW / OUTPUT / CLEARS / TOOLS per item, lives in `casecraft-checklist-reference.md`.

---

## 3. From checklist to story

The checklist is a working tool, never the page structure. A reader wants a story. The storytelling order that works for a hiring manager:

1. Introduction into the ecosystem
2. User persona(s) and buyer persona(s)
3. Pain statements for both
4. Market sizing and data that quantify the problem
5. Existing solutions (competition) that solve part of it, and the problems still unsolved
6. A clear value proposition
7. A solution concept that is simple and understandable
8. Product roadmap
9. How the offering makes money (basic revenue and pricing model)
10. Competences and skills the project needs, and how the team covers them
11. Strategic vision and development stages
12. Validation of at least the first stage (the pilot)
13. Impact statement to close
14. Business Model Canvas
15. Doblin ten types applied: show where the innovation sits

Map that order onto **four chapters, one per gate**, plus the prototype:

| Chapter | Gate | Storyline items | Gate card verdict style |
|---|---|---|---|
| 1 The problem | G1 | ecosystem, personas (user + buyer, where the buyer of an internal case is the decision customer), pains, market sizing, competition and white space, why now, pain-to-metric link | "Cleared on public evidence. Internal baselines still to pull." |
| 2 The solution | G2 | value proposition, concept on one page, options weighed, to-be flow, feature set and MVP scope, how it decides (feasibility), risks designed against, Doblin | "Cleared on design and a working prototype. Pilot pending." |
| Prototype | G2 evidence | the interactive walkthrough, placed right after chapter 2 | none |
| 3 The money | G3 | north star and KPI hypotheses, pricing and revenue model with labelled assumptions, value logic against the baseline, business model canvas, pilot plan and staged rollout, the squad and governance | "Open until the pilot stages read out." |
| 4 The case | G4 | roadmap and vision, the ask and the stop rules, impact statement, the case in sixty seconds, how the case was built | "The ask, stated. Decision pending." |

Every chapter ends with a **gate card**: what we know (sourced), what we assume (tagged), what would clear the gate (evidence still needed, pilot stage named), a lens row in plain words (for riders / to build / for the business / doing no harm, each marked Evidence, Design or Open), and a one-line verdict. The card never uses the checklist's internal vocabulary (P0, DFVI, weights).

---

## 4. What goes on the page, what stays in the prep doc

Rule of thumb: **on the page if a reader needs it to believe the case; in the author's prep doc if it explains how the author worked.**

On the page: problem hypothesis, decision customer, constraints, ecosystem, personas and jobs, pains and evidence, market sizing, competitors and white space, why now, gap-to-metric, value proposition, concept, options weighed, to-be flow, MVP scope, feasibility in plain words, risks designed against, prototype, north star and KPI hypotheses, pricing and revenue shape, business model canvas, pilot plan and stages, squad and governance, roadmap, the ask, impact, pitch map.

In the prep doc only: research plan and interview targets, evidence log method, experiment cards, willingness-to-pay probe design, loop log, assumption map with confidence, baseline metric request list, value model formula with blanks, stakeholder map with fears and asks, how it was built, first analyses with real data, likely interview questions.

Skip entirely when there is no honest content: pilot readout, retention evidence, financial plan with rupees, growth curves, team bios. Saying "no pilot has run" is stronger than inventing a number.

---

## 5. Evidence integrity

- Every market or problem number links to a public source, or the page says "our estimate" next to it.
- Assumptions are labelled in plain words at the point of use, never only in a footnote.
- Targets appear only as pilot hypotheses. Words like reduced, improved, increased need a source behind them.
- Personas built from secondary research are labelled composite, with fictional names.
- Evidence artifacts are real: article screenshots with links, review screenshots cropped to the review and never edited inside the frame, dated reports.
- Data stays in the market the case is about. For India, India data; the pilot city first when it exists.
- Guardrails are stated with the targets: the number that would make you stop.

## 6. Voice

- Write like a person explaining something to a friend. Simple words, short sentences.
- No em dashes in user-facing text. Use a colon or a comma.
- No "X, not Y" contrast pattern. Say what the thing is.
- No jargon where a plain word works. Gloss the few technical words that survive.
- Never name the tech stack or tools on the page.
- Headings sit on one line or break at a natural phrase.

## 7. Layout and mobile

- One route, chapters as sections with ids, a top nav that names the chapters (text links centred on desktop, icons with tap labels on mobile), a "case at a glance" strip under the hero that doubles as a table of contents, and a fixed prototype pill.
- Nothing ever needs sideways scrolling. Grids use intrinsic auto-fit columns; tables are grids of cards that stack below the small breakpoint; chips wrap.
- The sticky header stays one row and one height; anchor targets carry a scroll margin equal to that height.
- Sticky card decks on mobile pin below the header; never put overflow hidden on a wrapper around them.
- Verify on every phase: page width equals viewport width at 390px, anchors land under the header, decks still pin, reveal animations still fire.

## 8. The build process (what worked)

1. **Audit** the existing page against the checklist: full / partial / missing, with where on the page. Count the rollup.
2. **Mine the source material** (PRD, process doc, rules file) for content that can fill gaps honestly. List what exists only in the documents, what exists only on the site, what exists nowhere.
3. **Write the chapter map** before any code: chapter titles in the brand voice, the gate question, which existing components move where, which new blocks are needed with a short spec, what is deliberately skipped and why.
4. **Decide the three things the author owns**: how gates appear, how far numbers go in the money chapter, how a solo author presents the team.
5. **Centralize content** in one typed data file (chapters, gates, personas, jobs, stakeholders, why now, gap rows, constraints) so the nav, the case map, the chapters and the gate cards read one source and never retype a string.
6. **Build primitives once**: chapter wrapper, section header, tag, lens pill, gate card.
7. **Recompose the page**, then add new blocks, then edit existing copy, then the gate cards. Phase by phase, one gate at a time, with the user reviewing between phases.
8. **Verify** with the checks in section 7, run the voice greps, commit, deploy, record what changed.

---

## Appendix: the worked example (SafeRide Priority on Uber)

- **Mode:** existing product upgrade. Baseline: Uber India's rider app and its shipped safety toolkit (SOS, Share My Trip, RideCheck, trip PIN, audio recording, 24x7 line).
- **Problem hypothesis:** women should not need to build a safety plan by hand every time they book a late-night ride; the pre-booking minutes are empty in every app.
- **Decision customer:** Uber India's product council (Rider product, Trust & Safety, Marketplace), with Privacy Counsel and Ops reviewing; decision = approve an eight-week opt-in pilot in Hyderabad.
- **Audit result before the restructure:** 13 full, 18 partial, 18 missing. Strong on evidence, market, competitors, concept, prototype. Empty on personas, decision customer, gap-to-metric, and the whole commercial half.
- **Chapters:** 1 The problem (Every night, she builds her own safety plan.) · 2 The solution (One toggle, finished before the door closes.) · Prototype · 3 The money (What it costs, what it moves.) · 4 The case (The ask: eight weeks in Hyderabad.).
- **Numbers policy:** sourced market data with links; one labelled assumption (night share of trips, 10 to 15%); all KPI targets as pilot hypotheses (activation 35 to 45%, Circle setup 50%+, Priority Match 25%+ on elevated trips, anchor acceptance 20 to 35%, check-in 70%+, NPS +8 vs control, perceived control 4.0+/5, comprehension 85%+); guardrails (median added wait under 5 minutes, Limited Data shown under 80% coverage, no-response alerts under 10%, zero consent failures, no drop in core booking completion).
- **Pilot:** Hyderabad IT corridor (HITEC City, Gachibowli, Financial District), opt-in cohort, eight weeks, five stages: research prototype, shadow mode, limited opt-in (Brief + Circle), priority matching, zone expansion.
- **What was skipped on the page and why:** experiment cards, research plan, WTP probe, loop log (method, prep doc); financial plan, unit economics with rupees, retention, pilot readout (no honest data).

---

## Appendix B: reference notes from the Casecraft guide

### The case document, in order
When the gates clear, assemble the document in this order. It is the narrative arc a reader can follow cold: world, people, pain, proof, answer, machine, money, ask.

1. Introduction to the ecosystem, with the why-now
2. User and buyer personas, with pain statements for both
3. Market sizing and data that quantify the problems
4. Existing solutions, and what stays unsolved
5. Value proposition
6. Solution concept, with a visual demo or walkthrough
7. Product roadmap
8. Revenue and pricing model, or the business value model
9. Strategic vision, development stages, pilot validation
10. Business Model Canvas and the Doblin sweep
11. Resources: team, competences, ops plan with Gantt
12. Marketing plan: positioning, PMCs, mix per PMC
13. Sales plan: funnels, list building, nurturing, projections, KPIs
14. Financial plan: P&L, cash flow, ratios, model metrics, investment need
15. Risk register, legal and compliance
16. Impact statement, to close

For an internal feature case (this project), items 12 to 14 shrink to what an internal reader needs: positioning inside the app, the value model against the baseline, and the ask. Say what was cut and why.

### Where cases die
A few failure patterns show up in almost every weak case. Sizing with no bottom-up check, so the TAM is a press release. Personas written from imagination, with zero interview quotes behind them. A solution described in ten features instead of one job. Pricing asserted, never probed. Unit economics missing while the P&L shows crores in year three. Competitors listed but the white space unexplained, so the reader assumes you missed a player. And no kill criteria anywhere, which tells a sponsor you plan to spend until stopped. Every one of these has an item in the checklist.

### Evidence standards
First degree means you collected it yourself from the source: interviews you ran, behaviour you observed, numbers from your own pilot. Second degree means someone else published it: industry reports, filings, datasets, competitor pricing pages. A case built only on second degree research is a literature review; one built only on first degree anecdotes is a diary. You need both, and qualitative and quantitative on each side.

| Rating | What it takes | Example |
|---|---|---|
| Weak · 1 | One source, or secondhand only. A signal, no more. | Two founders you know agree the pain is real. |
| Solid · 2 | Two independent sources, at least one first degree. | 12 of 18 interviews rank the pain top three, and a sector report prices the waste. |
| Strong · 3 | Triangulated, first degree, with numbers attached. | Interviews, a 140-response survey and observed workaround time all converge, and 6 prospects signed LOIs. |

These ratings are the strength values in the gate calculator. Rate against the bar, never against affection for the idea. Honest read for SafeRide today: almost everything is second degree (Solid at best where two independent public sources agree; Weak where one report carries the claim). First-degree evidence arrives only with the pilot.

### The five modes
- **New startup idea.** The full spine, zero to one. Emphasis on problem evidence, willingness to pay and the beachhead choice. The close is an investment ask with tranches tied to milestones.
- **Existing product upgrade.** Starts from a baseline audit of the live product. Every claim is a delta: which metric moves, by how much, at what cost. Adds cannibalization and adoption checks; the money story is business value (revenue lift, cost saved or experience gained against the baseline). *This project.*
- **Product ecosystem growth.** The unit of analysis is the system: value-flow map across products, flywheel design, partner economics, attach-rate targets. The growth phase is the centre of gravity.
- **Venture architecture.** No fixed idea going in. Sector scans, a problem inventory, a prioritization matrix, sizing per industry, sector and niche. Deliverable: a validated case plus a pilot definition.
- **Corporate venture building.** A NewCo inside a company. Asset inventory, a strategic fit memo with a named sponsor, innovation accounting, metered funding, NewCo governance.

### Sources and tool library
- Service Design Tools, the open tool library: https://servicedesigntools.org/tools
- NN/g, Service Blueprints: https://www.nngroup.com/articles/service-blueprints-definition/ and Service Design 101: https://www.nngroup.com/articles/service-design-101/
- Strategyzer, Business Model Canvas and Value Proposition Canvas: https://www.strategyzer.com/library/the-business-model-canvas
- Doblin / Deloitte, Ten Types of Innovation (framework brochure, six principles, per-type tactics)
- Ainna, What is venture building (factory model, PMF signals, sunset protocol)
- d.MBA, IDEO U, Board of Innovation on business design (the four-circle sweet spot comes from Board of Innovation)
- Designlab, Service Design 101
