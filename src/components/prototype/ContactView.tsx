"use client";

import { useEffect, useRef, useState } from "react";
import {
  DRIVERS,
  NO_RESPONSE_LINK_HOURS,
  TRACKING_LINK_EXPIRY_MINUTES,
  TRACKING_URL,
  TRIP_ETA_MINUTES,
  TRIP_PIN,
  UBER_HELPLINE,
  buildCircleSms,
  vehicleLine,
} from "@/server/rules";
import type { CircleInfo } from "./PhoneApp";
import { CityMapLayers, CityMapMarkers, MAP_ROUTE_PATH } from "./CityMap";

/* The contact's side of the share. Three views inside one phone:
   1) the SMS that lands when the rider saves her Safety Circle
   2) the live GPS tracking page the link opens
   3) the trip details page with driver contact and the helpline

   Link life, from the backend rules: live for the whole trip however
   long it runs, 30 more minutes after a safe check-in (with replay),
   and 12 hours with replay if the rider never responds. */

/* Route points come from the shared map path so there is one source. */
const ROUTE: [number, number][] = MAP_ROUTE_PATH.split(/[ML]/)
  .map((s) => s.trim())
  .filter(Boolean)
  .map((pair) => pair.split(/\s+/).map(Number) as [number, number]);

const segLengths = ROUTE.slice(1).map((p, i) => Math.hypot(p[0] - ROUTE[i][0], p[1] - ROUTE[i][1]));
const totalLen = segLengths.reduce((a, b) => a + b, 0);

function pointAt(progress: number): [number, number] {
  let d = progress * totalLen;
  for (let i = 0; i < segLengths.length; i++) {
    if (d <= segLengths[i]) {
      const t = segLengths[i] === 0 ? 0 : d / segLengths[i];
      const [x1, y1] = ROUTE[i];
      const [x2, y2] = ROUTE[i + 1];
      return [x1 + (x2 - x1) * t, y1 + (y2 - y1) * t];
    }
    d -= segLengths[i];
  }
  return ROUTE[ROUTE.length - 1];
}

const TRIP_SECONDS = 45; // one simulated trip lasts 45 real seconds

