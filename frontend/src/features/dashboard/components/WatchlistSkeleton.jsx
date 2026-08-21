import { Skeleton } from "@/components/ui/skeleton";

const WatchlistSkeleton = () => (
  <div className="flex flex-col gap-2">
    {[...Array(3)].map((_, i) => (
      <div key={i} className="flex items-center gap-3 p-2.5">
        <Skeleton className="w-9 h-9 rounded-md shrink-0" />
        <div className="flex flex-col gap-1.5 flex-1">
          <Skeleton className="h-4 w-28 rounded" />
          <Skeleton className="h-3 w-16 rounded" />
        </div>
      </div>
    ))}
  </div>
);

export default WatchlistSkeleton;
