import {
  ChatBubbleOvalLeftIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/outline";

export default function SupportSection() {
  const supportOptions = [
    {
      icon: ChatBubbleOvalLeftIcon,
      title: "Live Chat",
      description: "Available 24/7",
      action: "Start Chat",
    },
    {
      icon: EnvelopeIcon,
      title: "Email Support",
      description: "support@solstake.com",
      action: "Send Email",
    },
  ];

  const knowledgeBase = [
    { title: "Getting Started Guide", description: "Learn SOL staking basics" },
    { title: "Security Best Practices", description: "Keep assets safe" },
    { title: "Rewards FAQ", description: "Understand earnings" },
  ];

  return (
    <section id="supportSection" className="py-20 bg-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">24/7 Support</h2>
          <p className="text-gray-300 text-xl mb-4">We're here to help</p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12  ">
            <div className="bg-neutral-800 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-white mb-6">
                Contact Support
              </h3>
              <form className="space-y-6">
                <div>
                  <label className="block text-gray-300 mb-2">Subject</label>
                  <select className="w-full bg-neutral-700 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-500">
                    <option value="">Select topic</option>
                    <option>Deposit Issue</option>
                    <option>Withdrawal Issue</option>
                    <option>Rewards Issue</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full bg-neutral-700 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">Message</label>
                  <textarea
                    rows="4"
                    className="w-full bg-neutral-700 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  Submit Ticket
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
