# Implementation checklist: SafeRide case-study restructure

Phase-wise, step-wise. Each step names its check. Tick a box only after the check passes. The user reviews between phases and can say "go", "revise" or "skip".

Legend: `[ ]` open · `[x]` done · `[~]` done with a note

Standing rule (user, Sep 1 2026): the page never uses the method's internal vocabulary. No gate names, phase codes or lens acronyms in any user-visible string. Chapters are named by content (The problem · The solution · The business model · The ask); the closing card is a verdict card ("Where the problem stands": what we know / what we assume / what would settle it). Anchor ids: `#problem-verdict`, `#solution-verdict`, `#business-verdict`, `#ask-verdict`. Code identifiers (GateCard, GATE_1) may keep the method names.

## Phase 1: skeleton + Chapter 1 (Gate 1) + minimal Gate 2

### Docs first
- [x] `docs/method/existing-product-case-method.md` written (generic playbook + worked example)
- [x] `docs/method/casecraft-checklist-reference.md` written (P0–P2 transcribed; P3–P8 titles; gates table)
- [x] `docs/implementation-checklist.md` (this file)
- [x] `docs/interview-prep.md` skeleton with sections 1–5, 10, 14 filled
- [x] Skill saved at `~/.claude/skills/existing-product-case/SKILL.md`; memory pointer added
- Check: none of these files are imported anywhere under `src/`

### Content and primitives
- [x] `src/content/case.ts`: CHAPTERS, LENSES, GATE_1, GATE_2 (minimal), PERSONAS, JOBS, DECISION, STAKEHOLDERS, WHY_NOW, GAP_ROWS, CONSTRAINTS
- [x] `src/components/case/primitives.tsx`: Container, Chapter, SectionHeader, Tag, LensPill, GateCard
- Check: `npm run build` passes; only `ChapterNav.tsx` and existing files carry `"use client"`

### Navigation
- [x] `Nav.tsx`: desktop three-zone grid (logo left, centred chapter text links with scrollspy underline, pill right); mobile icons for live chapters with tap labels; height still 50px
- [x] `src/components/case/ChapterNav.tsx`: `useActiveChapter`, chapter icons
- [x] `src/components/case/CaseMap.tsx` with `id="case-study"`; unbuilt chapters render as "Coming next"
- [x] `Footer.tsx`: chapter index links
- Check: nav stays one row at 360, 390, 768, 1440; centre links hidden below `sm`; active link follows scroll at 1280
- Note for Phases 3–4: with four live chapters the mobile icon row may exceed 390px; plan to shrink the wordmark to the logo below 400px at that point

### Page recomposition
- [x] `page.tsx`: Hero → Ticker → CaseMap → Chapter 1 → Chapter 2 → Prototype → Footer, old `#case-study` / `#features` wrappers removed
- [x] `Evidence.tsx`: OBJECTIVES + DIFFERENT exported as `ConceptOnePage`, no longer rendered inside Evidence; kicker "THE PROOF"
- [x] `Comparison.tsx`: outer margin removed (Chapter supplies it)
- [x] `FlowCards.tsx`: `scroll-mt-[50px]` on `section#flow`
- Check: `#problem`, `#solution`, `#case-study`, `#features`, `#flow`, `#gate-1` land at top 50±1 at 390 and 1280; `#prototype` landing unchanged; Stats deck still pins (64, 72)

### Chapter 1 blocks
- [x] WhoDecides (decision, who decides, what done looks like, stakeholder chips)
- [x] Personas (Priya, Sneha, Ananya, Anil S.; composite label)
- [x] Jobs (6 rows, stack below `sm`)
- [x] WhyNow (4 sourced cards + "Why Uber first" line)
- [x] GapToMetric (5 rows, PILOT HYPOTHESIS tags, stacks below `sm`)
- [x] Constraints (chips read from `rules.ts` where values exist)
- Check: 390px `scrollWidth === innerWidth`; screenshots at 390 and 1440 reviewed

### Existing copy edits
- [x] Stats: "< 2 min" → sourced 82% cancel card; "8 PM–5 AM" recaptioned
- [x] Problem: PRD thesis callout; banned pattern rewritten
- [x] Architecture: retitled "What changes in Uber's flow"; "On Uber India today" list and duplicate "4 in 10" card removed
- [x] Industry: Uber card note = baseline line; FIT trimmed to 2 items; SOM has an inline T-Safe source link; unsourced crime-rate line removed
- [x] Comparison: JTBD kicker/heading/rows from `JOBS`; default OFF; helper text
- Check: `grep -rn "—" src/components src/content` = 0; every `", not "` hit reviewed; no tool names in copy

### Gate cards + rules
- [x] Verdict card 1 (know / assume / what would settle it / lenses / verdict), no gate vocabulary
- [x] Verdict card 2 minimal (H1–H4 as assumptions; settled by pilot stages 2 and 3)
- [x] RULES.md: rules 79+ for chapters, gate cards, number tags, no outcome claimed, scroll-mt convention
- Check: build, full visual pass at 390 and 1440, Reveal fires on gate cards
- [x] Commit ("Case restructure phase 1: chapters by gate, Gate 1 content, chapter nav"), deploy via clean-dir rsync, confirm live, update memory
- [ ] **Pause for user review**: centre nav labels, chapter titles, Chapter 1 copy

