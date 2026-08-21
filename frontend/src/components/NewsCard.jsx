import { useState } from "react";
import { Clock, ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const NewsCard = ({ news }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card
      className="group relative flex flex-col overflow-hidden cursor-pointer border-border hover:border-primary/50 transition-all duration-300 hover:shadow-md h-full bg-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Placeholder or Actual Image */}
      <div
        className="h-40 w-full relative overflow-hidden shrink-0 bg-muted"
      >
        {news.image && (
          <img
            src={news.image}
            alt={news.title}
            className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-all duration-500 scale-100 group-hover:scale-105"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
        
        {/* Category tag overlay */}
        <Badge className="absolute top-3 left-3 text-[10px] uppercase tracking-wider font-semibold pointer-events-none">
          {news.category || "News"}
        </Badge>
      </div>

      {/* Content */}
      <CardContent className="p-5 flex flex-col grow relative z-10 -mt-2">
        <h3 className="font-semibold text-foreground text-sm md:text-base leading-tight mb-4 group-hover:text-primary transition-colors">
          {news.title}
        </h3>

        <div className="mt-auto flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex flex-col gap-1.5">
            <span className="font-bold uppercase text-foreground">{news.source}</span>
            <div className="flex items-center gap-1.5">
              <Clock size={12} />
              <span>{news.time}</span>
            </div>
          </div>

          {/* Interactive Icon */}
          <div
            className={`p-2 rounded-full bg-primary/10 text-primary transition-all duration-300 ${isHovered ? "scale-100 opacity-100 rotate-0" : "scale-50 opacity-0 -rotate-45"}`}
          >
            <ExternalLink size={14} strokeWidth={2.5} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NewsCard;
