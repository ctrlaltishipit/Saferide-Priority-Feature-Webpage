import { CHAPTERS } from "@/content/case";
import { CHAPTER_ICONS } from "./chapterIcons";
import { SectionHeader } from "./primitives";
import { Carousel } from "./Motion";
import { Reveal } from "../ui";

/* The case at a glance: eight stops on one route. Each tile is an icon, a
   name and one line; the takeaways live in the chapters themselves. */
export default function CaseMap() {
  return (
    <section id="case-study" className="mx-auto max-w-[1240px] scroll-mt-[50px] px-5 pt-8 sm:pt-10">
      <SectionHeader
        eyebrow="THE CASE AT A GLANCE"
        title="Eight chapters, five minutes."
        lede="Tap a stop to jump in. Every chapter ends with its takeaway."
      />
      <Reveal>
        <div className="relative">
          {/* the route behind the stops */}
          <svg className="absolute inset-x-8 top-[46px] hidden h-[3px] w-[calc(100%-64px)] sm:block" preserveAspectRatio="none" viewBox="0 0 100 3" aria-hidden="true">
            <line x1="0" y1="1.5" x2="100" y2="1.5" stroke="#E2E2E2" strokeWidth="3" />
            <line x1="0" y1="1.5" x2="100" y2="1.5" stroke="#276EF1" strokeWidth="3" strokeDasharray="2.2 2.8" style={{ animation: "dashflow 1.6s linear infinite" }} />
          </svg>
          <Carousel minWidth={132} ariaLabel="The eight chapters" className="car-sm relative">
            {CHAPTERS.filter((c) => c.status === "live").map((c) => (
              <a
                key={c.id}
                href={`#${c.id}`}
                className="glow group flex h-full flex-col items-center rounded-2xl border border-line bg-white px-3 pb-4 pt-5 text-center transition-all duration-300 hover:-translate-y-1 hover:border-brand hover:shadow-[0_14px_34px_rgba(39,110,241,.14)]"
              >
                <span className="relative flex h-12 w-12 items-center justify-center rounded-full border-2 border-line bg-white text-ink transition-all duration-300 group-hover:border-brand group-hover:bg-brand group-hover:text-white [&_svg]:h-[19px] [&_svg]:w-[19px]">
                  {CHAPTER_ICONS[c.id]}
                  <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-black text-[10px] font-extrabold text-white">
                    {c.n}
                  </span>
                </span>
                <span className="mt-3 text-[14.5px] font-extrabold tracking-[-0.3px]">{c.label}</span>
                <span className="mt-1 text-[11.5px] leading-[1.45] text-ink-faint">{c.question}</span>
                <span className="mt-auto pt-2.5 text-[12px] font-bold text-brand opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                  Jump in ↓
                </span>
              </a>
            ))}
          </Carousel>
        </div>
      </Reveal>
    </section>
  );
}
