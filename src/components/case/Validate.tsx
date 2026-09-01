/* ─────────────── Chapter 6: how the concept gets validated ───────────────
   Four hypotheses as experiment cards, who I would talk to first, a price
   ladder for the priority fee, and the assumptions that die first if wrong.
   Server components; motion comes from the shared helpers. */

import { HYPOTHESES, RESEARCH_PLAN, WTP_LADDER, ASSUMPTION_MAP } from "@/content/case";
import { SectionHeader } from "./primitives";
import { GlowCard, Carousel } from "./Motion";

export function Hypotheses() {
  return (
    <div>
      <SectionHeader
        eyebrow="FOUR HYPOTHESES"
        glyph="scale"
        title="Each bet names the number that would kill it."
        lede="Written before the pilot, with the analysis pre-registered. A hypothesis without a stop rule is a wish."
      />
      <div className="grid gap-3.5 [grid-template-columns:repeat(auto-fit,minmax(min(100%,280px),1fr))]">
        {HYPOTHESES.map((h, i) => (
          <GlowCard key={h.id} className={`flex h-full flex-col rounded-2xl p-5 ${i === 3 ? "bg-black text-white" : "border border-line bg-white"}`}>
            <div className="flex items-center justify-between gap-2">
              <span className={`rounded-full px-2.5 py-1 text-[10.5px] font-extrabold tracking-[1.2px] ${i === 3 ? "bg-white text-black" : "bg-black text-white"}`}>{h.id}</span>
              <a href="#prototype" className={`text-[11.5px] font-bold ${i === 3 ? "text-[#8FB0FF]" : "text-brand"}`}>
                Screen {h.screen} →
              </a>
            </div>
            <p className="m-0 mt-3 text-[15px] font-extrabold leading-[1.35] tracking-[-0.2px]">{h.claim}</p>
            <dl className={`m-0 mt-4 grid gap-2.5 text-[12.5px] leading-[1.5] ${i === 3 ? "text-[#C9C9C9]" : "text-ink-soft"}`}>
              {[["Metric", h.metric], ["Sample", h.sample], ["When", h.when]].map(([k, v]) => (
                <div key={k}>
                  <dt className={`text-[10px] font-bold tracking-[1.4px] ${i === 3 ? "text-[#8f8f8f]" : "text-ink-faint"}`}>{k.toUpperCase()}</dt>
                  <dd className="m-0">{v}</dd>
                </div>
              ))}
            </dl>
            <div className={`mt-auto rounded-xl p-3 pt-3 text-[12.5px] leading-[1.5] ${i === 3 ? "mt-4 bg-white/10" : "mt-4 bg-[#FFF1F3] text-[#8A1C2B]"}`}>
              <span className="font-extrabold">Stop rule: </span>
              {h.stop}
            </div>
          </GlowCard>
        ))}
      </div>
    </div>
  );
}

export function ResearchPlan() {
  const total = RESEARCH_PLAN.slice(0, 5).reduce((n, r) => n + Number(r.count), 0);
  return (
    <div className="mt-14 sm:mt-24">
      <SectionHeader
        eyebrow="WHO I WOULD SIT WITH FIRST"
        glyph="people"
        size="h3"
        title={`${total} conversations and six shadowed rides before stage 2.`}
        lede="Screener: rides after 8 PM in the last 30 days, Uber as a primary or secondary app, rides alone at least sometimes. The guide walks the last night ride step by step."
      />
      <Carousel minWidth={360} ariaLabel="Research plan">
        {RESEARCH_PLAN.map((r, i) => {
          const obs = i === RESEARCH_PLAN.length - 1;
          return (
            <GlowCard key={r.who} className={`flex h-full flex-col rounded-2xl border p-5 ${obs ? "border-brand bg-[rgba(39,110,241,.05)]" : "border-line bg-white"}`}>
              <div className="text-[clamp(28px,3vw,36px)] font-extrabold tracking-[-1.5px]">{r.count}</div>
              <div className="mt-1 text-[14.5px] font-extrabold leading-[1.3] tracking-[-0.2px]">{r.who}</div>
              <p className="m-0 mt-2 text-[12.5px] leading-[1.55] text-ink-soft">{r.why}</p>
              {obs && <div className="mt-auto pt-3 text-[11px] font-bold tracking-[1.2px] text-brand">OBSERVATION</div>}
            </GlowCard>
          );
        })}
      </Carousel>
    </div>
  );
}

