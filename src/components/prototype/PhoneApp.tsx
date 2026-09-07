"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { JUMP_EVENT } from "../ui";
import {
  DRIVERS,
  FEMALE_RIDER_DRIVER_ALERT,
  FEMALE_RIDER_GPS_NOTE,
  MATCH_COMMIT_NOTE,
  OUTSTATION_DROPS,
  REASON_ANY_HOUR_NOTE,
  REASON_PRIVACY_NOTE,
  REASON_QUEUE_LABELS,
  REASON_TIER_LINES,
  TRIP_REASONS,
  tripReason,
  OUTSTATION_ETA_LABEL,
  TRIP_ETA_MINUTES,
  TRIP_PIN,
  buildCircleSms,
  canAddContact,
  contactInitials,
  isWithinLateNightWindow,
  parseTimeLabel,
  pickupSlots,
  vehicleLine,
} from "@/server/rules";

import UberHome from "./UberHome";
import ContactView from "./ContactView";
import { CityMapLayers, CityMapMarkers, MAP_ROUTE_PATH } from "./CityMap";

export type Scenario = "elevated" | "lower" | "limited-data";

/* Screen map. Step 0 is the Uber splash: an unnumbered launch state that
   plays for a few seconds and lands on screen 1, like the real app opening.
   Screen 1 is the Uber Home. Steps 2 to 8 are the 7-step safety flow,
   shown to the user as Step 1 of 7 through Step 7 of 7. */
export const APP_SCREENS = [
  { n: "1", title: "Uber Home", desc: "Familiar home, with the SafeRide Priority entry point" },
];
export const FLOW_SCREENS = [
  { n: "1", title: "Demo Booking", desc: "Trip, why this ride, SafeRide Priority toggle" },
  { n: "2", title: "Contextual Safety Brief", desc: "Category, reasons, confidence" },
  { n: "3", title: "Safer Anchors", desc: "Visible, staffed drop alternatives" },
  { n: "4", title: "Safety Priority Match", desc: "Standard vs eligible driver trade-off" },
  { n: "5", title: "Safety Circle", desc: "Contacts, policy, explicit consent" },
  { n: "6", title: "Active Trip", desc: "Toolkit + simulated progress" },
  { n: "7", title: "Arrival Check-In", desc: "Neutral close of the loop" },
];

export interface CircleInfo {
  selNames: string[];
  driverKind: "standard" | "priority";
  dropShort: string;
  /** the destination she typed, before any safer anchor */
  destination: string;
  pickup: string;
  time: string;
  policy: string;
  sharingOn: boolean;
  tripEnded: boolean;
  checkInSafe: boolean;
  tripType: "city" | "outstation";
  etaLabel: string;
  anchor: string | null;
  step: number;
}

export interface PhoneAppProps {
  scenario: Scenario;
  riderName: string;
  showNoResponse: boolean;
  onStepChange?: (step: number) => void;
  onCircleChange?: (info: CircleInfo) => void;
}

/* ─────────────────────────── seeded demo data ─────────────────────────── */

const SCENARIOS: Record<
  Scenario,
  {
    label: string;
    bg: string;
    fg: string;
    dot: string;
    conf: string;
    fill: number;
    reasons: string[];
    recs: { n: string; t: string; d: string }[];
  }
> = {
  elevated: {
    label: "Elevated contextual risk",
    bg: "#FFF1D6",
    fg: "#7A4E00",
    dot: "#F6BC2F",
    conf: "Data confidence: Medium",
    fill: 2,
    reasons: [
      "Your trip is planned after midnight",
      "This drop point has fewer verified public/staffed anchors nearby",
      "A staffed entrance 180 m away is available as an alternative drop point",
    ],
    recs: [
      { n: "1", t: "Review Safer Anchors", d: "A staffed metro entrance is 180 m from your drop." },
      { n: "2", t: "Consider Safety Priority Match", d: "An eligible driver is available with a 4-minute longer wait." },
      { n: "3", t: "Enable Safety Circle", d: "Share this trip under your saved policy." },
    ],
  },
  lower: {
    label: "Lower contextual risk",
    bg: "#EAF6EF",
    fg: "#0E8345",
    dot: "#06C167",
    conf: "Data confidence: High",
    fill: 3,
    reasons: [
      "Available signals for this route are relatively favourable",
      "The route stays on continuous, well-trafficked main roads",
      "Multiple staffed anchors are near your drop point",
    ],
    recs: [
      { n: "1", t: "Continue with your booking", d: "No extra precautions suggested for this trip." },
      { n: "2", t: "Optional: share your trip", d: "Safety Circle is available if you want company on the way." },
    ],
  },
  "limited-data": {
    label: "Limited Data",
    bg: "#EEEEEE",
    fg: "#545454",
    dot: "#A6A6A6",
    conf: "Data confidence: Low",
    fill: 1,
    reasons: ["We have limited route/place context for this recommendation"],
    recs: [
      { n: "1", t: "Use standard safety tools", d: "Review driver details, share your trip, keep SOS handy." },
    ],
  },
};

const ANCHORS = [
  { n: "1", name: "Metro Station Entrance", type: "Metro", dist: "180 m walk", extra: "+2 min", why: "Staffed entrance, well-lit" },
  { n: "2", name: "Apollo Clinic Night Gate", type: "Hospital", dist: "240 m walk", extra: "+3 min", why: "24/7 reception, security posted" },
  { n: "3", name: "HP Petrol Pump, Main Rd", type: "Fuel station", dist: "290 m walk", extra: "+3 min", why: "Open all night, attendants present" },
];

interface Contact {
  name: string;
  rel: string;
  initials: string;
  phone?: string;
}

const SEED_CONTACTS: Contact[] = [
  { name: "Ananya", rel: "Roommate", initials: "AN" },
  { name: "Meera", rel: "Sister", initials: "ME" },
  { name: "Rahul D.", rel: "Friend", initials: "RD" },
];

const POLICIES = [
  "Ask every time",
  "Auto-share for rides after 8 PM",
  "Auto-share for Elevated/Higher contextual guidance",
  "Never auto-share",
];

const TRIP_LABELS = ["Driver En Route", "Driver Arrived", "Ride In Progress"];
const TRIP_TIMES = ["12:19 AM", "12:22 AM", "12:24 AM"];

const INITIAL = {
  step: 0,
  pickup: "Cyber Towers, HITEC City",
  drop: "Kondapur, Residential Lane 4",
  tripType: "city" as "city" | "outstation",
  time: "12:15 AM",
  safeRide: true,
  reason: "work",
  reasonOther: "",
  female: false,
  whyOpen: false,
  anchor: null as string | null,
  anchor2: null as string | null,
  match: null as "standard" | "priority" | null,
  wait: false,
  contacts: SEED_CONTACTS,
  sel: { Ananya: true, Meera: true, "Rahul D.": false } as Record<string, boolean>,
  addOpen: false,
  addName: "",
  addPhone: "",
  addRel: "",
  policy: "Auto-share for rides after 8 PM",
  consent: false,
  trip: 0,
  checkIn: "pending" as "pending" | "safe",
  circleOpen: false,
  sheet: false,
  noResp: null as boolean | null,
};

/* ─────────────────────────── small helpers ─────────────────────────── */

function SheetButton({
  onClick,
  className,
  children,
  label,
}: {
  onClick?: () => void;
  className: string;
  children: React.ReactNode;
  label?: string;
}) {
  return (
    <button type="button" onClick={onClick} aria-label={label} className={className}>
      {children}
    </button>
  );
}

