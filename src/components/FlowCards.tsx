"use client";

import type { ReactNode } from "react";
import { jumpToStep } from "./ui";

const svgProps = { viewBox: "0 0 160 84", className: "h-[78px] w-[82%]", "aria-hidden": true } as const;

const VISUALS: ReactNode[] = [
  // 1 · booking form
  <svg key="v1" {...svgProps}>
    <rect x="6" y="14" width="104" height="20" rx="10" fill="#1C1C1C" />
    <circle cx="18" cy="24" r="4" fill="#fff" />
    <rect x="30" y="20" width="60" height="8" rx="4" fill="#3A3A3A" />
    <rect x="6" y="44" width="104" height="20" rx="10" fill="#1C1C1C" />
    <rect x="14" y="50" width="8" height="8" fill="#fff" />
    <rect x="30" y="50" width="48" height="8" rx="4" fill="#3A3A3A" />
    <rect x="122" y="24" width="34" height="18" rx="9" fill="#276EF1" />
    <circle cx="147" cy="33" r="7" fill="#fff" />
    <rect x="122" y="52" width="34" height="6" rx="3" fill="#3A3A3A" />
  </svg>,
  // 2 · gauge
  <svg key="v2" {...svgProps}>
    <path d="M30 66 A50 50 0 01130 66" fill="none" stroke="#2A2A2A" strokeWidth="10" strokeLinecap="round" />
    <path d="M30 66 A50 50 0 0180 18" fill="none" stroke="#06C167" strokeWidth="10" strokeLinecap="round" />
    <path d="M80 18 A50 50 0 01116 32" fill="none" stroke="#F6BC2F" strokeWidth="10" strokeLinecap="round" />
    <g style={{ transformOrigin: "80px 66px", animation: "gaugeSweep 3.4s ease-in-out infinite" }}>
      <rect x="77" y="26" width="6" height="40" rx="3" fill="#fff" />
    </g>
    <circle cx="80" cy="66" r="7" fill="#fff" />
  </svg>,
  // 3 · anchors map
  <svg key="v3" {...svgProps}>
    <path d="M0 60 H160" stroke="#2A2A2A" strokeWidth="8" />
    <path d="M60 0 V84" stroke="#2A2A2A" strokeWidth="6" />
    <path d="M20 60 C50 56 60 40 84 34" fill="none" stroke="#276EF1" strokeWidth="3" strokeDasharray="7 6" style={{ animation: "dashflow 1.4s linear infinite" }} />
    <rect x="80" y="24" width="12" height="12" fill="#fff" />
    <circle cx="118" cy="30" r="9" fill="#06C167" />
    <text x="118" y="34" textAnchor="middle" fontSize="10" fontWeight="800" fill="#00250F" fontFamily="Helvetica">1</text>
    <circle cx="138" cy="52" r="9" fill="#06C167" />
    <text x="138" y="56" textAnchor="middle" fontSize="10" fontWeight="800" fill="#00250F" fontFamily="Helvetica">2</text>
  </svg>,
  // 4 · driver match
  <svg key="v4" {...svgProps}>
    <rect x="8" y="16" width="66" height="52" rx="10" fill="#1C1C1C" />
    <rect x="86" y="16" width="66" height="52" rx="10" fill="#0D1B36" stroke="#276EF1" strokeWidth="2" />
    <circle cx="26" cy="34" r="8" fill="#3A3A3A" />
    <rect x="40" y="28" width="26" height="6" rx="3" fill="#3A3A3A" />
    <rect x="16" y="50" width="30" height="6" rx="3" fill="#2A2A2A" />
    <circle cx="104" cy="34" r="8" fill="#276EF1" />
    <rect x="118" y="28" width="26" height="6" rx="3" fill="#3E5FA8" />
    <rect x="94" y="50" width="44" height="8" rx="4" fill="#276EF1" />
  </svg>,
  // 5 · circle
  <svg key="v5" {...svgProps}>
    <circle cx="80" cy="40" r="13" fill="#fff" />
    <circle cx="30" cy="24" r="10" fill="#06C167" />
    <circle cx="132" cy="22" r="10" fill="#06C167" />
    <circle cx="120" cy="64" r="10" fill="#2A2A2A" />
    <path d="M42 30 L67 37" stroke="#06C167" strokeWidth="2.5" strokeDasharray="5 5" style={{ animation: "dashflow 1.3s linear infinite" }} />
    <path d="M122 26 L93 36" stroke="#06C167" strokeWidth="2.5" strokeDasharray="5 5" style={{ animation: "dashflow 1.3s linear infinite" }} />
    <path d="M112 58 L92 47" stroke="#3A3A3A" strokeWidth="2.5" strokeDasharray="5 5" />
  </svg>,
  // 6 · on trip
  <svg key="v6" {...svgProps}>
    <path d="M0 62 H160" stroke="#2A2A2A" strokeWidth="10" />
    <path d="M8 62 H152" stroke="#fff" strokeWidth="2.5" strokeDasharray="12 12" style={{ animation: "routedash 1.1s linear infinite" }} />
    <g style={{ animation: "floaty 4.5s ease-in-out infinite" }}>
      <rect x="52" y="34" width="52" height="20" rx="7" fill="#fff" />
      <rect x="62" y="26" width="30" height="12" rx="5" fill="#fff" />
      <circle cx="64" cy="56" r="6" fill="#000" stroke="#fff" strokeWidth="2.5" />
      <circle cx="92" cy="56" r="6" fill="#000" stroke="#fff" strokeWidth="2.5" />
    </g>
    <rect x="118" y="18" width="30" height="14" rx="7" fill="#DE1135" />
    <text x="133" y="28" textAnchor="middle" fontSize="9" fontWeight="800" fill="#fff" fontFamily="Helvetica">SOS</text>
  </svg>,
  // 7 · check-in
  <svg key="v7" {...svgProps}>
    <circle cx="80" cy="42" r="26" fill="#06C167" opacity=".15" />
    <circle cx="80" cy="42" r="26" fill="none" stroke="#06C167" strokeWidth="3" />
    <path d="M68 43 l8 8 l17 -19" stroke="#06C167" strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="126" cy="24" r="3" fill="#06C167" style={{ animation: "blink 1.6s ease infinite" }} />
    <circle cx="38" cy="60" r="3" fill="#06C167" style={{ animation: "blink 2s .4s ease infinite" }} />
  </svg>,
];

