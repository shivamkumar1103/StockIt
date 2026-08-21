import { HelpCircle } from "lucide-react";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function FAQItem({ id, question, answer, category }) {
  return (
    <AccordionItem
      value={id}
      className="border rounded-xl px-2 data-[state=open]:bg-muted/30 data-[state=open]:border-primary/30 transition-colors bg-background"
    >
      <AccordionTrigger className="hover:no-underline py-4">
        <div className="flex items-start sm:items-center gap-4 text-left">
          <div className="p-2 rounded-xl shrink-0 bg-muted text-primary">
            <HelpCircle size={18} />
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-semibold text-primary/80 uppercase tracking-wider">
              {category}
            </span>
            <span className="text-[15px] sm:text-base font-semibold text-foreground leading-snug">
              {question}
            </span>
          </div>
        </div>
      </AccordionTrigger>
      <AccordionContent className="pt-1 pb-4 pl-16 pr-4">
        <div className="text-sm text-muted-foreground leading-relaxed">
          {answer}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}
