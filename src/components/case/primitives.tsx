import type { ReactNode } from "react";
import { Reveal } from "../ui";
import { chapterById, LENSES, LENS_STATE, type Gate, type LensRead } from "@/content/case";

/* ─────────────────────── Case-study primitives ───────────────────────
   Shared building blocks for the chapter structure: the width container,
   the chapter wrapper with its kicker, the section header that used to be
   copy-pasted per section, the three number tags, and the gate card that
   closes every chapter. No hooks here, so all of it renders on the server. */

export function Container({
  id,
  className = "",
  children,
}: {
  id?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div id={id} className={`mx-auto max-w-[1240px] px-5 ${id ? "scroll-mt-[50px]" : ""} ${className}`}>
      {children}
    </div>
  );
}

/* Chapter: a section with an id the nav can target, padding on top so the
   kicker never lands under the sticky header, and the kicker row itself. */
export function Chapter({
  id,
  contained = true,
  className = "",
  children,
}: {
  id: string;
  contained?: boolean;
  className?: string;
  children: ReactNode;
}) {
  const meta = chapterById(id);
  const kicker = meta && (
    <Container>
      <div className="mb-3 flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <span className="text-xs font-bold tracking-[1.6px] text-brand">
          {meta.kicker} · {meta.label.toUpperCase()}
        </span>
        <span className="text-[13px] font-semibold text-ink-faint">Gate question: {meta.question}</span>
      </div>
      <h2 className="m-0 mb-8 max-w-[820px] text-[clamp(30px,4vw,50px)] font-extrabold leading-[1.05] tracking-[-1.5px] [text-wrap:balance] sm:mb-10">
        {meta.title}
      </h2>
    </Container>
  );
  return (
    <section id={id} className={`scroll-mt-[50px] pt-14 sm:pt-24 ${className}`}>
      {kicker}
      {contained ? <Container>{children}</Container> : children}
    </section>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  lede,
  dark = false,
  size = "h2",
  className = "",
  titleClassName = "",
}: {
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
  dark?: boolean;
  size?: "h2" | "h3";
  className?: string;
  titleClassName?: string;
}) {
  const eyebrowCls = `mb-2.5 text-xs font-bold tracking-[1.6px] ${dark ? "text-[#A6A6A6]" : "text-ink-faint"}`;
  const ledeCls = dark ? "text-[#A6A6A6]" : "text-ink-soft";
  return (
    <div className={className}>
      <div className={eyebrowCls}>{eyebrow}</div>
      {size === "h2" ? (
        <h2
          className={`m-0 ${lede ? "mb-3" : "mb-[34px]"} max-w-[760px] text-[clamp(28px,3.6vw,44px)] font-extrabold leading-[1.08] tracking-[-1.3px] ${titleClassName}`}
        >
          {title}
        </h2>
      ) : (
        <h3
          className={`m-0 mb-2 text-[clamp(22px,2.6vw,32px)] font-extrabold leading-[1.12] tracking-[-0.8px] ${titleClassName}`}
        >
          {title}
        </h3>
      )}
      {lede &&
        (size === "h2" ? (
          <p className={`mb-8 max-w-[640px] text-base leading-[1.65] [text-wrap:pretty] ${ledeCls}`}>{lede}</p>
        ) : (
          <p className={`mb-6 max-w-[660px] text-[14.5px] leading-[1.6] [text-wrap:pretty] ${ledeCls}`}>{lede}</p>
        ))}
    </div>
  );
}

/* The three kinds of number on this site, always labelled. */
export type TagKind = "sourced" | "assumption" | "hypothesis";
const TAG: Record<TagKind, { label: string; cls: string }> = {
  sourced: { label: "SOURCED", cls: "bg-[#E8F0FE] text-[#1D4FB8]" },
  assumption: { label: "ASSUMPTION", cls: "bg-[#FFF3D6] text-[#7A4E00]" },
  hypothesis: { label: "PILOT HYPOTHESIS", cls: "bg-black text-white" },
};

export function Tag({ kind, className = "" }: { kind: TagKind; className?: string }) {
  const t = TAG[kind];
  return (
    <span
      className={`inline-block whitespace-nowrap rounded-full px-2 py-0.5 text-[9.5px] font-extrabold tracking-[1px] ${t.cls} ${className}`}
    >
      {t.label}
    </span>
  );
}

