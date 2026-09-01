"use client";

import { Reveal, jumpToStep } from "../ui";
import { Glyph, SectionHeader, SourceSnippet } from "./primitives";
import { DOBLIN, INSIGHTS, NOT_LIST, OPTION_CRITERIA, OPTIONS } from "@/content/case";

/* ────────────────── Chapter 2 additions: the solution ──────────────────
   The options weighed before the concept won, where the innovation sits
   across the ten types, the not-list, and the chain from evidence to the
   screens in the prototype. */

const SCORE = {
  1: { label: "Low", cls: "bg-[#FDE8EC] text-[#A50D28]" },
  2: { label: "Some", cls: "bg-[#FFF3D6] text-[#7A4E00]" },
  3: { label: "Strong", cls: "bg-[#EAF6EF] text-[#0E8345]" },
} as const;

export function OptionsWeighed() {
  return (
    <div className="mt-14 sm:mt-24">
      <SectionHeader
        eyebrow="THE OPTIONS WE WEIGHED"
        glyph="scale"
        title="Four ways to answer the problem. One won."
        lede="The four criteria were written before scoring. The losers stay on the table in case a pivot needs one."
      />
      <div className="hidden gap-3 px-5 pb-2 text-[11px] font-bold tracking-[1.6px] text-ink-faint sm:grid sm:grid-cols-[1.4fr_repeat(4,1fr)]">
        <div>THE OPTION</div>
        {OPTION_CRITERIA.map((c) => (
          <div key={c.key}>{c.label.toUpperCase()}</div>
        ))}
      </div>
      <div className="flex flex-col gap-2.5">
        {OPTIONS.map((o, i) => (
          <Reveal
            key={o.name}
            delay={i * 0.05}
            className={`grid gap-3 rounded-2xl border p-5 sm:grid-cols-[1.4fr_repeat(4,1fr)] sm:items-start ${
              o.winner ? "border-brand bg-[rgba(39,110,241,.04)]" : "border-line bg-white"
            }`}
          >
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[15px] font-extrabold tracking-[-0.2px]">{o.name}</span>
                {o.winner && (
                  <span className="rounded-full bg-brand px-2 py-0.5 text-[10px] font-extrabold tracking-[0.6px] text-white">THE CONCEPT</span>
                )}
              </div>
              <div className="mt-1 text-[13px] leading-[1.5] text-ink-soft">{o.what}</div>
              <div className="mt-2 text-[12.5px] leading-[1.5] text-ink-faint">{o.note}</div>
            </div>
            {OPTION_CRITERIA.map((c) => {
              const s = SCORE[o.scores[c.key]];
              return (
                <div key={c.key} className="flex items-center gap-2 sm:block">
                  <div className="text-[10.5px] font-bold tracking-[1.2px] text-ink-faint sm:hidden">{c.label.toUpperCase()}</div>
                  <span className={`inline-block rounded-full px-2.5 py-1 text-[11.5px] font-bold ${s.cls}`}>{s.label}</span>
                  <div className="hidden text-[11.5px] leading-[1.4] text-ink-faint sm:mt-1.5 sm:block">{c.plain}</div>
                </div>
              );
            })}
          </Reveal>
        ))}
      </div>
    </div>
  );
}

const GROUP_ORDER = ["Configuration", "Offering", "Experience"] as const;
const GROUP_SUB = { Configuration: "how the business is set up", Offering: "what it offers", Experience: "how it feels" } as const;

