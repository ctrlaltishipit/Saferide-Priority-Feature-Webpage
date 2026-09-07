/* ───────────────────────── The case, as data ─────────────────────────
   One source for the chapter structure, the verdict cards and every block
   in the four chapters. The nav, the case map, the chapters and the verdict
   cards all read this file, so no label is ever retyped per screen. Plain
   TypeScript, no JSX, importable from server and client modules alike. The
   page never uses the method's internal vocabulary; chapters are named by
   their content. Short sentences. Every number carries a tag. */

import {
  LATE_NIGHT_START_HOUR,
  LATE_NIGHT_END_HOUR,
  MAX_CIRCLE_CONTACTS,
  TRACKING_LINK_EXPIRY_MINUTES,
} from "@/server/rules";

const hour12 = (h: number) => `${h % 12 === 0 ? 12 : h % 12} ${h >= 12 ? "PM" : "AM"}`;
export const WINDOW_LABEL = `${hour12(LATE_NIGHT_START_HOUR)} to ${hour12(LATE_NIGHT_END_HOUR)}`;

/* ── chapters ── */
export type ChapterStatus = "live" | "next";
export interface ChapterMeta {
  id: string;
  n?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
  kicker: string;
  label: string;
  short: string;
  title: string;
  /** what the chapter covers, one line */
  question: string;
  /** the takeaway a reader leaves with */
  verdict: string;
  /** the chapter in three lines, for a reader with five minutes */
  summary: string[];
  gateId?: string;
  status: ChapterStatus;
}

export const CHAPTERS: ChapterMeta[] = [
  {
    id: "intro",
    n: 1,
    kicker: "CHAPTER 1",
    label: "Introduction",
    short: "Introduction",
    title: "At midnight, she runs her own safety check by hand.",
    question: "The problem, my thesis, and what this case covers.",
    verdict: "One toggle before pickup can replace six manual steps. Built by one person. Tested with nobody yet.",
    summary: [
      "Women booking cabs after 8 PM in Hyderabad check the driver, share the trip and text a friend by hand. 4 in 10 fear the ride.",
      "Every safety tool Uber ships starts once the car is moving. The minutes before booking stay empty.",
      "My thesis: one toggle that does the checking before pickup, and a driver who has already committed to the trip.",
    ],
    status: "live",
  },
  {
    id: "context",
    n: 2,
    kicker: "CHAPTER 2",
    label: "Background",
    short: "Background",
    title: "One person, one city, one gap nobody is filling.",
    question: "Who is building this, who it is for, and the market it sits in.",
    verdict: "A solo founder, four people in one night ride, and a night market of about 2 lakh rides where every app works after the car moves.",
    summary: [
      "I am Deekshitha Sreerala. Every part of this case, from the research to the pilot app you can open, is my own work.",
      "Four people share one night ride: the rider, the contact who waits, the driver, and the platform that decides.",
      "India's ride-hailing market is heading for $3.8 billion by FY2032, near 19% growth a year. Uber, Ola, Rapido, inDrive and Mana Yatri all start their safety work after pickup.",
    ],
    status: "live",
  },
  {
    id: "research",
    n: 3,
    kicker: "CHAPTER 3",
    label: "Research",
    short: "Research",
    title: "What the reviews, the reports and the numbers said.",
    question: "How I researched it, what I found, and what the product must do.",
    verdict: "The fear is measured, the cancels are measured, and riders describe the workaround in public. Uber's own baselines are still to pull.",
    summary: [
      "Desk research on 12 public sources, 29 rider reviews across five apps, six news reports from 2014 to 2026, and a competitor audit.",
      "Six jobs she does by hand every night, and the number each one suppresses on Uber's dashboards.",
      "Six insights, each traced to a screen. Nothing here came from a live interview yet; that is the first pilot stage.",
    ],
    gateId: "problem-verdict",
    status: "live",
  },
  {
    id: "design",
    n: 4,
    kicker: "CHAPTER 4",
    label: "Design",
    short: "Design",
    title: "From a safety score to four plain words.",
    question: "The options I weighed, the decisions I made, and what changed along the way.",
    verdict: "A layer inside Uber's booking flow won over a new app. Six design decisions changed on the way to the prototype.",
    summary: [
      "Four options scored on criteria written before the scoring. A layer on Uber's own toolkit won.",
      "Six decisions changed while building: the score became four words, the window moved to 8 PM, the committed pickup arrived.",
      "Readable rules decide everything. No crime data, no area labels, no machine learning in the first version.",
    ],
    gateId: "solution-verdict",
    status: "live",
  },
  {
    id: "prototype",
    n: 5,
    kicker: "CHAPTER 5",
    label: "Prototype",
    short: "Prototype",
    title: "Two ways in: watch it think, or drive it yourself.",
    question: "The guided prototype on this page, and the pilot app you open hands-on.",
    verdict: "The prototype explains each screen as you go. The pilot app hands you the keys. Nothing real is booked or shared in either.",
    summary: [
      "The prototype, below on this page, is the guided way in: the tour plays the eight screens with a note on what each adds and why.",
      "The pilot app is the hands-on way in: the same screens as a standalone app. Flip the toggle, say why you ride, pick an anchor, book. On a phone it opens like a real app.",
      "Neither is the pilot. The pilot is the eight-week Hyderabad test in chapter 6, and it has not run.",
    ],
    status: "live",
  },
  {
    id: "validate",
    n: 6,
    kicker: "CHAPTER 6",
    label: "Validate",
    short: "Validate",
    title: "Four bets, each with the number that would kill it.",
    question: "How the concept gets tested before anyone calls it a result.",
    verdict: "Four hypotheses, an eight-week pilot in five stages, a price ladder, and the assumptions that die first if they are wrong.",
    summary: [
      "Four hypotheses, each with a metric, a sample, a duration and a stop rule written before the pilot starts.",
      "The people I would sit with first: 25 women who ride after 8 PM, 8 students, 10 contacts, 10 night drivers, 3 safety operators.",
      "Eight weeks in Hyderabad, five stages. Money and permission unlock only on evidence from the stage before.",
    ],
    status: "live",
  },
  {
    id: "outcomes",
    n: 7,
    kicker: "CHAPTER 7",
    label: "Outcomes",
    short: "Outcomes",
    title: "Nothing measured yet. Here is exactly what would count.",
    question: "What the pilot would read out: the metrics, the money, and what I learned building it.",
    verdict: "Open until the pilot reads out. Every target is a hypothesis with a stop rule next to it.",
    summary: [
      "No pilot has run. Every number here is what the pilot in chapter 6 would read out, marked as a hypothesis.",
      "One north star, eight targets, six guardrails. The money model shows its working: ₹0.7 to 1.4 crore a year, illustrative.",
      "Four lessons from building it alone, including the one I would do differently.",
    ],
    gateId: "business-verdict",
    status: "live",
  },
  {
    id: "conclusion",
    n: 8,
    kicker: "CHAPTER 8",
    label: "Conclusion",
    short: "Conclusion",
    title: "Eight weeks in Hyderabad, then every riding app.",
    question: "Key takeaways, the recommendation, and next steps.",
    verdict: "The ask is on the table: one pilot slot, one corridor, one quarter. Decision pending.",
    summary: [
      "Eight takeaways, one per chapter, each linked to the evidence that earns it.",
      "The recommendation: an eight-week opt-in pilot in Hyderabad, with five rules that would stop it.",
      "Next: the pilot, then an MVP, then the same layer inside Ola, Rapido, inDrive and Mana Yatri. Feedback welcome on LinkedIn.",
    ],
    gateId: "ask-verdict",
    status: "live",
  },
];


