import { useState } from "react";
import {
  ChatBubbleOvalLeftIcon,
  EnvelopeIcon,
  UserIcon,
} from "@heroicons/react/24/outline";

export default function SupportSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState(null);
  const backendUrl = process.env.SUPPORT_EMAIL;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponseMessage(null);

    try {
      const response = await fetch(`${backendUrl}/support`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setResponseMessage({
          type: "success",
          text: "✅ Support request submitted successfully!",
        });
        setFormData({ name: "", email: "", subject: "", message: "" }); // Reset form
      } else {
        setResponseMessage({
          type: "error",
          text: `❌ Error: ${data.message}`,
        });
      }
    } catch (error) {
      setResponseMessage({
        type: "error",
        text: "❌ Server error. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="supportSection" className="py-16 bg-gray-900 text-white">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold">Need Help? Contact Us</h2>
          <p className="text-gray-400 text-lg mt-2">
            Our team is available 24/7 to assist you.
          </p>
        </div>

        <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold mb-6">
            Submit a Support Ticket
          </h3>
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div>
              <label className="block text-gray-300 mb-2">Full Name</label>
              <div className="flex items-center bg-gray-700 rounded-lg px-4 py-3">
                <UserIcon className="w-5 h-5 text-gray-400 mr-3" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-transparent text-white outline-none"
                  placeholder="Enter your full name"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-gray-300 mb-2">Email Address</label>
              <div className="flex items-center bg-gray-700 rounded-lg px-4 py-3">
                <EnvelopeIcon className="w-5 h-5 text-gray-400 mr-3" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-transparent text-white outline-none"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            {/* Subject */}
            <div>
              <label className="block text-gray-300 mb-2">Subject</label>
              <select
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full bg-gray-700 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-500"
              >
                <option value="">Select a topic</option>
                <option>Login Issue</option>
                <option>Deposit Issue</option>
                <option>Withdrawal Issue</option>
                <option>Rewards Issue</option>
                <option>Other</option>
              </select>
            </div>

            {/* Message */}
            <div>
              <label className="block text-gray-300 mb-2">Message</label>
              <textarea
                name="message"
                rows="4"
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full bg-gray-700 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-500"
                placeholder="Describe your issue..."
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className={`w-full bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-colors ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit Ticket"}
            </button>
          </form>

          {/* Response Message */}
          {responseMessage && (
            <p
              className={`text-center mt-4 text-lg font-semibold ${
                responseMessage.type === "success"
                  ? "text-green-400"
                  : "text-red-400"
              }`}
            >
              {responseMessage.text}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