export function Doblin() {
  const yes = DOBLIN.filter((d) => d.state === "yes").length;
  const WORDS = ["Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten"];
  return (
    <div className="mt-14 sm:mt-24">
      <SectionHeader
        eyebrow="HOW WE INNOVATED"
        glyph="grid"
        title={`${WORDS[yes]} of the ten types, and none of them is a new feature.`}
        lede="Ten types of innovation is a public checklist: four about how the business is set up, two about what it offers, four about how it feels. A type is ticked only where SafeRide truly changes something. The rest stay unticked, with the reason."
      />
      <style>{`@keyframes tickdraw { to { stroke-dashoffset: 0; } }`}</style>
      <div className="grid gap-5 [grid-template-columns:repeat(auto-fit,minmax(min(100%,300px),1fr))]">
        {GROUP_ORDER.map((g) => (
          <div key={g} className="rounded-3xl border border-line bg-white p-4 sm:p-5">
            <div className="mb-3 flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
              <div className="text-[11px] font-bold tracking-[1.8px] text-ink-faint">{g.toUpperCase()}</div>
              <div className="text-[11.5px] text-ink-faint">{GROUP_SUB[g]}</div>
            </div>
            <div className="flex flex-col gap-2">
              {DOBLIN.filter((d) => d.group === g).map((d, i) => {
                const on = d.state === "yes";
                return (
                  <Reveal key={d.name} delay={i * 0.05} className={`flex gap-3 rounded-2xl p-3.5 ${on ? "bg-black text-white" : "bg-mist text-ink-faint"}`}>
                    <span
                      className={`mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-md border ${on ? "border-brand bg-brand" : "border-line bg-white"}`}
                      aria-hidden="true"
                    >
                      {on && (
                        <svg width="14" height="14" viewBox="0 0 14 14">
                          <path
                            d="M2.5 7.5l3 3 6-7"
                            fill="none"
                            stroke="#fff"
                            strokeWidth="2.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeDasharray="14"
                            strokeDashoffset="14"
                            style={{ animation: `tickdraw .5s ${0.3 + i * 0.1}s ease-out forwards` }}
                          />
                        </svg>
                      )}
                    </span>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-baseline gap-x-2">
                        <span className="text-[14px] font-extrabold tracking-[-0.2px]">{d.name}</span>
                        <span className={`text-[10.5px] font-bold tracking-[0.8px] ${on ? "text-[#8FB0FF]" : ""}`}>{on ? "APPLIES" : "NOT HERE"}</span>
                      </div>
                      <p className={`m-0 mt-1 text-[13px] leading-[1.55] ${on ? "text-[#C9C9C9]" : ""}`}>{d.how}</p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      <p className="mx-auto mt-6 max-w-[760px] text-center text-[13.5px] leading-[1.6] text-ink-soft">
        The rule of thumb behind the checklist: three types beyond product features is the floor, and five or more working together is what rivals find hard to copy. SafeRide ticks {yes}. The feature list is left alone on purpose.
      </p>
    </div>
  );
}

export function NotList() {
  return (
    <div className="mt-14 sm:mt-24">
      <SectionHeader
        eyebrow="THE NOT-LIST"
        glyph="cross"
        title="What SafeRide will never build."
        lede="A concept is only as clear as its edges. Six things people ask for first, and why each stays out."
      />
      <div className="grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(min(100%,300px),1fr))]">
        {NOT_LIST.map((n, i) => (
          <Reveal key={n.item} delay={i * 0.04} className="flex gap-3 rounded-2xl bg-black p-5 text-white">
            <span className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-full bg-white/15" aria-hidden="true">
              <svg width="11" height="11" viewBox="0 0 14 14">
                <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
              </svg>
            </span>
            <div>
              <div className="text-[14.5px] font-extrabold tracking-[-0.2px]">{n.item}</div>
              <p className="m-0 mt-1 text-[13px] leading-[1.55] text-[#C9C9C9]">{n.why}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

/* A small animated chain: evidence → insight → decision → screen. Pure SVG,
   scales with its container, and the dash animation is disabled under
   prefers-reduced-motion by the global stylesheet. */
function Chain() {
  const nodes = [
    { x: 40, label: "Evidence" },
    { x: 220, label: "Insight" },
    { x: 400, label: "Decision" },
    { x: 580, label: "The screen" },
  ];
  return (
    <svg viewBox="0 0 620 84" className="block h-auto w-full max-w-[720px]" aria-hidden="true">
      <path d="M40 34 H580" stroke="#E2E2E2" strokeWidth="2" />
      <path d="M40 34 H580" stroke="#276EF1" strokeWidth="2" strokeDasharray="6 8" style={{ animation: "dashflow 1.6s linear infinite" }} />
      {nodes.map((n, i) => (
        <g key={n.label}>
          <circle cx={n.x} cy="34" r="16" fill={i === 3 ? "#000" : "#fff"} stroke={i === 3 ? "#000" : "#276EF1"} strokeWidth="2" />
          <text x={n.x} y="39" textAnchor="middle" fontSize="13" fontWeight="800" fill={i === 3 ? "#fff" : "#276EF1"} fontFamily="Helvetica,Arial">
            {i + 1}
          </text>
          <text x={n.x} y="74" textAnchor="middle" fontSize="13" fontWeight="700" fill="#545454" fontFamily="Helvetica,Arial">
            {n.label}
          </text>
        </g>
      ))}
    </svg>
  );
}

export function HowWeGotHere() {
  return (
    <div className="mt-14 sm:mt-24">
      <SectionHeader
        eyebrow="HOW WE GOT HERE"
        glyph="compass"
        title="Six insights, six screens."
        lede="Every screen in the prototype traces back to something we read or heard. Here is the chain, and a tap takes you to the screen it produced."
      />
      <Reveal className="mb-6 rounded-2xl border border-line bg-mist p-4 sm:p-6">
        <Chain />
      </Reveal>
      <div className="grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(min(100%,300px),1fr))]">
        {INSIGHTS.map((it, i) => (
          <Reveal key={it.screen.label + i} delay={Math.min(i * 0.05, 0.25)} className="flex h-full flex-col rounded-2xl border border-line bg-white p-5">
            <div className="flex items-center gap-2 text-brand">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[rgba(39,110,241,.1)]">
                <Glyph name={it.glyph} size={16} />
              </span>
              <span className="text-[11px] font-bold tracking-[1.6px]">INSIGHT {i + 1}</span>
            </div>
            <dl className="m-0 mt-4 flex flex-1 flex-col gap-3 text-[13px] leading-[1.55]">
              <div>
                <dt className="text-[10.5px] font-bold tracking-[1.4px] text-ink-faint">WHAT WE SAW</dt>
                <dd className="m-0 mt-0.5 text-ink-soft">
                  {it.evidence}
                  {it.sourceUrl && <SourceSnippet url={it.sourceUrl} compact className="mt-2" />}
                </dd>
              </div>
              <div>
                <dt className="text-[10.5px] font-bold tracking-[1.4px] text-ink-faint">WHAT IT MEANS</dt>
                <dd className="m-0 mt-0.5 font-semibold text-ink">{it.insight}</dd>
              </div>
              <div>
                <dt className="text-[10.5px] font-bold tracking-[1.4px] text-ink-faint">WHAT WE BUILT</dt>
                <dd className="m-0 mt-0.5 text-ink-soft">{it.decision}</dd>
              </div>
            </dl>
            <button
              type="button"
              onClick={() => jumpToStep(it.screen.step)}
              className="mt-4 inline-flex items-center justify-between gap-2 rounded-xl bg-black px-3.5 py-2.5 text-left text-[12.5px] font-bold text-white transition-colors hover:bg-brand"
            >
              {it.screen.label}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M5 12h14m-6-6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
