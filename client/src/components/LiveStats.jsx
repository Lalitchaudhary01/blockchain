import React from "react";

const LiveStats = () => {
  // Example transactions data - replace with real data from props/API
  const transactions = [
    {
      type: "Stake",
      amount: "10 SOL",
      wallet: "0x123...abc",
      time: "2 mins ago",
    },
    {
      type: "Unstake",
      amount: "5 SOL",
      wallet: "0x456...def",
      time: "5 mins ago",
    },
    {
      type: "Reward",
      amount: "0.5 SOL",
      wallet: "0x789...ghi",
      time: "10 mins ago",
    },
  ];

  return (
    <section id="liveStats" className="bg-neutral-800 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate__animated animate__fadeIn">
          <h2 className="text-4xl font-bold text-white mb-4">
            Live Staking Statistics
          </h2>
          <p className="text-gray-300 text-xl">
            Real-time updates of our staking ecosystem
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* TVL Card */}
          <div className="bg-neutral-900 rounded-lg p-6 animate__animated animate__fadeInUp">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-300">Total Value Locked</h3>
              <span className="text-purple-500">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
              </span>
            </div>
            <div className="flex items-end">
              <span className="text-3xl font-bold text-white">loading...</span>
              <span className="text-gray-400 ml-2">SOL</span>
            </div>
          </div>

          {/* Active Stakers Card */}
          <div
            className="bg-neutral-900 rounded-lg p-6 animate__animated animate__fadeInUp"
            style={{ animationDelay: "0.2s" }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-300">Active Stakers</h3>
              <span className="text-green-500">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </span>
            </div>
            <div className="flex items-end">
              <span className="text-3xl font-bold text-white">loading...</span>
              <span className="text-gray-400 ml-2">Users</span>
            </div>
          </div>

          {/* APY Card */}
          <div
            className="bg-neutral-900 rounded-lg p-6 animate__animated animate__fadeInUp"
            style={{ animationDelay: "0.4s" }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-300">Average APY</h3>
              <span className="text-yellow-500">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </span>
            </div>
            <div className="flex items-end">
              <span className="text-3xl font-bold text-white">5%</span>
              <span className="text-gray-400 ml-2">Daily</span>
            </div>
          </div>

          {/* Rewards Card */}
          <div
            className="bg-neutral-900 rounded-lg p-6 animate__animated animate__fadeInUp"
            style={{ animationDelay: "0.6s" }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-300">Total Rewards Paid</h3>
              <span className="text-blue-500">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
                  />
                </svg>
              </span>
            </div>
            <div className="flex items-end">
              <span className="text-3xl font-bold text-white">loading...</span>
              <span className="text-gray-400 ml-2">SOL</span>
            </div>
          </div>
        </div>

        {/* Transactions Table */}
        {/* <div className="mt-16 bg-neutral-900 rounded-lg p-6 animate__animated animate__fadeInUp">
          <h3 className="text-xl font-bold text-white mb-6">
            Recent Transactions
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-neutral-700">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Wallet
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Time
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-700 transactions-list">
                {transactions.map((transaction, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {transaction.type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {transaction.amount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {transaction.wallet}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {transaction.time}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div> */}
        {/* </div> */}
      </div>
    </section>
  );
};

export default LiveStats;
