import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import LiveStats from "./components/LiveStats";
import StakingFeatures from "./components/StakingFeatures";
// import ReferralProgram from "./components/ReferralProgram";
import SecurityMeasures from "./components/SecurityMeasures";
import UserGuide from "./components/UserGuide";
import SupportSection from "./components/SupportSection";
import Footer from "./components/Footer";

export default function App() {
  return (
    <Router>
      <div className="antialiased text-gray-800 min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 relative">
          <Routes>
            {/* Define routes */}
            <Route path="/" element={<Home />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

// Home component containing the main sections
function Home() {
  return (
    <>
      <Hero />
      <LiveStats />
      <StakingFeatures />
      <SecurityMeasures />
      <UserGuide />
      <SupportSection />
    </>
  );
}
