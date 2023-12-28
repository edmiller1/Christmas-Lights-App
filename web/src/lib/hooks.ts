import { auth } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";

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
