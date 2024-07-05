import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import { useEffect, useState, createContext } from "react";

export interface KindeContext {
  token: string;
}

export const KindeContext = createContext<KindeContext>({
  token: "",
});

export const useKinde = () => {
  const { getToken } = useKindeAuth();
  const refreshToken = localStorage.getItem("kinde_refresh_token");
  const [token, setToken] = useState("");

  const getUserToken = async () => {
    try {
      console.log("refreshToken", refreshToken);
      getToken().then((res) => {
        setToken(res || "");
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUserToken();
  }, [getToken()]);

  return { token };
};
