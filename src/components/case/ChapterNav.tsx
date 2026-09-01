"use client";

import { useEffect, useState, type ReactNode } from "react";

/* Scroll-spy for the chapter nav: one observer over the chapter sections.
   A band from 20% to 45% of the viewport decides which chapter is "current",
   so exactly one chapter tends to hold it, and the lower one wins on overlap. */
export function useActiveChapter(ids: string[]) {
  const [active, setActive] = useState<string | null>(null);
  const key = ids.join("|");

  useEffect(() => {
    const els = ids.map((id) => document.getElementById(id)).filter((e): e is HTMLElement => !!e);
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        const hits = entries.filter((e) => e.isIntersecting);
        if (!hits.length) return;
        hits.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        setActive(hits[hits.length - 1].target.id);
      },
      { rootMargin: "-20% 0px -55% 0px", threshold: 0 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return [active, setActive] as const;
}

/* One small icon per chapter, for the phone-width nav. */
export const CHAPTER_ICONS: Record<string, ReactNode> = {
  problem: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.9" />
      <path d="M16 16l4.5 4.5" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
      <path d="M11 8v3.5M11 14v.5" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
    </svg>
  ),
  solution: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="7" width="18" height="10" rx="5" stroke="currentColor" strokeWidth="1.9" />
      <circle cx="15" cy="12" r="3" fill="currentColor" />
    </svg>
  ),
  money: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.9" />
      <path d="M9 8.5h6M9 11.5h6M10 8.5c2.6 0 4 1.3 4 3s-1.4 3-4 3l4.5 4" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  "the-case": (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 4v17" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
      <path d="M5 5h12l-2 4 2 4H5" stroke="currentColor" strokeWidth="1.9" strokeLinejoin="round" />
    </svg>
  ),
};
