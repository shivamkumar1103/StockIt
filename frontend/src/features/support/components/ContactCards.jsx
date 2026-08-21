import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Copy, Check } from "lucide-react";
import toast from "react-hot-toast";
import { CONTACT_DETAILS } from "../data/contactData";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ContactCards() {
  const [copiedItem, setCopiedItem] = useState(null);

  const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text);
    setCopiedItem(label);
    toast.success(`Copied ${label} to clipboard!`);
    setTimeout(() => setCopiedItem(null), 2000);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Office Address Card */}
        <Card className="flex flex-col justify-between hover:border-primary/50 transition-colors">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2.5 rounded-xl bg-muted text-primary">
                <MapPin size={22} />
              </div>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-emerald-600 bg-emerald-50 dark:bg-emerald-950/50 px-2.5 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                Gurugram Office
              </span>
            </div>
            <h4 className="text-base font-bold text-foreground">
              {CONTACT_DETAILS.address.title}
            </h4>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground font-medium leading-relaxed">
              <strong className="text-foreground block mb-1">
                {CONTACT_DETAILS.address.line1}
              </strong>
              {CONTACT_DETAILS.address.line2}
              <br />
              {CONTACT_DETAILS.address.line3}
              <br />
              {CONTACT_DETAILS.address.country}
            </p>
          </CardContent>
          <CardFooter className="pt-4 border-t border-border flex items-center justify-between text-sm">
            <span className="text-muted-foreground font-medium">Cyber City Hub</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() =>
                copyToClipboard(
                  `${CONTACT_DETAILS.address.line1}, ${CONTACT_DETAILS.address.line2}, ${CONTACT_DETAILS.address.line3}`,
                  "Address",
                )
              }
              className="text-primary hover:text-primary/80 gap-1.5 h-8 px-2"
            >
              {copiedItem === "Address" ? (
                <>
                  <Check size={14} className="text-emerald-600" />
                  <span className="text-emerald-600">Copied</span>
                </>
              ) : (
                <>
                  <Copy size={14} />
                  <span>Copy Address</span>
                </>
              )}
            </Button>
          </CardFooter>
        </Card>

        {/* Email Support Card */}
        <Card className="flex flex-col justify-between hover:border-primary/50 transition-colors">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2.5 rounded-xl bg-muted text-primary">
                <Mail size={22} />
              </div>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-primary bg-primary/10 px-2.5 py-0.5 rounded-full border border-primary/20">
                Email Support
              </span>
            </div>
            <h4 className="text-base font-bold text-foreground">
              Write to Us
            </h4>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2">
              {CONTACT_DETAILS.emails.map((item) => (
                <div
                  key={item.email}
                  className="bg-muted/50 p-3 rounded-xl border border-border flex items-center justify-between"
                >
                  <div>
                    <span className="text-xs text-muted-foreground font-medium block mb-0.5">
                      {item.label}
                    </span>
                    <a
                      href={`mailto:${item.email}`}
                      className="text-sm font-semibold text-primary hover:underline"
                    >
                      {item.email}
                    </a>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => copyToClipboard(item.email, item.email)}
                    className="h-8 w-8 text-muted-foreground hover:text-primary"
                    title="Copy email"
                  >
                    {copiedItem === item.email ? (
                      <Check size={16} className="text-emerald-600" />
                    ) : (
                      <Copy size={16} />
                    )}
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="pt-4 border-t border-border flex items-center justify-between text-sm text-muted-foreground">
            <span>Average response: within 2 hours</span>
          </CardFooter>
        </Card>

        {/* Phone Helplines Card */}
        <Card className="flex flex-col justify-between hover:border-primary/50 transition-colors">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2.5 rounded-xl bg-muted text-primary">
                <Phone size={22} />
              </div>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-blue-600 bg-blue-50 dark:bg-blue-950/50 px-2.5 py-0.5 rounded-full border border-blue-200 dark:border-blue-800">
                Call Helpline
              </span>
            </div>
            <h4 className="text-base font-bold text-foreground">
              Phone Support
            </h4>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2">
              {CONTACT_DETAILS.phones.map((phone) => (
                <div
                  key={phone.number}
                  className="bg-muted/50 p-3 rounded-xl border border-border flex items-center justify-between"
                >
                  <div>
                    <span className="text-xs text-muted-foreground font-medium block mb-0.5">
                      {phone.label} ({phone.type})
                    </span>
                    <a
                      href={`tel:${phone.value}`}
                      className="text-sm font-semibold text-foreground hover:text-primary"
                    >
                      {phone.number}
                    </a>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => copyToClipboard(phone.number, phone.number)}
                    className="h-8 w-8 text-muted-foreground hover:text-primary"
                    title="Copy phone number"
                  >
                    {copiedItem === phone.number ? (
                      <Check size={16} className="text-emerald-600" />
                    ) : (
                      <Copy size={16} />
                    )}
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="pt-4 border-t border-border flex items-center justify-between text-sm text-muted-foreground">
            <span>Direct Indian Helpline</span>
          </CardFooter>
        </Card>

        {/* Operating Hours Card */}
        <Card className="flex flex-col justify-between hover:border-primary/50 transition-colors">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2.5 rounded-xl bg-muted text-primary">
                <Clock size={22} />
              </div>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-amber-700 bg-amber-50 dark:bg-amber-950/50 px-2.5 py-0.5 rounded-full border border-amber-200 dark:border-amber-800">
                IST Timezone
              </span>
            </div>
            <h4 className="text-base font-bold text-foreground">
              Support Hours
            </h4>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2">
              {CONTACT_DETAILS.hours.map((h, i) => (
                <div
                  key={i}
                  className="bg-muted/50 p-3 rounded-xl border border-border flex flex-col gap-1"
                >
                  <span className="text-sm font-semibold text-foreground">
                    {h.days}
                  </span>
                  <span className="text-sm text-muted-foreground font-medium">
                    {h.time}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="pt-4 border-t border-border flex items-center justify-between text-sm text-muted-foreground">
            <span>Closed on National & Exchange Holidays</span>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