/* ── the person behind this ── */
export const PILOT_APP_URL = "https://saferide-priority-app.vercel.app";

export const LINKEDIN_URL = "https://www.linkedin.com/in/deekshitha-sreerala/";

export const FOUNDER = {
  name: "Deekshitha Sreerala",
  role: "Solo founder. The whole team.",
  intro: "An AI product management generalist. I take a fuzzy problem from research to working software, and this page shows how I work.",
  lines: [
    "There is no company behind this page and no team beside me. The research, the rules, the guided prototype, the pilot app and this case are one person's work.",
    "I built it the way I would run a product: problem first, rules before screens, every number tagged, nothing claimed that a pilot has not shown.",
    "If you see a hole in the argument, a number that looks wrong, or a better way to do any of this, I want to hear it.",
  ],
  invite: "Write to me on LinkedIn: criticism, inputs and advice are all welcome.",
};

export const JOURNEY: { step: string; text: string }[] = [
  { step: "Noticed the ritual", text: "Women I know book a cab after dark and run the same five checks by hand. Then I found that 4 in 10 say they fear the ride." },
  { step: "Read what riders wrote", text: "29 public reviews across five apps and six news reports, 2014 to 2026. The same headline, twelve years apart." },
  { step: "Wrote the rules first", text: "84 plain rules for what the product does and never does, before a single screen. They still decide every value on every screen." },
  { step: "Built it, twice over", text: "A guided prototype that explains each screen, and a pilot app you can open hands-on. Same rules, same eight screens. Six decisions changed along the way." },
  { step: "Wrote this case", text: "For the room that decides: every number sourced, assumed or a hypothesis, and a verdict at the end of each part." },
];

/* ── research methods, with their limits ── */
export interface Method {
  name: string;
  count: string;
  what: string;
  limit: string;
  glyph: "list" | "people" | "grid" | "clock" | "wrench" | "room";
}

export const METHODS: Method[] = [
  { name: "Desk research", count: "12 sources", what: "Government reports, market studies and newsroom posts, each shown as a screenshot that opens the original.", limit: "Public numbers only. Uber's own baselines are not public.", glyph: "list" },
  { name: "Review mining", count: "29 reviews", what: "App store and review site screenshots across Uber, Ola, Rapido, inDrive and Mana Yatri, coded into six jobs.", limit: "Reviews skew to the angry and the grateful. They show the pattern, never the rate.", glyph: "people" },
  { name: "Competitor audit", count: "5 apps · 4 phases", what: "What every app does before booking, at pickup, during the ride and after arrival.", limit: "Based on public feature pages and the apps themselves, as of this year.", glyph: "grid" },
  { name: "News timeline", count: "6 reports", what: "Safety and reliability stories from 2014 to 2026, captured clean and linked.", limit: "Headlines prove the problem persists, never how often it happens.", glyph: "clock" },
  { name: "Rules as requirements", count: "84 rules", what: "Every requirement written as a plain sentence a rider could read, then enforced in the prototype.", limit: "Written by one person. A pilot team would challenge several.", glyph: "wrench" },
  { name: "Live interviews", count: "0 so far", what: "Composite personas come from reviews, posts and the PRD. Rider conversations in the pilot corridors are stage 1 of the pilot.", limit: "The biggest gap in this research, said plainly.", glyph: "room" },
];

/* ── design decisions that changed while building ── */
export interface Iteration {
  from: string;
  to: string;
  why: string;
  screen?: number;
}

export const ITERATIONS: Iteration[] = [
  { from: "A safety score out of 100", to: "Four plain categories with two to four reasons", why: "A number claims a precision the system lacks. A label with reasons invites a question.", screen: 2 },
  { from: "A 10 PM to 5 AM window", to: "8 PM to 5 AM, and any hour for emergency, medical and urgent trips", why: "A ride booked at 8 PM ends well past 10. Emergencies do not check the clock.", screen: 1 },
  { from: "Safety only", to: "Safety and reliability: the committed pickup", why: "82% of riders say drivers cancel on them. The ride that never comes is the same fear, in a different shape.", screen: 4 },
  { from: "A share-trip link", to: "A Safety Circle with a saved policy and the contact's own tracking view", why: "The person waiting needs the plate, the driver, and a clear signal for when to worry.", screen: 5 },
  { from: "A toggle and nothing else", to: "One tap that says why you ride, with an Other box", why: "The reason sets the queue. Hospital runs go first. The driver sees a flag, never the reason.", screen: 1 },
  { from: "A fixed list of drop points", to: "Safer anchors: staffed, lit, within 300 metres, with the extra minutes shown", why: "The last 200 metres are decided at booking. The original drop stays available and is never called unsafe.", screen: 3 },
];

/* ── what building it alone taught me ── */
export const LESSONS: { title: string; text: string }[] = [
  { title: "Rules before screens saved weeks", text: "Every screen reads its values from one rules file. When the window moved from 10 PM to 8 PM, one line changed." },
  { title: "Evidence has to show its face", text: "Retyped quotes read as opinion. Real screenshots with a link read as proof. I rebuilt the review wall for that reason." },
  { title: "Say what has not been tested", text: "Nothing on this page is an outcome. Every target is a hypothesis with a stop rule next to it. That honesty is the case." },
  { title: "One person can reach a prototype, and no further", text: "The next step needs Uber's baselines and real riders. That is why the ask is small: eight weeks, one corridor." },
];

/* ── chapter 6: how the concept gets validated ── */
export interface Hypothesis {
  id: string;
  claim: string;
  metric: string;
  sample: string;
  when: string;
  stop: string;
  screen: number;
}

export const HYPOTHESES: Hypothesis[] = [
  { id: "H1", claim: "A plain-language brief raises a rider's sense of control on a late-night trip.", metric: "Perceived control, 5-point scale, and comprehension of the brief", sample: "Opt-in cohort against a matched control group", when: "Stages 2 and 3", stop: "Comprehension under 70%: riders reading the brief as a guarantee", screen: 2 },
  { id: "H2", claim: "A saved Safety Circle removes the manual trip-sharing ritual.", metric: "Share actions per night trip, time from open to booked", sample: "Cohort against control", when: "Stage 2", stop: "A single consent complaint", screen: 5 },
  { id: "H3", claim: "Riders accept a safer drop point when it adds under 3 minutes of walking.", metric: "Acceptance rate by added minutes", sample: "Every cohort trip offered an anchor", when: "Stage 2", stop: "Acceptance under 10% at any added time", screen: 3 },
  { id: "H4", claim: "A committed driver is worth a small wait or fee, as long as the wait stays short.", metric: "Match selection by added ETA, NPS by selection", sample: "Half see the wait premium, half the rupee premium", when: "Stage 3", stop: "Median added wait above 5 minutes, or standard night supply falling", screen: 4 },
];

export const RESEARCH_PLAN: { who: string; count: string; why: string }[] = [
  { who: "Women who ride after 8 PM weekly", count: "25", why: "HITEC City, Gachibowli, Financial District. The last night ride, step by step, and the moment of least control." },
  { who: "Students riding late", count: "8", why: "Cheaper rides, later hours, a different set of workarounds." },
  { who: "Trusted contacts", count: "10", why: "What they need to stop asking: plate, driver, and when to worry." },
  { who: "Night drivers with 1000+ trips", count: "10", why: "Whether a committed pickup and a priority flag feel fair, and what an appeal path should look like." },
  { who: "Trust and Safety operators", count: "3", why: "Where escalations come from tonight, and what a calm check-in note must never say." },
  { who: "Shadowed night bookings", count: "6", why: "With permission, timing every manual step. The as-is map, measured." },
];

