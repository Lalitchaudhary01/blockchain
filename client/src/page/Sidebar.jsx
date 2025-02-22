import React from "react";

const Sidebar = () => {
  return (
    <nav className="fixed h-screen w-64 bg-[#0F1C2E] text-white hidden lg:flex flex-col">
      <div className="p-6 border-b border-neutral-700/20">
        <span className="text-2xl font-bold text-[#F7931A]">Bitcoinstake</span>
      </div>
      <div className="flex-1 py-6">
        <a
          href="#dashboard"
          className="flex items-center px-6 py-3 text-neutral-300 hover:bg-neutral-700/20 hover:text-white transition-colors active"
        >
          <svg
            className="w-5 h-5 mr-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
          Dashboard
        </a>
        <a
          href="#calculator"
          className="flex items-center px-6 py-3 text-neutral-300 hover:bg-neutral-700/20 hover:text-white transition-colors"
        >
          <svg
            className="w-5 h-5 mr-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
            />
          </svg>
          Calculator
        </a>
        <a
          href="#wallet"
          className="flex items-center px-6 py-3 text-neutral-300 hover:bg-neutral-700/20 hover:text-white transition-colors"
        >
          <svg
            className="w-5 h-5 mr-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
            />
          </svg>
          Wallet
        </a>
      </div>
      <div className="p-6 border-t border-neutral-700/20">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-[#F7931A] flex items-center justify-center">
            <span className="text-white font-bold">JS</span>
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium">John Smith</p>
            <p className="text-xs text-neutral-400">user@example.com</p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
