"use client";

import { useState } from "react";
import { Reveal } from "./ui";
import { SourceSnippet } from "./case/primitives";

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
/* The research cards carry their source on the front: a screenshot that opens the original,
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
    big: "82%",
    text: "of app taxi users say drivers cancel on them, and 74% say it happens after the driver hears the destination.",
    cls: "bg-brand text-white",
    textCls: "text-[#D6E4FE]",
    hintCls: "text-[#B9CEFA]",
    pillCls: "bg-white text-black",
    sourceName: "LocalCircles survey · Business Standard, Aug 2026",
    sourceNote:
      "A LocalCircles survey of app taxi users found 82% experience driver cancellations and 74% say the cancel follows the driver hearing the destination. 76% back Maharashtra-style penalties.",
    sourceUrl:
      "https://www.business-standard.com/india-news/app-taxi-users-back-maharashtra-style-penalty-for-driver-cancellations-126080300462_1.html",
  },
  {
    big: "8 PM–5 AM",
    text: "the hours this case is about, and the window where SafeRide reviews the ride plan. Emergency, medical and urgent trips can use it at any hour.",
    cls: "bg-black text-white",
    textCls: "text-[#A6A6A6]",
    smaller: true,
  },
];

function StatCard({ s, delay }: { s: (typeof STATS)[number]; delay: number }) {
  const dark = s.cls.includes("text-white");
  return (
    <Reveal delay={delay} className={`flex h-full flex-col rounded-2xl p-6 ${s.cls}`}>
      <div
        className={`font-extrabold tracking-[-1.5px] ${
          s.smaller ? "whitespace-nowrap text-[clamp(30px,3.4vw,40px)]" : "text-[clamp(34px,4vw,46px)]"
        }`}
      >
        {s.big}
      </div>
      <div className={`mt-1.5 text-[13.5px] leading-[1.5] ${s.textCls}`}>{s.text}</div>
      {s.sourceUrl && (
        <div className="mt-auto pt-4">
          <div className={`mb-1.5 text-[10.5px] font-bold tracking-[1.4px] ${s.hintCls}`}>SOURCE</div>
          <SourceSnippet url={s.sourceUrl} compact dark={dark} />
          {s.sourceNote && <div className={`mt-2 text-[11.5px] leading-[1.45] ${s.hintCls}`}>{s.sourceNote}</div>}
        </div>
      )}
    </Reveal>
  );
}

export function Stats() {
  return (
    <div className="grid gap-3.5 [grid-template-columns:repeat(auto-fit,minmax(min(100%,220px),1fr))]">
      {STATS.map((s, i) => (
        /* mobile: the cards deck up and cover each other on scroll,
           and every card wears the travelling border beam */
        <div key={s.big} className="sticky sm:static" style={{ top: 64 + i * 8, zIndex: i + 1 }}>
          <div className="beam h-full">
            <StatCard s={s} delay={i * 0.08} />
          </div>
        </div>
      ))}
    </div>
  );
}

