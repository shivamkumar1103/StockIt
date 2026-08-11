const WatchlistSkeleton = () => (
  <div className="flex flex-col gap-2">
    {[...Array(3)].map((_, i) => (
      <div key={i} className="flex items-center gap-3 p-2.5 animate-pulse">
        <div className="w-10 h-10 rounded-xl bg-gray-200 shrink-0" />
        <div className="flex flex-col gap-1.5 flex-1">
          <div className="h-4 w-28 bg-gray-200 rounded" />
          <div className="h-3 w-16 bg-gray-100 rounded" />
        </div>
      </div>
    ))}
  </div>
);

export default WatchlistSkeleton;
