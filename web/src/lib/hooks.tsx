import { useContext, useState, useEffect, createContext } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "./supabaseClient";
import {
  SignIn as SignInData,
  SignInArgs,
} from "@/graphql/mutations/signIn/types";
import { useMutation } from "@apollo/client";
import { SIGN_IN } from "@/graphql/mutations/signIn";
import { useToast } from "@/components/ui/use-toast";

const AuthContext = createContext<{
  session: Session | null | undefined;
  currentUser: User | null | undefined;
  signOut: () => void;
}>({ session: null, currentUser: null, signOut: () => {} });

export const AuthProvider = ({ children }: any) => {
  const { toast } = useToast();
  const [currentUser, setCurrentUser] = useState<User>();
  const [session, setSession] = useState<Session | null>();
  const [loading, setLoading] = useState(true);

  const [signIn] = useMutation<SignInData, SignInArgs>(SIGN_IN, {
    onCompleted(data) {
      if (data && data.signIn) {
        if (data.signIn.token) {
          toast({
            variant: "success",
            title: "Success 🥳",
            description: "Successfully signed in.",
          });
          sessionStorage.setItem("token", data.signIn.token);
        }
      } else {
        sessionStorage.removeItem("token");
      }
    },
    onError: async () => {
      if (session) {
        await supabase.auth.admin.deleteUser(session?.user.id);
      }
      toast({
        variant: "destructive",
        title: "Error 😬",
        description: "Failed to sign in. Please try again.",
      });
    },
  });

  useEffect(() => {
    const setData = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();
      if (error) throw error;
      setSession(session);
      setCurrentUser(session?.user);
      if (session) {
        const sessionData = {
          input: {
            result: {
              id: session?.user.id as string,
              token: session?.access_token as string,
              name: session?.user.user_metadata.full_name as string,
              email: session?.user.email as string,
              photoURL: (session?.user.user_metadata.picture as string)
                ? (session?.user.user_metadata.picture as string)
                : session?.user.user_metadata.avatar_url,
              provider: session?.user.app_metadata.provider as string,
            },
          },
        };
        signIn({ variables: { input: sessionData.input } });
      }
      setLoading(false);
    };

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setCurrentUser(session?.user);
        setLoading(false);
      }
    );

    setData();

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  const value = {
    session,
    currentUser,
    signOut: () => supabase.auth.signOut(),
  };

  // use a provider to pass down the value
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// export the useAuth hook
export const useAuth = () => {
  return useContext(AuthContext);
};
