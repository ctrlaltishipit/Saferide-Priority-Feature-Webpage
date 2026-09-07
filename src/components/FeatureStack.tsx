"use client";

import { Reveal } from "./ui";

/* Five feature cards that stack with a sticky-scroll deck effect. */

function GaugeVisual() {
  return (
    <svg viewBox="0 0 380 250" className="mx-auto block w-full max-w-[430px]" aria-label="Animated guidance dial pointing between lower, elevated and higher categories">
      <path d="M60 205 A130 130 0 01320 205" fill="none" stroke="#E2E2E2" strokeWidth="26" strokeLinecap="round" />
      <path d="M60 205 A130 130 0 01152 83" fill="none" stroke="#06C167" strokeWidth="26" strokeLinecap="round" />
      <path d="M152 83 A130 130 0 01262 97" fill="none" stroke="#F6BC2F" strokeWidth="26" strokeLinecap="round" />
      <path d="M262 97 A130 130 0 01320 205" fill="none" stroke="#DE1135" strokeWidth="26" strokeLinecap="round" />
      <g style={{ transformOrigin: "190px 205px", animation: "gaugeSweep 4s ease-in-out infinite" }}>
        <path d="M186 205 L190 101 L194 205 z" fill="#000" />
      </g>
      <circle cx="190" cy="205" r="14" fill="#000" />
      <rect x="34" y="222" width="66" height="22" rx="11" fill="#EAF6EF" />
      <text x="67" y="237" textAnchor="middle" fontSize="11.5" fontWeight="800" fill="#0E8345" fontFamily="Helvetica,Arial">LOWER</text>
      <rect x="149" y="34" width="84" height="22" rx="11" fill="#FFF1D6" />
      <text x="191" y="49" textAnchor="middle" fontSize="11.5" fontWeight="800" fill="#7A4E00" fontFamily="Helvetica,Arial">ELEVATED</text>
      <rect x="282" y="222" width="70" height="22" rx="11" fill="#FDE8EC" />
      <text x="317" y="237" textAnchor="middle" fontSize="11.5" fontWeight="800" fill="#A50D28" fontFamily="Helvetica,Arial">HIGHER</text>
    </svg>
  );
}

function MatchVisual() {
  return (
    <svg viewBox="0 0 360 190" className="mx-auto block w-full max-w-[430px]" aria-label="Driver card with SafeRide Priority eligibility badge and trade-off chips">
      <rect x="4" y="6" width="352" height="148" rx="18" fill="#141414" stroke="#2A2A2A" />
      <circle cx="46" cy="52" r="24" fill="#276EF1" />
      <text x="46" y="58" textAnchor="middle" fontSize="16" fontWeight="800" fill="#fff" fontFamily="Helvetica">AS</text>
      <rect x="82" y="34" width="104" height="12" rx="6" fill="#fff" />
      <rect x="82" y="56" width="150" height="9" rx="4.5" fill="#3A3A3A" />
      <rect x="82" y="72" width="120" height="9" rx="4.5" fill="#2A2A2A" />
      <rect x="244" y="30" width="98" height="28" rx="14" fill="#276EF1" />
      <path d="M260 38l5.5 2.2v3.6c0 3.2-2.2 6-5.5 7-3.3-1-5.5-3.8-5.5-7v-3.6z" fill="#fff" />
      <text x="296" y="48.5" textAnchor="middle" fontSize="11" fontWeight="800" fill="#fff" fontFamily="Helvetica">ELIGIBLE</text>
      <rect x="82" y="100" width="76" height="28" rx="14" fill="#242424" />
      <text x="120" y="118.5" textAnchor="middle" fontSize="12" fontWeight="800" fill="#F6BC2F" fontFamily="Helvetica">+4 min</text>
      <rect x="166" y="100" width="76" height="28" rx="14" fill="#242424" />
      <text x="204" y="118.5" textAnchor="middle" fontSize="12" fontWeight="800" fill="#F6BC2F" fontFamily="Helvetica">+₹20</text>
      <rect x="250" y="100" width="92" height="28" rx="14" fill="#242424" />
      <text x="296" y="118.5" textAnchor="middle" fontSize="11" fontWeight="700" fill="#A6A6A6" fontFamily="Helvetica">★ 4.8 · 7 min</text>
      <circle cx="20" cy="176" r="4" fill="#06C167" style={{ animation: "blink 1.8s ease infinite" }} />
      <text x="32" y="180" fontSize="11.5" fill="#A6A6A6" fontFamily="Helvetica">appeal &amp; training path for drivers · fairness audited monthly</text>
    </svg>
  );
}

