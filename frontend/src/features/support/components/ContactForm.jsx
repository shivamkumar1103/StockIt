import { useState } from "react";
import { Send, MessageSquare, CheckCircle2 } from "lucide-react";
import toast from "react-hot-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    category: "General Inquiry",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setIsSubmitting(true);

    // Simple simulated submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      toast.success("Thank you! Your message has been sent to our support team.");
    }, 600);
  };

  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      subject: "",
      category: "General Inquiry",
      message: "",
    });
    setIsSubmitted(false);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-6 border-b border-border">
        <div className="p-2.5 rounded-xl bg-muted text-primary">
          <MessageSquare size={22} />
        </div>
        <div className="flex-1">
          <CardTitle className="text-lg">Send Us a Message</CardTitle>
          <CardDescription>
            Can't find what you're looking for? Leave a note and our Gurugram team will respond promptly.
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        {isSubmitted ? (
          <div className="bg-muted/30 rounded-xl p-8 text-center flex flex-col items-center gap-3 border border-emerald-100 dark:border-emerald-900/30">
            <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <CheckCircle2 size={28} />
            </div>
            <h4 className="text-base font-bold text-foreground">Message Received!</h4>
            <p className="text-sm text-muted-foreground max-w-md">
              Thank you for contacting StockIt Support. We will review your query and get back to you at <strong>{formData.email}</strong> shortly.
            </p>
            <Button
              variant="link"
              onClick={handleReset}
              className="mt-2 text-primary"
            >
              Send another message
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="support-name">
                  Your Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="support-name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Rahul Sharma"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="support-email">
                  Email Address <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="support-email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="e.g. rahul@example.com"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="support-category">Topic Category</Label>
                <select
                  id="support-category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Account & KYC">Account & KYC Verification</option>
                  <option value="Trading & Orders">Trading & Orders</option>
                  <option value="Deposits & Withdrawals">Deposits & Withdrawals</option>
                  <option value="Technical Issue">Technical Issue</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="support-subject">Subject</Label>
                <Input
                  id="support-subject"
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Brief summary of your query"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="support-message">
                Message <span className="text-destructive">*</span>
              </Label>
              <Textarea
                id="support-message"
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                placeholder="Describe your issue or question in detail..."
                required
              />
            </div>

            <div className="flex justify-end pt-2">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="gap-2"
              >
                <Send size={16} />
                <span>{isSubmitting ? "Sending..." : "Send Message"}</span>
              </Button>
            </div>
          </form>
        )}
      </CardContent>
    </Card>
  );
}
