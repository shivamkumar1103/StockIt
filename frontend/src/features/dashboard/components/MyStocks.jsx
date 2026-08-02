import { useRef, useState } from "react";
import StockCard from "@/components/StockCard";

const MyStocks = () => {
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

  const stocks = [
    {
      id: 1,
      name: "Nvidia",
      ticker: "NVDA",
      change: 6.63,
      value: 203.65,
      color: "purple",
      sparklineData: [50, 52, 51, 55, 54, 58, 62],
    },
    {
      id: 2,
      name: "Meta",
      ticker: "META",
      change: -1.44,
      value: 151.54,
      color: "mint",
      sparklineData: [60, 58, 59, 56, 54, 55, 52],
    },
    {
      id: 3,
      name: "Tesla Inc",
      ticker: "TSLA",
      change: 17.63,
      value: 177.9,
      color: "yellow",
      sparklineData: [40, 45, 42, 50, 48, 55, 60],
    },
    {
      id: 4,
      name: "Apple Inc",
      ticker: "AAPL",
      change: 23.41,
      value: 145.93,
      color: "blue",
      sparklineData: [80, 82, 81, 85, 87, 86, 90],
    },
    {
      id: 5,
      name: "AMD",
      ticker: "AMD",
      change: -3.2,
      value: 75.4,
      color: "purple",
      sparklineData: [30, 28, 29, 25, 26, 22, 20],
    },
    {
      id: 6,
      name: "AMD",
      ticker: "AMD",
      change: -3.2,
      value: 75.4,
      color: "purple",
      sparklineData: [30, 28, 29, 25, 26, 22, 20],
    },
  ];

  return (
    <div className="w-full select-none">
      <h2 className="font-semibold text-lg text-[#333333] mb-4">My Stocks</h2>
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
          {stocks.map((stock) => (
            <div key={stock.id} className="snap-start shrink-0">
              <StockCard {...stock} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyStocks;
