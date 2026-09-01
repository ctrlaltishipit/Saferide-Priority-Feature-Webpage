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
  intro: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 6c-2-1.6-4.5-2-8-2v14c3.5 0 6 .4 8 2 2-1.6 4.5-2 8-2V4c-3.5 0-6 .4-8 2z" stroke="currentColor" strokeWidth="1.9" strokeLinejoin="round" />
      <path d="M12 6v14" stroke="currentColor" strokeWidth="1.9" />
    </svg>
  ),
  context: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.9" />
      <path d="M4.5 20c1-4 4-6 7.5-6s6.5 2 7.5 6" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
    </svg>
  ),
  research: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.9" />
      <path d="M16 16l4.5 4.5" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
    </svg>
  ),
  design: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 20l4-1 11-11-3-3L5 16l-1 4z" stroke="currentColor" strokeWidth="1.9" strokeLinejoin="round" />
      <path d="M13 8l3 3" stroke="currentColor" strokeWidth="1.9" />
    </svg>
  ),
  prototype: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="6" y="2.5" width="12" height="19" rx="3" stroke="currentColor" strokeWidth="1.9" />
      <path d="M10 18h4" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
    </svg>
  ),
  outcomes: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 20h16" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
      <path d="M7 16v-5M12 16V6M17 16v-8" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
    </svg>
  ),
  conclusion: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 4v17" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
      <path d="M5 5h12l-2 4 2 4H5" stroke="currentColor" strokeWidth="1.9" strokeLinejoin="round" />
    </svg>
  ),
};
