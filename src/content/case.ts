/* ───────────────────────── The case, as data ─────────────────────────
   One source for the chapter structure, the verdict cards and the Chapter 1
   blocks. The nav, the case map, the chapters and the verdict cards all read
   this file, so no label is ever retyped per screen. Plain TypeScript, no
   JSX, importable from server and client modules alike. The page never uses
   the method's internal vocabulary; chapters are named by their content. */

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
  n?: 1 | 2 | 3 | 4;
  kicker: string;
  label: string;
  short: string;
  title: string;
  question: string;
  verdict: string;
  gateId?: string;
  status: ChapterStatus;
}

export const CHAPTERS: ChapterMeta[] = [
  {
    id: "problem",
    n: 1,
    kicker: "CHAPTER 1",
    label: "The problem",
    short: "Problem",
    title: "Every night, she builds her own safety plan.",
    question: "Is this problem real, big, and still open on Uber today?",
    verdict: "Cleared on public evidence. Internal baselines still to pull.",
    gateId: "problem-verdict",
    status: "live",
  },
  {
    id: "solution",
    n: 2,
    kicker: "CHAPTER 2",
    label: "The solution",
    short: "Solution",
    title: "One toggle, finished before the door closes.",
    question: "Does one flow fix both halves, and can Uber build it without breaking what works?",
    verdict: "Cleared on design and a working prototype. Pilot pending.",
    gateId: "solution-verdict",
    status: "live",
  },
  {
    id: "prototype",
    kicker: "TRY IT",
    label: "The prototype",
    short: "Prototype",
    title: "Walk all 8 screens yourself.",
    question: "The evidence for chapter 2. Tap through the flow a rider would see.",
    verdict: "Fully interactive. Nothing real is booked, tracked or contacted.",
    status: "live",
  },
  {
    id: "money",
    n: 3,
    kicker: "CHAPTER 3",
    label: "The business model",
    short: "Business model",
    title: "What it costs, what it moves.",
    question: "Which metric moves, by how much, at what cost to Uber and to the rider?",
    verdict: "Open until the pilot stages read out.",
    gateId: "business-verdict",
    status: "live",
  },
  {
    id: "the-case",
    n: 4,
    kicker: "CHAPTER 4",
    label: "The ask",
    short: "The ask",
    title: "The ask: eight weeks in Hyderabad.",
    question: "What are we asking for, and what would make us stop?",
    verdict: "The ask, stated. Decision pending.",
    gateId: "ask-verdict",
    status: "live",
  },
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
  evidence: { label: "Evidence", color: "#06C167", note: "sourced proof exists" },
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
  question: "Is this problem real, big, and still open on Uber today?",
  know: [
    {
      text: "The fear is measured: 4 in 10 urban women feel unsafe, more so after dark (12,770 women, 31 cities).",
      url: "https://feminisminindia.com/2025/09/05/what-does-it-mean-to-feel-safe-nari-report-2025-on-womens-safety-in-indian-cities/",
    },
    {
      text: "The no-show is measured: 82% of app taxi users say drivers cancel on them, 74% after hearing the destination.",
      url: "https://www.business-standard.com/india-news/app-taxi-users-back-maharashtra-style-penalty-for-driver-cancellations-126080300462_1.html",
    },
    {
      text: "Uber India ships a deep safety toolkit, and every tool in it starts working after the car does.",
      url: "https://www.uber.com/en-IN/newsroom/uber-introduces-new-features-to-elevate-safety",
    },
    {
      text: "Hyderabad already runs a police night watch for cab rides, T-Safe, with 36,000 rides in its first year.",
      url: "https://telanganatoday.com/explainer-what-is-t-safe-and-how-to-use-it",
    },
    { text: "Riders describe the hand-built workaround in public reviews, across every app in the city." },
  ],
  assume: [
    "10 to 15% of daily cab trips run at night. No platform publishes the share.",
    "Women riders will switch the layer on at booking time when it costs under two minutes.",
    "The hand-built safety plan costs Uber trips today: bookings never made, and rides cancelled mid search.",
  ],
  clears: [
    "An internal baseline pull: night completion rate, cancel-after-accept by hour, share-trip use by hour, support contacts per 1,000 night trips.",
    "25 rider conversations in the pilot corridors, with the top-three pain share computed.",
    "A data partner agrees the pain-to-metric estimates below are defensible.",
  ],
  lenses: [
    { key: "riders", state: "evidence" },
    { key: "build", state: "evidence" },
    { key: "business", state: "open" },
    { key: "harm", state: "design" },
  ],
  verdict: "Cleared on public evidence. Internal baselines still to pull.",
};

