"use client";

import { useEffect, useState } from "react";
import { Logo } from "./ui";

const links = [
  { href: "#case-study", label: "Case study" },
  { href: "#flow", label: "Flow" },
  { href: "#features", label: "Features" },
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
      <nav className="mx-auto flex min-h-[44px] max-w-[1240px] flex-wrap items-center justify-between gap-x-[18px] gap-y-3 px-5 py-2.5">
        <a
          href="#top"
          className="flex min-w-[130px] flex-1 items-center gap-[9px] text-white"
        >
          <Logo size={26} />
          <span className="text-xl font-extrabold tracking-[-0.5px]">
            SafeRide
          </span>
        </a>
        <div className="flex flex-initial justify-center gap-[clamp(14px,2.4vw,26px)] text-[13.5px] font-semibold">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="whitespace-nowrap text-white transition-colors hover:text-brand"
            >
              {l.label}
            </a>
          ))}
        </div>
        <div className="flex min-w-[130px] flex-1 justify-end">
          <a
            href="#prototype"
            className="whitespace-nowrap rounded-full bg-white px-4 py-[9px] text-[13.5px] font-bold text-black transition-all duration-200 hover:bg-brand hover:text-white hover:shadow-[0_6px_20px_rgba(39,110,241,.45)]"
          >
            Try the prototype
          </a>
        </div>
      </nav>
    </header>
  );
}
