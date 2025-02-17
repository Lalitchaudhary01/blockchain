import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast"; // Import Toaster for toast notifications

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import LiveStats from "./components/LiveStats";
import StakingFeatures from "./components/StakingFeatures";
import SecurityMeasures from "./components/SecurityMeasures";
import UserGuide from "./components/UserGuide";
import SupportSection from "./components/SupportSection";
import Footer from "./components/Footer";
import SolanaWallet from "./components/SolanaWallet";
import Auth from "./components/Auth";
import OtpVerification from "./components/OtpVerification";

export default function App() {
  return (
    <Router>
      <div className="antialiased text-gray-800 min-h-screen flex flex-col">
        <Toaster /> {/* Toaster for global toast notifications */}
        <Navbar />
        <main className="flex-1 relative">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/verify-otp" element={<OtpVerification />} />
            <Route path="/wallet" element={<SolanaWallet />} />
            <Route path="/livestats" element={<LiveStats />} />
            <Route path="/staking" element={<StakingFeatures />} />
            <Route path="/security" element={<SecurityMeasures />} />
            <Route path="/guide" element={<UserGuide />} />
            <Route path="/support" element={<SupportSection />} />
            <Route path="*" element={<NotFound />} />
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

// 404 Not Found Page
function NotFound() {
  return (
    <div className="flex items-center justify-center h-screen text-2xl text-red-500">
      404 - Page Not Found
    </div>
  );
}