export const GATE_2: Gate = {
  n: 2,
  id: "solution-verdict",
  name: "The solution",
  question: "Does one flow fix both halves, and can Uber build it without breaking what works?",
  know: [
    { text: "Every tool the flow arms already exists on Uber India. Nothing is removed and nothing is rebuilt." },
    { text: "The whole flow runs on fixed, readable rules over five observable signals. No machine learning in the first version." },
    { text: "The 8-screen prototype below runs end to end, with the contact's view of the trip included." },
    { text: "Four ways to answer the problem were scored against criteria written first. A layer inside Uber won on both halves of the problem." },
  ],
  assume: [
    "A plain-language brief raises a rider's sense of control.",
    "A saved sharing policy cuts the friction of telling someone every night.",
    "Safer drop points are accepted when they add under 3 minutes on foot.",
    "Riders trust the priority match only while its extra wait stays inside an acceptable range.",
  ],
  clears: [
    "Pilot stage 2: limited opt-in with the brief and the circle, measured against a control group.",
    "Pilot stage 3: priority matching switched on, with the wait premium and standard night supply watched.",
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
    text: "One city, one corridor, riders who choose to switch it on. The pilot exists to pull the baseline numbers and test the four assumptions this case rests on.",
  },
  {
    label: "WHO DECIDES",
    title: "Uber India's product council.",
    text: "Rider product, Trust & Safety and Marketplace leads make the call. Privacy Counsel and city Ops review before anything ships.",
    note: "Independent concept. This is the room the case was written for.",
  },
  {
    label: "WHAT DONE LOOKS LIKE",
    title: "A pilot slot, a budget, and a value model finance would sign.",
    text: "Trips completed instead of cancelled, support cost saved, rider trust gained. Every one of them measured against today's Uber.",
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
    who: "Works in HITEC City, lives in Gachibowli. Rides after 10 PM two to four nights a week.",
    tag: "PRIMARY RIDER",
    tonight: "A 12:15 AM booking after a release night. Tired, alone, phone at 20%.",
    workaround:
      "Checks the driver rating, calls a friend, shares the trip by hand, asks to be dropped at a visible gate.",
    job: "When I book a ride late at night, help me make a safer choice without investigating every driver, route and drop point myself.",
    accent: "#276EF1",
  },
  {
    name: "Sneha, 22",
    who: "Student. Occasional late rides home after classes and events, on a student budget.",
    tag: "OCCASIONAL RIDER",
    tonight: "A 10:45 PM ride from a friend's place. Parents waiting up.",
    workaround: "Texts a screenshot of the cab to the family group and stays on a call until she is home.",
    job: "When I ride home late on a budget, let me switch on real protection without paying for a whole different service.",
    accent: "#8E24AA",
  },
  {
    name: "Ananya",
    who: "Priya's sister, the trusted contact. Gets the link, holds the worry.",
    tag: "TRUSTED CONTACT",
    tonight: "A message at 12:16 AM with a plate number, a driver's name and a live map.",
    workaround: "Asks \"reached?\" every twenty minutes, and keeps the chat open until an answer lands.",
    job: "When someone I love is in a cab at night, tell me who is driving, where it is headed and when to worry, without me having to ask.",
    accent: "#0E8345",
  },
  {
    name: "Anil S.",
    who: "Night driver, verified, safety trained, more than 1,000 trips. A SafeRide Partner.",
    tag: "PARTNER DRIVER",
    tonight: "Three long night requests, one that pays a little more if he commits before the rider sees him.",
    workaround: "Shops the request across two apps and drops the weaker one when a better fare lands.",
    job: "When I drive at night, give me a fair, clear path to safety-priority trips, with no hidden penalties.",
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
  {
    when: "When I book after 8 PM",
    want: "I want to know what tonight's trip looks like",
    soThat: "so I decide with open eyes.",
  },
  {
    when: "When I get in the car",
    want: "I want someone I trust to know where I am",
    soThat: "so nobody has to ask.",
  },
  {
    when: "When I set the drop",
    want: "I want a spot with people and light around it",
    soThat: "so the last 200 metres are the easy part.",
  },
  {
    when: "When I pick a driver",
    want: "I want more than a star rating",
    soThat: "so the choice means something.",
  },
  {
    when: "When I book at night",
    want: "I want the ride to actually come",
    soThat: "so I am not on the kerb at midnight.",
  },
  {
    when: "When I arrive",
    want: "I want to close the loop in one tap",
    soThat: "so everyone can stop watching.",
  },
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
    title: "Uber India just invested in the ride, and left the booking alone.",
    text: "Its 2026 safety additions, from in-app recording to ambulance assist and custom trip PINs, all work during or after the ride. The minutes before booking are still empty.",
    sourceName: "Uber newsroom",
    sourceUrl: "https://www.uber.com/en-IN/newsroom/uber-introduces-new-features-to-elevate-safety",
  },
  {
    title: "Regulators now fine the cancel, after it happens.",
    text: "Maharashtra fines drivers who cancel: 10% of the fare, capped at ₹100. A fine after the fact still leaves the rider on the kerb. A committed pickup removes the cancel before it happens.",
    sourceName: "Business Standard, Aug 2026",
    sourceUrl:
      "https://www.business-standard.com/india-news/app-taxi-users-back-maharashtra-style-penalty-for-driver-cancellations-126080300462_1.html",
  },
  {
    title: "Hyderabad police built the night watch and asked apps to plug in.",
    text: "T-Safe monitors rides on request and auto checks in. The police have said they want cab apps connected. SafeRide's tracking link and circle SMS are shaped to be that bridge.",
    sourceName: "Telangana Today",
    sourceUrl: "https://telanganatoday.com/explainer-what-is-t-safe-and-how-to-use-it",
  },
  {
    title: "Riders in the US can ask for a woman driver. Riders in India cannot yet.",
    text: "Women Rider Preference exists in select markets abroad. The Female rider toggle and the priority match give Indian riders a choice at booking time, without a women-only supply promise.",
    sourceName: "Uber newsroom",
    sourceUrl: "https://www.uber.com/en-IN/newsroom/uber-introduces-new-features-to-elevate-safety",
  },
];

