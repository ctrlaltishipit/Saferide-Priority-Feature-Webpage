"use client";

import { useState } from "react";
import { CityMapLayers } from "./CityMap";

/* Screen 2: replica of the Uber India home screen from the reference
   screenshots, with the SafeRide Priority entry point added for the
   late-night context. Illustrations are drawn as flat SVG scenes.
   The Later button opens the Plan-your-ride flow: pickup-time sheet,
   Switch-rider sheet and the Send-a-ride voucher screen. */

function ServiceTile({ label, tag, tagColor, children }: { label: string; tag?: string; tagColor?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className="relative flex h-[74px] w-[74px] items-center justify-center rounded-full bg-[#F3F3F3]">
        {tag && (
          <span
            className="absolute -left-1 -top-0.5 rounded-md px-1.5 py-0.5 text-[9px] font-bold text-white"
            style={{ background: tagColor || "#DE1135" }}
          >
            {tag}
          </span>
        )}
        {children}
      </div>
      <span className="text-[12.5px] font-semibold">{label}</span>
    </div>
  );
}

const carGlyph = (fill = "#C9CED4") => (
  <svg width="40" height="24" viewBox="0 0 44 26" fill="none" aria-hidden="true">
    <path d="M6 17l2.5-7A3 3 0 0111.3 8h13.4a3 3 0 012.8 2l2.5 7v6h-3.6v-2.6H9.6V23H6v-6z" fill={fill} />
    <circle cx="12" cy="19.6" r="2" fill="#fff" />
    <circle cx="26" cy="19.6" r="2" fill="#fff" />
  </svg>
);

const autoGlyph = (
  <svg width="38" height="26" viewBox="0 0 38 26" fill="none" aria-hidden="true">
    <path d="M4 20v-8a4 4 0 014-4h14l6 5h4a3 3 0 013 3v4h-4" stroke="#0E8345" strokeWidth="2.4" fill="#F6BC2F" strokeLinejoin="round" />
    <rect x="10" y="10" width="9" height="6" rx="1.5" fill="#0E8345" />
    <circle cx="11" cy="21" r="3" fill="#111" />
    <circle cx="28" cy="21" r="3" fill="#111" />
  </svg>
);

function SceneCard({ title, sub, wide, children }: { title: string; sub: string; wide?: boolean; children: React.ReactNode }) {
  return (
    <div className={wide ? "w-[248px] flex-none" : "w-[160px] flex-none"}>
      <div className="h-[104px] overflow-hidden rounded-xl">{children}</div>
      <div className="mt-2 text-[14px] font-bold leading-tight">{title}</div>
      <div className="mt-0.5 text-[11.5px] text-ink-faint">{sub}</div>
    </div>
  );
}

/* ─────────────── Plan-your-ride flow (via the Later button) ─────────────── */

/* Fictional demo places only. No real saved addresses appear here. */
const RECENTS = [
  { dist: "4.1 km", name: "Cyber Towers", addr: "HITEC City Main Road, Madhapur, Hyderabad, Telan…" },
  { dist: "6.8 km", name: "Inorbit Mall", addr: "Mindspace Road, Madhapur, Hyderabad, Telangana 5…" },
  { dist: "2.6 km", name: "Apollo Clinic, Kondapur", addr: "Survey No. 12, Kondapur Main Road, Hyderabad, Tel…" },
  { dist: "9.4 km", name: "GVK One Mall", addr: "Road No. 1, Banjara Hills, Hyderabad, Telangana 50…" },
  { dist: "5.2 km", name: "Durgam Cheruvu Park", addr: "Inorbit Mall Road, Jubilee Hills, Hyderabad, Telanga…" },
];

function Radio({ on }: { on: boolean }) {
  return (
    <span
      className="flex h-[22px] w-[22px] flex-none items-center justify-center rounded-full border-2 transition-colors"
      style={{ borderColor: on ? "#111" : "#C9CED4" }}
    >
      <span className="h-[11px] w-[11px] rounded-full bg-[#111] transition-opacity" style={{ opacity: on ? 1 : 0 }} />
    </span>
  );
}

function SheetShell({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div className="absolute inset-0 z-40 flex flex-col justify-end overflow-hidden">
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="flex-1 bg-[rgba(10,14,20,.5)]"
        style={{ animation: "fadein .25s ease both" }}
      />
      <div className="hscroll max-h-[78%] overflow-y-auto rounded-t-[24px] bg-white px-5 pb-8 pt-3 text-[#111]" style={{ animation: "sheetup .32s cubic-bezier(.32,.72,.35,1) both" }}>
        <div className="mb-2 flex justify-center">
          <div className="h-1 w-[38px] rounded-full bg-[#E2E4E8]" />
        </div>
        <div className="mb-1 border-b border-[#F0F0F0] pb-3 text-center text-[19px] font-extrabold">{title}</div>
        {children}
      </div>
    </div>
  );
}

interface PlanState {
  when: "now" | "later";
  rider: "Me" | "Meera";
  group: boolean;
}

