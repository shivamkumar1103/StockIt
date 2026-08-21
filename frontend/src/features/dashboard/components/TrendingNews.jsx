import { TrendingUp, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import NewsCard from "@/components/NewsCard";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const TrendingNews = ({ news = [] }) => {
  return (
    <Card className="w-full bg-card border-border">
      <CardHeader className="flex flex-row justify-between items-center pb-6">
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 p-2.5 rounded-lg text-primary">
            <TrendingUp size={24} strokeWidth={2.5} />
          </div>
          <CardTitle className="text-xl font-bold text-foreground">
            Trending News
          </CardTitle>
        </div>
        <Button variant="ghost" size="sm" asChild className="group text-xs uppercase font-semibold">
          <Link to="/news">
            View All{" "}
            <ChevronRight
              size={16}
              className="ml-1 group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </Button>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {news.slice(0, 4).map((item) => (
            <a
              key={item.id}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block h-full no-underline"
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
                  url: item.url,
                  image: item.image,
                }}
              />
            </a>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TrendingNews;