export const WHY_UBER_FIRST =
  "Why Uber first: it ships the deepest toolkit of the three apps, so SafeRide is a sequencing job on top of tools Uber has already paid for.";

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
    baseline: "Women's night trip requests. Late-night rider NPS.",
    kpi: "Activation on 35 to 45% of eligible night bookings. Late-night NPS up 8 points against a control group.",
  },
  {
    pain: "Sharing the trip by hand, every time",
    painNote: "screenshots, group chats, staying on the call",
    baseline: "Share My Trip usage by hour. Time from app open to booked.",
    kpi: "Safety Circle set up by 50% or more of activators. Arrival check-in completed on 70% or more of trips.",
  },
  {
    pain: "The cancel after the driver hears the destination",
    painNote: "82% see cancels, 74% say it follows the destination",
    baseline: "Night completion rate. Time to match after 10 PM. Support contacts per 1,000 night trips.",
    kpi: "No drop in core booking completion (a guardrail). Priority Match chosen on 25% or more of elevated trips.",
  },
  {
    pain: "A dark, empty drop point",
    painNote: "remembered too late, on the lane itself",
    baseline: "Rider-reported sense of control after night trips.",
    kpi: "Perceived control of 4.0 or higher out of 5. Safer anchor accepted on 20 to 35% of suggestions.",
  },
  {
    pain: "Trusting a safety label you cannot question",
    painNote: "a score with no reasons is a guess with a number",
    baseline: "Opt-out rate. Support tickets naming the feature.",
    kpi: "85% or more of riders read the brief as guidance and know it is no guarantee. Investigate if opt-out passes 20%.",
  },
];

