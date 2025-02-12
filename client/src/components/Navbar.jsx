import React, { useState } from "react";
import Auth from "./Auth";

const Navbar = () => {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);
  const openAuthModal = () => setIsAuthOpen(true);
  const closeAuthModal = () => setIsAuthOpen(false);

  const navLinks = [
    "Home",
    "Live Stats",
    "Staking",
    "Security",
    "Guide",
    "Support",
  ];

  return (
    <nav className="fixed w-full z-50 bg-neutral-900 border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <span className="text-2xl font-bold text-purple-500">SolStake</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6">
            {navLinks.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(" ", "")}`}
                className="text-gray-300 hover:text-white text-sm font-medium transition-all"
              >
                {item}
              </a>
            ))}
          </div>

          {/* Auth Button & Mobile Menu Toggle */}
          <div className="flex items-center gap-4">
            <button
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium animate-pulse"
              onClick={openAuthModal}
            >
              Login & Register
            </button>

            {/* Mobile Menu Button */}
            <button
              aria-label="Toggle mobile menu"
              className="md:hidden p-2 rounded-md text-gray-400 hover:text-white hover:bg-neutral-800"
              onClick={toggleMobileMenu}
            >
              <svg
                className="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-neutral-900 px-4 pt-2 pb-4 space-y-2 transition-all">
          {navLinks.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(" ", "")}`}
              className="block text-gray-300 hover:text-white text-base font-medium transition-all"
              onClick={closeMobileMenu}
            >
              {item}
            </a>
          ))}
        </div>
      )}

      {/* Auth Modal */}
      {isAuthOpen && <Auth closeAuth={closeAuthModal} />}
    </nav>
  );
};

export default Navbar;
