import { useContext, useState, useEffect, createContext } from "react";
import { auth } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "./supabaseClient";

export function useUserData() {
  const token = sessionStorage.getItem("token");

  //@ts-ignore
  const [currentUser] = useAuthState(auth);

  if (!token) {
    return null;
  } else {
    return currentUser;
  }
}

const AuthContext = createContext<{
  session: Session | null | undefined;
  currentUser: User | null | undefined;
  signOut: () => void;
}>({ session: null, currentUser: null, signOut: () => {} });

export const AuthProvider = ({ children }: any) => {
  const [currentUser, setCurrentUser] = useState<User>();
  const [session, setSession] = useState<Session | null>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const setData = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();
      if (error) throw error;
      setSession(session);
      setCurrentUser(session?.user);
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
