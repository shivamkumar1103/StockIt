import { LifeBuoy, Clock, ShieldCheck, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export default function SupportHeader() {
  return (
    <Card className="overflow-hidden border-border bg-card">
      <CardContent className="p-10 relative flex flex-col md:flex-row md:items-start justify-between gap-8">
        <div className="max-w-2xl relative z-10">
          <div className="flex items-center gap-3 text-primary text-sm uppercase tracking-wider font-semibold mb-4">
            <LifeBuoy size={20} className="animate-pulse" />
            <span>Support Center</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            How can we help?
          </h1>
          <p className="text-base text-muted-foreground max-w-xl">
            Find answers to frequently asked questions about your trading account, orders, portfolio, or reach out directly to our Gurugram-based support team.
          </p>
        </div>

        {/* Quick Info Badges */}
        <div className="flex flex-col sm:flex-row flex-wrap items-end gap-3 shrink-0 relative z-10">
          <Badge variant="secondary" className="px-4 py-2 gap-2 text-xs font-semibold uppercase tracking-wider rounded-xl">
            <Clock size={16} />
            <span>Fast Turnaround</span>
          </Badge>
          <Badge variant="outline" className="px-4 py-2 gap-2 text-xs font-semibold uppercase tracking-wider rounded-xl">
            <ShieldCheck size={16} />
            <span>SEBI Compliant</span>
          </Badge>
          <Badge variant="outline" className="px-4 py-2 gap-2 text-xs font-semibold uppercase tracking-wider rounded-xl">
            <MapPin size={16} />
            <span>Gurugram, India</span>
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
