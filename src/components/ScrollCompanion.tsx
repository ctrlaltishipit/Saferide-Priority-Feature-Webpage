"use client";

import { useEffect, useRef, useState } from "react";

/* The little SafeRide car that drives along the bottom edge as you scroll.
   Driver + passenger visible through the windows; wheels spin while moving. */
export default function ScrollCompanion() {
  const [pct, setPct] = useState(0);
  const [moving, setMoving] = useState(false);
  const raf = useRef<number | null>(null);
  const stopTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => {
      if (raf.current) return;
      raf.current = requestAnimationFrame(() => {
        raf.current = null;
        const max = Math.max(
          1,
          document.documentElement.scrollHeight - window.innerHeight
        );
        setPct(Math.min(1, Math.max(0, window.scrollY / max)));
        setMoving(true);
        if (stopTimer.current) clearTimeout(stopTimer.current);
        stopTimer.current = setTimeout(() => setMoving(false), 240);
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf.current) cancelAnimationFrame(raf.current);
      if (stopTimer.current) clearTimeout(stopTimer.current);
    };
  }, []);

  const play = moving ? "running" : "paused";
  const wheelStyle = {
    transformBox: "fill-box",
    transformOrigin: "50% 50%",
    animation: "spin .55s linear infinite",
    animationPlayState: play,
  } as const;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed -bottom-1 z-[60] w-[clamp(92px,11vw,126px)] transition-[left] duration-100 ease-linear"
      style={{
        left: `calc(${(pct * 100).toFixed(2)}vw - ${(
          pct *
          (Math.min(Math.max(typeof window !== "undefined" ? window.innerWidth * 0.11 : 110, 92), 126) +
            4)
        ).toFixed(1)}px)`,
      }}
    >
      <svg
        viewBox="0 0 190 100"
        className="block w-full"
        style={{ filter: "drop-shadow(0 7px 9px rgba(0,0,0,.28))" }}
      >
        <defs>
          <clipPath id="srWinR">
            <rect x="67" y="36" width="26" height="21" rx="3" />
          </clipPath>
          <clipPath id="srWinF">
            <rect x="100" y="36" width="29" height="21" rx="3" />
          </clipPath>
        </defs>
        <ellipse cx="96" cy="95" rx="76" ry="4" fill="#000" opacity=".14" />
        {/* speed lines */}
        <g style={{ animation: "speedX .5s linear infinite", animationPlayState: play }}>
          <rect x="2" y="50" width="13" height="3" rx="1.5" fill="#C9CED4" />
          <rect x="6" y="62" width="16" height="3" rx="1.5" fill="#C9CED4" />
          <rect x="2" y="74" width="10" height="3" rx="1.5" fill="#C9CED4" />
        </g>
        <g style={{ animation: "bobY .55s ease-in-out infinite", animationPlayState: play }}>
          {/* rooftop beacon */}
          <rect x="86" y="20" width="34" height="13" rx="4.5" fill="#FFFFFF" />
          <text x="103" y="29.5" textAnchor="middle" fontSize="9" fontWeight="700" fill="#000" fontFamily="Helvetica,Arial">
            Uber
          </text>
          <rect x="101" y="32.5" width="4" height="4" fill="#0A0D13" />
          {/* body */}
          <path
            d="M22 82 V68 c0-5.5 3.8-10 9.2-11 l15.5-2.8 15.5-16.5 c3.2-3.4 7.7-5.4 12.4-5.4 h47.8 c4.7 0 9.2 2 12.4 5.4 L150 53.8 l16 2.6 c5.3 .9 9 5.4 9 10.8 V82 z"
            fill="#0A0D13"
          />
          <path d="M64.5 54 L77 40.5 c2-2.2 4.8-3.4 7.8-3.4 h9 V54 z" fill="#1C2534" />
          <path d="M100 36.6 h12.6 c3 0 5.8 1.2 7.8 3.4 L132 53.5 132 54 H100 z" fill="#1C2534" />
          {/* rear window: passenger */}
          <g clipPath="url(#srWinR)">
            <rect x="70" y="50" width="17" height="10" rx="3" fill="#0E8345" />
            <circle cx="79" cy="45" r="5.6" fill="#E8B08A" />
            <path d="M72.6 44.5 a6.4 6.4 0 0112.8 0 v2.2 h-2.4 v-2.8 a4 4 0 00-8 0 v2.8 h-2.4 z" fill="#1F1F1F" />
            <rect x="72" y="44" width="2.8" height="7" rx="1.4" fill="#1F1F1F" />
            <rect x="83.4" y="44" width="2.8" height="7" rx="1.4" fill="#1F1F1F" />
          </g>
          {/* front window: driver */}
          <g clipPath="url(#srWinF)">
            <rect x="104" y="50" width="18" height="10" rx="3" fill="#16264A" />
            <circle cx="112" cy="45" r="5.6" fill="#C68B62" />
            <path d="M105.8 45 a6.3 6.3 0 0112.5 0 v1 h-12.5 z" fill="#276EF1" />
            <rect x="111" y="43.6" width="9.5" height="2.4" rx="1.2" fill="#175BDC" />
            <circle cx="112" cy="41" r="1.4" fill="#FFFFFF" />
            <rect x="117" y="51.5" width="8" height="3" rx="1.5" fill="#C68B62" />
            <circle cx="126.5" cy="53" r="4.6" fill="none" stroke="#4A5568" strokeWidth="2" />
          </g>
          <path d="M96.5 57 v21" stroke="#1B2330" strokeWidth="1.6" />
          <rect x="84" y="61.5" width="9" height="2.6" rx="1.3" fill="#2B3648" />
          <rect x="102" y="61.5" width="9" height="2.6" rx="1.3" fill="#2B3648" />
          <rect x="88" y="56" width="10" height="3.4" rx="1.7" fill="#0E8345" />
          <circle cx="99.5" cy="57.6" r="2.2" fill="#E8B08A" />
          <rect x="131" y="46.5" width="5.5" height="3.4" rx="1.6" fill="#0A0D13" />
          <rect x="130" y="49.5" width="2" height="4" fill="#0A0D13" />
          <path d="M28 78 H166" stroke="#1B2330" strokeWidth="1.6" />
          <rect x="169" y="60" width="6" height="6.5" rx="2" fill="#FFF7DE" />
          <rect x="20" y="60" width="5.5" height="6.5" rx="2" fill="#DE1135" />
          {/* wheels */}
          <g>
            <circle cx="52" cy="84" r="13" fill="#05070B" />
            <g style={wheelStyle}>
              <circle cx="52" cy="84" r="6.8" fill="#8A96A6" />
              <rect x="51" y="77.5" width="2" height="13" rx="1" fill="#05070B" />
              <rect x="45.5" y="83" width="13" height="2" rx="1" fill="#05070B" />
              <circle cx="52" cy="84" r="1.8" fill="#05070B" />
            </g>
          </g>
          <g>
            <circle cx="142" cy="84" r="13" fill="#05070B" />
            <g style={wheelStyle}>
              <circle cx="142" cy="84" r="6.8" fill="#8A96A6" />
              <rect x="141" y="77.5" width="2" height="13" rx="1" fill="#05070B" />
              <rect x="135.5" y="83" width="13" height="2" rx="1" fill="#05070B" />
              <circle cx="142" cy="84" r="1.8" fill="#05070B" />
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
}
