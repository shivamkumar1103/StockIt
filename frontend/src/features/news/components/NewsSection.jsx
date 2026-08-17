import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import NewsCard from "@/components/NewsCard";
import { useNewsData } from "../hooks/useNewsData";

const gradients = [
  "from-[#6425FE] to-[#804dfa]",
  "from-[#0ea5e9] to-[#38bdf8]",
  "from-[#10b981] to-[#34d399]",
  "from-[#f59e0b] to-[#fbbf24]",
];

const NewsSection = ({ category }) => {
  const { data: newsData, isPending, isError } = useNewsData(category);
  const [width, setWidth] = useState(0);
  const carousel = useRef();

  const items = newsData?.data.slice(0, 20) || [];

  useEffect(() => {
    if (carousel.current) {
      setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
    }
  }, [items]);

  if (isPending) {
    return (
      <div className="mb-10 text-gray-500">Loading {category} news...</div>
    );
  }

  if (isError || !items.length) {
    return (
      <div className="mb-10 text-gray-500">
        No news available for {category}.
      </div>
    );
  }

  return (
    <div className="mb-10">
      <h2 className="text-xl font-bold text-gray-900 mb-4 capitalize">
        {category} News
      </h2>

      {/* Outer wrapper to clip the drag area */}
      <motion.div
        ref={carousel}
        className="cursor-grab overflow-hidden"
        whileTap={{ cursor: "grabbing" }}
      >
        {/* The draggable track */}
        <motion.div
          drag="x"
          dragConstraints={{ right: 0, left: -width }}
          className="flex gap-4"
        >
          {items.map((item, idx) => (
            <motion.div key={item.id} className="w-70 md:w-75 shrink-0">
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
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NewsSection;
