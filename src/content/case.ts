/* ───────────────────────── The case, as data ─────────────────────────
   One source for the chapter structure, the gate cards and the Chapter 1
   blocks. The nav, the case map, the chapters and the gate cards all read
   this file, so no label is ever retyped per screen. Plain TypeScript, no
   JSX, importable from server and client modules alike. */

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
    gateId: "gate-1",
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
    gateId: "gate-2",
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
    label: "The money",
    short: "Money",
    title: "What it costs, what it moves.",
    question: "Which metric moves, by how much, at what cost to Uber and to the rider?",
    verdict: "Open until the pilot stages read out.",
    gateId: "gate-3",
    status: "next",
  },
  {
    id: "the-case",
    n: 4,
    kicker: "CHAPTER 4",
    label: "The case",
    short: "Case",
    title: "The ask: eight weeks in Hyderabad.",
    question: "What are we asking for, and what would make us stop?",
    verdict: "The ask, stated. Decision pending.",
    gateId: "gate-4",
    status: "next",
  },
];

export const chapterById = (id: string) => CHAPTERS.find((c) => c.id === id);
export const LIVE_CHAPTERS = CHAPTERS.filter((c) => c.status === "live");

/* ── lenses and gates ── */
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
  id: "gate-1",
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
  id: "gate-2",
  name: "The solution",
  question: "Does one flow fix both halves, and can Uber build it without breaking what works?",
  know: [
    { text: "Every tool the flow arms already exists on Uber India. Nothing is removed and nothing is rebuilt." },
    { text: "The whole flow runs on fixed, readable rules over five observable signals. No machine learning in the first version." },
    { text: "The 8-screen prototype below runs end to end, with the contact's view of the trip included." },
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
  "Out of scope: a women-only driver guarantee, insurance, police dispatch, a citywide safety map.",
  "India only. Hyderabad first.",
];
