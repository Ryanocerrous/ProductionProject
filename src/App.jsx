import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Hero from './sections/Hero.jsx';
import ModelShowcase from './sections/ModelShowcase.jsx';
import Brief from './sections/Brief.jsx';
import Features from './sections/Features.jsx';
import Testimonials from './sections/Testimonials.jsx';
import Updates from './sections/Updates.jsx';
import CTA from './sections/CTA.jsx';

function App() {
  return (
    <div>
      <Navbar />
      <main>
        <Hero />
        <Brief />
        <ModelShowcase />
        <Features />
        <Updates />
        <CTA />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
}

export default App;
