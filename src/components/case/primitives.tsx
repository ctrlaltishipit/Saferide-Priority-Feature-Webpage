import type { ReactNode } from "react";
import { Reveal } from "../ui";
import { chapterById, LENSES, LENS_STATE, sourceByUrl, type Gate, type LensRead } from "@/content/case";

/* SourceSnippet: a research source shown as something you can see, with a
   screenshot of the page, the publication and the headline. The whole card
   opens the source. Falls back to a plain link when no snippet image exists. */
export function SourceSnippet({
  url,
  compact = false,
  dark = false,
  className = "",
}: {
  url: string;
  compact?: boolean;
  dark?: boolean;
  className?: string;
}) {
  const s = sourceByUrl(url);
  if (!s) {
    return (
      <a href={url} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-1 text-[11.5px] font-bold text-brand ${className}`}>
        Source <span aria-hidden="true">→</span>
      </a>
    );
  }
  return (
    <a
      href={s.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`group block overflow-hidden rounded-xl border transition-all duration-300 hover:-translate-y-0.5 hover:border-brand hover:shadow-[0_10px_26px_rgba(0,0,0,.08)] ${
        dark ? "border-white/15 bg-white/5" : "border-line bg-white"
      } ${className}`}
    >
      <span className={`block overflow-hidden ${compact ? "aspect-[21/9]" : "aspect-[16/9]"}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={s.img} alt={`Screenshot of the source: ${s.headline}`} loading="lazy" className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]" />
      </span>
      <span className="block p-2.5">
        <span className={`flex items-center gap-2 text-[10.5px] font-bold tracking-[0.6px] ${dark ? "text-[#A6A6A6]" : "text-ink-faint"}`}>
          {s.name}
          <span className="ml-auto text-brand transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true">→</span>
        </span>
        {!compact && <span className={`mt-1 block text-[12px] font-semibold leading-[1.4] ${dark ? "text-white" : "text-ink"}`}>{s.headline}</span>}
      </span>
    </a>
  );
}

/* ─────────────────────── Case-study primitives ───────────────────────
   Shared building blocks for the chapter structure: the width container,
   the chapter wrapper with its kicker, the section header that used to be
   copy-pasted per section, the three number tags, and the verdict card that
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
        <span className="text-[13px] font-semibold text-ink-faint">The question: {meta.question}</span>
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

/* Small line glyphs that sit beside a section eyebrow. Stroke-only, 24-unit
   grid, currentColor, so they inherit the eyebrow colour on light and dark. */
export type GlyphName =
  | "room" | "people" | "list" | "window" | "bridge" | "lines" | "scale" | "grid" | "cross"
  | "shield" | "star" | "coins" | "levers" | "canvas" | "path" | "team" | "road" | "hand"
  | "ripple" | "timer" | "compass" | "wrench" | "clock" | "car" | "share" | "pin" | "check";

