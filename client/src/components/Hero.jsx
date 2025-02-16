import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const [amount, setAmount] = useState("");
  const [days, setDays] = useState("");
  const [returns, setReturns] = useState(0);

  const navigate = useNavigate(); // Navigation hook

  const calculateReturns = () => {
    const parsedAmount = parseFloat(amount) || 0;
    const parsedDays = parseInt(days) || 0;
    const dailyRate = 0.05; // 5% daily
    const calculatedReturns =
      parsedAmount * (1 + dailyRate) ** parsedDays - parsedAmount;
    setReturns(calculatedReturns.toFixed(2));
  };

  return (
    <section id="hero" className="bg-neutral-900 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[70vh] flex items-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}

          <div className="space-y-8 animate-fade-in-left">
            <h1 className="text-4xl md:text-6xl font-bold text-white">
              Maximize Your <span className="text-purple-500">Solana</span>{" "}
              Earnings
            </h1>

            <p className="text-xl text-gray-300">
              Earn up to 5% daily returns through secure and transparent Solana
              staking. Join thousands of successful investors today.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              {/* Navigate to Solana Wallet */}
              <button
                onClick={() => navigate("/wallet")}
                className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg text-lg font-medium transition-all duration-300 animate-pulse"
              >
                Start Staking
              </button>
              <button className="border border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white px-8 py-3 rounded-lg text-lg font-medium transition-all duration-300">
                Learn More
              </button>
            </div>

            <div className="flex gap-8 pt-4">
              {[
                { value: "$50M+", label: "Total Staked" },
                { value: "10K+", label: "Active Users" },
                { value: "5%", label: "Daily Returns" },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <h3 className="text-3xl font-bold text-purple-500">
                    {stat.value}
                  </h3>
                  <p className="text-gray-400">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Calculator */}
          <div className="relative animate-fade-in-right">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-blue-500 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt" />
            <div className="relative bg-neutral-800 rounded-lg p-8">
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-white">
                  Quick Stake Calculator
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="text-gray-300 block mb-2">
                      Amount (SOL)
                    </label>
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => {
                        setAmount(e.target.value);
                        calculateReturns();
                      }}
                      className="w-full bg-neutral-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Enter SOL amount"
                    />
                  </div>

                  <div>
                    <label className="text-gray-300 block mb-2">
                      Staking Period (Days)
                    </label>
                    <input
                      type="number"
                      value={days}
                      onChange={(e) => {
                        setDays(e.target.value);
                        calculateReturns();
                      }}
                      className="w-full bg-neutral-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Enter days"
                    />
                  </div>

                  <div className="bg-neutral-700 rounded-lg p-4">
                    <p className="text-gray-300">Estimated Returns:</p>
                    <p className="text-2xl font-bold text-purple-500">
                      {returns} SOL
                    </p>
                  </div>

                  <button className="w-full bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300">
                    Connect Wallet to Stake
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
