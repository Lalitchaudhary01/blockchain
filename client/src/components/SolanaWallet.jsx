import { useState, useEffect } from "react";
import {
  Connection,
  PublicKey,
  LAMPORTS_PER_SOL,
  clusterApiUrl,
  Transaction,
  SystemProgram,
  sendAndConfirmTransaction,
} from "@solana/web3.js";

const SolanaWallet = () => {
  const [walletAddress, setWalletAddress] = useState(null);
  const [balance, setBalance] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [withdrawAddress, setWithdrawAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [addAmount, setAddAmount] = useState("");
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

  useEffect(() => {
    if (walletAddress) {
      fetchBalance(walletAddress);
      fetchTransactions(walletAddress);
    }
  }, [walletAddress]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 to-purple-900 p-5">
      <div className="bg-white/10 shadow-xl backdrop-blur-lg rounded-xl p-8 w-full max-w-2xl text-white">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Solana Wallet</h2>
          {walletAddress ? (
            <button
              onClick={() => setWalletAddress(null)}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded shadow-md"
            >
              Disconnect
            </button>
          ) : (
            <button
              onClick={connectWallet}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded shadow-md"
            >
              Connect Wallet
            </button>
          )}
        </div>

        {walletAddress && (
          <div className="p-4 bg-white/20 rounded-lg mb-4">
            <p className="text-gray-300">Wallet Address</p>
            <h3 className="text-md font-semibold break-words">
              {walletAddress}
            </h3>
          </div>
        )}

        <div className="flex gap-4 mb-6">
          <div className="p-4 bg-white/20 rounded-lg flex-1">
            <p className="text-gray-300">Available Balance</p>
            <h3 className="text-2xl font-bold">
              {walletAddress ? `${balance} SOL` : "-"}
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="p-4 bg-white/20 rounded-lg">
            <p className="text-gray-300">Total Staked SOL</p>
            <h3 className="text-xl font-bold">{stakedSOL ?? "-"} SOL</h3>
            <p className="text-gray-400">
              ≈ ${stakedSOL ? (stakedSOL * 100).toFixed(2) : "-"} USD
            </p>
          </div>
          <div className="p-4 bg-white/20 rounded-lg">
            <p className="text-gray-300">Current APY</p>
            <h3 className="text-xl font-bold text-green-400">{apy}%</h3>
            <p className="text-green-300">+{apyChange}% from last week</p>
          </div>
          <div className="p-4 bg-white/20 rounded-lg">
            <p className="text-gray-300">Total Earnings</p>
            <h3 className="text-xl font-bold">{earnings ?? "-"} SOL</h3>
            <p className="text-gray-400">
              ≈ ${earnings ? (earnings * 100).toFixed(2) : "-"} USD
            </p>
          </div>
          <div className="p-4 bg-white/20 rounded-lg">
            <p className="text-gray-300">Next Payout</p>
            <h3 className="text-xl font-bold">{nextPayout ?? "-"} SOL</h3>
            <p className="text-gray-400">in 12 hours</p>
          </div>
        </div>

        <div className="p-4 bg-white/20 rounded-lg">
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

export default SolanaWallet;
