import { Skeleton } from "@/components/ui/skeleton";

const SearchLoader = () => {
  return (
    <div className="px-4 py-2 flex flex-col gap-2">
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex items-center gap-3 py-2">
          <Skeleton className="w-8 h-8 rounded-md" />
          <div className="flex flex-col gap-1.5 flex-1">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-16" />
          </div>
          <Skeleton className="h-5 w-12 rounded-full" />
        </div>
      ))}
    </div>
  );
};

export default SearchLoader;
