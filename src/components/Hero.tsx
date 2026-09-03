"use client";

import { useEffect, useState } from "react";

const CALLOUT_A = [
  { dot: "#F6BC2F", ring: "rgba(246,188,47,.22)", t: "Elevated contextual risk", sub: "2 plain reasons · tap to see why" },
  { dot: "#06C167", ring: "rgba(6,193,103,.22)", t: "Lower contextual risk", sub: "signals favourable · carry on" },
  { dot: "#A6A6A6", ring: "rgba(166,166,166,.22)", t: "Limited Data", sub: "not enough data, and it says so" },
];
const CALLOUT_B = [
  { k: "SAFETY PRIORITY MATCH", t: "Anil S. · SafeRide eligible · +4 min" },
  { k: "SAFER ANCHOR FOUND", t: "Metro entrance · 180 m · staffed" },
  { k: "TRIP VERIFICATION", t: "PIN 4827 · confirm before boarding" },
];
const CALLOUT_C = [
  { t: "Shared with Ananya & Meera", fg: "#0E8345", bg: "#EAF6EF", border: "#BFE6CE" },
  { t: "Check-in arms 5 min after drop", fg: "#175BDC", bg: "#EFF4FE", border: "#C7D9FB" },
  { t: "Tracking link expires in 30:00", fg: "#7A4E00", bg: "#FFF1D6", border: "#F0DCC8" },
];

