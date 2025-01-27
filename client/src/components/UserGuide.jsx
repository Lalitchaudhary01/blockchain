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
      {/* <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Getting Started
          </h2>
          <p className="text-gray-300 text-xl">Guide to successful staking</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {steps.map((step) => (
            <div
              key={step.number}
              className="bg-neutral-900 rounded-xl p-8 hover:transform hover:scale-105 transition-all duration-300"
            >
              <div className="inline-block bg-purple-500/20 rounded-full p-3 mb-4">
                <span className="text-2xl font-bold text-purple-500">
                  {step.number}
                </span>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">
                {step.title}
              </h3>
              <p className="text-gray-300 mb-4">{step.description}</p>

              {step.buttons && (
                <div className="flex gap-4">
                  {step.buttons.map((button) => (
                    <button
                      key={button}
                      className="flex items-center gap-2 bg-neutral-700 hover:bg-neutral-600 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                      <WalletIcon className="w-5 h-5" />
                      {button}
                    </button>
                  ))}
                </div>
              )}

              {step.stats && (
                <div className="bg-neutral-700 p-4 rounded-lg mt-4">
                  {step.stats.map((stat) => (
                    <div
                      key={stat.label}
                      className="flex justify-between mb-2 last:mb-0"
                    >
                      <span className="text-gray-400">{stat.label}</span>
                      <span className="text-white font-bold">{stat.value}</span>
                    </div>
                  ))}
                </div>
              )}

              {step.button && (
                <button className="w-full bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-colors mt-4">
                  {step.button}
                </button>
              )}
            </div>
          ))}
        </div> */}

      <div className="mt-16 bg-neutral-900 rounded-xl p-8">
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
      </div>
    </section>
  );
}
