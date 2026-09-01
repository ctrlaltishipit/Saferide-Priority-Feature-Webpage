import { Logo } from "./ui";
import { CHAPTERS, LINKEDIN_URL } from "@/content/case";

export default function Footer() {
  return (
    <footer className="border-t border-[#2A2A2A] bg-black text-white">
      <div className="mx-auto flex max-w-[1240px] flex-col gap-4 px-5 py-9">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-[9px]">
            <Logo size={20} />
            <span className="text-sm font-extrabold">SafeRide Priority · Uber feature concept</span>
          </div>
          {/* the chapter index, so the end of the page can send you back to any part of the case */}
          {/* phones: a two-column list; from sm up: one dotted row */}
          <nav aria-label="Chapter index" className="grid w-full grid-cols-2 gap-y-2 text-[13px] font-semibold sm:flex sm:w-auto sm:flex-wrap sm:items-center sm:gap-y-1.5">
            {CHAPTERS.filter((c) => c.status === "live" && c.n).map((c, i) => (
              <span key={c.id} className="flex items-center">
                {i > 0 && (
                  <span aria-hidden="true" className="mx-3 hidden text-[#5A5A5A] sm:inline">
                    ·
                  </span>
                )}
                <a href={`#${c.id}`} className="text-[#C9C9C9] transition-colors hover:text-white">
                  {c.label}
                </a>
              </span>
            ))}
          </nav>
        </div>
        <p className="m-0 max-w-[720px] text-[13px] leading-[1.6] text-[#C9C9C9]">
          Researched, designed and built by Dixita Sreerala, working alone. Criticism, inputs and advice are welcome:{" "}
          <a href={LINKEDIN_URL} target="_blank" rel="noreferrer" className="font-bold text-white underline decoration-brand decoration-2 underline-offset-2 hover:text-brand">
            write to me on LinkedIn →
          </a>
        </p>
        <p className="m-0 max-w-[720px] text-[12.5px] leading-[1.6] text-[#A6A6A6]">
          Independent portfolio concept. Not affiliated with, endorsed by, or sponsored by Uber. All
          data and interactions are simulated. This guidance is based on available prototype context.
          It is not a safety guarantee. Trust your judgment and use emergency support when needed.
        </p>
        <p className="m-0 text-xs text-[#757575]">
          A product design case study on women&apos;s safety in ride hailing: late night cab safety,
          live trip sharing with trusted contacts, safe pickup points and driver verification.
          Hyderabad pilot concept
        </p>
      </div>
    </footer>
  );
}
