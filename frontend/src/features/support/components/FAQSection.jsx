import { useState } from "react";
import { HelpCircle, Layers } from "lucide-react";
import FAQItem from "./FAQItem";
import { FAQ_CATEGORIES, FAQ_DATA } from "../data/faqData";

export default function FAQSection() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredFaqs =
    selectedCategory === "All"
      ? FAQ_DATA
      : FAQ_DATA.filter((item) => item.category === selectedCategory);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8 flex flex-col gap-6 shadow-sm">
      {/* Section Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-[#F3F0FA] text-[#6425FE]">
            <HelpCircle size={22} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-[#333333]">
              Frequently Asked Questions
            </h3>
            <p className="text-xs text-gray-400 mt-0.5">
              Quick answers to common questions about StockIt
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-gray-400 font-medium">
          <Layers size={14} />
          <span>{filteredFaqs.length} questions available</span>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
        {FAQ_CATEGORIES.map((category) => {
          const isSelected = selectedCategory === category;
          return (
            <button
              key={category}
              type="button"
              onClick={() => setSelectedCategory(category)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-150 cursor-pointer ${
                isSelected
                  ? "bg-[#6425FE] text-white shadow-sm"
                  : "bg-[#F8F9FA] text-gray-600 hover:bg-gray-200/70 hover:text-[#333333] border border-gray-200/60"
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>

      {/* FAQs List */}
      <div className="flex flex-col gap-3">
        {filteredFaqs.map((faq, index) => (
          <FAQItem
            key={faq.id}
            question={faq.question}
            answer={faq.answer}
            category={faq.category}
            defaultOpen={index === 0 && selectedCategory === "All"}
          />
        ))}
      </div>
    </div>
  );
}
