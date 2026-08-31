"use client";

import Image from "next/image";
import { Reveal } from "./ui";

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

/* ───────────────────── App store review cards ─────────────────────
   Rebuilt as clean cards from real public reviews: the rider's name,
   rating, date and words as posted. No source links by design. */

type Review = {
  name: string;
  initial: string;
  avatarBg: string;
  stars: number;
  starColor: string;
  date: string;
  chip: string;
  text: string;
  helpful?: string;
};

const REVIEWS: Review[] = [
  {
    name: "Durga Sethu",
    initial: "D",
    avatarBg: "#C2185B",
    stars: 1,
    starColor: "#0E8345",
    date: "18 Aug 2026",
    chip: "Uber · Google Play",
    text:
      "Not at all useful... especially when trying to book in evening or night.. even after increasing price also no one is accepting, taking too long.. I waited for 1 hour to get an auto.. for 8 km it showed 250+ and suddenly 350.. even cab also didn't get booked.",
  },
  {
    name: "Karan Kashyap",
    initial: "K",
    avatarBg: "#8E24AA",
    stars: 1,
    starColor: "#0E8345",
    date: "21 Aug 2026",
    chip: "Uber · Google Play",
    text:
      "Even during medical emergencies when I urgently needed to reach the hospital, the app kept showing that a ride would be assigned shortly, but it kept searching and causing severe delays. And even when a driver is assigned, they refuse to arrive and ask me to cancel the trip.",
    helpful: "1 person found this review helpful",
  },
  {
    name: "Nikhil Sir NTCC",
    initial: "N",
    avatarBg: "#558B2F",
    stars: 1,
    starColor: "#0E8345",
    date: "30 Aug 2026",
    chip: "Uber · Google Play",
    text:
      "One of the Uber drivers left my wife and me in the middle of the ride, on the road, because he received another ride request from a different application. This was very inconvenient and unsafe, especially because my wife was with me.",
  },
  {
    name: "Sxima Khan",
    initial: "S",
    avatarBg: "#263238",
    stars: 2,
    starColor: "#0E8345",
    date: "29 Aug 2026",
    chip: "Uber · Google Play",
    text:
      "I asked to pick me up on the exact location but he refused and said I should walk to the ride, and when I complained about it he just cancelled my ride. It's not the first time this happened, they all do the same. I'm so disappointed.",
  },
  {
    name: "Mohammed Ismail",
    initial: "M",
    avatarBg: "#607D8B",
    stars: 1,
    starColor: "#0E8345",
    date: "29 Aug 2026",
    chip: "Uber · Google Play",
    text:
      "Very disappointing and unsafe experience. During my recent bike trip, I had a serious incident involving the driver, and I was physically assaulted. This is completely unacceptable and has made me seriously question the safety standards. Safety should always come first.",
  },
  {
    name: "J J",
    initial: "J",
    avatarBg: "#78909C",
    stars: 1,
    starColor: "#0E8345",
    date: "18 Aug 2026",
    chip: "Uber · Google Play",
    text:
      "The driver dropped me at the wrong location approx 1 km away from my destination point. I tried to show him the map in the app and explain that he drove to the wrong place, but he started shouting at me. I didn't feel safe and left the car.",
    helpful: "2 people found this review helpful",
  },
  {
    name: "Nita Ji",
    initial: "N",
    avatarBg: "#FF7043",
    stars: 1,
    starColor: "#00B67A",
    date: "Jun 2026",
    chip: "Ola · Trustpilot",
    text: "The moment I tell them the destination, they act completely shocked and cancel the ride.",
  },
  {
    name: "Kavya Vemuri",
    initial: "K",
    avatarBg: "#26A69A",
    stars: 1,
    starColor: "#00B67A",
    date: "Jun 2026",
    chip: "Ola · Trustpilot",
    text: "Rides keep cancelling and literally had to wait for 4 long hours. Shame on you Ola.",
  },
  {
    name: "Sagar Nakum",
    initial: "S",
    avatarBg: "#5C6BC0",
    stars: 4,
    starColor: "#FF9500",
    date: "May 2026",
    chip: "Rapido · App Store",
    text:
      "Ride requests are ignored or canceled by drivers multiple times, leaving users stranded. My sister was left stranded with a child despite the urgent need.",
  },
];