## Phase 2: Chapter 2 complete (Gate 2)
- [x] OptionsWeighed (standalone app vs Ola vs Uber layer; SOS-plus vs pre-booking layer; why the layer won)
- [x] Doblin "Where the innovation sits" grid (ten types, SafeRide touches lit, plain words)
- [x] NotList ("What SafeRide will never build"; the out-of-scope chip moved here from Constraints)
- [x] ResponsibleAI cards gain a "Risk:" line each (risk register in disguise)
- [~] DecisionEngine intro already read "Simple, explainable rules"; no change needed
- [x] FeatureStack lede: "P0 ships in the pilot. P1 follows once the pilot holds."
- [x] Full GATE_2 with "What we know" column (prototype, rules, baseline toolkit)
- [x] Prototype kicker "INTERACTIVE PROTOTYPE · THE EVIDENCE FOR CHAPTER 2"
- Check: build, voice greps, 390 audit, screenshots; commit + deploy; interview-prep sections 6–7 filled

## Phase 3: Chapter 3 The money (Gate 3)
- [x] Chapter opener: "This chapter has no pilot data. Every number here is a pilot hypothesis, marked as one."
- [x] MetricTree (north star, KPI targets, guardrails; every value tagged)
- [x] RevenueModel (₹20 priority fee × night trips × attach rate; illustrative range; inputs tagged; WTP open question)
- [x] ValueLogic (revenue lift / cost saved / experience gained; cannibalization + adoption drag watchpoints)
- [x] BusinessModelCanvas (9 blocks, qualitative, stacks below `sm`)
- [x] PilotPlan (corridors, cohort, 8 weeks, 5-stage stepper, what stage 1 validates)
- [x] Squad (roles, governance owners + cadence, "what I covered as the PM, what I would hire or borrow")
- [x] GATE_3; CHAPTERS money status → live; mobile nav: 28px icons, wordmark from 380px, pill reads "Prototype" on phones
- Check: build, voice greps, 390 audit, screenshots; commit + deploy; interview-prep sections 8–9 filled

## Phase 4: Chapter 4 The case (Gate 4)
- [x] Roadmap (stages → quarters, direction only)
- [x] AfterHyderabad folded into the Roadmap "Next" and "Later" horizons
- [x] TheAsk (pilot slot, cohort, squad, stop rules)
- [x] Impact statement
- [x] CaseInSixtySeconds (pitch map: one line per gate + verdicts)
- [x] AboutThisCase (how it was built, tools unnamed)
- [x] GATE_4; CHAPTERS the-case status → live; footer index complete
- Check: final voice + source audit across the page; build; 390 audit; screenshots; commit + deploy; interview-prep sections 11–13, 15 filled; method doc appendix updated with final numbers


Phases 2 to 4 shipped together on Sep 1, 2026 at the user's request ("go for it and implement all the changes"). Prototype removed from the centre nav links (the pill covers it).

## Phase 5: Craft pass (shipped Sep 1, 2026)
- [x] Visual source snippets: every market number links out through a screenshot card (`SourceSnippet`, registry `SOURCES` in case.ts, `public/sources/*.jpg`); no "Source ↗" text left, straight → arrows only
- [x] Responsive SVG figures (`Figures.tsx`: north star tree, revenue funnel, stage timeline, road, ripples) and motion helpers (`Motion.tsx`: pointer-following gradient border, tilt cards, phone carousels with pop and fade)
- [x] "How we got here" insights strip before the prototype (evidence → insight → decision → screen, tap jumps into the prototype)
- [x] One PILOT HYPOTHESIS label above the KPI grid; competitor coverage strip (before / at pickup / during / after) with the SafeRide row lit; "Built for Uber first. Made for every riding app." card and roadmap line
- [x] Review grid aligned top and bottom; hero hook rewritten; SEO metadata in layout
- [x] Prototype: more "Why this ride?" reasons (airport, care, outstation) plus Other with a short free-text box; scenario pills explain Elevated / Lower / Limited Data (hover on web, line below on phones)
- [x] Safety Circle tracking map: fits the frame on every width (meet, never slice), labelled pickup, drop area and chosen safer anchor, car passes them, stops row under the map
- Check: build green, voice greps clean, 390 width = viewport, no broken images, screenshots reviewed; commit + deploy

## Standing verification routine (every phase)
1. `npm run build`
2. `grep -rn "—" src/components src/content`; review `grep -rn ", not " src/components src/content`
3. Serve the build on a spare port as a separate background task; drive headless Chrome over CDP: width check at 390, anchor landings, scrollspy, decks, Reveal
4. Screenshots at 390 and 1440 of every new block
5. Commit with a descriptive message; rsync to a clean dir (exclude .git, node_modules, .next, .env.local); `vercel deploy --prod --yes`; confirm with `vercel ls` and a curl of the live page
