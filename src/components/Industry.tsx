"use client";

import { useEffect, useRef, useState } from "react";
import { Reveal } from "./ui";
import { SourceSnippet } from "./case/primitives";
import { TiltCard } from "./case/Motion";
import { COVERAGE, PHASES, PORTABLE } from "@/content/case";

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
    big: "$3.8B",
    text: "where India's ride-hailing market is headed by FY2032, from about $950 million in FY2024, growing near 19% a year.",
    cls: "bg-mist",
    textCls: "text-ink-soft",
    hintCls: "text-[#9AA0A6]",
    pillCls: "bg-black text-white",
    sourceName: "Markets and Data · India ride-hailing, Jan 2025",
    sourceNote: "Markets and Data projects USD 950.66 million in FY2024 rising to USD 3,766.79 million in FY2032, a CAGR of 18.78%.",
    sourceUrl: "https://www.marketsandata.com/industry-reports/india-ride-hailing-market",
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

/* One market number with its source shown, the same way the proof cards do
   it: a screenshot of the page that opens the original on tap. No flip. */
function StatCard({ s, delay }: { s: (typeof MARKET)[number]; delay: number }) {
  const dark = s.cls.includes("text-white");
  return (
    <Reveal delay={delay} className="h-full">
      <div className={`flex h-full flex-col rounded-2xl p-6 ${s.cls}`}>
        <div className="whitespace-nowrap text-[clamp(30px,3.4vw,40px)] font-extrabold tracking-[-1.5px]">{s.big}</div>
        <div className={`mt-1.5 text-[13.5px] leading-[1.5] ${s.textCls}`}>{s.text}</div>
        <div className="mt-auto pt-4">
          <div className={`mb-1.5 text-[10.5px] font-bold tracking-[1.4px] ${s.hintCls}`}>SOURCE</div>
          <SourceSnippet url={s.sourceUrl} compact dark={dark} />
          <div className={`mt-2 text-[11.5px] leading-[1.45] ${s.hintCls}`}>{s.sourceNote}</div>
        </div>
      </div>
    </Reveal>
  );
}

/* TAM / SAM / SOM as three rings. Hover or tap a ring, or its card below,
   and it grows with its number, its tag and its source beside it. The rings
   pop in the first time they scroll into view. */
const RINGS: { tag: string; title: string; big: string; sub: string; text: string; kind: "SOURCED" | "ASSUMPTION"; srcUrl?: string }[] = [
  {
    tag: "TAM",
    title: "India ride-hailing",
    big: "$3.8B",
    sub: "by FY2032, from about $950 million in FY2024",
    text: "The whole market. Growing near 19% a year, with around 1.6 million app cab trips every day across the big three.",
    kind: "SOURCED",
    srcUrl: MARKET[0].sourceUrl,
  },
  {
    tag: "SAM",
    title: "Late nights in the big metros",
    big: "~2 lakh",
    sub: "rides a night, 8 PM to 5 AM",
    text: "My estimate: 10 to 15% of daily cab trips run at night. No platform publishes the night share, so this number is an assumption and says so.",
    kind: "ASSUMPTION",
  },
  {
    tag: "SOM",
    title: "Hyderabad after dark",
    big: "36,000",
    sub: "rides watched by T-Safe in its first year",
    text: "The first bite: one city of 11.3 million people, a top 3 Uber city. Demand for watched night travel is already proven here.",
    kind: "SOURCED",
    srcUrl: "https://telanganatoday.com/explainer-what-is-t-safe-and-how-to-use-it",
  },
];

const RING_R = [200, 140, 80];
const RING_FILL = ["#E3EDFE", "#BED4FB", "#276EF1"];
const RING_STROKE = ["#A9C7FA", "#7FA6F5", "#1D4FB8"];

