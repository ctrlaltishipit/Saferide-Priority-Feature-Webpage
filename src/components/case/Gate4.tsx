import { Reveal } from "../ui";
import { SectionHeader } from "./primitives";
import { ABOUT, ASK, CHAPTERS, IMPACT, ROADMAP, STOP_RULES } from "@/content/case";

/* ────────────────── Chapter 4: the ask ──────────────────
   The road ahead, the ask with its opportunity cost, the stop rules, the
   impact statement, the case in sixty seconds, and how it was built. */

export function Roadmap() {
  return (
    <div>
      <SectionHeader
        eyebrow="THE ROAD, IN THREE HORIZONS"
        title="Now, next, later. Each unlocks on evidence."
        lede="A roadmap with only dates promises output. This one promises learning: every horizon names what has to be true before it starts. The later column stays as themes on purpose."
      />
      <div className="grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(min(100%,260px),1fr))]">
        {ROADMAP.map((h, i) => (
          <Reveal key={h.label} delay={i * 0.07} className={`flex h-full flex-col rounded-2xl border p-5 ${i === 0 ? "border-brand bg-white" : "border-line bg-white"}`}>
            <div className="flex items-baseline justify-between gap-2">
              <span className="text-[clamp(22px,2.4vw,28px)] font-extrabold tracking-[-0.8px]">{h.label}</span>
              <span className="text-[11px] font-bold tracking-[0.6px] text-ink-faint">{h.when.toUpperCase()}</span>
            </div>
            <ul className="m-0 mt-3 flex list-none flex-col gap-1.5 p-0 text-[13.5px] leading-[1.5] text-ink-soft">
              {h.items.map((it) => (
                <li key={it} className="flex items-start gap-2">
                  <span className={`mt-[8px] h-1.5 w-1.5 flex-none rounded-full ${i === 0 ? "bg-brand" : "bg-[#C9CED4]"}`} aria-hidden="true" />
                  {it}
                </li>
              ))}
            </ul>
            <div className="mt-auto rounded-xl bg-mist p-3 pt-3">
              <div className="text-[10.5px] font-bold tracking-[1.2px] text-ink-faint">UNLOCKS WHEN</div>
              <p className="m-0 mt-0.5 text-[12.5px] leading-[1.5]">{h.unlock}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

export function TheAsk() {
  return (
    <div className="mt-14 sm:mt-24">
      <SectionHeader
        eyebrow="THE ASK"
        title="One squad, one quarter, one corridor."
        lede="Small on purpose, bounded on purpose. What we ask for, what it costs the roadmap, and the five things that would make us stop before week eight."
      />
      <div className="grid gap-5 [grid-template-columns:repeat(auto-fit,minmax(min(100%,300px),1fr))]">
        <div className="grid gap-3">
          {ASK.map((a, i) => (
            <Reveal key={a.label} delay={i * 0.05} className="rounded-2xl border border-line bg-white p-5">
              <div className="text-[11px] font-bold tracking-[1.8px] text-brand">{a.label.toUpperCase()}</div>
              <p className="m-0 mt-1.5 text-[14px] leading-[1.55]">{a.line}</p>
            </Reveal>
          ))}
        </div>
        <Reveal className="rounded-2xl bg-black p-6 text-white sm:p-7">
          <div className="text-[11px] font-bold tracking-[1.8px] text-[#FF8FA3]">WHAT WOULD MAKE US STOP</div>
          <p className="m-0 mt-2 text-[13px] leading-[1.55] text-[#A6A6A6]">
            Written before the pilot starts, so nobody argues about them in week six. Any one of these ends the run and files the learning.
          </p>
          <ol className="m-0 mt-4 flex list-none flex-col gap-3 p-0">
            {STOP_RULES.map((s, i) => (
              <li key={s} className="flex items-start gap-3 text-[14px] leading-[1.5]">
                <span className="flex h-6 w-6 flex-none items-center justify-center rounded-full bg-[#DE1135] text-[11px] font-extrabold text-white">{i + 1}</span>
                {s}
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </div>
  );
}

export function Impact() {
  return (
    <div className="mt-14 sm:mt-24">
      <SectionHeader
        eyebrow="THE IMPACT, OWNED HONESTLY"
        title="Who is better off, who could be worse off, and what we do about it."
      />
      <div className="grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(min(100%,280px),1fr))]">
        <Reveal className="rounded-2xl border border-line bg-mist p-6 sm:col-span-2">
          <div className="text-[11px] font-bold tracking-[1.8px] text-safe-dark">WHO IS BETTER OFF</div>
          <p className="m-0 mt-2 text-[clamp(16px,1.8vw,20px)] font-bold leading-[1.45] tracking-[-0.3px]">{IMPACT.who}</p>
        </Reveal>
        <Reveal delay={0.06} className="rounded-2xl border border-[#F0DCC8] bg-[#FFF7EC] p-5">
          <div className="text-[11px] font-bold tracking-[1.8px] text-[#B26205]">WHO COULD BE WORSE OFF</div>
          <p className="m-0 mt-2 text-[13.5px] leading-[1.55] text-[#5A3A00]">{IMPACT.externality}</p>
        </Reveal>
        <Reveal delay={0.12} className="rounded-2xl border border-line bg-white p-5">
          <div className="text-[11px] font-bold tracking-[1.8px] text-brand">WHAT WE DO ABOUT IT</div>
          <p className="m-0 mt-2 text-[13.5px] leading-[1.55] text-ink-soft">{IMPACT.response}</p>
        </Reveal>
        <Reveal delay={0.18} className="rounded-2xl bg-black p-5 text-white sm:col-span-2">
          <div className="text-[11px] font-bold tracking-[1.8px] text-[#8FB0FF]">HOW WE WOULD KNOW</div>
          <p className="m-0 mt-2 text-[13.5px] leading-[1.55] text-[#D6DCE4]">{IMPACT.proxy}</p>
        </Reveal>
      </div>
    </div>
  );
}

export function CaseInSixty() {
  const rows = CHAPTERS.filter((c) => c.n);
  return (
    <div className="mt-14 sm:mt-24">
      <SectionHeader
        eyebrow="THE CASE IN SIXTY SECONDS"
        title="Four questions, four answers."
        lede="If you read nothing else, read these four lines. Each links back to the chapter that earns it."
      />
      <div className="flex flex-col gap-2.5">
        {rows.map((c, i) => (
          <Reveal key={c.id} delay={i * 0.05}>
            <a
              href={`#${c.id}`}
              className="grid items-center gap-x-6 gap-y-2 rounded-2xl border border-line bg-white p-4 transition-colors hover:border-brand sm:grid-cols-[auto_1.2fr_1fr] sm:p-5"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-[13px] font-extrabold text-white">{c.n}</span>
              <span>
                <span className="text-[11px] font-bold tracking-[1.4px] text-ink-faint">{c.label.toUpperCase()}</span>
                <span className="block text-[14.5px] font-bold leading-[1.4] tracking-[-0.2px]">{c.question}</span>
              </span>
              <span className="text-[13.5px] leading-[1.5] text-ink-soft">
                <span className="font-extrabold text-ink">Verdict: </span>
                {c.verdict}
              </span>
            </a>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

export function AboutThisCase() {
  return (
    <div className="mt-14 sm:mt-24">
      <SectionHeader
        eyebrow="HOW THIS CASE WAS BUILT"
        size="h3"
        title="Problem first. Rules before screens. Evidence with its tags on."
      />
      <Reveal className="rounded-2xl border border-line bg-mist p-5 sm:p-6">
        <ol className="m-0 flex list-none flex-col gap-3 p-0">
          {ABOUT.map((a, i) => (
            <li key={i} className="flex gap-3 text-[13.5px] leading-[1.6] text-ink-soft">
              <span className="mt-0.5 flex h-[22px] w-[22px] flex-none items-center justify-center rounded-full bg-brand text-[11px] font-extrabold text-white">{i + 1}</span>
              {a}
            </li>
          ))}
        </ol>
      </Reveal>
    </div>
  );
}
