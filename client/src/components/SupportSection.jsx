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
          <p className="text-gray-300 text-xl">We're here to help</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
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

          <div className="space-y-8">
            <div className="bg-neutral-800 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-white mb-6">
                Quick Support
              </h3>
              <div className="space-y-4">
                {supportOptions.map((option) => (
                  <div
                    key={option.title}
                    className="flex items-center gap-4 p-4 bg-neutral-700 rounded-lg"
                  >
                    <div className="h-12 w-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                      <option.icon className="w-6 h-6 text-purple-500" />
                    </div>
                    <div>
                      <h4 className="text-white font-medium">{option.title}</h4>
                      <p className="text-gray-300 text-sm">
                        {option.description}
                      </p>
                    </div>
                    <button className="ml-auto bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm transition-colors">
                      {option.action}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-neutral-800 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-white mb-6">
                Knowledge Base
              </h3>
              <div className="space-y-4">
                {knowledgeBase.map((item) => (
                  <a
                    key={item.title}
                    href="#"
                    className="block p-4 bg-neutral-700 rounded-lg hover:bg-neutral-600 transition-colors"
                  >
                    <h4 className="text-white font-medium">{item.title}</h4>
                    <p className="text-gray-300 text-sm mt-1">
                      {item.description}
                    </p>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