export const WTP_LADDER: { price: string; read: string }[] = [
  { price: "₹0", read: "Everyone would take it. Tells me nothing about value." },
  { price: "₹10", read: "The floor. Below here the fee reads as a rounding error." },
  { price: "₹20", read: "The price in the prototype. Shown with about 4 minutes of extra wait." },
  { price: "₹40", read: "Where I expect the first riders to say too much." },
  { price: "₹60", read: "The ceiling to test. Past here it is a premium product, and a different case." },
];

export const ASSUMPTION_MAP: { belief: string; killedBy: string; stage: string }[] = [
  { belief: "Riders switch the layer on at booking, 35 to 45% of eligible night trips.", killedBy: "Activation under 15% in stage 2 with comprehension holding.", stage: "Stage 2" },
  { belief: "A committed pickup saves half of the destination cancels.", killedBy: "Shadow mode showing cancels are not linked to the destination.", stage: "Stage 1" },
  { belief: "Riders accept ₹20 or about 4 minutes for a committed driver.", killedBy: "Priority match under 10% selection at both premiums.", stage: "Stage 3" },
  { belief: "Priority matching leaves standard night waits under 5 minutes longer.", killedBy: "Median added wait above 5 minutes.", stage: "Stage 3" },
  { belief: "Map data on lit, staffed places exists for Hyderabad.", killedBy: "Anchor coverage under 60% of pilot drop points.", stage: "Stage 1" },
];

export const chapterById = (id: string) => CHAPTERS.find((c) => c.id === id);
export const LIVE_CHAPTERS = CHAPTERS.filter((c) => c.status === "live");

/* ── lenses and verdicts ── */
export type LensKey = "riders" | "build" | "business" | "harm";
export type LensState = "evidence" | "design" | "open";

export const LENSES: Record<LensKey, { label: string; plain: string }> = {
  riders: { label: "For riders", plain: "do they want it" },
  build: { label: "To build", plain: "can Uber ship it" },
  business: { label: "For the business", plain: "does it pay" },
  harm: { label: "Doing no harm", plain: "is it fair and honest" },
};

export const LENS_STATE: Record<LensState, { label: string; color: string; note: string }> = {
  evidence: { label: "Evidence", color: "#06C167", note: "public proof exists" },
  design: { label: "Design", color: "#8FB0FF", note: "a design answer exists, no data yet" },
  open: { label: "Open", color: "#F6BC2F", note: "needs the pilot" },
};

export interface LensRead {
  key: LensKey;
  state: LensState;
}

export interface Gate {
  n: 1 | 2 | 3 | 4;
  id: string;
  name: string;
  question: string;
  know: { text: string; url?: string }[];
  assume: string[];
  clears: string[];
  lenses: LensRead[];
  verdict: string;
  footnote?: string;
}

export const GATE_1: Gate = {
  n: 1,
  id: "problem-verdict",
  name: "The problem",
  question: "Is the problem real, big, and still open on Uber?",
  know: [
    {
      text: "The fear is measured. 4 in 10 urban women feel unsafe, more so after dark.",
      url: "https://feminisminindia.com/2025/09/05/what-does-it-mean-to-feel-safe-nari-report-2025-on-womens-safety-in-indian-cities/",
    },
    {
      text: "The no-show is measured. 82% see drivers cancel, 74% after the destination is heard.",
      url: "https://www.business-standard.com/india-news/app-taxi-users-back-maharashtra-style-penalty-for-driver-cancellations-126080300462_1.html",
    },
    {
      text: "Uber India's safety toolkit is deep, and every tool starts after the car does.",
      url: "https://www.uber.com/en-IN/newsroom/uber-introduces-new-features-to-elevate-safety",
    },
    {
      text: "Hyderabad police already run a night watch for cab rides. 36,000 rides in year one.",
      url: "https://telanganatoday.com/explainer-what-is-t-safe-and-how-to-use-it",
    },
    { text: "Riders describe the hand-built workaround in public reviews, across every app." },
  ],
  assume: [
    "10 to 15% of cab trips run at night. No platform publishes the share.",
    "Women riders will switch the layer on when it takes under two minutes.",
    "The hand-built plan costs Uber trips: bookings never made, rides cancelled mid search.",
  ],
  clears: [
    "Uber's baseline: night completion, cancel-after-accept, share-trip use, support contacts per 1,000 trips.",
    "25 rider conversations in the pilot corridors.",
    "A data partner agrees the pain-to-metric estimates hold up.",
  ],
  lenses: [
    { key: "riders", state: "evidence" },
    { key: "build", state: "evidence" },
    { key: "business", state: "open" },
    { key: "harm", state: "design" },
  ],
  verdict: "Cleared on public evidence. Uber's own baselines still to pull.",
};

export const GATE_2: Gate = {
  n: 2,
  id: "solution-verdict",
  name: "The solution",
  question: "Does one flow fix both halves without breaking what works?",
  know: [
    { text: "Every tool the flow arms already exists on Uber India. Nothing is removed." },
    { text: "The flow runs on fixed, readable rules over five signals. No machine learning in v1." },
    { text: "The eight-screen prototype runs end to end, contact view included." },
    { text: "Four options were scored on criteria written first. The Uber layer won on both halves." },
  ],
  assume: [
    "A plain brief raises a rider's sense of control.",
    "A saved sharing policy beats typing to the group chat every night.",
    "Safer drop points are taken when they add under 3 minutes on foot.",
    "Riders trust the priority match while the extra wait stays short.",
  ],
  clears: [
    "Pilot stage 2: brief and circle for the opt-in cohort, against a control group.",
    "Pilot stage 3: priority matching on, with the wait premium and standard supply watched.",
  ],
  lenses: [
    { key: "riders", state: "design" },
    { key: "build", state: "evidence" },
    { key: "business", state: "open" },
    { key: "harm", state: "design" },
  ],
  verdict: "Cleared on design and a working prototype. Pilot pending.",
};

/* ── who decides ── */
export interface DecisionCard {
  label: string;
  title: string;
  text: string;
  note?: string;
}

export const DECISION: DecisionCard[] = [
  {
    label: "THE DECISION",
    title: "Approve an eight-week opt-in pilot in Hyderabad.",
    text: "One city, one corridor, riders who choose it. The pilot pulls the baselines and tests the four assumptions the case rests on.",
  },
  {
    label: "WHO DECIDES",
    title: "Uber India's product council.",
    text: "Rider product, Trust & Safety and Marketplace leads decide. Privacy Counsel and city Ops review first.",
    note: "Independent concept. This is the room the case was written for.",
  },
  {
    label: "WHAT DONE LOOKS LIKE",
    title: "A pilot slot, a budget, and a value model finance signs.",
    text: "Trips completed instead of cancelled. Support cost saved. Rider trust gained. All measured against today's Uber.",
  },
];

export interface Stakeholder {
  name: string;
  stake: string;
}

export const STAKEHOLDERS: Stakeholder[] = [
  { name: "The rider", stake: "wants the ride to come, and to feel in control" },
  { name: "Her trusted contact", stake: "wants to know without asking" },
  { name: "The driver", stake: "wants fair eligibility and a trip that does not vanish" },
  { name: "Safety Ops", stake: "wants fewer escalations, no false alarms" },
  { name: "Telangana Police, T-Safe", stake: "wants cab apps to plug in" },
  { name: "The regulator", stake: "wants cancellations to stop before the fine" },
];

