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
import ProtectedRoute from "./components/ProtectedRoute"; // Import Protected Route
import Home from "./page/Home";

export default function App() {
  return (
    <Router>
      <div className="antialiased text-gray-800 min-h-screen flex flex-col">
        <Toaster /> {/* Toaster for global toast notifications */}
        <Routes>
          {/* Agar Home page hai toh Navbar aur Footer nahi dikhayenge */}
          <Route path="/home" element={<Home />} />

          {/* Baaki sab pages ke liye Navbar aur Footer dikhana hai */}
          <Route
            path="/*"
            element={
              <>
                <Navbar />
                <main className="flex-1 relative">
                  <Routes>
                    <Route path="/" element={<Hero />} />
                    <Route path="/auth" element={<Auth />} />
                    <Route path="/verify-otp" element={<OtpVerification />} />

                    {/* Protect the wallet route */}
                    <Route
                      path="/wallet"
                      element={
                        <ProtectedRoute>
                          <SolanaWallet />
                        </ProtectedRoute>
                      }
                    />

                    <Route path="/livestats" element={<LiveStats />} />
                    <Route path="/staking" element={<StakingFeatures />} />
                    <Route path="/security" element={<SecurityMeasures />} />
                    <Route path="/guide" element={<UserGuide />} />
                    <Route path="/support" element={<SupportSection />} />
                  </Routes>
                </main>
                <Footer />
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}
