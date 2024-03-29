import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import collage from "../../assets/cat_collage.png";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export const SignUp = () => {
  const { login, register } = useKindeAuth();
  const location = useLocation();
  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Create an account</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email below to create an account
            </p>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Sign up
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={() =>
                register({
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
              Sign up with Google
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link to="/signin" className="underline">
              Sign in
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <img
          src={collage}
          alt="Image"
          className="min-h-screen w-full object-cover dark:brightness-[0.7] dark:grayscale"
        />
      </div>
    </div>
  );
};
