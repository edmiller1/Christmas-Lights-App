import { merge } from "lodash";
import { decorationResolvers } from "./decoration/decorationResolvers";
import { notificationResolvers } from "./notification/notificationResolvers";
import { reportResolvers } from "./report/reportResolvers";
import { userResolvers } from "./user/userResolvers";
import { verificationResolvers } from "./verification/verificationResolvers";

export const resolvers = merge(
  decorationResolvers,
  notificationResolvers,
  reportResolvers,
  userResolvers,
  verificationResolvers
);
