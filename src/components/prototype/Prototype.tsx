"use client";

import { useCallback, useEffect, useState } from "react";
import { IOSDevice, PhoneScaler } from "./IOSFrame";
import PhoneApp, { APP_SCREENS, FLOW_SCREENS, type CircleInfo, type Scenario } from "./PhoneApp";
import ContactView from "./ContactView";
import { Reveal, jumpToStep } from "../ui";

/* One caption per internal step: 0 splash, 1 home, 2 to 8 the 7-step flow. */
const TOUR: { title: string; text: string }[] = [
  { title: "Every ride starts here", text: "The app the rider already opens every night. SafeRide asks her to download nothing new. It lives inside the flow she trusts. The splash moves on by itself, like the real launch." },
  { title: "The entry point meets riders where they are", text: "A faithful Uber home. Scroll it, tap 'Later' to open Plan your ride (try the Pickup and For me pills, and Send a ride), tap an Outstation getaway to book a long haul, or tap the SafeRide card to start in the city." },
  { title: "Step 1: one familiar booking sheet", text: "Pickup, drop, 15-minute slots from 8 PM to 5 AM, and an In city or Outstation trip type. SafeRide adds an opt-in toggle, and a Female rider switch: immediate priority, driver alert, mandatory GPS." },
  { title: "Step 2: guidance you can question", text: "The Contextual Safety Brief gives a category with plain-language reasons and a confidence meter. Open 'Why am I seeing this?': explainability is the feature." },
  { title: "Step 3: a safer spot to step out", text: "Safer Anchors suggests staffed, well-lit drop points within a short walk. The original drop stays one tap away the whole time." },
  { title: "Step 4: the trade-off, up front", text: "Safety Priority Match shows the +4 min / +₹20 cost before you pick. Eligibility rests on several audited signals, and star ratings are only one small part." },
  { title: "Step 5: consent before sharing", text: "Pick contacts, set one policy, and give explicit consent before anything is shared. Try 'Add contact': type a name and number, or pick from your phone." },
  { title: "Step 6: the trip, with the toolkit one tap away", text: "Driver card, verification PIN, live status, and SOS always visible. Use 'Advance Demo' to simulate the ride progressing." },
  { title: "Step 7: the loop closes quietly", text: "Five minutes after the trip: 'Did you reach safely?' Tap 'See what your Circle saw' to open the contact's view right here in the phone, or scroll down to the Safety Circle View section." },
];

