"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Reveal } from "./ui";
import { Carousel } from "./case/Motion";

/* ─────────────────────────── The evidence wall ───────────────────────────
   Real news reports captured from the public web, real app store reviews,
   and viral rider posts the press picked up. The reader who skips the long
   copy still gets the whole problem from this wall. The problem statement
   and the why / what / how objectives close the section. */

type Article = {
  img: string;
  pub: string;
  date: string;
  headline: string;
  take: string;
  url: string;
};

/* Half one: fear. */
const ARTICLES: Article[] = [
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
      "A 24 year old was threatened by her driver on a 10:30 PM ride home. She told the story on Reddit, and the comments filled with women sharing their own. Her one shield that night was a live location link shared with her mother.",
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

/* Half two: the ride that never comes. */
const RELIABILITY: Article[] = [
  {
    img: "/news/bs.jpg",
    pub: "Business Standard",
    date: "Aug 2026",
    headline: "76% of app taxi users back penalties for driver cancellations",
    take:
      "In LocalCircles surveys, 82% of users say drivers cancel on them, and 74% say the cancel comes after the driver hears the destination. Maharashtra now fines the cancel. Nothing yet promises the ride.",
    url: "https://www.business-standard.com/india-news/app-taxi-users-back-maharashtra-style-penalty-for-driver-cancellations-126080300462_1.html",
  },
  {
    img: "/news/asianet.jpg",
    pub: "Asianet Newsable",
    date: "Aug 2026",
    headline: "Ola, Uber, Rapido failed her: one hour, no ride",
    take:
      "A Bengaluru woman cycled between all three apps for an hour with no ride confirmed, and called it a humiliation ritual on X. The post went viral because half the city has lived that morning.",
    url: "https://newsable.asianetnews.com/karnataka-news/ola-uber-rapido-failed-her-bengaluru-woman-spends-1-hour-trying-to-get-a-ride-post-goes-viral-articleshow-9i3qiav",
  },
  {
    img: "/news/outlook.jpg",
    pub: "Outlook India",
    date: "Dec 2024",
    headline: "Woman ran for her life after her cab stopped on a deserted road",
    take:
      "Her driver stopped on a lonely Gurugram stretch at night and the app's SOS button failed at the moment she needed it. She shared the ordeal on LinkedIn so other riders would know.",
    url: "https://www.outlookindia.com/national/woman-ran-for-her-life-in-gurugram-after-5-men-in-deserted-road-stopped-ola-cab-driver-sos-button-failed",
  },
];

function ArticleCard({ a, delay }: { a: Article; delay: number }) {
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

/* ─────────────────── Rider reviews, shown as the real thing ───────────────────
   Actual screenshots of public reviews, captured from the app stores and the
   review pages, cropped to the review itself. Nothing inside the frame is
   edited. These pages give a review no link of its own, so the screenshot
   carries the proof. Grouped by app; a long screenshot shows cut with a fade
   and opens in full on tap. */

type AppKey = "uber" | "ola" | "rapido" | "indrive" | "manayatri";

type Shot = {
  img: string;
  app: AppKey;
  store: string;
  alt: string;
  tall?: boolean;
};

const APP_TABS: { key: AppKey; label: string }[] = [
  { key: "uber", label: "Uber" },
  { key: "ola", label: "Ola" },
  { key: "rapido", label: "Rapido" },
  { key: "indrive", label: "inDrive" },
  { key: "manayatri", label: "Mana Yatri" },
];

const APP_CHIP: Record<AppKey, string> = {
  uber: "Uber",
  ola: "Ola",
  rapido: "Rapido",
  indrive: "inDrive",
  manayatri: "Mana Yatri",
};

const SHOTS: Shot[] = [
  /* Uber: the nine App Store reviews gathered for this case study, plus two from Google Play */
  { img: "/reviews/uber-as-1.jpg", app: "uber", store: "App Store", tall: true, alt: "Uber App Store review titled Wrong pick up locations and rude drivers: the driver refused the exact pickup point, cut the call and cancelled the ride" },
  { img: "/reviews/uber-as-7.jpg", app: "uber", store: "App Store", alt: "Uber App Store review titled Safety concerns with drunk and rude drivers: three bookings in two weeks and a drunk, rude driver every time" },
  { img: "/reviews/uber-as-3.jpg", app: "uber", store: "App Store", tall: true, alt: "Uber App Store review titled Uber is unsafe and drivers are abusive towards women: the driver argued, abused and threatened the rider, and support sent only bot replies" },
  { img: "/reviews/uber-as-8.jpg", app: "uber", store: "App Store", alt: "Uber App Store review from Hyderabad titled Unsafety hyd: a female rider says the ride did not feel safe for women" },
  { img: "/reviews/uber-as-4.jpg", app: "uber", store: "App Store", tall: true, alt: "Uber App Store review titled Not safe, worst cab drivers: elderly parents were removed from the cab in the middle of the road" },
  { img: "/reviews/uber-as-9.jpg", app: "uber", store: "App Store", alt: "Uber App Store review titled sabse bekar service not safe for women: drivers skip the set location and demand extra charges" },
  { img: "/reviews/uber-as-5.jpg", app: "uber", store: "App Store", tall: true, alt: "Uber App Store review titled Rude and unprofessional driver hiring: the driver abused the rider and left her on a running road" },
  { img: "/reviews/uber-play-2.jpg", app: "uber", store: "Google Play", alt: "Uber Google Play review: almost every booking finds no driver, and accepted rides cancel at the last moment" },
  { img: "/reviews/uber-as-2.jpg", app: "uber", store: "App Store", tall: true, alt: "Uber App Store review titled Driver was very rude and drove harshly: the driver refused to come to the rider and drove rashly" },
  { img: "/reviews/uber-play-1.jpg", app: "uber", store: "Google Play", alt: "Uber Google Play review calling the booking experience a nightmare" },
  { img: "/reviews/uber-as-6.jpg", app: "uber", store: "App Store", tall: true, alt: "Uber App Store review titled Uber Experience: the driver shouted, abused and held the rider until an extra fare was paid" },
  /* Ola */
  { img: "/reviews/ola-tp-1.jpg", app: "ola", store: "Trustpilot", tall: true, alt: "Ola Trustpilot review: a woman alone at night watched the pickup time grow while no cab ever arrived" },
  { img: "/reviews/ola-play-1.jpg", app: "ola", store: "Google Play", alt: "Ola Google Play review: four cab bookings cancelled one after another" },
  { img: "/reviews/ola-tp-2.jpg", app: "ola", store: "Trustpilot", alt: "Ola Trustpilot review: pathetic services and no security for women passengers" },
  { img: "/reviews/ola-tp-3.jpg", app: "ola", store: "Trustpilot", alt: "Ola Trustpilot review by Kavya Vemuri: rides kept cancelling and she waited four long hours" },
  { img: "/reviews/ola-as-1.jpg", app: "ola", store: "App Store", alt: "Ola App Store review titled Safety concern and poor customer care management" },
  /* Rapido */
  { img: "/reviews/rapido-as-1.jpg", app: "rapido", store: "App Store", alt: "Rapido App Store review asking for a priority request feature for critical times" },
  { img: "/reviews/rapido-play-1.jpg", app: "rapido", store: "Google Play", alt: "Rapido Google Play review: locations change midway, prices jump and drivers feel unsafe" },
  { img: "/reviews/rapido-as-2.jpg", app: "rapido", store: "App Store", alt: "Rapido App Store review titled Abusive driver: a scary situation for the rider and her mom" },
  { img: "/reviews/rapido-play-2.jpg", app: "rapido", store: "Google Play", alt: "Rapido Google Play review: the ride cancelled itself after ten minutes of waiting" },
  /* inDrive */
  { img: "/reviews/indrive-tp-1.jpg", app: "indrive", store: "Trustpilot", alt: "inDrive Trustpilot review from India: the driver tried to touch the rider and she called 100" },
  { img: "/reviews/indrive-play-1.jpg", app: "indrive", store: "Google Play", alt: "inDrive Google Play review: the driver cancelled fifteen minutes after accepting and support deleted the complaint" },
  { img: "/reviews/indrive-tp-2.jpg", app: "indrive", store: "Trustpilot", tall: true, alt: "inDrive Trustpilot review from India calling the platform unreliable and unsafe" },
  { img: "/reviews/indrive-as-1.jpg", app: "indrive", store: "App Store", alt: "inDrive App Store review: a woman alone at midnight got a rude, arrogant driver from the airport" },
  { img: "/reviews/indrive-as-2.jpg", app: "indrive", store: "App Store", alt: "inDrive App Store review titled Threat to women passengers" },
  /* Mana Yatri */
  { img: "/reviews/manayatri-play-1.jpg", app: "manayatri", store: "Google Play", alt: "Mana Yatri Google Play review: repeat cancellations nearly cost an early morning flight from Hyderabad" },
  { img: "/reviews/manayatri-play-3.jpg", app: "manayatri", store: "Google Play", alt: "Mana Yatri Google Play review: a drunk driver misbehaved, and the company wrote back an apology" },
  { img: "/reviews/manayatri-play-4.jpg", app: "manayatri", store: "Google Play", alt: "Mana Yatri Google Play review: the auto booked twice and cancelled when the driver was near the pickup" },
  { img: "/reviews/manayatri-play-2.jpg", app: "manayatri", store: "Google Play", alt: "Mana Yatri Google Play review: no driver accepts the ride, never usable in an urgency" },
];

function ShotCard({ s, delay, onOpen }: { s: Shot; delay: number; onOpen: (s: Shot) => void }) {
  return (
    <Reveal delay={delay} className="h-full">
      <button
        type="button"
        onClick={() => onOpen(s)}
        className="group flex h-full w-full cursor-zoom-in flex-col rounded-2xl border border-line bg-white p-2 text-left shadow-[0_2px_10px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-brand hover:shadow-[0_14px_34px_rgba(0,0,0,.08)]"
        aria-label={`Open the full screenshot. ${s.alt}`}
      >
        {/* every card gets the same image box, so rows align top and bottom */}
        <span className="relative block h-[300px] overflow-hidden rounded-xl bg-white">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={s.img} alt={s.alt} loading="lazy" className="block w-full" />
          <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white to-transparent" />
        </span>
        <span className="mt-2 flex items-center justify-between px-1 pb-1">
          <span className="rounded-full bg-mist px-2.5 py-1 text-[10px] font-bold tracking-[0.3px] text-ink-faint">
            {APP_CHIP[s.app]} · {s.store}
          </span>
          <span className="text-[11px] font-bold text-brand opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
            Read in full
          </span>
        </span>
      </button>
    </Reveal>
  );
}

function AppReviews() {
  const [app, setApp] = useState<AppKey>("uber");
  const [open, setOpen] = useState<Shot | null>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const [all, setAll] = useState(false);
  const shots = SHOTS.filter((s) => s.app === app);
  const visible = all ? shots : shots.slice(0, 8);
  return (
    <div>
      <div className="mb-5 flex flex-wrap gap-2">
        {APP_TABS.map((t) => {
          const n = SHOTS.filter((s) => s.app === t.key).length;
          const active = app === t.key;
          return (
            <button
              key={t.key}
              type="button"
              onClick={() => {
                setApp(t.key);
                setAll(false);
              }}
              aria-pressed={active}
              className={`rounded-full border px-4 py-2 text-[13px] font-bold transition-colors ${
                active
                  ? "border-black bg-black text-white"
                  : "border-line bg-white text-ink-soft hover:border-black/40"
              }`}
            >
              {t.label} <span className={active ? "text-white/60" : "text-ink-faint"}>{n}</span>
            </button>
          );
        })}
      </div>
      <Carousel key={`${app}-${all}`} minWidth={280} ariaLabel="Rider reviews">
        {visible.map((s, i) => (
          <ShotCard key={s.img} s={s} delay={Math.min(i * 0.05, 0.25)} onOpen={setOpen} />
        ))}
      </Carousel>
      {shots.length > 8 && (
        <div className="mt-4 text-center">
          <button
            type="button"
            onClick={() => setAll((v) => !v)}
            className="rounded-full border border-line bg-white px-4 py-2 text-[13px] font-bold text-ink transition-colors hover:border-black"
          >
            {all ? "Show fewer" : `Show all ${shots.length} reviews`}
          </button>
        </div>
      )}
      {open && (
        <div
          className="fixed inset-0 z-[95] overflow-y-auto bg-black/75 p-4 backdrop-blur-sm sm:p-10"
          role="dialog"
          aria-modal="true"
          aria-label={open.alt}
          onClick={() => setOpen(null)}
        >
          <div className="mx-auto w-full max-w-[640px]" onClick={(e) => e.stopPropagation()}>
            <div className="mb-3 flex items-center justify-between gap-3">
              <span className="rounded-full bg-white/15 px-3 py-1.5 text-[11px] font-bold tracking-[0.4px] text-white">
                {APP_CHIP[open.app]} · {open.store}, as posted
              </span>
              <button
                type="button"
                onClick={() => setOpen(null)}
                aria-label="Close the screenshot"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-black"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
                  <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={open.img} alt={open.alt} className="block w-full rounded-2xl bg-white" />
          </div>
        </div>
      )}
    </div>
  );
}

/* ───────────── Problem statement, objectives, difference ───────────── */

const OBJECTIVES: { label: string; title: string; text: string; icon: React.ReactNode }[] = [
  {
    label: "WHY",
    title: "Why I am building it",
    text:
      "The fear is measurable and the headlines have not stopped in twelve years. On top of it, 82% of app taxi users say drivers cancel on them, and nights make it worse. When riders cannot trust the ride to come, they stop riding, and the night market shrinks with them.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
        <path d="M12 8v5M12 16.5v.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: "WHAT",
    title: "What I am building",
    text:
      "A planning layer inside the booking flow. Before pickup it reviews the ride plan, suggests safer drop points, matches an audited driver who has already committed to your trip, alerts a trusted circle and checks that you reached. One toggle covers the fear and the no-show.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <path d="M9 12l2 2 4-4.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: "HOW",
    title: "How I will do it",
    text:
      "Deterministic rules on audited signals, and clear consent before anything is shared. One tap says why you ride, and the reason sets the queue: hospital runs and emergencies go first, at any hour of the day. Seven steps, under two minutes, piloted in Hyderabad.",
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
  "A SafeRide match is a committed pickup. The driver accepts your trip before you see the match, cannot drop it for a ride on another app, and if anything changes you are rematched first in line.",
  "It is an add-on for the moments that matter most: a late shift, an emergency, a hospital run, a night you simply need the ride to come. One tap says why you ride, and emergency, medical and urgent trips can switch it on at any hour, day or night. The rider stays in charge, and every share, match and anchor is her explicit choice.",
];

/* The concept on one page: why, what, how, and how it differs from what
   ships today. Rendered in chapter 2, where the solution starts. */
export function ConceptOnePage() {
  return (
    <div className="mt-10 sm:mt-16">
      <div className="mb-2.5 text-xs font-bold tracking-[1.6px] text-ink-faint">THE CONCEPT ON ONE PAGE</div>
      <h2 className="m-0 mb-3 max-w-[760px] text-[clamp(26px,3vw,38px)] font-extrabold leading-[1.08] tracking-[-1.1px]">
        A decision layer that runs
        <br />
        before the booking.
      </h2>
      <p className="mb-8 max-w-[640px] text-base leading-[1.65] text-ink-soft [text-wrap:pretty]">
        The SOS button and every tool Uber ships today stay exactly where they are. SafeRide
        Priority sits in front of them: one toggle at booking that plans the trip, commits the
        driver, tells the right people, and closes the loop when you arrive.
      </p>

      {/* Why, what, how */}
      <div className="grid gap-3.5 [grid-template-columns:repeat(auto-fit,minmax(min(100%,260px),1fr))]">
        {OBJECTIVES.map((o, i) => (
          <div key={o.label} className="sticky sm:static" style={{ top: 64 + i * 8, zIndex: i + 1 }}>
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
          <ul className="m-0 mt-4 grid list-none gap-4 p-0 sm:grid-cols-2">
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

export default function Evidence() {
  return (
    <div className="mt-10 sm:mt-16">
      <div className="mb-2.5 text-xs font-bold tracking-[1.6px] text-ink-faint">THE PROOF</div>
      <h2 className="m-0 mb-3 max-w-[760px] text-[clamp(26px,3vw,38px)] font-extrabold leading-[1.08] tracking-[-1.1px]">
        The same headline,
        <br />
        twelve years apart.
      </h2>
      <p className="mb-8 max-w-[640px] text-base leading-[1.65] text-ink-soft [text-wrap:pretty]">
        I did not invent this problem. It lives in the papers, in app store reviews, and in
        viral posts on Reddit, X and LinkedIn that the press keeps picking up. If you read
        nothing else, read this wall: every card is real, and every article opens the original
        report.
      </p>

      {/* Half one: fear. Cards deck up on mobile, three across on larger screens */}
      <Carousel minWidth={290} ariaLabel="News reports">
        {ARTICLES.map((a, i) => (
          <ArticleCard key={a.pub} a={a} delay={i * 0.08} />
        ))}
      </Carousel>

      {/* Half two: the ride that never comes */}
      <div className="mt-8 sm:mt-12">
        <h3 className="m-0 mb-2 text-[clamp(22px,2.6vw,32px)] font-extrabold leading-[1.12] tracking-[-0.8px]">
          The other half of the problem:
          <br />
          the ride that never comes.
        </h3>
        <p className="mb-6 max-w-[660px] text-[14.5px] leading-[1.6] text-ink-soft [text-wrap:pretty]">
          Fear is only half of the night. The other half is a cab that cancels when the driver
          hears the destination, an hour of searching while surge climbs, or a trip dropped in
          the middle of the road. SafeRide Priority is built for both halves: it plans the safety
          and it commits the driver.
        </p>
        <Carousel minWidth={290} ariaLabel="News reports">
        {RELIABILITY.map((a, i) => (
          <ArticleCard key={a.pub} a={a} delay={i * 0.08} />
        ))}
      </Carousel>
      </div>

      {/* Straight from the app stores */}
      <div className="mt-8 sm:mt-12">
        <h3 className="m-0 mb-2 text-[clamp(22px,2.6vw,32px)] font-extrabold leading-[1.12] tracking-[-0.8px]">
          Riders are already saying it, in public.
        </h3>
        <p className="mb-6 max-w-[660px] text-[14.5px] leading-[1.6] text-ink-soft [text-wrap:pretty]">
          These are screenshots of real reviews from public review pages, captured as they
          were posted and cropped to the review itself. Review pages give each review no
          link of its own, so the screenshots carry the proof. Pick an app and read what
          its riders keep running into at night: refused pickups, cancelled rides, and
          moments that did not feel safe. Tap any card to read it in full.
        </p>
        <AppReviews />
      </div>

      {/* The problem statement, stated plainly */}
      <Reveal className="mt-8 sm:mt-12">
        <div className="beam">
          <div className="rounded-2xl bg-black p-7 text-white sm:p-10">
            <div className="text-[11px] font-bold tracking-[1.8px] text-[#8f8f8f]">
              THE PROBLEM STATEMENT
            </div>
            <p className="m-0 mt-3 max-w-[900px] text-[clamp(18px,2.3vw,26px)] font-bold leading-[1.42] tracking-[-0.4px]">
              Between 8 PM and 5 AM, booking a cab in India is two problems in one. The first is
              fear: a woman runs her own safety protocol, checks the plate, shares her location
              and stays on the phone until her door closes. The second is the ride itself:
              drivers cancel when they hear the destination, nobody accepts the night booking,
              and some trips end in the middle of the road. The tools the apps offer are real,
              but they wake up after the car starts moving, and none of them promise the car
              will come at all.
            </p>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
