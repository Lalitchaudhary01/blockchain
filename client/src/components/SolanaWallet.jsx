import { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

const SolanaWallet = () => {
  const [balance, setBalance] = useState(4.52);
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  // Mock SOL address (replace with actual user ID logic)
  const solanaAddress = "4tXg6x4Z7v...ReNz9P5sD";

  const handleAddFunds = () => {
    // In a real app, this would trigger a payment gateway
    alert("Redirecting to payment gateway...");
  };

  const handleWithdraw = () => {
    const amount = parseFloat(withdrawAmount);
    if (amount > 0 && amount <= balance) {
      setBalance((prev) => prev - amount);
      setWithdrawAmount("");
      alert(`Withdrawal of ${amount} SOL initiated!`);
    } else {
      alert("Invalid withdrawal amount");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#9945FF] to-[#14F195] flex items-center justify-center p-5">
      <div className="bg-[#1A1A1A] rounded-xl p-8 w-full max-w-md text-white shadow-2xl">
        <h2 className="text-[#14F195] text-2xl font-bold text-center mb-6">
          Solana Wallet
        </h2>

        <div className="text-center mb-8">
          <p className="text-gray-400 mb-2">Available Balance</p>
          <h1 className="text-[#9945FF] text-4xl font-bold">{balance} SOL</h1>
        </div>

        <div className="mb-8">
          <h3 className="text-[#14F195] font-semibold mb-4">Add Funds</h3>
          <div className="flex items-center gap-2 bg-[#2A2A2A] p-3 rounded-lg mb-4">
            <span className="text-gray-400 truncate">{solanaAddress}</span>
            <CopyToClipboard
              text={solanaAddress}
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
          <h3 className="text-[#14F195] font-semibold mb-4">Withdraw SOL</h3>
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
      </div>
    </div>
  );
};

export default SolanaWallet;
