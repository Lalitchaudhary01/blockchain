import { useState, useEffect } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import {
  Connection,
  PublicKey,
  LAMPORTS_PER_SOL,
  clusterApiUrl,
  Transaction,
  SystemProgram,
  Keypair,
} from "@solana/web3.js";

const SolanaWallet = () => {
  const [walletAddress, setWalletAddress] = useState(null);
  const [idealWallet, setIdealWallet] = useState(null);
  const [balance, setBalance] = useState(0);
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [recipientAddress, setRecipientAddress] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

  useEffect(() => {
    if (window.solana && window.solana.isPhantom) {
      console.log("Phantom wallet found");
    } else {
      console.log("Phantom wallet not found, generating Ideal Wallet...");
      createIdealWallet();
    }
  }, []);

  const createIdealWallet = () => {
    const keypair = Keypair.generate();
    const idealAddress = keypair.publicKey.toString();
    setIdealWallet(idealAddress);
    setWalletAddress(idealAddress); // Set as default if Phantom not connected
    console.log("Ideal Wallet Created:", idealAddress);
  };

  const connectWallet = async () => {
    if (window.solana && window.solana.isPhantom) {
      try {
        const response = await window.solana.connect();
        const pubKey = response.publicKey.toString();
        setWalletAddress(pubKey);
        console.log("Connected with Public Key:", pubKey);
        fetchBalance(pubKey);
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

  const handleAddFunds = () => {
    alert("Redirecting to payment gateway...");
  };

  const handleWithdraw = async () => {
    const amount = parseFloat(withdrawAmount);
    if (
      !walletAddress ||
      !recipientAddress ||
      amount <= 0 ||
      amount > balance
    ) {
      alert("Invalid withdrawal details");
      return;
    }

    try {
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: new PublicKey(walletAddress),
          toPubkey: new PublicKey(recipientAddress),
          lamports: amount * LAMPORTS_PER_SOL,
        })
      );

      const { signature } = await window.solana.signAndSendTransaction(
        transaction
      );
      alert(`Transaction sent: ${signature}`);
      setWithdrawAmount("");
      fetchBalance(walletAddress);
    } catch (error) {
      console.error("Transaction failed", error);
      alert("Transaction failed!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#9945FF] to-[#14F195] flex items-center justify-center p-5">
      <div className="bg-[#1A1A1A] rounded-xl p-8 w-full max-w-md text-white shadow-2xl">
        <h2 className="text-[#14F195] text-2xl font-bold text-center mb-6">
          Solana Wallet
        </h2>

        {!walletAddress ? (
          <>
            <p className="text-center text-gray-400 mb-4">
              No wallet connected. Use an Ideal Wallet or connect Phantom
              Wallet.
            </p>
            <button
              onClick={connectWallet}
              className="w-full bg-[#9945FF] text-white p-4 rounded-lg hover:opacity-90 transition-opacity font-semibold"
            >
              Connect Phantom Wallet
            </button>
          </>
        ) : (
          <>
            <div className="text-center mb-8">
              <p className="text-gray-400 mb-2">Connected Wallet</p>
              <span className="text-sm text-gray-300 truncate">
                {walletAddress}
              </span>
            </div>

            <div className="text-center mb-8">
              <p className="text-gray-400 mb-2">Available Balance</p>
              <h1 className="text-[#9945FF] text-4xl font-bold">
                {balance} SOL
              </h1>
            </div>

            <div className="mb-8">
              <h3 className="text-[#14F195] font-semibold mb-4">Add Funds</h3>
              <div className="flex items-center gap-2 bg-[#2A2A2A] p-3 rounded-lg mb-4">
                <span className="text-gray-400 truncate">{walletAddress}</span>
                <CopyToClipboard
                  text={walletAddress}
                  onCopy={() => setIsCopied(true)}
                >
                  <button className="bg-[#9945FF] text-white px-4 py-2 rounded hover:opacity-90 transition-opacity">
                    {isCopied ? "Copied!" : "Copy"}
                  </button>
                </CopyToClipboard>
              </div>
              <button
                onClick={handleAddFunds}
                className="w-full bg-[#9945FF] text-white p-4 rounded-lg hover:opacity-90 transition-opacity font-semibold"
              >
                Deposit SOL
              </button>
            </div>

            <div>
              <h3 className="text-[#14F195] font-semibold mb-4">
                Withdraw SOL
              </h3>
              <input
                type="text"
                value={recipientAddress}
                onChange={(e) => setRecipientAddress(e.target.value)}
                placeholder="Recipient Address"
                className="w-full p-3 mb-2 bg-[#2A2A2A] text-white rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#9945FF]"
              />
              <input
                type="number"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
                placeholder="Amount in SOL"
                className="w-full p-3 mb-4 bg-[#2A2A2A] text-white rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#9945FF]"
              />
              <button
                onClick={handleWithdraw}
                className="w-full bg-[#14F195] text-white p-4 rounded-lg hover:opacity-90 transition-opacity font-semibold"
              >
                Withdraw
              </button>
            </div>
          </>
        )}

        {walletAddress === idealWallet && (
          <div className="text-center mt-4">
            <p className="text-gray-400">Using Ideal Wallet</p>
            <button
              onClick={connectWallet}
              className="mt-2 bg-[#14F195] text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
            >
              Connect Phantom Wallet
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SolanaWallet;
