import { useRef, useState } from "react";
import { motion } from "framer-motion";
import NewsCard from "@/components/NewsCard";
import { useNewsData } from "../hooks/useNewsData";

const gradients = [
  "from-emerald-500 to-emerald-700",
  "from-blue-500 to-blue-700",
  "from-indigo-500 to-indigo-700",
  "from-orange-500 to-orange-700",
];

const NewsSection = ({ category }) => {
  const { data: newsData, isPending, isError } = useNewsData(category);
  const scrollRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const items = newsData?.data.slice(0, 20) || [];

  if (isPending) {
    return (
      <div className="mb-10 text-muted-foreground">Loading {category} news...</div>
    );
  }

  if (isError || !items.length) {
    return (
      <div className="mb-10 text-muted-foreground">
        No news available for {category}.
      </div>
    );
  }

  return (
    <div className="mb-10 select-none">
      <h2 className="text-xl font-bold text-foreground mb-4 capitalize">
        {category} News
      </h2>

      <div className="relative group">
        <div
          ref={scrollRef}
          className="overflow-hidden w-full cursor-grab active:cursor-grabbing pb-2"
        >
          <motion.div
            drag="x"
            dragConstraints={scrollRef}
            dragElastic={0.35}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={() => setTimeout(() => setIsDragging(false), 50)}
            className="flex gap-4 w-max pr-6"
          >
            {items.map((item, idx) => (
              <a
                key={item.id}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-72 md:w-80 snap-start shrink-0 no-underline"
                draggable={false}
                onClick={(e) => {
                  if (isDragging) {
                    e.preventDefault();
                  }
                }}
              >
                <NewsCard
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
              </a>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default NewsSection;
