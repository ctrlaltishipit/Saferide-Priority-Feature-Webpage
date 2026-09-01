import { CHAPTERS } from "@/content/case";
import { SectionHeader } from "./primitives";

/* The case at a glance: one card per chapter with its gate question and
   verdict. Doubles as the table of contents, and is what "Read the case
   study" and the nav's case-study link land on. Chapters that are not
   built yet render as "Coming next" without a link. */
export default function CaseMap() {
  return (
    <section id="case-study" className="mx-auto max-w-[1240px] scroll-mt-[50px] px-5 pt-12 sm:pt-16">
      <SectionHeader
        eyebrow="THE CASE AT A GLANCE"
        title="Four questions, asked in order."
        lede="A business case is an argument built from evidence. Each chapter answers one question and ends with a gate: what we know, what we assume, and what would clear it. Jump to any chapter from here."
      />
      <ol className="m-0 grid list-none gap-2.5 p-0 [grid-template-columns:repeat(auto-fit,minmax(min(100%,170px),1fr))]">
        {CHAPTERS.map((c) => {
          const live = c.status === "live";
          const inner = (
            <>
              <span className="flex items-center justify-between gap-2">
                <span className="text-[10.5px] font-bold tracking-[1.6px] text-ink-faint">{c.kicker}</span>
                {c.n && (
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-black text-[10px] font-extrabold text-white">
                    {c.n}
                  </span>
                )}
              </span>
              <span className="mt-2 text-[15.5px] font-extrabold tracking-[-0.3px]">{c.label}</span>
              <span className="mt-1 text-[12.5px] leading-[1.5] text-ink-soft">{c.question}</span>
              <span className={`mt-3 text-[11.5px] leading-[1.5] ${live ? "text-ink" : "text-ink-faint"}`}>
                <span className="font-bold">{live ? "Verdict: " : ""}</span>
                {live ? c.verdict : "Coming next."}
              </span>
              <span className={`mt-auto pt-3 text-xs font-bold ${live ? "text-brand" : "text-ink-faint"}`}>
                {live ? "Jump to chapter ↓" : "Not built yet"}
              </span>
            </>
          );
          const cls = "flex h-full w-full flex-col rounded-2xl border border-line bg-white p-4";
          return (
            <li key={c.id} className="flex">
              {live ? (
                <a
                  href={`#${c.id}`}
                  className={`${cls} transition-all duration-300 hover:-translate-y-1 hover:border-brand hover:shadow-[0_14px_34px_rgba(0,0,0,.08)]`}
                >
                  {inner}
                </a>
              ) : (
                <div className={`${cls} opacity-60`}>{inner}</div>
              )}
            </li>
          );
        })}
      </ol>
    </section>
  );
}
