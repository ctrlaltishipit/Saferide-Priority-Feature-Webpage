/* ─────────────── The person, the method, the iterations, the lessons ───────────────
   Blocks for the eight-chapter story that are about how the case was made:
   who built it (one person), how the research was done and where it stops,
   which design decisions changed while building, and what the work taught.
   Server components; the only motion comes from the shared Motion helpers. */

import { FOUNDER, JOURNEY, METHODS, ITERATIONS, LESSONS, LINKEDIN_URL, PILOT_APP_URL } from "@/content/case";
import { SectionHeader, Glyph } from "./primitives";
import { GlowCard, Carousel } from "./Motion";

/* One link, used wherever the reader might want to talk back. */
export function LinkedInLink({ dark = false, label = "Write to me on LinkedIn →" }: { dark?: boolean; label?: string }) {
  return (
    <a
      href={LINKEDIN_URL}
      target="_blank"
      rel="noreferrer"
      className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-[13px] font-bold transition-all hover:-translate-y-px ${
        dark ? "bg-white text-black hover:bg-brand hover:text-white" : "bg-black text-white hover:bg-brand"
      }`}
    >
      <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.2 8h4.6v14H.2V8zm7.4 0h4.4v1.9h.1c.6-1.1 2.1-2.3 4.3-2.3 4.6 0 5.5 3 5.5 7V22h-4.6v-6.5c0-1.6 0-3.6-2.2-3.6s-2.5 1.7-2.5 3.5V22H7.6V8z"
          fill="currentColor"
        />
      </svg>
      {label}
    </a>
  );
}

/* Chapter 2: who is behind this, and the road to here. */
export function TheBrain() {
  return (
    <div>
      <SectionHeader
        eyebrow="THE BRAIN BEHIND THIS"
        glyph="people"
        size="h3"
        title="One person. Every seat."
        lede="No company, no team, no budget. This is what one person can take from a noticed habit to a working prototype, and where that stops."
      />
      <div className="grid items-start gap-4 [grid-template-columns:repeat(auto-fit,minmax(min(100%,320px),1fr))]">
        {/* the founder */}
        <GlowCard className="flex flex-col rounded-3xl bg-black p-5 text-white sm:p-6">
          <div className="flex items-center gap-3.5">
            <span className="flex h-12 w-12 flex-none items-center justify-center rounded-full bg-brand text-[16px] font-extrabold tracking-[-0.5px]" aria-hidden="true">
              DS
            </span>
            <div>
              <div className="text-[18px] font-extrabold tracking-[-0.4px]">{FOUNDER.name}</div>
              <div className="text-[12px] font-semibold text-[#8FB0FF]">{FOUNDER.role}</div>
            </div>
          </div>
          <p className="m-0 mt-3.5 text-[13.5px] leading-[1.55] text-white">{FOUNDER.intro}</p>
          <ul className="m-0 mt-3.5 flex list-none flex-col gap-2.5 border-t border-white/10 p-0 pt-3.5">
            {FOUNDER.lines.map((l) => (
              <li key={l} className="flex gap-3 text-[13px] leading-[1.55] text-[#C9CFD8]">
                <span className="mt-[8px] h-1.5 w-1.5 flex-none rounded-full bg-brand" aria-hidden="true" />
                {l}
              </li>
            ))}
          </ul>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <LinkedInLink dark />
            <p className="m-0 text-[12px] leading-[1.5] text-[#A6A6A6]">Criticism, inputs and advice are all welcome.</p>
          </div>
        </GlowCard>

        {/* the road to here */}
        <div className="rounded-3xl border border-line bg-white p-6 sm:p-8">
          <div className="mb-4 text-[11px] font-bold tracking-[1.8px] text-ink-faint">HOW I ARRIVED HERE</div>
          <ol className="relative m-0 flex list-none flex-col gap-0 p-0">
            {JOURNEY.map((j, i) => {
              const last = i === JOURNEY.length - 1;
              return (
                <li key={j.step} className="relative flex gap-4 pb-5 last:pb-0">
                  {!last && <span className="absolute left-[13px] top-7 bottom-0 w-px border-l-2 border-dashed border-[#C7D9FB]" aria-hidden="true" />}
                  <span
                    className={`relative z-[1] flex h-7 w-7 flex-none items-center justify-center rounded-full text-[12px] font-extrabold ${
                      last ? "bg-brand text-white" : "bg-black text-white"
                    }`}
                  >
                    {i + 1}
                  </span>
                  <div className="min-w-0 pt-0.5">
                    <div className="text-[15px] font-extrabold tracking-[-0.2px]">{j.step}</div>
                    <p className="m-0 mt-1 text-[13.5px] leading-[1.55] text-ink-soft">{j.text}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </div>
  );
}

/* Chapter 3: the research methods, each with the limit it carries. */
export function Methods() {
  return (
    <div>
      <SectionHeader
        eyebrow="HOW I RESEARCHED IT"
        glyph="list"
        size="h3"
        title="Six methods, and the limit of each."
        lede="Every finding in this chapter comes from one of these. The last card is the gap, said out loud."
      />
      <Carousel minWidth={250} ariaLabel="Research methods">
        {METHODS.map((m, i) => {
          const gap = i === METHODS.length - 1;
          return (
            <GlowCard key={m.name} className={`flex h-full flex-col rounded-2xl border p-5 ${gap ? "border-[#F0DCC8] bg-[#FFF7EC]" : "border-line bg-white"}`}>
              <div className="flex items-center gap-2.5">
                <span className={`flex h-8 w-8 flex-none items-center justify-center rounded-full ${gap ? "bg-[#FFE3B8] text-[#7A4B00]" : "bg-mist text-brand"}`}>
                  <Glyph name={m.glyph} />
                </span>
                <span className="text-[14.5px] font-extrabold tracking-[-0.2px]">{m.name}</span>
                <span className={`ml-auto whitespace-nowrap rounded-full px-2 py-0.5 text-[10.5px] font-bold ${gap ? "bg-[#7A4B00] text-white" : "bg-black text-white"}`}>{m.count}</span>
              </div>
              <p className="m-0 mt-3 text-[13px] leading-[1.55] text-ink-soft">{m.what}</p>
              <p className="m-0 mt-auto pt-3 text-[12.5px] leading-[1.5] text-ink-faint">
                <span className="font-bold text-ink">Limit: </span>
                {m.limit}
              </p>
            </GlowCard>
          );
        })}
      </Carousel>
    </div>
  );
}

/* Chapter 4: the decisions that changed between the first draft and the prototype. */
export function Iterations() {
  return (
    <div className="mt-10 sm:mt-16">
      <SectionHeader
        eyebrow="WHAT CHANGED WHILE BUILDING"
        glyph="wrench"
        title="Six decisions that did not survive the first draft."
        lede="The first version of each was wrong in a way the evidence exposed. Before, after, and why. Each one is live in the prototype."
      />
      <div className="flex flex-col gap-2.5">
        {ITERATIONS.map((it, i) => (
          <GlowCard
            key={it.from}
            className="grid items-center gap-x-5 gap-y-2 rounded-2xl border border-line bg-white p-4 sm:grid-cols-[1fr_auto_1.1fr_1.3fr] sm:p-5"
          >
            <div>
              <div className="text-[10.5px] font-bold tracking-[1.4px] text-ink-faint">FIRST DRAFT</div>
              <div className="mt-1 text-[14px] font-semibold leading-[1.4] text-ink-faint line-through decoration-[#D8DCE0] decoration-2">{it.from}</div>
            </div>
            <svg width="34" height="18" viewBox="0 0 34 18" className="hidden flex-none text-brand sm:block" aria-hidden="true">
              <path d="M1 9h28m-7-7l7 7-7 7" stroke="currentColor" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div>
              <div className="text-[10.5px] font-bold tracking-[1.4px] text-brand">WHAT SHIPPED · {i + 1} OF {ITERATIONS.length}</div>
              <div className="mt-1 text-[15px] font-extrabold leading-[1.35] tracking-[-0.2px]">{it.to}</div>
            </div>
            <div className="border-line pt-2 sm:border-l sm:pl-5 sm:pt-0">
              <div className="text-[10.5px] font-bold tracking-[1.4px] text-ink-faint">WHY</div>
              <p className="m-0 mt-1 text-[13px] leading-[1.55] text-ink-soft">{it.why}</p>
              {it.screen !== undefined && (
                <a href="#prototype-demo" className="mt-2 inline-block text-[12px] font-bold text-brand">
                  See it on screen {it.screen} →
                </a>
              )}
            </div>
          </GlowCard>
        ))}
      </div>
    </div>
  );
}

/* Chapter 6: what the work taught. */
export function Lessons() {
  return (
    <div className="mt-10 sm:mt-16">
      <SectionHeader eyebrow="WHAT I LEARNED" glyph="star" size="h3" title="Four lessons from building it alone." />
      <div className="grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(min(100%,260px),1fr))]">
        {LESSONS.map((l, i) => (
          <GlowCard key={l.title} className={`flex h-full flex-col rounded-2xl p-5 ${i === LESSONS.length - 1 ? "bg-black text-white" : "border border-line bg-white"}`}>
            <span className={`flex h-7 w-7 items-center justify-center rounded-full text-[12px] font-extrabold ${i === LESSONS.length - 1 ? "bg-brand text-white" : "bg-black text-white"}`}>
              {i + 1}
            </span>
            <div className="mt-3 text-[15.5px] font-extrabold leading-[1.3] tracking-[-0.3px]">{l.title}</div>
            <p className={`m-0 mt-2 text-[13.5px] leading-[1.6] ${i === LESSONS.length - 1 ? "text-[#C9C9C9]" : "text-ink-soft"}`}>{l.text}</p>
          </GlowCard>
        ))}
      </div>
    </div>
  );
}

/* Chapter 7: the open door. */
export function TalkToMe() {
  return (
    <div className="mt-10 sm:mt-16">
      <GlowCard className="flex flex-col gap-5 rounded-3xl bg-black p-7 text-white sm:flex-row sm:items-center sm:justify-between sm:p-10">
        <div className="max-w-[640px]">
          <div className="text-[11px] font-bold tracking-[1.8px] text-[#8FB0FF]">TELL ME WHERE THIS IS WRONG</div>
          <h3 className="m-0 mt-2 text-[clamp(22px,2.6vw,32px)] font-extrabold leading-[1.12] tracking-[-0.8px]">
            One person wrote every line of this. It needs other eyes.
          </h3>
          <p className="m-0 mt-3 text-[14px] leading-[1.6] text-[#C9C9C9]">
            A number that looks off, a risk I missed, a better way to run the pilot, or a reason it should never ship. Criticism, inputs and advice are all welcome, and I read every message.
          </p>
        </div>
        <div className="flex-none">
          <LinkedInLink dark label="Connect with me on LinkedIn →" />
        </div>
      </GlowCard>
    </div>
  );
}


/* Chapter 5 opener: the guided prototype and the hands-on pilot app are two
   doors into the same product. This card says which door is which, and that
   neither of them is the eight-week pilot. */
export function TwoWays() {
  return (
    <div>
      <div className="grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(min(100%,300px),1fr))]">
        {/* door one: guided */}
        <GlowCard className="flex h-full flex-col rounded-3xl border border-line bg-white p-6 sm:p-7">
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-mist px-2.5 py-1 text-[10.5px] font-extrabold tracking-[1.2px] text-brand">THE PROTOTYPE</span>
            <span className="text-[11px] font-bold tracking-[0.8px] text-ink-faint">GUIDED · ON THIS PAGE</span>
          </div>
          <h3 className="m-0 mt-3 text-[clamp(20px,2.3vw,28px)] font-extrabold leading-[1.12] tracking-[-0.7px]">Watch it think.</h3>
          <ul className="m-0 mt-3 flex list-none flex-col gap-2 p-0 text-[13.5px] leading-[1.55] text-ink-soft">
            {[
              "The tour plays all eight screens in thirty seconds, choosing an anchor, a match and a circle for you.",
              "A step list sits beside the phone: tap any step to jump straight to its screen.",
              "Every screen carries a note on what it adds and why it exists. This is the version that explains itself.",
            ].map((l) => (
              <li key={l} className="flex items-start gap-2">
                <span className="mt-[8px] h-1.5 w-1.5 flex-none rounded-full bg-brand" aria-hidden="true" />
                {l}
              </li>
            ))}
          </ul>
          <div className="mt-auto pt-4">
            <a href="#prototype-demo" className="inline-flex items-center gap-2 rounded-full bg-black px-4 py-2 text-[13px] font-bold text-white transition-colors hover:bg-brand">
              Start the walkthrough ↓
            </a>
          </div>
        </GlowCard>

        {/* door two: hands-on */}
        <GlowCard className="flex h-full flex-col rounded-3xl bg-black p-6 text-white sm:p-7">
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-brand px-2.5 py-1 text-[10.5px] font-extrabold tracking-[1.2px] text-white">THE PILOT APP</span>
            <span className="text-[11px] font-bold tracking-[0.8px] text-[#8f8f8f]">HANDS-ON · OPENS SEPARATELY</span>
          </div>
          <h3 className="m-0 mt-3 text-[clamp(20px,2.3vw,28px)] font-extrabold leading-[1.12] tracking-[-0.7px]">Drive it yourself.</h3>
          <ul className="m-0 mt-3 flex list-none flex-col gap-2 p-0 text-[13.5px] leading-[1.55] text-[#C9C9C9]">
            {[
              "The same eight screens with the notes taken off. No tour, no script: you flip the toggle, say why you ride, pick the anchor, save the circle, book.",
              "Opens full screen in its own tab. On a phone it opens like a real app, which is the best way to feel it.",
              "Everything is still simulated. Nothing real is booked, tracked or messaged.",
            ].map((l) => (
              <li key={l} className="flex items-start gap-2">
                <span className="mt-[8px] h-1.5 w-1.5 flex-none rounded-full bg-brand" aria-hidden="true" />
                {l}
              </li>
            ))}
          </ul>
          <div className="mt-auto pt-4">
            <a
              href={PILOT_APP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-[13px] font-bold text-black transition-all hover:bg-brand hover:text-white"
            >
              Open the pilot app →
            </a>
          </div>
        </GlowCard>
      </div>
      <p className="mx-auto mt-4 max-w-[760px] text-center text-[13px] leading-[1.6] text-ink-faint">
        One product, two doors. And neither door is the pilot itself: the pilot is the eight-week Hyderabad test designed in
        chapter 6, and it has not run. The pilot app is what a rider in that pilot would open.
      </p>
    </div>
  );
}
