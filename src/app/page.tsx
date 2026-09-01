import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import ScrollCompanion from "@/components/ScrollCompanion";
import { Ticker, Stats, Problem, DecisionEngine, ResponsibleAI, Architecture } from "@/components/Sections";
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
import { OptionsWeighed, Doblin, NotList, HowWeGotHere } from "@/components/case/Gate2";
import { NoPilotNote, MetricTree, RevenueModel, ValueLogic, BusinessModelCanvas, PilotPlan, Squad } from "@/components/case/Gate3";
import { Roadmap, TheAsk, Impact, CaseInSixty, AboutThisCase } from "@/components/case/Gate4";
import { TheBrain, Methods, Iterations, Lessons, TalkToMe } from "@/components/case/Story";
import { GATE_1, GATE_2, GATE_3, GATE_4 } from "@/content/case";

/* The page is the case, in seven chapters: introduction, background,
   research, design, prototype, outcomes, conclusion. Four of them close
   with a verdict card. One person wrote and built all of it. */
export default function Home() {
  return (
    <div className="overflow-x-clip">
      <ScrollCompanion />
      <Nav />
      <main>
        <Hero />
        <Ticker />
        <CaseMap />

        {/* 1. Introduction: the problem, the thesis, what the case covers */}
        <Chapter id="intro">
          <Problem />
          <div className="mt-14 sm:mt-24">
            <Stats />
          </div>
          <ConceptOnePage />
          <div className="mt-14 sm:mt-24">
            <WhoDecides />
          </div>
        </Chapter>

        {/* 2. Background: the person behind it, the people in the ride, the market */}
        <Chapter id="context">
          <TheBrain />
          <Personas />
          <Industry />
          <Constraints />
        </Chapter>

        {/* 3. Research and discovery: methods, findings, insights, requirements */}
        <Chapter id="research">
          <Methods />
          <Evidence />
          <Jobs />
          <WhyNow />
          <GapToMetric />
          <HowWeGotHere />
          <GateCard gate={GATE_1} />
        </Chapter>

        {/* 4. Design process: options, iterations, decisions */}
        <Chapter id="design" contained={false}>
          <Container>
            <OptionsWeighed />
            <Iterations />
            <DecisionEngine />
          </Container>
          <FlowCards />
          <Container className="pt-14 sm:pt-24">
            <Architecture />
            <div className="mt-14 sm:mt-24">
              <SectionHeader
                eyebrow="THE RISKS I DESIGNED AGAINST"
                glyph="shield"
                size="h3"
                title="Eight principles, each answering a named risk."
                lede="A safety feature can do harm of its own. Each card names the risk first, then the design that answers it."
              />
            </div>
            <ResponsibleAI />
            <NotList />
            <Doblin />
            <GateCard gate={GATE_2} />
          </Container>
        </Chapter>

        {/* 5. Prototype showcase: the working demo, the features, with and without */}
        <Chapter id="prototype" contained={false}>
          <Prototype />
          <Container id="features" className="pt-14 sm:pt-24">
            <SectionHeader
              eyebrow="THE FEATURE SET"
              title="Five features, one flow built on consent."
              lede="P0 ships in the pilot. P1 follows once the pilot holds."
              titleClassName="md:whitespace-nowrap"
            />
            <FeatureStack />
            <Comparison />
          </Container>
        </Chapter>

        {/* 6. Testing and outcomes: the test design, the metrics, the money, the lessons */}
        <Chapter id="outcomes">
          <NoPilotNote />
          <PilotPlan />
          <MetricTree />
          <RevenueModel />
          <ValueLogic />
          <BusinessModelCanvas />
          <Lessons />
          <GateCard gate={GATE_3} />
        </Chapter>

        {/* 7. Conclusion and recommendations */}
        <Chapter id="conclusion" className="pb-14 sm:pb-24">
          <CaseInSixty />
          <TheAsk />
          <Roadmap />
          <Squad />
          <Impact />
          <AboutThisCase />
          <TalkToMe />
          <GateCard gate={GATE_4} />
        </Chapter>
      </main>
      <Footer />
    </div>
  );
}
