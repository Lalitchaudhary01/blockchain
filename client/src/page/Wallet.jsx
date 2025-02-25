import { useState, useEffect } from "react";
import {
  Connection,
  PublicKey,
  LAMPORTS_PER_SOL,
  clusterApiUrl,
} from "@solana/web3.js";

const Wallet = () => {
  const [walletAddress, setWalletAddress] = useState(null);
  const [balance, setBalance] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [stakedSOL, setStakedSOL] = useState(null);
  const [apy, setApy] = useState(5.5);
  const [apyChange, setApyChange] = useState(0.5);
  const [earnings, setEarnings] = useState(null);
  const [nextPayout, setNextPayout] = useState(null);

  const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

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

  const fetchTransactions = async (pubKey) => {
    try {
      const signatureInfo = await connection.getSignaturesForAddress(
        new PublicKey(pubKey)
      );
      setTransactions(signatureInfo.slice(0, 5));
    } catch (error) {
      console.error("Failed to fetch transactions:", error);
    }
  };

  const handleAddFunds = async () => {
    alert("Feature to add funds coming soon!");
  };

  const handleWithdrawFunds = async () => {
    alert("Feature to withdraw funds coming soon!");
  };

  useEffect(() => {
    if (walletAddress) {
      fetchBalance(walletAddress);
      fetchTransactions(walletAddress);
    }
  }, [walletAddress]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#E5E7EB] text-white p-5">
      <div className="bg-gray-900 shadow-xl rounded-xl p-8 w-full max-w-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Solana Wallet</h2>
          {walletAddress ? (
            <button
              onClick={() => setWalletAddress(null)}
              className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
            >
              Disconnect
            </button>
          ) : (
            <button
              onClick={connectWallet}
              className="bg-white text-black hover:bg-gray-300 px-4 py-2 rounded"
            >
              Connect Wallet
            </button>
          )}
        </div>

        {walletAddress && (
          <div className="p-4 bg-gray-800 rounded-lg mb-4">
            <p className="text-gray-400">Wallet Address</p>
            <h3 className="text-md font-semibold break-words">
              {walletAddress}
            </h3>
          </div>
        )}

        <div className="p-4 bg-gray-800 rounded-lg mb-6">
          <p className="text-gray-400">Available Balance</p>
          <h3 className="text-2xl font-bold">
            {walletAddress ? `${balance} SOL` : "-"}
          </h3>
        </div>

        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="p-4 bg-gray-800 rounded-lg">
            <p className="text-gray-400">Total Staked SOL</p>
            <h3 className="text-xl font-bold">{stakedSOL ?? "-"} SOL</h3>
          </div>
          <div className="p-4 bg-gray-800 rounded-lg">
            <p className="text-gray-400">Current APY</p>
            <h3 className="text-xl font-bold text-green-400">{apy}%</h3>
          </div>
          <div className="p-4 bg-gray-800 rounded-lg">
            <p className="text-gray-400">Total Earnings</p>
            <h3 className="text-xl font-bold">{earnings ?? "-"} SOL</h3>
          </div>
          <div className="p-4 bg-gray-800 rounded-lg">
            <p className="text-gray-400">Next Payout</p>
            <h3 className="text-xl font-bold">{nextPayout ?? "-"} SOL</h3>
          </div>
        </div>

        <div className="flex gap-4 mb-6">
          <button
            onClick={handleAddFunds}
            className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded"
          >
            Add Funds
          </button>
          <button
            onClick={handleWithdrawFunds}
            className="bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded"
          >
            Withdraw Funds
          </button>
        </div>

        <div className="p-4 bg-gray-800 rounded-lg">
          <h3 className="font-bold mb-2">Recent Transactions</h3>
          {transactions.length > 0 ? (
            transactions.map((tx, index) => (
              <p key={index} className="text-sm">
                {tx.signature.slice(0, 20)}...{" "}
                <a
                  href={`https://explorer.solana.com/tx/${tx.signature}?cluster=devnet`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-300"
                >
                  View
                </a>
              </p>
            ))
          ) : (
            <p>No transactions found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Wallet;
