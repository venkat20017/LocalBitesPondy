import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ConsentBanner } from './components/ConsentBanner';
import { LeadModal } from './components/LeadModal';
import { RouteEffects } from './components/RouteEffects';
import ScrollToTop from './components/ScrollToTop';
import Landing from './pages/Landing';
import RestaurantList from './pages/RestaurantList';
import RestaurantDetail from './pages/RestaurantDetail';
import BlogList from './pages/BlogList';
import BlogPost from './pages/BlogPost';
import ThankYou from './pages/ThankYou';
import LegalPage from './pages/LegalPage';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <RouteEffects />
      <div className="flex min-h-screen flex-col bg-white font-sans text-gray-900">
        <Navbar />
        <div className="grow">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/restaurants" element={<RestaurantList />} />
            <Route path="/restaurants/:slug" element={<RestaurantDetail />} />
            <Route path="/blog" element={<BlogList />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/thank-you" element={<ThankYou />} />
            <Route path="/privacy-policy" element={<LegalPage slug="privacy-policy" />} />
            <Route path="/terms-of-use" element={<LegalPage slug="terms-of-use" />} />
          </Routes>
        </div>
        <Footer />
        <ConsentBanner />
        <LeadModal />
      </div>
    </Router>
  );
}

export default App;