function PlanRide({
  onBack,
  onWhereTo,
  onSend,
  onGuest,
  plan,
  setPlan,
}: {
  onBack: () => void;
  onWhereTo: () => void;
  onSend: () => void;
  onGuest: () => void;
  plan: PlanState;
  setPlan: (patch: Partial<PlanState>) => void;
}) {
  const [sheet, setSheet] = useState<null | "when" | "rider">(null);
  const { when, rider, group } = plan;
  const setWhen = (w: PlanState["when"]) => setPlan({ when: w });
  const setRider = (r: PlanState["rider"]) => setPlan({ rider: r });
  const setGroup = (g: boolean) => setPlan({ group: g });

  const rowIcon = (child: React.ReactNode) => (
    <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-[#F3F3F3]">{child}</span>
  );

  return (
    <div className="relative flex h-full flex-col text-[#111]" style={{ fontFamily: "-apple-system,'Helvetica Neue',system-ui,sans-serif" }}>
      {/* map peeking behind the sheet */}
      <div className="relative h-[128px] flex-none overflow-hidden bg-[#E9EDF0]">
        <svg viewBox="0 0 402 250" className="absolute inset-0 w-full" aria-hidden="true">
          <CityMapLayers />
        </svg>
        <div className="absolute inset-0 bg-black/5" />
      </div>

      <div className="relative -mt-4 flex min-h-0 flex-1 flex-col rounded-t-[20px] bg-white text-[#111]">
        <div className="flex justify-center pb-1 pt-2">
          <div className="h-1 w-[38px] rounded-full bg-[#E2E4E8]" />
        </div>
        <div className="relative flex flex-none items-center justify-center px-5 py-2">
          <button
            type="button"
            onClick={onBack}
            aria-label="Back to home"
            className="absolute left-4 flex h-9 w-9 items-center justify-center rounded-full"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M19 12H6m6-7l-7 7 7 7" stroke="#111" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <div className="text-[19px] font-extrabold">Plan your ride</div>
        </div>

        {/* pickup-time and rider pills */}
        <div className="flex gap-2.5 px-4 pb-3.5 pt-1">
          <button
            type="button"
            onClick={() => setSheet("when")}
            className="flex items-center gap-2 rounded-full px-4 py-[11px] text-[14.5px] font-bold transition-colors duration-200"
            style={
              when === "later"
                ? { background: "#000000", color: "#FFFFFF" }
                : { background: "#FFFFFF", color: "#111111", boxShadow: "inset 0 0 0 1.5px #E2E2E2" }
            }
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <rect x="4" y="6" width="16" height="14" rx="2" stroke="currentColor" strokeWidth="1.8" />
              <path d="M4 10h16M9 3v5M15 3v5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
            {when === "later" ? "Pickup later" : "Pickup now"}
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => setSheet("rider")}
            className="flex items-center gap-2 rounded-full bg-[#F3F3F3] px-4 py-[11px] text-[14.5px] font-bold"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="12" cy="8" r="3.4" stroke="#111" strokeWidth="1.8" />
              <path d="M5 20c1-4 3.8-6 7-6s6 2 7 6" stroke="#111" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
            {rider === "Me" ? "For me" : `For ${rider}`}
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M6 9l6 6 6-6" stroke="#111" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        {/* pickup / destination box */}
        <div className="flex items-center gap-3 px-4">
          <div className="relative flex-1 rounded-2xl border-2 border-[#111] px-4">
            <div className="absolute bottom-[30px] left-[19.5px] top-[30px] w-[1.5px] bg-[#111]" />
            <div className="flex items-center gap-3 py-3">
              <span className="h-[11px] w-[11px] flex-none rounded-full border-[3px] border-[#111]" />
              <span className="text-[15.5px] font-semibold">Cyber Towers, Gate 2</span>
            </div>
            <div className="ml-6 h-px bg-[#E2E2E2]" />
            <button type="button" onClick={onWhereTo} className="flex w-full items-center gap-3 py-3 text-left">
              <span className="h-[9px] w-[9px] flex-none border-[2.5px] border-[#111]" />
              <span className="text-[15.5px] font-semibold text-[#8A8A8E]">Where to?</span>
            </button>
          </div>
          <button type="button" aria-label="Add stop" className="flex h-11 w-11 flex-none items-center justify-center rounded-full bg-[#F3F3F3]">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
              <path d="M12 5v14M5 12h14" stroke="#111" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* home + saved places */}
        <div className="mt-3 flex items-center border-b border-[#F0F0F0] px-4 pb-3">
          <button type="button" onClick={onWhereTo} className="flex flex-1 items-center gap-3 text-left">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M4 11l8-7 8 7v9a1 1 0 01-1 1h-5v-6h-4v6H5a1 1 0 01-1-1z" stroke="#111" strokeWidth="1.8" strokeLinejoin="round" />
            </svg>
            <span>
              <span className="block text-[15px] font-bold leading-tight">Home</span>
              <span className="block text-[12.5px] text-ink-faint">Flat 4B, Lakeview Residency</span>
            </span>
          </button>
          <button type="button" className="flex flex-1 items-center gap-3 border-l border-[#F0F0F0] pl-5 text-left">
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8-4.3-4.1 5.9-.9z" stroke="#111" strokeWidth="1.7" strokeLinejoin="round" />
            </svg>
            <span className="text-[15px] font-bold">Saved places</span>
          </button>
        </div>

        {/* recents + footer rows */}
        <div className="hscroll min-h-0 flex-1 overflow-y-auto px-4 pb-8">
          {RECENTS.map((r) => (
            <button key={r.name} type="button" onClick={onWhereTo} className="flex w-full items-start gap-3.5 border-b border-[#F0F0F0] py-3 text-left">
              <span className="flex w-10 flex-none flex-col items-center pt-0.5">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <circle cx="12" cy="12" r="8.5" stroke="#545454" strokeWidth="1.7" />
                  <path d="M12 7.5V12l3 2" stroke="#545454" strokeWidth="1.7" strokeLinecap="round" />
                </svg>
                <span className="mt-0.5 text-[10.5px] font-medium text-ink-faint">{r.dist}</span>
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[15px] font-bold leading-snug">{r.name}</span>
                <span className="block truncate text-[12.5px] text-ink-faint">{r.addr}</span>
              </span>
            </button>
          ))}
          <button type="button" className="flex w-full items-center gap-3.5 border-b border-[#F0F0F0] py-3.5 text-left">
            {rowIcon(
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle cx="12" cy="12" r="8.5" stroke="#111" strokeWidth="1.7" />
                <path d="M3.5 12h17M12 3.5c2.5 2.4 3.8 5.2 3.8 8.5s-1.3 6.1-3.8 8.5c-2.5-2.4-3.8-5.2-3.8-8.5s1.3-6.1 3.8-8.5z" stroke="#111" strokeWidth="1.5" />
              </svg>
            )}
            <span className="text-[15px] font-bold">Search in a different city</span>
          </button>
          <button type="button" className="flex w-full items-center gap-3.5 py-3.5 text-left">
            {rowIcon(
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M12 21s-6-5-6-9.8A6 6 0 0112 5a6 6 0 016 6.2C18 16 12 21 12 21z" stroke="#111" strokeWidth="1.7" />
                <circle cx="12" cy="11" r="1.6" fill="#111" />
              </svg>
            )}
            <span className="text-[15px] font-bold">Set location on map</span>
          </button>
        </div>
      </div>

      {/* when sheet */}
      {sheet === "when" && (
        <SheetShell title="When do you need a ride?" onClose={() => setSheet(null)}>
          <button type="button" onClick={() => setWhen("now")} className="flex w-full items-center gap-4 border-b border-[#F0F0F0] py-4 text-left">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="12" cy="12" r="9" stroke="#111" strokeWidth="1.8" />
              <path d="M12 7v5l3.2 2" stroke="#111" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
            <span className="flex-1">
              <span className="block text-[16px] font-bold">Now</span>
              <span className="block text-[13px] text-ink-faint">Request a ride, hop in, and go</span>
            </span>
            <Radio on={when === "now"} />
          </button>
          <button type="button" onClick={() => setWhen("later")} className="flex w-full items-center gap-4 py-4 text-left">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <rect x="4" y="6" width="16" height="14" rx="2" stroke="#111" strokeWidth="1.8" />
              <path d="M4 10h16M9 3v5M15 3v5" stroke="#111" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
            <span className="flex-1">
              <span className="block text-[16px] font-bold">Later</span>
              <span className="block text-[13px] text-ink-faint">Reserve for extra peace of mind</span>
            </span>
            <Radio on={when === "later"} />
          </button>
          <button
            type="button"
            onClick={() => setSheet(null)}
            className="mt-2 w-full rounded-xl bg-black p-4 text-center text-[16px] font-bold text-white"
          >
            Next
          </button>
        </SheetShell>
      )}

      {/* switch rider sheet */}
      {sheet === "rider" && (
        <SheetShell title="Switch rider" onClose={() => setSheet(null)}>
          <button type="button" onClick={() => setRider("Me")} className="flex w-full items-center gap-4 border-b border-[#F0F0F0] py-3 text-left">
            <span className="flex h-11 w-11 flex-none items-center justify-center overflow-hidden rounded-full bg-[#8FD6B4]">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle cx="12" cy="9" r="4" fill="#1F2937" />
                <path d="M4 21c1.2-4.4 4.4-6.5 8-6.5s6.8 2.1 8 6.5" fill="#1F2937" />
              </svg>
            </span>
            <span className="flex-1 text-[16px] font-bold">Me</span>
            <Radio on={rider === "Me"} />
          </button>
          <button type="button" onClick={() => setRider("Meera")} className="flex w-full items-center gap-4 border-b border-[#F0F0F0] py-3 text-left">
            <span className="flex h-11 w-11 flex-none items-center justify-center rounded-full bg-[#3B6FE0] text-[17px] font-bold text-white">
              M
            </span>
            <span className="flex-1">
              <span className="block text-[16px] font-bold">Meera</span>
              <span className="block text-[13px] text-ink-faint">+91 98XXX XXX42</span>
            </span>
            <Radio on={rider === "Meera"} />
          </button>
          <button type="button" onClick={onSend} className="flex w-full items-center gap-4 border-b border-[#F0F0F0] py-3 text-left">
            <span className="flex w-11 flex-none justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M4 12l16-7-4.5 14-4-5.5L4 12z" stroke="#111" strokeWidth="1.8" strokeLinejoin="round" />
              </svg>
            </span>
            <span className="flex-1">
              <span className="block text-[16px] font-bold">Send a ride</span>
              <span className="block text-[13px] leading-snug text-ink-faint">Cover a ride for someone else by sending a voucher</span>
            </span>
            <span className="rounded-md bg-[#3B6FE0] px-2 py-0.5 text-[12px] font-bold text-white">New</span>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M9 5l7 7-7 7" stroke="#111" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button type="button" onClick={() => setGroup(!plan.group)} className="flex w-full items-center gap-4 border-b border-[#F0F0F0] py-3 text-left">
            <span className="flex w-11 flex-none justify-center">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle cx="7" cy="10" r="2.2" stroke="#111" strokeWidth="1.6" />
                <circle cx="17" cy="10" r="2.2" stroke="#111" strokeWidth="1.6" />
                <circle cx="12" cy="7" r="2.2" stroke="#111" strokeWidth="1.6" />
                <path d="M3 18c.7-2.6 2.2-3.9 4-3.9M21 18c-.7-2.6-2.2-3.9-4-3.9M8.5 18.5c.8-3 2-4.5 3.5-4.5s2.7 1.5 3.5 4.5" stroke="#111" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </span>
            <span className="flex-1">
              <span className="block text-[16px] font-bold">Create a group ride</span>
              <span className="block text-[13px] leading-snug text-ink-faint">Share ride info with others coming along for a smoother trip</span>
            </span>
            <Radio on={group} />
          </button>
          <button type="button" onClick={onGuest} className="flex w-full items-center gap-4 py-3 text-left">
            <span className="flex w-11 flex-none justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle cx="10" cy="8" r="3.2" stroke="#111" strokeWidth="1.8" />
                <path d="M3.5 20c1-3.8 3.5-5.6 6.5-5.6M17 14v6M14 17h6" stroke="#111" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </span>
            <span className="text-[16px] font-bold">Add new contact</span>
          </button>
          <button type="button" onClick={() => setSheet(null)} className="mt-2 w-full rounded-xl bg-black p-4 text-center text-[16px] font-bold text-white">
            Done
          </button>
        </SheetShell>
      )}
    </div>
  );
}

