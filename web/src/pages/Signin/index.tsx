import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";
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
import { useAuth } from "@/lib/hooks";

export const SignIn = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const signInWithDiscord = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "discord",
    });
    if (error) {
      toast({
        variant: "destructive",
        title: "Error 😬",
        description: "Failed to sign in. Please try again.",
      });
    }
  };

  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
    if (error) {
      toast({
        variant: "destructive",
        title: "Error 😬",
        description: "Failed to sign in. Please try again.",
      });
    }
  };

  const signInWithGitub = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "github",
    });
    if (error) {
      toast({
        variant: "destructive",
        title: "Error 😬",
        description: "Failed to sign in. Please try again.",
      });
    }
  };

  const signInWithTwitter = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "twitter",
    });
    if (error) {
      toast({
        variant: "destructive",
        title: "Error 😬",
        description: "Failed to sign in. Please try again.",
      });
    }
  };

  if (currentUser) {
    navigate("/");
  }

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
                onClick={signInWithGoogle}
              >
                <FaGoogle className="mr-2 text-lg" />
                Google
              </Button>
              <Button
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
                variant="outline"
                className="inline-flex items-center py-6 text-base"
                onClick={signInWithTwitter}
              >
                <FaTwitter className="mr-2 text-lg" />
                Twitter
              </Button>
              <Button
                variant="outline"
                className="inline-flex items-center py-6 text-base"
                onClick={signInWithDiscord}
              >
                <FaDiscord className="mr-2 text-lg" />
                Discord
              </Button>
              <Button
                variant="outline"
                className="inline-flex items-center py-6 text-base"
                onClick={signInWithGitub}
              >
                <FaGithub className="mr-2 text-lg" />
                Github
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
