import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import ScrollCompanion from "@/components/ScrollCompanion";
import {
  Ticker,
  Stats,
  Problem,
  DecisionEngine,
  ResponsibleAI,
  Architecture,
} from "@/components/Sections";
import Comparison from "@/components/Comparison";
import FlowCards from "@/components/FlowCards";
import FeatureStack from "@/components/FeatureStack";
import Prototype from "@/components/prototype/Prototype";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="overflow-x-clip">
      <ScrollCompanion />
      <Nav />
      <main>
        <Hero />
        <Ticker />
        <div id="case-study" className="mx-auto max-w-[1240px] px-5 pt-12 sm:pt-20">
          <Stats />
          <Problem />
          <Comparison />
          <DecisionEngine />
        </div>
        <FlowCards />
        <div id="features" className="mx-auto max-w-[1240px] px-5 pt-14 sm:pt-24">
          <div className="mb-2.5 text-xs font-bold tracking-[1.6px] text-ink-faint">
            THE FEATURE SET
          </div>
          <h2 className="m-0 mb-[34px] text-[clamp(28px,3.6vw,44px)] font-extrabold leading-[1.08] tracking-[-1.3px] md:whitespace-nowrap">
            Five features, one flow built on consent.
          </h2>
          <FeatureStack />
          <ResponsibleAI />
          <Architecture />
        </div>
        <Prototype />
      </main>
      <Footer />
    </div>
  );
}