export function LensPill({ read, dark = true }: { read: LensRead; dark?: boolean }) {
  const lens = LENSES[read.key];
  const state = LENS_STATE[read.state];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[11.5px] font-bold ${
        dark ? "border-white/20 text-white" : "border-line bg-white text-ink"
      }`}
      title={`${lens.label}: ${lens.plain}. ${state.label}: ${state.note}.`}
    >
      <span className="h-2 w-2 rounded-full" style={{ background: state.color }} aria-hidden="true" />
      {lens.label}
      <span className={dark ? "font-semibold text-white/55" : "font-semibold text-ink-faint"}>· {state.label}</span>
    </span>
  );
}

function GateColumn({
  label,
  dot,
  children,
}: {
  label: string;
  dot: string;
  children: ReactNode;
}) {
  return (
    <div className="rounded-xl border border-white/10 p-4">
      <div className="flex items-center gap-2 text-[11px] font-bold tracking-[1.8px] text-[#8f8f8f]">
        <span className="h-2 w-2 rounded-full" style={{ background: dot }} aria-hidden="true" />
        {label}
      </div>
      <ul className="m-0 mt-3 flex list-none flex-col gap-2.5 p-0 text-[13.5px] leading-[1.6] text-[#D6DCE4]">
        {children}
      </ul>
    </div>
  );
}

/* The gate card closes a chapter: what we know, what we assume, what
   would clear the gate, the four lenses in plain words, and one verdict. */
export function GateCard({ gate }: { gate: Gate }) {
  return (
    <Reveal className="mt-14 sm:mt-24">
      <div id={gate.id} className="beam scroll-mt-[50px]">
        <div className="rounded-2xl bg-black p-7 text-white sm:p-10">
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <div className="text-[11px] font-bold tracking-[1.8px] text-[#8f8f8f]">
              GATE {gate.n} · {gate.name.toUpperCase()}
            </div>
            <div className="text-[11px] font-semibold text-[#8f8f8f]">A checkpoint, read in plain words</div>
          </div>
          <div className="mt-2 max-w-[820px] text-[clamp(22px,2.6vw,32px)] font-extrabold leading-[1.12] tracking-[-0.8px]">
            {gate.question}
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {gate.lenses.map((l) => (
              <LensPill key={l.key} read={l} />
            ))}
          </div>
          <div className="mt-6 grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(min(100%,240px),1fr))]">
            <GateColumn label="WHAT WE KNOW" dot={LENS_STATE.evidence.color}>
              {gate.know.map((k) => (
                <li key={k.text} className="flex items-start gap-2">
                  <span className="mt-[9px] h-1.5 w-1.5 flex-none rounded-full bg-safe" aria-hidden="true" />
                  <span>
                    {k.text}
                    {k.url && (
                      <>
                        {" "}
                        <a
                          href={k.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="whitespace-nowrap text-[11.5px] font-bold text-[#8FB0FF] hover:text-white"
                        >
                          Source ↗
                        </a>
                      </>
                    )}
                  </span>
                </li>
              ))}
            </GateColumn>
            <GateColumn label="WHAT WE ASSUME" dot={LENS_STATE.open.color}>
              {gate.assume.map((a) => (
                <li key={a} className="flex items-start gap-2">
                  <span className="mt-[9px] h-1.5 w-1.5 flex-none rounded-full bg-caution" aria-hidden="true" />
                  {a}
                </li>
              ))}
            </GateColumn>
            <GateColumn label="WHAT WOULD CLEAR THIS GATE" dot={LENS_STATE.design.color}>
              {gate.clears.map((c) => (
                <li key={c} className="flex items-start gap-2">
                  <span className="mt-[9px] h-1.5 w-1.5 flex-none rounded-full bg-[#8FB0FF]" aria-hidden="true" />
                  {c}
                </li>
              ))}
            </GateColumn>
          </div>
          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-5">
            <div className="text-[11px] font-bold tracking-[1.8px] text-[#8f8f8f]">VERDICT</div>
            <div className="text-[14.5px] font-extrabold tracking-[-0.2px] sm:text-right">{gate.verdict}</div>
          </div>
          {gate.footnote && <div className="mt-2 text-[12px] text-[#8f8f8f]">{gate.footnote}</div>}
        </div>
      </div>
    </Reveal>
  );
}
