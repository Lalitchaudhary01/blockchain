import { useState, useEffect } from "react";
import {
  Connection,
  PublicKey,
  LAMPORTS_PER_SOL,
  clusterApiUrl,
} from "@solana/web3.js";

const SolanaWalletUI = () => {
  const [walletAddress, setWalletAddress] = useState(null);
  const [balance, setBalance] = useState(null);
  const [stakedAmount, setStakedAmount] = useState(0);
  const [amount, setAmount] = useState("");
  const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

  useEffect(() => {
    if (walletAddress) {
      fetchBalance(walletAddress);
    }
  }, [walletAddress]);

  const connectWallet = async () => {
    if (window.solana && window.solana.isPhantom) {
      try {
        const response = await window.solana.connect();
        setWalletAddress(response.publicKey.toString());
      } catch (err) {
        console.error("Wallet connection failed", err);
      }
    } else {
      alert("Phantom Wallet not found. Please install it.");
      window.open("https://phantom.app/", "_blank");
    }
  };

  const fetchBalance = async (pubKey) => {
    try {
      const balanceInLamports = await connection.getBalance(
        new PublicKey(pubKey)
      );
      setBalance(balanceInLamports / LAMPORTS_PER_SOL);
    } catch (error) {
      console.error("Failed to fetch balance:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-5">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-2xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Wallet Balance</h2>
          {walletAddress ? (
            <button
              onClick={() => setWalletAddress(null)}
              className="bg-purple-600 text-white px-4 py-2 rounded"
            >
              Disconnect
            </button>
          ) : (
            <button
              onClick={connectWallet}
              className="bg-purple-600 text-white px-4 py-2 rounded"
            >
              Connect
            </button>
          )}
        </div>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="p-4 bg-gray-200 rounded">
            <p className="text-gray-600">Available Balance</p>
            <h3 className="text-2xl font-bold">
              {walletAddress ? `${balance} SOL` : "-"}
            </h3>
          </div>
          <div className="p-4 bg-gray-200 rounded">
            <p className="text-gray-600">Staked Amount</p>
            <h3 className="text-2xl font-bold">
              {walletAddress ? `${stakedAmount} SOL` : "-"}
            </h3>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-gray-200 rounded">
            <h3 className="font-bold mb-2">Deposit Funds</h3>
            <input
              type="number"
              className="w-full p-2 mb-2 border rounded"
              placeholder="Enter SOL amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <button className="w-full bg-purple-600 text-white p-2 rounded">
              Deposit
            </button>
          </div>
          <div className="p-4 bg-gray-200 rounded">
            <h3 className="font-bold mb-2">Withdraw Funds</h3>
            <input
              type="number"
              className="w-full p-2 mb-2 border rounded"
              placeholder="Enter SOL amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <button className="w-full bg-purple-600 text-white p-2 rounded">
              Withdraw
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SolanaWalletUI;
