import { Reveal } from "../ui";
import { SectionHeader, SourceSnippet, Tag } from "./primitives";
import { Carousel, GlowCard } from "./Motion";
import { FunnelBars, NorthStarTree, StageTimeline } from "./Figures";
import {
  BMC,
  COMPLIANCE,
  CONFIDENCE,
  GOVERNANCE,
  GUARDRAILS,
  KPIS,
  NORTH_STAR,
  PILOT,
  REVENUE_INPUTS,
  REVENUE_LINES,
  REVENUE_TOTAL,
  SQUAD,
  STAGES,
  VALUE_LEVERS,
  WATCHPOINTS,
} from "@/content/case";

/* ────────────────── Chapter 3: the business model ──────────────────
   No pilot has run. This chapter shows the shape of the money, with every
   number tagged for what it is. */

export function NoPilotNote() {
  return (
    <Reveal className="rounded-2xl border border-[#F0DCC8] bg-[#FFF7EC] p-5 text-[14.5px] leading-[1.6] text-[#5A3A00] sm:p-6">
      <span className="font-extrabold">Nothing in this chapter has been tested.</span> Every target is a hypothesis the pilot would
      test. Every input to the money model is sourced, assumed or a hypothesis, and says which. The baselines are
      Uber&apos;s own numbers. The first pilot stage pulls them.
    </Reveal>
  );
}

export function MetricTree() {
  return (
    <div className="mt-10 sm:mt-16">
      <SectionHeader
        eyebrow="THE NORTH STAR AND WHAT FEEDS IT"
        glyph="star"
        title="One number to read every week."
        lede="Under it: eight targets the pilot would test, and six lines that would stop it."
      />
      <Reveal className="beam">
        <div className="rounded-2xl bg-black p-6 text-white sm:p-8">
          <div className="text-[11px] font-bold tracking-[1.8px] text-[#8FB0FF]">NORTH STAR</div>
          <p className="m-0 mt-2 max-w-[860px] text-[clamp(18px,2.2vw,26px)] font-bold leading-[1.4] tracking-[-0.4px]">{NORTH_STAR.metric}</p>
          <p className="m-0 mt-3 max-w-[760px] text-[13px] leading-[1.6] text-[#A6A6A6]">{NORTH_STAR.note}</p>
          <div className="mt-5">
            <NorthStarTree labels={KPIS.map((k) => k.label)} />
          </div>
        </div>
      </Reveal>

      {/* one label for the whole grid, so the cards stay clean */}
      <div className="mt-6 flex flex-wrap items-center gap-3">
        <Tag kind="hypothesis" />
        <span className="text-[13px] font-semibold text-ink-soft">Eight targets the pilot would test. Swipe on a phone, hover on a desktop.</span>
      </div>
      <Carousel className="mt-3" minWidth={240} ariaLabel="Pilot targets">
        {KPIS.map((k) => (
          <GlowCard key={k.label} className="flex h-full flex-col rounded-2xl border border-line bg-white p-5">
            <div className="text-[11px] font-bold tracking-[1.4px] text-brand">{k.label.toUpperCase()}</div>
            <div className="mt-1.5 text-[15px] font-extrabold leading-[1.4] tracking-[-0.2px]">{k.target}</div>
            <div className="mt-2 text-[12.5px] leading-[1.5] text-ink-soft">{k.why}</div>
          </GlowCard>
        ))}
      </Carousel>

      <Reveal className="mt-5 rounded-2xl border border-line bg-mist p-5 sm:p-6">
        <div className="text-[11px] font-bold tracking-[1.8px] text-ink-faint">THE GUARDRAILS, READ WEEKLY</div>
        <ul className="m-0 mt-3 grid list-none gap-x-6 gap-y-2.5 p-0 sm:grid-cols-2">
          {GUARDRAILS.map((g) => (
            <li key={g.label} className="flex gap-2.5 text-[13.5px] leading-[1.55]">
              <span className="mt-[7px] h-2 w-2 flex-none rounded-full bg-caution" aria-hidden="true" />
              <span>
                <span className="font-extrabold">{g.label}.</span> <span className="text-ink-soft">{g.line}</span>
              </span>
            </li>
          ))}
        </ul>
      </Reveal>
    </div>
  );
}

