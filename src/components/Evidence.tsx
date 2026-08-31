"use client";

import Image from "next/image";
import { Reveal } from "./ui";

/* ─────────────────────────── The evidence wall ───────────────────────────
   Real news reports, captured from the public web, each linking to the
   original article. The problem statement and the why / what / how
   objectives sit right below them, as the user reads the proof first. */

const ARTICLES: {
  img: string;
  pub: string;
  date: string;
  headline: string;
  take: string;
  url: string;
}[] = [
  {
    img: "/news/toi.jpg",
    pub: "The Times of India",
    date: "Dec 2014",
    headline: "Hyderabad women using cabs have scary tales to tell",
    take:
      "After the Delhi cab case, women across Hyderabad described drunk drivers, lonely breakdowns and cabs with no GPS. Several said they call friends before every night ride.",
    url: "https://timesofindia.indiatimes.com/city/hyderabad/hyderabad-women-using-cabs-have-scary-tales-to-tell/articleshow/45422606.cms",
  },
  {
    img: "/news/mint.jpg",
    pub: "Mint",
    date: "Oct 2024",
    headline: "Delhi woman faces rape threat during late night Uber ride",
    take:
      "A 24 year old was threatened by her driver on a 10:30 PM ride home. Her one shield that night was a live location link shared with her mother.",
    url: "https://www.livemint.com/news/trends/uber-horror-delhi-woman-faces-rape-threat-during-late-night-travel-driver-says-do-you-think-your-mother-could-11729925441139.html",
  },
  {
    img: "/news/etv.jpg",
    pub: "ETV Bharat",
    date: "Jun 2026",
    headline: "Delhi horror puts spotlight back on women's safety in cabs",
    take:
      "A decade of SOS buttons and GPS later, a new case again exposed driver verification gaps. Experts still tell women to share ride details on every single trip.",
    url: "https://www.etvbharat.com/en/bharat/delhi-horror-puts-spotlight-back-on-womens-safety-in-cabs-heres-how-to-stay-safe-while-travelling-alone-enn26062702793",
  },
];

function ArticleCard({ a, delay }: { a: (typeof ARTICLES)[number]; delay: number }) {
  return (
    <Reveal delay={delay} className="h-full">
      <a
        href={a.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-[0_2px_10px_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_34px_rgba(0,0,0,0.12)]"
      >
        <div className="relative h-[235px] shrink-0 overflow-hidden border-b border-line bg-mist">
          <Image
            src={a.img}
            alt={`${a.pub} article: ${a.headline}`}
            fill
            sizes="(max-width: 640px) 100vw, 380px"
            className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-white/90 to-transparent" />
          <div className="absolute left-3 top-3 rounded-full bg-black/85 px-3 py-1.5 text-[10.5px] font-bold tracking-[0.6px] text-white backdrop-blur">
            AS REPORTED · {a.date.toUpperCase()}
          </div>
        </div>
        <div className="flex grow flex-col p-5">
          <div className="text-[11px] font-bold tracking-[1.2px] text-ink-faint">
            {a.pub.toUpperCase()}
          </div>
          <div className="mt-1.5 text-[16.5px] font-extrabold leading-snug tracking-[-0.3px]">
            {a.headline}
          </div>
          <p className="mb-4 mt-2 text-[13.5px] leading-[1.55] text-ink-soft">{a.take}</p>
          <span className="mt-auto inline-flex items-center gap-1.5 text-[13px] font-bold text-brand">
            Read the full article
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            >
              <path
                d="M7 17L17 7M9 7h8v8"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>
      </a>
    </Reveal>
  );
}

const OBJECTIVES: { label: string; title: string; text: string; icon: React.ReactNode }[] = [
  {
    label: "WHY",
    title: "Why we are building it",
    text:
      "The fear is measurable and the headlines have not stopped in twelve years. When riders feel unsafe after dark they ride less, and the night market shrinks with them. Solving the fear grows trust and rides at the same time.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
        <path d="M12 8v5M12 16.5v.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: "WHAT",
    title: "What we are building",
    text:
      "A planning layer inside the booking flow. Before the car is assigned it reviews the ride plan, suggests safer drop points, matches audited drivers, alerts a trusted circle and checks that the rider reached.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <path d="M9 12l2 2 4-4.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: "HOW",
    title: "How we will do it",
    text:
      "Deterministic rules on audited signals, no black box. Clear consent before anything is shared. Seven steps that finish in under two minutes, piloted in Hyderabad between 8 PM and 5 AM.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M4 6h16M4 12h10M4 18h13" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
        <circle cx="18.5" cy="12" r="2" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    ),
  },
];

