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

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponseMessage(null);

    try {
      const response = await fetch("http://localhost:5000/api/support", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      response.ok
        ? setResponseMessage({ type: "success", text: "✅ Request submitted!" })
        : setResponseMessage({
            type: "error",
            text: `❌ Error: ${data.message}`,
          });
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch {
      setResponseMessage({
        type: "error",
        text: "❌ Server error. Try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="supportSection"
      className="py-10 bg-gray-900 text-white text-sm"
    >
      <div className="max-w-2xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-center">Need Help?</h2>
        <p className="text-gray-400 text-center mb-4">We're available 24/7.</p>
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold mb-4">Support Ticket</h3>
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="flex items-center bg-gray-700 rounded-lg px-3 py-2">
              <UserIcon className="w-4 h-4 text-gray-400 mr-2" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full bg-transparent text-white outline-none text-xs"
                placeholder="Full Name"
              />
            </div>
            <div className="flex items-center bg-gray-700 rounded-lg px-3 py-2">
              <EnvelopeIcon className="w-4 h-4 text-gray-400 mr-2" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-transparent text-white outline-none text-xs"
                placeholder="Email"
              />
            </div>
            <select
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className="w-full bg-gray-700 text-white rounded-lg px-3 py-2 text-xs"
            >
              <option value="">Select a topic</option>
              <option>Login Issue</option>
              <option>Deposit Issue</option>
              <option>Withdrawal Issue</option>
              <option>Rewards Issue</option>
              <option>Other</option>
            </select>
            <textarea
              name="message"
              rows="3"
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full bg-gray-700 text-white rounded-lg px-3 py-2 text-xs"
              placeholder="Describe your issue..."
            />
            <button
              type="submit"
              className={`w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg text-xs ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </form>
          {responseMessage && (
            <p
              className={`text-center mt-2 text-xs font-semibold ${
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
