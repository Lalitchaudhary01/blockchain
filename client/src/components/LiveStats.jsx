import { useState, useEffect } from "react";

export default function LiveStats() {
  const [stats, setStats] = useState({
    tvl: 0,
    stakers: 0,
    rewardsPaid: 0,
    transactions: [],
  });

  useEffect(() => {
    const updateStats = () => {
      setStats({
        tvl: Math.floor(Math.random() * (1000000 - 500000) + 500000),
        stakers: Math.floor(Math.random() * (15000 - 8000) + 8000),
        rewardsPaid: Math.floor(Math.random() * (200000 - 100000) + 100000),
        transactions: generateTransactions(),
      });
    };

    const interval = setInterval(updateStats, 5000);
    updateStats(); // Initial call
    return () => clearInterval(interval);
  }, []);

  const generateTransactions = () => {
    // Transaction generation logic
    return [...Array(5)].map(() => ({
      type: ["Stake", "Unstake", "Reward"][Math.floor(Math.random() * 3)],
      amount: (Math.random() * 100).toFixed(2),
      wallet: `${Array(35)
        .fill(0)
        .map(() => Math.random().toString(36)[2])
        .join("")}...`,
      time: new Date(Date.now() - Math.random() * 3600000).toLocaleTimeString(),
    }));
  };

  return (
    <section id="liveStats" className="bg-neutral-800 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { title: "Total Value Locked", value: stats.tvl, suffix: "SOL" },
            // ... other stats
          ].map((stat, index) => (
            <div
              key={stat.title}
              className="bg-neutral-900 rounded-lg p-6 animate-fade-in"
            >
              {/* Stat content */}
            </div>
          ))}
        </div>

        {/* Transactions Table */}
        <div className="mt-16 bg-neutral-900 rounded-lg p-6">
          <table className="min-w-full divide-y divide-neutral-700">
            <tbody className="divide-y divide-neutral-700">
              {stats.transactions.map((txn, index) => (
                <tr key={index}>{/* Transaction row */}</tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
