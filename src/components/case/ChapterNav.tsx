"use client";

import { useEffect, useState } from "react";

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

export { CHAPTER_ICONS } from "./chapterIcons";
