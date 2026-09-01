# SafeRide Priority: interview prep (author only)

Everything here is for Deekshitha's own preparation. It is never shipped to the site. Sections marked *(fill in Phase N)* are completed as the matching chapter ships.

---

## 1. The story in three minutes

(Speak it in content words: the problem, the solution, the business model, the ask. The gate and lens vocabulary below is for your own structure only; a hiring manager never needs to hear it.)

**The problem (40 seconds).** Between 8 PM and 5 AM, booking a cab in India is two problems in one. Fear: four in ten urban women say they feel unsafe, more so after dark (NARI 2025, 12,770 women, 31 cities), and every night a woman like Priya builds her own safety plan by hand: checks the rating, calls a friend, shares the trip, asks for a visible gate. Reliability: 82% of app taxi users say drivers cancel on them, 74% say it happens after the driver hears the destination (LocalCircles via Business Standard, 2026). Uber India already ships a deep toolkit, but every tool starts working after the car does. The pre-booking minutes are empty in every app. Verdict: cleared on public evidence; internal baselines still to pull.

**The solution (50 seconds).** SafeRide Priority is one toggle in the booking flow that finishes the safety work before the door closes: a plain-language Contextual Safety Brief, Safer Anchors within 300 m, a Safety Priority Match with a committed pickup (the driver accepts before you see the match, cancel means instant first-in-line rematch), a Safety Circle that shares under your saved policy with links that expire, and a calm Arrival Check-In. Fixed, readable rules on five observable signals, no machine learning in the first version, no crime data, no profiling, abstains on thin data. Everything Uber ships today stays exactly where it is. The 8-screen interactive prototype is the evidence for this gate. Verdict: cleared on design and a working prototype; pilot pending.

**The business model (40 seconds).** Every claim is a delta against Uber's baseline, and I have no pilot data, so every target is a labelled hypothesis: activation 35 to 45% of eligible night bookings, Circle setup 50%+, Priority Match 25%+ on elevated trips, check-in completion 70%+, late-night NPS +8 vs control. Guardrails: median added wait under 5 minutes, zero consent failures, no drop in core booking completion. The rider price signal is +4 min and +₹20 on the priority match; willingness to pay is an open question the pilot's third stage answers. Value logic: trips that complete instead of cancelling (revenue), fewer support escalations (cost), trust (experience). Two watchpoints: priority matching cannibalizing standard night supply, and added wait suppressing bookings. Verdict: open until the pilot reads out.

**The ask (30 seconds).** The ask: an eight-week opt-in pilot in Hyderabad's IT corridor, five stages from research prototype through shadow mode to limited opt-in to priority matching to zone expansion, a small squad, and three stop rules. Impact: fewer nights where a woman is her own safety officer, and a night market that grows because the ride actually comes.

## 2. Checklist crosswalk

