import { useState } from "react";
import { Bars3Icon } from "@heroicons/react/24/outline";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "#hero" },
    { name: "Live Stats", href: "#liveStats" },
    { name: "Staking", href: "#stakingFeatures" },
    { name: "Referrals", href: "#referralProgram" },
    { name: "Security", href: "#securityMeasures" },
    { name: "Guide", href: "#userGuide" },
    { name: "Support", href: "#supportSection" },
  ];

  return (
    <nav className="fixed w-full z-50 bg-neutral-900 border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <span className="text-2xl font-bold text-purple-500">SolStake</span>
            <div className="hidden md:block ml-10">
              <div className="flex space-x-4">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium animate-pulse">
              Connect Wallet
            </button>
            <button
              className="md:hidden p-2 rounded-md text-gray-400 hover:text-white hover:bg-neutral-800"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Bars3Icon className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-neutral-900 px-2 pt-2 pb-3">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
