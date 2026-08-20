import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Copy, Check } from "lucide-react";
import toast from "react-hot-toast";
import { CONTACT_DETAILS } from "../data/contactData";

export default function ContactCards() {
  const [copiedItem, setCopiedItem] = useState(null);

  const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text);
    setCopiedItem(label);
    toast.success(`Copied ${label} to clipboard!`);
    setTimeout(() => setCopiedItem(null), 2000);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Office Address Card */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 flex flex-col justify-between gap-4 shadow-sm hover:border-gray-200 transition-all">
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="p-2.5 rounded-xl bg-[#F3F0FA] text-[#6425FE] w-fit">
                <MapPin size={22} />
              </div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                Gurugram Office
              </span>
            </div>
            <div>
              <h4 className="text-base font-bold text-[#333333]">
                {CONTACT_DETAILS.address.title}
              </h4>
              <p className="text-xs text-gray-500 mt-1 font-medium leading-relaxed">
                <strong className="text-gray-700 block">
                  {CONTACT_DETAILS.address.line1}
                </strong>
                {CONTACT_DETAILS.address.line2}
                <br />
                {CONTACT_DETAILS.address.line3}
                <br />
                {CONTACT_DETAILS.address.country}
              </p>
            </div>
          </div>

          <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
            <span className="text-gray-400 font-medium">Cyber City Hub</span>
            <button
              type="button"
              onClick={() =>
                copyToClipboard(
                  `${CONTACT_DETAILS.address.line1}, ${CONTACT_DETAILS.address.line2}, ${CONTACT_DETAILS.address.line3}`,
                  "Address",
                )
              }
              className="inline-flex items-center gap-1 text-[#6425FE] hover:text-[#6425FE]/80 font-semibold cursor-pointer"
            >
              {copiedItem === "Address" ? (
                <>
                  <Check size={13} className="text-emerald-600" />
                  <span className="text-emerald-600">Copied</span>
                </>
              ) : (
                <>
                  <Copy size={13} />
                  <span>Copy Address</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Email Support Card */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 flex flex-col justify-between gap-4 shadow-sm hover:border-gray-200 transition-all">
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="p-2.5 rounded-xl bg-[#F3F0FA] text-[#6425FE] w-fit">
                <Mail size={22} />
              </div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#6425FE] bg-[#F3F0FA] px-2.5 py-0.5 rounded-full border border-[#6425FE]/20">
                Email Support
              </span>
            </div>
            <div>
              <h4 className="text-base font-bold text-[#333333]">
                Write to Us
              </h4>
              <div className="flex flex-col gap-2 mt-2">
                {CONTACT_DETAILS.emails.map((item) => (
                  <div
                    key={item.email}
                    className="bg-[#F8F9FA] p-2.5 rounded-xl border border-gray-100 flex items-center justify-between"
                  >
                    <div>
                      <span className="text-[11px] text-gray-400 font-medium block">
                        {item.label}
                      </span>
                      <a
                        href={`mailto:${item.email}`}
                        className="text-xs font-bold text-[#6425FE] hover:underline"
                      >
                        {item.email}
                      </a>
                    </div>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(item.email, item.email)}
                      className="p-1.5 rounded-lg text-gray-400 hover:text-[#6425FE] hover:bg-white transition-colors cursor-pointer"
                      title="Copy email"
                    >
                      {copiedItem === item.email ? (
                        <Check size={14} className="text-emerald-600" />
                      ) : (
                        <Copy size={14} />
                      )}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
            <span>Average response: within 2 hours</span>
          </div>
        </div>

        {/* Phone Helplines Card */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 flex flex-col justify-between gap-4 shadow-sm hover:border-gray-200 transition-all">
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="p-2.5 rounded-xl bg-[#F3F0FA] text-[#6425FE] w-fit">
                <Phone size={22} />
              </div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                Call Helpline
              </span>
            </div>
            <div>
              <h4 className="text-base font-bold text-[#333333]">
                Phone Support
              </h4>
              <div className="flex flex-col gap-2 mt-2">
                {CONTACT_DETAILS.phones.map((phone) => (
                  <div
                    key={phone.number}
                    className="bg-[#F8F9FA] p-2.5 rounded-xl border border-gray-100 flex items-center justify-between"
                  >
                    <div>
                      <span className="text-[11px] text-gray-400 font-medium block">
                        {phone.label} ({phone.type})
                      </span>
                      <a
                        href={`tel:${phone.value}`}
                        className="text-xs font-bold text-[#333333] hover:text-[#6425FE]"
                      >
                        {phone.number}
                      </a>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        copyToClipboard(phone.number, phone.number)
                      }
                      className="p-1.5 rounded-lg text-gray-400 hover:text-[#6425FE] hover:bg-white transition-colors cursor-pointer"
                      title="Copy phone number"
                    >
                      {copiedItem === phone.number ? (
                        <Check size={14} className="text-emerald-600" />
                      ) : (
                        <Copy size={14} />
                      )}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
            <span>Direct Indian Helpline</span>
          </div>
        </div>

        {/* Operating Hours Card */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 flex flex-col justify-between gap-4 shadow-sm hover:border-gray-200 transition-all">
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="p-2.5 rounded-xl bg-[#F3F0FA] text-[#6425FE] w-fit">
                <Clock size={22} />
              </div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                IST Timezone
              </span>
            </div>
            <div>
              <h4 className="text-base font-bold text-[#333333]">
                Support Hours
              </h4>
              <div className="flex flex-col gap-2 mt-2">
                {CONTACT_DETAILS.hours.map((h, i) => (
                  <div
                    key={i}
                    className="bg-[#F8F9FA] p-2.5 rounded-xl border border-gray-100"
                  >
                    <span className="text-[11px] font-semibold text-[#333333] block">
                      {h.days}
                    </span>
                    <span className="text-xs text-gray-500 font-medium">
                      {h.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
            <span>Closed on National & Exchange Holidays</span>
          </div>
        </div>
      </div>
    </div>
  );
}