| Item | Where |
|---|---|
| P0 Case header | Site: hero + problem statement (Ch 1) |
| P0 Decision customer | Site: WhoDecides (Ch 1) |
| P0 Operating constraints | Site: Constraints chips (Ch 1); Boundaries (Ch 2, Phase 2) |
| P1 Ecosystem snapshot | Site: Industry competitor + city layer cards (Ch 1) |
| P1 User personas | Site: Personas (Ch 1), labelled composite |
| P1 Buyer personas | Site: WhoDecides names the decision customer as the buyer of an internal case |
| P1 Pain statements | Site: Problem, Evidence walls, Comparison OFF column (Ch 1) |
| P1 Jobs to be done | Site: Jobs block + Comparison rows relabelled (Ch 1) |
| P1 As-is journey | Site: Problem illustration + Comparison OFF; full blueprint in this doc §3 |
| P1 Research plan + evidence log | This doc §3, §4 |
| P1 Product baseline audit | Site: Industry Uber card + Architecture "what SafeRide adds" (Ch 1/2) |
| P1 Why now | Site: WhyNow (Ch 1) |
| P1 Stakeholder map | Site: stakeholder chips (Ch 1); full map in this doc §10 |
| P2 Problem evidence pack | Site: Evidence (Ch 1) |
| P2 Market sizing | Site: Industry funnel (Ch 1) |
| P2 Cost of the problem | Site: GapToMetric (directional); formula in this doc §9 |
| P2 Competitive landscape | Site: Industry (Ch 1) |
| P2 Unsolved white space | Site: Industry fit card (Ch 1) |
| P2 Positioning map | Skipped on site (timing tags do the job); sketch in this doc §10 |
| P2 Gap-to-metric link | Site: GapToMetric (Ch 1) |
| P3 Value proposition | Site: hero, ConceptOnePage (Ch 2) |
| P3 Solution concept one-pager | Site: ConceptOnePage + Architecture (Ch 2) |
| P3 Concept variants | Site: OptionsWeighed (Ch 2, Phase 2) |
| P3 Doblin ten types | Site: Doblin grid (Ch 2, Phase 2) |
| P3 To-be journey | Site: FlowCards + prototype |
| P3 Assumption map | Site: gate cards "what we assume"; full map this doc §7 |
| P4 Prototype walkthrough | Site: Prototype |
| P4 Experiment cards | This doc §5 |
| P4 Willingness-to-pay probe | This doc §6; site states the open question (Ch 3) |
| P4 Feasibility spike | Site: DecisionEngine in plain words; no spike write-up exists |
| P4 Pilot design | Site: PilotPlan (Ch 3, Phase 3) |
| P4 Loop log | This doc §11 |
| P5 Business Model Canvas | Site: BMC (Ch 3, Phase 3) |
| P5 MVP scope | Site: FeatureStack P0/P1 + Boundaries |
| P5 Roadmap | Site: Roadmap (Ch 4, Phase 4) |
| P5 Team, competences, gaps | Site: Squad (Ch 3, Phase 3) |
| P5 Staged development plan | Site: PilotPlan stepper (Ch 3) |
| P5 Data and telemetry plan | Site: DecisionEngine inputs + governance; event list in this doc §8 |
| P6 Revenue and pricing model | Site: RevenueModel (Ch 3), labelled |
| P6 Unit economics | This doc §9 skeleton; site shows the shape only |
| P6 Pilot readout, retention | Skipped: no pilot has run |
| P7 Positioning strategy, growth model, north star | Site: MetricTree north star (Ch 3), AfterHyderabad (Ch 4) |
| P7 PMCs, marketing mix, sales plan, channel tests | Skipped on site (internal feature, no external sales); notes in this doc §13 |
| P8 Financial plan, scenarios | Skipped on site; skeleton this doc §9 |
| P8 Investment ask | Site: TheAsk (Ch 4) |
| P8 Risk register | Site: ResponsibleAI with "Risk:" lines (Ch 2, Phase 2) |
| P8 Legal, regulatory, IP | Site: governance + compliance list (Ch 3) |
| P8 Impact statement | Site: Impact (Ch 4) |
| P8 Narrative and pitch map | Site: CaseMap + CaseInSixtySeconds (Ch 4) |

## 3. Research plan (what I would run, and what I did run)

**Done (secondary):** NARI 2025 (National Commission for Women; 12,770 women, 31 cities, 40% feel unsafe), LocalCircles cancellation survey (via Business Standard, Aug 2026), Grand View Research market size, Equentis daily trip volumes, Oxford Economics with Uber (2023, five metros, 75% cite safety), Statista 2023 safety feature importance by gender, Telangana Police T-Safe and SHE Teams pages, Uber/Ola/Rapido newsroom feature pages, Times of India (2014), Mint (2024), ETV Bharat (2026), Asianet, Outlook. Primary-adjacent: 28 public app-store and Trustpilot reviews captured as screenshots across Uber, Ola, Rapido, inDrive and Mana Yatri.

