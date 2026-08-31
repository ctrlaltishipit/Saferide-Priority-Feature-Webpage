import { Logo } from "./ui";

export default function Footer() {
  return (
    <footer className="border-t border-[#2A2A2A] bg-black text-white">
      <div className="mx-auto flex max-w-[1240px] flex-col gap-2.5 px-5 py-9">
        <div className="flex items-center gap-[9px]">
          <Logo size={20} />
          <span className="text-sm font-extrabold">
            SafeRide Priority · Uber feature concept
          </span>
        </div>
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