/* ── constraints ── */
export const CONSTRAINTS: string[] = [
  "Never blocks a trip. The ride books either way.",
  `Runs ${WINDOW_LABEL}. Emergency, medical and urgent trips can use it at any hour.`,
  "No crime data. No unsafe-area labels. No public risk map.",
  "No personal profiling. The Female rider switch is a choice, never a guess.",
  "Consent before any share. Links expire.",
  `Up to ${MAX_CIRCLE_CONTACTS} contacts. Replay ends ${TRACKING_LINK_EXPIRY_MINUTES} minutes after a safe check-in.`,
  "No machine learning in the first version. Fixed, readable rules only.",
  "India only. Hyderabad first.",
];

/* ═══════════════════════ Chapter 2 additions ═══════════════════════ */

export interface Option {
  name: string;
  what: string;
  scores: { fear: 1 | 2 | 3; ride: 1 | 2 | 3; speed: 1 | 2 | 3; build: 1 | 2 | 3 };
  note: string;
  winner?: boolean;
}

export const OPTION_CRITERIA: { key: keyof Option["scores"]; label: string; plain: string }[] = [
  { key: "fear", label: "Covers the fear", plain: "the brief, the circle, the drop point" },
  { key: "ride", label: "Covers the no-show", plain: "the ride actually comes" },
  { key: "speed", label: "Speed to evidence", plain: "how soon a pilot can read out" },
  { key: "build", label: "Cost to build", plain: "how much already exists" },
];

export const OPTIONS: Option[] = [
  {
    name: "A standalone safety app",
    what: "A new app riders open before booking in any cab app.",
    scores: { fear: 2, ride: 1, speed: 1, build: 1 },
    note: "Starts with zero drivers, so it can promise nothing about the ride. Adds a seventh app to the six she already juggles.",
  },
  {
    name: "A better SOS inside the app",
    what: "Upgrade the tools that fire once the ride is moving.",
    scores: { fear: 1, ride: 1, speed: 3, build: 3 },
    note: "Cheap and fast, and it leaves the pre-booking minutes exactly as empty as today.",
  },
  {
    name: "A layer inside Ola or Rapido",
    what: "The same pre-booking flow on a thinner safety toolkit.",
    scores: { fear: 2, ride: 2, speed: 2, build: 2 },
    note: "Several tools would have to be built before they could be sequenced. Rapido leads on bikes, where the flow matters less.",
  },
  {
    name: "A layer inside Uber",
    what: "Sequence the deepest existing toolkit into one pre-booking flow, and add the committed pickup.",
    scores: { fear: 3, ride: 3, speed: 2, build: 3 },
    note: "Every tool the flow arms already exists. Uber runs about half of India's cab trips, so the committed pickup has supply to draw on.",
    winner: true,
  },
];

export interface DoblinType {
  group: "Configuration" | "Offering" | "Experience";
  name: string;
  state: "innovate" | "match" | "skip";
  how: string;
}

export const DOBLIN: DoblinType[] = [
  { group: "Configuration", name: "Profit model", state: "innovate", how: "An optional priority fee, and recovered trips that would have cancelled. Value against the baseline." },
  { group: "Configuration", name: "Network", state: "innovate", how: "Hyderabad police's T-Safe as the tracking partner, staffed venues and metro gates as anchors." },
  { group: "Configuration", name: "Structure", state: "skip", how: "No new org. The pilot borrows Trust & Safety, Ops and Privacy from teams that exist." },
  { group: "Configuration", name: "Process", state: "innovate", how: "One pre-ride check replaces six manual steps. The driver commits before the rider sees the match." },
  { group: "Offering", name: "Product performance", state: "match", how: "Deliberately not the story. Every feature the flow arms already ships. Copying it is easy; sequencing it is the work." },
  { group: "Offering", name: "Product system", state: "innovate", how: "A layer over the toolkit Uber already paid for, with a contact-side view and a city bridge." },
  { group: "Experience", name: "Service", state: "innovate", how: "The circle SMS, the calm check-in, the committed pickup with first-in-line rematch." },
  { group: "Experience", name: "Channel", state: "match", how: "Inside the booking flow, where the rider already is. Contacts get an SMS, no app to install." },
  { group: "Experience", name: "Brand", state: "match", how: "Uber's. SafeRide is a toggle, and the disclaimer says so." },
  { group: "Experience", name: "Customer engagement", state: "innovate", how: "Consent before every share. A brief you can question. One tap says why you ride." },
];

