"use client";

import { useState } from "react";
import { Reveal } from "./ui";

/* ─────────────────────────── Industry 101 ───────────────────────────
   Sourced market numbers for Indian ride-hailing, a TAM / SAM / SOM
   funnel, what each app ships for safety today, and where SafeRide
   Priority fits as an add-on layer. India only, per the product rules. */

const MARKET: {
  big: string;
  text: string;
  cls: string;
  textCls: string;
  hintCls: string;
  pillCls: string;
  sourceName: string;
  sourceNote: string;
  sourceUrl: string;
}[] = [
  {
    big: "$2.5B",
    text: "the India ride-hailing market in 2025, growing about 21% a year through 2033.",
    cls: "bg-mist",
    textCls: "text-ink-soft",
    hintCls: "text-[#9AA0A6]",
    pillCls: "bg-black text-white",
    sourceName: "Grand View Research · India ride-hailing outlook",
    sourceNote:
      "India's ride-hailing services market is estimated at USD 2.51 billion for 2025, with a projected 20.7% CAGR from 2026 to 2033.",
    sourceUrl: "https://www.grandviewresearch.com/horizon/outlook/ride-hailing-services-market/india",
  },
  {
    big: "1.6M",
    text: "app cab trips every day across Uber, Ola and Rapido. Uber leads cabs with about half of them.",
    cls: "bg-mist",
    textCls: "text-ink-soft",
    hintCls: "text-[#9AA0A6]",
    pillCls: "bg-black text-white",
    sourceName: "Equentis Research · Aug 2025 cab volumes",
    sourceNote:
      "Daily four-wheeler trips in Aug 2025: Uber about 840,000, Ola about 460,000, Rapido about 320,000. Uber holds roughly 50% of the cab segment.",
    sourceUrl:
      "https://www.equentis.com/blog/14-cabs-31-autorickshaws-56-bike-taxis-is-rapido-set-to-outpace-ola-uber/",
  },
  {
    big: "No. 1",
    text: "Rapido became India's largest ride-hailing app in 2025, on the back of bikes and autos.",
    cls: "bg-mist",
    textCls: "text-ink-soft",
    hintCls: "text-[#9AA0A6]",
    pillCls: "bg-black text-white",
    sourceName: "Ascendants · Rapido overtakes Uber and Ola",
    sourceNote:
      "Rapido passed Uber in July 2025 to lead overall ride volumes, with about 50 million monthly active users then and roughly 74 million by early 2026. Uber's CEO now names Rapido as its biggest Indian rival.",
    sourceUrl: "https://ascendants.in/business-stories/rapido-overtakes-uber-ola-india-ride-hailing-market/",
  },
  {
    big: "75%",
    text: "of Indian women who commute by ride-hailing say safety is a primary reason they choose it.",
    cls: "bg-black text-white",
    textCls: "text-[#A6A6A6]",
    hintCls: "text-[#8f8f8f]",
    pillCls: "bg-white text-black",
    sourceName: "Oxford Economics with Uber · 2023, five metros",
    sourceNote:
      "A December 2023 study across five Indian metros found 75% of women who used ride-hailing to commute cited safety as a primary reason. Safety is the product for this rider.",
    sourceUrl:
      "https://www.uber.com/en-IN/newsroom/empowering-women-transforming-economies-the-impact-of-ride-hailing-in-india",
  },
];