**Would run before Gate 1 closes internally:**
- Interviews: 25+ women riders in HITEC City, Gachibowli and Financial District who ride after 8 PM at least weekly (Priya type); 8 students (Sneha type); 10 trusted contacts; 10 night drivers with 1000+ trips; 3 Trust & Safety operators.
- Screener: rides after 8 PM in the last 30 days; Uber as a primary or secondary app; excludes people who never ride alone.
- Discussion guide themes: the last night ride, step by step; what you checked and why; who you told and how; the moment you felt least in control; what you would pay a little more for; what would make you switch apps tonight.
- Observation: 6 shadowed night bookings, with permission, timing each manual step (the as-is blueprint).
- Product data pull (stage 1, shadow mode): night completion rate, cancel-after-accept by hour, Share My Trip usage by hour, support contacts per 1,000 night trips, time to match after 10 PM.

## 4. Evidence log (source, what it proves, limits)

| Source | Proves | Limits |
|---|---|---|
| NARI 2025 | Fear is measured and grows after dark | Perception survey, not incident data; national, not Hyderabad-specific |
| LocalCircles via Business Standard 2026 | Cancellations are common and destination-linked | Self-selected online panel; not Uber-specific |
| Grand View Research 2025 | Market size and growth | Analyst estimate; methodology paywalled |
| Equentis Aug 2025 | Daily trip volumes and share | Secondary compilation |
| Oxford Economics / Uber 2023 | Women choose ride-hailing for safety | Commissioned by Uber |
| App-store review screenshots | Riders describe the pain in public | Anecdotal; negative-skewed by nature of reviews |
| Telangana Police T-Safe | A city night watch exists and is used | Government page; the 36,000 rides figure is first-year only |
| Uber/Ola/Rapido newsrooms | What each ships today | Marketing pages; India availability of some features unverified |

Night share of trips (10 to 15%) is our estimate; no platform publishes it. The Telangana crimes-per-lakh figure was removed from the page until an NCRB link is attached.

## 5. Hypotheses and experiment cards

H1 A transparent Contextual Safety Brief increases perceived control for late-night riders. Metric: perceived-control score (5-point). Sample: pilot opt-in cohort vs matched control. Duration: stages 2 to 3. Stop rule: comprehension under 70% (riders reading the brief as a guarantee).

H2 Safety Circle configuration reduces manual trip-sharing friction. Metric: share-trip actions per night trip, time from open to booked. Sample: cohort vs control. Stop rule: consent complaints above zero.

H3 Safer-anchor suggestions are accepted when they add under 3 minutes of walking. Metric: acceptance rate by added minutes. Stop rule: acceptance under 10% at any added time.

H4 Safety Priority Match improves trust only if its wait premium stays inside an acceptable range. Metric: selection rate by added ETA; NPS by selection. Stop rule: median added wait above 5 minutes, or standard night supply falling.

Null hypotheses stated for each; analysis pre-registered before stage 2.

## 6. Willingness-to-pay probe
Design sketch: Van Westendorp price ladder on the priority match (₹0, ₹10, ₹20, ₹40, ₹60), then a stage-3 split between wait premium and rupee premium. Open questions from the PRD: map data availability for staffed entrances and 24/7 venues in Hyderabad; legally permissible driver criteria; how to serve riders who do not identify as women; SMS vs WhatsApp vs push.

## 7. Assumption map
Top-right (important, little evidence), each with the fact that would kill it:
- Riders switch the layer on at booking (35 to 45%). Killed by: activation under 15% in stage 2 with good comprehension.
- A committed pickup saves half the destination cancels. Killed by: shadow mode showing cancels are not destination-linked.
- Riders accept ₹20 or 4 minutes for a committed driver. Killed by: priority match under 10% selection in stage 3 at both premiums.
- Priority matching does not push standard night waits past 5 minutes. Killed by: median added wait above 5 minutes in stage 3.
- Map data on lit, staffed places exists for Hyderabad. Killed by: anchor coverage under 60% of pilot drop points.
Important and evidenced (build on it): the fear is measured; cancels are measured; the toolkit exists; T-Safe demand exists.
Less important, unknown (ignore for now): SMS vs WhatsApp; Telugu copy comprehension; outstation demand.

## 8. Baseline metric request list (stage 1, shadow mode)
By hour of day, Hyderabad, last two quarters: booking requests; completion rate; cancel-after-accept rate and who cancelled; time to match; Share My Trip usage; SOS and safety-line contacts per 1,000 trips; support tickets naming safety or cancellation; late-night NPS by gender where self-declared; repeat night riders; standard night ETA distribution (for the cannibalization watch); driver supply per zone after 8 PM.