function CircleVisual() {
  return (
    <svg viewBox="0 0 360 210" className="mx-auto block w-full max-w-[430px]" aria-label="Rider node sharing an expiring trip link with two consented contacts">
      <rect x="120" y="6" width="120" height="28" rx="14" fill="#000" />
      <circle cx="138" cy="20" r="5.5" fill="#F6BC2F" style={{ animation: "blink 2s ease infinite" }} />
      <text x="150" y="24.5" fontSize="11" fontWeight="700" fill="#fff" fontFamily="Helvetica">expires in 30:00</text>
      <path d="M180 34 V78" stroke="#C9CED4" strokeWidth="2" strokeDasharray="3 5" />
      <circle cx="180" cy="112" r="28" fill="#000" />
      <text x="180" y="118" textAnchor="middle" fontSize="14" fontWeight="800" fill="#fff" fontFamily="Helvetica">YOU</text>
      <circle cx="58" cy="74" r="21" fill="#06C167" />
      <text x="58" y="79" textAnchor="middle" fontSize="11.5" fontWeight="800" fill="#00250F" fontFamily="Helvetica">AN</text>
      <rect x="24" y="102" width="70" height="20" rx="10" fill="#EAF6EF" />
      <text x="59" y="116" textAnchor="middle" fontSize="10" fontWeight="700" fill="#0E8345" fontFamily="Helvetica">consented</text>
      <circle cx="302" cy="74" r="21" fill="#06C167" />
      <text x="302" y="79" textAnchor="middle" fontSize="11.5" fontWeight="800" fill="#00250F" fontFamily="Helvetica">ME</text>
      <rect x="268" y="102" width="70" height="20" rx="10" fill="#EAF6EF" />
      <text x="303" y="116" textAnchor="middle" fontSize="10" fontWeight="700" fill="#0E8345" fontFamily="Helvetica">consented</text>
      <circle cx="286" cy="170" r="17" fill="#EEEEEE" />
      <text x="286" y="175" textAnchor="middle" fontSize="10" fontWeight="800" fill="#6B6B6B" fontFamily="Helvetica">RD</text>
      <rect x="212" y="160" width="62" height="20" rx="10" fill="#F6F6F6" stroke="#E2E2E2" />
      <text x="243" y="174" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#A6A6A6" fontFamily="Helvetica">not selected</text>
      <path d="M78 84 C110 96 130 102 152 106" stroke="#06C167" strokeWidth="3" fill="none" strokeDasharray="6 6" style={{ animation: "dashflow 1.3s linear infinite" }} />
      <path d="M282 84 C250 96 230 102 208 106" stroke="#06C167" strokeWidth="3" fill="none" strokeDasharray="6 6" style={{ animation: "dashflow 1.3s linear infinite" }} />
      <path d="M270 162 C245 148 225 134 205 124" stroke="#C9CED4" strokeWidth="2.5" fill="none" strokeDasharray="2 7" />
    </svg>
  );
}

function AnchorsVisual() {
  return (
    <svg viewBox="0 0 360 210" className="mx-auto block w-full max-w-[430px]" aria-label="Mini map: original drop point with two staffed alternatives within 300 metres">
      <rect x="0" y="0" width="360" height="210" rx="18" fill="#E9EDF0" />
      <path d="M0 132 H360" stroke="#fff" strokeWidth="10" />
      <path d="M104 0 V210" stroke="#fff" strokeWidth="8" />
      <path d="M248 0 V210" stroke="#fff" strokeWidth="6" />
      <circle cx="160" cy="84" r="34" fill="#276EF1" opacity=".1" />
      <path d="M170 92 C210 106 250 92 280 82" stroke="#0E8345" strokeWidth="2.5" fill="none" strokeDasharray="6 6" style={{ animation: "dashflow 1.4s linear infinite" }} />
      <path d="M150 96 C128 112 108 126 92 140" stroke="#0E8345" strokeWidth="2.5" fill="none" strokeDasharray="6 6" style={{ animation: "dashflow 1.6s linear infinite" }} />
      <rect x="152" y="76" width="16" height="16" fill="#000" />
      <rect x="112" y="36" width="96" height="22" rx="11" fill="#fff" stroke="#E2E2E2" />
      <text x="160" y="51" textAnchor="middle" fontSize="10.5" fontWeight="700" fill="#545454" fontFamily="Helvetica">original drop</text>
      <circle cx="292" cy="76" r="14" fill="#06C167" />
      <text x="292" y="81" textAnchor="middle" fontSize="11.5" fontWeight="800" fill="#00250F" fontFamily="Helvetica">M</text>
      <rect x="222" y="98" width="130" height="22" rx="11" fill="#fff" stroke="#E2E2E2" />
      <text x="287" y="113" textAnchor="middle" fontSize="10" fontWeight="700" fill="#0E8345" fontFamily="Helvetica">metro · 180 m · staffed</text>
      <circle cx="76" cy="168" r="14" fill="#06C167" />
      <text x="76" y="173" textAnchor="middle" fontSize="11.5" fontWeight="800" fill="#00250F" fontFamily="Helvetica">H</text>
      <rect x="14" y="140" width="124" height="22" rx="11" fill="#fff" stroke="#E2E2E2" />
      <text x="76" y="155" textAnchor="middle" fontSize="10" fontWeight="700" fill="#0E8345" fontFamily="Helvetica">clinic gate · 240 m</text>
    </svg>
  );
}