function FlipStat({ s, delay }: { s: (typeof MARKET)[number]; delay: number }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <Reveal delay={delay} className="h-full [perspective:1200px]">
      <div
        role="button"
        tabIndex={0}
        aria-pressed={flipped}
        aria-label={flipped ? "Flip back to the number" : `Flip to see the source for ${s.big}`}
        onClick={() => setFlipped(!flipped)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setFlipped(!flipped);
          }
        }}
        className="grid h-full cursor-pointer transition-transform duration-500 [transform-style:preserve-3d]"
        style={{ transform: flipped ? "rotateY(180deg)" : "none" }}
      >
        <div className={`flex flex-col rounded-2xl p-6 [backface-visibility:hidden] [grid-area:1/1] ${s.cls}`}>
          <div className="whitespace-nowrap text-[clamp(30px,3.4vw,40px)] font-extrabold tracking-[-1.5px]">
            {s.big}
          </div>
          <div className={`mt-1.5 text-[13.5px] leading-[1.5] ${s.textCls}`}>{s.text}</div>
          <div className={`mt-auto flex items-center gap-1 pt-3 text-[11px] font-semibold ${s.hintCls}`}>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M4 12a8 8 0 0114.9-4M20 12a8 8 0 01-14.9 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <path d="M18 4v4h-4M6 20v-4h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Flip for source
          </div>
        </div>
        <div className={`flex flex-col rounded-2xl p-6 [backface-visibility:hidden] [grid-area:1/1] [transform:rotateY(180deg)] ${s.cls}`}>
          <div className={`text-[10.5px] font-bold tracking-[1.4px] ${s.hintCls}`}>SOURCE</div>
          <div className="mt-1.5 text-[13.5px] font-bold leading-snug">{s.sourceName}</div>
          <div className={`mt-1.5 text-[12.5px] leading-[1.5] ${s.textCls}`}>{s.sourceNote}</div>
          <div className="mt-auto flex items-center justify-between gap-2 pt-3">
            <a
              href={s.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-[11.5px] font-bold transition-transform hover:scale-[1.04] ${s.pillCls}`}
            >
              Open source
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M7 17L17 7M9 7h8v8" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <span className={`text-[11px] font-semibold ${s.hintCls}`}>Flip back</span>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

/* TAM / SAM / SOM as nested layers. Pure HTML, responsive by default. */
const FUNNEL: { tag: string; title: string; text: string }[] = [
  {
    tag: "TAM",
    title: "India ride-hailing",
    text: "USD 2.5 billion in 2025, growing about 21% a year. Around 1.6 million app cab trips run every day across the big three.",
  },
  {
    tag: "SAM",
    title: "Late night rides in the big metros",
    text: "Our estimate: 10 to 15% of daily cab trips run between 8 PM and 5 AM, near 2 lakh rides a night. No platform publishes the exact night share, so we label this clearly as an assumption.",
  },
  {
    tag: "SOM",
    title: "Hyderabad after dark, the pilot",
    text: "A top 3 Uber city of 11.3 million people. Hyderabad police's T-Safe monitored 36,000 rides in its first year, so paid-nothing demand for watched night travel is already proven here.",
  },
];

function FunnelHead({ i, tagCls, textCls }: { i: number; tagCls: string; textCls: string }) {
  const f = FUNNEL[i];
  return (
    <>
      <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
        <span className={`rounded-full px-2.5 py-1 text-[10.5px] font-extrabold tracking-[1.2px] ${tagCls}`}>
          {f.tag}
        </span>
        <span className="text-[15.5px] font-extrabold tracking-[-0.3px]">{f.title}</span>
      </div>
      <p className={`m-0 mt-1.5 max-w-[720px] text-[13px] leading-[1.55] ${textCls}`}>{f.text}</p>
    </>
  );
}

function Funnel() {
  return (
    <div className="rounded-2xl border border-[#CFE0FD] bg-[#F3F7FF] p-4 sm:p-5">
      <FunnelHead i={0} tagCls="bg-[#D9E6FD] text-[#1D4FB8]" textCls="text-ink-soft" />
      <div className="mt-4 rounded-xl border border-[#A9C7FA] bg-[#E3EDFE] p-4 sm:p-5">
        <FunnelHead i={1} tagCls="bg-[#BED4FB] text-[#153E93]" textCls="text-[#3D4E6B]" />
        <div className="mt-4 rounded-xl border border-brand bg-brand p-4 text-white sm:p-5">
          <FunnelHead i={2} tagCls="bg-white/20 text-white" textCls="text-[#D6E4FE]" />
        </div>
      </div>
    </div>
  );
}

/* What each player ships for safety today. */
const PLAYERS: {
  name: string;
  note: string;
  srcUrl: string;
  items: { t: string; when: string }[];
}[] = [
  {
    name: "Uber India",
    note: "The deepest in-ride toolkit of the three.",
    srcUrl: "https://www.uber.com/en-IN/newsroom/uber-introduces-new-features-to-elevate-safety",
    items: [
      { t: "Trip PIN before boarding", when: "at pickup" },
      { t: "Share My Trip with up to 5 contacts", when: "during the ride" },
      { t: "RideCheck flags odd stops and detours", when: "during the ride" },
      { t: "In-app audio recording", when: "during the ride" },
      { t: "SOS and a 24x7 safety line", when: "during the ride" },
      { t: "Women Rider Preference, for women drivers", when: "driver side" },
    ],
  },
  {
    name: "Ola",
    note: "AI watch plus police tie-ups.",
    srcUrl:
      "https://www.olacabs.com/media/in/press/ola-to-roll-out-guardian-feature-in-more-markets-across-india-and-australia-bolsters-platform-safety",
    items: [
      { t: "Start Code before the trip begins", when: "at pickup" },
      { t: "Guardian AI watches route and stops", when: "during the ride" },
      { t: "Emergency button wired to police", when: "during the ride" },
      { t: "Ride pooling switched off 11 PM to 6 AM", when: "booking rule" },
    ],
  },
  {
    name: "Rapido",
    note: "India's volume leader, lighter on safety depth.",
    srcUrl: "https://www.sightsinplus.com/news/industry-news/rapido-launches-women-only-pink-bikes-creating-25000-jobs",
    items: [
      { t: "SOS and emergency contacts", when: "during the ride" },
      { t: "Live tracking and location share", when: "during the ride" },
      { t: "Bike Pink, women captains for women riders", when: "Chennai and Karnataka" },
    ],
  },
  {
    name: "Hyderabad city layer",
    note: "The police already run a night watch.",
    srcUrl: "https://telanganatoday.com/explainer-what-is-t-safe-and-how-to-use-it",
    items: [
      { t: "T-Safe, dial 100 ride monitoring with auto check-ins", when: "during the ride" },
      { t: "331 SHE Teams across Telangana", when: "on the street" },
      { t: "SHE Shuttle in the IT corridor", when: "last mile" },
    ],
  },
];

function PlayerCard({ p, delay }: { p: (typeof PLAYERS)[number]; delay: number }) {
  return (
    <Reveal delay={delay} className="h-full">
      <div className="flex h-full flex-col rounded-2xl border border-line bg-white p-6 shadow-[0_2px_10px_rgba(0,0,0,0.04)]">
        <div className="text-[16px] font-extrabold tracking-[-0.3px]">{p.name}</div>
        <div className="mt-0.5 text-[12.5px] text-ink-faint">{p.note}</div>
        <ul className="m-0 mt-4 flex list-none flex-col gap-2.5 p-0">
          {p.items.map((it) => (
            <li key={it.t} className="flex flex-wrap items-start justify-between gap-x-3 gap-y-1">
              <span className="min-w-[150px] flex-1 text-[13px] leading-[1.45] text-ink-soft">{it.t}</span>
              <span className="mt-0.5 shrink-0 rounded-full bg-mist px-2 py-0.5 text-[10px] font-bold tracking-[0.4px] text-ink-faint">
                {it.when}
              </span>
            </li>
          ))}
        </ul>
        <a
          href={p.srcUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto inline-flex items-center gap-1 pt-4 text-[11.5px] font-bold text-ink-faint transition-colors hover:text-brand"
        >
          Source
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M7 17L17 7M9 7h8v8" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>
    </Reveal>
  );
}

const FIT: string[] = [
  "Almost every tool above starts working after the car does. The minutes before booking stay empty, and that is exactly where SafeRide Priority lives.",
  "Riders in the US can now ask to match with a woman driver. Riders in India cannot yet. The Female rider toggle and priority match close that gap at booking time.",
  "Hyderabad police built T-Safe and have said they want cab apps to plug into it. SafeRide's tracking link and circle SMS are shaped to be that bridge.",
  "Telangana records 117.6 crimes against women per lakh, close to double the national rate. The pilot city is the one that needs this first.",
];

export default function Industry() {
  return (
    <div id="industry" className="mt-14 sm:mt-24">
      <div className="mb-2.5 text-xs font-bold tracking-[1.6px] text-ink-faint">INDUSTRY 101</div>
      <h2 className="m-0 mb-3 max-w-[760px] text-[clamp(28px,3.6vw,44px)] font-extrabold leading-[1.08] tracking-[-1.3px]">
        The market we are
        <br />
        building into.
      </h2>
      <p className="mb-8 max-w-[640px] text-base leading-[1.65] text-ink-soft [text-wrap:pretty]">
        Ride-hailing in India is huge, growing fast, and fought over by three big apps. Here is
        the market in numbers, the slice we are aiming at, and what every player already ships
        for safety. Flip the number cards for their sources.
      </p>

      {/* Market snapshot */}
      <div className="grid gap-3.5 [grid-template-columns:repeat(auto-fit,minmax(min(100%,220px),1fr))]">
        {MARKET.map((s, i) => (
          <div key={s.big} className="sticky sm:static" style={{ top: 64 + i * 8, zIndex: i + 1 }}>
            <div className="beam h-full">
              <FlipStat s={s} delay={i * 0.08} />
            </div>
          </div>
        ))}
      </div>

      {/* TAM / SAM / SOM */}
      <div className="mt-10 grid items-start gap-6 sm:mt-14 [grid-template-columns:repeat(auto-fit,minmax(min(100%,320px),1fr))]">
        <Reveal variant="left">
          <h3 className="m-0 text-[clamp(22px,2.6vw,32px)] font-extrabold leading-[1.12] tracking-[-0.8px]">
            The slice we are aiming at.
          </h3>
          <p className="mt-3 text-[15px] leading-[1.65] text-ink-soft [text-wrap:pretty]">
            The whole market is the outer ring. Our serviceable slice is the late night window
            in the big metros, where the fear actually lives. The first bite is one city:
            Hyderabad, between 8 PM and 5 AM.
          </p>
          <p className="mt-3 text-[13px] leading-[1.6] text-ink-faint">
            One number here is an assumption and is labelled as one: the night share of daily
            rides. Everything else links to a public source.
          </p>
        </Reveal>
        <Reveal variant="right">
          <Funnel />
        </Reveal>
      </div>

      {/* Competitor safety features */}
      <div className="mt-10 sm:mt-14">
        <h3 className="m-0 mb-2 text-[clamp(22px,2.6vw,32px)] font-extrabold leading-[1.12] tracking-[-0.8px]">
          What each app ships for safety today.
        </h3>
        <p className="mb-6 max-w-[640px] text-[14.5px] leading-[1.6] text-ink-soft">
          Read the small tags. Nearly everything switches on during the ride. That is the
          pattern SafeRide Priority is built to complete.
        </p>
        <div className="grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(min(100%,265px),1fr))]">
          {PLAYERS.map((p, i) => (
            <div key={p.name} className="sticky sm:static" style={{ top: 64 + i * 8, zIndex: i + 1 }}>
              <PlayerCard p={p} delay={i * 0.06} />
            </div>
          ))}
        </div>
      </div>

      {/* Where SafeRide fits */}
      <Reveal className="mt-6">
        <div className="beam">
          <div className="rounded-2xl bg-black p-7 text-white sm:p-9">
            <div className="text-[11px] font-bold tracking-[1.8px] text-[#8f8f8f]">
              WHERE SAFERIDE PRIORITY FITS
            </div>
            <div className="mt-2 text-[clamp(20px,2.4vw,28px)] font-extrabold leading-[1.15] tracking-[-0.6px]">
              An add-on layer every app here could adopt.
            </div>
            <ul className="m-0 mt-5 grid list-none gap-4 p-0 sm:grid-cols-2">
              {FIT.map((f, i) => (
                <li key={i} className="flex gap-3 text-[13.5px] leading-[1.6] text-[#C9C9C9]">
                  <span className="mt-0.5 flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full bg-white/15 text-[11px] font-extrabold text-white">
                    {i + 1}
                  </span>
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
