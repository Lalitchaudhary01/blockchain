import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { removeUser } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ user }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    dispatch(removeUser());
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    try {
      await fetch("http://localhost:5000/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      console.error("Logout error:", error);
    }

    navigate("/auth");
  };

  return (
    <nav className="fixed h-screen w-64 bg-[#0F1C2E] text-white hidden lg:flex flex-col">
      <div className="p-6 border-b border-neutral-700/20">
        <span className="text-2xl font-bold text-[#F7931A]">Bitcoinstake</span>
      </div>

      <div className="flex-1 py-6">
        <a
          href="#dashboard"
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

      {/* User Profile Section */}
      <div
        className="relative p-6 border-t border-neutral-700/20 cursor-pointer"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <div className="flex items-center justify-between">
          {/* Rectangular Profile Section */}
          <div className="w-32 h-10 bg-[#F7931A] flex items-center justify-center rounded-md">
            <span className="text-white font-bold">{user?.name}</span>
          </div>

          {/* Small Down Arrow Icon */}
          <svg
            className="w-5 h-5 text-white ml-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>

        {/* Dropdown Menu (Logout Button) */}
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-40 bg-neutral-800 rounded-md shadow-lg z-10">
            <button
              onClick={handleLogout}
              className="text-left px-4 py-2 text-sm text-white hover:bg-neutral-700 rounded-md flex items-center"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h6a2 2 0 012 2v1"
                />
              </svg>
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Sidebar;