/* ── personas ── */
export interface Persona {
  name: string;
  who: string;
  tag: string;
  tonight: string;
  workaround: string;
  job: string;
  accent: string;
}

export const PERSONAS: Persona[] = [
  {
    name: "Priya, 26",
    who: "Works in HITEC City, lives in Gachibowli. Rides home after 10 PM two to four nights a week.",
    tag: "PRIMARY RIDER",
    tonight: "12:15 AM after a release night. Tired, alone, phone at 20%.",
    workaround: "Checks the rating. Calls a friend. Shares the trip by hand. Asks for a visible gate.",
    job: "When I book late at night, help me choose safely without vetting every driver, route and drop point myself.",
    accent: "#276EF1",
  },
  {
    name: "Sneha, 22",
    who: "Student. Late rides home after classes and events, on a student budget.",
    tag: "OCCASIONAL RIDER",
    tonight: "10:45 PM from a friend's place. Parents waiting up.",
    workaround: "Sends a screenshot of the cab to the family group. Stays on a call until she is home.",
    job: "When I ride home late on a budget, let me switch on real protection without paying for another service.",
    accent: "#8E24AA",
  },
  {
    name: "Ananya",
    who: "Priya's sister. The trusted contact who gets the link and holds the worry.",
    tag: "TRUSTED CONTACT",
    tonight: "A message at 12:16 AM with a plate, a driver's name and a live map.",
    workaround: "Asks \"reached?\" every twenty minutes and keeps the chat open.",
    job: "When someone I love is in a cab at night, tell me who is driving, where it is going and when to worry, without me asking.",
    accent: "#0E8345",
  },
  {
    name: "Anil S.",
    who: "Night driver. Verified, safety trained, more than 1,000 trips. A SafeRide Partner.",
    tag: "PARTNER DRIVER",
    tonight: "Three long night requests. One pays a little more if he commits before the rider sees him.",
    workaround: "Runs two apps and drops the weaker request when a better fare lands.",
    job: "When I drive at night, give me a fair, clear path to priority trips, with no hidden penalties.",
    accent: "#B26205",
  },
];

/* ── jobs to be done ── */
export interface Job {
  when: string;
  want: string;
  soThat: string;
}

export const JOBS: Job[] = [
  { when: "When I book after 8 PM", want: "I want to know what tonight's trip looks like", soThat: "so I decide with open eyes." },
  { when: "When I get in the car", want: "I want someone I trust to know where I am", soThat: "so nobody has to ask." },
  { when: "When I set the drop", want: "I want a spot with people and light around it", soThat: "so the last 200 metres are easy." },
  { when: "When I pick a driver", want: "I want more than a star rating", soThat: "so the choice means something." },
  { when: "When I book at night", want: "I want the ride to actually come", soThat: "so I am not on the kerb at midnight." },
  { when: "When I arrive", want: "I want to close the loop in one tap", soThat: "so everyone can stop watching." },
];

/* ── why now ── */
export interface WhyNowItem {
  title: string;
  text: string;
  sourceName: string;
  sourceUrl: string;
}

export const WHY_NOW: WhyNowItem[] = [
  {
    title: "Uber just invested in the ride and left the booking alone.",
    text: "Its 2026 additions, from in-app recording to ambulance assist, all work once the car is moving. The minutes before booking are still empty.",
    sourceName: "Uber newsroom",
    sourceUrl: "https://www.uber.com/en-IN/newsroom/uber-introduces-new-features-to-elevate-safety",
  },
  {
    title: "Regulators now fine the cancel, after it happens.",
    text: "Maharashtra fines drivers 10% of the fare, capped at ₹100. The rider is still on the kerb. A committed pickup stops the cancel first.",
    sourceName: "Business Standard, Aug 2026",
    sourceUrl:
      "https://www.business-standard.com/india-news/app-taxi-users-back-maharashtra-style-penalty-for-driver-cancellations-126080300462_1.html",
  },
  {
    title: "Hyderabad police built the night watch and asked apps to plug in.",
    text: "T-Safe monitors rides on request. SafeRide's tracking link and circle SMS are shaped to be that bridge.",
    sourceName: "Telangana Today",
    sourceUrl: "https://telanganatoday.com/explainer-what-is-t-safe-and-how-to-use-it",
  },
  {
    title: "US riders can ask for a woman driver. Indian riders cannot yet.",
    text: "The Female rider toggle and the priority match give a choice at booking time, without promising women-only supply.",
    sourceName: "Uber newsroom",
    sourceUrl: "https://www.uber.com/en-IN/newsroom/uber-introduces-new-features-to-elevate-safety",
  },
];

export const WHY_UBER_FIRST =
  "Why Uber first: it ships the deepest toolkit of the three apps. SafeRide is a sequencing job on tools Uber already paid for.";

/* ── gap to metric ── */
export interface GapRow {
  pain: string;
  painNote: string;
  baseline: string;
  kpi: string;
}

export const GAP_ROWS: GapRow[] = [
  {
    pain: "Fear at the moment of booking",
    painNote: "4 in 10 women feel unsafe, more so after dark",
    baseline: "Women's night trip requests. Late-night NPS.",
    kpi: "35 to 45% activation on eligible night bookings. NPS up 8 points against control.",
  },
  {
    pain: "Sharing the trip by hand, every time",
    painNote: "screenshots, group chats, staying on the call",
    baseline: "Share My Trip use by hour. Time from app open to booked.",
    kpi: "50% or more of activators set up a circle. 70% or more complete the check-in.",
  },
  {
    pain: "The cancel after the driver hears the destination",
    painNote: "82% see cancels, 74% say it follows the destination",
    baseline: "Night completion rate. Time to match after 10 PM. Support contacts per 1,000 trips.",
    kpi: "No drop in core booking completion. Priority match chosen on 25% or more of elevated trips.",
  },
  {
    pain: "A dark, empty drop point",
    painNote: "remembered too late, on the lane itself",
    baseline: "Rider-reported sense of control after night trips.",
    kpi: "Perceived control 4.0 or higher out of 5. Anchors accepted on 20 to 35% of suggestions.",
  },
  {
    pain: "A safety label you cannot question",
    painNote: "a score with no reasons is a guess with a number",
    baseline: "Opt-out rate. Support tickets naming the feature.",
    kpi: "85% or more read the brief as guidance. Investigate if opt-out passes 20%.",
  },
];

/* ── constraints ── */
export const CONSTRAINTS: string[] = [
  "Never blocks a trip. The ride books either way.",
  `Runs ${WINDOW_LABEL}. Emergency, medical and urgent trips at any hour.`,
  "No crime data. No unsafe-area labels. No public risk map.",
  "No personal profiling. The Female rider switch is a choice, never a guess.",
  "Consent before any share. Links expire.",
  `Up to ${MAX_CIRCLE_CONTACTS} contacts. Replay ends ${TRACKING_LINK_EXPIRY_MINUTES} minutes after a safe check-in.`,
  "No machine learning in the first version. Fixed, readable rules only.",
  "India only. Hyderabad first.",
];

/* ═══════════════════════ Chapter 2 ═══════════════════════ */

export interface Option {
  name: string;
  what: string;
  scores: { fear: 1 | 2 | 3; ride: 1 | 2 | 3; speed: 1 | 2 | 3; build: 1 | 2 | 3 };
  note: string;
  winner?: boolean;
}

