import React from "react";

const Dashboard = () => {
  return (
    <section id="dashboard" className=" bg-gray-200 p-6">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-neutral-600">
          Welcome back! Here's your investment summary
        </p>
      </header>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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
          // {
          //   title: "Total Earnings",
          //   value: "$147,500.00",
          //   change: "+12.5%",
          //   note: "all time",
          // },
        ].map((stat, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg border border-neutral-200/30"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-sm text-neutral-600">{stat.title}</p>
                <h3 className="text-2xl font-bold text-gray-900">
                  {stat.value}
                </h3>
              </div>
              <span className="bg-orange-200 p-2 rounded-lg">
                <svg
                  className="w-6 h-6 text-orange-500"
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
                <span className="text-green-500 flex items-center">
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
                <span className="text-neutral-500 ml-2">{stat.note}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Dashboard;
