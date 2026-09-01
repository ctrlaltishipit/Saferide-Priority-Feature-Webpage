"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

/* GlowCard: a card whose border lights up where the pointer is. Pure CSS
   does the drawing (.glow in globals.css); this only feeds it the pointer
   position. Touch devices get the plain card. */
export function GlowCard({
  children,
  className = "",
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div
      ref={ref}
      className={`glow ${className}`}
      style={style}
      onPointerMove={(e) => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        el.style.setProperty("--gx", `${e.clientX - r.left}px`);
        el.style.setProperty("--gy", `${e.clientY - r.top}px`);
      }}
    >
      {children}
    </div>
  );
}

/* TiltCard: a light 3D tilt that follows the mouse. Touch and pen are
   ignored so scrolling on a phone never fights the card. */
export function TiltCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reset = () => {
    const el = ref.current;
    if (el) el.style.transform = "";
  };
  return (
    <div
      ref={ref}
      className={`transition-transform duration-200 ease-out [transform-style:preserve-3d] will-change-transform ${className}`}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        el.style.transform = `perspective(900px) rotateX(${(-py * 7).toFixed(2)}deg) rotateY(${(px * 9).toFixed(2)}deg) translateY(-3px)`;
      }}
      onPointerLeave={reset}
      onPointerCancel={reset}
    >
      {children}
    </div>
  );
}

/* Carousel: on phones a snap rail where the card in view pops to full
   opacity and scale; from sm up an ordinary auto-fit grid. The rail scrolls
   inside its own box, so the page itself never scrolls sideways. */
export function Carousel({
  children,
  className = "",
  minWidth = 250,
  ariaLabel,
}: {
  children: ReactNode;
  className?: string;
  minWidth?: number;
  ariaLabel?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const mark = () => {
      const isRail = getComputedStyle(el).display === "flex";
      if (!isRail) {
        Array.from(el.children).forEach((c) => c.classList.add("is-on"));
        return;
      }
      const mid = el.getBoundingClientRect().left + el.clientWidth / 2;
      let best: Element | null = null;
      let bestD = Infinity;
      Array.from(el.children).forEach((c) => {
        const r = c.getBoundingClientRect();
        const d = Math.abs(r.left + r.width / 2 - mid);
        if (d < bestD) {
          bestD = d;
          best = c;
        }
      });
      Array.from(el.children).forEach((c) => c.classList.toggle("is-on", c === best));
    };
    mark();
    el.addEventListener("scroll", mark, { passive: true });
    window.addEventListener("resize", mark);
    return () => {
      el.removeEventListener("scroll", mark);
      window.removeEventListener("resize", mark);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`car ${className}`}
      style={{ ["--car-min" as string]: `${minWidth}px` } as CSSProperties}
      role={ariaLabel ? "region" : undefined}
      aria-label={ariaLabel}
    >
      {children}
    </div>
  );
}