export const OPTION_CRITERIA: { key: keyof Option["scores"]; label: string; plain: string }[] = [
  { key: "fear", label: "Covers the fear", plain: "brief, circle, drop point" },
  { key: "ride", label: "Covers the no-show", plain: "the ride actually comes" },
  { key: "speed", label: "Speed to evidence", plain: "how soon a pilot reads out" },
  { key: "build", label: "Cost to build", plain: "how much already exists" },
];

export const OPTIONS: Option[] = [
  {
    name: "A standalone safety app",
    what: "A new app riders open before booking in any cab app.",
    scores: { fear: 2, ride: 1, speed: 1, build: 1 },
    note: "Zero drivers, so it can promise nothing about the ride. A seventh app on top of six.",
  },
  {
    name: "A better SOS inside the app",
    what: "Upgrade the tools that fire once the ride is moving.",
    scores: { fear: 1, ride: 1, speed: 3, build: 3 },
    note: "Cheap and fast. Leaves the pre-booking minutes as empty as today.",
  },
  {
    name: "A layer inside Ola or Rapido",
    what: "The same pre-booking flow on a thinner toolkit.",
    scores: { fear: 2, ride: 2, speed: 2, build: 2 },
    note: "Several tools would need building before sequencing. Rapido leads on bikes, where the flow matters less.",
  },
  {
    name: "A layer inside Uber",
    what: "Sequence the deepest toolkit into one pre-booking flow. Add the committed pickup.",
    scores: { fear: 3, ride: 3, speed: 2, build: 3 },
    note: "Every tool exists. Uber runs about half of India's cab trips, so the committed pickup has supply behind it.",
    winner: true,
  },
];

export interface DoblinType {
  group: "Configuration" | "Offering" | "Experience";
  name: string;
  /** yes = SafeRide truly changes something here; no = left as it is, with the reason */
  state: "yes" | "no";
  how: string;
}

/* Ten types of innovation, ticked only where SafeRide changes something real. */
export const DOBLIN: DoblinType[] = [
  { group: "Configuration", name: "Profit model", state: "yes", how: "An optional priority fee, and fares that complete because the driver committed." },
  { group: "Configuration", name: "Network", state: "yes", how: "Hyderabad police's T-Safe as the tracking partner. Metro gates, hospitals and fuel stations as anchors." },
  { group: "Configuration", name: "Structure", state: "no", how: "No new team or org. The pilot borrows people who already exist." },
  { group: "Configuration", name: "Process", state: "yes", how: "One pre-ride check replaces six manual steps. The driver commits before the rider sees the match." },
  { group: "Offering", name: "Product performance", state: "no", how: "Every feature the flow uses already ships. I add no new capability, I put them in order." },
  { group: "Offering", name: "Product system", state: "yes", how: "A layer over Uber's toolkit, with a contact view and a city bridge that work together." },
  { group: "Experience", name: "Service", state: "yes", how: "The circle SMS, the calm check-in, the first-in-line rematch when a driver drops out." },
  { group: "Experience", name: "Channel", state: "no", how: "Same booking flow, same SMS. Nothing new to install or find." },
  { group: "Experience", name: "Brand", state: "no", how: "Uber's brand, untouched. SafeRide is a toggle, and the disclaimer says so." },
  { group: "Experience", name: "Customer engagement", state: "yes", how: "Consent before every share. A brief you can question. One tap says why you ride tonight." },
];

export const NOT_LIST: { item: string; why: string }[] = [
  { item: "A women-only driver guarantee", why: "Supply cannot promise it every night. A priority match with a visible trade-off can." },
  { item: "A safety score", why: "A number claims precision the system lacks. Four plain categories with reasons instead." },
  { item: "Crime data, area labels, a public risk map", why: "Stigma for neighbourhoods. False precision for riders." },
  { item: "Blocking any trip", why: "The ride books either way. The layer removes the juggling, never the choice." },
  { item: "Machine learning in the first version", why: "Readable rules can be audited. A model cannot be explained at the kerb at midnight." },
  { item: "Insurance, police dispatch, a new SOS button", why: "Each exists or belongs elsewhere. The empty minutes are before booking." },
];

/* ── how we got here: evidence → insight → decision → screen ── */
export interface Insight {
  evidence: string;
  sourceName?: string;
  sourceUrl?: string;
  insight: string;
  decision: string;
  screen: { step: number; label: string };
  glyph: "clock" | "car" | "share" | "pin" | "check" | "shield";
}

export const INSIGHTS: Insight[] = [
  {
    evidence: "Every safety tool Uber ships starts once the car is moving. Riders in reviews describe the checks they run before booking.",
    sourceName: "Uber newsroom",
    sourceUrl: "https://www.uber.com/en-IN/newsroom/uber-introduces-new-features-to-elevate-safety",
    insight: "The fear peaks in the minutes before the booking, and nothing speaks to her then.",
    decision: "A plain-language brief at booking, with reasons and a confidence meter.",
    screen: { step: 2, label: "Screen 2, the Safety Brief" },
    glyph: "clock",
  },
  {
    evidence: "74% of riders say the cancel comes after the driver hears the destination.",
    sourceName: "LocalCircles via Business Standard",
    sourceUrl:
      "https://www.business-standard.com/india-news/app-taxi-users-back-maharashtra-style-penalty-for-driver-cancellations-126080300462_1.html",
    insight: "The driver decides before the rider knows a driver exists. Fines arrive too late to matter.",
    decision: "A committed pickup: the driver accepts before the rider sees the match. Cancel means instant rematch, first in line.",
    screen: { step: 4, label: "Screen 4, the Priority Match" },
    glyph: "car",
  },
  {
    evidence: "Contacts get screenshots and \"reached?\" texts. Priya's sister keeps the chat open for an hour.",
    insight: "The person waiting needs three things: who is driving, where the car is, and when to worry.",
    decision: "A Safety Circle with a saved policy. One SMS carries plate, driver, PIN and a live link that expires.",
    screen: { step: 5, label: "Screen 5, the Safety Circle" },
    glyph: "share",
  },
  {
    evidence: "Riders describe remembering too late that the lane home is dark and empty.",
    insight: "The last 200 metres are decided at booking, when nobody is thinking about them.",
    decision: "Safer anchors: one to three staffed, lit drop points within 300 metres, each with its added minutes.",
    screen: { step: 3, label: "Screen 3, Safer Anchors" },
    glyph: "pin",
  },
  {
    evidence: "Women wrote in reviews and public posts that a hidden score would feel like being judged, or lull them.",
    insight: "A number implies precision. A label with reasons invites a question.",
    decision: "Four plain categories, two to four reasons each, and Limited Data when coverage is thin. No crime data anywhere.",
    screen: { step: 2, label: "Screen 2, why am I seeing this" },
    glyph: "shield",
  },
  {
    evidence: "Every trip ends with a message someone forgets to send.",
    insight: "Closing the loop is a job too, and a loud alarm is the wrong tool for it.",
    decision: "A quiet check-in at five minutes, one reminder, then a calm note to the circle that says it is no emergency.",
    screen: { step: 8, label: "Screen 8, Arrival Check-In" },
    glyph: "check",
  },
];

/* ═══════════════════════ Chapter 3: the business model ═══════════════════════ */

export const NORTH_STAR = {
  metric: "SafeRide-supported late-night trips completed with a positive rider-reported sense of control and no safety-support escalation.",
  note: "A health proxy, read weekly. No model measures safety outcomes at pilot scale, so I measure what the pilot can see.",
};

