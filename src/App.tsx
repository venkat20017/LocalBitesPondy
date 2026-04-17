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
import { LeadModalProvider } from './contexts/LeadModalContext';
import { LeadModal } from './components/LeadModal';
import { useAutoTriggerModal } from './hooks/useAutoTriggerModal';

const AppShell = () => {
    useAutoTriggerModal();

    return (
        <>
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
                        <Route path="/tamil-dishes" element={<ClusterPage data={clusterData["/tamil-dishes"]} />} />
                        <Route path="/french-quarter" element={<ClusterPage data={clusterData["/french-quarter"]} />} />
                        <Route path="/seafood" element={<ClusterPage data={clusterData["/seafood"]} />} />
                        <Route path="/street-food" element={<ClusterPage data={clusterData["/street-food"]} />} />
                        <Route path="/restaurants" element={<ClusterPage data={clusterData["/restaurants"]} />} />
                        <Route path="/foodie-guide" element={<ClusterPage data={clusterData["/foodie-guide"]} />} />
                    </Routes>
                </div>
                <Footer />
                <ConsentBanner />
            </div>
            <LeadModal />
        </>
    );
};

function App() {
    return (
        <Router>
            <LeadModalProvider>
                <AppShell />
            </LeadModalProvider>
        </Router>
    );
}

export default App;
