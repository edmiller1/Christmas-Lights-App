import { useMutation } from "@apollo/client";
import { SIGN_IN } from "@/graphql/mutations/signIn";
import {
  SignIn as SignInData,
  SignInArgs,
} from "@/graphql/mutations/signIn/types";
import { Link, useNavigate } from "react-router-dom";
import { auth, googleAuthProvider } from "../../lib/firebase";
import { useUserData } from "../../lib/hooks";
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
import { useToast } from "@/components/ui/use-toast";
import { CircleNotch } from "@phosphor-icons/react";

export const SignIn = () => {
  const currentUser = useUserData();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [signIn, { loading: signInLoading }] = useMutation<
    SignInData,
    SignInArgs
  >(SIGN_IN, {
    onCompleted(data) {
      if (data && data.signIn) {
        toast({
          variant: "success",
          title: "Success 🎉",
          description: "Signed In successfully!",
        });
        if (data.signIn.token) {
          sessionStorage.setItem("token", data.signIn.token);
        }
        setTimeout(() => {
          navigate(-1);
        }, 3000);
      } else {
        sessionStorage.removeItem("token");
      }
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Error 😬",
        description: "Failed to sign in. Please try again.",
      });
    },
  });

  const signInWIthGoogle = async () => {
    await auth
      .signInWithPopup(googleAuthProvider)
      .then((googleData: any) => {
        const resultData: SignInArgs = {
          input: {
            result: {
              uid: googleData.user.uid,
              isNewUser: googleData.additionalUserInfo.isNewUser,
              accessToken: googleData.credential.idToken,
              displayName: googleData.user.displayName,
              email: googleData.user.email,
              photoURL: googleData.user.photoURL,
              providerId: googleData.user.providerData[0].providerId,
            },
          },
        };
        signIn({ variables: { input: resultData.input } });
      })
      .catch(() => {
        toast({
          variant: "destructive",
          title: "Error 😬",
          description: "Failed to sign in. Please try again.",
        });
      });
  };

  if (signInLoading) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center">
        <CircleNotch
          size={60}
          className="animate-spin text-ch-dark dark:text-ch-light"
        />
        <p className="text-2xl">Logging In...</p>
      </div>
    );
  }

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
                onClick={signInWIthGoogle}
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