export default function ContactView({
  riderName,
  info,
  onExit,
}: {
  riderName: string;
  info: CircleInfo | null;
  onExit?: () => void;
}) {
  const [view, setView] = useState<"sms" | "track" | "details">("sms");
  const [progress, setProgress] = useState(info?.tripEnded ? 1 : 0.12);
  const [replaying, setReplaying] = useState(false);
  const [expiry, setExpiry] = useState(TRACKING_LINK_EXPIRY_MINUTES * 60);
  const raf = useRef<number | null>(null);

  const driver = DRIVERS[info?.driverKind ?? "priority"];
  const dropShort = info?.dropShort || "Kondapur";
  const destination = info?.destination || dropShort;
  const pickup = info?.pickup || "Cyber Towers, HITEC City";
  const bookedTime = info?.time || "12:15 AM";
  const contactName = info?.selNames?.[0] || "Ananya";
  const outstation = info?.tripType === "outstation";
  const etaLabel = info?.etaLabel || `${TRIP_ETA_MINUTES} minutes`;
  const ended = info?.tripEnded ?? false;
  const safe = info?.checkInSafe ?? false;
  const anchor = info?.anchor ?? null;
  const sms = buildCircleSms({ riderName, dropShort, driver, etaLabel, anchor });

  /* snap to the drop point the moment the rider's trip ends, and rewind
     the 30 minute clock whenever the safe-confirmed state resets */
  const armed = ended && safe;
  const [prevEnded, setPrevEnded] = useState(ended);
  const [prevArmed, setPrevArmed] = useState(armed);
  if (ended !== prevEnded) {
    setPrevEnded(ended);
    if (ended) setProgress(1);
  }
  if (armed !== prevArmed) {
    setPrevArmed(armed);
    if (!armed) setExpiry(TRACKING_LINK_EXPIRY_MINUTES * 60);
  }

  /* the countdown runs only once the rider has confirmed safe */
  useEffect(() => {
    if (!armed) return;
    const id = setInterval(() => setExpiry((e) => Math.max(0, e - 1)), 1000);
    return () => clearInterval(id);
  }, [armed]);

  /* animate the car while the trip runs, or while a replay runs */
  const animating = view === "track" && (!ended || replaying);
  useEffect(() => {
    if (!animating) return;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      setProgress((p) => {
        const next = Math.min(1, p + dt / TRIP_SECONDS);
        if (next >= 1) setReplaying(false);
        return next;
      });
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [animating]);

  const [cx, cy] = pointAt(progress);
  const etaLeft = Math.max(1, Math.ceil((1 - progress) * TRIP_ETA_MINUTES));
  const etaNow = ended ? "Arrived" : outstation ? etaLabel.replace("about ", "~") : `${etaLeft} min`;
  const mm = String(Math.floor(expiry / 60)).padStart(2, "0");
  const ss = String(Math.floor(expiry % 60)).padStart(2, "0");
  const linkStatus = !ended
    ? "link live for the whole trip"
    : safe
      ? `link expires in ${mm}:${ss}`
      : `no check-in · link active ${NO_RESPONSE_LINK_HOURS} h`;

  const callRow = (label: string, number: string, dark?: boolean) => (
    <a
      href={`tel:${number.replace(/\s/g, "")}`}
      className={`flex items-center justify-center gap-2 rounded-[10px] p-3 text-center text-[13px] font-bold ${
        dark ? "bg-[#111] text-white" : "border-[1.5px] border-[#D8DCE0]"
      }`}
    >
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M5 4h4l2 5-2.5 1.5a12 12 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      </svg>
      {label}
    </a>
  );

  return (
    <div className="relative flex h-full flex-col bg-[#F6F7F9] pt-[54px] text-[#111]" style={{ fontFamily: "-apple-system,'Helvetica Neue',system-ui,sans-serif" }}>
      {onExit && (
        <div className="flex flex-none px-3 pb-2 pt-0.5">
          <button
            type="button"
            onClick={onExit}
            className="flex items-center gap-1 rounded-full bg-black py-1.5 pl-2 pr-3 text-[10.5px] font-bold text-white shadow-[0_2px_10px_rgba(0,0,0,.2)]"
          >
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M15 5l-7 7 7 7" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Back to rider app
          </button>
        </div>
      )}
      {view === "sms" && (
        <>
          {/* messages header */}
          <div className="flex flex-none flex-col items-center border-b border-[#E5E7EB] bg-[#FBFBFD] pb-2.5">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#8A96A6] text-[16px] font-bold text-white">
              SR
            </div>
            <div className="mt-1 text-[12.5px] font-semibold">SafeRide Priority</div>
            <div className="text-[10.5px] text-[#8A8A8E]">SMS · {contactName}&apos;s phone</div>
          </div>
          <div className="hscroll min-h-0 flex-1 overflow-y-auto px-4 pb-6">
            <div className="my-3 text-center text-[11px] font-medium text-[#8A8A8E]">Today · 12:16 AM</div>
            <div className="max-w-[86%] rounded-[18px] rounded-bl-md bg-[#E9E9EB] px-3.5 py-2.5 text-[13.5px] leading-[1.5]" style={{ animation: "slideup .4s ease both" }}>
              {sms.lines.map((line, i) =>
                line.includes(TRACKING_URL) ? (
                  <div key={i}>
                    Track the trip live:{" "}
                    <button type="button" onClick={() => setView("track")} className="font-semibold text-[#007AFF] underline">
                      {TRACKING_URL}
                    </button>{" "}
                    (mock)
                  </div>
                ) : (
                  <div key={i}>{line}</div>
                )
              )}
              <div className="mt-1.5 text-[11.5px] text-[#6B6B6B]">{sms.footer}</div>
            </div>
            <div className="mt-4 flex items-center justify-center gap-1.5 text-[11.5px] font-semibold text-brand-dark">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M12 5v10m0 4v.5M7 10l5-5 5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Tap the blue link to open live tracking
            </div>
            {/* edge case, in plain words */}
            <div className="mx-auto mt-4 max-w-[92%] rounded-xl border border-[#E5E7EB] bg-white px-3 py-2.5 text-center text-[11.5px] leading-[1.55] text-ink-faint">
              If {riderName} does not answer her arrival check-in, this link stays active for{" "}
              {NO_RESPONSE_LINK_HOURS} hours with the full trip replay, and you can call the driver
              directly from the link.
            </div>
            {!info?.sharingOn && (
              <div className="mx-auto mt-3 max-w-[86%] rounded-xl border border-[#F0DCC8] bg-[#FFF1D6] px-3 py-2.5 text-center text-[11.5px] leading-[1.5] text-[#7A4E00]">
                This SMS goes out only after {riderName} selects contacts and ticks the consent box on
                the Safety Circle step.
              </div>
            )}
          </div>
        </>
      )}

      {view === "track" && (
        <>
          {/* tracking header */}
          <div className="flex flex-none items-center gap-2.5 border-b border-[#E5E7EB] bg-white px-3.5 pb-3 pt-1.5">
            <button type="button" onClick={() => setView("sms")} aria-label="Back to SMS" className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-[#F3F3F3]">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M15 5l-7 7 7 7" stroke="#111" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5 text-[14px] font-extrabold">
                Tracking {riderName}
                <span className="h-2 w-2 flex-none rounded-full" style={{ background: ended && safe ? "#F6BC2F" : "#06C167", animation: "blink 1.4s ease infinite" }} />
                <span className="text-[10.5px] font-bold text-safe-dark">{ended ? "TRIP ENDED" : "LIVE GPS"}</span>
              </div>
              <div className="overflow-hidden text-ellipsis whitespace-nowrap text-[11px] text-ink-faint">
                saferide.demo · {linkStatus}
              </div>
            </div>
            <span className="flex-none rounded-lg bg-[#F3F3F3] px-2 py-1 text-[10.5px] font-extrabold tracking-[1px]">PIN {TRIP_PIN}</span>
          </div>

          {/* live map fills the free space so nothing sits empty below */}
          <div className="relative min-h-[240px] flex-1 overflow-hidden bg-[#E9EDF0]">
            {/* "meet" keeps the whole route and every label inside the frame on any phone width */}
            <svg viewBox="0 0 402 250" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid meet" aria-label="Live map: the car moves from the pickup, past the chosen safer anchor, to the drop">
              <CityMapLayers />
              <path d={MAP_ROUTE_PATH} fill="none" stroke="#C9CED4" strokeWidth="4" strokeLinecap="round" />
              <path d={MAP_ROUTE_PATH} fill="none" stroke="#276EF1" strokeWidth="4" strokeLinecap="round" pathLength={1} strokeDasharray={`${progress} 1`} />
              <CityMapMarkers />
              {/* pickup */}
              <g aria-label={`Pickup: ${pickup}`}>
                <circle cx={ROUTE[0][0]} cy={ROUTE[0][1]} r="7" fill="#000" stroke="#fff" strokeWidth="2" />
                <rect x={Math.min(Math.max(ROUTE[0][0] - 4, 4), 402 - 124)} y={ROUTE[0][1] - 30} width="120" height="15" rx="7.5" fill="#FFFFFF" opacity=".94" />
                <text x={Math.min(Math.max(ROUTE[0][0] - 4, 4), 402 - 124) + 60} y={ROUTE[0][1] - 19} textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#111" fontFamily="Helvetica,Arial">
                  pickup · {pickup.length > 16 ? `${pickup.slice(0, 15)}…` : pickup}
                </text>
              </g>
              {/* drop */}
              <g aria-label={`Drop: ${destination}`}>
                <rect x={ROUTE[ROUTE.length - 1][0] - 6} y={ROUTE[ROUTE.length - 1][1] - 6} width="12" height="12" rx="2" fill="#000" stroke="#fff" strokeWidth="2" />
                <rect x={Math.min(Math.max(ROUTE[ROUTE.length - 1][0] - 100, 4), 402 - 108)} y={ROUTE[ROUTE.length - 1][1] + 12} width="104" height="15" rx="7.5" fill="#FFFFFF" opacity=".94" />
                <text x={Math.min(Math.max(ROUTE[ROUTE.length - 1][0] - 100, 4), 402 - 108) + 52} y={ROUTE[ROUTE.length - 1][1] + 23} textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#111" fontFamily="Helvetica,Arial">
                  {anchor ? "drop area" : "drop"} · {destination.length > 14 ? `${destination.slice(0, 13)}…` : destination}
                </text>
              </g>
              {anchor && (
                <g aria-label={`Safer anchor: ${anchor}`}>
                  <circle cx="352" cy="118" r="11" fill="#0E8345" />
                  <path d="M347.5 118l3 3 6-6.5" stroke="#fff" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                  <rect x="226" y="98" width="132" height="15" rx="7.5" fill="#FFFFFF" opacity=".94" />
                  <text x="292" y="109" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#0E8345" fontFamily="Helvetica,Arial">
                    anchor · {anchor.length > 20 ? `${anchor.slice(0, 19)}…` : anchor}
                  </text>
                </g>
              )}
              <g transform={`translate(${cx} ${cy})`}>
                <circle r="16" fill="rgba(39,110,241,.25)" style={{ animation: "softpulse 1.8s ease infinite" }} />
                <circle r="10" fill="#276EF1" />
                <path d="M-5 2.5 l1.4-4.2 a1.8 1.8 0 011.7-1.3 h3.8 a1.8 1.8 0 011.7 1.3 L5 2.5 v3 h-1.6 v-1.2 h-6.8 V5.5 H-5 z" fill="#fff" />
              </g>
            </svg>
            <div className="absolute left-3 top-3 rounded-full bg-white px-3 py-1.5 text-[11px] font-bold shadow-[0_2px_8px_rgba(0,0,0,.15)]">
              {progress >= 1
                ? replaying
                  ? `Replaying trip to ${dropShort}`
                  : `Reached ${dropShort}`
                : `${outstation ? etaNow : `${etaLeft} min`} to ${dropShort}`}
            </div>
            {outstation && (
              <div className="absolute right-3 top-3 rounded-full bg-[#16264A] px-2.5 py-1.5 text-[10px] font-bold text-[#8FB0FF] shadow-[0_2px_8px_rgba(0,0,0,.2)]">
                OUTSTATION
              </div>
            )}
            {ended && !replaying && (
              <button
                type="button"
                onClick={() => {
                  setProgress(0);
                  setReplaying(true);
                }}
                className="absolute bottom-3 right-3 rounded-full bg-black px-3.5 py-2 text-[11.5px] font-bold text-white shadow-[0_4px_12px_rgba(0,0,0,.3)]"
              >
                Replay trip ↺
              </button>
            )}
          </div>

          {/* the stops on this trip, in order, so the contact can read where the car is without the map */}
          <div className="border-t border-line bg-white px-4 py-3">
            <div className="text-[10px] font-bold tracking-[1.2px] text-ink-faint">THE STOPS ON THIS TRIP</div>
            <ol className="m-0 mt-2 flex list-none items-center gap-1.5 p-0">
              {[
                { label: pickup, kind: "Pickup", at: 0 },
                { label: destination, kind: anchor ? "Drop area" : "Drop", at: anchor ? 0.9 : 1 },
                ...(anchor ? [{ label: anchor, kind: "Safer drop", at: 1 }] : []),
              ].map((stop, i, arr) => {
                const reached = progress >= stop.at - 0.02;
                return (
                  <li key={stop.kind} className="flex min-w-0 flex-1 items-center gap-1.5">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        <span className={`h-2.5 w-2.5 flex-none rounded-full ${reached ? (stop.kind === "Safer drop" ? "bg-[#0E8345]" : "bg-black") : "bg-[#D8DCE0]"}`} />
                        <span className="text-[10px] font-bold tracking-[0.6px] text-ink-faint">{stop.kind.toUpperCase()}</span>
                      </div>
                      <div className={`mt-0.5 truncate text-[11.5px] font-semibold ${reached ? "text-ink" : "text-ink-faint"}`}>{stop.label}</div>
                    </div>
                    {i < arr.length - 1 && (
                      <svg width="14" height="10" viewBox="0 0 14 10" className="flex-none" aria-hidden="true">
                        <path d="M0 5h11m-4-4l4 4-4 4" stroke={progress >= arr[i + 1].at - 0.02 ? "#276EF1" : "#C9CED4"} strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </li>
                );
              })}
            </ol>
          </div>

          {/* driver + actions */}
          <div className="flex-none px-4 pb-7 pt-3.5">
            {ended && !safe && (
              <div className="mb-2.5 rounded-xl border border-[#F0DCC8] bg-[#FFF1D6] px-3 py-2.5 text-[11.5px] leading-[1.55] text-[#7A4E00]" style={{ animation: "slideup .3s ease" }}>
                {riderName} has not answered her arrival check-in yet. Use the driver&apos;s number
                below to reach the car. This link and the replay stay active for {NO_RESPONSE_LINK_HOURS} hours.
              </div>
            )}
            <div className="rounded-2xl border border-[#E5E7EB] bg-white p-3.5">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 flex-none items-center justify-center rounded-full bg-[#111] text-[13.5px] font-bold text-white">
                  {driver.initials}
                </span>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-1.5 text-[14.5px] font-extrabold">
                    {driver.name}
                    {info?.driverKind !== "standard" && (
                      <span className="rounded-full bg-[#EFF4FE] px-2 py-0.5 text-[9.5px] font-bold text-brand-dark">SafeRide eligible</span>
                    )}
                  </div>
                  <div className="text-[12px] text-ink-faint">
                    {vehicleLine(driver)} · ★ {driver.rating}
                  </div>
                </div>
                <div className="rounded-lg bg-[#F3F3F3] px-2.5 py-1.5 text-center">
                  <div className="text-[13px] font-extrabold leading-none">{etaNow}</div>
                  <div className="mt-0.5 text-[9px] font-semibold text-ink-faint">{ended ? "safe stop" : "ETA"}</div>
                </div>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2">
                {callRow(`Call ${riderName}`, "+91 98765 43210", true)}
                {callRow("Call driver", driver.phone)}
                <button
                  type="button"
                  onClick={() => setView("details")}
                  className="flex items-center justify-center gap-2 rounded-[10px] border-[1.5px] border-[#D8DCE0] p-3 text-center text-[13px] font-bold"
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <rect x="5" y="3.5" width="14" height="17" rx="2" stroke="currentColor" strokeWidth="1.8" />
                    <path d="M9 8h6M9 12h6M9 16h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                  View trip details
                </button>
                {callRow("Uber helpline", UBER_HELPLINE)}
              </div>
            </div>
            <div className="mt-3 rounded-xl bg-[#EAF6EF] px-3.5 py-2.5 text-[11.5px] leading-[1.55] text-safe-dark">
              Live GPS is shared with you because {riderName} added you to her Safety Circle and gave
              consent. The link stays live for the whole trip, in the city or outstation, and expires{" "}
              {TRACKING_LINK_EXPIRY_MINUTES} minutes after she confirms she is safe.
            </div>
            <div className="mt-2.5 text-center text-[10px] leading-[1.5] text-[#9AA0A6]">
              Simulated tracking view. No real location, driver, calls or SMS are involved.
            </div>
          </div>
        </>
      )}

      {view === "details" && (
        <>
          <div className="flex flex-none items-center gap-2.5 border-b border-[#E5E7EB] bg-white px-3.5 pb-3 pt-1.5">
            <button type="button" onClick={() => setView("track")} aria-label="Back to tracking" className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-[#F3F3F3]">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M15 5l-7 7 7 7" stroke="#111" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <div className="min-w-0 flex-1">
              <div className="text-[14px] font-extrabold">Trip details</div>
              <div className="overflow-hidden text-ellipsis whitespace-nowrap text-[11px] text-ink-faint">
                {riderName}&apos;s ride · {linkStatus}
              </div>
            </div>
          </div>
          {/* the content column centres itself, so the leftover space is
             shared evenly above and below instead of piling up at the bottom */}
          <div className="hscroll flex min-h-0 flex-1 flex-col overflow-y-auto px-4 py-5">
            <div className="my-auto">
            <div className="rounded-2xl border border-[#E5E7EB] bg-white px-3.5 py-1">
              {[
                ["Booked from", pickup],
                ["Drop point", dropShort],
                ["Booked for", `Tonight · ${bookedTime}`],
                ["Trip type", outstation ? "Outstation" : "In city"],
                ["Safer anchor", anchor ? `${anchor} (staffed)` : "None · original drop kept"],
                ["Progress", progress >= 1 ? "Trip completed · reached drop point" : `${Math.round(progress * 100)}% of the route done`],
                ["ETA", ended ? "Arrived · 12:45 AM" : etaNow],
                ["Trip PIN", TRIP_PIN],
              ].map(([k, v], i, arr) => (
                <div key={k} className={`flex items-start justify-between gap-4 py-2.5 ${i < arr.length - 1 ? "border-b border-[#F0F0F0]" : ""}`}>
                  <span className="text-[12px] font-semibold text-ink-faint">{k}</span>
                  <span className="text-right text-[13px] font-bold">{v}</span>
                </div>
              ))}
            </div>

            <div className="mt-3 rounded-2xl border border-[#E5E7EB] bg-white p-3.5">
              <div className="mb-2 text-[11px] font-bold tracking-[1px] text-ink-faint">DRIVER</div>
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-[#111] text-[13px] font-bold text-white">
                  {driver.initials}
                </span>
                <div className="flex-1">
                  <div className="text-[14px] font-extrabold">{driver.name}</div>
                  <div className="text-[11.5px] text-ink-faint">
                    {vehicleLine(driver)} · ★ {driver.rating} · {driver.phone}
                  </div>
                </div>
              </div>
              <div className="mt-2.5">{callRow("Call driver", driver.phone, true)}</div>
            </div>

            <div className="mt-3 rounded-2xl border border-[#E5E7EB] bg-white p-3.5">
              <div className="mb-1 text-[11px] font-bold tracking-[1px] text-ink-faint">EMERGENCY</div>
              <div className="mb-2.5 text-[12.5px] leading-[1.5] text-ink-soft">
                Uber 24x7 safety helpline: <strong>{UBER_HELPLINE}</strong>. Call if you cannot reach{" "}
                {riderName} or the driver.
              </div>
              {callRow("Call Uber helpline", UBER_HELPLINE)}
            </div>
            <div className="mt-2.5 text-center text-[10px] leading-[1.5] text-[#9AA0A6]">
              Numbers are fictional. Nothing is contacted in this demo.
            </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