function CheckinVisual() {
  return (
    <svg viewBox="0 0 380 210" className="mx-auto block w-full max-w-[430px]" aria-label="Tiered check-in timeline: check-in, reminder, neutral contact alert">
      <rect x="216" y="10" width="152" height="44" rx="14" fill="#fff" />
      <text x="292" y="29" textAnchor="middle" fontSize="11" fontWeight="800" fill="#000" fontFamily="Helvetica">Not an emergency alert</text>
      <text x="292" y="44" textAnchor="middle" fontSize="9.5" fill="#6B6B6B" fontFamily="Helvetica">call · view trip · resources</text>
      <path d="M310 54 V88" stroke="#8FB0FF" strokeWidth="2" strokeDasharray="3 5" />
      <path d="M40 110 H340" stroke="#2A3D66" strokeWidth="3" />
      <circle cx="70" cy="110" r="17" fill="#06C167" />
      <path d="M62 110l6 6 11-13" stroke="#fff" strokeWidth="3.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <text x="70" y="150" textAnchor="middle" fontSize="11.5" fontWeight="700" fill="#fff" fontFamily="Helvetica">+5 min</text>
      <text x="70" y="166" textAnchor="middle" fontSize="10" fill="#8FA3CC" fontFamily="Helvetica">&quot;Did you reach safely?&quot;</text>
      <circle cx="190" cy="110" r="17" fill="#F6BC2F" style={{ animation: "softpulse 2.4s ease infinite" }} />
      <path d="M190 102v9l6 4" stroke="#000" strokeWidth="3" fill="none" strokeLinecap="round" />
      <text x="190" y="150" textAnchor="middle" fontSize="11.5" fontWeight="700" fill="#fff" fontFamily="Helvetica">+10 min</text>
      <text x="190" y="166" textAnchor="middle" fontSize="10" fill="#8FA3CC" fontFamily="Helvetica">one gentle reminder</text>
      <circle cx="310" cy="110" r="17" fill="#16264A" stroke="#8FB0FF" strokeWidth="2.5" />
      <path d="M310 102v10m0 5v.5" stroke="#8FB0FF" strokeWidth="3" strokeLinecap="round" />
      <text x="310" y="150" textAnchor="middle" fontSize="11.5" fontWeight="700" fill="#fff" fontFamily="Helvetica">then</text>
      <text x="310" y="166" textAnchor="middle" fontSize="10" fill="#8FA3CC" fontFamily="Helvetica">neutral note to contacts</text>
    </svg>
  );
}

type Card = {
  badge: string;
  badgeCls: string;
  title: React.ReactNode;
  body: React.ReactNode;
  visual: React.ReactNode;
  cardCls: string;
  bodyColor: string;
  top: number;
  z: number;
  chips?: string[];
};

