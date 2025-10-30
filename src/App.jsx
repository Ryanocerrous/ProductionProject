import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Hero from './sections/Hero.jsx';
import ModelShowcase from './sections/ModelShowcase.jsx';
import Features from './sections/Features.jsx';
import Testimonials from './sections/Testimonials.jsx';
import Updates from './sections/Updates.jsx';
import CTA from './sections/CTA.jsx';
import {
  DossierIntro,
  ProductProgressionSection,
  ProjectTimelineSection,
  KnowledgeBaseSection,
  ResearchResourcesSection,
  ResearchPreparationSection,
  MoscowSection,
  RiskRegisterSection,
  ReferencesSection
} from './sections/Brief.jsx';

function App() {
  return (
    <div>
      <Navbar />
      <main>
        <Hero />
        <DossierIntro />
        <ModelShowcase />
        <Features />
        <Updates />
        <CTA />
        <Testimonials />
        <ProductProgressionSection />
        <ProjectTimelineSection />
        <KnowledgeBaseSection />
        <ResearchResourcesSection />
        <ResearchPreparationSection />
        <MoscowSection />
        <RiskRegisterSection />
        <ReferencesSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
