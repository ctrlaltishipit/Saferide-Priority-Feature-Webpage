"use client";

import { useEffect, useState } from "react";
import { Logo } from "./ui";

const links = [
  {
    href: "#case-study",
    label: "Case study",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M5 4h11a3 3 0 013 3v13H8a3 3 0 01-3-3V4z" stroke="currentColor" strokeWidth="1.9" strokeLinejoin="round" />
        <path d="M9 9h6M9 13h6" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    href: "#flow",
    label: "Flow",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="5" cy="12" r="2.4" stroke="currentColor" strokeWidth="1.9" />
        <circle cx="12" cy="5.5" r="2.4" stroke="currentColor" strokeWidth="1.9" />
        <circle cx="19" cy="16" r="2.4" stroke="currentColor" strokeWidth="1.9" />
        <path d="M7 10.5l3-3.2M13.8 7l3.8 7" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    href: "#features",
    label: "Features",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="4" y="4" width="7" height="7" rx="2" stroke="currentColor" strokeWidth="1.9" />
        <rect x="13" y="4" width="7" height="7" rx="2" stroke="currentColor" strokeWidth="1.9" />
        <rect x="4" y="13" width="7" height="7" rx="2" stroke="currentColor" strokeWidth="1.9" />
        <rect x="13" y="13" width="7" height="7" rx="2" stroke="currentColor" strokeWidth="1.9" />
      </svg>
    ),
  },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
      <nav className="mx-auto flex min-h-[50px] max-w-[1240px] items-center justify-between gap-2 px-3 py-2 sm:px-5">
        {/* logo + name, always top left */}
        <a href="#top" className="flex flex-none items-center gap-1.5 text-white">
          <Logo size={22} />
          <span className="text-[12.5px] font-extrabold tracking-[-0.3px] sm:text-lg sm:tracking-[-0.4px]">SafeRide Priority</span>
        </a>

        <div className="flex flex-none items-center gap-1 sm:gap-2.5">
          {/* three icon buttons, web and mobile alike: a label pops up on hover or tap */}
          <div className="flex items-center gap-1 sm:gap-1.5">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                aria-label={l.label}
                className="group relative flex h-[30px] w-[30px] items-center justify-center rounded-full border border-white/25 text-white transition-colors hover:border-brand hover:text-brand active:bg-white/15 sm:h-[34px] sm:w-[34px]"
              >
                {l.icon}
                <span className="pointer-events-none absolute left-1/2 top-full mt-1.5 -translate-x-1/2 whitespace-nowrap rounded-md bg-white px-2 py-1 text-[10px] font-bold text-black opacity-0 shadow-[0_4px_12px_rgba(0,0,0,.3)] transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100 group-active:opacity-100">
                  {l.label}
                </span>
              </a>
            ))}
          </div>
          {/* the pill, always in the top right corner */}
          <a
            href="#prototype"
            className="whitespace-nowrap rounded-full bg-white px-2.5 py-1.5 text-[11px] font-bold text-black transition-all duration-200 hover:bg-brand hover:text-white hover:shadow-[0_6px_20px_rgba(39,110,241,.45)] sm:px-4 sm:text-[13px]"
          >
            Try the prototype
          </a>
        </div>
      </nav>
    </header>
  );
}
