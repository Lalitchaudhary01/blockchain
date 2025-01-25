import {
  LockClosedIcon,
  DocumentCheckIcon,
  FingerPrintIcon,
  ChartPieIcon,
} from "@heroicons/react/24/outline";

export default function SecurityMeasures() {
  const securityFeatures = [
    {
      icon: LockClosedIcon,
      title: "Multi-Signature Protection",
      description: "Multiple signatures required for withdrawals",
    },
    {
      icon: DocumentCheckIcon,
      title: "Smart Contract Audits",
      description: "Regular audits by leading security firms",
    },
    {
      icon: FingerPrintIcon,
      title: "Biometric Authentication",
      description: "Extra layer of security for operations",
    },
    {
      icon: ChartPieIcon,
      title: "Real-time Monitoring",
      description: "24/7 automated system monitoring",
    },
  ];

  return (
    <section id="securityMeasures" className="py-20 bg-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Security First</h2>
          <p className="text-gray-300 text-xl">
            Your assets' protection is our priority
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {securityFeatures.map((feature) => (
            <div key={feature.title} className="bg-neutral-800 rounded-xl p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="h-12 w-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                  <feature.icon className="w-6 h-6 text-purple-500" />
                </div>
                <h3 className="text-2xl font-bold text-white">
                  {feature.title}
                </h3>
              </div>
              <p className="text-gray-300">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-neutral-800 rounded-xl p-8">
          <h3 className="text-2xl font-bold text-white mb-6 text-center">
            Security Stats
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { value: "$0", label: "Funds Lost" },
              { value: "100%", label: "Uptime" },
              { value: "24/7", label: "Monitoring" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl font-bold text-purple-500">
                  {stat.value}
                </p>
                <p className="text-gray-300 mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