export const NOT_LIST: { item: string; why: string }[] = [
  { item: "A women-only driver guarantee", why: "Supply cannot promise it every night. A priority match with a visible trade-off can." },
  { item: "A safety score or a number", why: "A number implies precision the system does not have. Four plain categories instead, with reasons." },
  { item: "Crime data, area labels or a public risk map", why: "Stigma for neighbourhoods, and a false sense of precision for riders." },
  { item: "Blocking any trip", why: "The ride books either way. The layer removes the juggling, never the choice." },
  { item: "Machine learning in the first version", why: "Fixed, readable rules can be audited. A model cannot be explained at the kerb at midnight." },
  { item: "Insurance, police dispatch, a new SOS button", why: "Each exists or belongs elsewhere. The empty minutes are before booking." },
];

/* ═══════════════════════ Chapter 3: the business model ═══════════════════════ */

export const NORTH_STAR = {
  metric: "SafeRide-supported late-night trips completed with a positive rider-reported sense of control and no safety-support escalation.",
  note: "A product-health proxy, read weekly. No model can measure safety outcomes honestly at pilot scale, so we measure what the pilot can see.",
};

export interface Kpi {
  label: string;
  target: string;
  why: string;
}

export const KPIS: Kpi[] = [
  { label: "Activation", target: "35 to 45% of eligible night bookings switch the layer on", why: "Nobody funds a toggle nobody flips." },
  { label: "Safety Circle set up", target: "50% or more of activators add at least one verified contact", why: "The circle is the feature contacts feel." },
  { label: "Priority Match chosen", target: "25% or more of elevated trips", why: "The committed pickup only pays when riders pick it." },
  { label: "Safer anchor accepted", target: "20 to 35% of suggestions", why: "Accepted when it adds under 3 minutes on foot." },
  { label: "Arrival check-in", target: "70% or more of supported trips close the loop", why: "The check-in is how contacts stop watching." },
  { label: "Late-night NPS", target: "Up 8 points against a control group", why: "The trust signal a council will recognise." },
  { label: "Perceived control", target: "4.0 or higher out of 5", why: "The north star's human half." },
  { label: "Comprehension", target: "85% or more read the brief as guidance and know it is no guarantee", why: "The integrity floor." },
];

export const GUARDRAILS: { label: string; line: string }[] = [
  { label: "Added wait", line: "Median extra wait from a priority match stays under 5 minutes." },
  { label: "Limited Data", line: "Shown whenever signal coverage falls under 80%. Never a guess." },
  { label: "Contact alerts", line: "No-response alerts on under 10% of trips." },
  { label: "Consent", line: "Zero tolerance for a share nobody agreed to." },
  { label: "Core booking", line: "No drop in booking completion for riders who leave the layer off." },
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
  { label: "Hyderabad's share of night trips", value: "about 8%, a top-3 city", kind: "assumption" },
  { label: "Riders who switch the layer on", value: "35 to 45%", kind: "hypothesis" },
  { label: "Trips the brief reads as elevated", value: "about 40%", kind: "assumption" },
  { label: "Elevated trips that pick the priority match", value: "25%", kind: "hypothesis" },
  { label: "Priority fee, shown before booking", value: "₹20 and about 4 minutes", kind: "hypothesis" },
  { label: "Night bookings that die to a cancel today", value: "unknown until the baseline pull; 8% used below", kind: "assumption" },
  { label: "Cancels the committed pickup saves", value: "half of them", kind: "hypothesis" },
  { label: "Average night fare and platform share", value: "about ₹250, about 25%", kind: "assumption" },
];

