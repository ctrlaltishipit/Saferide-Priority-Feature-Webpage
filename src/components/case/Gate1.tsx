import { Reveal } from "../ui";
import { SectionHeader, SourceSnippet, Tag } from "./primitives";
import { Carousel } from "./Motion";
import {
  CONSTRAINTS,
  DECISION,
  GAP_ROWS,
  JOBS,
  PERSONAS,
  STAKEHOLDERS,
  WHY_NOW,
  WHY_UBER_FIRST,
} from "@/content/case";

/* ────────────────────── Chapter 1 blocks: the problem ──────────────────────
   Who decides, who we build for, the jobs she does by hand, why now, the
   bridge from pain to metric, and the lines we never cross. */

const initials = (name: string) =>
  name
    .replace(/,.*$/, "")
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

export function WhoDecides() {
  return (
    <div>
      <SectionHeader
        eyebrow="WHO THIS CASE IS FOR"
        glyph="room"
        size="h3"
        title="Written backwards from the room that decides."
        lede="Before any research, I named the reader, the decision and what done looks like."
      />
      <div className="grid gap-3.5 [grid-template-columns:repeat(auto-fit,minmax(min(100%,260px),1fr))]">
        {DECISION.map((d, i) => (
          <div key={d.label} className="sticky sm:static" style={{ top: 64 + i * 8, zIndex: i + 1 }}>
            <Reveal delay={i * 0.08} className="h-full">
              <div className={`flex h-full flex-col rounded-2xl p-6 ${i === 1 ? "bg-black text-white" : "border border-line bg-mist"}`}>
                <div className={`text-[11px] font-bold tracking-[1.8px] ${i === 1 ? "text-[#8FB0FF]" : "text-brand"}`}>{d.label}</div>
                <div className="mt-3 text-[17px] font-extrabold leading-[1.3] tracking-[-0.3px]">{d.title}</div>
                <p className={`m-0 mt-2 text-[13.5px] leading-[1.6] ${i === 1 ? "text-[#C9C9C9]" : "text-ink-soft"}`}>{d.text}</p>
                {d.note && <div className="mt-auto pt-4 text-[11.5px] text-[#8f8f8f]">{d.note}</div>}
              </div>
            </Reveal>
          </div>
        ))}
      </div>
      <Reveal className="mt-5">
        <div className="mb-2 text-[11px] font-bold tracking-[1.8px] text-ink-faint">EVERYONE ELSE WITH A STAKE</div>
        <div className="flex flex-wrap gap-2">
          {STAKEHOLDERS.map((s) => (
            <span key={s.name} className="rounded-full border border-line bg-white px-3.5 py-2 text-[12.5px] font-semibold">
              {s.name} <span className="font-normal text-ink-faint">· {s.stake}</span>
            </span>
          ))}
        </div>
      </Reveal>
    </div>
  );
}

export function Personas() {
  return (
    <div className="mt-10 sm:mt-16">
      <SectionHeader
        eyebrow="WHO IS IN THE CAR"
        glyph="people"
        title="Four people, one night ride."
        lede="The rider is the user. Her contact carries the worry. The driver decides whether the ride comes."
      />
      <div className="grid gap-3.5 [grid-template-columns:repeat(auto-fit,minmax(min(100%,250px),1fr))]">
        {PERSONAS.map((p, i) => (
          <div key={p.name} className="sticky sm:static" style={{ top: 64 + i * 8, zIndex: i + 1 }}>
            <Reveal delay={i * 0.08} className="h-full">
              <div className="flex h-full flex-col rounded-2xl border border-line bg-white p-6 shadow-[0_2px_10px_rgba(0,0,0,0.04)]">
                <div className="flex items-center gap-3">
                  <span
                    className="flex h-10 w-10 flex-none items-center justify-center rounded-full text-[13px] font-extrabold text-white"
                    style={{ background: p.accent }}
                    aria-hidden="true"
                  >
                    {initials(p.name)}
                  </span>
                  <div className="min-w-0">
                    <div className="text-[16px] font-extrabold tracking-[-0.3px]">{p.name}</div>
                    <div className="mt-0.5 inline-block rounded-full bg-mist px-2 py-0.5 text-[10px] font-bold tracking-[0.6px] text-ink-faint">{p.tag}</div>
                  </div>
                </div>
                <p className="m-0 mt-3 text-[13px] leading-[1.55] text-ink-soft">{p.who}</p>
                <dl className="m-0 mt-4 flex flex-col gap-3 text-[13px] leading-[1.55]">
                  <div>
                    <dt className="text-[10.5px] font-bold tracking-[1.4px] text-ink-faint">TONIGHT</dt>
                    <dd className="m-0 mt-0.5 text-ink-soft">{p.tonight}</dd>
                  </div>
                  <div>
                    <dt className="text-[10.5px] font-bold tracking-[1.4px] text-ink-faint">THE WORKAROUND TODAY</dt>
                    <dd className="m-0 mt-0.5 text-ink-soft">{p.workaround}</dd>
                  </div>
                  <div className="mt-auto rounded-xl bg-mist p-3">
                    <dt className="text-[10.5px] font-bold tracking-[1.4px] text-brand">THE JOB TO BE DONE</dt>
                    <dd className="m-0 mt-1 font-semibold text-ink">{p.job}</dd>
                  </div>
                </dl>
              </div>
            </Reveal>
          </div>
        ))}
      </div>
      <div className="mt-3 text-xs text-[#A6A6A6]">Composite personas from the reports and reviews in this chapter. Names are fictional.</div>
    </div>
  );
}

