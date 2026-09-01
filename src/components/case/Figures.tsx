/* ─────────────────── Responsive SVG figures for chapters 3 and 4 ───────────────────
   Every figure is a viewBox SVG that scales with its container (w-full,
   h-auto), so the same drawing works at 320px and 1240px. Motion is stroke
   dash flow and a one-shot grow, both switched off by the global
   prefers-reduced-motion rule. No hooks, so these render on the server. */

const F = "Helvetica,Arial";
const flow = { animation: "dashflow 1.4s linear infinite" } as const;

/* The north star with the eight inputs that feed it. */
export function NorthStarTree({ labels }: { labels: string[] }) {
  const n = labels.length;
  const xs = labels.map((_, i) => 50 + (i * 620) / Math.max(1, n - 1));
  return (
    <svg viewBox="0 0 720 236" className="block h-auto w-full" role="img" aria-label="Eight pilot targets feed one north star">
      <defs>
        <radialGradient id="nsGlow" cx=".5" cy=".5" r=".5">
          <stop offset="0" stopColor="#8FB0FF" stopOpacity=".55" />
          <stop offset="1" stopColor="#8FB0FF" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="360" cy="44" r="44" fill="url(#nsGlow)" />
      {xs.map((x, i) => (
        <path key={i} d={`M${x} 172 C ${x} 120, 360 110, 360 62`} fill="none" stroke="#2A3F6B" strokeWidth="1.6" />
      ))}
      {xs.map((x, i) => (
        <path key={`f${i}`} d={`M${x} 172 C ${x} 120, 360 110, 360 62`} fill="none" stroke="#8FB0FF" strokeWidth="1.6" strokeDasharray="5 9" style={flow} />
      ))}
      <path d="M360 22l6.4 13.2 14.6 2-10.6 10.2 2.6 14.6L360 55l-13 7 2.6-14.6-10.6-10.2 14.6-2z" fill="#FFF3C4" />
      <text x="360" y="86" textAnchor="middle" fontSize="12" fontWeight="800" letterSpacing="1.5" fill="#8FB0FF" fontFamily={F}>
        NORTH STAR
      </text>
      {xs.map((x, i) => (
        <g key={`n${i}`}>
          <circle cx={x} cy="172" r="7" fill="#276EF1" />
          <text x={x} y="200" textAnchor="middle" fontSize="12" fontWeight="700" fill="#D6DCE4" fontFamily={F}>
            {labels[i].split(" ")[0]}
          </text>
          <text x={x} y="216" textAnchor="middle" fontSize="12" fontWeight="700" fill="#D6DCE4" fontFamily={F}>
            {labels[i].split(" ").slice(1).join(" ")}
          </text>
        </g>
      ))}
    </svg>
  );
}

