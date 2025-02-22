import React from "react";
import Sidebar from "./Sidebar";
import Wallet from "./Wallet";
import InvestmentCalculator from "./InvestmentCalculator";
import Dashboard from "./Dashboard";

const Home = () => {
  return (
    <div className="flex bg-[#E5E7EB] min-h-screen">
      <Sidebar />
      <main className="flex-1 lg:ml-64 h-screen overflow-y-auto">
        <Dashboard />
        <InvestmentCalculator />
        <Wallet />
      </main>
    </div>
  );
};

export default Home;
