import React, { useState } from "react";
import { QRCodeCanvas } from "qrcode.react"; // Correct import

const Deposit = () => {
  const [amount, setAmount] = useState(500);
  const [timeframe, setTimeframe] = useState(30);
  const [manualAmount, setManualAmount] = useState("");
  const [depositMade, setDepositMade] = useState(false);
  const [depositAddress, setDepositAddress] = useState(""); // State for deposit address

  const handleDeposit = () => {
    if (depositAddress.trim() === "") {
      alert("Please enter a deposit address before proceeding!");
      return;
    }
    setDepositMade(true);
  };

  if (depositMade) {
    return (
      <section className="p-6 bg-black min-h-screen text-white">
        <div className="max-w-lg mx-auto bg-gray-900 p-6 rounded-xl shadow-lg text-center">
          <h2 className="text-2xl font-bold text-green-400">Deposit Address</h2>
          <p className="mt-2 text-gray-300">
            Copy the address below or scan the QR code
          </p>
          <div className="mt-4 bg-gray-800 p-2 rounded-lg flex justify-between items-center">
            <span className="text-green-400 text-sm">{depositAddress}</span>
            <button
              className="bg-blue-500 text-white px-3 py-1 rounded-lg text-sm"
              onClick={() => navigator.clipboard.writeText(depositAddress)}
            >
              Copy
            </button>
          </div>
          <div className="mt-4">
            <p className="text-gray-300">Or Scan the QR Code</p>
            <QRCodeCanvas
              value={depositAddress}
              size={128}
              className="mx-auto mt-2"
            />
          </div>
          <p className="mt-4 text-red-500">Please send the correct amount</p>
          <button
            className="mt-6 bg-green-500 text-black py-2 px-6 rounded-lg hover:bg-green-400"
            onClick={() => alert("Payment Confirmed!")}
          >
            Payment Successful
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="p-6 bg-black min-h-screen text-white">
      <div className="max-w-lg mx-auto bg-gray-900 p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-green-400">Solana Staking</h2>
        <p className="text-gray-300 mt-2">Select staking amount & timeframe</p>

        <div className="mt-4">
          <label className="block text-gray-300">Deposit Address</label>
          <input
            type="text"
            placeholder="Enter your deposit address"
            value={depositAddress}
            onChange={(e) => setDepositAddress(e.target.value)}
            className="w-full p-2 bg-gray-800 text-white rounded-lg mt-2"
          />
        </div>

        <div className="mt-4">
          <label className="block text-gray-300">Amount (SOL)</label>
          <div className="flex items-center bg-gray-800 p-2 rounded-lg">
            <span className="text-green-400 mr-2">💰 SOL</span>
            <input
              type="number"
              placeholder="Enter amount manually"
              value={manualAmount}
              onChange={(e) => setManualAmount(e.target.value)}
              className="w-full p-2 bg-gray-800 text-white rounded-lg"
            />
          </div>
        </div>

        <button
          className="w-full mt-6 bg-green-500 text-black py-2 rounded-lg hover:bg-green-400"
          onClick={handleDeposit}
        >
          Deposit
        </button>

        <div className="mt-4 p-4 bg-gray-800 rounded-lg">
          <div className="mt-4">
            <input
              type="range"
              min="50"
              max="5000"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full mt-2"
            />
            <p className="text-green-400 text-lg">{amount} SOL</p>
            <label className="block text-gray-300">Timeframe (days)</label>
            <input
              type="range"
              min="7"
              max="365"
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value)}
              className="w-full"
            />
            <p className="text-green-400 text-lg">{timeframe} days</p>
          </div>
          <h3 className="text-lg font-bold text-green-400">
            Estimated Returns
          </h3>
          <p className="text-green-400 text-lg font-bold">
            {(amount * 2.5).toFixed(2)} SOL
          </p>
        </div>
      </div>
    </section>
  );
};

export default Deposit;