/* The working of the money model as three shrinking bars. */
export function FunnelBars({ rows }: { rows: { label: string; range: string; share: number }[] }) {
  return (
    <svg viewBox="0 0 720 176" className="block h-auto w-full" role="img" aria-label="From all night trips in Hyderabad to the priority matches chosen">
      <style>{`@keyframes barGrow { from { transform: scaleX(0); } to { transform: scaleX(1); } }`}</style>
      {rows.map((r, i) => {
        const y = 16 + i * 52;
        const w = Math.max(40, 700 * r.share);
        return (
          <g key={r.label}>
            <rect x="10" y={y} width="700" height="30" rx="8" fill="#F6F6F6" />
            <rect
              x="10"
              y={y}
              width={w}
              height="30"
              rx="8"
              fill={i === 2 ? "#276EF1" : i === 1 ? "#8FB0FF" : "#C7D9FB"}
              style={{ transformOrigin: "10px 0", transformBox: "view-box", animation: `barGrow .9s ${i * 0.15}s cubic-bezier(.16,1,.3,1) both` }}
            />
            <text x={w > 260 ? 22 : w + 22} y={y + 20} fontSize="13" fontWeight="800" fill="#111" fontFamily={F}>
              {r.label}
            </text>
            <text x="698" y={y + 20} textAnchor="end" fontSize="13" fontWeight="800" fill="#111" fontFamily={F}>
              {r.range}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

/* Five pilot stages on one line, with the flow running forward. */
export function StageTimeline({ names }: { names: string[] }) {
  const xs = names.map((_, i) => 50 + (i * 620) / Math.max(1, names.length - 1));
  return (
    <svg viewBox="0 0 720 96" className="block h-auto w-full" role="img" aria-label="The five pilot stages in order">
      <path d="M50 36 H670" stroke="#E2E2E2" strokeWidth="3" />
      <path d="M50 36 H670" stroke="#276EF1" strokeWidth="3" strokeDasharray="8 10" style={flow} />
      {xs.map((x, i) => (
        <g key={i}>
          <circle cx={x} cy="36" r="17" fill={i === 0 ? "#000" : i === 4 ? "#fff" : "#276EF1"} stroke={i === 4 ? "#276EF1" : "none"} strokeWidth="2.5" />
          <text x={x} y="41" textAnchor="middle" fontSize="13" fontWeight="800" fill={i === 4 ? "#276EF1" : "#fff"} fontFamily={F}>
            {i}
          </text>
          <text x={x} y="80" textAnchor="middle" fontSize="12.5" fontWeight="700" fill="#545454" fontFamily={F}>
            {names[i]}
          </text>
        </g>
      ))}
    </svg>
  );
}

/* A road with three horizon markers. */
export function RoadFigure({ labels }: { labels: string[] }) {
  return (
    <svg viewBox="0 0 720 150" className="block h-auto w-full" role="img" aria-label="The road in three horizons: now, next, later">
      <path d="M40 130 L200 20 L520 20 L680 130 Z" fill="#111" />
      <path d="M360 128 L360 22" stroke="#F6BC2F" strokeWidth="3" strokeDasharray="14 14" style={{ animation: "dashflow 1.2s linear infinite" }} />
      {labels.map((l, i) => {
        const x = [140, 360, 580][i];
        const y = [96, 60, 96][i];
        return (
          <g key={l}>
            <rect x={x - 58} y={y - 18} width="116" height="34" rx="17" fill={i === 0 ? "#276EF1" : "#fff"} stroke={i === 0 ? "none" : "#E2E2E2"} />
            <text x={x} y={y + 5} textAnchor="middle" fontSize="14" fontWeight="800" fill={i === 0 ? "#fff" : "#111"} fontFamily={F}>
              {l}
            </text>
          </g>
        );
      })}
      <circle cx="360" cy="22" r="5" fill="#FFF3C4" />
    </svg>
  );
}

/* Ripples spreading out from one rider. */
export function RippleFigure({ rings }: { rings: string[] }) {
  return (
    <svg viewBox="0 0 360 360" className="mx-auto block h-auto w-full max-w-[360px]" role="img" aria-label="One rider at the centre, and the people the change reaches">
      <style>{`@keyframes ripplePulse { 0% { transform: scale(.94); opacity: .9; } 100% { transform: scale(1.06); opacity: .35; } }`}</style>
      {[150, 112, 74].map((r, i) => (
        <circle
          key={r}
          cx="180"
          cy="180"
          r={r}
          fill="none"
          stroke="#276EF1"
          strokeOpacity={0.35 + i * 0.2}
          strokeWidth="2"
          style={{ transformOrigin: "180px 180px", transformBox: "view-box", animation: `ripplePulse 2.8s ${i * 0.4}s ease-in-out infinite alternate` }}
        />
      ))}
      <circle cx="180" cy="180" r="34" fill="#000" />
      <circle cx="180" cy="168" r="10" fill="#fff" />
      <path d="M160 200c3-11 10-16 20-16s17 5 20 16" fill="#fff" />
      {rings.map((label, i) => {
        const a = (-90 + i * (360 / rings.length)) * (Math.PI / 180);
        const r = [150, 112, 74][i % 3] + 20;
        const x = 180 + r * Math.cos(a);
        const y = 180 + r * Math.sin(a);
        return (
          <text key={label} x={x} y={y + 4} textAnchor="middle" fontSize="12.5" fontWeight="700" fill="#545454" fontFamily={F}>
            {label}
          </text>
        );
      })}
    </svg>
  );
}
