/* ─────────────── Chapter 6: how the concept gets validated ───────────────
   Four hypotheses as experiment cards, who I would talk to first, a price
   ladder for the priority fee, and the assumptions that die first if wrong.
   Server components; motion comes from the shared helpers. */

import { HYPOTHESES, RESEARCH_PLAN, WTP_LADDER, ASSUMPTION_MAP } from "@/content/case";
import { Fragment } from "react";
import { SectionHeader } from "./primitives";
import { GlowCard, Carousel } from "./Motion";

export function Hypotheses() {
  return (
    <div>
      <SectionHeader
        eyebrow="FOUR HYPOTHESES"
        glyph="scale"
        title="Each bet names the number that would kill it."
        titleClassName="md:whitespace-nowrap"
        lede={
          <>
            Written before the pilot, with the analysis pre-registered.
            <br />
            A hypothesis without a stop rule is a wish.
          </>
        }
      />
      <div className="grid gap-3 md:grid-cols-2">
        {HYPOTHESES.map((h, i) => {
          const dark = i === HYPOTHESES.length - 1;
          return (
            <GlowCard key={h.id} className={`flex h-full flex-col rounded-2xl p-5 ${dark ? "bg-black text-white" : "border border-line bg-white"}`}>
              <div className="flex items-center justify-between gap-2">
                <span className={`rounded-full px-2.5 py-0.5 text-[10.5px] font-extrabold tracking-[1.2px] ${dark ? "bg-white text-black" : "bg-black text-white"}`}>{h.id}</span>
                <a href="#prototype-demo" className={`text-[11px] font-bold ${dark ? "text-[#8FB0FF]" : "text-brand"}`}>
                  Screen {h.screen} →
                </a>
              </div>
              <p className="m-0 mt-2.5 text-[14.5px] font-extrabold leading-[1.35] tracking-[-0.2px]">{h.claim}</p>
              <dl className={`m-0 mt-3 grid grid-cols-[58px_1fr] items-baseline gap-x-3 gap-y-1.5 text-[12px] leading-[1.45] ${dark ? "text-[#C9C9C9]" : "text-ink-soft"}`}>
                {[
                  ["Metric", h.metric],
                  ["Sample", h.sample],
                  ["When", h.when],
                ].map(([k, v]) => (
                  <Fragment key={k}>
                    <dt className={`text-[9.5px] font-extrabold tracking-[1.2px] ${dark ? "text-[#8f8f8f]" : "text-ink-faint"}`}>{k.toUpperCase()}</dt>
                    <dd className="m-0">{v}</dd>
                  </Fragment>
                ))}
              </dl>
              <div className="mt-auto pt-3.5">
                <p className={`m-0 rounded-lg border-l-[3px] px-3 py-2 text-[12px] leading-[1.5] ${dark ? "border-[#FF8FA3] bg-white/10 text-[#FFD9DF]" : "border-[#E5484D] bg-[#FFF5F5] text-[#7A1F2B]"}`}>
                  <span className="font-extrabold">STOP RULE · </span>
                  {h.stop}
                </p>
              </div>
            </GlowCard>
          );
        })}
      </div>
    </div>
  );
}

export function ResearchPlan() {
  const total = RESEARCH_PLAN.slice(0, 5).reduce((n, r) => n + Number(r.count), 0);
  return (
    <div className="mt-10 sm:mt-16">
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

/* The price ladder as five slim rows: price, a rising bar, one line on what
   that price would tell me. The prototype's price is the dark row. */
const LADDER_W = ["14%", "30%", "48%", "68%", "88%"];
const LADDER_ROLE = ["FLOOR TEST", "STEP 1", "IN THE PROTOTYPE", "STEP 3", "CEILING TEST"];

export function PriceLadder() {
  return (
    <div className="mt-14 sm:mt-24">
      <SectionHeader
        eyebrow="WHAT IS A COMMITTED DRIVER WORTH"
        glyph="coins"
        size="h3"
        title="A price ladder, then a split between minutes and rupees."
        lede="Five prices in order, so the answer is a curve. Stage 3 splits the premium: minutes or rupees."
      />
      <div className="flex flex-col gap-1 rounded-2xl border border-line bg-white p-2 sm:p-3">
        <style>{`@keyframes ladderW { from { transform: scaleX(0); } to { transform: scaleX(1); } }`}</style>
        {WTP_LADDER.map((w, i) => {
          const lit = w.price === "₹20";
          return (
            <div
              key={w.price}
              className={`grid grid-cols-[44px_minmax(56px,110px)_1fr] items-center gap-x-3 gap-y-1 rounded-xl px-3 py-2.5 sm:grid-cols-[52px_150px_1fr_auto] sm:gap-x-4 ${
                lit ? "bg-black text-white" : ""
              }`}
            >
              <span className="text-[14.5px] font-extrabold tracking-[-0.3px]">{w.price}</span>
              <span className={`h-2 overflow-hidden rounded-full ${lit ? "bg-white/15" : "bg-mist"}`} aria-hidden="true">
                <span
                  className={`block h-full rounded-full ${lit ? "bg-brand" : "bg-[#C7D9FB]"}`}
                  style={{ width: LADDER_W[i], transformOrigin: "left", animation: `ladderW .8s ${i * 0.08}s cubic-bezier(.16,1,.3,1) both` }}
                />
              </span>
              <span className={`col-span-3 text-[12.5px] leading-[1.5] sm:col-span-1 ${lit ? "text-[#C9C9C9]" : "text-ink-soft"}`}>{w.read}</span>
              <span className={`hidden whitespace-nowrap text-[9.5px] font-extrabold tracking-[1px] sm:inline ${lit ? "text-[#8FB0FF]" : "text-ink-faint"}`}>
                {LADDER_ROLE[i]}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function AssumptionMap() {
  return (
    <div className="mt-10 sm:mt-16">
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
