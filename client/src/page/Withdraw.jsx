import React, { useState } from "react";
import { FaWallet } from "react-icons/fa";

const Withdraw = () => {
  const [walletAddress, setWalletAddress] = useState("");
  const [amount, setAmount] = useState("");

  return (
    <section className="p-6 bg-gray-100  min-h-screen text-white">
      <div className="max-w-lg mx-auto bg-gray-900 p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-green-400">Withdraw Funds</h2>
        <p className="text-gray-300 mt-2">Securely withdraw your SOL funds.</p>

        {/* Balance Display */}
        <div className="mt-4 bg-gray-800 p-4 rounded-lg flex justify-between items-center">
          <span className="text-green-400 text-lg font-bold">Balance:</span>
          <span className="text-white text-lg">0.00 SOL</span>
        </div>

        {/* Amount Input */}
        <div className="mt-4">
          <label className="block text-gray-300">Amount (SOL)</label>
          <div className="flex items-center bg-gray-800 p-2 rounded-lg">
            <span className="text-green-400 mr-2">💰 SOL</span>
            <input
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full p-2 bg-gray-800 text-white rounded-lg"
            />
          </div>
        </div>

        {/* Wallet Address Input */}
        <div className="mt-4">
          <label className="block text-gray-300">Wallet Address</label>
          <div className="flex items-center bg-gray-800 p-2 rounded-lg">
            <FaWallet className="text-green-400 mr-2" />
            <input
              type="text"
              placeholder="Enter your Solana wallet address"
              value={walletAddress}
              onChange={(e) => setWalletAddress(e.target.value)}
              className="w-full p-2 bg-gray-800 text-white rounded-lg"
            />
          </div>
        </div>

        {/* Withdraw Button */}
        <button
          className="w-full mt-6 bg-green-500 text-black py-2 rounded-lg hover:bg-green-400"
          onClick={() => alert("Withdrawal Request Sent!")}
        >
          Withdraw
        </button>

        {/* SOL Price Display */}
        <div className="mt-4 bg-gray-800 p-2 rounded-lg text-center text-gray-400">
          SOL = $103.50
        </div>
      </div>
    </section>
  );
};

export default Withdraw;