/* The price ladder as a set of rising steps, with the prototype's price lit. */
export function PriceLadder() {
  const n = WTP_LADDER.length;
  return (
    <div className="mt-14 sm:mt-24">
      <SectionHeader
        eyebrow="WHAT IS A COMMITTED DRIVER WORTH"
        glyph="coins"
        size="h3"
        title="A price ladder, then a split between minutes and rupees."
        lede="Five prices asked in order, so the answer is a curve and not a yes. Stage 3 then shows half the riders a wait premium and half a fee."
      />
      <div className="rounded-2xl border border-line bg-white p-4 sm:p-6">
        <svg viewBox="0 0 720 200" className="block h-auto w-full" role="img" aria-label="Five price steps from zero to sixty rupees, with twenty rupees lit as the prototype price">
          <style>{`@keyframes stepUp { from { transform: scaleY(0); } to { transform: scaleY(1); } }`}</style>
          {WTP_LADDER.map((w, i) => {
            const x = 20 + i * 140;
            const h = 40 + i * 30;
            const lit = w.price === "₹20";
            return (
              <g key={w.price}>
                <rect
                  x={x}
                  y={170 - h}
                  width="120"
                  height={h}
                  rx="10"
                  fill={lit ? "#276EF1" : "#EEF3FE"}
                  stroke={lit ? "none" : "#C7D9FB"}
                  style={{ transformOrigin: "0 170px", transformBox: "view-box", animation: `stepUp .7s ${i * 0.1}s cubic-bezier(.16,1,.3,1) both` }}
                />
                <text x={x + 60} y={170 - h + 26} textAnchor="middle" fontSize="18" fontWeight="800" fill={lit ? "#fff" : "#111"} fontFamily="Helvetica,Arial">
                  {w.price}
                </text>
                {lit && (
                  <text x={x + 60} y={170 - h + 44} textAnchor="middle" fontSize="10" fontWeight="800" letterSpacing="1.2" fill="#D6E4FE" fontFamily="Helvetica,Arial">
                    IN THE PROTOTYPE
                  </text>
                )}
                <text x={x + 60} y="192" textAnchor="middle" fontSize="11" fontWeight="700" fill="#9AA0A6" fontFamily="Helvetica,Arial">
                  {i === 0 ? "floor test" : i === n - 1 ? "ceiling test" : `step ${i}`}
                </text>
              </g>
            );
          })}
        </svg>
        <ul className="m-0 mt-4 grid list-none gap-2 p-0 sm:grid-cols-5">
          {WTP_LADDER.map((w) => (
            <li key={w.price} className={`rounded-xl p-3 text-[12.5px] leading-[1.5] ${w.price === "₹20" ? "bg-black text-white" : "bg-mist text-ink-soft"}`}>
              <span className="font-extrabold">{w.price} · </span>
              {w.read}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function AssumptionMap() {
  return (
    <div className="mt-14 sm:mt-24">
      <SectionHeader
        eyebrow="THE ASSUMPTIONS THAT DIE FIRST"
        glyph="cross"
        size="h3"
        title="Five beliefs the case leans on, and the fact that would end each."
        lede="Important and thinly evidenced, so they are tested first. If one falls, the case changes shape before any money does."
      />
      <div className="flex flex-col gap-2.5">
        {ASSUMPTION_MAP.map((a, i) => (
          <GlowCard key={a.belief} className="grid items-center gap-x-5 gap-y-2 rounded-2xl border border-line bg-white p-4 sm:grid-cols-[auto_1.2fr_1fr_auto] sm:p-5">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-[12.5px] font-extrabold text-white">{i + 1}</span>
            <div>
              <div className="text-[10.5px] font-bold tracking-[1.4px] text-ink-faint">I BELIEVE</div>
              <div className="mt-1 text-[14.5px] font-extrabold leading-[1.35] tracking-[-0.2px]">{a.belief}</div>
            </div>
            <div className="border-line sm:border-l sm:pl-5">
              <div className="text-[10.5px] font-bold tracking-[1.4px] text-[#B42318]">KILLED BY</div>
              <p className="m-0 mt-1 text-[13px] leading-[1.5] text-ink-soft">{a.killedBy}</p>
            </div>
            <span className="justify-self-start rounded-full border border-line px-2.5 py-1 text-[11px] font-bold text-ink-soft sm:justify-self-end">{a.stage}</span>
          </GlowCard>
        ))}
      </div>
    </div>
  );
}
