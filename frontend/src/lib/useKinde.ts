import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import { useEffect, useState, createContext } from "react";

export interface KindeContext {
  token: string;
}

export const KindeContext = createContext<KindeContext>({
  token: "",
});

export const useKinde = () => {
  const { getToken, user } = useKindeAuth();
  const [token, setToken] = useState("");

  const getUserToken = async () => {
    try {
      await getToken().then((res) => {
        console.log(res);
        setToken(res || "");
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUserToken();
  }, [user]);

  return { token };
};
