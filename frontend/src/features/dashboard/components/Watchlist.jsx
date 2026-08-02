import { useState, useRef } from "react";
import { Plus, Trash2 } from "lucide-react";

const SWIPE_THRESHOLD = 60;

const SwipeableItem = ({ stock, onDelete }) => {
  const [offsetX, setOffsetX] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const startXRef = useRef(0);
  const currentOffsetRef = useRef(0);

  const handleStart = (clientX) => {
    startXRef.current = clientX - currentOffsetRef.current;
    setIsSwiping(true);
  };

  const handleMove = (clientX) => {
    if (!isSwiping) return;
    const diff = clientX - startXRef.current;
    const clamped = Math.max(Math.min(diff, 0), -80);
    currentOffsetRef.current = clamped;
    setOffsetX(clamped);
  };

  const handleEnd = () => {
    setIsSwiping(false);
    if (currentOffsetRef.current < -SWIPE_THRESHOLD) {
      currentOffsetRef.current = -80;
      setOffsetX(-80);
      setIsRevealed(true);
    } else {
      currentOffsetRef.current = 0;
      setOffsetX(0);
      setIsRevealed(false);
    }
  };

  const handleClose = () => {
    currentOffsetRef.current = 0;
    setOffsetX(0);
    setIsRevealed(false);
  };

  return (
    <div className="relative overflow-hidden rounded-xl">
      {/* Delete button behind */}
      <div className="absolute inset-y-0 right-0 flex items-center z-0">
        <button
          onClick={() => onDelete(stock.ticker)}
          className="bg-[#EF4444] hover:bg-red-600 text-white w-[76px] h-full flex items-center justify-center gap-1.5 transition-colors rounded-r-xl cursor-pointer"
        >
          <Trash2 size={18} />
        </button>
      </div>

      {/* Foreground row */}
      <div
        className="flex justify-between items-center p-2.5 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer group relative z-10 bg-white"
        style={{
          transform: `translateX(${offsetX}px)`,
          transition: isSwiping ? "none" : "transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)",
        }}
        onTouchStart={(e) => handleStart(e.touches[0].clientX)}
        onTouchMove={(e) => handleMove(e.touches[0].clientX)}
        onTouchEnd={handleEnd}
        onMouseDown={(e) => {
          e.preventDefault();
          handleStart(e.clientX);
        }}
        onMouseMove={(e) => handleMove(e.clientX)}
        onMouseUp={handleEnd}
        onMouseLeave={() => {
          if (isSwiping) handleEnd();
        }}
        onClick={() => {
          if (isRevealed) handleClose();
        }}
      >
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-sm ${stock.iconBg}`}
          >
            {stock.initial}
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-[#333333] group-hover:text-[#6425FE] transition-colors line-clamp-1 max-w-35 truncate">
              {stock.name}
            </span>
            <span className="text-xs text-gray-400 font-medium mt-0.5">
              {stock.ticker}
            </span>
          </div>
        </div>

        <div className="flex flex-col items-end">
          <span className="font-bold text-[#333333]">{stock.price}</span>
          <span
            className={`text-xs font-semibold mt-0.5 ${stock.isPositive ? "text-[#22C55E]" : "text-[#EF4444]"}`}
          >
            {stock.change}
          </span>
        </div>
      </div>
    </div>
  );
};

const Watchlist = () => {
  const [watchlistData, setWatchlistData] = useState([
    {
      name: "Amazon.com, Inc.",
      ticker: "AMZN",
      price: "$102.24",
      change: "-3.02",
      isPositive: false,
      iconBg: "bg-gray-900",
      initial: "A",
    },
    {
      name: "Coca-Cola Co",
      ticker: "KO",
      price: "$60.49",
      change: "-0.32",
      isPositive: false,
      iconBg: "bg-[#EF4444]",
      initial: "C",
    },
    {
      name: "Bayerische Motoren Werke AG",
      ticker: "BMW",
      price: "$92.94",
      change: "+0.58",
      isPositive: true,
      iconBg: "bg-blue-600",
      initial: "B",
    },
    {
      name: "Microsoft Corp",
      ticker: "MSFT",
      price: "$248.16",
      change: "+0.16",
      isPositive: true,
      iconBg: "bg-teal-500",
      initial: "M",
    },
    {
      name: "United Parcel Service, Inc.",
      ticker: "UPS",
      price: "$182.09",
      change: "-2.39",
      isPositive: false,
      iconBg: "bg-amber-700",
      initial: "U",
    },
  ]);

  const handleDelete = (ticker) => {
    setWatchlistData((prev) => prev.filter((s) => s.ticker !== ticker));
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 flex flex-col h-full gap-4 shadow-sm">
      {/* Watchlist Section */}
      <div className="flex flex-col gap-4 flex-1 overflow-hidden">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-[#333333]">Watchlist</h2>
          <button className="bg-[#22C55E] text-white p-1 rounded-full hover:bg-green-600 transition-colors cursor-pointer shadow-sm">
            <Plus size={16} strokeWidth={3} />
          </button>
        </div>

        <div className="flex flex-col gap-1 overflow-y-auto pr-2 -mr-2">
          {watchlistData.map((stock) => (
            <SwipeableItem
              key={stock.ticker}
              stock={stock}
              onDelete={handleDelete}
            />
          ))}
          {watchlistData.length === 0 && (
            <div className="flex items-center justify-center py-8 text-gray-400 text-sm font-medium">
              No stocks in watchlist
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Watchlist;
