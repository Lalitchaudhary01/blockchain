import React, { useState } from "react";

const Wallet = () => {
  const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);

  const toggleDepositModal = () => setIsDepositModalOpen(!isDepositModalOpen);
  const toggleWithdrawModal = () =>
    setIsWithdrawModalOpen(!isWithdrawModalOpen);

  return (
    <section id="wallet" className="min-h-screen bg-[#E5E7EB] p-6">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <h2 className="text-3xl font-bold text-[#0F1C2E]">Wallet</h2>
          <p className="text-neutral-600">Manage your crypto assets securely</p>
        </header>

        {/* Wallet Balance Card */}
        <div className="bg-white rounded-lg border border-neutral-200/30 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <p className="text-sm text-neutral-600 mb-1">Total Balance</p>
              <h3 className="text-2xl font-bold text-[#0F1C2E]">$24,500.00</h3>
              <span className="text-green-500 text-sm flex items-center mt-1">
                +2.5% today
              </span>
            </div>
            <div>
              <p className="text-sm text-neutral-600 mb-1">
                Active Investments
              </p>
              <h3 className="text-2xl font-bold text-[#0F1C2E]">4</h3>
              <p className="text-neutral-500 text-sm mt-1">Total Plans</p>
            </div>
            <div>
              <p className="text-sm text-neutral-600 mb-1">Total Deposited</p>
              <h3 className="text-2xl font-bold text-[#0F1C2E]">$20,000.00</h3>
              <p className="text-neutral-500 text-sm mt-1">Lifetime</p>
            </div>
            <div>
              <p className="text-sm text-neutral-600 mb-1">Total Withdrawn</p>
              <h3 className="text-2xl font-bold text-[#0F1C2E]">$5,500.00</h3>
              <p className="text-neutral-500 text-sm mt-1">Lifetime</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <button
            onClick={toggleDepositModal}
            className="flex items-center justify-center p-4 bg-[#F7931A] text-white rounded-lg hover:bg-[#F7931A]/90 transition-colors"
          >
            Deposit Funds
          </button>
          <button
            onClick={toggleWithdrawModal}
            className="flex items-center justify-center p-4 bg-[#0F1C2E] text-white rounded-lg hover:bg-[#0F1C2E]/90 transition-colors"
          >
            Withdraw Funds
          </button>
        </div>

        {/* Transaction History */}
        <div className="bg-white rounded-lg border border-neutral-200/30 p-6">
          <h3 className="text-xl font-semibold text-[#0F1C2E] mb-6">
            Transaction History
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-neutral-200/30">
                  <th className="text-left p-4 text-neutral-600">Type</th>
                  <th className="text-left p-4 text-neutral-600">Amount</th>
                  <th className="text-left p-4 text-neutral-600">Status</th>
                  <th className="text-left p-4 text-neutral-600">Date</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-neutral-200/30">
                  <td className="p-4">
                    <span className="flex items-center text-green-500">
                      Deposit
                    </span>
                  </td>
                  <td className="p-4 text-[#0F1C2E] font-medium">$10,000.00</td>
                  <td className="p-4">
                    <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm">
                      Completed
                    </span>
                  </td>
                  <td className="p-4 text-neutral-600">2024-02-20 14:30</td>
                </tr>
                <tr className="border-b border-neutral-200/30">
                  <td className="p-4">
                    <span className="flex items-center text-red-500">
                      Withdrawal
                    </span>
                  </td>
                  <td className="p-4 text-[#0F1C2E] font-medium">$5,500.00</td>
                  <td className="p-4">
                    <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm">
                      Completed
                    </span>
                  </td>
                  <td className="p-4 text-neutral-600">2024-02-19 09:15</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Deposit Modal */}
      {isDepositModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-[#0F1C2E]">
                Deposit Funds
              </h3>
              <button
                onClick={toggleDepositModal}
                className="text-neutral-400 hover:text-neutral-600"
              >
                Close
              </button>
            </div>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-600 mb-1">
                  Amount (USD)
                </label>
                <input
                  type="number"
                  className="w-full p-3 border border-neutral-200 rounded-lg focus:outline-none focus:border-[#F7931A]"
                  placeholder="Enter amount"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#F7931A] text-white p-3 rounded-lg hover:bg-[#F7931A]/90 transition-colors"
              >
                Continue to Payment
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Withdraw Modal */}
      {isWithdrawModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-[#0F1C2E]">
                Withdraw Funds
              </h3>
              <button
                onClick={toggleWithdrawModal}
                className="text-neutral-400 hover:text-neutral-600"
              >
                Close
              </button>
            </div>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-600 mb-1">
                  Amount (USD)
                </label>
                <input
                  type="number"
                  className="w-full p-3 border border-neutral-200 rounded-lg focus:outline-none focus:border-[#F7931A]"
                  placeholder="Enter amount"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-600 mb-1">
                  Bitcoin Address
                </label>
                <input
                  type="text"
                  className="w-full p-3 border border-neutral-200 rounded-lg focus:outline-none focus:border-[#F7931A]"
                  placeholder="Enter your BTC address"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#0F1C2E] text-white p-3 rounded-lg hover:bg-[#0F1C2E]/90 transition-colors"
              >
                Request Withdrawal
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default Wallet;
