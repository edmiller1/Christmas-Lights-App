import { merge } from "lodash";
import { decorationResolvers } from "./decoration/decorationResolvers";
import { userResolvers } from "./user/userResolvers";
import { verificationResolvers } from "./verification/verificationResolvers";

export const resolvers = merge(
  decorationResolvers,
  userResolvers,
  verificationResolvers
);