export const REVENUE_LINES: { label: string; math: string; range: string }[] = [
  { label: "Night trips in Hyderabad, per night", math: "1.6M × 10 to 15% × 8%", range: "13,000 to 19,000" },
  { label: "Trips with the layer on", math: "× 35 to 45%", range: "4,500 to 8,500" },
  { label: "Priority matches chosen", math: "× 40% elevated × 25% chosen", range: "450 to 850 a night" },
  { label: "Priority fee, per year", math: "× ₹20 × 365", range: "₹33 to 62 lakh" },
  { label: "Cancels recovered", math: "activated × 8% × half", range: "180 to 340 trips a night" },
  { label: "Recovered fare share, per year", math: "× ₹250 × 25% × 365", range: "₹41 to 78 lakh" },
];

export const REVENUE_TOTAL = {
  range: "₹0.7 to 1.4 crore a year",
  scope: "Hyderabad nights alone, before cannibalization and adoption drag, which the pilot measures. An order of magnitude, never a forecast.",
};

export const VALUE_LEVERS: { label: string; line: string; metric: string }[] = [
  { label: "Revenue lift", line: "Night trips that complete instead of cancelling mid search, plus the optional priority fee.", metric: "Night completion rate, priority fee revenue" },
  { label: "Cost saved", line: "Fewer support escalations and cancel handling. The check-in closes trips without a call.", metric: "Support contacts per 1,000 night trips" },
  { label: "Experience gained", line: "A rider who feels in control rides again, and tells her circle.", metric: "Late-night NPS, perceived control, repeat night rides" },
];

export const WATCHPOINTS: { label: string; risk: string; watch: string }[] = [
  { label: "Cannibalization", risk: "Priority matching pulls eligible drivers out of the standard night pool, and other riders wait longer.", watch: "Shadow mode measures standard night ETA before anyone sees a match. Median added wait above 5 minutes is a stop rule." },
  { label: "Adoption drag", risk: "An extra screen at booking suppresses bookings for riders who never wanted it.", watch: "The toggle stays off by default. Core booking completion for non-activators is a guardrail, read weekly." },
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
  { area: "kp", title: "Key partners", items: ["Telangana Police, T-Safe", "Staffed venues and metro gates as anchors", "Trust & Safety and Privacy inside Uber"], conf: "assumed" },
  { area: "ka", title: "Key activities", items: ["Run the rules engine and its monthly audit", "Verify and train partner drivers", "Send and expire the circle links"], conf: "design" },
  { area: "kr", title: "Key resources", items: ["The safety toolkit Uber already ships", "Driver verification data", "Map data on lit, staffed places"], conf: "assumed" },
  { area: "vp", title: "Value proposition", items: ["One toggle. The trip is planned, the driver is committed, the right people know, and the loop closes when she arrives."], conf: "design" },
  { area: "cr", title: "Customer relationships", items: ["Opt in, consent before every share", "Plain words, a brief you can question", "Appeal and training path for drivers"], conf: "design" },
  { area: "ch", title: "Channels", items: ["Inside the Uber booking flow", "SMS and a web link for contacts, no install", "T-Safe for the city"], conf: "evidenced" },
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
  corridors: "HITEC City, Gachibowli and the Financial District, with the residential routes they feed",
  cohort: "Riders who choose to switch it on. Women first, open to anyone.",
  duration: "Eight weeks, then a readout against criteria written before week one.",
};

export const STAGES: Stage[] = [
  { n: 0, name: "Research prototype", weeks: "done", what: "The rules, the screens and this case. Moderated sessions on the copy, the brief and consent.", proves: "Riders understand the brief as guidance and can set up a circle unaided." },
  { n: 1, name: "Shadow mode", weeks: "weeks 1 to 2", what: "Compute the brief for every eligible night trip. Show nothing. Pull the baselines.", proves: "Night completion, cancel-after-accept, share-trip use, support contacts. Limited Data coverage above 80%." },
  { n: 2, name: "Limited opt-in", weeks: "weeks 3 to 5", what: "The brief, the anchors and the Safety Circle for the opt-in cohort, against a control group.", proves: "Activation, circle setup, check-in completion, comprehension, perceived control." },
  { n: 3, name: "Priority matching", weeks: "weeks 6 to 8", what: "The committed pickup switches on. Half the cohort sees the wait premium, half sees the rupee premium.", proves: "Match selection, median added wait, standard night supply, what riders will pay." },
  { n: 4, name: "Expand", weeks: "after the readout", what: "More Hyderabad zones, then the T-Safe bridge. Only if every stop rule held.", proves: "The value model, signed by finance." },
];

