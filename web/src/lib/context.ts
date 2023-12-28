import { createContext } from "react";
import { User } from "firebase/auth";

const currentUser: User | null | undefined = null;

export const UserContext = createContext<User | null | undefined>(currentUser);