function NightCity() {
  return (
    <svg
      viewBox="0 0 560 470"
      className="block h-auto w-full rounded-3xl"
      aria-label="Night city illustration: a car routes toward a staffed metro anchor under a SafeRide shield"
    >
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#060D1F" />
          <stop offset=".55" stopColor="#0E2250" />
          <stop offset="1" stopColor="#1B3D8F" />
        </linearGradient>
        <linearGradient id="rd" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#101826" />
          <stop offset="1" stopColor="#070B12" />
        </linearGradient>
        <radialGradient id="moong" cx=".5" cy=".5" r=".5">
          <stop offset="0" stopColor="#FFF7DE" stopOpacity=".9" />
          <stop offset="1" stopColor="#FFF7DE" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="beam" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#F6BC2F" stopOpacity=".85" />
          <stop offset="1" stopColor="#F6BC2F" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect width="560" height="470" rx="24" fill="url(#sky)" />
      <circle cx="470" cy="74" r="54" fill="url(#moong)" />
      <circle cx="470" cy="74" r="22" fill="#FFF3C4" />
      {/* stars */}
      <circle cx="80" cy="60" r="2" fill="#fff" opacity=".7" style={{ animation: "blink 3.4s ease infinite" }} />
      <circle cx="150" cy="40" r="1.6" fill="#fff" opacity=".5" style={{ animation: "blink 4.2s .6s ease infinite" }} />
      <circle cx="230" cy="70" r="2" fill="#fff" opacity=".6" style={{ animation: "blink 3.8s 1.1s ease infinite" }} />
      <circle cx="330" cy="46" r="1.5" fill="#fff" opacity=".5" style={{ animation: "blink 4.6s .3s ease infinite" }} />
      <circle cx="395" cy="90" r="2" fill="#fff" opacity=".45" style={{ animation: "blink 3.6s 1.6s ease infinite" }} />
      {/* skyline */}
      <rect x="24" y="150" width="70" height="180" fill="#122A63" />
      <rect x="110" y="110" width="86" height="220" fill="#173377" />
      <rect x="212" y="160" width="64" height="170" fill="#122A63" />
      <rect x="292" y="96" width="96" height="234" fill="#173377" />
      <rect x="404" y="150" width="120" height="180" fill="#12285C" />
      <g fill="#F6BC2F">
        <rect x="122" y="128" width="10" height="8" /><rect x="142" y="128" width="10" height="8" />
        <rect x="162" y="150" width="10" height="8" /><rect x="122" y="172" width="10" height="8" />
        <rect x="162" y="194" width="10" height="8" /><rect x="304" y="116" width="11" height="9" />
        <rect x="326" y="116" width="11" height="9" /><rect x="348" y="140" width="11" height="9" />
        <rect x="304" y="164" width="11" height="9" /><rect x="348" y="188" width="11" height="9" />
        <rect x="326" y="212" width="11" height="9" /><rect x="36" y="166" width="9" height="8" />
        <rect x="56" y="190" width="9" height="8" /><rect x="224" y="176" width="9" height="8" />
      </g>
      <g fill="#8FB0FF" opacity=".8">
        <rect x="142" y="150" width="10" height="8" /><rect x="122" y="216" width="10" height="8" />
        <rect x="326" y="164" width="11" height="9" /><rect x="416" y="170" width="10" height="8" />
        <rect x="436" y="194" width="10" height="8" /><rect x="416" y="218" width="10" height="8" />
        <rect x="470" y="170" width="10" height="8" /><rect x="490" y="218" width="10" height="8" />
      </g>
      {/* metro anchor */}
      <g>
        <rect x="424" y="252" width="112" height="78" rx="6" fill="#1E44A0" />
        <rect x="424" y="252" width="112" height="18" rx="6" fill="#276EF1" />
        <rect x="438" y="282" width="18" height="48" fill="#0E2250" />
        <rect x="504" y="282" width="18" height="48" fill="#0E2250" />
        <rect x="460" y="286" width="40" height="44" rx="4" fill="#F6BC2F" opacity=".9" />
        <text x="480" y="266" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff" fontFamily="Helvetica,Arial">METRO</text>
      </g>
      {/* road */}
      <rect x="0" y="330" width="560" height="140" fill="url(#rd)" />
      <rect x="0" y="330" width="560" height="6" fill="#223055" />
      <path d="M20 398 H560" stroke="#F6F6F6" strokeWidth="4" strokeDasharray="26 22" opacity=".8" style={{ animation: "routedash 1.2s linear infinite" }} />
      <path d="M240 372 C320 372 380 348 452 336" fill="none" stroke="#276EF1" strokeWidth="4" strokeLinecap="round" strokeDasharray="10 9" style={{ animation: "routedash 1.4s linear infinite" }} />
      <path d="M480 316 c-9 0 -15 6.5 -15 14.5 c0 10 15 21.5 15 21.5 s15 -11.5 15 -21.5 c0 -8 -6 -14.5 -15 -14.5z" fill="#06C167" />
      <circle cx="480" cy="331" r="5.4" fill="#053B22" />
      {/* car */}
      <g style={{ animation: "floaty 5.5s ease-in-out infinite" }}>
        <ellipse cx="165" cy="404" rx="88" ry="10" fill="#276EF1" opacity=".28" />
        <polygon points="240,370 382,354 382,392 240,392" fill="url(#beam)" style={{ animation: "headl 2.6s ease-in-out infinite" }} />
        <rect x="141" y="322" width="48" height="17" rx="6" fill="#FFFFFF" />
        <text x="165" y="334.5" textAnchor="middle" fontSize="11" fontWeight="700" fill="#000" fontFamily="Helvetica,Arial" letterSpacing="0.2">Uber</text>
        <rect x="162" y="339" width="6" height="6" fill="#FFFFFF" />
        <path d="M86 392 v-17 c0-8 6-14 14-14 h14 l15-19 c3.5-4 8.5-6.5 13.5-6.5 h50 c5 0 10 2.5 13.5 6.5 l15 19 h9 c8 0 14 6 14 14 v17 z" fill="#0A0D13" />
        <path d="M86 377 h158" stroke="#1B2330" strokeWidth="1.5" />
        <path d="M134 360 l11.5-14.5 c2-2.5 5-4 8.5-4 h11 v18.5 z" fill="#8FB4F2" opacity=".95" />
        <path d="M170 341.5 h11 c3.5 0 6.5 1.5 8.5 4 l11.5 14.5 h-31 z" fill="#7FA3E8" opacity=".95" />
        <rect x="167.5" y="341.5" width="4" height="18.5" fill="#0A0D13" />
        <rect x="150" y="366" width="12" height="3.5" rx="1.75" fill="#2B3648" />
        <rect x="182" y="366" width="12" height="3.5" rx="1.75" fill="#2B3648" />
        <rect x="236" y="366" width="9" height="7" rx="2.5" fill="#FFF7DE" />
        <rect x="86" y="366" width="7" height="7" rx="2.5" fill="#DE1135" />
        <circle cx="122" cy="392" r="14" fill="#05070B" /><circle cx="122" cy="392" r="6.5" fill="#8A96A6" /><circle cx="122" cy="392" r="2" fill="#05070B" />
        <circle cx="208" cy="392" r="14" fill="#05070B" /><circle cx="208" cy="392" r="6.5" fill="#8A96A6" /><circle cx="208" cy="392" r="2" fill="#05070B" />
      </g>
      {/* shield */}
      <g style={{ animation: "floaty 6s ease-in-out infinite" }}>
        <circle cx="120" cy="128" r="44" fill="#276EF1" opacity=".16" />
        <path d="M120 92 l30 12 v22 c0 18 -12.5 33 -30 39 c-17.5 -6 -30 -21 -30 -39 v-22 z" fill="#276EF1" />
        <path d="M106 126 l10 10 l19 -21" stroke="#fff" strokeWidth="6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </svg>
  );
}

