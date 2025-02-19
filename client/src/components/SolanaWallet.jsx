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
  const [tokenBalances, setTokenBalances] = useState([]);
  const [withdrawAddress, setWithdrawAddress] = useState("");
  const [amount, setAmount] = useState("");

  const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

  // Connect Phantom Wallet
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

  // Fetch Wallet Balance
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

  // Fetch Recent Transactions
  const fetchTransactions = async (pubKey) => {
    try {
      const signatureInfo = await connection.getSignaturesForAddress(
        new PublicKey(pubKey)
      );
      setTransactions(signatureInfo.slice(0, 5)); // Get last 5 transactions
    } catch (error) {
      console.error("Failed to fetch transactions:", error);
    }
  };

  // Fetch Token Balances (SPL Tokens)
  const fetchTokenAccounts = async (pubKey) => {
    try {
      const tokenAccounts = await connection.getParsedTokenAccountsByOwner(
        new PublicKey(pubKey),
        {
          programId: new PublicKey(
            "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
          ),
        }
      );
      setTokenBalances(tokenAccounts.value);
    } catch (error) {
      console.error("Failed to fetch token balances:", error);
    }
  };

  // Withdraw Funds
  const withdrawFunds = async () => {
    if (!withdrawAddress || !amount) {
      alert("Enter a valid address and amount");
      return;
    }

    try {
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: new PublicKey(walletAddress),
          toPubkey: new PublicKey(withdrawAddress),
          lamports: parseFloat(amount) * LAMPORTS_PER_SOL,
        })
      );

      const { signature } = await window.solana.signAndSendTransaction(
        transaction
      );

      await sendAndConfirmTransaction(connection, transaction, [
        window.solana.publicKey,
      ]);

      alert(`Transaction successful! Tx Signature: ${signature}`);
      fetchBalance(walletAddress); // Update balance
    } catch (error) {
      console.error("Transaction failed:", error);
      alert("Transaction failed! Please check the address and balance.");
    }
  };

  // Fetch all wallet data on connection
  useEffect(() => {
    if (walletAddress) {
      fetchBalance(walletAddress);
      fetchTransactions(walletAddress);
      fetchTokenAccounts(walletAddress);
    }
  }, [walletAddress]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-5">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-2xl">
        {/* Connect/Disconnect Button */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Solana Wallet</h2>
          {walletAddress ? (
            <button
              onClick={() => setWalletAddress(null)}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Disconnect
            </button>
          ) : (
            <button
              onClick={connectWallet}
              className="bg-purple-600 text-white px-4 py-2 rounded"
            >
              Connect Wallet
            </button>
          )}
        </div>

        {/* Wallet Address */}
        {walletAddress && (
          <div className="p-4 bg-gray-200 rounded mb-4">
            <p className="text-gray-600">Wallet Address</p>
            <h3 className="text-md font-bold break-words">{walletAddress}</h3>
          </div>
        )}

        {/* Balance Display */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="p-4 bg-gray-200 rounded">
            <p className="text-gray-600">Available Balance</p>
            <h3 className="text-2xl font-bold">
              {walletAddress ? `${balance} SOL` : "-"}
            </h3>
          </div>
        </div>

        {/* Add Funds */}
        {walletAddress && (
          <div className="p-4 bg-gray-200 rounded mb-4">
            <h3 className="font-bold mb-2">Add Funds</h3>
            <a
              href="https://faucet.solana.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-500 text-white px-4 py-2 rounded block text-center"
            >
              Get Free Devnet SOL
            </a>
          </div>
        )}

        {/* Withdraw Funds */}
        {walletAddress && (
          <div className="p-4 bg-gray-200 rounded mb-4">
            <h3 className="font-bold mb-2">Withdraw Funds</h3>
            <input
              type="text"
              placeholder="Enter recipient address"
              value={withdrawAddress}
              onChange={(e) => setWithdrawAddress(e.target.value)}
              className="w-full p-2 mb-2 border rounded"
            />
            <input
              type="number"
              placeholder="Enter amount (SOL)"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full p-2 mb-2 border rounded"
            />
            <button
              onClick={withdrawFunds}
              className="bg-green-500 text-white px-4 py-2 rounded w-full"
            >
              Send SOL
            </button>
          </div>
        )}

        {/* Recent Transactions */}
        <div className="p-4 bg-gray-200 rounded mb-4">
          <h3 className="font-bold mb-2">Recent Transactions</h3>
          {transactions.length > 0 ? (
            transactions.map((tx, index) => (
              <p key={index} className="text-sm">
                {tx.signature.slice(0, 20)}...{" "}
                <a
                  href={`https://explorer.solana.com/tx/${tx.signature}?cluster=devnet`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500"
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
