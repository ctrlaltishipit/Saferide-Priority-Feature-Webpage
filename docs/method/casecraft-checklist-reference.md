# Casecraft checklist reference: "Existing product upgrade" mode

Transcribed from the Casecraft playbook screenshots (Sahasrajit Krishnan's guide) for the mode **Existing product upgrade**. P0 to P2 were transcribed from screenshots; P3 to P8 from the Casecraft app source the author shared (Sep 1, 2026). Mode-only items for other modes are named but not detailed.

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

## P3 Ideate
"Now, and only now, the solution. Concepts, the value proposition, and the assumptions they smuggle in." What it is: the answer pass. Why: a solution designed before the problem is proven is decoration; one that maps pain to mechanism, with its risks listed, is an argument.

### Value proposition · core · w3 · D
- WHAT: Pains mapped to relievers, gains to creators, compressed into one sentence a buyer can repeat.
- WHY: The value proposition is the case's spine in miniature. If it needs a paragraph, the concept is not ready.
- HOW: 1. Fill the canvas: jobs, pains, gains on the right, your relievers and creators on the left. 2. Kill relievers that map to no validated pain. 3. Write the sentence: for [persona] who [pain], [name] does [outcome], unlike [alternative]. 4. Read it to three target users. Ask them to say it back.
- OUTPUT: A completed canvas and a one-sentence value proposition. CLEARS: Target users can repeat the sentence back in their own words, roughly right. TOOLS: Value Proposition Canvas.

### Solution concept one-pager · core · w3 · D/F
- WHAT: The solution in plain words: what it is, how it kills each top pain, and what it deliberately does not do.
- WHY: Simple and understandable is a feature of the thinking. Complexity here predicts scope death later.
- HOW: 1. Describe the solution in under 150 words. 2. Map each top-three pain to the mechanism that kills it. 3. Write the not-list: adjacent things you will not build, and why. 4. Test comprehension with a stranger after one read.
- OUTPUT: A concept one-pager with a not-list. CLEARS: A cold reader explains the concept back correctly after one read. TOOLS: Concept Walkthrough, Service Image.

### Concept variants and selection · w2 · D/V
- WHAT: Two or three genuinely different concepts, scored against explicit criteria before one wins.
- WHY: The first concept is rarely the best one. A documented selection disarms the reader who asks what else you considered.
- HOW: 1. Generate variants that differ in mechanism. 2. Score against criteria set in advance: pain coverage, feasibility, speed to evidence. 3. Record the losers and why.
- OUTPUT: A scored variant matrix with a winner. CLEARS: Criteria were written before scoring, and the losing variants are archived with reasons. TOOLS: Brainstorming, Evaluation Matrix.
- Mode note (existing): Score variants with RICE or ICE against the baseline metrics from your audit.

### Doblin ten-types sweep · w2 · V/D
- WHAT: A pass over Doblin's ten innovation types. Configuration: profit model, network, structure, process. Offering: product performance, product system. Experience: service, channel, brand, customer engagement.
- WHY: Innovation rarely fails for lack of creativity; it fails for lack of discipline, and focusing only on product is the surest way. Product and technology are the easiest types to copy. Cases that stack types defend themselves.
- HOW: 1. Walk all ten types against the concept. 2. Mark each: innovate, match the market, or ignore. 3. Diagnose the industry first: which types do incumbents overlook? 4. Use the tactics catalog per type as prompts. 5. Three types beyond product performance is the floor; five, integrated, usually reinvents a category. 6. Fold the strongest types into the concept and the business model.
- OUTPUT: A ten-types map with the industry diagnostic. CLEARS: At least three types used deliberately, you can say how each shows up, and at least one sits where your industry underinvests. TOOLS: Doblin Ten Types.

### To-be journey and blueprint · w2 · D/F
- WHAT: The same journey, redrawn with your solution in it. The delta from the as-is map is the pitch.
- WHY: Readers feel journeys more than feature lists. The before and after pair is your most persuasive visual.
- HOW: 1. Redraw the journey with your solution at the breakpoints. 2. Update the blueprint layers. 3. Annotate the delta: minutes saved, steps removed, moments of truth turned. 4. Keep the honest parts: steps that stay painful.
- OUTPUT: A to-be journey map paired with the as-is. CLEARS: The delta is annotated step by step. TOOLS: Journey Map, Service Blueprint, Emotional Journey.

### Assumption map · core · w3 · I
- WHAT: Every belief the concept smuggles in, plotted by importance against certainty. The top-right corner is your test list.
- WHY: Silent assumptions are how confident teams die. Naming them is the highest-leverage hour in the whole case.
- HOW: 1. List assumptions across desirability, feasibility, viability and integrity. 2. Plot importance against how little evidence you hold. 3. The important-and-unknown corner becomes the experiment backlog. 4. Beliefs like "users will naturally share this" or "customers will pay a premium" go straight to the corner.
- OUTPUT: An assumption grid and a riskiest-assumptions list. CLEARS: Each top-corner assumption has an experiment card queued. TOOLS: Hypothesis Generation.

(Mode-only items skipped here: Flywheel design, ecosystem mode only.)

## P4 Validate the solution · Gate 2
"Prototype, test, price-probe. Built to loop: persist, pivot or kill, and log every pass."

### Prototype and visual walkthrough · core · w3 · D/F
- WHAT: Something a user can see or touch: clickable prototype, storyboard, concierge run. The demo your case shows.
- WHY: Words let people be polite. Prototypes force a reaction you can read. This is also the visual walkthrough the final document needs.
- HOW: 1. Build the cheapest artifact that carries the core job end to end. 2. Put it in front of 5 to 10 target users. Watch, do not pitch. 3. Run the five-second test. 4. Record the walkthrough.
- OUTPUT: A prototype plus a recorded walkthrough. CLEARS: Five plus target users interacted with it, and their reactions are logged. TOOLS: Rough Prototyping, Experience Prototypes, Service Prototype.

### Experiment cards · core · w3 · I/D
- WHAT: One card per riskiest assumption: hypothesis, method, metric, threshold written before the run, result, decision.
- WHY: The threshold written in advance is what separates evidence from rationalization.
- HOW: 1. One card per top assumption. 2. Pick the cheapest honest method: discovery tests first, validation tests as risk grows. 3. Write metric and pass threshold before running. 4. Mind rigor: one variable, a baseline, enough n. 5. Run, record, decide: persist, pivot or kill.
- OUTPUT: Completed experiment cards with learning cards. CLEARS: Every card had its threshold written before the experiment ran. TOOLS: Hypothesis Generation, Success Metrics.

### Willingness-to-pay probe · core · w3 · V
- WHAT: Real price signals before you build: price-sensitivity questions, LOIs, pre-orders, paid pilot commitments.
- WHY: Interest is free. Money is evidence.
- HOW: 1. Van Westendorp or simple price laddering in interviews. 2. Ask for the strongest commitment the stage allows. 3. Note the price at which faces change. 4. Log refusals too.
- OUTPUT: A WTP readout with commitments listed. CLEARS: At least one costly commitment exists: money, signature, or scheduled deployment.
- Mode note (existing): For internal cases the probe is a chargeback or budget commitment from the benefiting unit.

### Feasibility spike · core · w2 · F
- WHAT: A thin technical proof of the hardest part, plus the build, buy or partner call, with a cost envelope.
- WHY: Cases assume the hard part works. A one-week spike now is cheaper than a two-quarter discovery later.
- HOW: 1. Name the riskiest technical or operational element. 2. Prove it thin. 3. Decide build, buy or partner per component. 4. Write the cost envelope, rough but honest.
- OUTPUT: A spike result and a build-buy-partner table. CLEARS: The hardest element ran once, end to end, in any ugly form.

### Pilot design · core · w2 · V/I
- WHAT: The first stage of your strategy, specified: scope, participants, duration, success criteria and kill criteria.
- WHY: A pilot without pre-written criteria validates nothing.
- HOW: 1. Scope the smallest pilot that tests the core promise. 2. Set n, duration, and the metric bar. 3. Write the kill criteria with the same care. 4. Agree who reads the readout and what each result triggers.
- OUTPUT: A pilot design document. CLEARS: Success and kill criteria are written and shared before the pilot starts. TOOLS: Service Prototype, Success Metrics.

### Loop log · w1 · I
- WHAT: The record of each pass through this gate: what you believed, what you learned, what changed.
- WHY: Pivots without records become folklore. The log shows the idea survived contact.
- HOW: 1. After each loop, write: belief, evidence, decision. 2. Tag it persist, pivot or kill.
- OUTPUT: A dated loop log. CLEARS: Every gate failure so far has a log entry.

## P5 Materialize and build
"Turn the validated concept into a machine: model, scope, roadmap, team, operations." Readers fund machines, not ideas.

### Business Model Canvas · core · w2 · V
- WHAT: All nine blocks, filled from evidence gathered so far, not from hope.
- WHY: The canvas is where the case's parts prove they fit each other. Empty or vague blocks are unpriced risk.
- HOW: 1. Customers and value propositions from validated personas and the VP canvas. 2. Channels and relationships from where those users actually are. 3. Revenue from the WTP probe, costs from the spike envelope. 4. Stress against the five patterns: unbundling, long tail, multi-sided platform, freemium, open. 5. Mark each block: evidenced, assumed, or unknown.
- OUTPUT: A canvas with every block marked by confidence. CLEARS: No block is blank and each one traces to an upstream item. TOOLS: Business Model Canvas, Strategyzer.

### MVP scope · core · w2 · F/D
- WHAT: The smallest build that delivers the core job end to end, plus the recorded cut list.
- WHY: MVPs die of too much and of too little. The cut list is proof you chose.
- HOW: 1. Write the full backlog, then cut to the minimum that completes the job. 2. Inclusion test: would the product be valuable without this? 3. Exclusion test: is it needed for the first instance? 4. Publish the cut list beside the scope.
- OUTPUT: An MVP scope with a cut list. CLEARS: Someone outside the team challenged the scope and it survived with reasons. TOOLS: User Stories.

### Product roadmap · w2 · F/V
- WHAT: Now, next, later, keyed to validation milestones rather than dates alone.
- WHY: A date-only roadmap promises output. A milestone roadmap promises learning.
- HOW: 1. Lay out now, next and later. 2. Gate each horizon on evidence. 3. Keep later honest: themes, not features.
- OUTPUT: A milestone-gated roadmap. CLEARS: Each horizon names the evidence that unlocks it. TOOLS: Service Roadmap.

### Operational plan and Gantt · w2 · F
- WHAT: Workstreams, owners, dependencies and the critical path, drawn as a Gantt for the build and pilot window.
- WHY: The reader funds a plan, not a vibe.
- HOW: 1. Streams with named owners. 2. Dependencies and critical path. 3. Time-box to the pilot readout. 4. Add the operational load: support, onboarding, content, compliance.
- OUTPUT: A Gantt to pilot readout, with owners. CLEARS: The critical path is marked and every stream has one accountable name. TOOLS: Service Specifications.

### Team, competences and gaps · core · w2 · F/I
- WHAT: The skills this venture needs, who covers each, and the honest gaps with a plan: hire, contract or advise.
- WHY: Readers fund teams. An honest gap with a plan reads stronger than a padded skills matrix.
- HOW: 1. List needed competences: build, sell, operate, comply. 2. Map people to them; mark real depth. 3. For each gap: hire, contract, advisor or partner, with a date. 4. Name the missing hire that would change the odds most.
- OUTPUT: A competence map with a gap plan. CLEARS: Gaps are stated plainly and each has a dated plan.

### Staged development plan · core · w2 · V/I
- WHAT: The strategic vision cut into stages: pilot, v1, expansion, each with entry criteria, exit criteria and funding.
- WHY: Stages let a reader fund one step while seeing the whole road.
- HOW: 1. Write the 3-year vision in three sentences. 2. Cut the road into stages with entry and exit criteria. 3. Attach funding per stage; money unlocks on evidence. 4. Stage one must be the pilot you already designed.
- OUTPUT: A staged plan with criteria and funding per stage. CLEARS: Every stage has written exit criteria, including stage zero. TOOLS: Future Backcasting, Service Roadmap.

### Data and telemetry plan · w2 · F/I
- WHAT: What you will measure from day one: activation, retention, funnel events, and where the numbers live.
- WHY: Gates 3 and 4 run on this data. Instrument now or argue from anecdotes later.
- HOW: 1. Define the north star and its input events. 2. Instrument the funnel before the pilot. 3. Decide where the data lives and who reads it weekly.
- OUTPUT: A tracking plan wired before pilot start. CLEARS: A test event has flowed end to end into the dashboard. TOOLS: Success Metrics.

(Mode-only items skipped: NewCo structure and governance, corporate; Platform and partner plan, ecosystem.)

## P6 Monetize and validate · Gate 3
"Run the pilot, read the numbers. One unit of this business must make money, or show a credible path."

### Revenue and pricing model · core · w3 · V
- WHAT: The model chosen and the price set, from WTP evidence: subscription, transaction, licence, usage, or value share.
- WHY: Pricing is the highest-leverage decision in the case. It was probed at Gate 2. Now it gets committed to paper.
- HOW: 1. Choose the model that matches how value is felt. 2. Scan Doblin's profit model tactics: subscription, metered use, installed base, switchboard, freemium, bundled pricing, risk sharing. 3. Set the price from the WTP probe, not cost plus comfort. 4. Design the ladder. 5. State what is deliberately free, and why.
- OUTPUT: A pricing model with a ladder. CLEARS: The price traces to WTP evidence and at least one buyer accepted it.
- Mode note (existing): The model here is business value: revenue lift, cost saved or experience gained, priced against the baseline and signed by finance.

### Unit economics · core · w3 · V
- WHAT: The per-unit truth: CAC, LTV, payback months, contribution margin. Marketplace models add GMV, take rate, liquidity and repeat rate.
- WHY: A P&L can hide anything. A unit cannot.
- HOW: 1. CAC from real channel tests. 2. LTV from observed retention, conservative curve. 3. Payback in months and contribution margin per unit. 4. For an internal case: incremental margin per affected user, for example ₹ per user per year.
- OUTPUT: A unit economics sheet. CLEARS: CAC and retention inputs come from your own tests or pilot.

### Pilot run and readout · core · w3 · D/V
- WHAT: The designed pilot, executed, read against the criteria written before it started, closed with a decision memo.
- WHY: The strongest single artifact a business case can contain.
- HOW: 1. Run as designed; log any mid-flight change. 2. Read against the pre-written criteria. 3. Decision memo: continue, pivot, or stop. 4. Collect testimony: quotes, usage clips, renewal intent.
- OUTPUT: A pilot readout and decision memo. CLEARS: Results are compared against the original criteria document, verbatim.

### Retention and pull evidence · w2 · D
- WHAT: Cohort retention, activation depth, and organic pull: referrals, waitlists, users returning uninvited.
- WHY: Retention is desirability measured honestly. Pull is the earliest signal of product-market fit.
- HOW: 1. Cohort curves from the pilot. 2. Find the flattening point. 3. Log unprompted pull.
- OUTPUT: Cohort curves with a pull log. CLEARS: At least one cohort curve exists from real usage.

## P7 Grow and scale
"Positioning, PMCs, marketing mix, sales machine, growth loops. Spend follows evidence."

### Positioning strategy · w2 · V/D
- WHAT: The category you claim, who it is for, what you replace, and the proof. The sentence sales will say.
- HOW: 1. Choose the frame: new category, better X, or X for Y. 2. Write: for [segment], [name] is the [category] that [proof]. 3. Stress-test against the positioning map. 4. Say it aloud to a buyer.
- CLEARS: A real buyer heard it and placed you correctly against alternatives.

### PMCs, prioritized · core · w2 · V
- WHAT: Product-market combinations ranked, the beachhead chosen with reasons, and the expansion sequence.
- HOW: 1. List every viable PMC. 2. Score: pain intensity, access, willingness to pay, reference value. 3. Choose the beachhead; write why runners-up wait. 4. Sequence expansion with triggers.
- CLEARS: The beachhead has a written rationale a skeptic can audit. TOOLS: Offering Map, Evaluation Matrix.

### Marketing mix per PMC · w2 · V
- WHAT: For each prioritized PMC: product variant, price, place and promotion, with budget and expected CAC per channel.
- CLEARS: Every channel line carries a budget and an expected CAC.

### Growth model and north star · w2 · V/D
- WHAT: The north star metric, its input tree, and the loops that drive it.
- HOW: 1. Pick the north star that tracks delivered value, not activity. 2. Draw the input tree. 3. Design one or two loops. 4. Assign an owner and a weekly number to each input.
- CLEARS: Each input has an owner and a current weekly reading.

### Sales plan · core · w2 · V
- WHAT: The funnel end to end: inbound and outbound motions, list building, nurturing cadence, stage conversions, projections and KPIs.
- CLEARS: The projection is computed from stage conversions, not asserted.
- Mode note (existing): For internal adoption the funnel is rollout: awareness, activation, habit, with owners per stage.

### Channel tests · w2 · V/I
- WHAT: Two or three channels tested small before budget concentrates, with CAC per channel from real spend.
- CLEARS: At least two channels have a measured CAC from your own spend.

## P8 Assemble the case · Gate 4
"Financials, risks, the ask, the impact close. Then the narrative, in order, for a cold reader." Assembly is a craft step, not a stapling step.

### Financial plan · core · w3 · V
- WHAT: Three-year P&L, cash flow statement, and the ratios a reader checks: gross margin, burn multiple, runway, working capital.
- HOW: 1. Revenue from the sales projection. 2. Costs from the ops plan and team map. 3. Monthly cash flow; note the trough. 4. Ratios stated plainly.
- CLEARS: Revenue traces to the funnel model and the cash trough is identified.
- Mode note (existing): The plan here is incremental: cost of build and run against value of the lift, with payback period.

### Scenarios and sensitivity · w2 · V/I
- WHAT: Base, bear and bull runs of the model, plus the one assumption that moves the outcome most.
- CLEARS: The most sensitive assumption is named and linked to the evidence behind it.

### Model-specific metrics · w1 · V
- WHAT: The metric set your model demands: SaaS wants MRR, NRR, churn; marketplaces GMV, take rate, liquidity.
- CLEARS: The panel matches your revenue model archetype.

### Investment ask and use of funds · core · w2 · V/I
- WHAT: The amount, the tranches tied to stage criteria, what the money buys, and what milestone the runway reaches.
- HOW: 1. Size the ask from the cash trough plus honest buffer. 2. Split into tranches keyed to the staged plan. 3. Use of funds by category. 4. State the next gate: what unlocks more money, what stops it.
- CLEARS: Each tranche names its unlock criteria from the staged plan.
- Mode note (existing): The ask is a budget with opportunity cost stated: what does not get built instead.

### Risk register · core · w2 · I/V
- WHAT: The top five risks scored by likelihood and impact, each with an owner, a trigger and a mitigation.
- HOW: 1. Risks across market, execution, technology, regulation, people. 2. Score likelihood and impact; keep the top five visible. 3. Owner, trigger, mitigation for each. 4. Include the kill risk: the event that should end the venture.
- CLEARS: Every risk has an owner and a trigger, and one of them is a kill condition. TOOLS: Issue Cards.

### Legal, regulatory and IP · w1 · I/F
- WHAT: Licences needed, data protection duties, sector rules, and where your IP position stands.
- CLEARS: Someone with legal competence has reviewed it, even informally.

### Impact statement · core · w2 · I
- WHAT: The close: who benefits, what changes in the world, externalities owned honestly, jobs and environment where relevant.
- WHY: The case ends on integrity because that is the lens money cannot fake. It is also the paragraph people remember.
- HOW: 1. Who is better off, concretely, if this works at scale. 2. Own the externalities and what you will do about them. 3. Tie impact to a measurable proxy you already track. 4. One page.
- CLEARS: It names at least one negative externality and a real response to it. TOOLS: Impact Journey.

### The narrative and pitch map · core · w3 · I/D
- WHAT: The case assembled in reading order, plus a ten-slide pitch mapping and the five-minute spoken walkthrough.
- HOW: 1. Assemble in the order: world, people, pain, proof, answer, machine, money, ask. 2. Ten slides, one claim per slide, evidence in the appendix. 3. Script the five-minute walkthrough against the decision customer's three questions. 4. Cut everything that does not change the decision.
- CLEARS: A cold reader followed the document without you in the room and asked informed questions.

## The Case Walkthrough (the linear version): 17 steps in 5 acts
Act I Discover: 01 ecosystem intro (with why-now) · 02 user and buyer personas · 03 pain statements for both · 04 market sizing and data. Check: pain proven, sized, costed? (else loop for more research, or park a weak problem)
Act II Position: 05 existing solutions and what stays unsolved · 06 value proposition · 07 solution concept · 08 visual demo/walkthrough. Check: users say it back, demo lands? (else rework 06 to 07)
Act III The machine: 09 product roadmap · 10 revenue and pricing model, or business value.
Act IV The plan: 11 strategic vision, development stages, pilot validation · 12 Business Model Canvas · 13 Doblin sweep. Check: pilot clears the pre-written criteria? (persist; else pivot to a new answer for the same problem, or kill)
Act V Deliver: 14 team, competences, ops plan with Gantt · 15 marketing plan and sales plan · 16 financial plan and the ask · 17 risks, legal, and the impact statement to close.
Watch-outs the walkthrough flags: cases die at the wallet; a top-down number alone is a press release; ten features is not a concept; a pilot without pre-written criteria just spends; no kill criteria tells a sponsor you plan to spend until stopped.

## The four gates (from the Gates view)
"Each evidenced item earns weight times strength. A lens bar shows points earned over points possible in that gate's span, with the tick marking the threshold. A gate clears only when every required lens beats its threshold and every core item in the span is evidenced. When it does not clear, the gate tells you what to test next. That is the loop."

| Gate | Question | Span | D | F | V | I | Core items | Test next (examples shown) |
|---|---|---|---|---|---|---|---|---|
| 1 Problem gate | Is the problem real, painful, widespread and reachable? | P1–P2 | 70 | none | 60 | 40 | 12 | Pain statements per persona, Product baseline audit, Problem evidence pack, Market sizing, Ecosystem snapshot |
| 2 Solution gate | Does the solution earn desire, and can you build it? | P3–P4 | 70 | 65 | 50 | 50 | 8 | Value proposition, Solution concept one-pager, Assumption map, Prototype and visual walkthrough, Experiment cards |
| 3 Money gate | Does one unit of this business make money? | P5–P6 | 60 | 60 | 70 | none | 7 | Revenue and pricing model, Unit economics, Pilot run and readout, Business Model Canvas, MVP scope |
| 4 Case gate | Does the whole case hold, end to end? | P1–P8 cumulative | 70 | 70 | 70 | 60 | 34 | Pain statements, Product baseline audit, Problem evidence pack, Market sizing, Value proposition |

Each gate has a loop log ("persist" / pivot / kill, "What changed this pass") and thresholds can be adjusted. The sweet-spot summary shows cumulative lens points (D 0/70, F 0/70, V 0/70, I 0/60 at start).
