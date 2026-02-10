import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import PrivacyPolicy from './pages/PrivacyPolicy'; // Default import for PrivacyPolicy
import TermsOfUse from './pages/TermsOfUse'; // Default import for TermsOfUse
import AboutUs from './pages/AboutUs'; // Default import for AboutUs
import { Footer } from './components/Footer';
import { ConsentBanner } from './components/ConsentBanner';
import ScrollToTop from './components/ScrollToTop'; // We might need this, but for now let's just use standard routing. Actually, standard behavior is ample. I will add a ScrollToTop component later if needed, or just inline a wrapper if I can. For now, I'll stick to basic routing.

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen font-sans bg-white text-gray-900 flex flex-col">
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-use" element={<TermsOfUse />} />
            <Route path="/about-us" element={<AboutUs />} />
          </Routes>
        </div>
        <Footer />
        <ConsentBanner />
      </div>
    </Router>
  );
}

export default App;
