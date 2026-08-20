import { LifeBuoy, Clock, ShieldCheck, MapPin } from "lucide-react";

export default function SupportHeader() {
  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[#6425FE] font-semibold text-xs uppercase tracking-wider mb-1">
            <LifeBuoy size={16} />
            <span>Help & Support Center</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#333333]">
            How can we help you today?
          </h1>
          <p className="text-sm text-gray-500 mt-1 max-w-2xl">
            Find answers to frequently asked questions about your trading account, orders, portfolio, or reach out directly to our Gurugram-based support team.
          </p>
        </div>

        {/* Quick Info Badges */}
        <div className="flex flex-wrap items-center gap-2.5 sm:self-start">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#F3F0FA] text-[#6425FE] text-xs font-medium border border-[#6425FE]/15">
            <Clock size={13} />
            <span>Fast Turnaround</span>
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-medium border border-emerald-200">
            <ShieldCheck size={13} />
            <span>SEBI & Exchange Compliant</span>
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-100 text-gray-600 text-xs font-medium border border-gray-200">
            <MapPin size={13} />
            <span>Gurugram, India</span>
          </span>
        </div>
      </div>

      <hr className="border-gray-100 mt-2" />
    </div>
  );
}