export default function Prototype() {
  const [step, setStep] = useState(1);
  const [scenario, setScenario] = useState<Scenario>("elevated");
  const [riderName, setRiderName] = useState("Priya");
  const [tourOn, setTourOn] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [fsScale, setFsScale] = useState(1);
  const [circle, setCircle] = useState<CircleInfo | null>(null);

  const onStepChange = useCallback((n: number) => setStep(n), []);
  const onCircleChange = useCallback((info: CircleInfo) => setCircle(info), []);

  /* the tour caption is derived from whichever screen is showing */
  const tour = tourOn ? Math.min(Math.max(step, 0), TOUR.length - 1) : null;

  /* fullscreen scaling + scroll lock */
  useEffect(() => {
    if (!fullscreen) return;
    const measure = () =>
      setFsScale(Math.min(window.innerWidth / 402, window.innerHeight / 874));
    measure();
    window.addEventListener("resize", measure);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("resize", measure);
      document.body.style.overflow = "";
    };
  }, [fullscreen]);

  const startTour = () => {
    setTourOn(true);
    jumpToStep(0);
  };
  const tourGo = (dir: 1 | -1) => {
    const next = (tour ?? 0) + dir;
    if (next < 0 || next > 8) {
      setTourOn(false);
      return;
    }
    jumpToStep(next, true);
  };

  /* The tour plays itself: the splash runs its own launch timer, then
     every screen holds for about 3 seconds. The whole demo lands under
     30 seconds and ends on the check-in screen. */
  useEffect(() => {
    if (!tourOn) return;
    if (step >= 1 && step < 8) {
      const t = setTimeout(() => jumpToStep(step + 1, true), 3000);
      return () => clearTimeout(t);
    }
    if (step === 8) {
      const t = setTimeout(() => setTourOn(false), 4000);
      return () => clearTimeout(t);
    }
  }, [tourOn, step]);

  const phone = (
    <PhoneApp
      scenario={scenario}
      riderName={riderName}
      showNoResponse={false}
      onStepChange={onStepChange}
      onCircleChange={onCircleChange}
    />
  );

  return (
    <section id="prototype" className="mt-24 bg-black text-white">
      <div className="mx-auto max-w-[1240px] px-5 py-5">
        <div className="mb-2 text-xs font-bold tracking-[1.6px] text-[#A6A6A6]">
          INTERACTIVE PROTOTYPE
        </div>
        <h2 className="m-0 mb-1 text-[clamp(22px,2.2vw,30px)] font-extrabold leading-[1.08] tracking-[-1.3px]">
          Walk all 8 screens yourself.
        </h2>
        <p className="m-0 mb-2.5 text-[13.5px] leading-[1.5] text-[#A6A6A6]">
          The app opens on the Uber splash, lands on home, and the safety flow runs in 7 steps: in the city or outstation, on
          every ride type except Parcel. Sample Hyderabad locations, fictional drivers and contacts. Nothing real is booked,
          tracked or contacted.
        </p>

        {/* demo controls */}
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={startTour}
            className="inline-flex items-center gap-1.5 rounded-full bg-brand px-3.5 py-2 text-[12.5px] font-bold text-white transition-all hover:bg-brand-dark hover:shadow-[0_8px_24px_rgba(39,110,241,.45)]"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M8 5.5v13l11-6.5-11-6.5z" fill="currentColor" />
            </svg>
            Take the guided tour · 30 s
          </button>
          <button
            type="button"
            onClick={() => setFullscreen(true)}
            className="inline-flex items-center gap-1.5 rounded-full border border-[#3A3A3A] px-3.5 py-2 text-[12.5px] font-bold text-white transition-colors hover:border-brand"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Open full-screen app
          </button>
          <div className="flex items-center gap-1.5 rounded-full border border-[#2A2A2A] p-1 text-[12px] font-bold">
            {(["elevated", "lower", "limited-data"] as Scenario[]).map((sc) => (
              <button
                key={sc}
                type="button"
                onClick={() => setScenario(sc)}
                className="rounded-full px-2.5 py-1.5 capitalize transition-colors"
                style={{
                  background: scenario === sc ? "#FFFFFF" : "transparent",
                  color: scenario === sc ? "#000000" : "#A6A6A6",
                }}
              >
                {sc === "limited-data" ? "Limited data" : sc}
              </button>
            ))}
          </div>
          <label className="flex items-center gap-1.5 rounded-full border border-[#2A2A2A] px-3 py-1.5 text-[12px] font-semibold text-[#A6A6A6]">
            Rider
            <input
              value={riderName}
              onChange={(e) => setRiderName(e.target.value.slice(0, 14) || "Priya")}
              className="w-[72px] border-none bg-transparent font-bold text-white outline-none"
              aria-label="Rider name used in the demo"
            />
          </label>
        </div>

        <div className="flex flex-wrap items-start justify-center gap-6">
          {/* phone */}
          <Reveal
            variant="scale"
            className="max-w-full rounded-[40px] p-[clamp(6px,1.2vw,12px)]"
            style={{
              background:
                "radial-gradient(62% 55% at 50% 42%, rgba(39,110,241,.25), transparent 72%)",
            }}
          >
            <PhoneScaler desktopScale={0.56}>
              <IOSDevice>{phone}</IOSDevice>
            </PhoneScaler>
          </Reveal>

          {/* rail */}
          <div className="flex min-w-[min(100%,240px)] max-w-[320px] flex-1 flex-col gap-1">
            <div className="text-[10.5px] font-bold tracking-[1.2px] text-[#A6A6A6]">
              THE APP · TAP TO JUMP
            </div>
            {APP_SCREENS.map((r) => {
              const active = step <= 1;
              return (
                <button
                  key={r.title}
                  type="button"
                  onClick={() => jumpToStep(1)}
                  className="flex items-center gap-2 rounded-[10px] border px-2.5 py-1.5 text-left transition-all duration-200 hover:translate-x-1 hover:border-brand"
                  style={{
                    borderColor: active ? "#276EF1" : "#333333",
                    background: active ? "rgba(39,110,241,.12)" : "transparent",
                  }}
                >
                  <span
                    className="flex h-[22px] w-[22px] flex-none items-center justify-center rounded-full border border-[#333333]"
                    style={{ background: active ? "#276EF1" : "transparent" }}
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M4 11l8-7 8 7v9a1 1 0 01-1 1h-5v-6h-4v6H5a1 1 0 01-1-1z" fill={active ? "#fff" : "#A6A6A6"} />
                    </svg>
                  </span>
                  <span className="flex-1">
                    <span className="block text-[12.5px] font-bold leading-tight text-white">{r.title}</span>
                    <span className="block text-[10.5px] leading-tight text-[#A6A6A6]">{r.desc}</span>
                  </span>
                </button>
              );
            })}
            <div className="mt-1 text-[10.5px] font-bold tracking-[1.2px] text-[#A6A6A6]">
              THE SAFETY FLOW · 7 STEPS
            </div>
            {FLOW_SCREENS.map((r, i) => {
              const target = i + 2;
              const active = step === target;
              const done = step > target;
              return (
                <button
                  key={r.title}
                  type="button"
                  onClick={() => jumpToStep(target)}
                  className="flex items-center gap-2 rounded-[10px] border px-2.5 py-1.5 text-left transition-all duration-200 hover:translate-x-1 hover:border-brand"
                  style={{
                    borderColor: active ? "#276EF1" : "#333333",
                    background: active ? "rgba(39,110,241,.12)" : "transparent",
                  }}
                >
                  <span
                    className="flex h-[22px] w-[22px] flex-none items-center justify-center rounded-full border border-[#333333] text-[11px] font-extrabold"
                    style={{
                      background: done ? "#FFFFFF" : active ? "#276EF1" : "transparent",
                      color: done ? "#000000" : active ? "#FFFFFF" : "#A6A6A6",
                    }}
                  >
                    {r.n}
                  </span>
                  <span className="flex-1">
                    <span className="block text-[12.5px] font-bold leading-tight text-white">{r.title}</span>
                    <span className="block text-[10.5px] leading-tight text-[#A6A6A6]">{r.desc}</span>
                  </span>
                </button>
              );
            })}
            {tour !== null ? (
              <div
                className="mt-1.5 rounded-xl border border-brand bg-[rgba(39,110,241,.1)] p-3.5"
                style={{ animation: "slideup .3s ease" }}
              >
                <div className="mb-1 flex items-center justify-between text-[10.5px] font-bold tracking-[1px] text-[#8FB0FF]">
                  GUIDED TOUR · {tour + 1} / 9
                  <button type="button" onClick={() => setTourOn(false)} className="text-[#A6A6A6] hover:text-white">
                    End tour ✕
                  </button>
                </div>
                <div className="text-sm font-extrabold text-white">{TOUR[tour].title}</div>
                <div className="mt-1 text-[12.5px] leading-[1.55] text-[#C8D4EA]">{TOUR[tour].text}</div>
                <div className="mt-2.5 flex items-center gap-2">
                  <span className="flex items-center gap-1.5 text-[10.5px] font-bold text-[#8FB0FF]">
                    <span className="h-1.5 w-1.5 rounded-full bg-safe" style={{ animation: "blink 1s ease infinite" }} />
                    playing by itself
                  </span>
                  <button
                    type="button"
                    onClick={() => tourGo(1)}
                    className="ml-auto rounded-lg bg-brand px-3 py-1.5 text-xs font-bold text-white"
                  >
                    {tour === 8 ? "Finish ✓" : "Skip ahead →"}
                  </button>
                </div>
              </div>
            ) : (
              <div className="mt-1 rounded-lg border border-dashed border-[#333333] px-3 py-1.5 text-[10.5px] leading-[1.5] text-[#A6A6A6]">
                Scenario and rider name are tweakable in the controls above. On step 1, pick In city
                or Outstation, and try turning the SafeRide toggle off to book a standard ride. The
                Elevated, Lower and Limited Data buttons change what the Safety Brief on step 2 says.
              </div>
            )}
          </div>
        </div>

        {/* ── what the Safety Circle contact sees ── */}
        <div id="circle-view" className="mt-10 border-t border-[#2A2A2A] pt-6">
          <div className="mb-2 text-xs font-bold tracking-[1.6px] text-[#A6A6A6]">
            SAFETY CIRCLE VIEW
          </div>
          <h3 className="m-0 mb-1 text-[clamp(20px,2vw,28px)] font-extrabold leading-[1.08] tracking-[-1px]">
            The SMS and live tracking contacts get.
          </h3>
          <p className="m-0 mb-3 text-[13.5px] leading-[1.5] text-[#A6A6A6]">
            The moment {riderName} saves her Safety Circle, each contact gets an SMS with the driver&apos;s name, vehicle, plate, trip PIN
            and a live tracking link. This phone belongs to {circle?.selNames?.[0] || "Ananya"}: tap the blue link for live GPS, trip details and
            calls. It mirrors every choice you make in the demo above, in the city or outstation.
          </p>
          <div className="flex flex-wrap items-start justify-center gap-6">
            <Reveal
              variant="scale"
              className="max-w-full rounded-[40px] p-[clamp(6px,1.2vw,12px)]"
              style={{
                background:
                  "radial-gradient(62% 55% at 50% 42%, rgba(6,193,103,.18), transparent 72%)",
              }}
            >
              <PhoneScaler desktopScale={0.56}>
                <IOSDevice>
                  <ContactView riderName={riderName} info={circle} />
                </IOSDevice>
              </PhoneScaler>
            </Reveal>
            <div className="flex min-w-[min(100%,240px)] max-w-[330px] flex-1 flex-col gap-1">
              <div className="text-[10.5px] font-bold tracking-[1.2px] text-[#A6A6A6]">
                HOW THE SHARE BEHAVES
              </div>
              {[
                ["SMS with the details that matter", "Rider name, driver name, vehicle, plate number, trip PIN and ETA go out with the tracking link. Nothing is left for the contact to ask."],
                ["Live GPS for the whole trip", "In the city or outstation, the link stays live until the rider arrives, whether that takes 24 minutes or 8 hours. No app install needed."],
                ["Expiry that thinks about safety", "After the rider taps 'Yes, I'm safe', the link and trip replay work for 30 more minutes. If she never responds, they stay active for 12 hours and the driver's number is right there."],
                ["Trip details and calls, one tap away", "Booked route, time, progress, ETA, PIN, driver contact and the Uber helpline live behind 'View trip details'."],
                ["Consent first, always", "The SMS is only sent after the rider selects contacts and ticks the consent box on step 5."],
              ].map(([t, d]) => (
                <div key={t} className="rounded-[10px] border border-[#333333] px-3 py-1.5">
                  <div className="text-[12.5px] font-bold text-white">{t}</div>
                  <div className="text-[10.5px] leading-[1.45] text-[#A6A6A6]">{d}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* full-screen app mode */}
      {fullscreen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black">
          <div
            style={{
              width: 402,
              height: 874,
              transform: `scale(${fsScale})`,
              transformOrigin: "center center",
            }}
          >
            <div className="h-full overflow-hidden rounded-[24px]">{phone}</div>
          </div>
          <button
            type="button"
            onClick={() => setFullscreen(false)}
            aria-label="Close full-screen demo"
            className="absolute right-4 top-4 z-[210] flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-md transition-colors hover:bg-white/30"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      )}
    </section>
  );
}