export interface Kpi {
  label: string;
  target: string;
  why: string;
}

export const KPIS: Kpi[] = [
  { label: "Activation", target: "35 to 45% of eligible night bookings switch it on", why: "Nobody funds a toggle nobody flips." },
  { label: "Safety Circle set up", target: "50% or more of activators add a verified contact", why: "The circle is what contacts feel." },
  { label: "Priority Match chosen", target: "25% or more of elevated trips", why: "The committed pickup only pays when riders pick it." },
  { label: "Safer anchor accepted", target: "20 to 35% of suggestions", why: "Accepted when it adds under 3 minutes on foot." },
  { label: "Arrival check-in", target: "70% or more of supported trips", why: "How contacts stop watching." },
  { label: "Late-night NPS", target: "Up 8 points against a control group", why: "The trust signal a council recognises." },
  { label: "Perceived control", target: "4.0 or higher out of 5", why: "The north star's human half." },
  { label: "Comprehension", target: "85% or more read the brief as guidance", why: "The integrity floor." },
];

export const GUARDRAILS: { label: string; line: string }[] = [
  { label: "Added wait", line: "Median extra wait from a priority match stays under 5 minutes." },
  { label: "Limited Data", line: "Shown whenever coverage falls under 80%. Never a guess." },
  { label: "Contact alerts", line: "No-response alerts on under 10% of trips." },
  { label: "Consent", line: "Zero tolerance for a share nobody agreed to." },
  { label: "Core booking", line: "No drop in completion for riders who leave the layer off." },
  { label: "Opt-out", line: "Investigate if more than 20% switch it off after trying it." },
];

export interface ModelInput {
  label: string;
  value: string;
  kind: "sourced" | "assumption" | "hypothesis";
  url?: string;
}

export const REVENUE_INPUTS: ModelInput[] = [
  { label: "App cab trips in India, per day", value: "about 1.6 million", kind: "sourced", url: "https://www.equentis.com/blog/14-cabs-31-autorickshaws-56-bike-taxis-is-rapido-set-to-outpace-ola-uber/" },
  { label: "Share that runs at night", value: "10 to 15%", kind: "assumption" },
  { label: "Hyderabad's share of night trips", value: "about 8%", kind: "assumption" },
  { label: "Riders who switch the layer on", value: "35 to 45%", kind: "hypothesis" },
  { label: "Trips the brief reads as elevated", value: "about 40%", kind: "assumption" },
  { label: "Elevated trips that pick the priority match", value: "25%", kind: "hypothesis" },
  { label: "Priority fee, shown before booking", value: "₹20 and about 4 minutes", kind: "hypothesis" },
  { label: "Night bookings that die to a cancel today", value: "unknown. 8% used below", kind: "assumption" },
  { label: "Cancels the committed pickup saves", value: "half of them", kind: "hypothesis" },
  { label: "Average night fare, platform share", value: "about ₹250, about 25%", kind: "assumption" },
];

export const REVENUE_LINES: { label: string; math: string; range: string }[] = [
  { label: "Night trips in Hyderabad, per night", math: "1.6M × 10 to 15% × 8%", range: "13,000 to 19,000" },
  { label: "Trips with the layer on", math: "× 35 to 45%", range: "4,500 to 8,500" },
  { label: "Priority matches chosen", math: "× 40% elevated × 25%", range: "450 to 850 a night" },
  { label: "Priority fee, per year", math: "× ₹20 × 365", range: "₹33 to 62 lakh" },
  { label: "Cancels recovered", math: "activated × 8% × half", range: "180 to 340 trips a night" },
  { label: "Recovered fare share, per year", math: "× ₹250 × 25% × 365", range: "₹41 to 78 lakh" },
];

export const REVENUE_TOTAL = {
  range: "₹0.7 to 1.4 crore a year",
  scope: "Hyderabad nights only, before cannibalization and adoption drag. An order of magnitude to argue with, no more.",
};

export const VALUE_LEVERS: { label: string; line: string; metric: string }[] = [
  { label: "Revenue lift", line: "Night trips that complete instead of dying mid search. Plus the optional fee.", metric: "Night completion rate, fee revenue" },
  { label: "Cost saved", line: "Fewer support escalations. The check-in closes trips without a call.", metric: "Support contacts per 1,000 night trips" },
  { label: "Experience gained", line: "A rider who feels in control rides again and tells her circle.", metric: "Late-night NPS, perceived control, repeat rides" },
];

export const WATCHPOINTS: { label: string; risk: string; watch: string }[] = [
  { label: "Cannibalization", risk: "Priority matching pulls drivers out of the standard night pool. Other riders wait longer.", watch: "Shadow mode measures standard night ETA first. Median added wait above 5 minutes stops the pilot." },
  { label: "Adoption drag", risk: "An extra screen at booking suppresses bookings for riders who never wanted it.", watch: "The toggle is off by default. Completion for non-activators is a weekly guardrail." },
];

export type Confidence = "evidenced" | "design" | "assumed" | "unknown";
export const CONFIDENCE: Record<Confidence, { label: string; color: string }> = {
  evidenced: { label: "Evidenced", color: "#06C167" },
  design: { label: "Design", color: "#8FB0FF" },
  assumed: { label: "Assumed", color: "#F6BC2F" },
  unknown: { label: "Unknown", color: "#DE1135" },
};

export interface BmcBlock {
  area: string;
  title: string;
  items: string[];
  conf: Confidence;
}

export const BMC: BmcBlock[] = [
  { area: "kp", title: "Key partners", items: ["Telangana Police, T-Safe", "Staffed venues and metro gates", "Trust & Safety and Privacy inside Uber"], conf: "assumed" },
  { area: "ka", title: "Key activities", items: ["Run and audit the rules engine", "Verify and train partner drivers", "Send and expire the circle links"], conf: "design" },
  { area: "kr", title: "Key resources", items: ["The safety toolkit Uber already ships", "Driver verification data", "Map data on lit, staffed places"], conf: "assumed" },
  { area: "vp", title: "Value proposition", items: ["One toggle. The trip is planned, the driver is committed, the right people know, and the loop closes when she arrives."], conf: "design" },
  { area: "cr", title: "Customer relationships", items: ["Opt in. Consent before every share", "A brief you can question", "Appeal and training path for drivers"], conf: "design" },
  { area: "ch", title: "Channels", items: ["Inside the Uber booking flow", "SMS and a web link for contacts", "T-Safe for the city"], conf: "evidenced" },
  { area: "cs", title: "Customer segments", items: ["Night riders, women first", "Their trusted contacts", "Verified partner drivers"], conf: "evidenced" },
  { area: "cost", title: "Cost structure", items: ["One squad for a quarter to build", "SMS, link hosting, audit hours to run", "The wait premium the marketplace absorbs"], conf: "unknown" },
  { area: "rev", title: "Revenue and value", items: ["Optional priority fee", "Recovered night trips", "Support cost saved, trust gained"], conf: "assumed" },
];

export interface Stage {
  n: number;
  name: string;
  weeks: string;
  what: string;
  proves: string;
}

export const PILOT = {
  city: "Hyderabad",
  corridors: "HITEC City, Gachibowli and the Financial District",
  cohort: "Riders who choose to switch it on. Women first, open to anyone.",
  duration: "Eight weeks, read against criteria written before week one.",
};

