"use client";

import { useRef, useState } from "react";
import { Reveal } from "../ui";
import { GlowCard } from "./Motion";
import { RoadFigure } from "./Figures";
import { ROADMAP } from "@/content/case";

/* The interactive road: tap Now, Next or Later on the road (or the card
   itself) and that horizon's card lights up and scrolls into view. */
export default function RoadmapClient() {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  const pick = (i: number) => {
    setActive(i);
    refs.current[i]?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "nearest" });
  };

  return (
    <>
      <Reveal className="mb-4 overflow-hidden rounded-2xl bg-mist p-2 sm:p-4">
        <div className="hidden sm:block">
          <RoadFigure labels={ROADMAP.map((h) => h.label)} active={active} onSelect={pick} />
        </div>
        {/* phones read the road top to bottom */}
        <div className="relative overflow-hidden rounded-xl bg-[#111] px-4 py-5 sm:hidden">
          <span
            className="absolute inset-y-5 left-1/2 w-0 -translate-x-1/2 border-l-2 border-dashed border-[#F6BC2F]"
            aria-hidden="true"
            style={{ animation: "dashflow 1.2s linear infinite" }}
          />
          <div className="relative flex flex-col items-center gap-4">
            {ROADMAP.map((h, i) => (
              <button
                key={h.label}
                type="button"
                aria-pressed={active === i}
                onClick={() => pick(i)}
                className={`rounded-full px-6 py-2 text-[14px] font-extrabold transition-colors ${
                  active === i ? "bg-brand text-white" : "bg-white text-black"
                }`}
              >
                {h.label}
              </button>
            ))}
          </div>
        </div>
      </Reveal>
      <div className="grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(min(100%,260px),1fr))]">
        {ROADMAP.map((h, i) => {
          const on = active === i;
          return (
            <Reveal key={h.label} delay={i * 0.07} className="h-full">
              <div
                ref={(el) => {
                  refs.current[i] = el;
                }}
                role="button"
                tabIndex={0}
                aria-pressed={on}
                onClick={() => setActive(i)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setActive(i);
                  }
                }}
                className="h-full cursor-pointer outline-none"
              >
                <GlowCard
                  className={`flex h-full flex-col rounded-2xl border bg-white p-5 transition-all duration-300 ${
                    on ? "border-brand shadow-[0_12px_32px_rgba(39,110,241,.16)]" : "border-line"
                  }`}
                >
                  <div className="flex items-baseline justify-between gap-2">
                    <span className={`text-[clamp(22px,2.4vw,28px)] font-extrabold tracking-[-0.8px] ${on ? "text-brand" : ""}`}>{h.label}</span>
                    <span className="text-[11px] font-bold tracking-[0.6px] text-ink-faint">{h.when.toUpperCase()}</span>
                  </div>
                  <ul className="m-0 mt-3 flex list-none flex-col gap-1.5 p-0 text-[13.5px] leading-[1.5] text-ink-soft">
                    {h.items.map((it) => (
                      <li key={it} className="flex items-start gap-2">
                        <span className={`mt-[8px] h-1.5 w-1.5 flex-none rounded-full ${on ? "bg-brand" : "bg-[#C9CED4]"}`} aria-hidden="true" />
                        {it}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto rounded-xl bg-mist p-3 pt-3">
                    <div className="text-[10.5px] font-bold tracking-[1.2px] text-ink-faint">UNLOCKS WHEN</div>
                    <p className="m-0 mt-0.5 text-[12.5px] leading-[1.5]">{h.unlock}</p>
                  </div>
                </GlowCard>
              </div>
            </Reveal>
          );
        })}
      </div>
    </>
  );
}