export const STEP_NAMES = [
  { n: "1", title: "Demo Booking", desc: "Trip, why this ride, SafeRide toggle" },
  { n: "2", title: "Contextual Safety Brief", desc: "Category, reasons, confidence" },
  { n: "3", title: "Safer Anchors", desc: "Visible, staffed drop alternatives" },
  { n: "4", title: "Safety Priority Match", desc: "Standard vs eligible driver trade-off" },
  { n: "5", title: "Safety Circle", desc: "Contacts, policy, explicit consent" },
  { n: "6", title: "Active Trip", desc: "Toolkit + simulated progress" },
  { n: "7", title: "Arrival Check-In", desc: "Neutral close of the loop" },
];

const FLOW_META = [
  { tag: "BOOKING", tagColor: "#A6A6A6", desc: "Sample Hyderabad pickup, drop and time, plus the opt-in SafeRide toggle." },
  { tag: "GUIDANCE", tagColor: "#F6BC2F", desc: "A clear category chip, 2 to 4 plain reasons, a confidence meter and a Why am I seeing this panel." },
  { tag: "ANCHORS", tagColor: "#06C167", desc: "1 to 3 staffed drop points within 300 m, each with a clear reason." },
  { tag: "MATCH", tagColor: "#276EF1", desc: "Standard vs vetted driver, with the +4 min and +₹20 trade off shown up front." },
  { tag: "CONSENT", tagColor: "#06C167", desc: "Contacts, one sharing policy, explicit consent, expiring link preview." },
  { tag: "ON TRIP", tagColor: "#DE1135", desc: "Driver card, trip PIN and live status. SOS and the full toolkit stay one tap away." },
  { tag: "CLOSE LOOP", tagColor: "#06C167", desc: "A gentle Did you reach safely check. Tiered, neutral, never an automatic emergency alert." },
];