function SendARide({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex h-full flex-col bg-white pt-[54px] text-[#111]" style={{ fontFamily: "-apple-system,'Helvetica Neue',system-ui,sans-serif" }}>
      <div className="flex flex-none items-center justify-between px-4 py-2.5">
        <button type="button" onClick={onClose} aria-label="Close Send a ride" className="flex h-9 w-9 items-center justify-center">
          <svg width="19" height="19" viewBox="0 0 24 24" fill="none">
            <path d="M6 6l12 12M18 6L6 18" stroke="#111" strokeWidth="2.2" strokeLinecap="round" />
          </svg>
        </button>
        <div className="text-[18px] font-extrabold">Send a ride</div>
        <span className="flex h-9 w-9 items-center justify-center">
          <svg width="21" height="21" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="12" cy="12" r="9" stroke="#111" strokeWidth="1.7" />
            <path d="M9.6 9.2a2.5 2.5 0 114 2c-.9.7-1.6 1.2-1.6 2.3" stroke="#111" strokeWidth="1.7" strokeLinecap="round" />
            <circle cx="12" cy="16.6" r="1.1" fill="#111" />
          </svg>
        </span>
      </div>

      <div className="hscroll min-h-0 flex-1 overflow-y-auto">
        <div className="px-5 pt-4">
          <h2 className="m-0 text-[40px] font-extrabold leading-[1.12] tracking-[-1px]">
            Send <span className="rounded-md bg-[#EEEEEE] px-1.5">2 trips</span> worth up to{" "}
            <span className="rounded-md bg-[#EEEEEE] px-1.5">₹700</span> each
          </h2>
          <button type="button" className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#F3F3F3] px-4 py-3 text-[15px] font-bold">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M4 7h9m4 0h3M4 17h3m4 0h9" stroke="#111" strokeWidth="1.8" strokeLinecap="round" />
              <circle cx="15.5" cy="7" r="2.2" stroke="#111" strokeWidth="1.8" />
              <circle cx="9.5" cy="17" r="2.2" stroke="#111" strokeWidth="1.8" />
            </svg>
            Edit details
          </button>
        </div>

        <div className="mt-5 h-2.5 bg-[#F0F0F0]" />

        <div className="flex flex-col gap-5 px-5 py-5">
          {[
            {
              t: "Their trip, on you",
              d: "Send a voucher to pay for someone else's trip. They will request it themselves.",
              icon: (
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <circle cx="8" cy="7" r="2.6" stroke="#111" strokeWidth="1.7" />
                  <path d="M3 15.5c.8-3 2.8-4.5 5-4.5" stroke="#111" strokeWidth="1.7" strokeLinecap="round" />
                  <path d="M12 13h8l-1.5 6h-5z" stroke="#111" strokeWidth="1.7" strokeLinejoin="round" />
                </svg>
              ),
            },
            {
              t: "Expires in 48 hours",
              d: "Your guest can use this voucher to pay for their trip within the next 48 hours.",
              icon: (
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M4 16h11v3H4zM5 16l1.5-4h6L14 16" stroke="#111" strokeWidth="1.7" strokeLinejoin="round" />
                  <circle cx="17.5" cy="8.5" r="4" stroke="#111" strokeWidth="1.7" />
                  <path d="M17.5 6.5v2l1.4 1" stroke="#111" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              ),
            },
            {
              t: "Pay after they ride",
              d: "You'll only be charged for the actual cost of their trip, up to ₹700 per trip.",
              icon: (
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <rect x="6" y="10" width="12" height="9" rx="2" stroke="#111" strokeWidth="1.7" />
                  <path d="M9 10V7.5a3 3 0 016 0V10" stroke="#111" strokeWidth="1.7" />
                  <circle cx="12" cy="14.5" r="1.3" fill="#111" />
                </svg>
              ),
            },
          ].map((r) => (
            <div key={r.t} className="flex items-start gap-4">
              <span className="w-8 flex-none pt-0.5">{r.icon}</span>
              <span>
                <span className="block text-[16px] font-bold">{r.t}</span>
                <span className="mt-0.5 block text-[14px] leading-[1.5] text-ink-faint">{r.d}</span>
              </span>
            </div>
          ))}
        </div>

        <div className="h-2.5 bg-[#F0F0F0]" />
        <div className="px-5 py-4 text-[13.5px] text-ink-soft">
          By creating the voucher, you agree to our{" "}
          <span className="font-medium text-[#3B6FE0] underline">Terms &amp; Conditions</span>.
        </div>
      </div>

      <div className="flex-none border-t border-[#F0F0F0] px-5 pb-9 pt-3">
        <button type="button" className="flex w-full items-center gap-3 py-2 text-left">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M12 5v14M5 12h14" stroke="#111" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <span className="flex-1">
            <span className="block text-[16px] font-bold">Add payment method</span>
            <span className="mt-0.5 flex items-center gap-1 text-[13px] font-semibold text-danger">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle cx="12" cy="12" r="9" stroke="#DE1135" strokeWidth="1.8" />
                <path d="M12 7.5V13" stroke="#DE1135" strokeWidth="1.8" strokeLinecap="round" />
                <circle cx="12" cy="16.2" r="1.1" fill="#DE1135" />
              </svg>
              Required
            </span>
          </span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M9 5l7 7-7 7" stroke="#111" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button type="button" disabled className="mt-2 w-full rounded-xl bg-[#EEEEEE] p-4 text-center text-[16px] font-bold text-[#9AA0A6]">
          Create ride voucher
        </button>
      </div>
    </div>
  );
}

function GuestRides({ onClose, onStart }: { onClose: () => void; onStart: () => void }) {
  return (
    <div className="flex h-full flex-col bg-white pt-[54px] text-[#111]" style={{ fontFamily: "-apple-system,'Helvetica Neue',system-ui,sans-serif" }}>
      <div className="relative flex flex-none items-center justify-center py-2.5">
        <button type="button" onClick={onClose} aria-label="Close Guest rides" className="absolute left-4 flex h-9 w-9 items-center justify-center">
          <svg width="19" height="19" viewBox="0 0 24 24" fill="none">
            <path d="M6 6l12 12M18 6L6 18" stroke="#111" strokeWidth="2.2" strokeLinecap="round" />
          </svg>
        </button>
        <div className="text-[18px] font-extrabold">Guest rides</div>
      </div>

      <div className="hscroll min-h-0 flex-1 overflow-y-auto">
        {/* hero: guest waiting for the yellow car */}
        <svg viewBox="0 0 402 150" className="block w-full" aria-hidden="true">
          <rect width="402" height="150" fill="#C4D6DC" />
          <rect y="0" width="402" height="60" fill="#D3E2E7" />
          <path d="M250 24 h56 l18 22 h-84 z M330 30 h44 l14 16 h-64 z" fill="#7FA8C9" />
          <path d="M252 46 h84 v10 h-84 z M336 46 h56 v8 h-56 z" fill="#5C87A8" />
          <rect y="70" width="402" height="80" fill="#98A6AC" />
          <path d="M0 104 h60 M110 100 h70 M330 96 h72" stroke="#fff" strokeWidth="5" />
          <path d="M-10 40 q26 -34 52 0 q10 44 -14 70 h-38 z" fill="#2E5B3E" />
          <path d="M348 128 q16 -22 40 -12 q10 20 -8 34 h-40 z" fill="#3E7050" />
          {/* yellow sedan */}
          <g>
            <ellipse cx="270" cy="126" rx="98" ry="9" fill="#4A5358" opacity=".4" />
            <path d="M180 116 v-18 a10 10 0 0110-10 h22 l20 -22 a12 12 0 019-4 h52 a12 12 0 019 4 l20 22 h16 a10 10 0 0110 10 v18 z" fill="#E8B33C" />
            <path d="M236 88 l16-18 a8 8 0 016-2.6 h20 V88 z M284 67.4 h14 a8 8 0 016 2.6 l15 18 h-35 z" fill="#3A4A5A" />
            <circle cx="292" cy="80" r="7" fill="#8A5A3C" />
            <path d="M285 88 a8 8 0 0114 0 z" fill="#DCEBFA" />
            <path d="M186 106 h-4 M348 106 h-4" stroke="#B98E2F" strokeWidth="3" />
            <path d="M296 96 a24 10 0 0148 4" fill="none" stroke="#B98E2F" strokeWidth="2" opacity=".6" />
            <ellipse cx="330" cy="105" rx="16" ry="8" fill="#3A4A5A" opacity=".9" />
            <circle cx="214" cy="118" r="12" fill="#2A2E33" />
            <circle cx="214" cy="118" r="5" fill="#8A96A6" />
            <circle cx="322" cy="118" r="12" fill="#2A2E33" />
            <circle cx="322" cy="118" r="5" fill="#8A96A6" />
          </g>
          {/* guest in foreground */}
          <g>
            <circle cx="92" cy="42" r="22" fill="#20242A" />
            <circle cx="108" cy="36" r="4" fill="#E6E9EC" />
            <path d="M74 58 q18 -12 38 0 l8 92 h-56 z" fill="#E3E7EA" />
            <path d="M104 62 q12 6 12 26 l-4 42 q-8 4 -12 0 z" fill="#8E3B70" />
            <circle cx="79" cy="44" r="2.5" fill="#F2D6C4" />
          </g>
        </svg>

        <div className="px-5 pt-5">
          <h2 className="m-0 text-[36px] font-extrabold leading-[1.12] tracking-[-1px]">
            Booking for someone else?
          </h2>
          <p className="mb-1 mt-3 text-[15px] leading-[1.55] text-ink-soft">
            Now both you and your guest will get ride details via the Uber app, text, or WhatsApp.
          </p>
        </div>

        <div className="flex flex-col gap-5 px-5 py-5">
          {[
            {
              t: "Make pickup easy",
              d: "Guests can easily find the right vehicle or contact their driver without you.",
              icon: (
                <svg width="25" height="25" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M20 11.5c0 4-3.6 7-8 7-.9 0-1.8-.1-2.6-.4L5 19.5l1.3-3.3C5.1 15 4 13.4 4 11.5c0-4 3.6-7 8-7s8 3 8 7z" stroke="#111" strokeWidth="1.7" strokeLinejoin="round" />
                </svg>
              ),
            },
            {
              t: "Follow their ride",
              d: "You can follow your guest's ride from start to finish.",
              icon: (
                <svg width="25" height="25" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M12 3l7.5 2.8v5.4c0 4.4-3 8.2-7.5 9.8-4.5-1.6-7.5-5.4-7.5-9.8V5.8L12 3z" stroke="#111" strokeWidth="1.7" strokeLinejoin="round" />
                  <path d="M8.8 11.8l2.3 2.3 4.3-4.6" stroke="#111" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ),
            },
            {
              t: "Choose who pays",
              d: "Pay for the trip in the app, or your guest can pay the driver in cash.",
              icon: (
                <svg width="25" height="25" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <rect x="3.5" y="7" width="17" height="11" rx="1.5" stroke="#111" strokeWidth="1.7" />
                  <circle cx="12" cy="12.5" r="2.6" stroke="#111" strokeWidth="1.5" />
                  <path d="M17 15.5l3.5 3" stroke="#111" strokeWidth="1.7" strokeLinecap="round" />
                </svg>
              ),
            },
          ].map((r, i) => (
            <div key={r.t} className={`flex items-start gap-4 ${i > 0 ? "border-t border-[#F0F0F0] pt-5" : ""}`}>
              <span className="w-8 flex-none pt-0.5">{r.icon}</span>
              <span>
                <span className="block text-[16.5px] font-bold">{r.t}</span>
                <span className="mt-0.5 block text-[14px] leading-[1.5] text-ink-faint">{r.d}</span>
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-none px-5 pb-9 pt-2">
        <button type="button" onClick={onStart} className="w-full rounded-xl bg-black p-4 text-center text-[16px] font-bold text-white">
          Start now
        </button>
      </div>
    </div>
  );
}

export default function UberHome({
  onWhereTo,
  onOutstation,
}: {
  onWhereTo: () => void;
  onOutstation?: () => void;
}) {
  const [view, setView] = useState<"home" | "plan" | "send" | "guest">("home");
  const [plan, setPlanState] = useState<PlanState>({ when: "later", rider: "Me", group: false });
  const setPlan = (patch: Partial<PlanState>) => setPlanState((p) => ({ ...p, ...patch }));

  if (view === "send") return <SendARide onClose={() => setView("plan")} />;
  if (view === "guest") return <GuestRides onClose={() => setView("plan")} onStart={onWhereTo} />;
  if (view === "plan")
    return (
      <PlanRide
        onBack={() => setView("home")}
        onWhereTo={onWhereTo}
        onSend={() => setView("send")}
        onGuest={() => setView("guest")}
        plan={plan}
        setPlan={setPlan}
      />
    );

  return (
    <div className="relative flex h-full flex-col bg-white pt-[54px] text-[#111]" style={{ fontFamily: "-apple-system,'Helvetica Neue',system-ui,sans-serif" }}>
      {/* Uber / Parcel tabs */}
      <div className="flex flex-none items-end justify-center gap-8 border-b border-[#F0F0F0] px-5 pb-0">
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-1.5 pb-2 text-[17px] font-extrabold">
            {carGlyph("#111111")} Uber
          </div>
          <div className="h-[3px] w-full rounded-full bg-black" />
        </div>
        <div className="flex items-center gap-1.5 pb-[11px] text-[17px] font-semibold text-[#8A8A8A]">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <rect x="4" y="8" width="16" height="12" rx="2" fill="#E8C79B" />
            <path d="M4 12h16" stroke="#B98A4C" strokeWidth="1.6" />
          </svg>
          Parcel
        </div>
      </div>

      {/* scrollable body */}
      <div className="hscroll min-h-0 flex-1 overflow-y-auto px-4 pb-[120px] pt-4">
        {/* where to + later */}
        <div className="flex w-full items-center gap-3 rounded-full bg-[#F3F3F3] py-2 pl-4 pr-2">
          <button type="button" onClick={onWhereTo} className="flex flex-1 items-center gap-3 py-1 text-left">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="11" cy="11" r="6.5" stroke="#111" strokeWidth="2" />
              <path d="M16 16l4.5 4.5" stroke="#111" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <span className="flex-1 text-left text-[19px] font-semibold text-[#333]">Where to?</span>
          </button>
          <button
            type="button"
            onClick={() => setView("plan")}
            className="flex items-center gap-1.5 rounded-full bg-white px-3.5 py-2 text-[13.5px] font-bold transition-shadow hover:shadow-[0_2px_10px_rgba(0,0,0,.12)]"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <rect x="4" y="6" width="16" height="14" rx="2" stroke="#111" strokeWidth="1.8" />
              <path d="M4 10h16M9 3v5M15 3v5" stroke="#111" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
            Later
          </button>
        </div>

        {/* SafeRide Priority entry point (the feature this concept adds) */}
        <button
          type="button"
          onClick={onWhereTo}
          className="mt-3 flex w-full items-center gap-3 rounded-2xl bg-[#0A0D13] p-3.5 text-left text-white"
          style={{ animation: "slideup .4s ease both" }}
        >
          <span className="relative flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-[#16264A]">
            <span className="absolute inset-0 rounded-xl bg-[#276EF1] opacity-30" style={{ animation: "softpulse 2.4s ease infinite" }} />
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M12 2.5l7.5 3v6c0 4.6-3.2 8.4-7.5 10-4.3-1.6-7.5-5.4-7.5-10v-6l7.5-3z" fill="#276EF1" />
              <path d="M8.7 12l2.3 2.3 4.3-4.6" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <span className="flex-1">
            <span className="flex items-center gap-1.5">
              <span className="text-[14px] font-extrabold">SafeRide Priority</span>
              <span className="rounded-full bg-[#276EF1] px-1.5 py-px text-[9px] font-bold">NEW</span>
            </span>
            <span className="mt-0.5 block text-[11.5px] leading-snug text-[#A9B4C4]">
              It&apos;s late. Plan a safer ride with guidance, trip sharing and vetted drivers.
            </span>
          </span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M9 5l7 7-7 7" stroke="#8FB0FF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {/* saved places */}
        <div className="mt-3 rounded-2xl border border-[#EEEEEE]">
          {[
            ["Cyber Towers", "HITEC City Main Road, Madhapur, Hyd…"],
            ["Lakeview Residency", "Lane 4, Kondapur, Hyderabad, Telanga…"],
          ].map(([name, addr], i) => (
            <button key={name} type="button" onClick={onWhereTo} className={`flex w-full items-center gap-3 px-3.5 py-3 text-left ${i === 0 ? "border-b border-[#F0F0F0]" : ""}`}>
              <span className="flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-[#F3F3F3]">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M12 21s-6.5-5.4-6.5-10.2A6.5 6.5 0 0112 4.5a6.5 6.5 0 016.5 6.3C18.5 15.6 12 21 12 21z" stroke="#111" strokeWidth="1.8" />
                  <circle cx="12" cy="10.8" r="2" fill="#111" />
                </svg>
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[14.5px] font-bold">{name}</span>
                <span className="block truncate text-[12px] text-ink-faint">{addr}</span>
              </span>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M9 5l7 7-7 7" stroke="#9AA0A6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          ))}
        </div>

        {/* for you */}
        <div className="mt-5 flex items-center justify-between">
          <div className="text-[19px] font-extrabold">For you</div>
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F3F3F3]">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M5 12h14m-6-6l6 6-6 6" stroke="#111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
        <div className="mt-3 grid grid-cols-4 gap-x-2 gap-y-4">
          <ServiceTile label="Trip" tag="25%">{carGlyph("#B9C0C9")}</ServiceTile>
          <ServiceTile label="Parcel">
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <rect x="5" y="8" width="14" height="11" rx="1.5" fill="#E8C79B" />
              <path d="M5 12h14M12 8v11" stroke="#B98A4C" strokeWidth="1.4" />
            </svg>
          </ServiceTile>
          <ServiceTile label="Auto">{autoGlyph}</ServiceTile>
          <ServiceTile label="Bus & Train" tag="Promo">
            <svg width="34" height="26" viewBox="0 0 34 26" fill="none" aria-hidden="true">
              <rect x="3" y="5" width="20" height="14" rx="3" fill="#7FB2E5" />
              <rect x="6" y="8" width="14" height="5" rx="1" fill="#DCEBFA" />
              <circle cx="8" cy="21" r="2.4" fill="#111" />
              <circle cx="18" cy="21" r="2.4" fill="#111" />
              <rect x="24" y="7" width="8" height="10" rx="2" fill="#E8A33D" />
            </svg>
          </ServiceTile>
          <ServiceTile label="Rentals" tag="20%">
            <svg width="36" height="26" viewBox="0 0 44 26" fill="none" aria-hidden="true">
              <path d="M6 17l2.5-7A3 3 0 0111.3 8h13.4a3 3 0 012.8 2l2.5 7v6h-3.6v-2.6H9.6V23H6v-6z" fill="#C9CED4" />
              <circle cx="30" cy="8" r="6" fill="#fff" stroke="#111" strokeWidth="1.6" />
              <path d="M30 5v3l2 1.5" stroke="#111" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </ServiceTile>
          <ServiceTile label="Bike">
            <svg width="32" height="24" viewBox="0 0 32 24" fill="none" aria-hidden="true">
              <circle cx="7" cy="17" r="4.5" stroke="#D2691E" strokeWidth="2" />
              <circle cx="25" cy="17" r="4.5" stroke="#D2691E" strokeWidth="2" />
              <path d="M7 17l5-9h7l6 9M12 8l-2-3h4" stroke="#111" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </ServiceTile>
          <ServiceTile label="Intercity">
            <svg width="36" height="26" viewBox="0 0 44 26" fill="none" aria-hidden="true">
              <path d="M6 17l2.5-7A3 3 0 0111.3 8h13.4a3 3 0 012.8 2l2.5 7v6h-3.6v-2.6H9.6V23H6v-6z" fill="#DDE3E7" />
              <rect x="30" y="10" width="7" height="10" rx="1.5" fill="#545454" />
              <circle cx="12" cy="19.6" r="2" fill="#111" />
              <circle cx="26" cy="19.6" r="2" fill="#111" />
            </svg>
          </ServiceTile>
          <ServiceTile label="Store pick-up">
            <svg width="30" height="28" viewBox="0 0 30 28" fill="none" aria-hidden="true">
              <rect x="4" y="10" width="22" height="14" rx="2" fill="#F5F0E6" stroke="#C9CED4" />
              <path d="M4 10l3-5h16l3 5" fill="#7CC29A" />
              <rect x="9" y="14" width="6" height="7" rx="1" fill="#E8A33D" />
            </svg>
          </ServiceTile>
        </div>

        {/* outstation getaways · tapping one starts an outstation SafeRide Priority booking */}
        <div className="mt-6 flex items-baseline justify-between">
          <div className="text-[19px] font-extrabold">Outstation getaways</div>
          <span className="text-[10.5px] font-semibold text-brand-dark">SafeRide Priority works here too</span>
        </div>
        <div className="hscroll -mr-4 mt-3 flex gap-3 overflow-x-auto pr-4" role="group" aria-label="Outstation getaways">
          <button type="button" onClick={onOutstation ?? onWhereTo} className="text-left">
          <SceneCard wide title="Nagarjuna Sagar" sub="Starting at ₹2,499">
            <svg viewBox="0 0 248 104" className="h-full w-full" aria-hidden="true">
              <rect width="248" height="104" fill="#8FA8B8" />
              <rect y="0" width="248" height="34" fill="#B7C9D4" />
              <path d="M0 34 H248 V52 H0 z" fill="#6E8898" />
              {[20, 52, 84, 116, 148, 180, 212].map((x) => (
                <path key={x} d={`M${x} 52 q6 26 -4 52 h22 q-8 -26 -2 -52 z`} fill="#EAF2F6" opacity=".9" />
              ))}
              <rect y="96" width="248" height="8" fill="#DCE9EF" />
            </svg>
          </SceneCard>
          </button>
          <button type="button" onClick={onOutstation ?? onWhereTo} className="text-left">
          <SceneCard wide title="Ramappa Temple" sub="Starting at ₹3,499">
            <svg viewBox="0 0 248 104" className="h-full w-full" aria-hidden="true">
              <rect width="248" height="104" fill="#CBBF9E" />
              <rect y="0" width="248" height="40" fill="#DED4B4" />
              <path d="M60 104 V54 h24 v50 z M84 54 l-12 -22 -12 22 z" fill="#8A6F45" />
              <path d="M124 104 V38 h36 v66 z M124 38 l18 -20 18 20 z" fill="#75603D" />
              <path d="M186 104 V60 h20 v44 z" fill="#8A6F45" />
              <ellipse cx="40" cy="100" rx="30" ry="8" fill="#7C9A62" />
              <ellipse cx="220" cy="102" rx="26" ry="7" fill="#7C9A62" />
            </svg>
          </SceneCard>
          </button>
        </div>

        {/* more ways */}
        <div className="mt-6 text-[19px] font-extrabold">More ways to use Uber</div>
        <div className="hscroll -mr-4 mt-3 flex gap-3 overflow-x-auto pr-4">
          <SceneCard wide title="Send a parcel" sub="On-demand delivery across town">
            <svg viewBox="0 0 248 104" className="h-full w-full" aria-hidden="true">
              <rect width="248" height="104" fill="#EDEDED" />
              <path d="M0 84 H248" stroke="#C9CED4" strokeWidth="10" />
              <circle cx="96" cy="84" r="14" fill="#111" />
              <circle cx="150" cy="84" r="14" fill="#111" />
              <path d="M86 62 q30 -14 70 0 l-6 20 h-58 z" fill="#2B2B2B" />
              <rect x="150" y="40" width="22" height="18" rx="2" fill="#C96F3B" />
              <circle cx="118" cy="40" r="9" fill="#E8B08A" />
              <rect x="108" y="48" width="20" height="18" rx="6" fill="#3A3A3A" />
            </svg>
          </SceneCard>
          <SceneCard wide title="Safety Toolkit" sub="On-trip help with safety issues">
            <svg viewBox="0 0 248 104" className="h-full w-full" aria-hidden="true">
              <rect width="248" height="104" fill="#16264A" />
              <rect x="86" y="14" width="76" height="104" rx="10" fill="#0A0D13" />
              <rect x="92" y="22" width="64" height="90" rx="6" fill="#8FB4F2" />
              <path d="M96 40 l24 24 M120 30 l30 34 M100 78 l30 24" stroke="#EFF4FE" strokeWidth="7" />
              <path d="M124 62 l6.5 2.6v5.2c0 4 -2.8 7.4 -6.5 8.8 -3.7 -1.4 -6.5 -4.8 -6.5 -8.8v-5.2z" fill="#276EF1" />
              <circle cx="196" cy="70" r="22" fill="#C68B62" />
            </svg>
          </SceneCard>
          <SceneCard wide title="Premier trips" sub="Top-rated drivers, newer cars">
            <svg viewBox="0 0 248 104" className="h-full w-full" aria-hidden="true">
              <rect width="248" height="104" fill="#B8956F" />
              <rect y="0" width="248" height="30" fill="#DCEBFA" />
              <rect x="20" y="30" width="228" height="74" rx="6" fill="#5C4A38" />
              <rect x="44" y="42" width="52" height="46" rx="8" fill="#8A5A3C" />
              <rect x="112" y="42" width="52" height="46" rx="8" fill="#8A5A3C" />
              <circle cx="196" cy="52" r="16" fill="#C68B62" />
              <path d="M176 104 q0 -30 20 -30 q20 0 20 30 z" fill="#4A6B8A" />
            </svg>
          </SceneCard>
          <SceneCard wide title="Insure your rides" sub="₹10L coverage, OPD & more, TCA">
            <svg viewBox="0 0 248 104" className="h-full w-full" aria-hidden="true">
              <rect width="248" height="104" fill="#DDEBE2" />
              <circle cx="124" cy="46" r="20" fill="#C68B62" />
              <path d="M96 104 q0 -34 28 -34 q28 0 28 34 z" fill="#4E8E77" />
              <rect x="150" y="58" width="26" height="30" rx="4" fill="#B26205" />
              <path d="M84 40 l6 2.4v4.6c0 3.6 -2.5 6.6 -6 7.8 -3.5 -1.2 -6 -4.2 -6 -7.8v-4.6z" fill="#0E8345" />
            </svg>
          </SceneCard>
        </div>

        {/* ride as you like it */}
        <div className="mt-6 text-[19px] font-extrabold">Ride as you like it</div>
        <div className="hscroll -mr-4 mt-3 flex gap-3 overflow-x-auto pr-4">
          <SceneCard wide title="Book Auto" sub="Everyday commute made effortless">
            <svg viewBox="0 0 248 104" className="h-full w-full" aria-hidden="true">
              <rect width="248" height="104" fill="#CFE3EE" />
              <rect y="80" width="248" height="24" fill="#9DB3C0" />
              <path d="M70 82 v-34 a10 10 0 0110-10 h52 l26 22 h18 a8 8 0 018 8 v14 z" fill="#F6BC2F" />
              <path d="M84 46 h40 v20 h-46 z" fill="#0E8345" />
              <circle cx="92" cy="84" r="10" fill="#111" />
              <circle cx="164" cy="84" r="10" fill="#111" />
            </svg>
          </SceneCard>
          <SceneCard wide title="Book Go" sub="Affordable car rides">
            <svg viewBox="0 0 248 104" className="h-full w-full" aria-hidden="true">
              <rect width="248" height="104" fill="#BFD3E6" />
              <rect y="78" width="248" height="26" fill="#8FA6B8" />
              <path d="M56 80 v-18 a8 8 0 018-8 h16 l18 -20 a10 10 0 017.6-3.4 h38 a10 10 0 017.6 3.4 l18 20 h10 a8 8 0 018 8 v18 z" fill="#4A7DB5" />
              <path d="M104 38 l-14 16 h30 v-16 z M126 38 v16 h28 l-14 -16 z" fill="#D6E4F0" />
              <circle cx="86" cy="82" r="11" fill="#111" />
              <circle cx="170" cy="82" r="11" fill="#111" />
            </svg>
          </SceneCard>
          <SceneCard wide title="Book Premier" sub="Extra comfort for special days">
            <svg viewBox="0 0 248 104" className="h-full w-full" aria-hidden="true">
              <rect width="248" height="104" fill="#2C2A52" />
              <ellipse cx="124" cy="88" rx="90" ry="14" fill="#C9A85C" opacity=".5" />
              <path d="M52 84 v-16 a8 8 0 018-8 h18 l16 -18 a10 10 0 017.6-3.4 h40 a10 10 0 017.6 3.4 l16 18 h12 a8 8 0 018 8 v16 z" fill="#14121F" />
              <path d="M102 42 l-12 14 h28 v-14 z M124 42 v14 h30 l-13 -14 z" fill="#57547E" />
              <circle cx="84" cy="86" r="10" fill="#000" />
              <circle cx="168" cy="86" r="10" fill="#000" />
            </svg>
          </SceneCard>
          <SceneCard wide title="Book Intercity" sub="Travel outstation with ease">
            <svg viewBox="0 0 248 104" className="h-full w-full" aria-hidden="true">
              <rect width="248" height="104" fill="#E9D8A6" />
              <rect y="82" width="248" height="22" fill="#5E6B73" />
              <path d="M60 84 v-26 a9 9 0 019-9 h26 l16 -16 a10 10 0 017.4-3.2 h30 a10 10 0 017.4 3.2 l16 16 h8 a9 9 0 019 9 v26 z" fill="#EDEDED" />
              <circle cx="90" cy="86" r="10" fill="#111" />
              <circle cx="168" cy="86" r="10" fill="#111" />
            </svg>
          </SceneCard>
          <SceneCard wide title="Book Bike" sub="Zip through traffic">
            <svg viewBox="0 0 248 104" className="h-full w-full" aria-hidden="true">
              <rect width="248" height="104" fill="#B49B5E" />
              <path d="M0 0 h248 v104 h-248 z" fill="#9C8A55" opacity=".5" />
              <path d="M40 30 q60 24 120 10 M60 60 q70 20 130 4" stroke="#7A6B40" strokeWidth="5" opacity=".6" />
              <rect x="150" y="34" width="56" height="40" rx="6" fill="#F3F3F3" />
              <rect x="168" y="46" width="16" height="16" fill="#111" />
              <path d="M96 70 a16 10 0 1032 0 a16 10 0 10-32 0" fill="#EDEDED" />
              <rect x="100" y="52" width="26" height="14" rx="6" fill="#E06A2C" />
              <ellipse cx="70" cy="46" rx="34" ry="18" fill="#4A4034" opacity=".55" />
              <ellipse cx="128" cy="86" rx="46" ry="8" fill="#4A4034" opacity=".4" />
            </svg>
          </SceneCard>
          <SceneCard wide title="Intercity buses" sub="Your next journey is a tap away">
            <svg viewBox="0 0 248 104" className="h-full w-full" aria-hidden="true">
              <rect width="248" height="104" fill="#D9E4D2" />
              <rect y="78" width="248" height="26" fill="#C0B49A" />
              <rect x="70" y="10" width="120" height="76" rx="10" fill="#EDEDED" />
              <path d="M78 22 h104 v26 h-104 z" fill="#3A4A5A" />
              <circle cx="92" cy="80" r="8" fill="#111" />
              <circle cx="168" cy="80" r="8" fill="#111" />
              <rect x="80" y="56" width="14" height="8" rx="2" fill="#F6E27A" />
              <rect x="166" y="56" width="14" height="8" rx="2" fill="#F6E27A" />
              <rect x="14" y="30" width="40" height="48" rx="4" fill="#8FA88A" />
              <rect x="206" y="40" width="32" height="38" rx="4" fill="#8FA88A" />
            </svg>
          </SceneCard>
          <SceneCard wide title="Reserve your ride" sub="Reliable airport trips">
            <svg viewBox="0 0 248 104" className="h-full w-full" aria-hidden="true">
              <rect width="248" height="104" fill="#AFCBE8" />
              <rect x="10" y="12" width="120" height="34" rx="4" fill="#DCEBFA" />
              <path d="M28 24 h60 M28 32 h44" stroke="#7FA3C8" strokeWidth="4" />
              <path d="M196 14 l14 6 -10 8 z" fill="#F3F3F3" />
              <rect y="80" width="248" height="24" fill="#8FA6B8" />
              <path d="M50 82 v-16 a8 8 0 018-8 h18 l16 -18 a10 10 0 017.4-3.4 h34 a10 10 0 017.4 3.4 l16 18 h10 a8 8 0 018 8 v16 z" fill="#EDF3F8" />
              <path d="M96 40 l-12 14 h26 v-14 z M116 40 v14 h26 l-12 -14 z" fill="#4A7DB5" />
              <circle cx="80" cy="84" r="10" fill="#111" />
              <circle cx="160" cy="84" r="10" fill="#111" />
              <circle cx="196" cy="60" r="14" fill="#C68B62" />
              <path d="M182 104 q0 -26 14 -26 q14 0 14 26 z" fill="#8A2E3C" />
            </svg>
          </SceneCard>
          <SceneCard wide title="Book Uber XL" sub="Travel with luggage and friends">
            <svg viewBox="0 0 248 104" className="h-full w-full" aria-hidden="true">
              <rect width="248" height="104" fill="#C7D6C0" />
              <rect x="150" y="10" width="80" height="50" rx="6" fill="#D8E4F0" />
              <path d="M20 84 v-30 a10 10 0 0110-10 h20 l14 -14 a10 10 0 017.4-3 h30 c14 0 26 10 30 26 l4 31 z" fill="#C0402E" />
              <rect x="58" y="36" width="34" height="18" rx="4" fill="#F2D8CE" />
              <circle cx="46" cy="86" r="11" fill="#111" />
              <circle cx="112" cy="86" r="11" fill="#111" />
              <circle cx="160" cy="52" r="12" fill="#C68B62" />
              <path d="M148 96 q0 -24 12 -24 q12 0 12 24 z" fill="#2E4A6B" />
              <circle cx="196" cy="56" r="10" fill="#E8B08A" />
              <path d="M186 96 q0 -20 10 -20 q10 0 10 20 z" fill="#C9873B" />
              <rect x="212" y="72" width="18" height="24" rx="3" fill="#5C4A38" />
            </svg>
          </SceneCard>
          <SceneCard wide title="Book Rentals" sub="Travel stress-free all day">
            <svg viewBox="0 0 248 104" className="h-full w-full" aria-hidden="true">
              <rect width="248" height="104" fill="#F2E4DA" />
              <circle cx="124" cy="52" r="40" fill="#F3F3F3" stroke="#111" strokeWidth="8" />
              <path d="M124 30 v22 l14 8" stroke="#111" strokeWidth="6" strokeLinecap="round" />
              <path d="M124 96 c-4 -10 -14 -12 -14 -22 a14 14 0 0128 0 c0 10 -10 12 -14 22z" fill="#C0402E" />
              <path d="M176 70 q26 -8 44 6" stroke="#7FA3E8" strokeWidth="5" strokeDasharray="8 7" fill="none" />
              <path d="M186 86 v-8 a5 5 0 015-5 h10 l8 -9 a6 6 0 014.5-2 h16 a6 6 0 014.5 2 l8 9 h2 v13 z" fill="#4A7DB5" />
              <circle cx="200" cy="88" r="6" fill="#111" />
              <circle cx="236" cy="88" r="6" fill="#111" />
            </svg>
          </SceneCard>
        </div>

        {/* promo carousel, in the order of the reference scroll captures */}
        <div className="hscroll -mr-4 mt-6 flex snap-x gap-3 overflow-x-auto pr-4">
          {[
            {
              title: "Your future self says thanks 😌",
              cta: "Join for free",
              cls: "border border-[#EEEEEE] bg-white",
              art: (
                <svg width="96" viewBox="0 0 96 132" className="h-full flex-none" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                  <rect width="96" height="132" fill="#8A6A28" />
                  <circle cx="54" cy="58" r="24" fill="#E5B94E" stroke="#B98E2F" strokeWidth="5" />
                  <circle cx="38" cy="84" r="22" fill="#EFCB69" stroke="#C79B3A" strokeWidth="5" />
                  <path d="M78 28 l3 6 6 3 -6 3 -3 6 -3 -6 -6 -3 6 -3 z" fill="#FFF3C4" />
                </svg>
              ),
            },
            {
              title: "20% off Premier Rentals ends soon!",
              cta: "Book now",
              cls: "border border-[#EEEEEE] bg-white",
              art: (
                <svg width="96" viewBox="0 0 96 132" className="h-full flex-none" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                  <rect width="96" height="132" fill="#F2C4B8" />
                  <path d="M10 20 q40 -14 76 8 q10 40 -12 72 q-44 12 -66 -14 q-12 -34 2 -66z" fill="#EDA391" />
                  <circle cx="62" cy="52" r="22" fill="#F3F3F3" stroke="#111" strokeWidth="4" />
                  <path d="M62 40 v12 l9 5" stroke="#C0402E" strokeWidth="3.5" strokeLinecap="round" />
                  <path d="M14 88 v-9 a6 6 0 016-6 h12 l9 -10 a7 7 0 015.2-2.3 h18 a7 7 0 015.2 2.3 l9 10 h3 v15 z" fill="#F3F3F3" />
                  <circle cx="30" cy="90" r="7" fill="#111" />
                  <circle cx="68" cy="90" r="7" fill="#111" />
                </svg>
              ),
            },
            {
              title: "Go outstation with Uber 🌍",
              cta: "Try Intercity",
              cls: "bg-[#2A46C4] text-white",
              art: (
                <svg width="96" viewBox="0 0 96 132" className="h-full flex-none" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                  <rect width="96" height="132" fill="#3E5A2E" />
                  <path d="M0 0 h96 v40 l-96 14 z" fill="#8A5A3C" />
                  <path d="M8 96 v-16 a8 8 0 018-8 h20 l12 -14 a9 9 0 016.8-3 h20 a9 9 0 016.8 3 l4.4 5" fill="#EDEDED" />
                  <rect x="8" y="72" width="80" height="26" rx="8" fill="#EDEDED" />
                  <circle cx="26" cy="100" r="8" fill="#111" />
                  <circle cx="70" cy="100" r="8" fill="#111" />
                  <circle cx="30" cy="52" r="8" fill="#C68B62" />
                  <circle cx="52" cy="50" r="7" fill="#E8B08A" />
                  <rect x="60" y="56" width="16" height="18" rx="3" fill="#C9873B" />
                </svg>
              ),
            },
            {
              title: "Trusted rides, smart alerts=happy parents ❤️",
              cta: "Learn more",
              cls: "bg-[#F6D7CD]",
              art: (
                <svg width="96" viewBox="0 0 96 132" className="h-full flex-none" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                  <rect width="96" height="132" fill="#6B4A7A" />
                  <circle cx="30" cy="34" r="16" fill="#7CC29A" />
                  <rect x="52" y="16" width="34" height="34" rx="4" fill="#9A6FAE" />
                  <circle cx="56" cy="76" r="14" fill="#E8B08A" />
                  <path d="M40 132 q0 -34 16 -34 q16 0 16 34 z" fill="#8FA3D0" />
                  <rect x="26" y="88" width="18" height="26" rx="4" fill="#F3F3F3" />
                  <path d="M35 96 l3.5 1.4v2.8c0 2.2 -1.5 4 -3.5 4.8 -2 -.8 -3.5 -2.6 -3.5 -4.8v-2.8z" fill="#276EF1" />
                </svg>
              ),
            },
            {
              title: "Salary has entered the chat 💸",
              cta: "Book now",
              cls: "border border-[#EEEEEE] bg-white",
              art: (
                <svg width="96" viewBox="0 0 96 132" className="h-full flex-none" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                  <rect width="96" height="132" fill="#E9C43C" />
                  <circle cx="26" cy="58" r="10" fill="#C68B62" />
                  <circle cx="52" cy="48" r="10" fill="#8A5A3C" />
                  <circle cx="76" cy="60" r="10" fill="#E8B08A" />
                  <path d="M16 132 q0 -28 10 -28 t10 28 M42 132 q0 -32 10 -32 t10 32 M66 132 q0 -26 10 -26 t10 26" fill="#3A6B8A" />
                  <path d="M12 24 q16 10 30 -2 M56 20 q14 12 28 2" stroke="#C05A8E" strokeWidth="4" fill="none" strokeLinecap="round" />
                  <circle cx="20" cy="16" r="3" fill="#fff" />
                  <circle cx="70" cy="34" r="3" fill="#fff" />
                </svg>
              ),
            },
            {
              title: "Insure your loved ones",
              cta: "Get started",
              cls: "bg-[#F8E8DC]",
              art: (
                <svg width="96" viewBox="0 0 96 132" className="h-full flex-none" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                  <rect width="96" height="132" fill="#8FA6B8" />
                  <path d="M0 92 h96 v40 h-96 z" fill="#C9A85C" />
                  <path d="M6 66 v-14 a8 8 0 018-8 h18 l12 -14 a9 9 0 016.8-3 h18 a9 9 0 016.8 3 l6.4 8" fill="#14121F" />
                  <rect x="6" y="44" width="76" height="24" rx="8" fill="#14121F" />
                  <circle cx="24" cy="70" r="8" fill="#000" />
                  <circle cx="64" cy="70" r="8" fill="#000" />
                  <circle cx="34" cy="94" r="6" fill="#C68B62" />
                  <circle cx="48" cy="92" r="7" fill="#E8B08A" />
                  <circle cx="62" cy="95" r="5" fill="#8A5A3C" />
                  <path d="M28 132 q0 -22 34 -22 q0 22 0 22 z" fill="#7C5B8A" />
                </svg>
              ),
            },
            {
              title: "Travel on your schedule",
              cta: "Reserve a ride",
              cls: "bg-[#2A46C4] text-white",
              art: (
                <svg width="96" viewBox="0 0 96 132" className="h-full flex-none" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                  <rect width="96" height="132" fill="#EDEDED" />
                  <rect x="8" y="14" width="80" height="72" rx="4" fill="#fff" stroke="#C9CED4" />
                  {[26, 44, 62].map((y) =>
                    [16, 34, 52, 70].map((x) => <rect key={`${x}${y}`} x={x} y={y} width="12" height="10" rx="2" fill="#E7EBEF" />)
                  )}
                  <circle cx="40" cy="31" r="8" fill="none" stroke="#2A46C4" strokeWidth="2.5" />
                  <path d="M20 96 a26 26 0 0152 0 v36 h-52 z" fill="#8A5A3C" />
                  <rect x="30" y="88" width="32" height="52" rx="8" fill="#14121F" />
                  <circle cx="46" cy="106" r="10" fill="#fff" />
                  <path d="M42 106 h8 M46 102 v8" stroke="#C0402E" strokeWidth="2.4" />
                </svg>
              ),
            },
          ].map((p) => (
            <div key={p.title} className={`flex h-[132px] w-[248px] flex-none snap-start overflow-hidden rounded-2xl ${p.cls}`}>
              <div className="flex flex-1 flex-col justify-between p-3.5">
                <div className="text-[14.5px] font-extrabold leading-snug">{p.title}</div>
                <button type="button" className={`w-max rounded-full px-3.5 py-2 text-[12.5px] font-bold ${p.cls.includes("text-white") ? "bg-white text-[#111]" : "bg-[#F3F3F3]"}`}>
                  {p.cta}
                </button>
              </div>
              {p.art}
            </div>
          ))}
        </div>
      </div>

      {/* floating promo + bottom nav */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30 pb-2">
        <div className="mx-auto mb-2 flex w-max items-center gap-2.5 rounded-full bg-white px-4 py-2 text-[13px] font-bold shadow-[0_4px_16px_rgba(0,0,0,.16)]">
          {autoGlyph}
          12% off Auto
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="12" cy="12" r="9" stroke="#9AA0A6" strokeWidth="1.6" />
            <path d="M12 8v5m0 3v.2" stroke="#9AA0A6" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
          <span className="ml-1 text-[#6B6B6B]">✕</span>
        </div>
        <div className="mx-auto flex w-[86%] items-center justify-between rounded-full bg-white px-6 py-2.5 shadow-[0_8px_28px_rgba(0,0,0,.16)]">
          {[
            ["Home", true],
            ["Services", false],
            ["Activity", false],
            ["Account", false],
          ].map(([label, active]) => (
            <div key={label as string} className="flex flex-col items-center gap-0.5">
              <span className={`flex h-8 w-11 items-center justify-center rounded-full ${active ? "bg-[#F0F0F0]" : ""}`}>
                {label === "Home" && (
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none"><path d="M4 11l8-7 8 7v9a1 1 0 01-1 1h-5v-6h-4v6H5a1 1 0 01-1-1z" fill="#111" /></svg>
                )}
                {label === "Services" && (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">{[5, 12, 19].map((x) => [5, 12, 19].map((y) => <circle key={`${x}${y}`} cx={x} cy={y} r="1.7" fill="#6B6B6B" />))}</svg>
                )}
                {label === "Activity" && (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M6 3h12v18l-6-4-6 4z" stroke="#6B6B6B" strokeWidth="1.8" strokeLinejoin="round" /></svg>
                )}
                {label === "Account" && (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="3.4" stroke="#6B6B6B" strokeWidth="1.8" /><path d="M5 20c1-4 3.8-6 7-6s6 2 7 6" stroke="#6B6B6B" strokeWidth="1.8" strokeLinecap="round" /></svg>
                )}
              </span>
              <span className={`text-[10.5px] ${active ? "font-bold text-[#111]" : "font-semibold text-[#6B6B6B]"}`}>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