const CARDS: Card[] = [
  {
    badge: "P0 · CONTEXTUAL SAFETY BRIEF",
    badgeCls: "text-caution-dark bg-[#FFF1D6]",
    title: (<>A safety brief<br />you can question.</>),
    body: "Lower, Elevated, Higher, or Limited Data. Every result comes with 2 to 4 plain language reasons, a data confidence meter and a Why am I seeing this panel. Your booking always goes through either way.",
    visual: <GaugeVisual />,
    cardCls: "bg-mist border border-line",
    bodyColor: "text-ink-soft",
    top: 96,
    z: 1,
    chips: ["Planned after midnight", "Fewer staffed anchors nearby", "Staffed entrance 180 m away"],
  },
  {
    badge: "P0 · SAFETY PRIORITY MATCH",
    badgeCls: "text-[#8FB0FF] bg-[#16264A]",
    title: (<>See the full trade-off<br />before you choose.</>),
    body: "Verification complete · safety training · 1000+ trips · clear review status. Driver eligibility rests on several audited signals, and star ratings are only one small part. The +4 min and +₹20 trade off sits right on the card before you pick. And every SafeRide Priority match is a committed pickup: the driver accepts your trip before you see the match, and a cancel means an instant first-in-line rematch.",
    visual: <MatchVisual />,
    cardCls: "bg-black text-white",
    bodyColor: "text-[#A6A6A6]",
    top: 108,
    z: 2,
  },
  {
    badge: "P0 · SAFETY CIRCLE",
    badgeCls: "text-safe-dark bg-[#EAF6EF]",
    title: (<>Sharing that asks first.<br />Links that expire.</>),
    body: "Up to five trusted contacts and one sharing policy set once: ask every time, after 8 PM, higher risk trips only, or never. You give clear consent before the first automatic share, and every live tracking link expires in 30 minutes. When Female rider is on, live GPS sharing is mandatory.",
    visual: <CircleVisual />,
    cardCls: "bg-white border border-line",
    bodyColor: "text-ink-soft",
    top: 120,
    z: 3,
  },
  {
    badge: "P1 · SAFER ANCHORS",
    badgeCls: "text-ink-soft bg-[#EEEEEE]",
    title: (<>A safer spot to step out,<br />a short walk away.</>),
    body: "Staffed gates, metro entrances and 24/7 venues within a short walk, each with a clear reason and the extra minutes it adds. Your original drop point stays one tap away, and the app says nothing bad about it.",
    visual: <AnchorsVisual />,
    cardCls: "bg-mist border border-line",
    bodyColor: "text-ink-soft",
    top: 132,
    z: 4,
  },
  {
    badge: "P1 · ARRIVAL CHECK-IN",
    badgeCls: "text-[#8FB0FF] bg-[#16264A]",
    title: (<>A quiet check-in<br />after you arrive.</>),
    body: 'Five minutes after the trip: "Did you reach safely?" One reminder at ten. Only then a calm note goes to your Safety Circle, and the message itself says this is not an emergency alert. Escalation always needs a human.',
    visual: <CheckinVisual />,
    cardCls: "bg-[#0D1B36] text-white",
    bodyColor: "text-[#B8C6E4]",
    top: 144,
    z: 5,
  },
];

export default function FeatureStack() {
  return (
    <div className="relative mt-2">
      {CARDS.map((c, i) => (
        <div
          key={c.badge}
          className={i < CARDS.length - 1 ? "sticky pb-4 sm:pb-[26px]" : "sticky"}
          style={{ top: c.top, zIndex: c.z }}
        >
          <div
            className={`grid items-center gap-5 rounded-[22px] p-5 [grid-template-columns:repeat(auto-fit,minmax(min(100%,280px),1fr))] sm:min-h-[min(62vh,430px)] sm:gap-[30px] sm:rounded-[26px] sm:p-[clamp(20px,3vw,40px)] ${c.cardCls}`}
            style={{
              boxShadow:
                c.cardCls.includes("bg-black") || c.cardCls.includes("#0D1B36")
                  ? "0 -16px 44px rgba(0,0,0,.3)"
                  : "0 -16px 44px rgba(0,0,0,.14)",
            }}
          >
            <div>
              <span className={`rounded-full px-[11px] py-[5px] text-[11px] font-bold ${c.badgeCls}`}>
                {c.badge}
              </span>
              <h3 className="mb-2.5 mt-4 text-[clamp(22px,2.6vw,34px)] font-extrabold tracking-[-.8px]">
                {c.title}
              </h3>
              <p className={`m-0 text-[14.5px] leading-[1.6] ${c.bodyColor}`}>{c.body}</p>
              {c.chips && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {c.chips.map((chip) => (
                    <span
                      key={chip}
                      className="whitespace-nowrap rounded-full border border-line bg-white px-3.5 py-[7px] text-[11.5px] font-semibold"
                    >
                      {chip}
                    </span>
                  ))}
                </div>
              )}
            </div>
            <Reveal variant="scale">{c.visual}</Reveal>
          </div>
        </div>
      ))}
    </div>
  );
}
