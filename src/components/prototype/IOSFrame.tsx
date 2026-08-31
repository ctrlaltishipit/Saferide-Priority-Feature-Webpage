"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/* iOS 26 style status bar (time · signal · wifi · battery). */
function StatusBar({ time = "12:14" }: { time?: string }) {
  const c = "#000";
  return (
    /* Time pinned to the top-left corner, signal/wifi/battery pinned to the
       top-right. The centre stays empty so the dynamic island never covers
       either side. */
    <div className="relative z-20 box-border flex w-full items-center justify-between pb-[19px] pl-[30px] pr-[26px] pt-[21px]">
      <div className="flex h-[22px] items-center pt-[1.5px]">
        <span className="text-[17px] font-semibold leading-[22px]" style={{ color: c }}>
          {time}
        </span>
      </div>
      <div className="flex h-[22px] items-center gap-[7px] pt-px">
        <svg width="19" height="12" viewBox="0 0 19 12">
          <rect x="0" y="7.5" width="3.2" height="4.5" rx="0.7" fill={c} />
          <rect x="4.8" y="5" width="3.2" height="7" rx="0.7" fill={c} />
          <rect x="9.6" y="2.5" width="3.2" height="9.5" rx="0.7" fill={c} />
          <rect x="14.4" y="0" width="3.2" height="12" rx="0.7" fill={c} />
        </svg>
        <svg width="17" height="12" viewBox="0 0 17 12">
          <path d="M8.5 3.2C10.8 3.2 12.9 4.1 14.4 5.6L15.5 4.5C13.7 2.7 11.2 1.5 8.5 1.5C5.8 1.5 3.3 2.7 1.5 4.5L2.6 5.6C4.1 4.1 6.2 3.2 8.5 3.2Z" fill={c} />
          <path d="M8.5 6.8C9.9 6.8 11.1 7.3 12 8.2L13.1 7.1C11.8 5.9 10.2 5.1 8.5 5.1C6.8 5.1 5.2 5.9 3.9 7.1L5 8.2C5.9 7.3 7.1 6.8 8.5 6.8Z" fill={c} />
          <circle cx="8.5" cy="10.5" r="1.5" fill={c} />
        </svg>
        <svg width="27" height="13" viewBox="0 0 27 13">
          <rect x="0.5" y="0.5" width="23" height="12" rx="3.5" stroke={c} strokeOpacity="0.35" fill="none" />
          <rect x="2" y="2" width="20" height="9" rx="2" fill={c} />
          <path d="M25 4.5V8.5C25.8 8.2 26.5 7.2 26.5 6.5C26.5 5.8 25.8 4.8 25 4.5Z" fill={c} fillOpacity="0.4" />
        </svg>
      </div>
    </div>
  );
}

/* Device bezel: dynamic island, status bar, home indicator. Fixed 402×874 canvas. */
export function IOSDevice({ children }: { children: ReactNode }) {
  return (
    <div
      className="relative overflow-hidden antialiased"
      style={{
        width: 402,
        height: 874,
        borderRadius: 48,
        background: "#F2F2F7",
        boxShadow: "0 40px 80px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.14)",
        fontFamily: '-apple-system, system-ui, sans-serif',
      }}
    >
      <div className="absolute left-1/2 top-[11px] z-50 h-[37px] w-[126px] -translate-x-1/2 rounded-3xl bg-black" />
      <div className="absolute inset-x-0 top-0 z-10">
        <StatusBar />
      </div>
      <div className="flex h-full flex-col">{children}</div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[60] flex h-[34px] items-end justify-center pb-2">
        <div className="h-[5px] w-[139px] rounded-full bg-black/25" />
      </div>
    </div>
  );
}

/* Scales the fixed-size device to the viewer's screen. Width always
   caps the scale. On screens 1024px and wider, `reserve` says how much
   vertical room the section heading and controls need: the phone then
   shrinks so heading, phone and a little air below all share one view,
   on any laptop or monitor, with no scrolling to see the bottom half. */
export function PhoneScaler({
  children,
  reserve = 0,
}: {
  children: ReactNode;
  reserve?: number;
}) {
  const outer = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.6);

  useEffect(() => {
    const el = outer.current;
    if (!el) return;
    const measure = () => {
      const avail = el.parentElement?.clientWidth ?? 402;
      const wScale = Math.max(0.55, Math.min(1, avail / 402));
      let s = wScale;
      if (reserve > 0 && window.innerWidth >= 1024) {
        const hScale = (window.innerHeight - reserve) / 874;
        s = Math.min(wScale, Math.max(0.4, Math.min(0.78, hScale)));
      }
      setScale(s);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el.parentElement ?? el);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [reserve]);

  return (
    <div ref={outer} style={{ width: 402 * scale }}>
      <div
        style={{
          width: 402,
          height: 874,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
          marginBottom: (scale - 1) * 874,
        }}
      >
        {children}
      </div>
    </div>
  );
}