export const STAGES: Stage[] = [
  { n: 0, name: "Research prototype", weeks: "done", what: "The rules, the screens, this case. Moderated sessions on copy and consent.", proves: "Riders read the brief as guidance and can set up a circle unaided." },
  { n: 1, name: "Shadow mode", weeks: "weeks 1 to 2", what: "Compute the brief for every eligible trip. Show nothing. Pull the baselines.", proves: "Night completion, cancel-after-accept, share-trip use, support contacts. Coverage above 80%." },
  { n: 2, name: "Limited opt-in", weeks: "weeks 3 to 5", what: "Brief, anchors and Safety Circle for the cohort, against a control group.", proves: "Activation, circle setup, check-in, comprehension, perceived control." },
  { n: 3, name: "Priority matching", weeks: "weeks 6 to 8", what: "The committed pickup switches on. Half see the wait premium, half the rupee premium.", proves: "Match selection, added wait, standard supply, what riders will pay." },
  { n: 4, name: "Expand", weeks: "after the readout", what: "More Hyderabad zones, then the T-Safe bridge. Only if every stop rule held.", proves: "The value model, signed by finance." },
];

export interface Role {
  role: string;
  covers: string;
  source: string;
}

export const SQUAD: Role[] = [
  { role: "Product manager", covers: "The case, the rules, the pilot design, the readout.", source: "Covered here: the PRD, 84 written rules, the prototype and this page." },
  { role: "Product designer", covers: "Eight screens, the contact view, copy that reads at midnight.", source: "Covered in the prototype. A designer hardens it for both platforms." },
  { role: "Rider app engineers, two", covers: "The toggle, the brief, the circle, the check-in.", source: "Borrowed from the rider app team for a quarter." },
  { role: "Marketplace engineer", covers: "The committed pickup and the first-in-line rematch.", source: "Borrowed. The one hire that matters most if borrowing fails." },
  { role: "Data scientist", covers: "Baselines, the rules audit, the fairness review.", source: "Borrowed from Trust & Safety data." },
  { role: "Trust & Safety partner", covers: "Escalation rules, driver eligibility, incident review.", source: "Existing team, part time." },
  { role: "Privacy counsel", covers: "Consent flow, link expiry, retention, legal review.", source: "Existing team, at the review points." },
  { role: "Hyderabad city ops", covers: "Driver training, the anchor list, the T-Safe conversation.", source: "Existing team, part time." },
];

export const GOVERNANCE: { what: string; who: string; when: string }[] = [
  { what: "Pilot metrics and guardrails", who: "Product, Trust & Safety, Ops", when: "Weekly" },
  { what: "Driver eligibility fairness review", who: "Data science, Trust & Safety", when: "Monthly" },
  { what: "Rules audit", who: "Product, Data science", when: "Monthly" },
  { what: "Privacy and consent audit", who: "Privacy counsel", when: "Quarterly" },
  { what: "Incident review", who: "Trust & Safety", when: "Weekly, or same day" },
];

export const COMPLIANCE: string[] = [
  "India's data protection rules: consent at the point of sharing, purpose limited to the trip.",
  "Motor Vehicle Aggregator Guidelines 2025 and the state rules under them.",
  "Telecom and SMS policy for the circle messages.",
  "Expiring, tokenised links. No precise location kept after the trip. 90-day retention, then anonymised.",
  "An audit log for every share and every escalation.",
  "Legal review before anything reaches a real rider.",
];

/* ═══════════════════════ Chapter 4: the ask ═══════════════════════ */

export interface Horizon {
  label: string;
  when: string;
  items: string[];
  unlock: string;
}

export const ROADMAP: Horizon[] = [
  { label: "Now", when: "the pilot, eight weeks", items: ["Shadow mode and the baseline pull", "Brief, anchors and Safety Circle for the cohort", "Priority matching in the last three weeks"], unlock: "A pilot slot and the squad. Stage 1 pulls baselines before stage 2 shows anything." },
  { label: "Next", when: "the two quarters after", items: ["Every Hyderabad zone", "The T-Safe bridge with Hyderabad police", "Telugu and Hindi", "Why-this-ride reasons feeding the queue at any hour"], unlock: "Every stop rule held through week eight. Finance signed the value model." },
  { label: "Later", when: "the year after", items: ["Bengaluru, Delhi, Mumbai nights", "Outstation trips tracked end to end", "The same layer inside Ola, Rapido, inDrive, Mana Yatri"], unlock: "Two cities show the same deltas. Themes here, never promises." },
];

/* Built for Uber first, made for every riding app. */
export const PORTABLE = {
  title: "Built for Uber first. Made for every riding app.",
  text: "Nothing in SafeRide is Uber-only. The brief, the safer drop, the committed pickup, the circle and the check-in sit on top of any booking flow. Uber goes first because its toolkit is deepest, so the pilot reads out fastest.",
  path: ["Prototype", "Pilot", "MVP", "Any riding app"],
  apps: ["Uber", "Ola", "Rapido", "inDrive", "Mana Yatri"],
};

/* Where each app's safety work starts today, and where SafeRide starts. */
export type Phase = "before" | "pickup" | "during" | "after";
export const PHASES: { key: Phase; label: string }[] = [
  { key: "before", label: "Before booking" },
  { key: "pickup", label: "At pickup" },
  { key: "during", label: "During the ride" },
  { key: "after", label: "After you arrive" },
];
export type Cover = 0 | 1 | 2; // none · partial · full
export const COVERAGE: { app: string; cover: Record<Phase, Cover>; note: string; ours?: boolean }[] = [
  { app: "Uber India", cover: { before: 0, pickup: 2, during: 2, after: 0 }, note: "PIN at pickup, the deepest in-ride toolkit" },
  { app: "Ola", cover: { before: 1, pickup: 2, during: 2, after: 0 }, note: "Pooling off at night, Guardian in the ride" },
  { app: "Rapido", cover: { before: 0, pickup: 0, during: 2, after: 0 }, note: "SOS and live tracking in the ride" },
  { app: "Hyderabad, T-Safe", cover: { before: 0, pickup: 0, during: 2, after: 1 }, note: "Police watch in the ride, auto check-ins" },
  { app: "SafeRide Priority", cover: { before: 2, pickup: 2, during: 2, after: 2 }, note: "Brief, anchor, committed driver and circle before booking. Then the toolkit, then the check-in.", ours: true },
];

export const ASK: { label: string; line: string }[] = [
  { label: "A pilot slot", line: "Eight weeks on the Hyderabad roadmap. The first two weeks show riders nothing." },
  { label: "An opt-in cohort", line: "Riders in the IT corridor who choose it, plus a matched control group." },
  { label: "One squad for one quarter", line: "A PM, a designer, three engineers. Part-time help from data, Trust & Safety, Privacy and city Ops." },
  { label: "The opportunity cost, stated", line: "The same squad-quarter would ship one mid-size rider feature. That is the trade." },
];

export const STOP_RULES: string[] = [
  "Any share a rider did not agree to. One is enough.",
  "A drop in booking completion for riders who leave the layer off.",
  "Median added wait from priority matching above 5 minutes.",
  "Fewer than 70% of riders reading the brief as guidance.",
  "Shadow mode showing night cancels are not tied to the destination.",
];

export const IMPACT = {
  who: "A woman booking a cab after dark stops being her own safety officer. Her contact stops asking. A verified driver gets a committed trip. The city's night watch gets the cab apps it asked for.",
  externality: "Drivers who do not qualify for the priority match lose some night demand. A rules engine can get eligibility wrong.",
  response: "Eligibility criteria are published. Every driver gets an appeal and a training path. A fairness review runs monthly, results kept.",
  proxy: "Supported night trips completed with a reported sense of control and no escalation. Read every week of the pilot.",
};