export default function FlowCards() {
  return (
    <section id="flow" className="mt-16 bg-black py-12 text-white sm:mt-[100px] sm:py-[76px]">
      <div className="mx-auto flex max-w-[1240px] flex-wrap items-end justify-between gap-4 px-5">
        <div>
          <div className="mb-2.5 text-xs font-bold tracking-[1.6px] text-[#A6A6A6]">THE FLOW</div>
          <h2 className="m-0 text-[clamp(28px,3.6vw,44px)] font-extrabold leading-[1.08] tracking-[-1.3px] md:whitespace-nowrap">
            Seven steps, under two minutes.
          </h2>
        </div>
        <div className="hidden items-center gap-2 pb-1.5 text-[13px] text-[#A6A6A6] sm:flex">
          scroll sideways
          <svg width="30" height="14" viewBox="0 0 30 14" fill="none" aria-hidden="true">
            <path d="M0 7h26m-5-5l5 5-5 5" stroke="#A6A6A6" strokeWidth="2" />
          </svg>
        </div>
      </div>
      <div className="hscroll relative mx-auto flex max-w-[1240px] flex-col px-5 pb-1.5 pt-6 sm:snap-x sm:snap-mandatory sm:flex-row sm:gap-3.5 sm:overflow-x-auto sm:pt-[30px]">
        {STEP_NAMES.map((s, i) => (
          /* mobile: a sticky deck, each step card slides up and covers the
             one before it; from sm up the wrapper vanishes (display:contents)
             and the cards ride the horizontal snap rail instead */
          <div
            key={s.title}
            className={`sticky sm:contents ${i < STEP_NAMES.length - 1 ? "pb-4 sm:pb-0" : ""}`}
            style={{ top: 64 + i * 8, zIndex: i + 1 }}
          >
          <button
            type="button"
            onClick={() => jumpToStep(i + 2)}
            className="w-full flex-none rounded-[18px] border border-[#2A2A2A] bg-[#111111] p-4 text-left shadow-[0_-14px_34px_rgba(0,0,0,.6)] transition-all duration-300 hover:-translate-y-1.5 hover:border-brand hover:shadow-[0_18px_40px_rgba(39,110,241,.18)] sm:w-[min(78vw,270px)] sm:snap-start sm:p-5 sm:shadow-none"
          >
            <div className="mb-3.5 flex items-center justify-between">
              <span className="text-[34px] font-extrabold tracking-[-1.5px] text-[#333333]">
                0{i + 1}
              </span>
              <span
                className="whitespace-nowrap rounded-full border px-[9px] py-[3px] text-[10.5px] font-bold tracking-[1px]"
                style={{ color: FLOW_META[i].tagColor, borderColor: FLOW_META[i].tagColor }}
              >
                {FLOW_META[i].tag}
              </span>
            </div>
            <div className="mb-3.5 flex h-24 items-center justify-center overflow-hidden rounded-xl bg-black">
              {VISUALS[i]}
            </div>
            <div className="text-base font-extrabold tracking-[-.2px]">{s.title}</div>
            <div className="mt-[5px] text-[12.5px] leading-[1.5] text-[#A6A6A6]">
              {FLOW_META[i].desc}
            </div>
            <div className="mt-3 text-xs font-bold text-brand">Open this step ↓</div>
          </button>
          </div>
        ))}
      </div>
    </section>
  );
}