## 9. Value model skeleton (with blanks)
Revenue lift = (night bookings × activation × cancel-share-today × share saved) × average fare × platform share + (activated × elevated share × priority selection × ₹20). Cost saved = support contacts avoided × cost per contact + cancel-handling minutes × loaded cost. Experience gained = NPS delta and perceived control, priced only if finance has an NPS-to-retention curve. Costs = one squad-quarter build + run (SMS, link hosting, audit hours) + the marketplace cost of the wait premium. Cannibalization check: standard night ETA before and during stage 3. Adoption-drag check: booking completion for non-activators, weekly. The site shows the illustrative range (₹0.7 to 1.4 crore a year, Hyderabad nights) with every input tagged; the blanks above are what stage 1 fills.

## 10. Stakeholder map

| Stakeholder | What they fear | What makes them say yes |
|---|---|---|
| Rider product lead | Feature overload in an already deep toolkit | One toggle, nothing removed, under two minutes |
| Trust & Safety | A false sense of security; brand blame after an incident | Plain-language brief, "not a guarantee" copy, human-only escalation |
| Marketplace | Priority matching pulling night supply | Guardrail on median added wait; shadow mode first |
| Privacy Counsel | Auto-sharing location without consent | Consent by default, expiring tokenized links, 90-day retention |
| Ops | Support load from contact alerts | No-response alerts under 10% of trips |
| Drivers | Opaque eligibility and penalties | Audited signals, appeal path, committed trips that do not vanish |
| Telangana Police (T-Safe) | Another app that does not plug in | Tracking link and SMS shaped to be the bridge |
| Regulator | Cancellation fines that arrive too late | Committed pickup removes the cancel before it happens |

Positioning map sketch (for the interview, not the page): x axis "when protection starts" (after the ride starts → before booking), y axis "who does the work" (rider by hand → system with consent). Uber, Ola, Rapido cluster bottom-left; T-Safe mid-left; SafeRide top-right.

## 11. Loop log (reconstructed from the build history)
1. Started as a women's-safety feature: brief, anchors, circle, check-in. Belief: fear is the whole problem. Evidence: reviews and cancellation data. Decision: pivot the frame to fear plus the ride that never comes; add the committed pickup.
2. Window was 10 PM to 5 AM. Evidence: late-hour rides that end past 10 PM; user feedback. Decision: persist with the layer, widen to 8 PM, add any-hour access for emergencies.
3. Rebuilt review cards as text. Evidence: user wanted proof that looks real. Decision: real screenshots grouped by app.
4. Page told the story in the order it was built. Evidence: the method audit (13 full / 18 partial / 18 missing). Decision: re-sequence into four chapters by the question each answers, and add the people, the pain-to-metric bridge and the commercial half.

## 12. How I built it
PRD first, with a one-line hypothesis and a measurement note that forbids invented outcomes. Then 84 plain-English rules for what the product will and will never do, before any screen. Then the prototype, reading every value from the shared rules. Then evidence: real reports, real reviews, sourced market data. Then this page, audited against the checklist and restructured into chapters. Every number carries a tag. Tools are not the story; the method is.

## 13. First analyses with real data
1. Is the cancel destination-linked? Cancel-after-accept rate by destination zone and hour, drivers' next-trip fare after cancelling. If not linked, the committed pickup loses its main claim.
2. Where does the brief say Elevated, and does it match where riders report low control? Label distribution vs perceived-control survey, by corridor.
3. What does a priority match cost the pool? Standard night ETA with and without priority matching, by zone and hour.

## 14. Likely hiring-manager questions, answer sketches