export interface Role {
  role: string;
  covers: string;
  source: string;
}

export const SQUAD: Role[] = [
  { role: "Product manager", covers: "The case, the rules, the pilot design and the readout.", source: "Covered here: the PRD, 84 written rules, the prototype and this page." },
  { role: "Product designer", covers: "The eight screens, the contact view, the copy a stranger can read at midnight.", source: "Covered in the prototype. A designer would harden it for both platforms." },
  { role: "Rider app engineers, two", covers: "The toggle, the brief, the circle, the check-in.", source: "Borrowed from the rider app team for one quarter." },
  { role: "Marketplace engineer", covers: "The committed pickup and the first-in-line rematch.", source: "Borrowed. The one hire that changes the odds most if it cannot be borrowed." },
  { role: "Data scientist", covers: "Shadow-mode baselines, the rules audit, the fairness review.", source: "Borrowed from Trust & Safety data." },
  { role: "Trust & Safety partner", covers: "Escalation rules, driver eligibility, incident review.", source: "Existing team, part time." },
  { role: "Privacy counsel", covers: "Consent flow, link expiry, retention, the legal review before launch.", source: "Existing team, at the review points only." },
  { role: "Hyderabad city ops", covers: "Driver training, anchor list, the T-Safe conversation.", source: "Existing team, part time." },
];

export const GOVERNANCE: { what: string; who: string; when: string }[] = [
  { what: "Pilot metrics and guardrails", who: "Product, Trust & Safety, Ops", when: "Weekly" },
  { what: "Driver eligibility fairness review", who: "Data science, Trust & Safety", when: "Monthly" },
  { what: "Rules audit", who: "Product, Data science", when: "Monthly" },
  { what: "Privacy and consent audit", who: "Privacy counsel", when: "Quarterly" },
  { what: "Incident review", who: "Trust & Safety", when: "Weekly, or on the day" },
];

export const COMPLIANCE: string[] = [
  "India's data protection rules: consent at the point of sharing, purpose limited to the trip.",
  "Motor Vehicle Aggregator Guidelines 2025, and the state rules that sit under them.",
  "Telecom and SMS policy for the circle messages.",
  "Tokenised, expiring tracking links. No precise location kept after the trip. 90-day retention, then anonymised.",
  "An audit log for every share and every safety escalation.",
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
  { label: "Now", when: "the pilot, eight weeks", items: ["Shadow mode and the baseline pull", "Brief, anchors and Safety Circle for the opt-in cohort", "Priority matching in the last three weeks"], unlock: "Starts with a pilot slot and the squad. Stage 1 must pull baselines before stage 2 shows anything." },
  { label: "Next", when: "the two quarters after", items: ["Every Hyderabad zone", "The T-Safe bridge with Hyderabad police", "Telugu and Hindi", "Why-this-ride reasons feeding the queue at any hour"], unlock: "Every stop rule held through week eight, and finance signed the value model." },
  { label: "Later", when: "the year after", items: ["Bengaluru, Delhi, Mumbai nights", "Outstation trips with tracking for the whole ride", "The layer offered to any app that wants it"], unlock: "Two cities show the same deltas. Themes here, never promises." },
];

export const ASK: { label: string; line: string }[] = [
  { label: "A pilot slot", line: "Eight weeks on the Hyderabad roadmap, starting with two weeks nobody sees." },
  { label: "An opt-in cohort", line: "Riders in the IT corridor who choose to switch it on, and a matched control group." },
  { label: "One squad for one quarter", line: "A PM, a designer, three engineers, and part-time help from data, Trust & Safety, Privacy and city Ops." },
  { label: "The opportunity cost, stated", line: "The same squad-quarter would ship one mid-size rider feature instead. That is the trade the council weighs." },
];

