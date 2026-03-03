import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { HomeB } from './pages/HomeB';
import { ClusterPage } from './pages/ClusterPage';
import { clusterData } from './data/clusterData';
import { Footer } from './components/Footer';
import { ConsentBanner } from './components/ConsentBanner';
import ScrollToTop from './components/ScrollToTop';
import { Navbar } from './components/Navbar';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfUse from './pages/TermsOfUse';
import AboutUs from './pages/AboutUs';
import ThankYou from './pages/ThankYou';

// Lazy load non-critical pages (none currently)

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Navbar />
      <div className="min-h-screen font-sans bg-white text-gray-900 flex flex-col">
        <div className="grow">
          <Routes>
            <Route path="/" element={<HomeB />} />
            <Route path="/home-b" element={<Navigate to="/" replace />} />
            <Route path="/thank-you" element={<ThankYou />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-use" element={<TermsOfUse />} />
            <Route path="/about-us" element={<AboutUs />} />

            {/* SEO Cluster Pages */}
            <Route path="/traditional-tamil-dishes-pondicherry" element={<ClusterPage data={clusterData["/traditional-tamil-dishes-pondicherry"]} />} />
            <Route path="/french-cafes-in-pondicherry" element={<ClusterPage data={clusterData["/french-cafes-in-pondicherry"]} />} />
            <Route path="/seafood-restaurants-pondicherry" element={<ClusterPage data={clusterData["/seafood-restaurants-pondicherry"]} />} />
            <Route path="/street-food-in-pondicherry" element={<ClusterPage data={clusterData["/street-food-in-pondicherry"]} />} />
            <Route path="/vegetarian-restaurants-pondicherry" element={<ClusterPage data={clusterData["/vegetarian-restaurants-pondicherry"]} />} />
            <Route path="/foodie-guide-pondicherry" element={<ClusterPage data={clusterData["/foodie-guide-pondicherry"]} />} />
          </Routes>
        </div>
        <Footer />
        <ConsentBanner />
      </div>
    </Router>
  );
}

export default App;
