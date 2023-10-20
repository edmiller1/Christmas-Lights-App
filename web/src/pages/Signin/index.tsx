import { Link } from "react-router-dom";
import logo from "../../assets/ChristmasLights-House-Logo.png";
import { Button } from "@/components/ui/button";
import {
  FaFacebook,
  FaGoogle,
  FaGithub,
  FaApple,
  FaMicrosoft,
  FaDiscord,
} from "react-icons/fa";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

export const SignIn = () => {
  const supabase = useSupabaseClient();

  const signInWithDiscord = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "discord",
      options: {
        redirectTo: "http://localhost:3000/home",
      },
    });
    if (error) {
      alert(error.message);
    }
  };
  return (
    <div className="flex flex-col min-h-screen items-center justify-center space-y-8 py-12">
      <div>
        <Link to="/home">
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
                variant="outline"
                className="inline-flex items-center py-6 text-base"
              >
                <FaApple className="mr-2 text-lg" />
                Apple
              </Button>
              <Button
                variant="outline"
                className="inline-flex items-center py-6 text-base"
              >
                <FaMicrosoft className="mr-2 text-lg" />
                Microsoft
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
