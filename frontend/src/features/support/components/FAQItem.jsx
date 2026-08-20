import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

export default function FAQItem({ question, answer, category, defaultOpen = false }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div
      className={`border rounded-2xl transition-all duration-200 ${
        isOpen
          ? "border-[#6425FE]/30 bg-[#FBFBFE] shadow-sm"
          : "border-gray-100 bg-white hover:border-gray-200"
      }`}
    >
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-start sm:items-center justify-between gap-4 p-5 text-left cursor-pointer select-none"
        aria-expanded={isOpen}
      >
        <div className="flex items-start sm:items-center gap-3">
          <div
            className={`p-2 rounded-xl shrink-0 transition-colors ${
              isOpen
                ? "bg-[#6425FE] text-white"
                : "bg-[#F3F0FA] text-[#6425FE]"
            }`}
          >
            <HelpCircle size={18} />
          </div>
          <div>
            <span className="text-xs font-semibold text-[#6425FE]/80 uppercase tracking-wider block mb-0.5">
              {category}
            </span>
            <h4 className="text-[15px] sm:text-base font-semibold text-[#333333] leading-snug">
              {question}
            </h4>
          </div>
        </div>

        <div
          className={`p-1 rounded-full text-gray-400 shrink-0 transition-transform duration-200 ${
            isOpen ? "transform rotate-180 text-[#6425FE]" : ""
          }`}
        >
          <ChevronDown size={20} />
        </div>
      </button>

      {isOpen && (
        <div className="px-5 pb-5 pt-1 border-t border-gray-100/70 text-sm text-gray-600 leading-relaxed">
          <p className="pl-11">{answer}</p>
        </div>
      )}
    </div>
  );
}
