import { TrendingUp, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import NewsCard from "@/components/NewsCard";

const gradients = [
  "from-[#6425FE] to-[#804dfa]",
  "from-[#0ea5e9] to-[#38bdf8]",
  "from-[#10b981] to-[#34d399]",
  "from-[#f59e0b] to-[#fbbf24]",
];

const TrendingNews = ({ news = [] }) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 w-full shadow-sm flex flex-col h-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <div className="bg-purple-100 p-2 rounded-xl text-[#6425FE]">
            <TrendingUp size={24} />
          </div>
          <h2 className="text-xl font-bold text-[#333333]">Trending News</h2>
        </div>
        <Link
          to="/news"
          className="text-sm font-semibold text-[#6425FE] hover:text-[#804dfa] transition-colors flex items-center gap-1 group"
        >
          View All{" "}
          <ChevronRight
            size={16}
            className="group-hover:translate-x-1 transition-transform"
          />
        </Link>
      </div>

      {/* News Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {news.slice(0, 4).map((item, idx) => (
          <NewsCard
            key={item.id}
            news={{
              id: item.id,
              title: item.headline,
              source: item.source,
              time: new Date(item.datetime * 1000).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              }),
              category: item.category,
              imageGrad: gradients[idx % gradients.length],
              url: item.url,
              image: item.image,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default TrendingNews;
