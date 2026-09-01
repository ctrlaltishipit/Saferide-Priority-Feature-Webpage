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
import { GATE_1, GATE_2 } from "@/content/case";

/* The page is the case. Four chapters (the problem, the solution, the
   business model, the ask), with the prototype sitting right after chapter 2
   as its evidence. Chapters 3 and 4 arrive in later phases; the case map
   shows them as coming next until then. */
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
            <Comparison />
            <DecisionEngine />
          </Container>
          <FlowCards />
          <Container id="features" className="pt-14 sm:pt-24">
            <SectionHeader
              eyebrow="THE FEATURE SET"
              title="Five features, one flow built on consent."
              titleClassName="md:whitespace-nowrap"
            />
            <FeatureStack />
            <ResponsibleAI />
            <Architecture />
            <GateCard gate={GATE_2} />
          </Container>
        </Chapter>

        {/* The prototype: evidence for chapter 2 */}
        <Prototype />
      </main>
      <Footer />
    </div>
  );
}