- **Why not just improve the SOS button?** SOS works after something goes wrong. The empty minutes are before booking. Every tool the apps ship today wakes up once the car is moving.
- **How do you avoid labelling neighbourhoods unsafe?** No crime data, no area labels, no public map. The brief describes tonight's trip in plain words and abstains when data is thin.
- **What if drivers game eligibility?** Multiple audited signals, monthly fairness review, an appeal and training path, and a committed pickup that removes the incentive to shop the trip to another app.
- **Why would a rider pay ₹20 more?** We do not know yet. It is a labelled hypothesis, and the pilot's third stage tests wait premium against rupee premium.
- **How does Priority Match affect standard night supply?** That is the cannibalization watchpoint. Shadow mode measures it before anyone sees a match, and median added wait above 5 minutes is a stop rule.
- **Why a proxy north star?** Because a model cannot measure safety outcomes honestly at pilot scale. Completed supported trips with reported control and no escalation is measurable weekly.
- **How would you know in week 4 the pilot is failing?** Comprehension under 70%, any consent failure, a drop in core booking completion, or no-response alerts above 10%.
- **Why Hyderabad?** Top-3 Uber city, a police night watch already running (T-Safe, 36,000 rides in year one), an IT corridor with dense late-shift demand.
- **Why Uber and not a standalone app?** The toolkit already exists there; the missing piece is sequencing. A standalone app would rebuild the toolkit and start with zero supply.
- **What did you cut?** Women-only supply guarantees, insurance, police dispatch, a public safety map, machine learning in the first version.
- **What would change your mind?** Shadow mode showing night cancellations are not destination-linked, or riders reading the brief as a guarantee despite the copy.
- **How does this hold up under India's data protection rules?** Consent at the point of sharing, tokenized expiring links, 90-day retention then anonymization, audit logs for every share, legal review before launch.

## 15. Brand voice self-check
Plain words, short sentences. No em dashes. No "X, not Y". No jargon. No tool names on the page. Greps: `grep -rn "—" src/components src/content`; `grep -rn ", not " src/components src/content`.

## 16. What the method asks of an internal feature case (mode notes, from the Casecraft source)
These are the "existing product upgrade" twists on the standard items. Use them when a hiring manager asks how the case differs from a startup pitch.
- **Personas**: current users segmented by behaviour in product data, not demographics. (Ours are composite from public evidence; the pilot's shadow stage would re-cut them by behaviour.)
- **Problem evidence pack**: product data joins the interviews: drop-off at the painful step, tickets naming it, feature requests.
- **Market sizing**: size the affected user base and the value pool inside it, not the whole market. (Our SAM/SOM does this: night trips, then Hyderabad.)
- **Concept variants**: score with RICE or ICE against the baseline metrics from the audit.
- **Willingness to pay**: for an internal case the probe is a chargeback or budget commitment from the benefiting unit. For SafeRide that is the product council's budget, plus the rider-side +₹20 test in pilot stage 3.
- **Revenue and pricing model**: business value against the baseline, signed by finance: revenue lift (trips completed that would have cancelled), cost saved (support escalations), experience gained (NPS, perceived control).
- **Unit economics**: incremental margin per affected user per year, from pilot data.
- **Sales plan**: the funnel is internal rollout: awareness, activation, habit, with owners per stage.
- **Financial plan**: incremental: cost of build and run against value of the lift, with payback period.
- **Investment ask**: a budget with opportunity cost stated: what does not get built instead.
- **Evidence standards**: weak = one source or secondhand; solid = two independent sources, one first degree; strong = triangulated first degree with numbers. Honest read of this case today: solid at best on the problem (NARI + LocalCircles + public reviews agree), design-only on the solution, open on the money. First-degree evidence arrives only with the pilot.

## 17. Where cases die, checked against this case
- Sizing with no bottom-up check → we have top-down only; the bottom-up (Hyderabad night trips × attach × fee) belongs in the pilot's shadow stage. Say so.
- Personas from imagination → ours are composite and labelled; interviews are the first thing the pilot buys.
- Ten features instead of one job → the site leads with one toggle and six jobs; five features sit under it, P0/P1 marked.
- Pricing asserted, never probed → +₹20 is a design spec, marked as an open question.
- Unit economics missing while the P&L shows crores → no P&L on the site by design.
- Competitors listed but white space unexplained → the fit card gives the structural reason (no team owns the pre-booking minute).
- No kill criteria → stop rules ship in chapter 4: any consent failure, a drop in core booking completion, median added wait above five minutes.
