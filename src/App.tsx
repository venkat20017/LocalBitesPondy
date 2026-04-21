import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomeB } from './pages/HomeB';
import { Footer } from './components/Footer';
import { ConsentBanner } from './components/ConsentBanner';
import ScrollToTop from './components/ScrollToTop';
import { Navbar } from './components/Navbar';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfUse from './pages/TermsOfUse';
import AboutUs from './pages/AboutUs';
import ThankYou from './pages/ThankYou';
import { LeadPopupProvider } from './context/LeadPopupContext';
import { ContentProvider } from './context/ContentContext';
import { LeadPopup } from './components/LeadPopup';

function App() {
  return (
    <Router>
      <ContentProvider>
        <LeadPopupProvider>
          <ScrollToTop />
          <Navbar />
          <div className="min-h-screen font-sans bg-white text-gray-900 flex flex-col">
            <div className="grow">
              <Routes>
                <Route path="/" element={<HomeB />} />
                <Route path="/thank-you" element={<ThankYou />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/terms-of-use" element={<TermsOfUse />} />
                <Route path="/about-us" element={<AboutUs />} />
              </Routes>
            </div>
            <Footer />
            <ConsentBanner />
            <LeadPopup />
          </div>
        </LeadPopupProvider>
      </ContentProvider>
    </Router>
  );
}

export default App;