const DIFFERENT: string[] = [
  "Every safety tool the app ships today stays exactly where it is. SafeRide arms them before pickup, so the rider never has to remember them mid ride.",
  "Today's tools respond once something already feels wrong. SafeRide works earlier and lowers the chance that moment arrives at all.",
  "The rider stays in charge the whole way. Every share, every match and every anchor is her explicit choice.",
];

export default function Evidence() {
  return (
    <div className="mt-14 sm:mt-24">
      <div className="mb-2.5 text-xs font-bold tracking-[1.6px] text-ink-faint">THE EVIDENCE</div>
      <h2 className="m-0 mb-3 max-w-[760px] text-[clamp(28px,3.6vw,44px)] font-extrabold leading-[1.08] tracking-[-1.3px]">
        The same headline,
        <br />
        twelve years apart.
      </h2>
      <p className="mb-8 max-w-[620px] text-base leading-[1.65] text-ink-soft [text-wrap:pretty]">
        We did not invent this problem. It keeps returning to the front page, from 2014 to
        this year. Each card below is a real report from the public web. Tap any card to read
        the original article.
      </p>

      {/* News cards: deck up on mobile, three across on larger screens */}
      <div className="grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(min(100%,290px),1fr))]">
        {ARTICLES.map((a, i) => (
          <div key={a.pub} className="sticky sm:static" style={{ top: 64 + i * 8, zIndex: i + 1 }}>
            <ArticleCard a={a} delay={i * 0.08} />
          </div>
        ))}
      </div>

      {/* The problem statement, stated plainly */}
      <Reveal className="mt-10 sm:mt-14">
        <div className="beam">
          <div className="rounded-2xl bg-black p-7 text-white sm:p-10">
            <div className="text-[11px] font-bold tracking-[1.8px] text-[#8f8f8f]">
              THE PROBLEM STATEMENT
            </div>
            <p className="m-0 mt-3 max-w-[880px] text-[clamp(19px,2.4vw,27px)] font-bold leading-[1.4] tracking-[-0.4px]">
              Between 8 PM and 5 AM, a woman booking a cab in India runs her own safety
              protocol. She checks the plate, shares her location, calls home and stays on the
              phone until her door closes. The tools her apps offer are real, but almost all of
              them wake up after the car starts moving. Nothing in the booking flow plans the
              ride with her.
            </p>
          </div>
        </div>
      </Reveal>

      {/* Why, what, how */}
      <div className="mt-5 grid gap-3.5 [grid-template-columns:repeat(auto-fit,minmax(min(100%,260px),1fr))]">
        {OBJECTIVES.map((o, i) => (
          <div key={o.label} className="sticky sm:static" style={{ top: 72 + i * 8, zIndex: i + 1 }}>
            <Reveal delay={i * 0.08} className="h-full">
              <div className="flex h-full flex-col rounded-2xl border border-line bg-mist p-6">
                <div className="flex items-center gap-2.5 text-brand">
                  {o.icon}
                  <span className="text-[11px] font-bold tracking-[1.8px]">{o.label}</span>
                </div>
                <div className="mt-3 text-[17px] font-extrabold tracking-[-0.3px]">{o.title}</div>
                <p className="m-0 mt-2 text-[13.5px] leading-[1.6] text-ink-soft">{o.text}</p>
              </div>
            </Reveal>
          </div>
        ))}
      </div>

      {/* How this is different from what already exists */}
      <Reveal className="mt-5">
        <div className="rounded-2xl border border-line bg-white p-6 sm:p-8">
          <div className="text-[11px] font-bold tracking-[1.8px] text-ink-faint">
            HOW THIS IS DIFFERENT FROM TODAY&apos;S SAFETY FEATURES
          </div>
          <ul className="m-0 mt-4 grid list-none gap-4 p-0 sm:grid-cols-3">
            {DIFFERENT.map((d, i) => (
              <li key={i} className="flex gap-3 text-[13.5px] leading-[1.6] text-ink-soft">
                <span className="mt-0.5 flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full bg-brand text-[11px] font-extrabold text-white">
                  {i + 1}
                </span>
                {d}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </div>
  );
}
