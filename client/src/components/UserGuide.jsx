import { useState } from "react";
import {
  WalletIcon,
  CurrencyDollarIcon,
  ChartBarIcon,
  ArrowUpTrayIcon,
} from "@heroicons/react/24/outline";

export default function UserGuide() {
  const [openFaq, setOpenFaq] = useState(null);

  const steps = [
    {
      number: 1,
      icon: WalletIcon,
      title: "Connect Wallet",
      description: "Choose Phantom or Solflare wallet",
      buttons: ["Phantom", "Solflare"],
    },
    {
      number: 2,
      icon: CurrencyDollarIcon,
      title: "Deposit SOL",
      description: "Minimum deposit is 1 SOL",
      stats: [{ label: "Minimum Stake", value: "1 SOL" }],
    },
    {
      number: 3,
      icon: ChartBarIcon,
      title: "Start Earning",
      description: "Earn 3-5% daily returns",
      stats: [
        { label: "Daily Returns", value: "3-5%" },
        { label: "APY", value: "1,825%" },
      ],
    },
    {
      number: 4,
      icon: ArrowUpTrayIcon,
      title: "Withdraw Anytime",
      description: "No lock-up period",
      button: "View Guide",
    },
  ];

  const faqs = [
    {
      question: "How are returns generated?",
      answer: "Through staking rewards and DeFi strategies",
    },
    {
      question: "Is there a lock-up period?",
      answer: "No, withdraw anytime without penalties",
    },
  ];

  return (
    <section id="userGuide" className="py-20 bg-neutral-800">
      <h3 className="text-2xl font-bold text-white mb-6 text-center">FAQs</h3>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={faq.question}
            className="border border-neutral-700 rounded-lg"
          >
            <button
              className="w-full flex justify-between items-center p-4 text-left"
              onClick={() => setOpenFaq(openFaq === index ? null : index)}
            >
              <span className="text-white font-medium">{faq.question}</span>
              <svg
                className={`w-5 h-5 text-purple-500 transform transition-transform ${
                  openFaq === index ? "rotate-180" : ""
                }`}
              >
                <path
                  stroke="currentColor"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {openFaq === index && (
              <div className="p-4 pt-0 text-gray-300">{faq.answer}</div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
