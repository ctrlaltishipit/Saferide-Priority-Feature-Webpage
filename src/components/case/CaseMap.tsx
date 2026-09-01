import { CHAPTERS } from "@/content/case";
import { SectionHeader } from "./primitives";

/* The case at a glance: eight chapters, one card each, with the takeaway a
   reader leaves with. This is what the hero's "Read the case" lands on. */
export default function CaseMap() {
  return (
    <section id="case-study" className="mx-auto max-w-[1240px] scroll-mt-[50px] px-5 pt-12 sm:pt-16">
      <SectionHeader
        eyebrow="THE CASE AT A GLANCE"
        title="Eight chapters, five minutes."
        lede="Each chapter answers one question and ends with a takeaway. Read in order, or jump to the part you care about."
      />
      <ol className="m-0 grid list-none gap-2.5 p-0 [grid-template-columns:repeat(auto-fit,minmax(min(100%,140px),1fr))]">
        {CHAPTERS.filter((c) => c.status === "live").map((c) => (
          <li key={c.id} className="flex">
            <a
              href={`#${c.id}`}
              className="glow flex h-full w-full flex-col rounded-2xl border border-line bg-white p-4 transition-colors hover:border-brand"
            >
              <span className="flex items-center justify-between gap-2">
                <span className="text-[10.5px] font-bold tracking-[1.6px] text-ink-faint">{c.kicker}</span>
                {c.n && (
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-black text-[10px] font-extrabold text-white">{c.n}</span>
                )}
              </span>
              <span className="mt-2 text-[15.5px] font-extrabold tracking-[-0.3px]">{c.label}</span>
              <span className="mt-1 text-[12.5px] leading-[1.5] text-ink-soft">{c.question}</span>
              <span className="mt-3 text-[11.5px] leading-[1.5] text-ink">
                <span className="font-bold">Takeaway: </span>
                {c.verdict}
              </span>
              <span className="mt-auto pt-3 text-xs font-bold text-brand">Jump to chapter ↓</span>
            </a>
          </li>
        ))}
      </ol>
    </section>
  );
}
