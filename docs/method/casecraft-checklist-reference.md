# Casecraft checklist reference: "Existing product upgrade" mode

Transcribed from the Casecraft playbook screenshots (Sahasrajit Krishnan's guide) for the mode **Existing product upgrade**. Items marked *(screenshot pending)* were only seen as titles with lens, weight and core flags; drop the P3 to P8 screenshots into a folder on disk (for example `casecraft screenshots/` at the project root) and this file can be completed from them.

Legend: lens letters D Desirability, F Feasibility, V Viability, I Integrity. Weight w1 to w3. "core" means the gate cannot clear while the item is open. Dots in the app show weight (one to three).

Mode description: "Starts from a baseline audit of the live product. Every claim in this case is a delta: which metric moves, by how much, at what cost. Watch for cannibalization and adoption drag. Done means an approved budget, a pilot slot on the roadmap, and a business value model your finance partner signs: revenue lift, cost saved or experience gained against the baseline." Mode counts: 57 items, 4 gates, ends in budget approval.

Each item in the app has: a three-state marker (open / half / done), WHAT, WHY, HOW (numbered), OUTPUT, CLEARS (the pass condition), TOOLS (linked templates), an optional mode-specific note, an EVIDENCE strength toggle (weak / solid / strong) and a NOTE field ("Where the evidence lives, links, numbers").

---

## P0 Frame
"Ten minutes of setup that saves weeks. Name the case, its reader and its constraints before any research."

### Case header
- WHAT: One line each: working name, the problem hypothesis, sector, geography, currency.
- WHY: Every later artifact hangs off this line. If you cannot state the problem in one sentence, you do not have one yet.
- HOW: 1. Write: [who] loses [what] because [breakdown], in [sector, geography]. 2. Keep it falsifiable. A claim you could disprove is a claim worth testing. 3. Revisit after Gate 1 and tighten it.
- OUTPUT: A one-line problem hypothesis.
- CLEARS: A stranger reads the line and can say who hurts and why.

### Decision customer
- WHAT: Name who reads this case and what decision they will take: fund, staff, approve, kill.
- WHY: A case is written backwards from its reader. An angel, a product council and a CFO weigh evidence differently.
- HOW: 1. Name the person or forum, and the decision date if one exists. 2. Write the three questions they will ask first. 3. Note what evidence they have rejected before.
- OUTPUT: Reader, decision, top three questions.
- CLEARS: You can say what this reader funds and what they kill.

### Operating constraints
- WHAT: The non-negotiables: budget ceiling, time box, compliance lines, brand rules, stack commitments.
- WHY: Constraints found in month four restart the case. Constraints found in hour one shape it.
- HOW: 1. List hard constraints with their source and owner. 2. Separate real constraints from habits dressed as rules. 3. Time-box the whole case run: set a review date.
- OUTPUT: A constraints list with owners.
- CLEARS: Nothing on this list can surprise you at a gate.

## P1 Discover (0/10)
"Map the world as it is. People, pains, money flows, timing. No solutions allowed in this phase."

### Ecosystem snapshot · core · w2 · V/D
- WHAT: The industry map: actors, value chain, money flows, regulators, current shifts. The introduction your reader gets first.
- WHY: Pains live inside systems. A reader who does not see the system will not believe the pain, or your right to fix it.
- HOW: 1. Draw the value chain and mark where money changes hands. 2. List actors: suppliers, channels, regulators, substitutes. 3. Mark the two or three shifts currently bending the system. 4. Write it as a one-page introduction, plain words.
- OUTPUT: A one-page ecosystem introduction with a system map.
- CLEARS: Cites at least three dated second-degree sources, and a sector insider would not correct the map.
- TOOLS: Ecosystem Map, System Map, Signal Cards.

### User personas · core · w2 · D
- WHAT: The people who use the thing, drawn from research: context, behavior, goals, current workaround.
- WHY: Everything downstream, from journey to pricing to channel, is per persona. Invented personas poison all of it.
- HOW: 1. Draft 2 or 3 personas maximum. More means you have not chosen. 2. Base each on at least 5 first-degree conversations or observations. 3. Include the workaround they run today, with real quotes. 4. Name what they would have to stop doing to adopt you.
- OUTPUT: 2 or 3 persona sheets with quotes.
- CLEARS: Every persona claim traces to a real person you spoke to or observed.
- TOOLS: Personas, Empathy Map.
- Mode note: Personas of current users, segmented by behavior in your product data, not by demographics.

### Buyer personas and the buying committee · core · w2 · D/V
- WHAT: Who pays, who champions, who blocks, who signs. Users and buyers are often different people.
- WHY: Cases die at the wallet, not the user. B2B especially: the user loves it, procurement kills it.
- HOW: 1. Map the committee: economic buyer, champion, blocker, sign-off chain. 2. Write the buyer's pain in their words: budget, risk, career. 3. Note the trigger that opens a budget line. 4. For consumer cases, name the moment of payment and who feels it.
- OUTPUT: Buyer persona plus a committee map.
- CLEARS: You can name the role that signs and the objection that kills, with one first-degree source behind each.
- TOOLS: Stakeholders Map, Personas.

### Pain statements per persona · core · w3 · D
- WHAT: For each persona: the pain, its frequency, its severity, the workaround, and what the workaround costs.
- WHY: Pain is the raw material of the whole case. Frequency times severity is what you will later price against.
- HOW: 1. Write each pain as: [persona] struggles to [job] because [breakdown]. 2. Score frequency (daily, weekly, monthly) and severity (annoying, costly, existential). 3. Document the current workaround honestly. The workaround is your real competitor. 4. Rank pains per persona. The top pain gets the case.
- OUTPUT: A ranked pain table per persona.
- CLEARS: Top pains are ranked by data from interviews or observation, not by your intuition.
- TOOLS: Issue Cards, Observation Notes.

### Jobs to be done · w2 · D
- WHAT: The progress each persona is trying to make: functional, emotional, social. The job, independent of any solution.
- WHY: Pains say what breaks. Jobs say what people are hiring for, which is what your solution will compete on.
- HOW: 1. Write jobs as: when [situation], I want to [motivation], so I can [outcome]. 2. Capture the emotional and social layers, not only the functional. 3. Check each job against what people actually pay for today.
- OUTPUT: A job statement per persona.
- CLEARS: Each job is grounded in interview language, not your product vocabulary.
- TOOLS: Interview Guide, User Scenarios.

### As-is journey and service blueprint · w2 · D/F
- WHAT: The current journey through the pain, mapped. Frontstage what the user sees, backstage what makes it happen, and where it breaks.
- WHY: The blueprint shows the root cause behind the visible pain, and later, the exact delta your solution creates.
- HOW: 1. Map the journey stage by stage with the emotion curve. 2. Add blueprint layers: frontstage actions, backstage actions, support processes, evidence. 3. Mark the moments of truth and the breakpoints. 4. Time the painful steps. Minutes lost become money later.
- OUTPUT: An as-is journey map with blueprint layers.
- CLEARS: Built from observed or narrated journeys of real people, with breakpoints marked.
- TOOLS: Journey Map, Service Blueprint, NN/g on blueprints.

### Research plan and evidence log · core · w2 · I/D
- WHAT: The plan for first and second degree research, with sample targets, and a log where every claim gets a source row.
- WHY: The gates score evidence. Without a log, you cannot tell evidence from memory, and neither can your reader.
- HOW: 1. Set first-degree targets: interviews, observation hours, survey n. 2. List second-degree sources: reports, filings, datasets, with dates. 3. Write a screener and a discussion guide before the first call. 4. Log every claim with source, date and strength as you go.
- OUTPUT: A research plan plus a running evidence log.
- CLEARS: The plan has numeric targets and the log has begun filling.
- TOOLS: Research Plan, Recruiting Screener, Interview Guide, Diary Study.

### Product baseline audit · core · w3 · V/D
- WHAT: The live product's numbers today: funnels, retention cohorts, NPS or CSAT, support themes, feature usage.
- WHY: An improvement case is a delta claim. Without a baseline there is no delta, only decoration.
- HOW: 1. Pull the funnel: acquisition, activation, retention, revenue, referral. 2. Cut retention by cohort and segment. 3. Cluster the last quarter's support tickets into themes. 4. Freeze the baseline in the case: numbers and date.
- OUTPUT: A one-page baseline with dated numbers.
- CLEARS: The metrics your improvement must move are named, with current values.
- TOOLS: Success Metrics.

### Why now · w2 · V
- WHAT: The shift that opens the window: technology, regulation, behavior, cost curves. What changed recently.
- WHY: Most good ideas were tried early and died on timing. A reader will ask why this works now when it did not before.
- HOW: 1. Name the enabling shift and date it. 2. Find who tried before and why the attempt failed then. 3. State what expires: how long the window stays open.
- OUTPUT: A why-now paragraph in the ecosystem introduction.
- CLEARS: The shift is documented, dated, and linked to why past attempts failed.
- TOOLS: Signal Cards, Future Backcasting.

### Stakeholder and sponsor map · core · w1 · I/V
- WHAT: Who can accelerate, slow or kill this case: sponsors, approvers, blockers, and the sign-off path.
- WHY: Inside organizations, cases rarely lose on merit. They lose people. Map them before they surprise you.
- HOW: 1. Map influence against attitude for every named stakeholder. 2. Identify the one sponsor whose exit would end the case. 3. Plan the first conversation with each likely blocker.
- OUTPUT: A stakeholder map with a sign-off path.
- CLEARS: The sponsor is named and has seen the problem hypothesis.
- TOOLS: Stakeholders Map.

## P2 Validate the problem (0/7) · Gate 1
"Prove the pain is real, painful, widespread and reachable. This is where weak cases should die, cheaply."

### Problem evidence pack · core · w3 · D
- WHAT: The concentrated proof the pain exists: interview counts, rankings, quotes, observed workarounds, demand signals.
- WHY: This pack is what Gate 1 actually weighs. Everything else in the phase quantifies what this pack proves.
- HOW: 1. Hit the interview target: 15 to 20 for B2B, 25 plus for consumer. 2. Report the share who rank the pain top three unprompted. 60 percent is a healthy bar. 3. Attach workaround evidence: screenshots, spreadsheets, hired help. 4. Add demand signals: search volume, community threads, waitlists.
- OUTPUT: A problem evidence pack with counts and quotes.
- CLEARS: Interview target met and the top-three share computed, not estimated.
- TOOLS: Interview Guide, Synthesis Wall, Observation Notes.
- Mode note: Product data joins the interviews: drop-off at the painful step, tickets naming it, feature requests.

### Market sizing: TAM, SAM, SOM · core · w3 · V
- WHAT: Three honest numbers: everyone with the problem, the slice you can serve, the slice you can win in 3 years.
- WHY: Sizing tells your reader whether the prize justifies the risk. A top-down number alone is a press release.
- HOW: 1. Build top-down from dated reports. 2. Build bottom-up: count of target accounts times realistic price. 3. Reconcile the two. If they disagree by 5x, your definition is wrong. 4. State every assumption inline, with sources.
- OUTPUT: A sizing model with reconciled top-down and bottom-up.
- CLEARS: Both builds exist, sources dated, and the reconciliation is written down.
- TOOLS: Research Plan.
- Mode note: Size the affected user base and the value pool inside it, not the whole market.

### Cost of the problem · w2 · V/D
- WHAT: What the pain costs one persona per year, in money: time lost, errors, churn, spend on workarounds.
- WHY: This number becomes your pricing anchor and your headline. Pain in currency is what buyers act on.
- HOW: 1. Compute time lost times loaded cost per persona. 2. Add direct spend on workarounds and error costs. 3. Multiply across the SOM for the aggregate. 4. Sanity-check with one real buyer: does the number feel right to them?
- OUTPUT: A cost-of-problem calculation, per persona and aggregate.
- CLEARS: A named buyer or user has seen the number and not laughed.

### Competitive landscape · core · w2 · V/D
- WHAT: Direct rivals, indirect substitutes, and the DIY workaround, mapped against the pains they actually clear.
- WHY: Your reader assumes competitors exist. Naming them first, fairly, is what buys your white space claim credibility.
- HOW: 1. List direct, indirect and DIY competitors. DIY is usually the leader. 2. Build a coverage table: pains as rows, competitors as columns. 3. Experience the top two yourself: sign up, buy, churn. 4. Note pricing, positioning and switching costs for each.
- OUTPUT: A competitor coverage table.
- CLEARS: You have first-hand experience of the leading alternatives, not just their websites.
- TOOLS: Service Safari.

### The unsolved white space · core · w2 · D/V
- WHAT: The pains no one clears, and the structural reason why: economics, technology, incentives, regulation.
- WHY: White space without a reason is a red flag. If nothing stops incumbents, assume you missed a player or a corpse.
- HOW: 1. Subtract the coverage table from the ranked pains. What remains is candidate white space. 2. For each gap, write why it persists. A structural reason, not incumbent laziness. 3. Check the graveyard: who tried this gap and died, and what killed them.
- OUTPUT: A white space statement with structural reasoning.
- CLEARS: Each claimed gap has a persistence reason a skeptic accepts.
- TOOLS: Synthesis Wall.

### Positioning map · w1 · V
- WHAT: Competitors plotted on the two axes buyers actually trade off, with your intended position marked.
- WHY: One picture that shows the gap. Readers remember maps longer than tables.
- HOW: 1. Pick axes from buyer interviews, not from your differentiation wishlist. 2. Plot competitors honestly. Crowd the crowded corner. 3. Mark your intended position and the proof it will need.
- OUTPUT: A two-axis positioning map.
- CLEARS: The axes came from what buyers said they weigh.

### Gap-to-metric link · core · w2 · V
- WHAT: Each unsolved pain tied to the baseline metric it suppresses, with the lift a fix could earn.
- WHY: This is the bridge from user pain to business case in an existing product. No link, no budget.
- HOW: 1. Map each validated pain to a metric: churn, conversion, ticket volume, NPS. 2. Estimate suppression: how much the pain costs the metric today. 3. Rank pains by value of the lift, not loudness of the complaint.
- OUTPUT: A pain-to-metric table with estimated lifts.
- CLEARS: A data partner agrees the suppression estimates are defensible.
- TOOLS: Success Metrics.

## P3 Ideate *(screenshot pending)*
- Value proposition · D · w3 · core
- Solution concept one-pager · D/F · w3 · core
- Concept variants and selection · D/V · w2
- Doblin ten-types sweep · V/D · w2
- To-be journey and blueprint · D/F · w2
- Assumption map · I · w3 · core

## P4 Validate the solution · Gate 2 *(screenshot pending)*
- Prototype and visual walkthrough · D/F · w3 · core
- Experiment cards · I/D · w3 · core
- Willingness-to-pay probe · V · w3 · core
- Feasibility spike · F · w2 · core
- Pilot design · V/I · w2 · core
- Loop log · I · w1

## P5 Materialize and build *(screenshot pending)*
- Business Model Canvas · V · w2 · core
- MVP scope · F/D · w2 · core
- Product roadmap · F/V · w2
- Operational plan and Gantt · F · w2
- Team, competences and gaps · F/I · w2 · core
- Staged development plan · V/I · w2 · core
- Data and telemetry plan · F/I · w2

## P6 Monetize and validate · Gate 3 *(screenshot pending)*
- Revenue and pricing model · V · w3 · core
- Unit economics · V · w3 · core
- Pilot run and readout · D/V · w3 · core
- Retention and pull evidence · D · w2

## P7 Grow and scale *(screenshot pending)*
- Positioning strategy · V/D · w2
- PMCs, prioritized · V · w2 · core
- Marketing mix per PMC · V · w2
- Growth model and north star · V/D · w2
- Sales plan · V · w2 · core
- Channel tests · V/I · w2

## P8 Assemble the case · Gate 4 *(screenshot pending)*
- Financial plan · V · w3 · core
- Scenarios and sensitivity · V/I · w2
- Model-specific metrics · V · w1
- Investment ask and use of funds · V/I · w2 · core
- Risk register · I/V · w2 · core
- Legal, regulatory and IP · I/F · w1
- Impact statement · I · w2 · core
- The narrative and pitch map · I/D · w3 · core

## The four gates (from the Gates view)
"Each evidenced item earns weight times strength. A lens bar shows points earned over points possible in that gate's span, with the tick marking the threshold. A gate clears only when every required lens beats its threshold and every core item in the span is evidenced. When it does not clear, the gate tells you what to test next. That is the loop."

| Gate | Question | Span | D | F | V | I | Core items | Test next (examples shown) |
|---|---|---|---|---|---|---|---|---|
| 1 Problem gate | Is the problem real, painful, widespread and reachable? | P1–P2 | 70 | none | 60 | 40 | 12 | Pain statements per persona, Product baseline audit, Problem evidence pack, Market sizing, Ecosystem snapshot |
| 2 Solution gate | Does the solution earn desire, and can you build it? | P3–P4 | 70 | 65 | 50 | 50 | 8 | Value proposition, Solution concept one-pager, Assumption map, Prototype and visual walkthrough, Experiment cards |
| 3 Money gate | Does one unit of this business make money? | P5–P6 | 60 | 60 | 70 | none | 7 | Revenue and pricing model, Unit economics, Pilot run and readout, Business Model Canvas, MVP scope |
| 4 Case gate | Does the whole case hold, end to end? | P1–P8 cumulative | 70 | 70 | 70 | 60 | 34 | Pain statements, Product baseline audit, Problem evidence pack, Market sizing, Value proposition |

Each gate has a loop log ("persist" / pivot / kill, "What changed this pass") and thresholds can be adjusted. The sweet-spot summary shows cumulative lens points (D 0/70, F 0/70, V 0/70, I 0/60 at start).
