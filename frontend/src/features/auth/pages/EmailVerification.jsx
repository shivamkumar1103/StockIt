import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import useVerifyEmail from "../hooks/useVerifyEmail";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

function EmailVerification() {
  const { token } = useParams();
  const { verifyEmail, isPending, isError, error, isSuccess } = useVerifyEmail();

  useEffect(() => {
    if (token) {
      verifyEmail(token);
    }
  }, [token, verifyEmail]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Email Verification</CardTitle>
          <CardDescription>We are verifying your email address.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {isPending && (
            <div className="space-y-2 flex flex-col items-center">
              <Skeleton className="h-4 w-[200px]" />
              <p className="text-muted-foreground text-sm">Verifying your email address...</p>
            </div>
          )}

          {isSuccess && (
            <div className="space-y-4">
              <p className="text-emerald-600 dark:text-emerald-400 font-medium">
                Your email has been successfully verified!
              </p>
              <Button asChild className="w-full">
                <Link to="/auth/login">Continue to Login</Link>
              </Button>
            </div>
          )}

          {isError && (
            <div className="space-y-4">
              <p className="text-red-600 dark:text-red-400 font-medium text-sm">
                {error?.message || "Verification failed. The link may be expired or invalid."}
              </p>
              <Button asChild variant="outline" className="w-full">
                <Link to="/auth/resendVerificationEmail">Request new link</Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default EmailVerification;
