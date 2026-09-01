"use client";

import { useEffect, useState } from "react";
import { Logo } from "./ui";
import { LIVE_CHAPTERS } from "@/content/case";
import { CHAPTER_ICONS, useActiveChapter } from "./case/ChapterNav";

/* Three zones on web: brand left, the chapter names centred, the prototype
   pill right. On phones the centre collapses to one small icon per chapter,
   with a label that pops up on tap. The bar stays one row and 50px tall,
   because every sticky card deck on the page assumes that height. */

/* The prototype is reached through the pill, so it stays out of the centre links. */
const NAV_CHAPTERS = LIVE_CHAPTERS.filter((c) => c.id !== "prototype");
const CHAPTER_IDS = LIVE_CHAPTERS.map((c) => c.id);

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [active] = useActiveChapter(CHAPTER_IDS);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const iconChapters = NAV_CHAPTERS;

  return (
    <header
      className={`sticky top-0 z-[90] text-white transition-shadow duration-300 ${
        scrolled ? "shadow-[0_10px_30px_rgba(0,0,0,.35)]" : ""
      }`}
      style={{
        background: "rgba(0,0,0,.88)",
        backdropFilter: "blur(14px) saturate(160%)",
        WebkitBackdropFilter: "blur(14px) saturate(160%)",
      }}
    >
      <nav className="mx-auto grid min-h-[50px] max-w-[1240px] grid-cols-[auto_1fr_auto] items-center gap-2 px-3 py-2 sm:px-5">
        {/* brand, always top left */}
        <a href="#top" className="flex items-center gap-1.5 text-white">
          <Logo size={22} />
          {/* four chapter icons plus the pill need the width on the smallest phones, so the wordmark waits for 380px */}
          <span className="hidden text-[12.5px] font-extrabold tracking-[-0.3px] min-[380px]:inline sm:text-lg sm:tracking-[-0.4px]">
            SafeRide Priority
          </span>
        </a>

        {/* web: chapter names, centred */}
        <div className="hidden items-center justify-center gap-0.5 sm:flex" aria-label="Chapters">
          {NAV_CHAPTERS.map((c) => {
            const on = active === c.id;
            return (
              <a
                key={c.id}
                href={`#${c.id}`}
                aria-current={on ? "true" : undefined}
                className={`relative whitespace-nowrap rounded-md px-2.5 py-1.5 text-[13px] font-bold transition-colors md:px-3 ${
                  on ? "text-white" : "text-white/70 hover:text-white"
                }`}
              >
                {c.short}
                <span
                  aria-hidden="true"
                  className={`absolute inset-x-2.5 -bottom-[3px] h-[2px] rounded-full bg-brand transition-opacity duration-200 md:inset-x-3 ${
                    on ? "opacity-100" : "opacity-0"
                  }`}
                />
              </a>
            );
          })}
        </div>

        {/* phone: one icon per chapter, label pops up on tap */}
        <div className="flex items-center justify-end gap-0.5 sm:hidden">
          {iconChapters.map((c) => {
            const on = active === c.id;
            return (
              <a
                key={c.id}
                href={`#${c.id}`}
                aria-label={c.label}
                aria-current={on ? "true" : undefined}
                className={`group relative flex h-[28px] w-[28px] items-center justify-center rounded-full border transition-colors active:bg-white/15 ${
                  on ? "border-brand text-brand" : "border-white/25 text-white"
                }`}
              >
                {CHAPTER_ICONS[c.id]}
                <span className="pointer-events-none absolute left-1/2 top-full mt-1.5 -translate-x-1/2 whitespace-nowrap rounded-md bg-white px-2 py-1 text-[10px] font-bold text-black opacity-0 shadow-[0_4px_12px_rgba(0,0,0,.3)] transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100 group-active:opacity-100">
                  {c.short}
                </span>
              </a>
            );
          })}
        </div>

        {/* the pill, always top right */}
        <a
          href="#prototype"
          className="col-start-3 whitespace-nowrap rounded-full bg-white px-2.5 py-1.5 text-[11px] font-bold text-black transition-all duration-200 hover:bg-brand hover:text-white hover:shadow-[0_6px_20px_rgba(39,110,241,.45)] sm:px-4 sm:text-[13px]"
        >
          <span className="sm:hidden">Prototype</span>
          <span className="hidden sm:inline">Try the prototype</span>
        </a>
      </nav>
    </header>
  );
}
