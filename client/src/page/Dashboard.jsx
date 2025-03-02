import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Dashboard = () => {
  const [solanaData, setSolanaData] = useState([]);

  // Fetch real-time Solana prices
  useEffect(() => {
    const fetchSolanaPrices = async () => {
      try {
        const response = await fetch(
          "https://api.coingecko.com/api/v3/coins/solana/market_chart?vs_currency=usd&days=1&interval=minute"
        );
        const data = await response.json();
        const formattedData = data.prices.map(([timestamp, price]) => ({
          time: new Date(timestamp).toLocaleTimeString(),
          price: price.toFixed(2),
        }));
        setSolanaData(formattedData.slice(-30)); // Show last 30 minutes
      } catch (error) {
        console.error("Error fetching Solana data:", error);
      }
    };

    fetchSolanaPrices();
    const interval = setInterval(fetchSolanaPrices, 60000); // Update every 60 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="dashboard" className="bg-gray-100 p-6">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-600">
          Welcome back! Here's your investment summary.
        </p>
      </header>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          {
            title: "Available Balance",
            value: "$24,500.00",
            change: "+2.5%",
            note: "from last week",
          },
          {
            title: "Daily Interest Rate",
            value: "5.0%",
            note: "Maximum rate applied",
          },
          {
            title: "Today's Profit",
            value: "$1,225.00",
            change: "+$125",
            note: "from yesterday",
          },
        ].map((stat, index) => (
          <div
            key={index}
            className="bg-gradient-to-br from-[#b993ff] to-[#68f2b3] p-6 rounded-lg shadow-md"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-sm text-gray-700">{stat.title}</p>
                <h3 className="text-2xl font-bold text-gray-900">
                  {stat.value}
                </h3>
              </div>
              <span className="bg-white p-2 rounded-lg shadow-sm">
                <svg
                  className="w-6 h-6 text-gray-800"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </span>
            </div>
            {stat.change && (
              <div className="flex items-center text-sm">
                <span className="text-gray-900 font-semibold flex items-center">
                  <svg
                    className="w-4 h-4 mr-1"
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
                  {stat.change}
                </span>
                <span className="text-gray-700 ml-2">{stat.note}</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Solana Price Chart */}
      <div className="mt-12 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Real-Time Solana Price
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={solanaData}>
            <XAxis dataKey="time" tick={{ fill: "#4B5563" }} />
            <YAxis domain={["auto", "auto"]} tick={{ fill: "#4B5563" }} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="price"
              stroke="#6366F1"
              strokeWidth={3}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
};

export default Dashboard;
