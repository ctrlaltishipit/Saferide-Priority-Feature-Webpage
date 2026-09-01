import { Reveal } from "../ui";
import { SectionHeader } from "./primitives";
import { DOBLIN, NOT_LIST, OPTION_CRITERIA, OPTIONS } from "@/content/case";

/* ────────────────── Chapter 2 additions: the solution ──────────────────
   The options weighed before the concept won, where the innovation sits
   across the ten types, and the not-list. */

const SCORE = { 1: { label: "Low", cls: "bg-[#FDE8EC] text-[#A50D28]" }, 2: { label: "Some", cls: "bg-[#FFF3D6] text-[#7A4E00]" }, 3: { label: "Strong", cls: "bg-[#EAF6EF] text-[#0E8345]" } } as const;

export function OptionsWeighed() {
  return (
    <div className="mt-14 sm:mt-24">
      <SectionHeader
        eyebrow="THE OPTIONS WE WEIGHED"
        title="Four ways to answer the problem. One won."
        lede="The criteria were written before any option was scored: does it cover the fear, does it cover the no-show, how fast can a pilot read out, and how much already exists. The losers are kept, because one of them may return at a pivot."
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
                  <span className="rounded-full bg-brand px-2 py-0.5 text-[10px] font-extrabold tracking-[0.6px] text-white">
                    THE CONCEPT
                  </span>
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
const STATE = {
  innovate: { label: "We innovate here", dot: "#276EF1", cls: "border-brand bg-white" },
  match: { label: "We match the market", dot: "#9AA0A6", cls: "border-line bg-white" },
  skip: { label: "Left alone on purpose", dot: "#E2E2E2", cls: "border-line bg-mist" },
} as const;

export function Doblin() {
  return (
    <div className="mt-14 sm:mt-24">
      <SectionHeader
        eyebrow="WHERE THE INNOVATION SITS"
        title="Six of ten types, and none of them is a new feature."
        lede="A common way to check an idea is to walk it across ten kinds of innovation: four in how the business is set up, two in what it offers, four in how it is experienced. Product performance is the easiest kind to copy, so the case leans on the other nine. SafeRide innovates in six."
      />
      <div className="grid gap-5 [grid-template-columns:repeat(auto-fit,minmax(min(100%,300px),1fr))]">
        {GROUP_ORDER.map((g) => (
          <div key={g}>
            <div className="mb-2 text-[11px] font-bold tracking-[1.8px] text-ink-faint">{g.toUpperCase()}</div>
            <div className="flex flex-col gap-2.5">
              {DOBLIN.filter((d) => d.group === g).map((d, i) => {
                const st = STATE[d.state];
                return (
                  <Reveal key={d.name} delay={i * 0.05} className={`rounded-2xl border p-4 ${st.cls}`}>
                    <div className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full" style={{ background: st.dot }} aria-hidden="true" />
                      <span className="text-[14px] font-extrabold tracking-[-0.2px]">{d.name}</span>
                      <span className="ml-auto text-[10.5px] font-bold text-ink-faint">{st.label}</span>
                    </div>
                    <p className={`m-0 mt-2 text-[13px] leading-[1.55] ${d.state === "skip" ? "text-ink-faint" : "text-ink-soft"}`}>{d.how}</p>
                  </Reveal>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function NotList() {
  return (
    <div className="mt-14 sm:mt-24">
      <SectionHeader
        eyebrow="THE NOT-LIST"
        title="What SafeRide will never build."
        lede="A concept is only as clear as its edges. These are the adjacent things people ask for first, and why each one stays out."
      />
      <div className="grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(min(100%,300px),1fr))]">
        {NOT_LIST.map((n, i) => (
          <Reveal key={n.item} delay={i * 0.04} className="flex gap-3 rounded-2xl bg-black p-5 text-white">
            <span className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-full bg-white/15" aria-hidden="true">
              <svg width="11" height="11" viewBox="0 0 14 14"><path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" /></svg>
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
