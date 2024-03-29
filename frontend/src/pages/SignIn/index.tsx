import { Button } from "@/components/ui/button";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import { Link, useLocation } from "react-router-dom";
import { SignInForm } from "./components";

export const SignIn = () => {
  const { login } = useKindeAuth();
  const location = useLocation();
  return (
    <div className="min-h-screen flex items-center justify-center py-12">
      <div className="mx-auto grid w-[350px] gap-6">
        <div className="grid gap-2 text-center">
          <h1 className="text-3xl font-bold">Sign In</h1>
          <p className="text-balance text-muted-foreground">
            Sign in with your email
          </p>
        </div>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <SignInForm />
          </div>
          <Button
            variant="outline"
            className="w-full"
            onClick={() =>
              login({
                authUrlParams: {
                  connection_id: import.meta.env
                    .VITE_KINDE_GOOGLE_CONNECTION_ID,
                },
                app_state: {
                  redirectTo: location.state
                    ? location.state?.from?.pathname
                    : null,
                },
              })
            }
          >
            Continue with Google
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          Don't have an account?{" "}
          <Link to="/signup" className="underline">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};
