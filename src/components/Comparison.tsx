"use client";

import { useState } from "react";
import { Reveal } from "./ui";

/* Interactive before/after: what one toggle changes about a late-night booking. */

const ROWS: {
  label: string;
  off: string;
  on: string;
  offIcon: "manual" | "none" | "risk";
  onIcon: "auto";
}[] = [
  {
    label: "Understanding trip conditions",
    off: "You guess, or ask a friend who knows the area.",
    on: "Contextual Safety Brief with plain reasons and a confidence meter.",
    offIcon: "risk",
    onIcon: "auto",
  },
  {
    label: "Telling someone you're on the way",
    off: "Manually share a link, then remember to update the group chat.",
    on: "Safety Circle auto-shares under your saved policy, links expire in 30 min.",
    offIcon: "manual",
    onIcon: "auto",
  },
  {
    label: "Choosing where to get dropped",
    off: "You remember too late that the lane is dark and empty.",
    on: "Safer Anchors suggests staffed, well-lit points 180 to 300 m away, before booking.",
    offIcon: "risk",
    onIcon: "auto",
  },
  {
    label: "Choosing who drives",
    off: "A star rating is all you have to go on.",
    on: "Safety Priority Match: audited eligibility signals, trade-off shown up front.",
    offIcon: "none",
    onIcon: "auto",
  },
  {
    label: "After you arrive",
    off: "\"Reached?\" texts, until someone forgets to send one.",
    on: "A quiet check-in 5 minutes after the trip. Neutral note if you don't respond.",
    offIcon: "manual",
    onIcon: "auto",
  },
];

function OffIcon({ kind }: { kind: "manual" | "none" | "risk" }) {
  if (kind === "none")
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="9" stroke="#A6A6A6" strokeWidth="2" />
        <path d="M8 12h8" stroke="#A6A6A6" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  if (kind === "risk")
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 4L3 20h18L12 4z" stroke="#DE1135" strokeWidth="2" strokeLinejoin="round" />
        <path d="M12 10v4" stroke="#DE1135" strokeWidth="2" strokeLinecap="round" />
        <circle cx="12" cy="17" r="1" fill="#DE1135" />
      </svg>
    );
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M9 6l-5 6 5 6M15 6l5 6-5 6" stroke="#B26205" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Comparison() {
  const [on, setOn] = useState(true);

  return (
    <div className="mt-24">
      <div className="mb-2.5 text-xs font-bold tracking-[1.6px] text-ink-faint">BEFORE / AFTER</div>
      <h2 className="m-0 mb-2 text-[clamp(28px,3.6vw,44px)] font-extrabold leading-[1.08] tracking-[-1.3px] md:whitespace-nowrap">
        The difference one toggle makes.
      </h2>
      <p className="mb-7 max-w-[620px] text-[15px] leading-[1.6] text-ink-soft">
        Same rider, same 12:15 AM trip from HITEC City. Flip the toggle to compare tonight&apos;s manual
        safety plan with the SafeRide Priority flow.
      </p>

      {/* the toggle */}
      <div className="mb-7 flex flex-wrap items-center gap-4">
        <button
          type="button"
          role="switch"
          aria-checked={on}
          onClick={() => setOn(!on)}
          className="flex items-center gap-3 rounded-full border border-line bg-white p-1.5 pr-5 shadow-[0_4px_18px_rgba(0,0,0,.07)] transition-shadow hover:shadow-[0_8px_28px_rgba(0,0,0,.12)]"
        >
          <span
            className="relative h-9 w-[64px] rounded-full transition-colors duration-300"
            style={{ background: on ? "#276EF1" : "#D8DCE0" }}
          >
            <span
              className="absolute top-1 flex h-7 w-7 items-center justify-center rounded-full bg-white shadow-[0_2px_6px_rgba(0,0,0,.3)] transition-[left] duration-300"
              style={{ left: on ? 32 : 4 }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                {on ? (
                  <>
                    <path d="M12 2.5l7.5 3v6c0 4.6-3.2 8.4-7.5 10-4.3-1.6-7.5-5.4-7.5-10v-6l7.5-3z" fill="#276EF1" />
                    <path d="M8.7 12l2.3 2.3 4.3-4.6" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </>
                ) : (
                  <path d="M12 2.5l7.5 3v6c0 4.6-3.2 8.4-7.5 10-4.3-1.6-7.5-5.4-7.5-10v-6l7.5-3z" stroke="#9AA0A6" strokeWidth="1.6" fill="none" strokeLinejoin="round" />
                )}
              </svg>
            </span>
          </span>
          <span className="text-[15px] font-extrabold">
            SafeRide Priority{" "}
            <span style={{ color: on ? "#276EF1" : "#9AA0A6" }}>{on ? "ON" : "OFF"}</span>
          </span>
        </button>
        <span
          key={String(on)}
          className="rounded-full px-3.5 py-2 text-xs font-bold"
          style={{
            background: on ? "#EAF6EF" : "#FDE8EC",
            color: on ? "#0E8345" : "#A50D28",
            animation: "slideup .35s ease both",
          }}
        >
          {on
            ? "One flow · under 2 minutes · you stay in control"
            : "5 apps · 6 decisions · all manual, all at midnight"}
        </span>
      </div>

      {/* rows */}
      <div className="flex flex-col gap-2.5">
        {ROWS.map((r, i) => (
          <Reveal
            key={r.label}
            delay={i * 0.05}
            className="grid items-center gap-x-6 gap-y-2 rounded-2xl border border-line p-4 transition-colors duration-300 [grid-template-columns:repeat(auto-fit,minmax(min(100%,260px),1fr))] md:p-5"
            style={{
              borderColor: on ? "#C7D9FB" : "#E2E2E2",
              background: on ? "rgba(39,110,241,.03)" : "#FFFFFF",
            }}
          >
            <div className="text-sm font-extrabold tracking-[-.2px]">{r.label}</div>
            <div
              key={`row-${i}-${on}`}
              className="flex items-start gap-2.5"
              style={{ animation: "slideup .35s ease both", animationDelay: `${i * 0.04}s` }}
            >
              {on ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="mt-px flex-none" aria-hidden="true">
                  <circle cx="12" cy="12" r="9" fill="#EAF6EF" stroke="#06C167" strokeWidth="2" />
                  <path d="M8 12.5l2.5 2.5 5.5-6" stroke="#0E8345" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ) : (
                <span className="mt-px flex-none">
                  <OffIcon kind={r.offIcon} />
                </span>
              )}
              <span className="text-[13.5px] leading-[1.55]" style={{ color: on ? "#111" : "#545454" }}>
                {on ? r.on : r.off}
              </span>
            </div>
          </Reveal>
        ))}
      </div>
      <div className="mt-3 text-xs text-[#A6A6A6]">
        Either way, the ride books. SafeRide never blocks a trip. It just removes the juggling.
      </div>
    </div>
  );
}
