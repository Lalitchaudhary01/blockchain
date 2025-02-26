import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast"; // Toast notifications

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
import ProtectedRoute from "./components/ProtectedRoute";
import Sidebar from "./page/Sidebar"; // Import Sidebar

import Home from "./page/Home";
import Dashboard from "./page/Dashboard";
import Wallet from "./page/Wallet";
import Deposit from "./page/Deposit";
import Withdraw from "./page/Withdraw";
import Profile from "./page/Profile";
import InvestmentCalculator from "./page/InvestmentCalculator";

export default function App() {
  return (
    <Router>
      <div className="antialiased text-gray-800 min-h-screen flex flex-col">
        <Toaster /> {/* Global toast notifications */}
        <Routes>
          {/* Protected Routes with Sidebar */}
          {[
            { path: "/home", component: <Home /> },
            { path: "/dashboard", component: <Dashboard /> },
            { path: "/calculator", component: <InvestmentCalculator /> },
            { path: "/wallet", component: <Wallet /> },
            { path: "/deposit", component: <Deposit /> },
            { path: "/withdraw", component: <Withdraw /> },
            { path: "/profile", component: <Profile /> },
          ].map(({ path, component }, index) => (
            <Route
              key={index}
              path={path}
              element={
                <ProtectedRoute>
                  <div className="flex min-h-screen">
                    <Sidebar />
                    <div className="flex-grow p-6">{component}</div>
                  </div>
                </ProtectedRoute>
              }
            />
          ))}

          {/* Public Routes with Navbar and Footer */}
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

                    {/* Protect the /wallets route */}
                    <Route
                      path="/wallets"
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
