import { useEffect } from "react";
import { Link } from "react-router-dom";
import useLogout from "../hooks/useLogout";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

function Logout() {
  const { logout, isPending } = useLogout();
  
  useEffect(() => {
    logout();
  }, [logout]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            {isPending ? "Logging out..." : "Logged Out"}
          </CardTitle>
          <CardDescription>
            {isPending ? "Please wait..." : "You have been successfully logged out of your account."}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {isPending ? (
            <div className="flex justify-center p-4">
              <Skeleton className="h-8 w-8 rounded-full" />
            </div>
          ) : (
            <Button asChild className="w-full">
              <Link to="/auth/login">Return to Login</Link>
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default Logout;