export function Jobs() {
  return (
    <div className="mt-8 sm:mt-12">
      <SectionHeader
        eyebrow="THE JOBS SHE DOES BY HAND"
        glyph="list"
        size="h3"
        title="Six jobs, every night, all manual."
        lede="A job is the progress a person wants to make, in her words. The toggle in chapter 5 competes for these six."
      />
      <ol className="m-0 flex list-none flex-col gap-2.5 p-0">
        {JOBS.map((j, i) => (
          <Reveal
            key={j.when}
            delay={i * 0.04}
            className="grid gap-x-6 gap-y-2 rounded-2xl border border-line bg-white p-4 [grid-template-columns:repeat(auto-fit,minmax(min(100%,220px),1fr))]"
          >
            <div>
              <div className="text-[10.5px] font-bold tracking-[1.2px] text-ink-faint">WHEN</div>
              <div className="mt-0.5 text-[13.5px] font-extrabold tracking-[-0.2px]">{j.when}</div>
            </div>
            <div>
              <div className="text-[10.5px] font-bold tracking-[1.2px] text-ink-faint">I WANT</div>
              <div className="mt-0.5 text-[13.5px] text-ink">{j.want.replace(/^I want /, "")}</div>
            </div>
            <div>
              <div className="text-[10.5px] font-bold tracking-[1.2px] text-ink-faint">SO THAT</div>
              <div className="mt-0.5 text-[13.5px] text-ink-soft">{j.soThat.replace(/^so /, "")}</div>
            </div>
          </Reveal>
        ))}
      </ol>
    </div>
  );
}

export function WhyNow() {
  return (
    <div className="mt-10 sm:mt-16">
      <SectionHeader
        eyebrow="WHY NOW, AND WHY UBER FIRST"
        glyph="window"
        title="The window opened this year."
        lede="Four things changed recently. Each leaves the same minutes empty: the ones before the booking."
      />
      <Carousel minWidth={260} ariaLabel="Why now">
        {WHY_NOW.map((w, i) => (
          <div key={w.title} className="sticky sm:static" style={{ top: 64 + i * 8, zIndex: i + 1 }}>
            <Reveal delay={i * 0.07} className="h-full">
              <div className="flex h-full flex-col rounded-2xl border border-line bg-mist p-6">
                <span className="flex h-[22px] w-[22px] items-center justify-center rounded-full bg-brand text-[11px] font-extrabold text-white">{i + 1}</span>
                <div className="mt-3 text-[16px] font-extrabold leading-[1.3] tracking-[-0.3px]">{w.title}</div>
                <p className="m-0 mt-2 text-[13.5px] leading-[1.6] text-ink-soft">{w.text}</p>
                <div className="mt-auto pt-4">
                  <SourceSnippet url={w.sourceUrl} compact />
                </div>
              </div>
            </Reveal>
          </div>
        ))}
      </Carousel>
      <Reveal className="mt-4 rounded-2xl bg-black p-5 text-[14px] font-semibold leading-[1.55] text-white sm:p-6">{WHY_UBER_FIRST}</Reveal>
    </div>
  );
}

export function GapToMetric() {
  return (
    <div className="mt-10 sm:mt-16">
      <SectionHeader
        eyebrow="FROM PAIN TO NUMBER"
        glyph="bridge"
        title="Every pain sits on a metric Uber already tracks."
        lede="No rupee figure yet. Each pain suppresses a number Uber already measures; stage 1 pulls the baseline."
      />
      <div className="hidden gap-4 px-5 pb-2 text-[11px] font-bold tracking-[1.8px] text-ink-faint sm:grid sm:grid-cols-[1.1fr_1fr_1.1fr]">
        <div>THE PAIN</div>
        <div>THE METRIC IT SUPPRESSES TODAY</div>
        <div>WHAT SAFERIDE WOULD MOVE</div>
      </div>
      <div className="flex flex-col gap-2.5">
        {GAP_ROWS.map((r, i) => (
          <Reveal key={r.pain} delay={i * 0.04} className="grid gap-3 rounded-2xl border border-line bg-white p-5 sm:grid-cols-[1.1fr_1fr_1.1fr] sm:gap-4">
            <div>
              <div className="text-[10.5px] font-bold tracking-[1.2px] text-ink-faint sm:hidden">THE PAIN</div>
              <div className="text-[14px] font-extrabold tracking-[-0.2px]">{r.pain}</div>
              <div className="mt-0.5 text-[12.5px] text-ink-faint">{r.painNote}</div>
            </div>
            <div>
              <div className="text-[10.5px] font-bold tracking-[1.2px] text-ink-faint sm:hidden">THE METRIC IT SUPPRESSES TODAY</div>
              <div className="text-[13.5px] leading-[1.55] text-ink-soft">{r.baseline}</div>
            </div>
            <div>
              <div className="text-[10.5px] font-bold tracking-[1.2px] text-ink-faint sm:hidden">WHAT SAFERIDE WOULD MOVE</div>
              <div className="text-[13.5px] leading-[1.55] text-ink">{r.kpi}</div>
              <Tag kind="hypothesis" className="mt-2" />
            </div>
          </Reveal>
        ))}
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-[#A6A6A6]">
        <Tag kind="hypothesis" /> marks a target the pilot would test. Never a result.
      </div>
    </div>
  );
}

export function Constraints() {
  return (
    <div className="mt-8 sm:mt-12">
      <SectionHeader
        eyebrow="THE LINES I DO NOT CROSS"
        glyph="lines"
        size="h3"
        title="Fixed before the first screen was drawn."
        lede="Constraints found late restart a case. These were set on day one."
      />
      <Reveal className="flex flex-wrap gap-2">
        {CONSTRAINTS.map((c) => (
          <span key={c} className="rounded-full bg-black px-3.5 py-2 text-[12.5px] font-semibold text-white">
            {c}
          </span>
        ))}
      </Reveal>
    </div>
  );
}
