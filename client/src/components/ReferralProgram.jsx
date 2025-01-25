import {
  UserGroupIcon,
  CurrencyDollarIcon,
  ArrowTrendingUpIcon,
} from "@heroicons/react/24/outline";

export default function ReferralProgram() {
  return (
    <section id="referralProgram" className="py-20 bg-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Referral Program
          </h2>
          <p className="text-gray-300 text-xl">Earn additional rewards</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="bg-neutral-900 rounded-xl p-8">
            <h3 className="text-2xl font-bold text-white mb-6">
              Your Referral Dashboard
            </h3>
            <div className="space-y-6">
              <div className="bg-neutral-800 p-4 rounded-lg">
                <label className="block text-sm text-gray-400 mb-2">
                  Your Referral Link
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    readOnly
                    value="https://solstake.com/?ref=YOUR_ID"
                    className="flex-1 bg-neutral-700 text-white rounded px-4 py-2 text-sm"
                  />
                  <button
                    onClick={() =>
                      navigator.clipboard.writeText(
                        "https://solstake.com/?ref=YOUR_ID"
                      )
                    }
                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
                  >
                    Copy
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-neutral-800 p-4 rounded-lg">
                  <h4 className="text-gray-400 text-sm mb-1">
                    Total Referrals
                  </h4>
                  <p className="text-2xl font-bold text-white">0</p>
                </div>
                <div className="bg-neutral-800 p-4 rounded-lg">
                  <h4 className="text-gray-400 text-sm mb-1">Total Earnings</h4>
                  <p className="text-2xl font-bold text-white">0 SOL</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-neutral-900 rounded-xl p-8">
            <h3 className="text-2xl font-bold text-white mb-6">
              Rewards Structure
            </h3>
            <div className="space-y-6">
              {[
                {
                  icon: UserGroupIcon,
                  title: "Level 1 Referrals",
                  text: "5% of referral's rewards",
                },
                {
                  icon: CurrencyDollarIcon,
                  title: "Level 2 Referrals",
                  text: "2% of referral's referrals",
                },
                {
                  icon: ArrowTrendingUpIcon,
                  title: "Instant Rewards",
                  text: "Credited immediately",
                },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-4">
                  <div className="h-12 w-12 bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-6 h-6 text-purple-500" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-2">
                      {item.title}
                    </h4>
                    <p className="text-gray-300">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