/* ───────────────────────────── Problem ───────────────────────────── */
function JugglingIllustration() {
  return (
    <svg
      viewBox="0 0 480 340"
      className="block h-auto w-full"
      aria-label="After midnight in Hyderabad: a tired rider has Uber, Ola, Rapido, inDrive, Mana Yatri and Maps open plus the family chat, runs a six-point safety checklist by hand, and the tired driver in the waiting cab is something no app tells her about"
    >
      {/* moon clock */}
      <circle cx="434" cy="50" r="28" fill="#0A0D13" />
      <text x="434" y="55" textAnchor="middle" fontSize="14" fontWeight="800" fill="#fff" fontFamily="Helvetica,Arial">12:15</text>
      <text x="434" y="92" textAnchor="middle" fontSize="9.5" fontWeight="600" fill="#6B6B6B" fontFamily="Helvetica,Arial">after midnight</text>

      {/* ── every ride app running in Hyderabad, all open at once ── */}
      <text x="16" y="20" fontSize="8.5" fontWeight="800" letterSpacing="1.4" fill="#9AA0A6" fontFamily="Helvetica,Arial">
        SIX APPS OPEN, STILL NO RIDE
      </text>
      {/* row 1 */}
      <g style={{ animation: "bobY 4.6s ease-in-out infinite" }}>
        <rect x="16" y="30" width="56" height="26" rx="13" fill="#0A0D13" />
        <text x="44" y="47" textAnchor="middle" fontSize="11.5" fontWeight="800" fill="#fff" fontFamily="Helvetica,Arial">Uber</text>
      </g>
      <g style={{ animation: "bobY 5s .4s ease-in-out infinite" }}>
        <rect x="80" y="30" width="54" height="26" rx="13" fill="#fff" stroke="#E2E2E2" />
        <circle cx="95" cy="43" r="6" fill="#B3D243" />
        <circle cx="95" cy="43" r="2.4" fill="#fff" />
        <text x="105" y="47" fontSize="11" fontWeight="800" fill="#111" fontFamily="Helvetica,Arial">Ola</text>
      </g>
      <g style={{ animation: "bobY 4.8s .8s ease-in-out infinite" }}>
        <rect x="142" y="30" width="78" height="26" rx="13" fill="#fff" stroke="#E2E2E2" />
        <circle cx="157" cy="43" r="6.5" fill="#F6BC2F" />
        <text x="157" y="46.5" textAnchor="middle" fontSize="8.5" fontWeight="800" fill="#111" fontFamily="Helvetica,Arial">R</text>
        <text x="168" y="47" fontSize="11" fontWeight="800" fill="#111" fontFamily="Helvetica,Arial">Rapido</text>
      </g>
      <g style={{ animation: "bobY 5.2s 1.2s ease-in-out infinite" }}>
        <rect x="228" y="30" width="62" height="26" rx="13" fill="#fff" stroke="#E2E2E2" />
        <path d="M243 35 c-3.4 0 -5.6 2.4 -5.6 5.4 c0 3.8 5.6 8 5.6 8 s5.6 -4.2 5.6 -8 c0 -3 -2.2 -5.4 -5.6 -5.4z" fill="#DE1135" />
        <text x="253" y="47" fontSize="11" fontWeight="800" fill="#111" fontFamily="Helvetica,Arial">Maps</text>
      </g>
      {/* row 2 */}
      <g style={{ animation: "bobY 5s .6s ease-in-out infinite" }}>
        <rect x="16" y="64" width="82" height="26" rx="13" fill="#fff" stroke="#E2E2E2" />
        <rect x="27" y="71" width="13" height="13" rx="3.5" fill="#A7E92F" />
        <text x="33.5" y="80.5" textAnchor="middle" fontSize="8" fontWeight="800" fill="#111" fontFamily="Helvetica,Arial">in</text>
        <text x="46" y="81" fontSize="11" fontWeight="800" fill="#111" fontFamily="Helvetica,Arial">inDrive</text>
      </g>
      <g style={{ animation: "bobY 4.7s 1s ease-in-out infinite" }}>
        <rect x="106" y="64" width="100" height="26" rx="13" fill="#fff" stroke="#E2E2E2" />
        <circle cx="121" cy="77" r="6.5" fill="#0AA1A7" />
        <text x="121" y="80.5" textAnchor="middle" fontSize="8" fontWeight="800" fill="#fff" fontFamily="Helvetica,Arial">M</text>
        <text x="132" y="81" fontSize="11" fontWeight="800" fill="#111" fontFamily="Helvetica,Arial">Mana Yatri</text>
      </g>
      <g style={{ animation: "bobY 5.4s 1.4s ease-in-out infinite" }}>
        <rect x="214" y="64" width="112" height="26" rx="13" fill="#EAF6EF" stroke="#BFE6CE" />
        <circle cx="229" cy="77" r="6.5" fill="#06C167" />
        <path d="M226.2 77 l2 2 4-4" stroke="#fff" strokeWidth="1.6" fill="none" strokeLinecap="round" />
        <text x="240" y="81" fontSize="10" fontWeight="700" fill="#0E8345" fontFamily="Helvetica,Arial">Amma: reached?</text>
      </g>

      {/* ── the checklist she runs by hand ── */}
      <g>
        <rect x="16" y="128" width="144" height="178" rx="14" fill="#fff" stroke="#E2E2E2" />
        <text x="30" y="150" fontSize="7.5" fontWeight="800" letterSpacing="0.7" fill="#9AA0A6" fontFamily="Helvetica,Arial">
          HER CHECKLIST, BY HAND
        </text>
        {[
          "check the plate",
          "share the link",
          "call amma",
          "pick the gate",
          "watch the route",
          "text reached",
        ].map((label, i) => (
          <g key={label}>
            <circle cx="36" cy={166 + i * 23} r="3" fill={i < 3 ? "#276EF1" : "#F6BC2F"} />
            <text x="46" y={169.5 + i * 23} fontSize="10" fontWeight="700" fill="#545454" fontFamily="Helvetica,Arial">
              {label}
            </text>
          </g>
        ))}
      </g>

      {/* ── the tired rider ── */}
      <g transform="translate(84 10)">
        {/* shadow */}
        <ellipse cx="120" cy="308" rx="52" ry="7" fill="#000" opacity=".08" />
        {/* legs */}
        <path d="M104 236 l-4 62 h11 l5-56 z" fill="#1E2733" />
        <path d="M130 236 l6 62 h-11 l-7-57 z" fill="#26303E" />
        <rect x="96" y="294" width="18" height="8" rx="4" fill="#0A0D13" />
        <rect x="124" y="294" width="18" height="8" rx="4" fill="#0A0D13" />
        {/* slouched body */}
        <path d="M98 160 c-6 26 -6 54 2 78 c12 6 26 6 36 0 c8 -26 6 -52 -2 -78 c-12 -7 -26 -7 -36 0z" fill="#3B6FE0" />
        {/* slipping bag */}
        <path d="M132 168 c8 20 10 40 8 58" stroke="#8E3B70" strokeWidth="6" fill="none" strokeLinecap="round" />
        <rect x="132" y="222" width="26" height="34" rx="8" fill="#8E3B70" />
        {/* arm holding phone up, elbow bent */}
        <path d="M100 176 c-14 8 -22 20 -22 34" stroke="#3B6FE0" strokeWidth="11" fill="none" strokeLinecap="round" />
        <path d="M78 210 c0 8 4 14 12 16" stroke="#E8B08A" strokeWidth="8" fill="none" strokeLinecap="round" />
        {/* phone, glowing */}
        <rect x="78" y="196" width="26" height="44" rx="6" fill="#0A0D13" />
        <rect x="81" y="200" width="20" height="36" rx="3" fill="#EFF4FE" />
        <rect x="84" y="205" width="14" height="3.5" rx="1.7" fill="#276EF1" />
        <rect x="84" y="212" width="10" height="3" rx="1.5" fill="#C9CED4" />
        <rect x="84" y="218" width="12" height="3" rx="1.5" fill="#C9CED4" />
        <path d="M70 192 l-5-6 M74 188 l-3-8 M66 200 l-8-3" stroke="#8FB4F2" strokeWidth="2" strokeLinecap="round" opacity=".8" style={{ animation: "blink 2.4s ease infinite" }} />
        {/* head, tilted and tired */}
        <g transform="rotate(-6 120 134)">
          <circle cx="120" cy="134" r="19" fill="#E8B08A" />
          <path d="M101 128 a19 19 0 0132 -9 c6 4 8 12 6 18 c-2 -8 -8 -12 -14 -13 c-9 -2 -18 0 -24 4z" fill="#1F1F1F" />
          <circle cx="139" cy="122" r="7" fill="#1F1F1F" />
          {/* closed, heavy eyes + under-eye lines */}
          <path d="M111 136 q3.5 3 7 0 M126 135 q3.5 3 7 0" stroke="#1F1F1F" strokeWidth="1.8" fill="none" strokeLinecap="round" />
          <path d="M112 141 q3 1.6 5.5 0 M127 140 q3 1.6 5.5 0" stroke="#C68B62" strokeWidth="1.3" fill="none" strokeLinecap="round" />
          <path d="M117 148 q4 2.4 8 0" stroke="#1F1F1F" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        </g>
        {/* rider's sleepy drift */}
        <text x="152" y="112" fontSize="11" fontWeight="800" fill="#9AA0A6" fontFamily="Helvetica,Arial" style={{ animation: "blink 3s ease infinite" }}>z</text>
        <text x="160" y="102" fontSize="14" fontWeight="800" fill="#C9CED4" fontFamily="Helvetica,Arial" style={{ animation: "blink 3s .5s ease infinite" }}>Z</text>
      </g>

      {/* ── the waiting cab with a tired driver ── */}
      <g transform="translate(30 0)">
        <ellipse cx="340" cy="304" rx="78" ry="7" fill="#000" opacity=".1" />
        <path d="M268 296 v-16 c0-6.5 4.6-11.5 11-12.5 l14-2.5 14-15 c3-3.2 7-5 11.4-5 h42 c4.4 0 8.4 1.8 11.4 5 l13.5 14.5 14.5 2.5 c6 1 10.2 6 10.2 12.5 v16.5 z" fill="#0A0D13" />
        {/* windows: tired driver at the wheel */}
        <path d="M311 265 l11-12 c1.8-2 4.4-3 7-3 h8 v15 z" fill="#8FB4F2" opacity=".9" />
        <g>
          <rect x="345" y="252" width="26" height="13" rx="3" fill="#16264A" />
          <circle cx="354" cy="256" r="5" fill="#C68B62" />
          {/* heavy eyelids */}
          <path d="M351.5 256 q1.4 1.4 3 0 M356 255.8 q1.2 1.2 2.6 0" stroke="#1F1F1F" strokeWidth="0.9" fill="none" strokeLinecap="round" />
          <path d="M349 252 a5.5 5.5 0 0110 -1" stroke="#1F1F1F" strokeWidth="2.4" fill="none" />
          <rect x="360" y="258" width="7" height="2.6" rx="1.3" fill="#C68B62" />
          <circle cx="368.5" cy="260" r="4" fill="none" stroke="#4A5568" strokeWidth="1.7" />
        </g>
        <path d="M28 0" />
        <path d="M276 291 h146" stroke="#1B2330" strokeWidth="1.5" />
        <rect x="416" y="276" width="6" height="6" rx="2" fill="#FFF7DE" />
        <rect x="266" y="276" width="5.5" height="6" rx="2" fill="#DE1135" />
        <circle cx="302" cy="297" r="12" fill="#05070B" /><circle cx="302" cy="297" r="5.5" fill="#8A96A6" />
        <circle cx="384" cy="297" r="12" fill="#05070B" /><circle cx="384" cy="297" r="5.5" fill="#8A96A6" />
        {/* driver's sleepy drift */}
        <text x="376" y="244" fontSize="10" fontWeight="800" fill="#9AA0A6" fontFamily="Helvetica,Arial" style={{ animation: "blink 2.6s ease infinite" }}>z</text>
        <text x="384" y="236" fontSize="13" fontWeight="800" fill="#C9CED4" fontFamily="Helvetica,Arial" style={{ animation: "blink 2.6s .4s ease infinite" }}>Z</text>
        {/* the notification nobody gets today */}
        <g style={{ animation: "bobY 4.8s ease-in-out infinite" }}>
          <rect x="284" y="182" width="152" height="32" rx="10" fill="#FFF1D6" stroke="#F0DCC8" />
          <circle cx="298" cy="198" r="4.5" fill="#F6BC2F" style={{ animation: "blink 1.8s ease infinite" }} />
          <text x="307" y="195" fontSize="9" fontWeight="800" fill="#7A4E00" fontFamily="Helvetica,Arial">driver on a long night shift</text>
          <text x="307" y="206" fontSize="8" fontWeight="600" fill="#B26205" fontFamily="Helvetica,Arial">a heads-up no app sends today</text>
        </g>
      </g>
    </svg>
  );
}

