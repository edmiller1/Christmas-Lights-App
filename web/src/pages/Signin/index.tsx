import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/ChristmasLights-House-Logo.png";
import { Button } from "@/components/ui/button";
import {
  FaFacebook,
  FaGoogle,
  FaGithub,
  FaApple,
  FaTwitter,
  FaDiscord,
} from "react-icons/fa";
import { useToast } from "@/components/ui/use-toast";
import { OAuthStrategy } from "@clerk/types";
import { useSignIn, useUser } from "@clerk/clerk-react";
import { useEffect } from "react";

export const SignIn = () => {
  const { signIn } = useSignIn();
  const { isSignedIn } = useUser();
  const navigate = useNavigate();

  const signInWith = (strategy: OAuthStrategy) => {
    return signIn?.authenticateWithRedirect({
      strategy,
      redirectUrl: "/sso-callback",
      redirectUrlComplete: "/",
    });
  };

  useEffect(() => {
    if (isSignedIn) {
      navigate("/");
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen items-center justify-center space-y-8 py-12">
      <div>
        <Link to="/">
          <img src={logo} alt="logo" className="h-52" />
        </Link>
      </div>
      <div
        aria-label="sign in form"
        className="w-full space-y-4 sm:mx-auto sm:max-w-md"
      >
        <div className="mx-5 px-5 border border-zinc-600 bg-zinc-800 py-8 px4 shadow rounded-lg sm:px-10">
          <div className="flex flex-col justify-center text-center">
            <span className="text-sm font-medium text-gray-300">
              Sign in with
            </span>
            <div className="mt-6 grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                className="inline-flex items-center py-6 text-base"
                onClick={() => signInWith("oauth_google")}
              >
                <FaGoogle className="mr-2 text-lg" />
                Google
              </Button>
              <Button
                disabled
                variant="outline"
                className="inline-flex items-center py-6 text-base"
              >
                <FaFacebook className="mr-2 text-lg" />
                Facebook
              </Button>
              <Button
                disabled
                variant="outline"
                className="inline-flex items-center py-6 text-base"
              >
                <FaApple className="mr-2 text-lg" />
                Apple
              </Button>
              <Button
                disabled
                variant="outline"
                className="inline-flex items-center py-6 text-base"
              >
                <FaTwitter className="mr-2 text-lg" />
                Twitter
              </Button>
              <Button
                variant="outline"
                className="inline-flex items-center py-6 text-base"
                onClick={() => signInWith("oauth_discord")}
              >
                <FaDiscord className="mr-2 text-lg" />
                Discord
              </Button>
              <Button
                variant="outline"
                className="inline-flex items-center py-6 text-base"
                onClick={() => signInWith("oauth_github")}
              >
                <FaGithub className="mr-2 text-lg" />
                Github
              </Button>
            </div>
          </div>
          <div className="mt-5 mx-10 text-center text-xs">
            <p>
              By signing in, you agree to our{" "}
              <Link to="/terms-of-service" className="text-ch-red">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link to="/privacy-policy" className="text-ch-red">
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
