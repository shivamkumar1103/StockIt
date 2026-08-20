import { useState } from "react";
import { Send, MessageSquare, CheckCircle2 } from "lucide-react";
import toast from "react-hot-toast";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    category: "General Inquiry",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setIsSubmitting(true);

    // Simple simulated submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      toast.success("Thank you! Your message has been sent to our support team.");
    }, 600);
  };

  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      subject: "",
      category: "General Inquiry",
      message: "",
    });
    setIsSubmitted(false);
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8 flex flex-col gap-6 shadow-sm">
      <div className="flex items-center gap-3 pb-2 border-b border-gray-100">
        <div className="p-2.5 rounded-xl bg-[#F3F0FA] text-[#6425FE]">
          <MessageSquare size={22} />
        </div>
        <div>
          <h3 className="text-lg font-bold text-[#333333]">Send Us a Message</h3>
          <p className="text-xs text-gray-400 mt-0.5">
            Can't find what you're looking for? Leave a note and our Gurugram team will respond promptly.
          </p>
        </div>
      </div>

      {isSubmitted ? (
        <div className="bg-[#F8F9FA] rounded-2xl p-8 text-center flex flex-col items-center gap-3 border border-emerald-100">
          <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
            <CheckCircle2 size={28} />
          </div>
          <h4 className="text-base font-bold text-[#333333]">Message Received!</h4>
          <p className="text-xs text-gray-500 max-w-md">
            Thank you for contacting StockIt Support. We will review your query and get back to you at <strong>{formData.email}</strong> shortly.
          </p>
          <button
            type="button"
            onClick={handleReset}
            className="mt-2 text-xs font-semibold text-[#6425FE] hover:underline cursor-pointer"
          >
            Send another message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Full Name */}
            <div>
              <label
                htmlFor="support-name"
                className="block text-xs font-semibold uppercase tracking-wider text-[#333333]/70 mb-2"
              >
                Your Name <span className="text-red-500">*</span>
              </label>
              <input
                id="support-name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Rahul Sharma"
                required
                className="w-full bg-[#F8F9FA] border border-gray-200 rounded-xl py-3 px-4 text-[#333333] placeholder-gray-400 font-medium focus:outline-none focus:ring-2 focus:ring-[#6425FE]/20 focus:border-[#6425FE] focus:bg-white transition-all text-sm"
              />
            </div>

            {/* Email Address */}
            <div>
              <label
                htmlFor="support-email"
                className="block text-xs font-semibold uppercase tracking-wider text-[#333333]/70 mb-2"
              >
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                id="support-email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="e.g. rahul@example.com"
                required
                className="w-full bg-[#F8F9FA] border border-gray-200 rounded-xl py-3 px-4 text-[#333333] placeholder-gray-400 font-medium focus:outline-none focus:ring-2 focus:ring-[#6425FE]/20 focus:border-[#6425FE] focus:bg-white transition-all text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Category */}
            <div>
              <label
                htmlFor="support-category"
                className="block text-xs font-semibold uppercase tracking-wider text-[#333333]/70 mb-2"
              >
                Topic Category
              </label>
              <select
                id="support-category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full bg-[#F8F9FA] border border-gray-200 rounded-xl py-3 px-4 text-[#333333] font-medium focus:outline-none focus:ring-2 focus:ring-[#6425FE]/20 focus:border-[#6425FE] focus:bg-white transition-all text-sm cursor-pointer"
              >
                <option value="General Inquiry">General Inquiry</option>
                <option value="Account & KYC">Account & KYC Verification</option>
                <option value="Trading & Orders">Trading & Orders</option>
                <option value="Deposits & Withdrawals">Deposits & Withdrawals</option>
                <option value="Technical Issue">Technical Issue</option>
              </select>
            </div>

            {/* Subject */}
            <div>
              <label
                htmlFor="support-subject"
                className="block text-xs font-semibold uppercase tracking-wider text-[#333333]/70 mb-2"
              >
                Subject
              </label>
              <input
                id="support-subject"
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Brief summary of your query"
                className="w-full bg-[#F8F9FA] border border-gray-200 rounded-xl py-3 px-4 text-[#333333] placeholder-gray-400 font-medium focus:outline-none focus:ring-2 focus:ring-[#6425FE]/20 focus:border-[#6425FE] focus:bg-white transition-all text-sm"
              />
            </div>
          </div>

          {/* Message */}
          <div>
            <label
              htmlFor="support-message"
              className="block text-xs font-semibold uppercase tracking-wider text-[#333333]/70 mb-2"
            >
              Message <span className="text-red-500">*</span>
            </label>
            <textarea
              id="support-message"
              name="message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              placeholder="Describe your issue or question in detail..."
              required
              className="w-full bg-[#F8F9FA] border border-gray-200 rounded-xl py-3 px-4 text-[#333333] placeholder-gray-400 font-medium focus:outline-none focus:ring-2 focus:ring-[#6425FE]/20 focus:border-[#6425FE] focus:bg-white transition-all text-sm resize-none"
            />
          </div>

          {/* Submit button */}
          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-[#6425FE] hover:bg-[#6425FE]/90 text-white font-semibold text-sm px-6 py-3 rounded-xl shadow-sm hover:shadow-md hover:shadow-[#6425FE]/25 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Send size={16} />
              <span>{isSubmitting ? "Sending..." : "Send Message"}</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