export function RevenueModel() {
  return (
    <div className="mt-10 sm:mt-16">
      <SectionHeader
        eyebrow="THE MONEY MODEL, SHOWN WITH ITS WORKING"
        glyph="coins"
        title="What one night in Hyderabad could be worth."
        lede="Two lines of value: the optional fee, and fares that complete. Every input wears its tag."
      />
      <div className="grid gap-5 [grid-template-columns:repeat(auto-fit,minmax(min(100%,320px),1fr))]">
        <Reveal className="rounded-2xl border border-line bg-white p-5 sm:p-6">
          <div className="text-[11px] font-bold tracking-[1.8px] text-ink-faint">THE INPUTS</div>
          <ul className="m-0 mt-3 flex list-none flex-col gap-2.5 p-0">
            {REVENUE_INPUTS.map((r) => (
              <li key={r.label} className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1 border-b pb-2 text-[13px] last:border-0 last:pb-0" style={{ borderColor: "#EFEFEF" }}>
                <span className="text-ink-soft">{r.label}</span>
                <span className="flex items-center gap-2 font-extrabold">
                  {r.value}
                  <Tag kind={r.kind} />
                </span>
              </li>
            ))}
          </ul>
          {REVENUE_INPUTS[0].url && <SourceSnippet url={REVENUE_INPUTS[0].url} compact className="mt-4" />}
        </Reveal>
        <div className="flex flex-col gap-3">
          <Reveal className="rounded-2xl border border-line bg-white p-5 sm:p-6">
            <div className="text-[11px] font-bold tracking-[1.8px] text-ink-faint">THE WORKING</div>
            <div className="mt-3">
              <FunnelBars
                rows={[
                  { label: "Night trips, Hyderabad", range: REVENUE_LINES[0].range, share: 1 },
                  { label: "Layer switched on", range: REVENUE_LINES[1].range, share: 0.42 },
                  { label: "Priority match chosen", range: REVENUE_LINES[2].range, share: 0.09 },
                ]}
              />
            </div>
            <ul className="m-0 mt-3 flex list-none flex-col gap-2.5 p-0">
              {REVENUE_LINES.map((l) => (
                <li key={l.label} className="grid gap-x-3 gap-y-0.5 text-[13px] sm:grid-cols-[1.3fr_1fr_auto]">
                  <span className="font-semibold">{l.label}</span>
                  <span className="text-ink-faint">{l.math}</span>
                  <span className="font-extrabold sm:text-right">{l.range}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal className="rounded-2xl bg-black p-5 text-white sm:p-6">
            <div className="text-[11px] font-bold tracking-[1.8px] text-[#8FB0FF]">ILLUSTRATIVE VALUE, PER YEAR</div>
            <div className="mt-1.5 text-[clamp(26px,3vw,36px)] font-extrabold tracking-[-1px]">{REVENUE_TOTAL.range}</div>
            <p className="m-0 mt-2 text-[13px] leading-[1.55] text-[#C9C9C9]">{REVENUE_TOTAL.scope}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <Tag kind="assumption" />
              <Tag kind="hypothesis" />
            </div>
          </Reveal>
        </div>
      </div>
      <div className="mt-3 text-xs text-[#A6A6A6]">
        What riders will pay is untested. Stage 3 splits the cohort: half sees extra minutes, half sees extra rupees. The readout says which one they accept.
      </div>
    </div>
  );
}

export function ValueLogic() {
  return (
    <div className="mt-10 sm:mt-16">
      <SectionHeader
        eyebrow="THE VALUE, AGAINST THE BASELINE"
        glyph="levers"
        title="Three levers, two things that could go wrong."
        lede="Money is a delta against today's numbers, and the harm it could do is named."
      />
      <div className="grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(min(100%,260px),1fr))]">
        {VALUE_LEVERS.map((v, i) => (
          <Reveal key={v.label} delay={i * 0.06} className="h-full">
            <GlowCard className="flex h-full flex-col rounded-2xl border border-line bg-mist p-5">
              <div className="text-[11px] font-bold tracking-[1.8px] text-brand">{v.label.toUpperCase()}</div>
              <p className="m-0 mt-2 text-[14px] leading-[1.55]">{v.line}</p>
              <div className="mt-auto pt-3 text-[12px] text-ink-faint">Read on: {v.metric}</div>
            </GlowCard>
          </Reveal>
        ))}
      </div>
      <div className="mt-3 grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(min(100%,300px),1fr))]">
        {WATCHPOINTS.map((w, i) => (
          <Reveal key={w.label} delay={i * 0.06} className="rounded-2xl border border-[#F0DCC8] bg-[#FFF7EC] p-5">
            <div className="text-[11px] font-bold tracking-[1.8px] text-[#B26205]">WATCH FOR {w.label.toUpperCase()}</div>
            <p className="m-0 mt-2 text-[13.5px] leading-[1.55] text-[#5A3A00]">{w.risk}</p>
            <p className="m-0 mt-2 text-[13px] leading-[1.55] text-[#7A4E00]">
              <span className="font-extrabold">How I watch it:</span> {w.watch}
            </p>
          </Reveal>
        ))}
      </div>
    </div>
  );
}


/* The classic nine-box canvas: shared hairlines, the value proposition as
   the dark centre, costs and revenue as the base row. Cells grow with their
   text, so nothing is ever cut. Phones read it as one column in canvas order. */
const BMC_SPAN: Record<string, string> = {
  kp: "lg:col-span-2 lg:row-span-2",
  ka: "lg:col-span-2",
  kr: "lg:col-span-2",
  vp: "lg:col-span-2 lg:row-span-2",
  cr: "lg:col-span-2",
  ch: "lg:col-span-2",
  cs: "lg:col-span-2 lg:row-span-2",
  cost: "lg:col-span-5",
  rev: "lg:col-span-5",
};
const BMC_ORDER = ["kp", "ka", "vp", "cr", "cs", "kr", "ch", "cost", "rev"];

export function BusinessModelCanvas() {
  const blocks = BMC_ORDER.map((k) => BMC.find((b) => b.area === k)!);
  return (
    <div className="mt-10 sm:mt-16">
      <SectionHeader
        eyebrow="THE BUSINESS MODEL ON ONE CANVAS"
        glyph="canvas"
        title="Nine blocks, each marked by how sure I am."
        lede="The classic canvas. Every block carries a tag: evidenced, design, assumed, or unknown."
      />
      <Reveal>
        <div className="overflow-hidden rounded-2xl border border-line bg-line">
          <div className="grid grid-cols-1 gap-px lg:grid-cols-10 lg:[grid-auto-rows:minmax(0,auto)]">
            {blocks.map((b) => {
              const c = CONFIDENCE[b.conf];
              const vp = b.area === "vp";
              const base = b.area === "cost" || b.area === "rev";
              return (
                <div
                  key={b.area}
                  className={`flex flex-col p-4 ${BMC_SPAN[b.area]} ${vp ? "bg-black text-white" : base ? "bg-mist" : "bg-white"}`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className={`text-[10.5px] font-bold tracking-[1.3px] ${vp ? "text-[#8FB0FF]" : "text-ink-faint"}`}>{b.title.toUpperCase()}</div>
                    <span
                      className={`inline-flex items-center gap-1 whitespace-nowrap rounded-full px-2 py-0.5 text-[9px] font-extrabold tracking-[0.6px] ${
                        vp ? "bg-white/10 text-white" : "border border-line bg-white text-ink-soft"
                      }`}
                    >
                      <span className="h-1.5 w-1.5 rounded-full" style={{ background: c.color }} aria-hidden="true" />
                      {c.label.toUpperCase()}
                    </span>
                  </div>
                  <ul className={`m-0 mt-2.5 flex list-none flex-col gap-1.5 p-0 text-[12.5px] leading-[1.5] ${vp ? "text-white" : "text-ink-soft"}`}>
                    {b.items.map((it) => (
                      <li key={it} className="flex items-start gap-2">
                        <span className={`mt-[7px] h-1 w-1 flex-none rounded-full ${vp ? "bg-brand" : "bg-[#C9CED4]"}`} aria-hidden="true" />
                        <span className={vp ? "text-[13.5px] font-semibold leading-[1.55]" : ""}>{it}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </Reveal>
    </div>
  );
}

export function PilotPlan() {
  return (
    <div className="mt-10 sm:mt-16">
      <SectionHeader
        eyebrow="THE PILOT, AND THE STAGES AFTER IT"
        glyph="path"
        title="Five stages. Money and permission unlock on evidence."
        lede={`${PILOT.city}: ${PILOT.corridors}. ${PILOT.cohort} ${PILOT.duration}`}
      />
      <Reveal className="mb-4 rounded-2xl border border-line bg-white p-3 sm:p-5">
        <StageTimeline names={STAGES.map((s) => s.name)} />
      </Reveal>
      <Carousel minWidth={210} ariaLabel="Pilot stages">
        {STAGES.map((s) => (
          <GlowCard key={s.n} className={`flex h-full flex-col rounded-2xl border p-4 ${s.n >= 1 && s.n <= 3 ? "border-brand bg-white" : "border-line bg-mist"}`}>
            <div className="flex items-center justify-between">
              <span className={`flex h-7 w-7 items-center justify-center rounded-full text-[12px] font-extrabold ${s.n === 0 ? "bg-black text-white" : "bg-brand text-white"}`}>{s.n}</span>
              <span className="text-[10.5px] font-bold tracking-[0.8px] text-ink-faint">{s.weeks.toUpperCase()}</span>
            </div>
            <div className="mt-3 text-[15px] font-extrabold tracking-[-0.2px]">{s.name}</div>
            <p className="m-0 mt-1.5 text-[13px] leading-[1.5] text-ink-soft">{s.what}</p>
            <div className="mt-auto pt-3">
              <div className="text-[10.5px] font-bold tracking-[1.2px] text-ink-faint">WHAT IT PROVES</div>
              <p className="m-0 mt-0.5 text-[12.5px] leading-[1.5]">{s.proves}</p>
            </div>
          </GlowCard>
        ))}
      </Carousel>
      <div className="mt-3 text-xs text-[#A6A6A6]">
        The pilot ships with a brief that returns in under a second, safety entry points that stay available, and copy in English, Telugu and Hindi.
      </div>
    </div>
  );
}

export function Squad() {
  return (
    <div className="mt-10 sm:mt-16">
      <SectionHeader
        eyebrow="THE SEATS A PILOT NEEDS"
        glyph="team"
        title="Eight seats. Today one person holds all of them."
        lede="A pilot borrows more than it hires. The seats, who covers each, and the reviews on the calendar. Today, every seat is me."
      />
      <Carousel minWidth={270} ariaLabel="The squad">
        {SQUAD.map((r, i) => (
          <GlowCard key={r.role} className={`flex h-full flex-col rounded-2xl border p-5 ${i === 0 ? "border-brand bg-[rgba(39,110,241,.04)]" : "border-line bg-white"}`}>
            <div className="text-[14.5px] font-extrabold tracking-[-0.2px]">{r.role}</div>
            <p className="m-0 mt-1.5 text-[13px] leading-[1.5] text-ink-soft">{r.covers}</p>
            <div className={`mt-auto pt-3 text-[12.5px] leading-[1.5] ${i === 0 ? "font-semibold text-brand" : "text-ink-faint"}`}>{r.source}</div>
          </GlowCard>
        ))}
      </Carousel>
      <div className="mt-5 grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(min(100%,300px),1fr))]">
        <Reveal className="rounded-2xl border border-line bg-mist p-5">
          <div className="text-[11px] font-bold tracking-[1.8px] text-ink-faint">THE REVIEWS ON THE CALENDAR</div>
          <ul className="m-0 mt-3 flex list-none flex-col gap-2 p-0 text-[13px]">
            {GOVERNANCE.map((g) => (
              <li key={g.what} className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5">
                <span>
                  <span className="font-semibold">{g.what}</span> <span className="text-ink-faint">· {g.who}</span>
                </span>
                <span className="rounded-full bg-white px-2 py-0.5 text-[10.5px] font-bold text-ink-soft">{g.when}</span>
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal className="rounded-2xl bg-black p-5 text-white">
          <div className="text-[11px] font-bold tracking-[1.8px] text-[#8FB0FF]">THE LINES THE LAW DRAWS</div>
          <ul className="m-0 mt-3 flex list-none flex-col gap-2 p-0 text-[13px] leading-[1.55] text-[#D6DCE4]">
            {COMPLIANCE.map((c) => (
              <li key={c} className="flex items-start gap-2">
                <span className="mt-[8px] h-1.5 w-1.5 flex-none rounded-full bg-safe" aria-hidden="true" />
                {c}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </div>
  );
}
