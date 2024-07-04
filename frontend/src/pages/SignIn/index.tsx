import { Button } from "@/components/ui/button";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import { SEO } from "@/components";

export const SignIn = () => {
  const { login, register } = useKindeAuth();

  return (
    <>
      <SEO
        description="Sign in with your account"
        name="Sign In"
        title="Sign In"
        type="Sign In"
      />
      <div className="min-h-screen flex items-center justify-center py-12 px-2">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold mb-10">Sign In</h1>
            <p>You must sign in or create an account to continue</p>
          </div>
          <div className="flex items-center justify-center space-x-10 mx-12">
            <Button onClick={() => login()}>Login</Button>
            <span
              className="cursor-pointer text-sm hover:underline"
              onClick={() => register()}
            >
              Create Account &rarr;
            </span>
          </div>
        </div>
      </div>
    </>
  );
};