export default function Hero() {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 3200);
    return () => clearInterval(id);
  }, []);

  const a = CALLOUT_A[tick % 3];
  const b = CALLOUT_B[tick % 3];
  const c = CALLOUT_C[tick % 3];

  return (
    <section
      id="top"
      className="mx-auto grid w-full max-w-[1240px] items-center gap-3 px-5 pb-3 pt-2 sm:gap-10 sm:pb-3 sm:pt-3 [grid-template-columns:repeat(auto-fit,minmax(min(100%,340px),1fr))]"
    >
      <div className="min-w-0" style={{ animation: "riseL .9s ease both" }}>
        <div className="mb-2 inline-flex items-center gap-2 text-[12px] font-semibold">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M12 21s-6.5-5.4-6.5-10.2A6.5 6.5 0 0112 4.5a6.5 6.5 0 016.5 6.3C18.5 15.6 12 21 12 21z" fill="#000" />
            <circle cx="12" cy="10.8" r="2.2" fill="#fff" />
          </svg>
          Hyderabad, IN{" "}
          <span className="font-medium text-ink-faint underline">pilot concept</span>
        </div>
        <h1 className="mb-2.5 text-[26px] font-extrabold leading-[1.05] tracking-[-1.1px] [text-wrap:balance] sm:mb-3 sm:text-[clamp(32px,min(3.7vw,7vh),52px)] sm:tracking-[-1.5px]">
          The late-night ride, planned safer.
        </h1>
        <p className="mb-2.5 max-w-[470px] text-[12.5px] leading-[1.5] text-ink-soft [text-wrap:pretty] sm:mb-3 sm:text-[clamp(14px,1.9vh,15.5px)] sm:leading-[1.6]">
          At midnight in Hyderabad, a woman booking a cab runs her own safety
          check by hand. SafeRide Priority is one toggle inside the Uber app
          that does it for her before the door closes: a plain brief, a safer
          drop point, a driver who has already committed, and a circle that
          knows without asking.
        </p>
        <ul className="mb-2.5 flex max-w-[470px] flex-wrap gap-1 text-[10.5px] font-semibold sm:mb-3 sm:gap-1.5 sm:text-[11.5px]">
          {["8 PM to 5 AM, any hour for emergencies", "Every ride type except Parcel", "Immediate priority for female riders"].map((t) => (
            <li key={t} className="rounded-full border border-line bg-white px-2.5 py-[3px]">
              {t}
            </li>
          ))}
        </ul>
        {/* trip card */}
        <div className="relative max-w-[400px] rounded-[14px] bg-mist px-3.5 py-0.5">
          <div className="absolute bottom-[26px] left-[21px] top-[26px] w-0.5 bg-[#C9CED4]" />
          <div className="flex items-center gap-[11px] py-[6px] sm:py-[7px]">
            <span className="h-2 w-2 flex-none rounded-full bg-black" />
            <span className="min-w-0 text-[13px] font-semibold sm:text-[13.5px]">Cyber Towers, HITEC City</span>
            <span className="ml-auto whitespace-nowrap text-[11px] font-bold text-ink-faint">12:15 AM</span>
          </div>
          <div className="ml-[19px] h-px bg-line" />
          <div className="flex items-center gap-[11px] py-[6px] sm:py-[7px]">
            <span className="h-2 w-2 flex-none bg-black" />
            <span className="min-w-0 text-[13px] font-semibold sm:text-[13.5px]">Kondapur, Residential Lane 4</span>
            <span className="ml-auto whitespace-nowrap text-[11px] font-bold text-safe-dark">anchor found</span>
          </div>
        </div>
        <div className="mt-2.5 flex flex-wrap items-center gap-3 sm:mt-3 sm:gap-3.5">
          <a
            href="#prototype"
            className="inline-flex items-center gap-[9px] rounded-xl bg-black px-4 py-2 text-[13px] font-bold sm:px-5 sm:py-2.5 sm:text-[14px] text-white transition-all duration-200 hover:bg-brand hover:shadow-[0_10px_30px_rgba(39,110,241,.4)]"
          >
            Review my ride plan
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M5 12h14m-6-6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <a
            href="#case-study"
            className="border-b border-black pb-0.5 text-[13.5px] font-semibold sm:text-[14px] transition-colors hover:border-brand hover:text-brand"
          >
            Read the case study
          </a>
        </div>
        <p className="mt-2.5 max-w-[440px] text-[10px] leading-[1.45] text-[#A6A6A6] sm:mt-3 sm:text-[11px]">
          Independent portfolio concept. Not affiliated with, endorsed by, or
          sponsored by Uber. All data and interactions are simulated.
        </p>
      </div>

      <div className="mx-auto w-full max-w-[240px] min-w-0 [perspective:1400px] min-[480px]:max-w-[340px] sm:max-w-none max-sm:[@media(max-height:800px)]:hidden" style={{ animation: "riseR .9s ease both" }}>
        <div className="group relative transition-transform duration-500 [transform-style:preserve-3d] hover:[transform:rotateX(4deg)_rotateY(-7deg)]">
          <NightCity />
          {/* rotating callouts */}
          <div
            key={`a${tick}`}
            className="absolute right-1.5 top-3 flex items-center gap-2.5 rounded-[14px] border border-[#EFEFEF] bg-white/95 px-[15px] py-[11px] shadow-[0_18px_44px_rgba(0,0,0,.32)] backdrop-blur-md"
            style={{ animation: "slideup .55s ease both" }}
          >
            <span
              className="h-[9px] w-[9px] rounded-full"
              style={{ background: a.dot, boxShadow: `0 0 0 4px ${a.ring}` }}
            />
            <div>
              <div className="whitespace-nowrap text-[12.5px] font-extrabold">{a.t}</div>
              <div className="whitespace-nowrap text-[10.5px] text-ink-faint">{a.sub}</div>
            </div>
          </div>
          <div
            key={`b${tick}`}
            className="absolute bottom-[42%] left-1.5 rounded-[14px] border border-[#EFEFEF] bg-white/95 px-[15px] py-[11px] shadow-[0_18px_44px_rgba(0,0,0,.32)] backdrop-blur-md"
            style={{ animation: "slideup .55s ease both" }}
          >
            <div className="whitespace-nowrap text-[10.5px] font-extrabold tracking-[.8px] text-brand-dark">{b.k}</div>
            <div className="mt-[3px] whitespace-nowrap text-[12.5px] font-bold">{b.t}</div>
          </div>
          <div
            key={`c${tick}`}
            className="absolute -bottom-3 right-3.5 flex items-center gap-[9px] rounded-[14px] px-[15px] py-[11px] shadow-[0_16px_36px_rgba(0,0,0,.2)]"
            style={{ background: c.bg, border: `1px solid ${c.border}`, animation: "slideup .55s ease both" }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="9" cy="9" r="3" stroke={c.fg} strokeWidth="2" />
              <path d="M3.8 18c.6-2.7 2.7-4 5.2-4s4.6 1.3 5.2 4" stroke={c.fg} strokeWidth="2" strokeLinecap="round" />
              <path d="M16.5 8.5l2 2 3-3.4" stroke={c.fg} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="whitespace-nowrap text-[12.5px] font-bold" style={{ color: c.fg }}>{c.t}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
