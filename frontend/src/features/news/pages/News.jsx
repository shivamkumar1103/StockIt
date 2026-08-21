import NewsSection from "../components/NewsSection";

const categories = ["general", "merger", "crypto", "forex"];

const News = () => {
  return (
    <div className="w-full h-full">
      <div className="mb-8 max-w-7xl">
        <h1 className="text-2xl font-bold text-foreground mb-2">
          Market News & Insights
        </h1>
        <p className="text-sm text-muted-foreground">
          Stay updated with the latest trends across markets.
        </p>
      </div>

      <div className="space-y-6 max-w-7xl">
        {categories.map((category) => (
          <NewsSection key={category} category={category} />
        ))}
      </div>
    </div>
  );
};

export default News;