const GLYPHS: Record<GlyphName, ReactNode> = {
  room: <><rect x="3" y="7" width="18" height="10" rx="2" /><path d="M7 17v3M17 17v3M3 12h18" /></>,
  people: <><circle cx="9" cy="8" r="3" /><circle cx="17" cy="9" r="2.4" /><path d="M3 20c.6-3.6 2.8-5.5 6-5.5s5.4 1.9 6 5.5M15 19.5c.5-1.7 1.6-2.7 3-2.7 1.7 0 2.7 1.1 3 3" /></>,
  list: <><path d="M8 6h13M8 12h13M8 18h13" /><circle cx="4" cy="6" r="1.2" /><circle cx="4" cy="12" r="1.2" /><circle cx="4" cy="18" r="1.2" /></>,
  window: <><rect x="4" y="4" width="16" height="16" rx="2" /><path d="M4 10h16M12 4v16" /></>,
  bridge: <><path d="M3 15h18M6 15V9M18 15V9M6 9c4-4 8-4 12 0" /><path d="M10 15v-3M14 15v-3" /></>,
  lines: <><path d="M4 6h16M4 12h10M4 18h16" /><path d="M17 12h3" /></>,
  scale: <><path d="M12 4v16M6 20h12M12 7l-5 8h10l-5-8z" /></>,
  grid: <><rect x="4" y="4" width="6" height="6" rx="1.5" /><rect x="14" y="4" width="6" height="6" rx="1.5" /><rect x="4" y="14" width="6" height="6" rx="1.5" /><rect x="14" y="14" width="6" height="6" rx="1.5" /></>,
  cross: <><circle cx="12" cy="12" r="8.5" /><path d="M9 9l6 6M15 9l-6 6" /></>,
  shield: <><path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3z" /><path d="M9 12l2 2 4-4.5" /></>,
  star: <><path d="M12 3.5l2.6 5.4 5.9.8-4.3 4.1 1.1 5.9L12 16.9l-5.3 2.8 1.1-5.9-4.3-4.1 5.9-.8L12 3.5z" /></>,
  coins: <><ellipse cx="12" cy="7" rx="7" ry="3" /><path d="M5 7v5c0 1.7 3.1 3 7 3s7-1.3 7-3V7M5 12v5c0 1.7 3.1 3 7 3s7-1.3 7-3v-5" /></>,
  levers: <><path d="M5 19V9M12 19V5M19 19v-8" /><circle cx="5" cy="9" r="1.6" /><circle cx="12" cy="5" r="1.6" /><circle cx="19" cy="11" r="1.6" /><path d="M3 19h18" /></>,
  canvas: <><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M9 4v16M15 4v10M3 14h18" /></>,
  path: <><circle cx="5" cy="18" r="2" /><circle cx="12" cy="8" r="2" /><circle cx="19" cy="16" r="2" /><path d="M6.5 16.5l4-6.5M13.5 9.5l4 5" /></>,
  team: <><circle cx="7" cy="9" r="2.5" /><circle cx="17" cy="9" r="2.5" /><circle cx="12" cy="6" r="2.5" /><path d="M2.5 19c.5-3 2.3-4.8 4.5-4.8s4 1.8 4.5 4.8M12.5 19c.5-3 2.3-4.8 4.5-4.8s4 1.8 4.5 4.8" /></>,
  road: <><path d="M8 21L10 3M16 21L14 3M12 5v3M12 11v3M12 17v3" /></>,
  hand: <><path d="M6 12V6.5a1.5 1.5 0 013 0V11M9 10V4.5a1.5 1.5 0 013 0V11M12 10V5.5a1.5 1.5 0 013 0V12M15 11.5V8a1.5 1.5 0 013 0v6c0 4-2.5 6.5-6 6.5-3 0-4.6-1.3-6-3.8L4 14.5a1.5 1.5 0 012.5-1.6L8 15" /></>,
  ripple: <><circle cx="12" cy="12" r="2" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="10" /></>,
  timer: <><circle cx="12" cy="13" r="8" /><path d="M12 9v4l3 2M9 3h6" /></>,
  compass: <><circle cx="12" cy="12" r="9" /><path d="M15.5 8.5l-2 5-5 2 2-5 5-2z" /></>,
  wrench: <><path d="M14.5 6.5a4 4 0 015.2 5.2L9 22l-3-3L16.7 8.3" /><path d="M14.5 6.5L18 3l3 3-3.5 3.5" /></>,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3.5 2" /></>,
  car: <><path d="M4 16v-4l2-5h12l2 5v4M4 16h16M6 16v2M18 16v2" /><circle cx="8" cy="16" r="1.5" /><circle cx="16" cy="16" r="1.5" /></>,
  share: <><circle cx="6" cy="12" r="2.5" /><circle cx="18" cy="6" r="2.5" /><circle cx="18" cy="18" r="2.5" /><path d="M8.2 10.8l7.6-3.6M8.2 13.2l7.6 3.6" /></>,
  pin: <><path d="M12 21s-6.5-5.4-6.5-10.2A6.5 6.5 0 0112 4.5a6.5 6.5 0 016.5 6.3C18.5 15.6 12 21 12 21z" /><circle cx="12" cy="10.8" r="2.2" /></>,
  check: <><circle cx="12" cy="12" r="9" /><path d="M8 12.5l2.5 2.5 5.5-6" /></>,
};

export function Glyph({ name, size = 16, className = "" }: { name: GlyphName; size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`shrink-0 ${className}`}
      aria-hidden="true"
    >
      {GLYPHS[name]}
    </svg>
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
  glyph,
}: {
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
  dark?: boolean;
  size?: "h2" | "h3";
  className?: string;
  titleClassName?: string;
  glyph?: GlyphName;
}) {
  const eyebrowCls = `mb-2.5 flex items-center gap-2 text-xs font-bold tracking-[1.6px] ${dark ? "text-[#A6A6A6]" : "text-ink-faint"}`;
  const ledeCls = dark ? "text-[#A6A6A6]" : "text-ink-soft";
  return (
    <div className={className}>
      <div className={eyebrowCls}>
        {glyph && (
          <span className={`flex h-7 w-7 items-center justify-center rounded-full ${dark ? "bg-white/10 text-white" : "bg-mist text-brand"}`}>
            <Glyph name={glyph} size={15} />
          </span>
        )}
        {eyebrow}
      </div>
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

/* The verdict card closes a chapter: what we know, what we assume, what
   would settle it, the four lenses in plain words, and one verdict line. */
export function GateCard({ gate }: { gate: Gate }) {
  return (
    <Reveal className="mt-14 sm:mt-24">
      <div id={gate.id} className="beam scroll-mt-[50px]">
        <div className="rounded-2xl bg-black p-7 text-white sm:p-10">
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <div className="text-[11px] font-bold tracking-[1.8px] text-[#8f8f8f]">
              WHERE {gate.name.toUpperCase()} STANDS
            </div>
            <div className="text-[11px] font-semibold text-[#8f8f8f]">What we know, what we assume, what would settle it</div>
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
                  <span>{k.text}</span>
                </li>
              ))}
              {gate.know.some((k) => k.url) && (
                <li className="mt-1 grid grid-cols-2 gap-2 pt-1">
                  {gate.know
                    .filter((k) => k.url)
                    .map((k) => (
                      <SourceSnippet key={k.url} url={k.url!} compact dark />
                    ))}
                </li>
              )}
            </GateColumn>
            <GateColumn label="WHAT WE ASSUME" dot={LENS_STATE.open.color}>
              {gate.assume.map((a) => (
                <li key={a} className="flex items-start gap-2">
                  <span className="mt-[9px] h-1.5 w-1.5 flex-none rounded-full bg-caution" aria-hidden="true" />
                  {a}
                </li>
              ))}
            </GateColumn>
            <GateColumn label="WHAT WOULD SETTLE IT" dot={LENS_STATE.design.color}>
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
