import { useState } from "react";
import { Clock, ExternalLink } from "lucide-react";

const NewsCard = ({ news }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group relative flex flex-col bg-gray-50 rounded-2xl overflow-hidden cursor-pointer border border-transparent hover:border-gray-200 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Placeholder with Gradient or Actual Image */}
      <div
        className={`h-32 w-full relative overflow-hidden shrink-0 ${!news.image ? `bg-linear-to-br ${news.imageGrad}` : "bg-gray-200"}`}
      >
        {news.image && (
          <img 
            src={news.image} 
            alt={news.title} 
            className="w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        {/* Category Badge */}
        <div className="absolute top-3 left-3 bg-white/20 backdrop-blur-md text-white text-xs font-semibold px-2.5 py-1 rounded-lg">
          {news.category}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-bold text-[#333333] text-sm md:text-base leading-tight mb-3 group-hover:text-[#6425FE] transition-colors line-clamp-3">
          {news.title}
        </h3>

        <div className="mt-auto flex items-center justify-between text-xs text-gray-500 font-medium">
          <div className="flex flex-col gap-1.5">
            <span className="text-[#333333] font-semibold">{news.source}</span>
            <div className="flex items-center gap-1">
              <Clock size={12} />
              <span>{news.time}</span>
            </div>
          </div>

          {/* Interactive Icon */}
          <div
            className={`p-2 rounded-full bg-white shadow-sm transition-all duration-300 ${isHovered ? "scale-100 opacity-100 text-[#6425FE]" : "scale-75 opacity-0"}`}
          >
            <ExternalLink
              size={16}
              onClick={() => window.open(news.url, "_blank")}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