export const ABOUT: string[] = [
  "Problem first: a written PRD with a one-line hypothesis, and 84 plain rules for what the product will and will never do.",
  "Then the prototype: eight screens and the contact view, every value read from the shared rules.",
  "Then this page, written for the room that decides. Every number is tagged: sourced, assumed, or a hypothesis.",
  "29 review screenshots, six news reports and every market figure link to where they came from. Persona names are fictional.",
];

export const GATE_3: Gate = {
  n: 3,
  id: "business-verdict",
  name: "The business model",
  question: "Which metric moves, by how much, at what cost?",
  know: [
    { text: "Every metric in this chapter already sits on Uber's dashboards. Stage 1 pulls the baseline." },
    { text: "The price signal exists in the design: ₹20 and about 4 minutes, shown before the rider confirms." },
    {
      text: "Hyderabad riders already use a watched night ride. T-Safe monitored 36,000 in year one.",
      url: "https://telanganatoday.com/explainer-what-is-t-safe-and-how-to-use-it",
    },
    { text: "The cost side is small: one squad for a quarter, on tools Uber already paid for." },
  ],
  assume: [
    "35 to 45% of eligible riders switch it on. A quarter of elevated trips pick the priority match.",
    "About 8% of night bookings die to a cancel today. A committed pickup saves half.",
    "Riders accept ₹20 or 4 minutes for a driver who has already committed. Untested.",
    "Priority matching keeps standard night waits under 5 minutes.",
  ],
  clears: [
    "Stage 1: the baselines, pulled and dated.",
    "Stage 2 and 3 readouts against the targets, with the control group.",
    "A value model finance signs: revenue lift, cost saved, experience gained, against the baseline.",
  ],
  lenses: [
    { key: "riders", state: "design" },
    { key: "build", state: "evidence" },
    { key: "business", state: "open" },
    { key: "harm", state: "design" },
  ],
  verdict: "Open until the pilot reads out.",
  footnote: "This is a concept. No pilot has run. Every number above is labelled for what it is.",
};

export const GATE_4: Gate = {
  n: 4,
  id: "ask-verdict",
  name: "The ask",
  question: "What am I asking for, and what would make me stop?",
  know: [
    { text: "The problem is measured, the solution is clickable, and the business model is written down with every assumption labelled." },
    { text: "The ask is bounded: one squad, one quarter, one corridor, eight weeks." },
    { text: "Five stop rules are written before the pilot starts." },
  ],
  assume: [
    "The product council funds evidence over faith.",
    "The night market grows when the ride actually comes. The pilot's completion numbers test that first.",
  ],
  clears: [
    "A yes or a no from the room this case was written for.",
    "If yes: the stage 1 baseline pull, then the readout in week eight.",
    "If no: the reason, logged, so the next pass starts from it.",
  ],
  lenses: [
    { key: "riders", state: "design" },
    { key: "build", state: "evidence" },
    { key: "business", state: "open" },
    { key: "harm", state: "design" },
  ],
  verdict: "The ask is on the table. Decision pending.",
  footnote: "This is a concept. No pilot has run.",
};

/* ═══════════════════════ Sources, shown as snippets ═══════════════════════
   Every research claim on the page points at a public source. Where a
   snippet image exists, the page shows the source as a small card the
   reader can see and click, instead of a bare link. Images live in
   public/sources and public/news; they are screenshots of the pages. */
export interface SourceRef {
  url: string;
  name: string;
  headline: string;
  img: string;
}

export const SOURCES: SourceRef[] = [
  {
    url: "https://www.marketsandata.com/industry-reports/india-ride-hailing-market",
    name: "Markets and Data · Jan 2025",
    headline: "India ride-hailing: USD 950 million in FY2024 to USD 3.8 billion by FY2032, growing 18.8% a year",
    img: "/sources/marketsandata.jpg",
  },
  {
    url: "https://feminisminindia.com/2025/09/05/what-does-it-mean-to-feel-safe-nari-report-2025-on-womens-safety-in-indian-cities/",
    name: "Feminism in India · NARI 2025",
    headline: "What does it mean to feel safe? The NARI report on women's safety in Indian cities",
    img: "/sources/nari.jpg",
  },
  {
    url: "https://www.insightsonindia.com/2025/08/29/nari-2025-report/",
    name: "Insights on India · NARI 2025 method",
    headline: "12,770 women across 31 cities: how the safety index was built",
    img: "/sources/nari-method.jpg",
  },
  {
    url: "https://www.business-standard.com/india-news/app-taxi-users-back-maharashtra-style-penalty-for-driver-cancellations-126080300462_1.html",
    name: "Business Standard · Aug 2026",
    headline: "App taxi users back Maharashtra-style penalty for driver cancellations",
    img: "/news/bs.jpg",
  },
  {
    url: "https://www.uber.com/en-IN/newsroom/uber-introduces-new-features-to-elevate-safety",
    name: "Uber newsroom · India",
    headline: "Uber introduces new features to elevate safety",
    img: "/news/src-uber.jpg",
  },
  {
    url: "https://telanganatoday.com/explainer-what-is-t-safe-and-how-to-use-it",
    name: "Telangana Today",
    headline: "Explainer: what is T-Safe and how to use it",
    img: "/news/src-tsafe.jpg",
  },
  {
    url: "https://www.equentis.com/blog/14-cabs-31-autorickshaws-56-bike-taxis-is-rapido-set-to-outpace-ola-uber/",
    name: "Equentis Research · Aug 2025",
    headline: "14% cabs, 31% autos, 56% bike taxis: is Rapido set to outpace Ola and Uber?",
    img: "/sources/equentis.jpg",
  },
  {
    url: "https://ascendants.in/business-stories/rapido-overtakes-uber-ola-india-ride-hailing-market/",
    name: "Ascendants",
    headline: "Rapido overtakes Uber and Ola in India's ride-hailing market",
    img: "/sources/ascendants.jpg",
  },
  {
    url: "https://www.uber.com/en-IN/newsroom/empowering-women-transforming-economies-the-impact-of-ride-hailing-in-india",
    name: "Uber with Oxford Economics · 2023",
    headline: "Empowering women, transforming economies: the impact of ride-hailing in India",
    img: "/sources/uber-women.jpg",
  },
  {
    url: "https://www.statista.com/statistics/1454958/india-importance-of-ride-hailing-safety-features-by-gender/",
    name: "Statista · 2023",
    headline: "India: importance of ride-hailing safety features, by gender",
    img: "/sources/statista.jpg",
  },
  {
    url: "https://womensafetywing.telangana.gov.in/she-module/she-teams/",
    name: "Telangana Police · Women Safety Wing",
    headline: "SHE Teams: 331 teams protecting women in public spaces",
    img: "/sources/she-teams.jpg",
  },
  {
    url: "https://www.olacabs.com/media/in/press/ola-to-roll-out-guardian-feature-in-more-markets-across-india-and-australia-bolsters-platform-safety",
    name: "Ola · press",
    headline: "Ola rolls out the Guardian feature in more markets",
    img: "/news/src-ola.jpg",
  },
  {
    url: "https://www.sightsinplus.com/news/industry-news/rapido-launches-women-only-pink-bikes-creating-25000-jobs",
    name: "SightsIn Plus",
    headline: "Rapido launches women-only Pink bikes",
    img: "/sources/sightsinplus.jpg",
  },
];

export const sourceByUrl = (url?: string) => (url ? SOURCES.find((s) => s.url === url) : undefined);
