import { useState } from "react";

export default function Hero() {
  const [amount, setAmount] = useState("");
  const [days, setDays] = useState("");
  const [returns, setReturns] = useState(0);

  const calculateReturns = () => {
    const parsedAmount = parseFloat(amount) || 0;
    const parsedDays = parseInt(days) || 0;
    const dailyRate = 0.05;
    const calculatedReturns =
      parsedAmount * (1 + dailyRate) ** parsedDays - parsedAmount;
    setReturns(calculatedReturns.toFixed(2));
  };

  return (
    <section id="hero" className="bg-neutral-900 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[70vh] flex items-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <h1 className="text-4xl md:text-6xl font-bold text-white">
              Maximize Your <span className="text-purple-500">Solana</span>{" "}
              Earnings
            </h1>
            {/* ... Rest of hero content */}
          </div>

          {/* Calculator */}
          <div className="relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-blue-500 rounded-lg blur opacity-75 animate-tilt" />
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
                    />
                  </div>
                  {/* Days input and results */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
