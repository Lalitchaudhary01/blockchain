import { useState } from "react";

export default function StakingModal({ onClose }) {
  const [balance, setBalance] = useState("0.00");
  const [amount, setAmount] = useState("");

  const handleDeposit = () => {
    // Placeholder function for depositing SOL
    alert(`Depositing ${amount} SOL`);
    setAmount("");
  };

  const handleWithdraw = () => {
    // Placeholder function for withdrawing SOL
    alert(`Withdrawing ${amount} SOL`);
    setAmount("");
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
      <div className="bg-neutral-800 p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-white mb-4">Solana Wallet</h2>

        <div className="mb-4 p-4 bg-neutral-700 rounded-lg">
          <p className="text-gray-300">Wallet Balance:</p>
          <h3 className="text-3xl font-bold text-purple-500">{balance} SOL</h3>
        </div>

        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full bg-neutral-700 text-white rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="Enter amount (SOL)"
        />

        <div className="flex flex-col gap-3">
          <button
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 w-full"
            onClick={handleDeposit}
          >
            Deposit
          </button>
          <button
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 w-full"
            onClick={handleWithdraw}
          >
            Withdraw
          </button>
        </div>

        <button
          className="mt-4 w-full text-gray-300 hover:text-white"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
}
