"use client";

import { useEffect, useRef, type ReactNode, type CSSProperties } from "react";

/* Scroll-reveal wrapper: adds .in when the element enters the viewport. */
export function Reveal({
  children,
  variant = "up",
  delay = 0,
  className = "",
  style,
  as: Tag = "div",
}: {
  children: ReactNode;
  variant?: "up" | "left" | "right" | "scale";
  delay?: number;
  className?: string;
  style?: CSSProperties;
  as?: "div" | "section" | "figure";
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const variantClass =
    variant === "left"
      ? "reveal reveal-left"
      : variant === "right"
        ? "reveal reveal-right"
        : variant === "scale"
          ? "reveal reveal-scale"
          : "reveal";

  return (
    <Tag
      ref={ref as never}
      className={`${variantClass} ${className}`}
      style={{ ...style, ["--reveal-delay" as string]: `${delay}s` }}
    >
      {children}
    </Tag>
  );
}

/* SafeRide Priority shield logomark. */
export function Logo({ size = 26 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 190 190" aria-hidden="true">
      <rect x="15" y="15" width="160" height="160" rx="38" fill="#FFFFFF" />
      <path
        d="M95 45 l38 15 v26 c0 25 -16.5 45.5 -38 55 c-21.5 -9.5 -38 -30 -38 -55 v-26 z"
        fill="none"
        stroke="#000"
        strokeWidth="10"
        strokeLinejoin="round"
      />
      <circle cx="102" cy="72" r="11" fill="#276EF1" />
    </svg>
  );
}

/* Small event bus so the flow cards / rail / tour can drive the prototype. */
export const JUMP_EVENT = "saferide:jump";

export interface JumpDetail {
  n: number;
  auto: boolean;
}

export function jumpToStep(step: number, auto = false) {
  window.dispatchEvent(
    new CustomEvent<JumpDetail>(JUMP_EVENT, { detail: { n: step, auto } })
  );
  if (!auto) {
    document.getElementById("prototype")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}
