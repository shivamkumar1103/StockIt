import { useRef, useState } from "react";
import StockCard from "@/components/StockCard";

const colors = ["blue", "mint", "yellow", "purple"];

const PopularStocks = ({ popularStocks = [] }) => {
  const scrollRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleWheel = (e) => {
    if (scrollRef.current && e.deltaY !== 0) {
      scrollRef.current.scrollLeft += e.deltaY;
    }
  };

  return (
    <div className="w-full select-none">
      <h2 className="font-semibold text-lg text-[#333333] mb-4">
        Popular Stocks
      </h2>
      <div className="relative group">
        <div
          ref={scrollRef}
          className={`flex overflow-x-auto gap-4 scrollbar-hide pb-4 w-full snap-x ${isDragging ? "cursor-grabbing snap-none" : "cursor-grab"}`}
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          onWheel={handleWheel}
        >
          {popularStocks.map((stock, idx) => (
            <div key={stock.symbol} className="snap-start shrink-0">
              <StockCard 
                name={stock.symbol}
                ticker={stock.symbol}
                change={stock.change}
                value={stock.currentPrice}
                color={colors[idx % colors.length]}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PopularStocks;
