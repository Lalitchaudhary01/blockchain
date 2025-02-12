import React, { useState } from "react";
import Auth from "./Auth";

const Navbar = () => {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      id="navbar"
      className="fixed w-full z-50 bg-neutral-900 border-b border-neutral-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-2xl font-bold text-purple-500">
                SolStake
              </span>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {[
                  "Home",
                  "Live Stats",
                  "Staking",
                  "Security",
                  "Guide",
                  "Support",
                ].map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase().replace(" ", "")}`}
                    className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium animate-pulse"
              onClick={() => setIsAuthOpen(true)}
            >
              Login & Register
            </button>
            <div className="md:hidden">
              <button
                type="button"
                className="mobile-menu-button inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-neutral-800 focus:ring-white"
                onClick={toggleMobileMenu}
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`mobile-menu ${
          isMobileMenuOpen ? "block" : "hidden"
        } md:hidden`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-neutral-900">
          {[
            "Home",
            "Live Stats",
            "Staking",
            "Referrals",
            "Security",
            "Guide",
            "Support",
          ].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(" ", "")}`}
              className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              onClick={closeMobileMenu}
            >
              {item}
            </a>
          ))}
        </div>
      </div>
      {isAuthOpen && <Auth closeAuth={() => setIsAuthOpen(false)} />}
    </nav>
  );
};

export default Navbar;
