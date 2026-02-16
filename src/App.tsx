import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { HomeB } from './pages/HomeB';
import { ClusterPage } from './pages/ClusterPage';
import { Footer } from './components/Footer';
import { ConsentBanner } from './components/ConsentBanner';
import ScrollToTop from './components/ScrollToTop';
import { Navbar } from './components/Navbar';

// Lazy load non-critical pages
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const TermsOfUse = lazy(() => import('./pages/TermsOfUse'));
const AboutUs = lazy(() => import('./pages/AboutUs'));

// Loading fallback component
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-[50vh]">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
  </div>
);

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Navbar />
      <div className="min-h-screen font-sans bg-white text-gray-900 flex flex-col">
        <div className="flex-grow">
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home-b" element={<HomeB />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-of-use" element={<TermsOfUse />} />
              <Route path="/about-us" element={<AboutUs />} />

              {/* SEO Cluster Pages */}
              <Route path="/traditional-tamil-dishes-pondicherry" element={<ClusterPage title="Traditional Tamil Dishes" description="Explore the authentic flavors of Pondicherry with our guide to the best Tamil traditional meals, from banana leaf feasts to spicy curries." />} />
              <Route path="/french-cafes-in-pondicherry" element={<ClusterPage title="French Cafes and Bistros" description="Discover the charm of White Town with our curated list of the best French cafes serving croissants, crepes, and colonial-era classics." />} />
              <Route path="/seafood-restaurants-pondicherry" element={<ClusterPage title="Seafood Specialties" description="From fresh catch to spicy prawn masala, find the best seafood restaurants in Pondicherry for a coastal dining experience." />} />
              <Route path="/street-food-in-pondicherry" element={<ClusterPage title="Street Food Delights" description="A guide to Pondicherry's vibrant street food scene, featuring sundal, bajji, and other local snacks you must try." />} />
              <Route path="/vegetarian-restaurants-pondicherry" element={<ClusterPage title="Vegetarian Options" description="Find the best vegetarian and vegan-friendly spots in Pondicherry, offering everything from South Indian tiffin to continental salads." />} />
              <Route path="/foodie-guide-pondicherry" element={<ClusterPage title="A Foodie's Guide" description="Your ultimate companion for culinary tours, cooking classes, and food festivals in Pondicherry." />} />
            </Routes>
          </Suspense>
        </div>
        <Footer />
        <ConsentBanner />
      </div>
    </Router>
  );
}

export default App;
