import { useState } from "react";

const InvestmentCalculator = () => {
  const [amount, setAmount] = useState(10000);
  const [duration, setDuration] = useState(30);
  const dailyInterestRate = 0.05; // 5% daily interest

  // Calculations
  const dailyInterest = dailyInterestRate * 100;
  const totalReturn = amount + amount * dailyInterestRate * duration;
  const netProfit = totalReturn - amount;

  return (
    <section id="calculator" className="min-h-screen bg-[#E5E7EB] p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#0F1C2E] mb-4">
            Investment Calculator
          </h2>
          <p className="text-neutral-600">
            Calculate your potential returns with our investment calculator
          </p>
        </header>

        {/* Calculator Card */}
        <div className="bg-white rounded-lg border border-neutral-200/30 p-8">
          {/* Amount Input */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <label className="text-[#0F1C2E] font-semibold">
                Investment Amount
              </label>
              <span className="text-[#F7931A] font-bold">${amount}</span>
            </div>
            <input
              type="range"
              min="500"
              max="30000"
              step="500"
              value={amount}
              onChange={(e) => setAmount(parseInt(e.target.value))}
              className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-[#F7931A]"
            />
            <div className="flex justify-between text-sm text-neutral-500 mt-1">
              <span>$500</span>
              <span>$30,000</span>
            </div>
          </div>

          {/* Duration Input */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <label className="text-[#0F1C2E] font-semibold">
                Investment Duration
              </label>
              <span className="text-[#F7931A] font-bold">{duration} days</span>
            </div>
            <input
              type="range"
              min="1"
              max="365"
              value={duration}
              onChange={(e) => setDuration(parseInt(e.target.value))}
              className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-[#F7931A]"
            />
            <div className="flex justify-between text-sm text-neutral-500 mt-1">
              <span>1 day</span>
              <span>365 days</span>
            </div>
          </div>

          {/* Results Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 bg-[#0F1C2E] rounded-lg">
            <div className="text-center">
              <p className="text-neutral-400 mb-2">Daily Interest</p>
              <h3 className="text-2xl font-bold text-white">
                {dailyInterest}%
              </h3>
            </div>
            <div className="text-center">
              <p className="text-neutral-400 mb-2">Total Return</p>
              <h3 className="text-2xl font-bold text-[#F7931A]">
                ${totalReturn.toFixed(2)}
              </h3>
            </div>
            <div className="text-center">
              <p className="text-neutral-400 mb-2">Net Profit</p>
              <h3 className="text-2xl font-bold text-green-500">
                ${netProfit.toFixed(2)}
              </h3>
            </div>
          </div>
        </div>

        {/* Information Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {[
            {
              title: "Daily Returns",
              text: "Earn up to 5% daily returns on your investments",
              icon: (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              ),
            },
            {
              title: "Secure Platform",
              text: "Your investments are protected by advanced security measures",
              icon: (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              ),
            },
            {
              title: "Instant Withdrawals",
              text: "Access your earnings instantly with our fast withdrawal system",
              icon: (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              ),
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg border border-neutral-200/30"
            >
              <div className="flex items-center mb-4">
                <span className="bg-[#F7931A]/10 p-2 rounded-lg mr-3">
                  <svg
                    className="w-6 h-6 text-[#F7931A]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    {item.icon}
                  </svg>
                </span>
                <h3 className="text-lg font-semibold text-[#0F1C2E]">
                  {item.title}
                </h3>
              </div>
              <p className="text-neutral-600">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InvestmentCalculator;
