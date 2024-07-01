import {
  createKindeServerClient,
  GrantType,
  SessionManager,
} from "@kinde-oss/kinde-typescript-sdk";
import { Request, Response } from "express";

export const kindeClient = createKindeServerClient(
  GrantType.AUTHORIZATION_CODE,
  {
    authDomain: process.env.KINDE_AUTH_DOMAIN!,
    clientId: process.env.KINDE_CLIENT_ID!,
    clientSecret: process.env.KINDE_CLIENT_SECRET!,
    redirectURL: process.env.KINDE_REDIRECT_URL!,
    logoutRedirectURL: process.env.KINDE_LOGOUT__URL!,
  }
);

let store: Record<string, unknown> = {};

export const sessionManager = ({
  req,
  res,
}: {
  req: Request;
  res: Response;
}): SessionManager => {
  return {
    async getSessionItem(key: string) {
      const result = req.cookies.kindeSessionId;
      return result;
    },
    async setSessionItem(key: string, value: unknown) {
      store[key] = value;
    },
    async removeSessionItem(key: string) {
      delete store[key];
    },
    async destroySession() {
      store = {};
    },
  };
};