export const STOP_RULES: string[] = [
  "Any share a rider did not agree to. One is enough.",
  "A drop in booking completion for riders who leave the layer off.",
  "Median added wait from priority matching above 5 minutes.",
  "Fewer than 70% of riders reading the brief as guidance rather than a promise.",
  "Shadow mode showing night cancels are not tied to the destination at all.",
];

export const IMPACT = {
  who: "A woman booking a cab after dark in Hyderabad stops being her own safety officer. Her contact stops asking. A verified driver gets a committed trip instead of a fare to shop around. The city's night watch gets the cab apps it asked for.",
  externality: "Drivers who do not qualify for the priority match lose some night demand, and a rules engine can get eligibility wrong.",
  response: "Eligibility criteria are published, every driver gets an appeal and a training path, and a fairness review runs monthly with the results kept.",
  proxy: "Supported night trips completed with a reported sense of control and no escalation. Read every week of the pilot.",
};

export const ABOUT: string[] = [
  "The problem came first: a written PRD with a one-line hypothesis, and 84 plain-English rules for what the product will and will never do, before any screen was drawn.",
  "Then the prototype: eight screens and the contact's view, every value read from the shared rules so a screen can never drift from the spec.",
  "Then this page, written backwards from the room that decides. Every number carries a tag: sourced, an assumption, or a pilot hypothesis. Nothing is claimed as an outcome.",
  "The 29 review screenshots, six news reports and every market figure link to where they came from. The names in the personas and the prototype are fictional.",
];

export const GATE_3: Gate = {
  n: 3,
  id: "business-verdict",
  name: "The business model",
  question: "Which metric moves, by how much, at what cost to Uber and to the rider?",
  know: [
    { text: "Every metric in this chapter already exists on Uber's dashboards. The baseline is a pull away, and stage 1 pulls it." },
    { text: "The price signal exists in the design: ₹20 and about 4 minutes, shown before the rider confirms." },
    {
      text: "Hyderabad riders already use a watched night ride: T-Safe monitored 36,000 in its first year.",
      url: "https://telanganatoday.com/explainer-what-is-t-safe-and-how-to-use-it",
    },
    { text: "The cost side is small: one squad for a quarter, on tools the company already paid for." },
  ],
  assume: [
    "35 to 45% of eligible riders switch it on, and a quarter of elevated trips pick the priority match.",
    "About 8% of night bookings die to a cancel today, and a committed pickup saves half of them.",
    "Riders accept ₹20 or 4 minutes for a driver who has already committed. Untested.",
    "Priority matching does not push standard night waits past 5 minutes.",
  ],
  clears: [
    "Stage 1: the baselines, pulled and frozen with a date.",
    "Stage 2 and 3 readouts against the targets above, with the control group.",
    "A value model finance signs: revenue lift, cost saved, experience gained, against the frozen baseline.",
  ],
  lenses: [
    { key: "riders", state: "design" },
    { key: "build", state: "evidence" },
    { key: "business", state: "open" },
    { key: "harm", state: "design" },
  ],
  verdict: "Open until the pilot stages read out.",
  footnote: "This is a concept. No pilot has run, and every number above is labelled for what it is.",
};

export const GATE_4: Gate = {
  n: 4,
  id: "ask-verdict",
  name: "The ask",
  question: "What are we asking for, and what would make us stop?",
  know: [
    { text: "The problem is real and measured, the solution is designed and clickable, and the business model is written down with every assumption labelled." },
    { text: "The ask is small and bounded: one squad, one quarter, one corridor, eight weeks." },
    { text: "Five stop rules are written before the pilot starts, so nobody has to argue about them in week six." },
  ],
  assume: [
    "The product council funds evidence over faith, and a labelled hypothesis reads as honesty rather than weakness.",
    "The night market grows when the ride actually comes. The pilot's completion numbers are the first test of that.",
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
  verdict: "The ask, stated. Decision pending.",
  footnote: "This is a concept. No pilot has run.",
};