function MarketRings() {
  const [active, setActive] = useState(2);
  const [shown, setShown] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (es) => {
        if (es.some((e) => e.isIntersecting)) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const r = RINGS[active];
  return (
    <div ref={ref} className="grid items-center gap-6 lg:grid-cols-2">
      {/* the rings */}
      <div className="mx-auto w-full max-w-[460px]">
        <svg viewBox="0 0 440 440" className="block h-auto w-full" role="group" aria-label="Three rings: the whole market, the late-night slice, the Hyderabad pilot">
          <style>{`@keyframes ringIn { from { transform: scale(.55); opacity: 0; } to { transform: scale(1); opacity: 1; } }`}</style>
          {RINGS.map((ring, i) => {
            const on = active === i;
            return (
              <g
                key={ring.tag}
                role="button"
                tabIndex={0}
                aria-label={`${ring.tag}: ${ring.title}, ${ring.big}`}
                aria-pressed={on}
                onMouseEnter={() => setActive(i)}
                onClick={() => setActive(i)}
                onFocus={() => setActive(i)}
                style={{
                  transformOrigin: "220px 220px",
                  transformBox: "view-box",
                  transform: on ? "scale(1.06)" : "scale(1)",
                  transition: "transform .35s cubic-bezier(.16,1,.3,1)",
                  animation: shown ? `ringIn .7s ${i * 0.12}s cubic-bezier(.16,1,.3,1) both` : "none",
                  opacity: shown ? undefined : 0,
                  cursor: "pointer",
                  outline: "none",
                }}
              >
                <circle cx="220" cy="220" r={RING_R[i]} fill={RING_FILL[i]} stroke={on ? "#000" : RING_STROKE[i]} strokeWidth={on ? 3 : 1.5} />
                {i < 2 && (
                  <text x="220" y={220 - RING_R[i] + 32} textAnchor="middle" fontSize="12.5" fontWeight="800" letterSpacing="1.5" fill={i === 0 ? "#1D4FB8" : "#153E93"} fontFamily="Helvetica,Arial">
                    {ring.tag} · {ring.big}
                  </text>
                )}
              </g>
            );
          })}
          <text x="220" y="212" textAnchor="middle" fontSize="12" fontWeight="800" letterSpacing="1.5" fill="#fff" fontFamily="Helvetica,Arial" pointerEvents="none">
            SOM
          </text>
          <text x="220" y="240" textAnchor="middle" fontSize="24" fontWeight="800" fill="#fff" fontFamily="Helvetica,Arial" pointerEvents="none">
            {RINGS[2].big}
          </text>
        </svg>
      </div>

      {/* the detail for the active ring */}
      <div className="glow rounded-2xl border border-line bg-white p-5 sm:p-6" aria-live="polite">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-black px-2.5 py-1 text-[10.5px] font-extrabold tracking-[1.2px] text-white">{r.tag}</span>
          <span className={`rounded-full px-2 py-0.5 text-[9.5px] font-extrabold tracking-[1px] ${r.kind === "SOURCED" ? "bg-[#E3EDFE] text-brand" : "bg-[#FFF1D6] text-[#8A5A00]"}`}>{r.kind}</span>
          <span className="ml-auto text-[12px] font-bold text-ink-faint">{active + 1} of 3</span>
        </div>
        <div className="mt-3 text-[clamp(30px,3.4vw,40px)] font-extrabold tracking-[-1.5px]">{r.big}</div>
        <div className="text-[13px] font-semibold text-ink-faint">{r.sub}</div>
        <div className="mt-3 text-[16px] font-extrabold tracking-[-0.3px]">{r.title}</div>
        <p className="m-0 mt-1.5 text-[13.5px] leading-[1.6] text-ink-soft">{r.text}</p>
        <div className="mt-4">
          {r.srcUrl ? (
            <SourceSnippet url={r.srcUrl} compact />
          ) : (
            <div className="rounded-xl border border-dashed border-[#E2C79A] bg-[#FFF7EC] p-3 text-[12.5px] leading-[1.5] text-[#7A4B00]">
              No public source publishes the night share. This is my assumption. The pilot&apos;s first stage replaces it with Uber&apos;s own number.
            </div>
          )}
        </div>
      </div>

      {/* the three rings as cards, so the numbers read without hovering */}
      <div className="grid gap-2.5 sm:grid-cols-3 lg:col-span-2">
        {RINGS.map((ring, i) => {
          const on = active === i;
          return (
            <button
              key={ring.tag}
              type="button"
              onClick={() => setActive(i)}
              onMouseEnter={() => setActive(i)}
              aria-pressed={on}
              className={`glow flex items-center gap-3 rounded-2xl border p-4 text-left transition-colors ${on ? "border-black bg-black text-white" : "border-line bg-white hover:border-brand"}`}
            >
              <span className="h-3.5 w-3.5 flex-none rounded-full" style={{ background: RING_FILL[i], boxShadow: `0 0 0 2px ${RING_STROKE[i]}` }} aria-hidden="true" />
              <span className="min-w-0">
                <span className={`block text-[10.5px] font-bold tracking-[1.4px] ${on ? "text-[#8FB0FF]" : "text-ink-faint"}`}>{ring.tag}</span>
                <span className="block truncate text-[14px] font-extrabold tracking-[-0.2px]">
                  {ring.big} · {ring.title}
                </span>
              </span>
            </button>
          );
        })}
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
    note: "The baseline this case is measured against. The deepest in-ride toolkit of the three.",
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
      <TiltCard className="h-full">
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
        <div className="mt-auto pt-4">
          <SourceSnippet url={p.srcUrl} compact />
        </div>
      </div>
      </TiltCard>
    </Reveal>
  );
}

/* The aha: where each app's safety work starts today, and where SafeRide
   starts. The empty first column is the whole case in one picture. */
const DOT = { 0: "bg-[#E2E2E2]", 1: "bg-caution", 2: "bg-safe" } as const;
function CoverageStrip() {
  return (
    <Reveal className="mt-6 overflow-hidden rounded-2xl border border-line bg-white">
      <style>{`@keyframes ahaPulse { 0%,100% { box-shadow: 0 0 0 0 rgba(39,110,241,.45); } 50% { box-shadow: 0 0 0 10px rgba(39,110,241,0); } }`}</style>
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 px-5 pt-5">
        <div className="text-[11px] font-bold tracking-[1.8px] text-ink-faint">WHEN THE SAFETY WORK STARTS</div>
        <div className="text-[12px] text-ink-faint">green: full · amber: partial · grey: nothing yet</div>
      </div>
      <div className="px-5 pb-5 pt-3">
        {/* header row: phases. On phones the phase names sit above each dot column as short labels */}
        <div className="grid grid-cols-[1.4fr_repeat(4,1fr)] items-end gap-2 pb-2">
          <div />
          {PHASES.map((ph) => (
            <div key={ph.key} className={`rounded-lg px-1 py-1 text-center text-[10px] font-bold leading-tight tracking-[0.4px] sm:text-[11px] ${ph.key === "before" ? "bg-[rgba(39,110,241,.08)] text-brand" : "text-ink-faint"}`}>
              {ph.label.toUpperCase()}
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-1.5">
          {COVERAGE.map((row) => (
            <div key={row.app} className={`grid grid-cols-[1.4fr_repeat(4,1fr)] items-center gap-2 rounded-xl px-2 py-2 ${row.ours ? "bg-black text-white" : "bg-mist"}`}>
              <div className="min-w-0">
                <div className="truncate text-[13px] font-extrabold tracking-[-0.2px]">{row.app}</div>
                <div className={`hidden text-[11px] leading-[1.35] sm:block ${row.ours ? "text-[#C9C9C9]" : "text-ink-faint"}`}>{row.note}</div>
              </div>
              {PHASES.map((ph) => {
                const c = row.cover[ph.key];
                return (
                  <div key={ph.key} className="flex justify-center">
                    <span
                      className={`h-3.5 w-3.5 rounded-full ${DOT[c]} ${row.ours && ph.key === "before" ? "ring-2 ring-brand" : ""}`}
                      style={row.ours && c === 2 ? { animation: "ahaPulse 2.2s ease-out infinite" } : undefined}
                      aria-label={`${row.app}: ${ph.label}: ${["nothing yet", "partial", "full"][c]}`}
                    />
                  </div>
                );
              })}
            </div>
          ))}
        </div>
        <p className="m-0 mt-4 max-w-[760px] text-[13.5px] leading-[1.6] text-ink-soft">
          <span className="font-extrabold text-ink">{PORTABLE.title}</span> {PORTABLE.text}
        </p>
      </div>
    </Reveal>
  );
}

/* The white space, with the structural reason it persists. The timing
   argument (fines, T-Safe, the US-only driver preference) lives in the
   Why now block of chapter 1. */
const FIT: string[] = [
  "Almost every tool above starts working after the car does. The minutes before booking stay empty, and that is exactly where SafeRide Priority lives.",
  "The gap persists for a structural reason: each app added safety tools one switch at a time, and no team owns the moment before the booking. Sequencing those switches into one flow is a product job, and none of the three has done it.",
  "Hyderabad police built T-Safe and have said they want cab apps to plug into it. SafeRide's tracking link and circle SMS are shaped to be that bridge.",
];

export default function Industry() {
  return (
    <div id="industry" className="mt-14 sm:mt-24">
      <div className="mb-2.5 text-xs font-bold tracking-[1.6px] text-ink-faint">INDUSTRY 101</div>
      <h2 className="m-0 mb-3 max-w-[760px] text-[clamp(28px,3.6vw,44px)] font-extrabold leading-[1.08] tracking-[-1.3px]">
        The market I am
        <br />
        building into.
      </h2>
      <p className="mb-8 max-w-[640px] text-base leading-[1.65] text-ink-soft [text-wrap:pretty]">
        Ride-hailing in India is huge, growing fast, and fought over by three big apps. Here is
        the market in numbers, the slice I am aiming at, and what every player already ships
        for safety. Every number carries its source on the card.
      </p>

      {/* Market snapshot */}
      <div className="grid gap-3.5 [grid-template-columns:repeat(auto-fit,minmax(min(100%,220px),1fr))]">
        {MARKET.map((s, i) => (
          <div key={s.big} className="sticky sm:static" style={{ top: 64 + i * 8, zIndex: i + 1 }}>
            <div className="beam h-full">
              <StatCard s={s} delay={i * 0.08} />
            </div>
          </div>
        ))}
      </div>

      {/* TAM / SAM / SOM */}
      <div className="mt-10 sm:mt-14">
        <Reveal className="mx-auto max-w-[720px] text-center">
          <h3 className="m-0 text-[clamp(22px,2.6vw,32px)] font-extrabold leading-[1.12] tracking-[-0.8px]">
            The slice I am aiming at.
          </h3>
          <p className="mt-3 text-[15px] leading-[1.65] text-ink-soft [text-wrap:pretty]">
            The whole market is the outer ring. The late-night window in the big metros is the middle one, where the fear
            actually lives. The first bite is the centre: Hyderabad, 8 PM to 5 AM. Hover or tap a ring to see its number,
            its tag and its source.
          </p>
        </Reveal>
        <div className="mt-8">
          <MarketRings />
        </div>
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

      <CoverageStrip />

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