function Stars({ n, color }: { n: number; color: string }) {
  return (
    <span className="inline-flex items-center gap-[2px]" aria-label={`${n} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} width="13" height="13" viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M12 2.6l2.9 6 6.6 1-4.8 4.6 1.2 6.5L12 17.6l-5.9 3.1 1.2-6.5-4.8-4.6 6.6-1 2.9-6z"
            fill={i <= n ? color : "#DADCE0"}
          />
        </svg>
      ))}
    </span>
  );
}

function ReviewCard({ r, delay }: { r: Review; delay: number }) {
  return (
    <Reveal delay={delay} className="h-full">
      <div className="flex h-full flex-col rounded-2xl border border-line bg-white p-5 shadow-[0_2px_10px_rgba(0,0,0,0.04)]">
        <div className="flex items-center gap-3">
          <span
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[14px] font-bold text-white"
            style={{ background: r.avatarBg }}
          >
            {r.initial}
          </span>
          <div className="min-w-0 flex-1">
            <div className="truncate text-[13.5px] font-bold">{r.name}</div>
            <div className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-0.5">
              <Stars n={r.stars} color={r.starColor} />
              <span className="text-[11px] text-ink-faint">{r.date}</span>
            </div>
          </div>
          <span className="shrink-0 rounded-full bg-mist px-2.5 py-1 text-[10px] font-bold tracking-[0.3px] text-ink-faint">
            {r.chip}
          </span>
        </div>
        <p className="m-0 mt-3 text-[13px] leading-[1.6] text-ink-soft">&ldquo;{r.text}&rdquo;</p>
        {r.helpful && (
          <div className="mt-auto pt-3 text-[11px] text-[#A6A6A6]">{r.helpful}</div>
        )}
      </div>
    </Reveal>
  );
}

/* ───────────── Problem statement, objectives, difference ───────────── */

const OBJECTIVES: { label: string; title: string; text: string; icon: React.ReactNode }[] = [
  {
    label: "WHY",
    title: "Why we are building it",
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
    title: "What we are building",
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
    title: "How we will do it",
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

export default function Evidence() {
  return (
    <div className="mt-14 sm:mt-24">
      <div className="mb-2.5 text-xs font-bold tracking-[1.6px] text-ink-faint">THE EVIDENCE</div>
      <h2 className="m-0 mb-3 max-w-[760px] text-[clamp(28px,3.6vw,44px)] font-extrabold leading-[1.08] tracking-[-1.3px]">
        The same headline,
        <br />
        twelve years apart.
      </h2>
      <p className="mb-8 max-w-[640px] text-base leading-[1.65] text-ink-soft [text-wrap:pretty]">
        We did not invent this problem. It lives in the papers, in app store reviews, and in
        viral posts on Reddit, X and LinkedIn that the press keeps picking up. If you read
        nothing else, read this wall: every card is real, and every article opens the original
        report.
      </p>

      {/* Half one: fear. Cards deck up on mobile, three across on larger screens */}
      <div className="grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(min(100%,290px),1fr))]">
        {ARTICLES.map((a, i) => (
          <div key={a.pub} className="sticky sm:static" style={{ top: 64 + i * 8, zIndex: i + 1 }}>
            <ArticleCard a={a} delay={i * 0.08} />
          </div>
        ))}
      </div>

      {/* Half two: the ride that never comes */}
      <div className="mt-10 sm:mt-14">
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
        <div className="grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(min(100%,290px),1fr))]">
          {RELIABILITY.map((a, i) => (
            <div key={a.pub} className="sticky sm:static" style={{ top: 64 + i * 8, zIndex: i + 1 }}>
              <ArticleCard a={a} delay={i * 0.08} />
            </div>
          ))}
        </div>
      </div>

      {/* Straight from the app stores */}
      <div className="mt-10 sm:mt-14">
        <h3 className="m-0 mb-2 text-[clamp(22px,2.6vw,32px)] font-extrabold leading-[1.12] tracking-[-0.8px]">
          Riders are already saying it, in public.
        </h3>
        <p className="mb-6 max-w-[660px] text-[14.5px] leading-[1.6] text-ink-soft [text-wrap:pretty]">
          These are real reviews from real riders on public review pages, across Uber, Ola and
          Rapido, shown with the name, rating and date as posted. Left mid ride, refused at
          night, an hour with no cab, a hospital run that would not confirm. This is the user
          voice behind the feature.
        </p>
        <div className="grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(min(100%,280px),1fr))]">
          {REVIEWS.map((r, i) => (
            <ReviewCard key={r.name} r={r} delay={Math.min(i * 0.05, 0.3)} />
          ))}
        </div>
      </div>

      {/* The problem statement, stated plainly */}
      <Reveal className="mt-10 sm:mt-14">
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