export function Problem() {
  return (
    <div className="mt-14 grid items-center gap-8 sm:mt-24 sm:gap-12 [grid-template-columns:repeat(auto-fit,minmax(min(100%,320px),1fr))]">
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
          RideCheck, trip PINs, audio recording and a 24x7 safety line. The
          features exist. The booking flow still leaves riders juggling those
          tools alone at midnight.
        </p>
        <div className="rounded-r-xl border-l-4 border-brand bg-mist px-[18px] py-[15px] text-[14.5px] leading-[1.6]">
          <div className="mb-1 text-[10.5px] font-bold tracking-[1.4px] text-brand">THE PROBLEM HYPOTHESIS</div>
          Women should not need to build a safety plan by hand every time they
          book a late-night ride. The app can turn what it already knows into
          plain choices <strong>before</strong> the trip begins, with no promise
          that any system can guarantee her safety.
        </div>
      </Reveal>
      <div>
        <Reveal variant="right" className="rounded-3xl bg-mist p-[clamp(16px,3vw,34px)]">
          <JugglingIllustration />
        </Reveal>
        <div className="mt-2.5 text-xs text-[#A6A6A6]">
          Six apps open, a checklist run by hand, one tired rider. That is
          tonight&apos;s manual safety plan.
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────── Decision engine diagram ──────────────────────── */
export function DecisionEngine() {
  return (
    <div className="mt-14 sm:mt-24">
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
      <Reveal className="rounded-2xl bg-mist p-[clamp(8px,1.6vw,20px)] sm:rounded-3xl">
        <svg
          viewBox="0 0 1080 300"
          className="block h-auto w-full"
          aria-label="Diagram: five observable inputs flow through a deterministic rules engine into four guidance categories"
        >
          <g fontFamily="Helvetica,Arial">
            <rect x="16" y="22" width="220" height="44" rx="12" fill="#FFFFFF" stroke="#E2E2E2" />
            <circle cx="42" cy="44" r="10" fill="#000" />
            <path d="M42 38v6l4 3" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" />
            <text x="62" y="49" fontSize="19" fontWeight="700">Time &amp; duration</text>
            <rect x="16" y="76" width="220" height="44" rx="12" fill="#FFFFFF" stroke="#E2E2E2" />
            <rect x="32" y="90" width="20" height="16" rx="3" fill="none" stroke="#000" strokeWidth="2" />
            <path d="M32 98h20" stroke="#000" strokeWidth="2" />
            <text x="62" y="103" fontSize="19" fontWeight="700">Route context</text>
            <rect x="16" y="130" width="220" height="44" rx="12" fill="#FFFFFF" stroke="#E2E2E2" />
            <path d="M42 138c-5 0-8.5 3.6-8.5 8.2 0 5.8 8.5 12.3 8.5 12.3s8.5-6.5 8.5-12.3C50.5 141.6 47 138 42 138z" fill="#06C167" />
            <text x="62" y="157" fontSize="19" fontWeight="700">Nearby anchors</text>
            <rect x="16" y="184" width="220" height="44" rx="12" fill="#FFFFFF" stroke="#E2E2E2" />
            <path d="M42 192l8 3.2v4.4c0 4.8-3.4 8.8-8 10.4-4.6-1.6-8-5.6-8-10.4v-4.4z" fill="#276EF1" />
            <text x="62" y="211" fontSize="19" fontWeight="700">Eligible-driver supply</text>
            <rect x="16" y="238" width="220" height="44" rx="12" fill="#FFFFFF" stroke="#E2E2E2" />
            <rect x="30" y="258" width="7" height="10" rx="2" fill="#000" />
            <rect x="40" y="252" width="7" height="16" rx="2" fill="#6B6B6B" />
            <rect x="50" y="246" width="7" height="22" rx="2" fill="#C9CED4" />
            <text x="66" y="265" fontSize="19" fontWeight="700">Data confidence</text>
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
            <text x="510" y="136" textAnchor="middle" fontSize="21" fontWeight="800" fill="#fff">DETERMINISTIC RULES</text>
            <text x="510" y="158" textAnchor="middle" fontSize="15" fill="#A6A6A6">explainable · auditable · no ML in MVP</text>
            <g style={{ animation: "blink 2.2s ease infinite" }}>
              <text x="510" y="181" textAnchor="middle" fontSize="14" fill="#F6BC2F">
                ✕ crime data · ✕ protected attributes
              </text>
              <text x="510" y="200" textAnchor="middle" fontSize="14" fill="#F6BC2F">
                ✕ ratings alone
              </text>
            </g>
            <path d="M664 118 C720 110 724 66 776 58" fill="none" stroke="#0E8345" strokeWidth="2.5" strokeDasharray="7 6" style={{ animation: "dashflow 1.4s linear infinite" }} />
            <path d="M664 140 C716 136 726 122 776 118" fill="none" stroke="#B26205" strokeWidth="2.5" strokeDasharray="7 6" style={{ animation: "dashflow 1.5s linear infinite" }} />
            <path d="M664 164 C716 168 726 182 776 178" fill="none" stroke="#DE1135" strokeWidth="2.5" strokeDasharray="7 6" style={{ animation: "dashflow 1.5s linear infinite" }} />
            <path d="M664 186 C720 194 724 238 776 238" fill="none" stroke="#6B6B6B" strokeWidth="2.5" strokeDasharray="7 6" style={{ animation: "dashflow 1.6s linear infinite" }} />
            <rect x="780" y="36" width="284" height="44" rx="22" fill="#EAF6EF" />
            <circle cx="806" cy="58" r="7" fill="#06C167" />
            <text x="822" y="63" fontSize="18" fontWeight="800" fill="#0E8345">Lower contextual risk</text>
            <rect x="780" y="96" width="284" height="44" rx="22" fill="#FFF1D6" />
            <circle cx="806" cy="118" r="7" fill="#F6BC2F" />
            <text x="822" y="123" fontSize="18" fontWeight="800" fill="#7A4E00">Elevated contextual risk</text>
            <rect x="780" y="156" width="284" height="44" rx="22" fill="#FDE8EC" />
            <circle cx="806" cy="178" r="7" fill="#DE1135" />
            <text x="822" y="183" fontSize="18" fontWeight="800" fill="#A50D28">Higher contextual risk</text>
            <rect x="780" y="216" width="284" height="44" rx="22" fill="#EEEEEE" />
            <circle cx="806" cy="238" r="7" fill="#A6A6A6" />
            <text x="822" y="243" fontSize="18" fontWeight="800" fill="#545454">Limited Data · abstain</text>
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
    risk: "Risk: a false sense of security. A rider reads the brief as a promise.",
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
    risk: "Risk: profiling riders or drivers, and a number that looks more precise than it is.",
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
    risk: "Risk: a confident label built on two data points.",
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
    risk: "Risk: eligibility that quietly punishes some drivers, or that drivers learn to game.",
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
    risk: "Risk: a location shared with someone the rider never agreed to.",
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
    risk: "Risk: neighbourhoods labelled unsafe by an app.",
    text: "Well lit, staffed places only. No unsafe area labels, no public risk maps.",
    icon: (
      <svg width="30" height="30" viewBox="0 0 30 30" fill="none" aria-hidden="true">
        <path d="M15 26s-9-7.2-9-13.6A9 9 0 0115 4a9 9 0 019 8.4C24 18.8 15 26 15 26z" stroke="#000" strokeWidth="2" strokeLinejoin="round" />
        <path d="M11 12.5h8" stroke="#DE1135" strokeWidth="2.4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Sharing that expires",
    risk: "Risk: a live link that outlives the trip.",
    text: "Tracking links live for the trip, 30 minutes after a safe arrival, and 12 hours only when there is no response.",
    icon: (
      <svg width="30" height="30" viewBox="0 0 30 30" fill="none" aria-hidden="true">
        <circle cx="13" cy="15" r="9" stroke="#000" strokeWidth="2" />
        <path d="M13 9.5V15l3.6 2.4" stroke="#000" strokeWidth="2" strokeLinecap="round" />
        <path d="M22 8l4 4m0-4l-4 4" stroke="#F6BC2F" strokeWidth="2.4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Built for every rider",
    risk: "Risk: a feature that guesses who a rider is, or excludes riders who want it.",
    text: "Anyone can turn SafeRide on. The Female rider switch is optional and self declared, never guessed.",
    icon: (
      <svg width="30" height="30" viewBox="0 0 30 30" fill="none" aria-hidden="true">
        <circle cx="10" cy="10" r="4" stroke="#000" strokeWidth="2" />
        <circle cx="21" cy="11" r="3.2" stroke="#000" strokeWidth="2" />
        <path d="M3.5 24c.9-4.4 3.5-6.6 6.5-6.6s5.6 2.2 6.5 6.6M18 20.5c.8-2 2.2-3 3.8-3 1.9 0 3.5 1.4 4.2 4" stroke="#276EF1" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
];

export function ResponsibleAI() {
  return (
    <div className="mt-12 grid gap-3 sm:mt-20 [grid-template-columns:repeat(auto-fit,minmax(min(100%,240px),1fr))]">
      {PRINCIPLES.map((p, i) => (
        /* mobile: the cards deck over each other on scroll, like the stats */
        <div key={p.title} className="sticky sm:static" style={{ top: 64 + i * 6, zIndex: i + 1 }}>
          <Reveal
            delay={(i % 4) * 0.06}
            className="h-full rounded-2xl border border-line bg-white p-[18px] transition-all duration-300 hover:-translate-y-1 hover:border-brand hover:shadow-[0_14px_34px_rgba(0,0,0,.08)]"
          >
            {p.icon}
            <div className="mt-2.5 text-[11px] font-semibold leading-[1.45] text-[#B26205]">{p.risk}</div>
            <div className="mb-1 mt-1.5 text-[14.5px] font-extrabold">{p.title}</div>
            <div className="text-[12.5px] leading-[1.55] text-ink-soft">{p.text}</div>
          </Reveal>
        </div>
      ))}
    </div>
  );
}

/* ──────────────── Why we built this: India first, Hyderabad pilot ──────────────── */

function PreRideCheckScene() {
  const pop = (delay: number) =>
    ({
      transformBox: "fill-box",
      transformOrigin: "50% 50%",
      animation: `popcycle 8s ease ${delay}s infinite both`,
    }) as const;
  return (
    <svg
      viewBox="0 0 440 300"
      className="block h-auto w-full"
      aria-label="Night scene: a rider finishes the pre-ride checklist on her phone, the contact gets the link, the driver gets the alert, all before the car door opens"
    >
      <defs>
        <linearGradient id="whysky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#060D1F" />
          <stop offset=".6" stopColor="#0E2250" />
          <stop offset="1" stopColor="#1B3D8F" />
        </linearGradient>
        <clipPath id="whyWinR"><rect x="67" y="36" width="26" height="21" rx="3" /></clipPath>
        <clipPath id="whyWinF"><rect x="100" y="36" width="29" height="21" rx="3" /></clipPath>
      </defs>
      <rect width="440" height="300" rx="20" fill="url(#whysky)" />
      <circle cx="386" cy="46" r="16" fill="#FFF3C4" />
      <circle cx="70" cy="40" r="2" fill="#fff" opacity=".6" style={{ animation: "blink 3.6s ease infinite" }} />
      <circle cx="180" cy="28" r="1.6" fill="#fff" opacity=".5" style={{ animation: "blink 4.4s .8s ease infinite" }} />
      <circle cx="300" cy="52" r="1.8" fill="#fff" opacity=".5" style={{ animation: "blink 3.9s 1.4s ease infinite" }} />
      {/* skyline */}
      <rect x="250" y="96" width="54" height="130" fill="#122A63" />
      <rect x="316" y="76" width="66" height="150" fill="#173377" />
      <rect x="394" y="110" width="40" height="116" fill="#122A63" />
      <g fill="#F6BC2F">
        <rect x="326" y="92" width="8" height="7" /><rect x="344" y="92" width="8" height="7" />
        <rect x="326" y="128" width="8" height="7" /><rect x="360" y="112" width="8" height="7" />
        <rect x="262" y="112" width="7" height="6" /><rect x="278" y="140" width="7" height="6" />
        <rect x="402" y="126" width="7" height="6" />
      </g>
      {/* road */}
      <rect x="0" y="226" width="440" height="74" fill="#0B1220" />
      <path d="M14 264 H440" stroke="#F6F6F6" strokeWidth="3" strokeDasharray="20 16" opacity=".7" style={{ animation: "routedash 1.3s linear infinite" }} />

      {/* the same Uber cab as the top of the page, facing the other way,
         driver and passenger inside and the Uber board on the roof */}
      <g transform="translate(432 158) scale(-0.92 0.92)">
        <ellipse cx="96" cy="95" rx="76" ry="4" fill="#000" opacity=".2" />
        <rect x="86" y="20" width="34" height="13" rx="4.5" fill="#FFFFFF" />
        <text x="103" y="29.5" textAnchor="middle" fontSize="9" fontWeight="700" fill="#000" fontFamily="Helvetica,Arial" transform="scale(-1 1)" style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}>Uber</text>
        <rect x="101" y="32.5" width="4" height="4" fill="#0A0D13" />
        <path d="M22 82 V68 c0-5.5 3.8-10 9.2-11 l15.5-2.8 15.5-16.5 c3.2-3.4 7.7-5.4 12.4-5.4 h47.8 c4.7 0 9.2 2 12.4 5.4 L150 53.8 l16 2.6 c5.3 .9 9 5.4 9 10.8 V82 z" fill="#0A0D13" />
        <path d="M64.5 54 L77 40.5 c2-2.2 4.8-3.4 7.8-3.4 h9 V54 z" fill="#1C2534" />
        <path d="M100 36.6 h12.6 c3 0 5.8 1.2 7.8 3.4 L132 53.5 132 54 H100 z" fill="#1C2534" />
        <g clipPath="url(#whyWinR)">
          <rect x="70" y="50" width="17" height="10" rx="3" fill="#0E8345" />
          <circle cx="79" cy="45" r="5.6" fill="#E8B08A" />
          <path d="M72.6 44.5 a6.4 6.4 0 0112.8 0 v2.2 h-2.4 v-2.8 a4 4 0 00-8 0 v2.8 h-2.4 z" fill="#1F1F1F" />
          <rect x="72" y="44" width="2.8" height="7" rx="1.4" fill="#1F1F1F" />
          <rect x="83.4" y="44" width="2.8" height="7" rx="1.4" fill="#1F1F1F" />
        </g>
        <g clipPath="url(#whyWinF)">
          <rect x="104" y="50" width="18" height="10" rx="3" fill="#16264A" />
          <circle cx="112" cy="45" r="5.6" fill="#C68B62" />
          <path d="M105.8 45 a6.3 6.3 0 0112.5 0 v1 h-12.5 z" fill="#276EF1" />
          <rect x="111" y="43.6" width="9.5" height="2.4" rx="1.2" fill="#175BDC" />
          <circle cx="112" cy="41" r="1.4" fill="#FFFFFF" />
          <rect x="117" y="51.5" width="8" height="3" rx="1.5" fill="#C68B62" />
          <circle cx="126.5" cy="53" r="4.6" fill="none" stroke="#4A5568" strokeWidth="2" />
        </g>
        <path d="M96.5 57 v21" stroke="#1B2330" strokeWidth="1.6" />
        <rect x="84" y="61.5" width="9" height="2.6" rx="1.3" fill="#2B3648" />
        <rect x="102" y="61.5" width="9" height="2.6" rx="1.3" fill="#2B3648" />
        <rect x="88" y="56" width="10" height="3.4" rx="1.7" fill="#0E8345" />
        <circle cx="99.5" cy="57.6" r="2.2" fill="#E8B08A" />
        <rect x="131" y="46.5" width="5.5" height="3.4" rx="1.6" fill="#0A0D13" />
        <rect x="130" y="49.5" width="2" height="4" fill="#0A0D13" />
        <path d="M28 78 H166" stroke="#1B2330" strokeWidth="1.6" />
        <rect x="169" y="60" width="6" height="6.5" rx="2" fill="#FFF7DE" />
        <rect x="20" y="60" width="5.5" height="6.5" rx="2" fill="#DE1135" />
        <g>
          <circle cx="52" cy="84" r="13" fill="#05070B" />
          <circle cx="52" cy="84" r="6.8" fill="#8A96A6" />
          <rect x="51" y="77.5" width="2" height="13" rx="1" fill="#05070B" />
          <rect x="45.5" y="83" width="13" height="2" rx="1" fill="#05070B" />
          <circle cx="52" cy="84" r="1.8" fill="#05070B" />
        </g>
        <g>
          <circle cx="142" cy="84" r="13" fill="#05070B" />
          <circle cx="142" cy="84" r="6.8" fill="#8A96A6" />
          <rect x="141" y="77.5" width="2" height="13" rx="1" fill="#05070B" />
          <rect x="135.5" y="83" width="13" height="2" rx="1" fill="#05070B" />
          <circle cx="142" cy="84" r="1.8" fill="#05070B" />
        </g>
      </g>

      {/* driver alert pill, sized to its text, pops in last */}
      <g style={pop(3.4)}>
        <rect x="308" y="132" width="98" height="24" rx="12" fill="#FDF3FB" stroke="#EBC9E4" />
        <circle cx="322" cy="144" r="4.5" fill="#B0499B" />
        <text x="331" y="148" fontSize="10" fontWeight="700" fill="#8A2E78" fontFamily="Helvetica,Arial">driver alerted</text>
      </g>

      {/* the rider's phone with the pre-ride checklist, rows popping in order */}
      <g>
        <rect x="34" y="76" width="112" height="180" rx="16" fill="#05070B" />
        <rect x="40" y="84" width="100" height="164" rx="11" fill="#FFFFFF" />
        <rect x="50" y="94" width="58" height="8" rx="4" fill="#111" />
        {[
          [112, "trip reviewed", 0.4],
          [140, "drop point set", 1.0],
          [168, "link sent", 1.6],
        ].map(([y, label, d]) => (
          <g key={String(y)} style={pop(Number(d))}>
            <rect x="48" y={Number(y)} width="84" height="22" rx="6" fill="#F3F3F3" />
            <circle cx="60" cy={Number(y) + 11} r="6" fill="#06C167" />
            <path d={`M57 ${Number(y) + 11} l2 2.2 4-4.4`} stroke="#fff" strokeWidth="1.8" fill="none" strokeLinecap="round" />
            <text x="70" y={Number(y) + 15} fontSize="8.5" fontWeight="700" fill="#333" fontFamily="Helvetica,Arial">{String(label)}</text>
          </g>
        ))}
        <g style={pop(2.2)}>
          <rect x="48" y="198" width="84" height="20" rx="8" fill="#0A0D13" />
          <text x="90" y="211" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#fff" fontFamily="Helvetica,Arial">ready to board</text>
        </g>
      </g>

      {/* the contact who received the link */}
      <g style={pop(2.8)}>
        <circle cx="196" cy="118" r="17" fill="#06C167" />
        <text x="196" y="123" textAnchor="middle" fontSize="11" fontWeight="800" fill="#00250F" fontFamily="Helvetica,Arial">AN</text>
        <rect x="164" y="142" width="66" height="18" rx="9" fill="#EAF6EF" />
        <text x="197" y="154" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#0E8345" fontFamily="Helvetica,Arial">tracking live</text>
      </g>
      <path d="M148 136 C164 130 172 126 182 122" stroke="#06C167" strokeWidth="2.5" fill="none" strokeDasharray="5 5" style={{ animation: "dashflow 1.3s linear infinite" }} />
      <path d="M212 132 C236 152 258 168 292 186" stroke="#8FB0FF" strokeWidth="2" fill="none" strokeDasharray="3 6" opacity=".7" />
    </svg>
  );
}

/* The "4 in 10" NARI card lives in the chapter 1 Stats row now, so this
   strip carries only the two facts that are not shown elsewhere. */
const INDIA_FACTS = [
  {
    big: "4 in 10",
    hidden: true,
    text: "women in Indian cities said they feel unsafe, and the feeling grows after dark.",
    src: "NARI 2025 · National Commission for Women",
    note: "The National Annual Report and Index on Women's Safety surveyed 12,770 women across 31 Indian cities.",
    url: "https://www.insightsonindia.com/2025/08/29/nari-2025-report/",
  },
  {
    big: "92%",
    text: "of women riders in India said emergency support during the ride matters to them.",
    src: "Statista · 2023 India survey",
    note: "A 2023 survey of ride-hailing users in India on which safety features matter most, split by gender.",
    url: "https://www.statista.com/statistics/1454958/india-importance-of-ride-hailing-safety-features-by-gender/",
  },
  {
    big: "331",
    text: "SHE Teams run by Telangana Police to protect women in public spaces, in the pilot state.",
    src: "Telangana Police · Women Safety Wing",
    note: "The official SHE Teams page of the Telangana Police Women Safety Wing, active since 2014.",
    url: "https://womensafetywing.telangana.gov.in/she-module/she-teams/",
  },
];

export function Architecture() {
  return (
    <Reveal className="mt-12 rounded-2xl bg-mist p-5 sm:mt-20 sm:rounded-3xl sm:p-[clamp(20px,3vw,36px)]">
      <div className="mb-2 text-xs font-bold tracking-[1.6px] text-ink-faint">WHAT CHANGES IN UBER&apos;S FLOW</div>
      <h2 className="m-0 mb-3 text-[clamp(22px,3vw,36px)] font-extrabold tracking-[-1px]">
        The tools exist.
        <br />
        The flow is missing.
      </h2>

      <div className="grid items-center gap-4 sm:gap-6 [grid-template-columns:repeat(auto-fit,minmax(min(100%,320px),1fr))]">
        <div className="order-2 max-w-[62ch] text-[13.5px] leading-[1.6] text-ink-soft sm:order-1 sm:text-[14.5px] sm:leading-[1.65]">
          <p className="m-0">
            Getting into a stranger&apos;s car at night asks for real trust. Uber India already ships
            strong tools for that moment: SOS, live trip sharing, RideCheck, trip PINs, audio
            recording and a 24x7 safety line. Each one works. Each one is also a separate switch,
            and most only matter after you are already sitting inside the car.
          </p>
          <p className="mb-0 mt-2.5">
            SafeRide Priority moves the safety work to before the door closes. One pre-ride check
            runs the whole plan: it reviews the trip, alerts the driver, picks a safer drop point,
            and sends your contact a link with the driver&apos;s name, plate, PIN and live GPS. By
            the time you sit down, everyone who should know already knows.
          </p>
          <p className="mb-0 mt-2.5">
            It covers any reason you ride at night in Hyderabad: a late shift in HITEC City, an
            event across town, an emergency, a long outstation trip. The goal is simple. Reach the
            destination safely, and feel safe the whole way there.
          </p>
        </div>
        <div className="order-1 sm:order-2">
          <PreRideCheckScene />
        </div>
      </div>

      {/* the India numbers behind the decision, each with its source on the card */}
      <div className="mt-4 grid gap-3 sm:mt-6 [grid-template-columns:repeat(auto-fit,minmax(min(100%,220px),1fr))]">
        {INDIA_FACTS.filter((f) => !("hidden" in f && f.hidden)).map((f, i) => (
          <div key={f.big} className="sticky sm:static" style={{ top: 64 + i * 6, zIndex: i + 1 }}>
            <div className="beam h-full">
              <StatCard
                s={{
                  big: f.big,
                  text: f.text,
                  cls: "bg-white",
                  textCls: "text-ink-soft",
                  hintCls: "text-[#9AA0A6]",
                  pillCls: "bg-black text-white",
                  sourceName: f.src,
                  sourceNote: f.note,
                  sourceUrl: f.url,
                }}
                delay={i * 0.07}
              />
            </div>
          </div>
        ))}
      </div>

      {/* what this concept adds on top of the baseline named in chapter 1 */}
      <div className="mt-3 grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(min(100%,300px),1fr))]">
        <div>
        <div className="h-full rounded-2xl bg-black p-4 text-white">
          <div className="mb-2 text-[11px] font-bold tracking-[1.2px] text-[#8FB0FF]">WHAT SAFERIDE PRIORITY ADDS</div>
          <ul className="m-0 list-none p-0 text-[13px] leading-[1.5] text-[#D6DCE4]">
            {[
              "One pre-ride check, done before you board",
              "A committed pickup: the driver accepts before you see the match",
              "One tap says why you ride: emergency, medical, urgent, work",
              "A priority queue that puts urgent and hospital trips first, any hour",
              "Driver alerted before pickup when a female rider is on",
              "Safer, staffed drop points suggested up front",
              "Contact SMS with driver, plate, PIN and live GPS",
              "Tracking that lasts the whole trip, city or outstation",
              "A calm, tiered check-in after you arrive",
            ].map((x) => (
              <li key={x} className="flex items-start gap-2 py-1">
                <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-safe" />
                {x}
              </li>
            ))}
          </ul>
          <div className="mt-2 text-[12px] font-semibold text-[#A6A6A6]">
            One flow, finished before the door closes. That is the whole idea.
          </div>
        </div>
        </div>
      </div>

      {/* the plan, at concept level */}
      <div className="mt-4 flex flex-col items-stretch gap-1.5 sm:flex-row sm:items-center sm:gap-2">
        {[
          ["The night trip", "any ride, 8 PM to 5 AM"],
          ["Pre-ride check", "guidance, driver, drop point"],
          ["Share and track", "contacts see the trip live"],
          ["Arrive and confirm", "a quiet check-in closes it"],
        ].map(([title, sub], i) => (
          <div key={title} className="contents">
            {i > 0 && (
              <div className="text-center text-lg leading-none text-[#A6A6A6] sm:flex-none">
                <span className="sm:hidden">↓</span>
                <span className="hidden sm:inline">→</span>
              </div>
            )}
            <div className="flex-1 rounded-xl border border-line bg-white px-3.5 py-2.5 text-center">
              <div className="text-[13.5px] font-extrabold">{title}</div>
              <div className="mt-0.5 text-[11px] text-ink-faint">{sub}</div>
            </div>
          </div>
        ))}
      </div>
    </Reveal>
  );
}
