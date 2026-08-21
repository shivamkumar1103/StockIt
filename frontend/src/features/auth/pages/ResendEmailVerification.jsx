import { useState } from "react";
import { Link } from "react-router-dom";
import useResendEmailVerification from "../hooks/useResendEmailVerification";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const ResendEmailVerification = () => {
  const [email, setEmail] = useState("");
  const { resendVerificationEmail, isPending } = useResendEmailVerification();

  const handleSubmit = (e) => {
    e.preventDefault();
    resendVerificationEmail(email);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Resend Verification</CardTitle>
          <CardDescription>
            Enter your email address and we'll send you a new link to verify your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? "Sending..." : "Send Verification Link"}
            </Button>
            <div className="text-center text-sm text-muted-foreground mt-4">
              <Link to="/auth/login" className="text-primary hover:underline">Back to Sign In</Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResendEmailVerification;
