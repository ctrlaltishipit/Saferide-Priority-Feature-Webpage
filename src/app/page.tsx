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
import Evidence, { ConceptOnePage } from "@/components/Evidence";
import Industry from "@/components/Industry";
import Comparison from "@/components/Comparison";
import FlowCards from "@/components/FlowCards";
import FeatureStack from "@/components/FeatureStack";
import Prototype from "@/components/prototype/Prototype";
import Footer from "@/components/Footer";
import CaseMap from "@/components/case/CaseMap";
import { Chapter, Container, GateCard, SectionHeader } from "@/components/case/primitives";
import { WhoDecides, Personas, Jobs, WhyNow, GapToMetric, Constraints } from "@/components/case/Gate1";
import { OptionsWeighed, Doblin, NotList } from "@/components/case/Gate2";
import { NoPilotNote, MetricTree, RevenueModel, ValueLogic, BusinessModelCanvas, PilotPlan, Squad } from "@/components/case/Gate3";
import { Roadmap, TheAsk, Impact, CaseInSixty, AboutThisCase } from "@/components/case/Gate4";
import { GATE_1, GATE_2, GATE_3, GATE_4 } from "@/content/case";

/* The page is the case. Four chapters (the problem, the solution, the
   business model, the ask), with the prototype sitting right after chapter 2
   as its evidence. Every chapter closes with a verdict card. */
export default function Home() {
  return (
    <div className="overflow-x-clip">
      <ScrollCompanion />
      <Nav />
      <main>
        <Hero />
        <Ticker />
        <CaseMap />

        {/* Chapter 1: the problem */}
        <Chapter id="problem">
          <WhoDecides />
          <div className="mt-14 sm:mt-24">
            <Stats />
          </div>
          <Problem />
          <Personas />
          <Jobs />
          <Evidence />
          <Industry />
          <WhyNow />
          <GapToMetric />
          <Constraints />
          <GateCard gate={GATE_1} />
        </Chapter>

        {/* Chapter 2: the solution */}
        <Chapter id="solution" contained={false}>
          <Container>
            <ConceptOnePage />
            <OptionsWeighed />
            <Comparison />
            <DecisionEngine />
          </Container>
          <FlowCards />
          <Container id="features" className="pt-14 sm:pt-24">
            <SectionHeader
              eyebrow="THE FEATURE SET"
              title="Five features, one flow built on consent."
              lede="P0 ships in the pilot. P1 follows once the pilot holds. Every feature reads its limits from the same written rules."
              titleClassName="md:whitespace-nowrap"
            />
            <FeatureStack />
            <div className="mt-12 sm:mt-20">
              <SectionHeader
                eyebrow="THE RISKS WE DESIGNED AGAINST"
                size="h3"
                title="Eight principles, each answering a named risk."
                lede="A feature about safety can do harm of its own: false comfort, stigma, unfair eligibility, a share nobody agreed to. Each card names the risk first, then the design that answers it."
              />
            </div>
            <ResponsibleAI />
            <NotList />
            <Doblin />
            <Architecture />
            <GateCard gate={GATE_2} />
          </Container>
        </Chapter>

        {/* The prototype: evidence for chapter 2 */}
        <Prototype />

        {/* Chapter 3: the business model */}
        <Chapter id="money">
          <NoPilotNote />
          <MetricTree />
          <RevenueModel />
          <ValueLogic />
          <BusinessModelCanvas />
          <PilotPlan />
          <Squad />
          <GateCard gate={GATE_3} />
        </Chapter>

        {/* Chapter 4: the ask */}
        <Chapter id="the-case" className="pb-14 sm:pb-24">
          <Roadmap />
          <TheAsk />
          <Impact />
          <CaseInSixty />
          <AboutThisCase />
          <GateCard gate={GATE_4} />
        </Chapter>
      </main>
      <Footer />
    </div>
  );
}
