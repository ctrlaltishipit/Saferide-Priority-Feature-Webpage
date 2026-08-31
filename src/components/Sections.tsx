"use client";

import { useState } from "react";
import { Reveal } from "./ui";

/* ───────────────────────────── Ticker ───────────────────────────── */
const TICKER = [
  ["CONTEXTUAL SAFETY BRIEF", "#F6BC2F"],
  ["SAFETY PRIORITY MATCH", "#276EF1"],
  ["SAFETY CIRCLE", "#06C167"],
  ["SAFER ANCHORS", "#F6BC2F"],
  ["ARRIVAL CHECK-IN", "#276EF1"],
  ["CONSENT BY DEFAULT", "#06C167"],
  ["PLAIN LANGUAGE GUIDANCE", "#F6BC2F"],
] as const;

export function Ticker() {
  const row = (hidden: boolean) => (
    <div
      aria-hidden={hidden || undefined}
      className="flex items-center gap-8 whitespace-nowrap pr-8 text-[13px] font-bold tracking-[1.6px]"
    >
      {TICKER.map(([label, color]) => (
        <span key={label} className="contents">
          <span>{label}</span>
          <span style={{ color }}>●</span>
        </span>
      ))}
    </div>
  );
  return (
    <div className="mt-6 overflow-hidden bg-black py-[15px] text-white">
      <div className="flex w-max" style={{ animation: "marquee 26s linear infinite" }}>
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}

/* ───────────────────────────── Stats ───────────────────────────── */
/* The research cards flip to show their source, with one small link
   that opens in a new tab. The product cards stay plain. */
const STATS: {
  big: string;
  text: string;
  cls: string;
  textCls: string;
  hintCls?: string;
  pillCls?: string;
  smaller?: boolean;
  sourceName?: string;
  sourceNote?: string;
  sourceUrl?: string;
}[] = [
  {
    big: "4 in 10",
    text: "women said they feel unsafe in their cities, and that feeling grows after dark, as reported in the NARI 2025 study.",
    cls: "bg-mist",
    textCls: "text-ink-soft",
    hintCls: "text-[#9AA0A6]",
    pillCls: "bg-black text-white",
    sourceName: "NARI 2025 · National Commission for Women",
    sourceNote: "The National Annual Report and Index on Women's Safety found 40% of urban women feel unsafe, and that the feeling grows after dark.",
    sourceUrl: "https://feminisminindia.com/2025/09/05/what-does-it-mean-to-feel-safe-nari-report-2025-on-womens-safety-in-indian-cities/",
  },
  {
    big: "31 cities",
    text: "12,770 women surveyed across India in the study grounding the problem.",
    cls: "bg-mist",
    textCls: "text-ink-soft",
    hintCls: "text-[#9AA0A6]",
    pillCls: "bg-black text-white",
    sourceName: "NARI 2025 · survey methodology",
    sourceNote: "The NARI 2025 study surveyed 12,770 women across 31 Indian cities to build its safety index.",
    sourceUrl: "https://www.insightsonindia.com/2025/08/29/nari-2025-report/",
  },
  {
    big: "8 PM–5 AM",
    text: "the window where SafeRide reviews your ride plan. An 8 PM booking can end well past 10, so late hours count too.",
    cls: "bg-black text-white",
    textCls: "text-[#A6A6A6]",
    smaller: true,
  },
  {
    big: "< 2 min",
    text: "to complete the full 7 step safety flow. Built for a stressful moment.",
    cls: "bg-brand text-white",
    textCls: "text-[#D6E4FE]",
  },
];

function StatCard({ s, delay }: { s: (typeof STATS)[number]; delay: number }) {
  const [flipped, setFlipped] = useState(false);
  if (!s.sourceUrl) {
    return (
      <Reveal delay={delay} className={`rounded-2xl p-6 ${s.cls}`}>
        <div
          className={`font-extrabold tracking-[-1.5px] ${
            s.smaller ? "whitespace-nowrap text-[clamp(30px,3.4vw,40px)]" : "text-[clamp(34px,4vw,46px)]"
          }`}
        >
          {s.big}
        </div>
        <div className={`mt-1.5 text-[13.5px] leading-[1.5] ${s.textCls}`}>{s.text}</div>
      </Reveal>
    );
  }
  return (
    <Reveal delay={delay} className="[perspective:1200px]">
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
        {/* front */}
        <div className={`flex flex-col rounded-2xl p-6 [backface-visibility:hidden] [grid-area:1/1] ${s.cls}`}>
          <div
            className={`font-extrabold tracking-[-1.5px] ${
              s.smaller ? "whitespace-nowrap text-[clamp(30px,3.4vw,40px)]" : "text-[clamp(34px,4vw,46px)]"
            }`}
          >
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
        {/* back */}
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

export function Stats() {
  return (
    <div className="grid gap-3.5 [grid-template-columns:repeat(auto-fit,minmax(min(100%,220px),1fr))]">
      {STATS.map((s, i) => (
        <StatCard key={s.big} s={s} delay={i * 0.08} />
      ))}
    </div>
  );
}

/* ───────────────────────────── Problem ───────────────────────────── */
function JugglingIllustration() {
  return (
    <svg
      viewBox="0 0 440 340"
      className="block h-auto w-full"
      aria-label="Illustration: a rider juggling a manual safety checklist across apps after midnight"
    >
      <rect x="140" y="18" width="160" height="304" rx="26" fill="#000" />
      <rect x="150" y="30" width="140" height="280" rx="18" fill="#FFFFFF" />
      <rect x="163" y="48" width="80" height="10" rx="5" fill="#000" />
      <rect x="163" y="70" width="114" height="34" rx="8" fill="#F6F6F6" />
      <circle cx="180" cy="87" r="7" fill="#06C167" />
      <rect x="194" y="82" width="66" height="9" rx="4" fill="#C9CED4" />
      <rect x="163" y="112" width="114" height="34" rx="8" fill="#F6F6F6" />
      <circle cx="180" cy="129" r="7" fill="#06C167" />
      <rect x="194" y="124" width="52" height="9" rx="4" fill="#C9CED4" />
      <rect x="163" y="154" width="114" height="34" rx="8" fill="#F6F6F6" />
      <circle cx="180" cy="171" r="7" fill="#F6BC2F" style={{ animation: "blink 1.8s ease infinite" }} />
      <rect x="194" y="166" width="60" height="9" rx="4" fill="#C9CED4" />
      <rect x="163" y="196" width="114" height="34" rx="8" fill="#F6F6F6" />
      <circle cx="180" cy="213" r="7" fill="#E2E2E2" />
      <rect x="194" y="208" width="44" height="9" rx="4" fill="#E2E2E2" />
      <rect x="163" y="252" width="114" height="38" rx="10" fill="#000" />
      <rect x="196" y="266" width="48" height="10" rx="5" fill="#fff" />
      <g style={{ animation: "floaty 6s ease-in-out infinite" }}>
        <rect x="18" y="60" width="112" height="46" rx="12" fill="#fff" stroke="#E2E2E2" />
        <circle cx="42" cy="83" r="11" fill="#276EF1" />
        <rect x="60" y="72" width="56" height="8" rx="4" fill="#C9CED4" />
        <rect x="60" y="87" width="40" height="8" rx="4" fill="#E2E2E2" />
      </g>
      <g style={{ animation: "floaty 7s .7s ease-in-out infinite" }}>
        <rect x="308" y="96" width="116" height="46" rx="12" fill="#fff" stroke="#E2E2E2" />
        <circle cx="332" cy="119" r="11" fill="#06C167" />
        <rect x="350" y="108" width="58" height="8" rx="4" fill="#C9CED4" />
        <rect x="350" y="123" width="42" height="8" rx="4" fill="#E2E2E2" />
      </g>
      <g style={{ animation: "floaty 6.4s 1.2s ease-in-out infinite" }}>
        <rect x="300" y="212" width="122" height="52" rx="12" fill="#000" />
        <circle cx="324" cy="238" r="11" fill="#F6BC2F" />
        <rect x="342" y="226" width="62" height="8" rx="4" fill="#545454" />
        <rect x="342" y="241" width="48" height="8" rx="4" fill="#333" />
      </g>
      <circle cx="70" cy="220" r="34" fill="#000" />
      <text x="70" y="227" textAnchor="middle" fontSize="16" fontWeight="800" fill="#fff" fontFamily="Helvetica,Arial">12:15</text>
      <text x="70" y="272" textAnchor="middle" fontSize="11" fontWeight="600" fill="#6B6B6B" fontFamily="Helvetica,Arial">after midnight</text>
    </svg>
  );
}

export function Problem() {
  return (
    <div className="mt-24 grid items-center gap-12 [grid-template-columns:repeat(auto-fit,minmax(min(100%,320px),1fr))]">
      <Reveal variant="left">
        <h2 className="mb-4 text-[clamp(30px,4vw,52px)] font-extrabold leading-[1.06] tracking-[-1.5px]">
          The safety plan is manual, and it happens at the worst moment.
        </h2>
        <p className="mb-3 text-base leading-[1.65] text-ink-soft [text-wrap:pretty]">
          Women navigating cities at night often assemble a plan by hand: check
          driver details, share trip links, call someone, pick a visible gate
          instead of the exact destination, keep contacts updated.
        </p>
        <p className="mb-5 text-base leading-[1.65] text-ink-soft [text-wrap:pretty]">
          The platform already ships a strong safety toolkit: SOS, trip sharing,
          RideCheck, trip PINs, audio recording and a 24x7 safety line. The gap
          is not missing features. The booking flow still leaves riders juggling
          those tools alone at midnight.
        </p>
        <div className="rounded-r-xl border-l-4 border-brand bg-mist px-[18px] py-[15px] text-[14.5px] leading-[1.6]">
          Late-night riders need a transparent, low-friction way to choose and
          switch on precautions <strong>before</strong> a ride begins, while
          staying in control, with no false promises.
        </div>
      </Reveal>
      <div>
        <Reveal variant="right" className="rounded-3xl bg-mist p-[clamp(16px,3vw,34px)]">
          <JugglingIllustration />
        </Reveal>
        <div className="mt-2.5 text-xs text-[#A6A6A6]">
          Five apps, six decisions, one tired rider. That is tonight&apos;s manual
          safety plan.
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────── Decision engine diagram ──────────────────────── */
export function DecisionEngine() {
  return (
    <div className="mt-24">
      <div className="mb-2.5 text-xs font-bold tracking-[1.6px] text-ink-faint">HOW IT DECIDES</div>
      <h2 className="m-0 mb-2 max-w-[680px] text-[clamp(28px,3.6vw,44px)] font-extrabold leading-[1.08] tracking-[-1.3px]">
        Observable signals in.
        <br />
        Plain-language guidance out.
      </h2>
      <p className="mb-[26px] max-w-[640px] text-[15px] leading-[1.6] text-ink-soft">
        Simple, explainable rules decide what you see. No machine learning in the
        first version, no crime data, no personal profiling, no hidden safety
        scores. When the data is thin it says <strong>Limited Data</strong>{" "}
        instead of guessing.
      </p>
      <Reveal className="hscroll overflow-x-auto rounded-3xl bg-mist p-[clamp(10px,2vw,22px)]">
        <svg
          viewBox="0 0 1080 300"
          className="block h-auto w-full min-w-[720px]"
          aria-label="Diagram: five observable inputs flow through a deterministic rules engine into four guidance categories"
        >
          <g fontFamily="Helvetica,Arial">
            <rect x="16" y="22" width="220" height="44" rx="12" fill="#FFFFFF" stroke="#E2E2E2" />
            <circle cx="42" cy="44" r="10" fill="#000" />
            <path d="M42 38v6l4 3" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" />
            <text x="62" y="49" fontSize="15" fontWeight="700">Time &amp; duration</text>
            <rect x="16" y="76" width="220" height="44" rx="12" fill="#FFFFFF" stroke="#E2E2E2" />
            <rect x="32" y="90" width="20" height="16" rx="3" fill="none" stroke="#000" strokeWidth="2" />
            <path d="M32 98h20" stroke="#000" strokeWidth="2" />
            <text x="62" y="103" fontSize="15" fontWeight="700">Route context</text>
            <rect x="16" y="130" width="220" height="44" rx="12" fill="#FFFFFF" stroke="#E2E2E2" />
            <path d="M42 138c-5 0-8.5 3.6-8.5 8.2 0 5.8 8.5 12.3 8.5 12.3s8.5-6.5 8.5-12.3C50.5 141.6 47 138 42 138z" fill="#06C167" />
            <text x="62" y="157" fontSize="15" fontWeight="700">Nearby anchors</text>
            <rect x="16" y="184" width="220" height="44" rx="12" fill="#FFFFFF" stroke="#E2E2E2" />
            <path d="M42 192l8 3.2v4.4c0 4.8-3.4 8.8-8 10.4-4.6-1.6-8-5.6-8-10.4v-4.4z" fill="#276EF1" />
            <text x="62" y="211" fontSize="15" fontWeight="700">Eligible-driver supply</text>
            <rect x="16" y="238" width="220" height="44" rx="12" fill="#FFFFFF" stroke="#E2E2E2" />
            <rect x="30" y="258" width="7" height="10" rx="2" fill="#000" />
            <rect x="40" y="252" width="7" height="16" rx="2" fill="#6B6B6B" />
            <rect x="50" y="246" width="7" height="22" rx="2" fill="#C9CED4" />
            <text x="66" y="265" fontSize="15" fontWeight="700">Data confidence</text>
            {[
              "M240 44 C300 44 300 128 356 138",
              "M240 98 C295 98 300 138 356 146",
              "M240 152 H356",
              "M240 206 C295 206 300 166 356 158",
              "M240 260 C300 260 300 176 356 166",
            ].map((d, i) => (
              <path key={d} d={d} fill="none" stroke="#A6A6A6" strokeWidth="2.5" strokeDasharray="7 6" style={{ animation: `dashflow ${1.4 + (i % 3) * 0.1}s linear infinite` }} />
            ))}
            <rect x="360" y="92" width="300" height="120" rx="18" fill="#000000" />
            <text x="510" y="136" textAnchor="middle" fontSize="17" fontWeight="800" fill="#fff">DETERMINISTIC RULES</text>
            <text x="510" y="158" textAnchor="middle" fontSize="12.5" fill="#A6A6A6">explainable · auditable · no ML in MVP</text>
            <text x="510" y="186" textAnchor="middle" fontSize="12.5" fill="#F6BC2F" style={{ animation: "blink 2.2s ease infinite" }}>
              ✕ crime data · ✕ protected attributes · ✕ ratings alone
            </text>
            <path d="M664 118 C720 110 724 66 776 58" fill="none" stroke="#0E8345" strokeWidth="2.5" strokeDasharray="7 6" style={{ animation: "dashflow 1.4s linear infinite" }} />
            <path d="M664 140 C716 136 726 122 776 118" fill="none" stroke="#B26205" strokeWidth="2.5" strokeDasharray="7 6" style={{ animation: "dashflow 1.5s linear infinite" }} />
            <path d="M664 164 C716 168 726 182 776 178" fill="none" stroke="#DE1135" strokeWidth="2.5" strokeDasharray="7 6" style={{ animation: "dashflow 1.5s linear infinite" }} />
            <path d="M664 186 C720 194 724 238 776 238" fill="none" stroke="#6B6B6B" strokeWidth="2.5" strokeDasharray="7 6" style={{ animation: "dashflow 1.6s linear infinite" }} />
            <rect x="780" y="36" width="284" height="44" rx="22" fill="#EAF6EF" />
            <circle cx="806" cy="58" r="7" fill="#06C167" />
            <text x="822" y="63" fontSize="15" fontWeight="800" fill="#0E8345">Lower contextual risk</text>
            <rect x="780" y="96" width="284" height="44" rx="22" fill="#FFF1D6" />
            <circle cx="806" cy="118" r="7" fill="#F6BC2F" />
            <text x="822" y="123" fontSize="15" fontWeight="800" fill="#7A4E00">Elevated contextual risk</text>
            <rect x="780" y="156" width="284" height="44" rx="22" fill="#FDE8EC" />
            <circle cx="806" cy="178" r="7" fill="#DE1135" />
            <text x="822" y="183" fontSize="15" fontWeight="800" fill="#A50D28">Higher contextual risk</text>
            <rect x="780" y="216" width="284" height="44" rx="22" fill="#EEEEEE" />
            <circle cx="806" cy="238" r="7" fill="#A6A6A6" />
            <text x="822" y="243" fontSize="15" fontWeight="800" fill="#545454">Limited Data · abstain</text>
          </g>
        </svg>
      </Reveal>
    </div>
  );
}

/* ───────────────────────── Responsible AI strip ───────────────────────── */
const PRINCIPLES = [
  {
    title: "Honest about its limits",
    text: "SafeRide gives contextual guidance and says so clearly. It makes no safety promises.",
    icon: (
      <svg width="30" height="30" viewBox="0 0 30 30" fill="none" aria-hidden="true">
        <circle cx="15" cy="15" r="13" stroke="#000" strokeWidth="2" />
        <path d="M9 15.5l4 4 8-9" stroke="#276EF1" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "No crime prediction",
    text: "No crime data, no personal risk profiles, no sensitive attributes. Ever.",
    icon: (
      <svg width="30" height="30" viewBox="0 0 30 30" fill="none" aria-hidden="true">
        <circle cx="15" cy="14" r="8" stroke="#000" strokeWidth="2" />
        <path d="M4 26L26 4" stroke="#DE1135" strokeWidth="2.4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Abstains on thin data",
    text: "Limited Data replaces confident labels when there is not enough coverage.",
    icon: (
      <svg width="30" height="30" viewBox="0 0 30 30" fill="none" aria-hidden="true">
        <rect x="5" y="16" width="5" height="9" rx="1.5" fill="#000" />
        <rect x="12.5" y="11" width="5" height="14" rx="1.5" fill="#6B6B6B" />
        <rect x="20" y="6" width="5" height="19" rx="1.5" fill="#E2E2E2" />
      </svg>
    ),
  },
  {
    title: "Driver fairness",
    text: "Multiple audited signals, regular fairness checks, driver training and appeals.",
    icon: (
      <svg width="30" height="30" viewBox="0 0 30 30" fill="none" aria-hidden="true">
        <path d="M15 4v22M6 9h18" stroke="#000" strokeWidth="2" strokeLinecap="round" />
        <path d="M6 9l-3.5 7h7z M24 9l-3.5 7h7z" stroke="#276EF1" strokeWidth="2" fill="none" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Consent by default",
    text: "Automatic sharing only after you set it up, with per trip override and expiring links.",
    icon: (
      <svg width="30" height="30" viewBox="0 0 30 30" fill="none" aria-hidden="true">
        <rect x="4" y="9" width="22" height="12" rx="6" stroke="#000" strokeWidth="2" />
        <circle cx="20" cy="15" r="4" fill="#06C167" />
      </svg>
    ),
  },
  {
    title: "Safety without stigma",
    text: "Well lit, staffed places only. No unsafe area labels, no public risk maps.",
    icon: (
      <svg width="30" height="30" viewBox="0 0 30 30" fill="none" aria-hidden="true">
        <path d="M15 26s-9-7.2-9-13.6A9 9 0 0115 4a9 9 0 019 8.4C24 18.8 15 26 15 26z" stroke="#000" strokeWidth="2" strokeLinejoin="round" />
        <path d="M11 12.5h8" stroke="#DE1135" strokeWidth="2.4" strokeLinecap="round" />
      </svg>
    ),
  },
];

export function ResponsibleAI() {
  return (
    <div className="mt-20 grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(min(100%,240px),1fr))]">
      {PRINCIPLES.map((p, i) => (
        <Reveal
          key={p.title}
          delay={(i % 3) * 0.07}
          className="rounded-2xl border border-line p-[18px] transition-all duration-300 hover:-translate-y-1 hover:border-brand hover:shadow-[0_14px_34px_rgba(0,0,0,.08)]"
        >
          {p.icon}
          <div className="mb-1 mt-2.5 text-[14.5px] font-extrabold">{p.title}</div>
          <div className="text-[12.5px] leading-[1.55] text-ink-soft">{p.text}</div>
        </Reveal>
      ))}
    </div>
  );
}

/* ───────────────────────── Architecture ───────────────────────── */
export function Architecture() {
  return (
    <Reveal className="mt-20 rounded-3xl bg-mist p-[clamp(20px,3vw,36px)]">
      <div className="mb-[22px] flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="mb-2 text-xs font-bold tracking-[1.6px] text-ink-faint">BUILD ARCHITECTURE</div>
          <h2 className="m-0 text-[clamp(24px,3vw,36px)] font-extrabold tracking-[-1px]">
            A real, deployable prototype stack.
          </h2>
        </div>
        <div className="text-xs text-ink-faint">
          No Uber APIs · no real dispatch, GPS, payments or messaging
        </div>
      </div>
      <div className="hscroll overflow-x-auto">
        <svg
          viewBox="0 0 1080 150"
          className="block h-auto w-full min-w-[680px]"
          aria-label="Architecture: browser to Next.js on Vercel to Supabase to seeded mock data"
        >
          <g fontFamily="Helvetica,Arial">
            <rect x="10" y="34" width="220" height="82" rx="14" fill="#fff" stroke="#E2E2E2" />
            <text x="120" y="68" textAnchor="middle" fontSize="16" fontWeight="800">Visitor browser</text>
            <text x="120" y="90" textAnchor="middle" fontSize="11.5" fill="#6B6B6B">mobile-first · 375px up</text>
            <path d="M234 75 H290" stroke="#000" strokeWidth="2.5" strokeDasharray="7 6" style={{ animation: "dashflow 1.4s linear infinite" }} />
            <rect x="294" y="24" width="240" height="102" rx="14" fill="#000" />
            <text x="414" y="60" textAnchor="middle" fontSize="16" fontWeight="800" fill="#fff">Next.js · Vercel</text>
            <text x="414" y="82" textAnchor="middle" fontSize="11.5" fill="#A6A6A6">TypeScript · Tailwind · React 19</text>
            <text x="414" y="100" textAnchor="middle" fontSize="11.5" fill="#F6BC2F">deterministic rules engine</text>
            <path d="M538 75 H594" stroke="#000" strokeWidth="2.5" strokeDasharray="7 6" style={{ animation: "dashflow 1.4s linear infinite" }} />
            <rect x="598" y="24" width="240" height="102" rx="14" fill="#276EF1" />
            <text x="718" y="60" textAnchor="middle" fontSize="16" fontWeight="800" fill="#fff">Supabase</text>
            <text x="718" y="82" textAnchor="middle" fontSize="11.5" fill="#D6E4FE">Postgres · Auth · RLS policies</text>
            <text x="718" y="100" textAnchor="middle" fontSize="11.5" fill="#D6E4FE">privacy-safe analytics events</text>
            <path d="M842 75 H898" stroke="#000" strokeWidth="2.5" strokeDasharray="7 6" style={{ animation: "dashflow 1.4s linear infinite" }} />
            <rect x="902" y="34" width="170" height="82" rx="14" fill="#fff" stroke="#E2E2E2" />
            <text x="987" y="68" textAnchor="middle" fontSize="15" fontWeight="800">Seeded data</text>
            <text x="987" y="90" textAnchor="middle" fontSize="11.5" fill="#6B6B6B">locations · drivers · anchors</text>
          </g>
        </svg>
      </div>
    </Reveal>
  );
}