const shieldSvg = (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M12 2.5l7.5 3v6c0 4.6-3.2 8.4-7.5 10-4.3-1.6-7.5-5.4-7.5-10v-6l7.5-3z" fill="#276EF1" />
    <path d="M8.7 12l2.3 2.3 4.3-4.6" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* ─────────────────────────────── app ─────────────────────────────── */

export default function PhoneApp({ scenario, riderName, showNoResponse, onStepChange, onCircleChange }: PhoneAppProps) {
  const [s, setS] = useState(INITIAL);
  const set = useCallback((patch: Partial<typeof INITIAL>) => setS((p) => ({ ...p, ...patch })), []);

  useEffect(() => {
    onStepChange?.(s.step);
  }, [s.step, onStepChange]);

  /* jump-to-step from flow cards / rail / auto tour */
  useEffect(() => {
    const onJump = (e: Event) => {
      const detail = (e as CustomEvent<number | { n: number; auto: boolean }>).detail;
      const n = typeof detail === "number" ? detail : detail.n;
      const auto = typeof detail === "number" ? false : detail.auto;
      setS((prev) => {
        const p: typeof INITIAL = { ...prev, step: n, sheet: false, circleOpen: false };
        /* the auto tour makes a sensible choice on each screen it passes */
        if (auto && n >= 2) p.reason = "urgent";
        if (auto && n >= 5 && !prev.anchor) p.anchor = "Metro Station Entrance";
        if (n >= 3) {
          p.safeRide = true;
          const h = parseTimeLabel(prev.time);
          if (h !== null && !isWithinLateNightWindow(h)) p.time = "12:15 AM";
        }
        if (n >= 6 && !prev.match) p.match = "priority";
        if (n >= 7) {
          p.consent = true;
          if (!prev.contacts.some((c) => prev.sel[c.name])) {
            p.sel = { ...prev.sel, [prev.contacts[0]?.name ?? "Ananya"]: true };
          }
        }
        if (n === 7) p.trip = 0;
        if (n >= 8) {
          p.trip = 2;
          p.checkIn = prev.checkIn === "safe" ? "safe" : "pending";
        }
        return p;
      });
    };
    window.addEventListener(JUMP_EVENT, onJump);
    return () => window.removeEventListener(JUMP_EVENT, onJump);
  }, []);

  const sc = SCENARIOS[scenario] ?? SCENARIOS.elevated;
  const drv = s.match === "standard" ? DRIVERS.standard : DRIVERS.priority;
  const drvVeh = vehicleLine(drv);
  const selNames = s.contacts.map((c) => c.name).filter((n) => s.sel[n]);
  /* Rules 7 and 8: SafeRide Priority runs only between 8 PM and 5 AM. */
  const hour = parseTimeLabel(s.time);
  const inWindow = hour === null ? true : isWithinLateNightWindow(hour);
  const safeOn = s.safeRide && inWindow;
  const sharedNames =
    selNames.length === 0
      ? ""
      : selNames.length === 1
        ? selNames[0]
        : selNames.slice(0, -1).join(", ") + " and " + selNames[selNames.length - 1];
  const sharingOn = s.consent && selNames.length > 0 && s.policy !== "Never auto-share";
  const dropShort = s.anchor
    ? `${s.anchor}, ${s.drop.split(",")[0]}`
    : s.drop.split(", ")[0].split(",")[0];
  const etaLabel = s.tripType === "outstation" ? OUTSTATION_ETA_LABEL : `${TRIP_ETA_MINUTES} minutes`;

  /* Mirror the share state up so the contact-view phone stays in sync. */
  const circleKey = JSON.stringify([selNames, s.match, dropShort, s.policy, sharingOn, s.step, s.pickup, s.time, s.checkIn, s.tripType]);
  useEffect(() => {
    onCircleChange?.({
      selNames,
      driverKind: s.match === "standard" ? "standard" : "priority",
      dropShort,
      destination: s.drop.split(",")[0],
      pickup: s.pickup,
      time: s.time,
      policy: s.policy,
      sharingOn,
      tripEnded: s.step >= 8,
      checkInSafe: s.checkIn === "safe",
      tripType: s.tripType,
      etaLabel,
      anchor: s.anchor,
      step: s.step,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [circleKey, onCircleChange]);

  /* Step 0: the Uber splash. Once it is on screen, hold for about five
     seconds, then open the Uber home, like the real app launching. */
  const splashRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (s.step !== 0) return;
    const el = splashRef.current;
    if (!el) return;
    let t: ReturnType<typeof setTimeout> | null = null;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting) && t === null) {
          t = setTimeout(() => setS((p) => (p.step === 0 ? { ...p, step: 1 } : p)), 4500);
          io.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      if (t) clearTimeout(t);
    };
  }, [s.step]);
  const noRespShown = s.noResp ?? showNoResponse;
  const mapChips: Record<number, string> = {
    2: `Tonight · ${s.time}`,
    7: TRIP_LABELS[s.trip],
    8: "Trip completed · 12:45 AM",
  };
  const backVisible = s.step > 2 && s.step < 7;
  const back = () => set({ step: Math.max(2, s.step - 1) });

  /* Rules 35 and 36: up to 5 contacts, typed in or picked from the phone. */
  const canPickContacts = typeof navigator !== "undefined" && "contacts" in navigator;
  const pickFromPhone = async () => {
    try {
      const nav = navigator as Navigator & {
        contacts?: { select: (props: string[], opts?: { multiple?: boolean }) => Promise<{ name?: string[]; tel?: string[] }[]> };
      };
      const picked = await nav.contacts?.select(["name", "tel"], { multiple: false });
      if (picked?.[0]) {
        set({ addName: picked[0].name?.[0] ?? s.addName, addPhone: picked[0].tel?.[0] ?? s.addPhone });
      }
    } catch {
      /* picker closed or unsupported */
    }
  };
  const saveContact = () => {
    const name = s.addName.trim();
    const phone = s.addPhone.trim();
    if (!name || !phone || !canAddContact(s.contacts.length)) return;
    if (s.contacts.some((c) => c.name === name)) return;
    const contact: Contact = { name, rel: s.addRel.trim() || "Friend", initials: contactInitials(name), phone };
    set({
      contacts: [...s.contacts, contact],
      sel: { ...s.sel, [name]: true },
      addOpen: false,
      addName: "",
      addPhone: "",
      addRel: "",
    });
  };
  const sms = buildCircleSms({ riderName, dropShort, driver: drv, etaLabel, anchor: s.anchor });

  const primaryBtn =
    "block w-full rounded-[10px] bg-[#111111] p-3.5 text-center text-[14.5px] font-bold text-white transition-colors";
  const ghostBtn =
    "block w-full rounded-[10px] border-[1.5px] border-[#D8DCE0] p-3.5 text-center text-[14.5px] font-bold";

  /* Step 0: Uber splash. Black screen, wordmark only. Auto-advances. */
  if (s.step === 0) {
    return (
      <button
        ref={splashRef}
        type="button"
        onClick={() => set({ step: 1 })}
        aria-label="Open the app"
        className="flex h-full w-full flex-col items-center justify-center gap-5 bg-black"
      >
        <span
          className="text-[64px] font-medium tracking-[-1px] text-white"
          style={{ fontFamily: "'Uber Move','Helvetica Neue',Helvetica,Arial,sans-serif", animation: "slideup 1s ease both" }}
        >
          Uber
        </span>
        {/* the one thing that tells you this is not the normal Uber launch */}
        <span
          className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-[12px] font-bold tracking-[0.2px] text-white"
          style={{ animation: "slideup 1s .35s ease both" }}
        >
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand" aria-hidden="true">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
              <path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3z" fill="#fff" />
              <path d="M9 12l2 2 4-4.5" stroke="#276EF1" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          Uber × SafeRide Priority
          <span className="rounded-full bg-brand px-1.5 py-0.5 text-[9px] font-extrabold tracking-[1px]">FEATURE</span>
        </span>
      </button>
    );
  }

  /* Button navigation, not a flow screen: the contact's view of the trip. */
  if (s.circleOpen) {
    return (
      <ContactView
        riderName={riderName}
        info={{
          selNames,
          driverKind: s.match === "standard" ? "standard" : "priority",
          dropShort,
          destination: s.drop.split(",")[0],
          pickup: s.pickup,
          time: s.time,
          policy: s.policy,
          sharingOn,
          tripEnded: s.step >= 8,
          checkInSafe: s.checkIn === "safe",
          tripType: s.tripType,
          etaLabel,
          anchor: s.anchor,
          step: s.step,
        }}
        onExit={() => set({ circleOpen: false })}
      />
    );
  }

  /* Screen 1: the Uber home, with the SafeRide Priority entry point. */
  if (s.step === 1) {
    return (
      <UberHome
        onWhereTo={() => set({ step: 2, tripType: "city", drop: "Kondapur, Residential Lane 4" })}
        onOutstation={() => set({ step: 2, tripType: "outstation", drop: OUTSTATION_DROPS[0], anchor: null, anchor2: null })}
      />
    );
  }

  return (
    <div
      className="relative flex h-full flex-col bg-white text-[#111111]"
      style={{ fontFamily: "-apple-system,'Helvetica Neue',system-ui,sans-serif" }}
    >
      {/* ───────────── map header ───────────── */}
      <div className="relative h-[250px] flex-none overflow-hidden bg-[#E9EDF0]">
        <svg width="402" height="250" viewBox="0 0 402 250" className="absolute inset-0" aria-hidden="true">
          <CityMapLayers />
          <path
            d={MAP_ROUTE_PATH}
            fill="none"
            stroke="#111111"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeDasharray="9 7"
            style={{ animation: "routedash 1.4s linear infinite" }}
          />
          <CityMapMarkers />
        </svg>
        {s.step === 4 && (
          <div className="absolute inset-0" aria-hidden="true">
            {[
              { left: 296, top: 106, n: "1" },
              { left: 354, top: 166, n: "2" },
              { left: 288, top: 196, n: "3" },
            ].map((m, i) => {
              const name = ANCHORS[i].name;
              const rank = s.anchor === name ? 1 : s.anchor2 === name ? 2 : 0;
              return (
                <div
                  key={m.n}
                  className="absolute flex items-center justify-center rounded-full bg-safe-dark text-[11px] font-bold text-white"
                  style={{
                    left: rank ? m.left - 2 : m.left,
                    top: rank ? m.top - 2 : m.top,
                    width: rank ? 26 : 22,
                    height: rank ? 26 : 22,
                    border: rank ? "2px solid #fff" : "none",
                    boxShadow: rank ? `0 0 0 2px ${rank === 1 ? "#0E8345" : "rgba(14,131,69,.55)"}, 0 2px 8px rgba(0,0,0,.3)` : "0 2px 6px rgba(0,0,0,.25)",
                    animation: "slideup .3s ease both",
                  }}
                >
                  {m.n}
                  {rank ? (
                    <span className="absolute -top-[17px] left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-white px-1.5 py-px text-[8.5px] font-bold text-safe-dark shadow-[0_1px_4px_rgba(0,0,0,.2)]">
                      {rank === 1 ? "1st" : "2nd"}
                    </span>
                  ) : null}
                </div>
              );
            })}
            <div className="absolute left-[240px] top-[116px] rounded-[5px] bg-white px-[7px] py-[3px] text-[10px] font-semibold shadow-[0_1px_4px_rgba(0,0,0,.2)]">
              Original drop
            </div>
          </div>
        )}
        {s.step === 7 && (
          <div className="absolute left-[182px] top-[176px]" aria-hidden="true">
            <div
              className="absolute -inset-[7px] rounded-full bg-[rgba(17,17,17,.22)]"
              style={{ animation: "ringpulse 1.8s ease-out infinite" }}
            />
            <div className="relative flex h-[26px] w-[26px] items-center justify-center rounded-full bg-[#111111]">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M5 13l1.5-4.5A2 2 0 018.4 7h7.2a2 2 0 011.9 1.5L19 13v5h-2.2v-1.6H7.2V18H5v-5z" fill="#fff" />
              </svg>
            </div>
          </div>
        )}
        <div className="absolute left-3.5 right-3.5 top-[58px] flex items-center justify-between">
          {backVisible ? (
            <SheetButton
              onClick={back}
              label="Back"
              className="flex h-[38px] w-[38px] items-center justify-center rounded-full bg-white shadow-[0_2px_8px_rgba(0,0,0,.18)]"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M15 5l-7 7 7 7" stroke="#111" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </SheetButton>
          ) : (
            <div className="whitespace-nowrap rounded-full bg-white px-[13px] py-2 text-xs font-semibold shadow-[0_2px_8px_rgba(0,0,0,.18)]">
              {mapChips[s.step] || `Tonight · ${s.time}`}
            </div>
          )}
          <SheetButton
            onClick={() => set({ sheet: true })}
            label="Emergency and safety support"
            className="rounded-full bg-danger px-[15px] py-[9px] text-[12.5px] font-extrabold tracking-[.6px] text-white shadow-[0_2px_10px_rgba(222,17,53,.4)]"
          >
            SOS
          </SheetButton>
        </div>
      </div>

      {/* ───────────── sheet body ───────────── */}
      <div className="relative -mt-[18px] flex min-h-0 flex-1 flex-col rounded-t-[18px] bg-white shadow-[0_-4px_18px_rgba(0,0,0,.10)]">
        <div className="flex justify-center pb-0.5 pt-2">
          <div className="h-1 w-[38px] rounded-full bg-[#E2E4E8]" />
        </div>
        <div className="flex items-center justify-between px-5 pb-2.5 pt-1.5">
          <div className="flex flex-none items-center gap-[7px] whitespace-nowrap">
            {shieldSvg}
            <span className="whitespace-nowrap text-xs font-bold">SafeRide Priority</span>
            <span className="rounded-full border border-line px-[7px] py-0.5 text-[10px] font-semibold text-ink-faint">
              concept
            </span>
          </div>
          <span className="flex-none whitespace-nowrap text-[11.5px] font-semibold text-ink-faint">
            Step {s.step - 1} of 7
          </span>
        </div>
        <div className="flex gap-1 px-5 pb-2.5" aria-hidden="true">
          {Array.from({ length: 7 }, (_, i) => (
            <div
              key={i}
              className="h-[3px] flex-1 rounded-full transition-colors duration-300"
              style={{ background: i < s.step - 1 ? "#111111" : "#E2E2E2" }}
            />
          ))}
        </div>

        <div className="min-h-0 flex-1 overflow-auto px-5 pb-5 pt-1.5">
          {/* ── STEP 1 of 7 · booking ── */}
          {s.step === 2 && (
            <div style={{ animation: "slideup .3s ease" }}>
              <h2 className="mb-2.5 mt-1 text-[22px] font-extrabold tracking-[-.3px]">Plan your ride</h2>
              {/* Rules 11 to 14: in city and outstation, every ride type except Parcel */}
              <div className="mb-3 flex items-center gap-2">
                {(["city", "outstation"] as const).map((tt) => (
                  <button
                    key={tt}
                    type="button"
                    onClick={() =>
                      set({
                        tripType: tt,
                        anchor: null,
                        anchor2: null,
                        drop: tt === "city" ? "Kondapur, Residential Lane 4" : OUTSTATION_DROPS[0],
                      })
                    }
                    className="rounded-full px-3.5 py-2 text-xs font-bold transition-colors"
                    style={
                      s.tripType === tt
                        ? { background: "#111111", color: "#FFFFFF" }
                        : { background: "#F3F3F3", color: "#545454" }
                    }
                  >
                    {tt === "city" ? "In city" : "Outstation"}
                  </button>
                ))}
                <span className="ml-auto text-right text-[10px] font-semibold leading-tight text-ink-faint">
                  all ride types,
                  <br />
                  except Parcel
                </span>
              </div>
              <div className="relative rounded-xl bg-[#F3F3F3] px-3.5 py-1">
                <div className="absolute bottom-[38px] left-[21px] top-[38px] w-0.5 bg-[#D8DCE0]" />
                <div className="flex items-center gap-3 py-2.5">
                  <span className="h-2 w-2 flex-none rounded-full bg-[#111]" />
                  <div className="flex-1">
                    <div className="text-[10.5px] font-semibold tracking-[.4px] text-ink-faint">PICKUP</div>
                    <select
                      value={s.pickup}
                      onChange={(e) => set({ pickup: e.target.value })}
                      aria-label="Pickup location"
                      className="w-full appearance-none border-none bg-transparent px-0 py-0.5 text-[14.5px] font-semibold text-[#111] outline-none"
                    >
                      <option>Cyber Towers, HITEC City</option>
                      <option>DLF Cyber City Gate 2, Gachibowli</option>
                      <option>Inorbit Mall, Madhapur</option>
                    </select>
                  </div>
                </div>
                <div className="ml-5 h-px bg-[#E2E4E8]" />
                <div className="flex items-center gap-3 py-2.5">
                  <span className="h-2 w-2 flex-none bg-[#111]" />
                  <div className="flex-1">
                    <div className="text-[10.5px] font-semibold tracking-[.4px] text-ink-faint">DROP</div>
                    <select
                      value={s.drop}
                      onChange={(e) => set({ drop: e.target.value })}
                      aria-label="Drop location"
                      className="w-full appearance-none border-none bg-transparent px-0 py-0.5 text-[14.5px] font-semibold text-[#111] outline-none"
                    >
                      {(s.tripType === "city"
                        ? ["Kondapur, Residential Lane 4", "Miyapur Crossroads", "Banjara Hills Road No. 12"]
                        : OUTSTATION_DROPS
                      ).map((d) => (
                        <option key={d}>{d}</option>
                      ))}
                    </select>
                    {s.tripType === "outstation" && (
                      <div className="mt-0.5 text-[10.5px] font-semibold text-brand-dark">
                        Outstation trip · {OUTSTATION_ETA_LABEL} · tracked till arrival
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="mt-3 flex items-center gap-2.5 rounded-xl bg-[#F3F3F3] px-3.5 py-3">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <circle cx="12" cy="12" r="8.5" stroke="#111" strokeWidth="1.8" />
                  <path d="M12 7.5V12l3 2" stroke="#111" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
                <div className="flex-1">
                  <div className="text-[10.5px] font-semibold tracking-[.4px] text-ink-faint">PICKUP TIME</div>
                  <select
                    value={s.time}
                    onChange={(e) => set({ time: e.target.value })}
                    aria-label="Pickup time"
                    className="w-full appearance-none border-none bg-transparent px-0 py-0.5 text-[14.5px] font-semibold text-[#111] outline-none"
                  >
                    {pickupSlots().map((t) => (
                      <option key={t} value={t}>
                        Tonight · {t}
                      </option>
                    ))}
                  </select>
                </div>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M6 9l6 6 6-6" stroke="#6B6B6B" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div
                className="mt-3.5 flex items-start gap-3 rounded-[14px] p-3.5 transition-colors"
                style={{ border: `1.5px solid ${safeOn ? "#276EF1" : "#E2E2E2"}`, opacity: inWindow || tripReason(s.reason).anyHour ? 1 : 0.85 }}
              >
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" className="mt-px flex-none" aria-hidden="true">
                  <path d="M12 2.5l7.5 3v6c0 4.6-3.2 8.4-7.5 10-4.3-1.6-7.5-5.4-7.5-10v-6l7.5-3z" fill="#EFF4FE" stroke="#276EF1" strokeWidth="1.6" strokeLinejoin="round" />
                  <path d="M8.7 12l2.3 2.3 4.3-4.6" stroke="#175BDC" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div className="flex-1">
                  <div className="text-[15px] font-bold">Plan a safer late-night ride</div>
                  <div className="mt-[3px] text-[12.5px] leading-[1.5] text-ink-faint">
                    SafeRide Priority reviews your trip between 8 PM and 5 AM: guidance, trip sharing, safer drop points and a vetted driver who commits to your pickup. For every rider.
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => (inWindow || tripReason(s.reason).anyHour) && set({ safeRide: !s.safeRide })}
                  role="switch"
                  aria-checked={safeOn}
                  aria-disabled={!inWindow && !tripReason(s.reason).anyHour}
                  aria-label="Use SafeRide Priority"
                  className="relative h-7 w-[46px] flex-none rounded-full transition-colors duration-200"
                  style={{ background: safeOn ? "#111111" : "#D8DCE0", cursor: inWindow || tripReason(s.reason).anyHour ? "pointer" : "not-allowed" }}
                >
                  <span
                    className="absolute top-[3px] h-[22px] w-[22px] rounded-full bg-white shadow-[0_1px_3px_rgba(0,0,0,.3)] transition-[left] duration-200"
                    style={{ left: safeOn ? 21 : 3 }}
                  />
                </button>
              </div>
              {!inWindow && !tripReason(s.reason).anyHour && (
                <div className="mt-2 rounded-[10px] border border-[#F0DCC8] bg-[#FFF1D6] px-3 py-2.5 text-xs leading-[1.5] text-[#7A4E00]" style={{ animation: "slideup .25s ease" }}>
                  SafeRide Priority is available for rides between 8 PM and 5 AM. Pick a time in that
                  window, or mark the trip emergency, medical or urgent to use it at any hour. You can
                  still book normally.
                </div>
              )}
              {/* Rules 35 to 40: why this ride. One tap sets the queue,
                  the top reasons work at any hour, the reason stays private. */}
              {safeOn && (
                <div className="mt-2 rounded-[14px] border-[1.5px] border-[#E2E2E2] p-3.5">
                  <div className="text-[15px] font-bold">Why this ride?</div>
                  <div className="mt-[3px] text-[12.5px] leading-[1.5] text-ink-faint">
                    One tap sets your place in the priority queue. {REASON_ANY_HOUR_NOTE}
                  </div>
                  <div className="mt-2.5 flex flex-wrap gap-1.5">
                    {TRIP_REASONS.map((r) => {
                      const on = s.reason === r.key;
                      return (
                        <button
                          key={r.key}
                          type="button"
                          onClick={() => set({ reason: r.key })}
                          aria-pressed={on}
                          className="rounded-full px-3 py-[7px] text-[11.5px] font-bold transition-colors"
                          style={
                            on
                              ? { background: "#111111", color: "#FFFFFF" }
                              : { background: "#F3F3F3", color: "#545454" }
                          }
                        >
                          {r.label}
                        </button>
                      );
                    })}
                  </div>
                  {/* Rule 36: "Other" lets the rider say it in her own words. Private, like every reason. */}
                  {s.reason === "other" && (
                    <div className="mt-2.5" style={{ animation: "fadein .25s ease" }}>
                      <label htmlFor="reason-other" className="text-[11px] font-bold tracking-[0.4px] text-ink-faint">
                        IN YOUR OWN WORDS
                      </label>
                      <input
                        id="reason-other"
                        type="text"
                        value={s.reasonOther}
                        maxLength={60}
                        placeholder="e.g. picking up my mother from the station"
                        onChange={(e) => set({ reasonOther: e.target.value })}
                        className="mt-1 w-full rounded-[10px] border-[1.5px] border-[#E2E2E2] bg-white px-3 py-2 text-[13px] outline-none placeholder:text-[#9AA0A6] focus:border-brand"
                      />
                      <div className="mt-1 text-right text-[10px] text-ink-faint">{s.reasonOther.length}/60</div>
                    </div>
                  )}
                  <div className="mt-2.5 rounded-[10px] bg-[#F3F7FF] px-3 py-2.5" style={{ animation: "fadein .25s ease" }}>
                    <div className="text-xs font-bold text-brand-dark">
                      {tripReason(s.reason).label} · {s.reason === "other" && s.reasonOther.trim() ? s.reasonOther.trim() : tripReason(s.reason).sub}
                    </div>
                    <div className="mt-0.5 text-xs leading-[1.5] text-[#3D4E6B]">
                      {REASON_TIER_LINES[tripReason(s.reason).tier]}
                      {tripReason(s.reason).anyHour ? " Works at any hour, day or night." : ""}
                    </div>
                    <div className="mt-1 text-[10.5px] leading-[1.45] text-ink-faint">{REASON_PRIVACY_NOTE}</div>
                  </div>
                </div>
              )}
              {safeOn && (
                <div
                  className="mt-2 flex items-start gap-3 rounded-[14px] p-3.5 transition-colors"
                  style={{ border: `1.5px solid ${s.female ? "#B0499B" : "#E2E2E2"}`, background: s.female ? "#FDF3FB" : "#FFFFFF" }}
                >
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" className="mt-px flex-none" aria-hidden="true">
                    <circle cx="12" cy="8" r="4.2" stroke="#B0499B" strokeWidth="1.7" />
                    <path d="M12 12.5v7M8.8 17h6.4" stroke="#B0499B" strokeWidth="1.7" strokeLinecap="round" />
                  </svg>
                  <div className="flex-1">
                    <div className="flex items-center gap-1.5 text-[15px] font-bold">
                      Female rider
                      {s.female && (
                        <span className="rounded-full bg-[#B0499B] px-1.5 py-px text-[9px] font-bold text-white">ON</span>
                      )}
                    </div>
                    <div className="mt-[3px] text-[12.5px] leading-[1.5] text-ink-faint">
                      {s.female
                        ? `Immediate Safety Priority. ${FEMALE_RIDER_DRIVER_ALERT} ${FEMALE_RIDER_GPS_NOTE}`
                        : "Turn on if a female passenger is travelling: immediate priority match, driver alert and mandatory GPS tracking."}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      set({ female: !s.female, ...(!s.female && !s.match ? { match: "priority" as const } : {}) })
                    }
                    role="switch"
                    aria-checked={s.female}
                    aria-label="Female rider travelling"
                    className="relative h-7 w-[46px] flex-none rounded-full transition-colors duration-200"
                    style={{ background: s.female ? "#B0499B" : "#D8DCE0" }}
                  >
                    <span
                      className="absolute top-[3px] h-[22px] w-[22px] rounded-full bg-white shadow-[0_1px_3px_rgba(0,0,0,.3)] transition-[left] duration-200"
                      style={{ left: s.female ? 21 : 3 }}
                    />
                  </button>
                </div>
              )}
              <button
                type="button"
                onClick={() =>
                  safeOn
                    ? set({ step: 3 })
                    : set({ step: 7, match: "standard", trip: 0, consent: false })
                }
                className="mt-4 block w-full rounded-[10px] bg-[#111111] p-4 text-center text-[15.5px] font-bold text-white"
              >
                {safeOn ? "Review My Ride Plan" : "Book standard ride"}
              </button>
            </div>
          )}

          {/* ── STEP 2 of 7 · safety brief ── */}
          {s.step === 3 && (
            <div style={{ animation: "slideup .3s ease" }}>
              <div className="mb-2.5 mt-1 text-[10.5px] font-bold tracking-[1.3px] text-ink-faint">
                CONTEXTUAL SAFETY BRIEF
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <div
                  className="inline-flex items-center gap-2 rounded-full px-[15px] py-[9px] text-sm font-bold"
                  style={{ background: sc.bg, color: sc.fg }}
                >
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ background: sc.dot, animation: "softpulse 2s ease infinite" }}
                  />
                  {sc.label}
                </div>
                <div className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border border-line px-[11px] py-[7px] text-[11.5px] font-semibold text-ink-faint">
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="h-1 w-[11px] rounded-sm"
                      style={{ background: i < sc.fill ? sc.dot : "#E2E2E2" }}
                    />
                  ))}
                  {sc.conf}
                </div>
              </div>
              <div className="mt-3 rounded-xl bg-[#F3F3F3] p-3.5">
                <div className="mb-2 text-xs font-bold">Contributing factors</div>
                {sc.reasons.map((r) => (
                  <div key={r} className="flex items-start gap-[9px] py-[5px]">
                    <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full" style={{ background: sc.dot }} />
                    <span className="text-[13px] leading-[1.5] text-[#333]">{r}</span>
                  </div>
                ))}
              </div>
              <div className="mb-2 mt-3.5 text-xs font-bold">Recommended for this trip</div>
              <div className="flex flex-col gap-2">
                {sc.recs.map((rec) => (
                  <div key={rec.n} className="flex items-center gap-[11px] rounded-xl border border-line px-[13px] py-3">
                    <span className="flex h-[30px] w-[30px] flex-none items-center justify-center rounded-lg bg-[#F3F3F3] text-[13px] font-extrabold text-[#111]">
                      {rec.n}
                    </span>
                    <div className="flex-1">
                      <div className="text-[13.5px] font-bold">{rec.t}</div>
                      <div className="mt-px text-[11.5px] leading-[1.45] text-ink-faint">{rec.d}</div>
                    </div>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M9 5l7 7-7 7" stroke="#9AA0A6" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={() => set({ whyOpen: !s.whyOpen })}
                className="flex w-full items-center justify-between border-b border-[#EDEFF1] px-0.5 pb-[11px] pt-[13px]"
                aria-expanded={s.whyOpen}
              >
                <span className="text-[13.5px] font-bold underline">Why am I seeing this?</span>
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="transition-transform duration-200"
                  style={{ transform: s.whyOpen ? "rotate(180deg)" : "none" }}
                  aria-hidden="true"
                >
                  <path d="M6 9l6 6 6-6" stroke="#111" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              {s.whyOpen && (
                <div className="px-0.5 py-[11px] text-[12.5px] leading-[1.6] text-[#444]" style={{ animation: "slideup .25s ease" }}>
                  The Brief uses your booking time, route context (main-road continuity, final-segment
                  characteristics), proximity to observable public or staffed anchors, Safety Priority
                  Match availability, and data confidence. It never uses crime predictions, individual
                  risk profiles, protected attributes, your contacts&apos; content, or star ratings alone.
                  When coverage is thin it says &quot;Limited Data&quot; instead of guessing.
                </div>
              )}
              <div className="mb-3.5 mt-3 text-[11.5px] italic leading-[1.55] text-ink-faint">
                This guidance is based on available prototype context. It is not a safety guarantee.
                Trust your judgment and use emergency support when needed.
              </div>
              <div className="flex gap-2.5">
                <button type="button" onClick={back} className={`${ghostBtn} flex-1`}>
                  Back
                </button>
                <button type="button" onClick={() => set({ step: 4 })} className={`${primaryBtn} flex-[2]`}>
                  Continue
                </button>
              </div>
            </div>
          )}

          {/* ── STEP 3 of 7 · anchors ── */}
          {s.step === 4 && (
            <div style={{ animation: "slideup .3s ease" }}>
              <h2 className="mb-1.5 mt-1 text-xl font-extrabold tracking-[-.3px]">Safer drop points nearby</h2>
              <div className="mb-3 text-[12.5px] leading-[1.5] text-ink-faint">
                Your drop point has fewer verified public or staffed anchors nearby. These alternatives
                are more visible or staffed. They are numbered on the map above. Pick up to two: a
                first choice and a backup.
              </div>
              <div className="flex flex-col gap-[9px]">
                {ANCHORS.map((a) => {
                  const rank = s.anchor === a.name ? 1 : s.anchor2 === a.name ? 2 : 0;
                  return (
                    <button
                      key={a.n}
                      type="button"
                      onClick={() => {
                        if (rank === 1) set({ anchor: s.anchor2, anchor2: null });
                        else if (rank === 2) set({ anchor2: null });
                        else if (!s.anchor) set({ anchor: a.name });
                        else set({ anchor2: a.name });
                      }}
                      className="rounded-[13px] p-[13px] text-left transition-colors duration-150"
                      style={{
                        border: `1.5px solid ${rank ? "#0E8345" : "#E2E2E2"}`,
                        background: rank === 1 ? "#F3FBF6" : "#FFFFFF",
                      }}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="flex h-6 w-6 flex-none items-center justify-center rounded-full bg-safe-dark text-xs font-extrabold text-white">
                          {a.n}
                        </span>
                        <div className="flex-1">
                          <div className="text-sm font-bold">{a.name}</div>
                          <div className="mt-px text-[11.5px] text-ink-faint">
                            {a.type} · {a.dist} · {a.extra}
                          </div>
                        </div>
                        <span
                          className="whitespace-nowrap text-[11.5px] font-bold"
                          style={{ color: rank ? "#0E8345" : "#111111" }}
                        >
                          {rank === 1 ? "1st choice ✓" : rank === 2 ? "2nd choice ✓" : "Select"}
                        </span>
                      </div>
                      <div className="ml-[34px] mt-2 text-xs font-semibold text-safe-dark">{a.why}</div>
                    </button>
                  );
                })}
              </div>
              <div className="mb-3.5 mt-3 text-[11.5px] leading-[1.5] text-ink-faint">
                Walking distances are estimates. The driver heads for your first choice; the backup is
                there if that spot is blocked. Your original drop stays available. Nothing about it is
                labelled unsafe.
              </div>
              <div className="flex gap-2.5">
                <button
                  type="button"
                  onClick={() => set({ anchor: null, anchor2: null, step: 5 })}
                  className="flex-1 rounded-[10px] border-[1.5px] border-[#D8DCE0] p-3.5 text-center text-[13.5px] font-bold"
                >
                  Keep Original Drop
                </button>
                <button
                  type="button"
                  onClick={() => set({ step: 5 })}
                  className="flex-1 rounded-[10px] bg-[#111] p-3.5 text-center text-[13.5px] font-bold text-white"
                >
                  {s.anchor2 ? "Continue with anchors" : s.anchor ? "Continue with anchor" : "Continue"}
                </button>
              </div>
            </div>
          )}

          {/* ── STEP 4 of 7 · match ── */}
          {s.step === 5 && (
            <div style={{ animation: "slideup .3s ease" }}>
              <h2 className="mb-3 mt-1 text-xl font-extrabold tracking-[-.3px]">Choose a ride</h2>
              {s.female && (
                <div className="mb-2.5 flex items-start gap-2.5 rounded-[11px] border border-[#EBC9E4] bg-[#FDF3FB] px-3 py-2.5" style={{ animation: "slideup .25s ease" }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" className="mt-px flex-none" aria-hidden="true">
                    <circle cx="12" cy="8" r="4.2" stroke="#B0499B" strokeWidth="1.7" />
                    <path d="M12 12.5v7M8.8 17h6.4" stroke="#B0499B" strokeWidth="1.7" strokeLinecap="round" />
                  </svg>
                  <span className="text-xs leading-[1.5] text-[#8A2E78]">
                    <strong>Female rider is on.</strong> This trip gets immediate Safety Priority.{" "}
                    {FEMALE_RIDER_DRIVER_ALERT} {FEMALE_RIDER_GPS_NOTE}
                  </span>
                </div>
              )}
              <button
                type="button"
                onClick={() => set({ match: "standard" })}
                className="mb-[9px] flex w-full items-center gap-3 rounded-[13px] p-[13px] text-left"
                style={{ border: `1.5px solid ${s.match === "standard" ? "#111111" : "#E2E2E2"}` }}
              >
                <svg width="44" height="26" viewBox="0 0 44 26" fill="none" className="flex-none" aria-hidden="true">
                  <path d="M6 17l2.5-7A3 3 0 0111.3 8h13.4a3 3 0 012.8 2l2.5 7v6h-3.6v-2.6H9.6V23H6v-6z" fill="#111" />
                  <circle cx="12" cy="19.6" r="2" fill="#fff" />
                  <circle cx="26" cy="19.6" r="2" fill="#fff" />
                </svg>
                <div className="flex-1">
                  <div className="flex items-center gap-[7px]">
                    <span className="text-[15px] font-bold">Standard</span>
                    <span className="text-[11px] text-ink-faint">UberX-style</span>
                  </div>
                  <div className="mt-px text-xs text-ink-faint">
                    {DRIVERS.standard.name} · {vehicleLine(DRIVERS.standard)}
                  </div>
                  <div className="mt-px text-xs text-ink-faint">
                    <span className="font-semibold text-[#111]">★ {DRIVERS.standard.rating}</span> · 3 min away
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-base font-extrabold">₹249</div>
                  {s.match === "standard" && <div className="text-[11px] font-bold text-[#111]">Selected ✓</div>}
                </div>
              </button>
              <button
                type="button"
                onClick={() => set({ match: "priority" })}
                className="block w-full rounded-[13px] p-[13px] text-left"
                style={{ border: `1.5px solid ${s.match === "priority" ? "#276EF1" : "#E2E2E2"}` }}
              >
                <div className="flex items-center gap-3">
                  <svg width="44" height="26" viewBox="0 0 44 26" fill="none" className="flex-none" aria-hidden="true">
                    <path d="M6 17l2.5-7A3 3 0 0111.3 8h13.4a3 3 0 012.8 2l2.5 7v6h-3.6v-2.6H9.6V23H6v-6z" fill="#111" />
                    <circle cx="12" cy="19.6" r="2" fill="#fff" />
                    <circle cx="26" cy="19.6" r="2" fill="#fff" />
                    <path d="M33 4.5l4.5 1.8v3.4c0 2.8-1.9 5.1-4.5 6-2.6-.9-4.5-3.2-4.5-6V6.3L33 4.5z" fill="#276EF1" />
                    <path d="M31 9.4l1.4 1.4 2.4-2.6" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-[7px]">
                      <span className="text-[15px] font-bold">Safety Priority</span>
                      <span className="whitespace-nowrap rounded-full bg-[#EFF4FE] px-2 py-0.5 text-[10px] font-bold text-brand-dark">
                        SafeRide Priority eligible
                      </span>
                    </div>
                    <div className="mt-px text-xs text-ink-faint">
                      {DRIVERS.priority.name} · {vehicleLine(DRIVERS.priority)}
                    </div>
                    <div className="mt-px text-xs text-ink-faint">
                      <span className="font-semibold text-[#111]">★ {DRIVERS.priority.rating}</span> · 7 min away{" "}
                      <span className="font-bold text-brand-dark">(+4 min)</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-base font-extrabold">₹269</div>
                    <div className="text-[11px] font-bold text-brand-dark">+₹20</div>
                    {s.match === "priority" && <div className="text-[11px] font-bold text-[#111]">Selected ✓</div>}
                  </div>
                </div>
              </button>
              <div className="mt-2.5 rounded-xl bg-[#F3F3F3] px-[13px] py-3">
                <div className="mb-1 text-xs font-bold">What &quot;SafeRide Priority eligible&quot; means</div>
                <div className="text-xs leading-[1.55] text-[#444]">
                  Meets SafeRide Priority eligibility criteria: verification complete, safety training, 1000+
                  trips, clear review status. Eligibility uses several audited signals, never star
                  ratings alone. Drivers get a training path and an appeal process.
                </div>
              </div>
              <div className="mt-2 rounded-xl bg-[#EAF6EF] px-[13px] py-3">
                <div className="mb-1 flex flex-wrap items-center gap-1.5 text-xs font-bold text-[#0E8345]">
                  Committed pickup
                  <span className="rounded-full bg-[#0E8345] px-2 py-px text-[9.5px] font-bold text-white">
                    {s.female ? "Top of the queue" : REASON_QUEUE_LABELS[tripReason(s.reason).tier]} ·{" "}
                    {tripReason(s.reason).label}
                  </span>
                </div>
                <div className="text-xs leading-[1.55] text-[#2A5A3F]">{MATCH_COMMIT_NOTE}</div>
              </div>
              <button
                type="button"
                onClick={() => set({ wait: !s.wait })}
                className="px-0.5 pt-[11px] text-[12.5px] font-bold underline"
              >
                No Safety Priority driver? Wait longer
              </button>
              {s.wait && (
                <div className="mt-2 rounded-[10px] border border-[#F0DCC8] bg-[#FFF1D6] px-3 py-2.5 text-xs leading-[1.5] text-[#444]" style={{ animation: "slideup .25s ease" }}>
                  We&apos;ll keep looking for up to 5 minutes (simulated). You can book Standard or another
                  ride type anytime. Your choice always stands.
                </div>
              )}
              <div className="mb-3 mt-2.5 text-[11.5px] italic text-ink-faint">This is not a safety guarantee.</div>
              <div className="flex gap-2.5">
                <button type="button" onClick={back} className={`${ghostBtn} flex-1`}>
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => s.match && set({ step: 6 })}
                  disabled={!s.match}
                  className="flex-[2] rounded-[10px] p-3.5 text-center text-[14.5px] font-bold transition-colors duration-200"
                  style={{
                    background: s.match ? "#111111" : "#E2E2E2",
                    color: s.match ? "#FFFFFF" : "#9AA0A6",
                  }}
                >
                  {s.match ? "Continue" : "Select a ride to continue"}
                </button>
              </div>
            </div>
          )}

          {/* ── STEP 5 of 7 · circle ── */}
          {s.step === 6 && (
            <div style={{ animation: "slideup .3s ease" }}>
              <h2 className="mb-1.5 mt-1 text-xl font-extrabold tracking-[-.3px]">Safety Circle</h2>
              <div className="mb-3 text-[12.5px] leading-[1.5] text-ink-faint">
                Share this trip with trusted contacts. You stay in control of when and with whom.
              </div>
              <div className="flex flex-col gap-2">
                {s.contacts.map((c) => {
                  const on = s.sel[c.name];
                  return (
                    <button
                      key={c.name}
                      type="button"
                      onClick={() => set({ sel: { ...s.sel, [c.name]: !on } })}
                      className="flex w-full items-center gap-[11px] rounded-xl px-3 py-2.5 text-left"
                      style={{ border: `1.5px solid ${on ? "#111111" : "#E2E2E2"}` }}
                      aria-pressed={on}
                    >
                      <span className="flex h-[34px] w-[34px] flex-none items-center justify-center rounded-full bg-[#111] text-[12.5px] font-bold text-white">
                        {c.initials}
                      </span>
                      <div className="flex-1">
                        <div className="text-sm font-bold">{c.name}</div>
                        <div className="text-[11.5px] text-ink-faint">{c.rel}</div>
                      </div>
                      <span
                        className="flex h-[22px] w-[22px] flex-none items-center justify-center rounded-full"
                        style={{
                          background: on ? "#111111" : "#FFFFFF",
                          border: `1.5px solid ${on ? "#111111" : "#C9CED4"}`,
                        }}
                      >
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" style={{ opacity: on ? 1 : 0 }}>
                          <path d="M5 12.5l4.5 4.5L19 7.5" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                    </button>
                  );
                })}
                {canAddContact(s.contacts.length) && !s.addOpen && (
                  <button
                    type="button"
                    onClick={() => set({ addOpen: true })}
                    className="flex w-full items-center gap-[11px] rounded-xl border-[1.5px] border-dashed border-[#C9CED4] px-3 py-2.5 text-left text-ink-faint"
                  >
                    <span className="flex h-[34px] w-[34px] flex-none items-center justify-center rounded-full border-[1.5px] border-dashed border-[#C9CED4] text-lg">
                      +
                    </span>
                    <span className="text-[13px] font-semibold">
                      Add contact <span className="text-[11.5px] font-normal">(up to 5)</span>
                    </span>
                  </button>
                )}
                {s.addOpen && (
                  <div className="rounded-xl border-[1.5px] border-[#111] p-3" style={{ animation: "slideup .25s ease" }}>
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-[12.5px] font-extrabold">New contact</span>
                      {canPickContacts && (
                        <button type="button" onClick={pickFromPhone} className="flex items-center gap-1 text-[11.5px] font-bold text-brand-dark underline">
                          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                            <circle cx="12" cy="8" r="3.2" stroke="currentColor" strokeWidth="2" />
                            <path d="M5.5 19c1-3.6 3.6-5.4 6.5-5.4s5.5 1.8 6.5 5.4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                          </svg>
                          Pick from my phone
                        </button>
                      )}
                    </div>
                    <div className="flex flex-col gap-2">
                      <input
                        value={s.addName}
                        onChange={(e) => set({ addName: e.target.value })}
                        placeholder="Name"
                        aria-label="Contact name"
                        className="rounded-[10px] border border-[#D8DCE0] bg-white px-3 py-2.5 text-[13.5px] font-semibold outline-none focus:border-[#111]"
                      />
                      <input
                        value={s.addPhone}
                        onChange={(e) => set({ addPhone: e.target.value.replace(/[^\d+ -]/g, "") })}
                        placeholder="Mobile number (gets the SMS)"
                        inputMode="tel"
                        aria-label="Contact mobile number"
                        className="rounded-[10px] border border-[#D8DCE0] bg-white px-3 py-2.5 text-[13.5px] font-semibold outline-none focus:border-[#111]"
                      />
                      <input
                        value={s.addRel}
                        onChange={(e) => set({ addRel: e.target.value })}
                        placeholder="Relationship (friend, sister…)"
                        aria-label="Relationship"
                        className="rounded-[10px] border border-[#D8DCE0] bg-white px-3 py-2.5 text-[13.5px] font-semibold outline-none focus:border-[#111]"
                      />
                    </div>
                    <div className="mt-2.5 flex gap-2">
                      <button
                        type="button"
                        onClick={() => set({ addOpen: false, addName: "", addPhone: "", addRel: "" })}
                        className="flex-1 rounded-[9px] border-[1.5px] border-[#D8DCE0] p-2.5 text-center text-[12.5px] font-bold"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={saveContact}
                        disabled={!s.addName.trim() || !s.addPhone.trim()}
                        className="flex-1 rounded-[9px] p-2.5 text-center text-[12.5px] font-bold transition-colors"
                        style={{
                          background: s.addName.trim() && s.addPhone.trim() ? "#111111" : "#E2E2E2",
                          color: s.addName.trim() && s.addPhone.trim() ? "#FFFFFF" : "#9AA0A6",
                        }}
                      >
                        Save contact
                      </button>
                    </div>
                  </div>
                )}
              </div>
              <div className="mb-2 mt-3.5 text-xs font-bold">Sharing policy</div>
              <div className="flex flex-col gap-[7px]" role="radiogroup" aria-label="Sharing policy">
                {POLICIES.map((p) => {
                  const on = s.policy === p;
                  return (
                    <button
                      key={p}
                      type="button"
                      role="radio"
                      aria-checked={on}
                      onClick={() => set({ policy: p })}
                      className="flex items-center gap-2.5 px-0.5 py-[3px] text-left"
                    >
                      <span
                        className="flex h-[19px] w-[19px] flex-none items-center justify-center rounded-full border-2"
                        style={{ borderColor: on ? "#111111" : "#C9CED4" }}
                      >
                        <span className="h-[9px] w-[9px] rounded-full bg-[#111]" style={{ opacity: on ? 1 : 0 }} />
                      </span>
                      <span className="text-[13.5px] font-semibold text-[#222]">{p}</span>
                    </button>
                  );
                })}
              </div>
              <div className="mb-2 mt-3.5 text-xs font-bold">Message preview (simulated)</div>
              <div className="rounded-[13px] bg-[#111] px-3.5 py-[13px] text-xs leading-[1.65] text-[#EDEFF2]">
                <div className="flex items-center gap-1.5 font-extrabold text-white">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M12 2.5l7.5 3v6c0 4.6-3.2 8.4-7.5 10-4.3-1.6-7.5-5.4-7.5-10v-6l7.5-3z" fill="#276EF1" />
                  </svg>
                  SafeRide Priority Alert
                </div>
                <div className="mt-[5px]">
                  {sms.lines.map((line) => (
                    <div key={line}>{line}</div>
                  ))}
                </div>
                <div className="mt-[5px] text-[#9AA6B5]">{sms.footer}</div>
              </div>
              <button
                type="button"
                role="checkbox"
                aria-checked={s.consent}
                onClick={() => set({ consent: !s.consent })}
                className="my-[13px] flex w-full items-start gap-2.5 text-left"
              >
                <span
                  className="mt-px flex h-[21px] w-[21px] flex-none items-center justify-center rounded-md"
                  style={{
                    background: s.consent ? "#111111" : "#FFFFFF",
                    border: `1.5px solid ${s.consent ? "#111111" : "#C9CED4"}`,
                  }}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" style={{ opacity: s.consent ? 1 : 0 }}>
                    <path d="M5 12.5l4.5 4.5L19 7.5" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span className="text-[12.5px] leading-[1.5] text-[#333]">
                  I understand this will share my trip details with selected contacts
                </span>
              </button>
              {s.female && (
                <div className="mb-3 rounded-[10px] border border-[#EBC9E4] bg-[#FDF3FB] px-3 py-2.5 text-xs leading-[1.5] text-[#8A2E78]">
                  Female rider is on, so live GPS tracking is mandatory for this trip. Pick at least
                  one contact and give consent to continue.
                </div>
              )}
              <div className="flex gap-2.5">
                <button type="button" onClick={back} className={`${ghostBtn} flex-1`}>
                  Back
                </button>
                <button
                  type="button"
                  disabled={!(s.consent && selNames.length > 0)}
                  onClick={() => s.consent && selNames.length > 0 && set({ step: 7, trip: 0 })}
                  className="flex-[2] rounded-[10px] p-3.5 text-center text-[14.5px] font-bold transition-colors duration-200"
                  style={{
                    background: s.consent && selNames.length > 0 ? "#111111" : "#E2E2E2",
                    color: s.consent && selNames.length > 0 ? "#FFFFFF" : "#9AA0A6",
                  }}
                >
                  Save and Continue
                </button>
              </div>
            </div>
          )}

          {/* ── STEP 6 of 7 · trip ── */}
          {s.step === 7 && (
            <div style={{ animation: "slideup .3s ease" }}>
              <div className="mb-3 mt-1 flex items-center justify-between">
                <h2 className="m-0 text-xl font-extrabold tracking-[-.3px]">{TRIP_LABELS[s.trip]}</h2>
                <span className="rounded-lg bg-[#111] px-2.5 py-1.5 text-center text-xs font-extrabold leading-[1.1] text-white">
                  {["7", "0", "18"][s.trip]}
                  <br />
                  <span className="text-[10px] font-semibold">min</span>
                </span>
              </div>
              <div className="flex items-center gap-3 rounded-[13px] border border-line p-[13px]">
                <span className="flex h-[42px] w-[42px] flex-none items-center justify-center rounded-full bg-[#111] text-sm font-bold text-white">
                  {drv.initials}
                </span>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-[7px]">
                    <span className="text-[15px] font-extrabold">{drv.name}</span>
                    {s.match !== "standard" && (
                      <span className="whitespace-nowrap rounded-full bg-[#EFF4FE] px-2 py-0.5 text-[10px] font-bold text-brand-dark">
                        SafeRide Priority eligible
                      </span>
                    )}
                  </div>
                  <div className="mt-px text-xs text-ink-faint">{drvVeh}</div>
                  <div className="mt-px text-xs font-semibold text-[#111]">
                    ★ {drv.rating} · PIN <span className="font-extrabold tracking-[2px]">{TRIP_PIN}</span>
                  </div>
                </div>
              </div>
              <div className="mt-2.5 flex gap-1.5">
                {TRIP_LABELS.map((l, i) => (
                  <div
                    key={l}
                    className="flex-1 rounded-[10px] px-1.5 py-2 text-center transition-colors duration-300"
                    style={{
                      background: i === s.trip ? "#111111" : i < s.trip ? "#E2E2E2" : "#F3F3F3",
                      color: i === s.trip ? "#FFFFFF" : i < s.trip ? "#111111" : "#9AA0A6",
                    }}
                  >
                    <div className="text-[11px] font-bold leading-[1.2]">{l}</div>
                    <div className="mt-0.5 text-[10px] opacity-75">{i <= s.trip ? TRIP_TIMES[i] : "· · ·"}</div>
                  </div>
                ))}
              </div>
              {sharingOn && (
                <div className="mt-2.5 flex items-center gap-[9px] rounded-[11px] bg-[#EAF6EF] px-3 py-2.5">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <circle cx="9" cy="9" r="3" stroke="#0E8345" strokeWidth="1.8" />
                    <path d="M3.8 18c.6-2.7 2.7-4 5.2-4s4.6 1.3 5.2 4" stroke="#0E8345" strokeWidth="1.8" strokeLinecap="round" />
                    <path d="M16.5 8.5l2 2 3-3.4" stroke="#0E8345" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="text-[12.5px] font-bold text-safe-dark">
                    Shared with {sharedNames || "your Safety Circle"}
                  </span>
                  <span className="ml-auto whitespace-nowrap text-[10.5px] text-safe-dark opacity-80">
                    link expires 30 min
                  </span>
                </div>
              )}
              {s.female && (
                <div className="mt-2.5 flex items-center gap-[9px] rounded-[11px] bg-[#FDF3FB] px-3 py-2.5">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" className="flex-none" aria-hidden="true">
                    <circle cx="12" cy="8" r="4.2" stroke="#B0499B" strokeWidth="1.7" />
                    <path d="M12 12.5v7M8.8 17h6.4" stroke="#B0499B" strokeWidth="1.7" strokeLinecap="round" />
                  </svg>
                  <span className="text-[12.5px] font-bold text-[#8A2E78]">
                    Driver alerted: female passenger on board
                  </span>
                  <span className="ml-auto whitespace-nowrap text-[10.5px] font-semibold text-[#8A2E78] opacity-80">
                    GPS mandatory · live
                  </span>
                </div>
              )}
              <div className="mb-2 mt-[13px] text-xs font-bold">Safety toolkit</div>
              <div className="grid grid-cols-2 gap-2">
                <SheetButton
                  onClick={() => set({ sheet: true })}
                  className="col-span-2 flex items-center gap-2.5 rounded-xl bg-danger p-[13px] text-left text-white"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M12 3L2.8 19h18.4L12 3z" stroke="#fff" strokeWidth="1.8" strokeLinejoin="round" />
                    <path d="M12 9.5v4" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" />
                    <circle cx="12" cy="16.2" r="1.1" fill="#fff" />
                  </svg>
                  <span>
                    <span className="block text-sm font-extrabold">SOS · Emergency</span>
                    <span className="block text-[10.5px] opacity-85">Always one tap away (simulated)</span>
                  </span>
                </SheetButton>
                {[
                  ["Share Trip", "Live status link"],
                  ["Verify PIN", `${TRIP_PIN} before boarding`],
                  ["Audio Recording", "Where available"],
                  ["Safety Support", "24x7 line"],
                ].map(([t, d]) => (
                  <SheetButton
                    key={t}
                    onClick={() => set({ sheet: true })}
                    className="rounded-xl border border-line p-[11px] text-left"
                  >
                    <span className="block text-[12.5px] font-bold">{t}</span>
                    <span className="mt-px block text-[10.5px] text-ink-faint">{d}</span>
                  </SheetButton>
                ))}
              </div>
              <button
                type="button"
                onClick={() =>
                  s.trip < 2 ? set({ trip: s.trip + 1 }) : set({ step: 8, checkIn: "pending" })
                }
                className="mt-[13px] block w-full rounded-[10px] bg-[#111] p-[15px] text-center text-[14.5px] font-bold text-white"
              >
                {s.trip < 2 ? "Advance Demo →" : "Complete Trip →"}
              </button>
              <div className="mt-[7px] text-center text-[10.5px] text-[#9AA0A6]">
                Demo control. Advances the simulated trip
              </div>
            </div>
          )}

          {/* ── STEP 7 of 7 · check-in ── */}
          {s.step === 8 && (
            <div style={{ animation: "slideup .3s ease" }}>
              {s.checkIn === "pending" && (
                <div className="pt-2 text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#EAF6EF]">
                    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <circle cx="12" cy="12" r="8.5" stroke="#0E8345" strokeWidth="1.8" />
                      <path d="M8.5 12.2l2.4 2.4 4.6-5" stroke="#0E8345" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <h2 className="mb-1.5 mt-3.5 text-[22px] font-extrabold tracking-[-.3px]">
                    Did you reach safely?
                  </h2>
                  <div className="inline-flex items-center gap-1.5 rounded-full border border-line px-[11px] py-1.5 text-[11.5px] font-semibold text-ink-faint">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <circle cx="12" cy="12" r="8.5" stroke="#6B6B6B" strokeWidth="1.8" />
                      <path d="M12 7.5V12l3 2" stroke="#6B6B6B" strokeWidth="1.8" strokeLinecap="round" />
                    </svg>
                    Check-in sent 5 minutes after trip completion
                  </div>
                  <button
                    type="button"
                    onClick={() => set({ checkIn: "safe", noResp: false })}
                    className="mt-[18px] block w-full rounded-[10px] bg-[#111] p-4 text-center text-[15.5px] font-extrabold text-white"
                  >
                    Yes, I&apos;m Safe
                  </button>
                  <SheetButton
                    onClick={() => set({ sheet: true })}
                    className="mt-[9px] block w-full rounded-[10px] border-[1.5px] border-danger p-3.5 text-center text-[14.5px] font-bold text-danger"
                  >
                    I Need Help
                  </SheetButton>
                  {sharingOn && (
                    <button
                      type="button"
                      onClick={() => set({ circleOpen: true })}
                      className="mt-2.5 block w-full rounded-[10px] border-[1.5px] border-brand p-[13px] text-center text-[14px] font-bold text-brand-dark"
                    >
                      See what your Circle saw →
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => set({ noResp: !noRespShown })}
                    className="mt-3.5 text-[12.5px] font-bold underline"
                  >
                    {noRespShown ? "Hide the no-response state" : "Preview the no-response state"}
                  </button>
                </div>
              )}
              {s.checkIn === "safe" && (
                <div className="pt-2 text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-safe-dark">
                    <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
                      <path d="M5 12.5l4.5 4.5L19 7.5" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <h2 className="mb-1.5 mt-3.5 text-[22px] font-extrabold tracking-[-.3px]">Check-in closed</h2>
                  <div className="mx-auto max-w-[280px] text-[13px] leading-[1.55] text-ink-faint">
                    Glad you&apos;re home.{" "}
                    {sharingOn
                      ? `${sharedNames} can see you arrived.`
                      : "Your Safety Circle was not contacted."}{" "}
                    No alerts were sent.
                  </div>
                  <div className="mt-4 rounded-xl bg-[#F3F3F3] p-3 text-left text-xs leading-[1.6] text-[#444]">
                    <div className="mb-[3px] font-bold text-[#111]">Trip summary (simulated)</div>
                    HITEC City → {dropShort} · 24 min ·{" "}
                    {s.match === "standard" ? "₹249 · Standard" : "₹269 · Safety Priority"}
                    <br />
                    {s.anchor ? `Drop moved to ${s.anchor} (safer anchor). ` : "Original drop kept. "}
                    {s.anchor2 ? `Backup anchor: ${s.anchor2}. ` : ""}
                    {sharingOn ? `Trip was shared under: ${s.policy}.` : "Trip was not shared."}
                  </div>
                  {sharingOn && (
                    <button
                      type="button"
                      onClick={() => set({ circleOpen: true })}
                      className="mt-3.5 block w-full rounded-[10px] border-[1.5px] border-brand p-[13px] text-center text-[14px] font-bold text-brand-dark"
                    >
                      See what your Circle saw →
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => setS(INITIAL)}
                    className="mt-2.5 block w-full rounded-[10px] bg-[#111] p-[15px] text-center text-[14.5px] font-bold text-white"
                  >
                    Restart Demo
                  </button>
                </div>
              )}
              {noRespShown && s.checkIn === "pending" && (
                <div className="mt-4 rounded-[13px] border-[1.5px] border-[#F0DCC8] bg-[#FFF1D6] p-[13px] text-left" style={{ animation: "slideup .25s ease" }}>
                  <div className="flex items-center gap-[7px] text-[12.5px] font-extrabold text-caution-dark">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M12 3L2.8 19h18.4L12 3z" stroke="#7A4E00" strokeWidth="1.8" strokeLinejoin="round" />
                      <path d="M12 9.5v4" stroke="#7A4E00" strokeWidth="1.8" strokeLinecap="round" />
                      <circle cx="12" cy="16.2" r="1.1" fill="#7A4E00" />
                    </svg>
                    SafeRide Priority Alert · what {sharedNames || "contacts"} would see
                  </div>
                  <div className="mt-[7px] text-[12.5px] leading-[1.65] text-[#4A3A28]">
                    {riderName} has not responded to her arrival check-in.
                    <br />
                    Last known location: HITEC City.
                    <br />
                    Trip completed: 12:45 AM.
                    <br />
                    Try calling {riderName} or view completed trip details.
                    <br />
                    <strong>This is not an emergency alert.</strong>
                  </div>
                  <div className="mt-2.5 flex gap-2">
                    <div className="flex-1 rounded-[9px] bg-[#111] p-2.5 text-center text-xs font-bold text-white">
                      Call {riderName}
                    </div>
                    <div className="flex-1 rounded-[9px] border-[1.5px] border-[#D8DCE0] bg-white p-2.5 text-center text-xs font-bold">
                      View trip details
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="flex-none border-t border-[#EDEFF1] px-5 pb-[26px] pt-[7px] text-center text-[9.5px] leading-[1.45] text-[#9AA0A6]">
          Independent portfolio concept. Not affiliated with, endorsed by, or sponsored by Uber. All
          data and interactions are simulated.
        </div>
      </div>

      {/* ───────────── SOS sheet ───────────── */}
      {s.sheet && (
        <div className="absolute inset-0 z-40 flex flex-col justify-end overflow-hidden bg-[rgba(10,14,20,.55)]" style={{ animation: "fadein .2s ease both" }}>
          <div className="rounded-t-[18px] bg-white px-5 pb-[34px] pt-4" style={{ animation: "sheetup .3s cubic-bezier(.32,.72,.35,1) both" }}>
            <div className="flex justify-center pb-2.5">
              <div className="h-1 w-[38px] rounded-full bg-[#E2E4E8]" />
            </div>
            <div className="mb-0.5 text-[17px] font-extrabold">Emergency &amp; safety support</div>
            <div className="mb-3 text-[11.5px] text-ink-faint">
              Simulated. In the real app these open the existing safety tools. Nothing is contacted in
              this demo.
            </div>
            <div className="flex flex-col gap-2">
              <div className="rounded-xl bg-danger p-[13px] text-sm font-extrabold text-white">
                Call emergency services (SOS)
              </div>
              <div className="rounded-xl border border-line px-[13px] py-3 text-[13.5px] font-bold">24x7 Safety Line</div>
              <div className="rounded-xl border border-line px-[13px] py-3 text-[13.5px] font-bold">
                Share live trip status
              </div>
              <div className="rounded-xl border border-line px-[13px] py-3 text-[13.5px] font-bold">
                Trip details &amp; verification PIN
              </div>
            </div>
            <button
              type="button"
              onClick={() => set({ sheet: false })}
              className="mt-3 block w-full rounded-[10px] border-[1.5px] border-[#D8DCE0] p-[13px] text-center text-sm font-bold"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
