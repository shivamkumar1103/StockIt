import { useState } from "react";
import { HelpCircle, Layers } from "lucide-react";
import FAQItem from "./FAQItem";
import { FAQ_CATEGORIES, FAQ_DATA } from "../data/faqData";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion } from "@/components/ui/accordion";

export default function FAQSection() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredFaqs =
    selectedCategory === "All"
      ? FAQ_DATA
      : FAQ_DATA.filter((item) => item.category === selectedCategory);

  return (
    <Card>
      <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-6 space-y-0">
        <div className="flex items-center gap-4">
          <div className="p-2.5 rounded-xl bg-muted text-primary">
            <HelpCircle size={22} />
          </div>
          <div>
            <CardTitle className="text-lg">Frequently Asked Questions</CardTitle>
            <CardDescription>Quick answers to common questions about StockIt</CardDescription>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium shrink-0">
          <Layers size={14} />
          <span>{filteredFaqs.length} questions available</span>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-thin mb-2">
          {FAQ_CATEGORIES.map((category) => {
            const isSelected = selectedCategory === category;
            return (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors border cursor-pointer ${
                  isSelected
                    ? "bg-primary text-primary-foreground border-transparent"
                    : "bg-background text-muted-foreground hover:bg-muted hover:text-foreground border-border"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        <Accordion
          type="single"
          collapsible
          defaultValue={filteredFaqs.length > 0 && selectedCategory === "All" ? filteredFaqs[0].id.toString() : undefined}
          className="w-full flex flex-col gap-3"
        >
          {filteredFaqs.map((faq) => (
            <FAQItem
              key={faq.id}
              id={faq.id.toString()}
              question={faq.question}
              answer={faq.answer}
              category={faq.category}
            />
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
}
