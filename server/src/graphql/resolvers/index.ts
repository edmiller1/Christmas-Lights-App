import { merge } from "lodash";
import { decorationResolvers } from "./decoration/decorationResolvers";
import { notificationResolvers } from "./notification/notificationResolvers";
import { reportResolvers } from "./report/reportResolvers";
import { userResolvers } from "./user/userResolvers";
import { verificationResolvers } from "./verification/verificationResolvers";
import { routeResolvers } from "./route/routeResolvers";

export const resolvers = merge(
  decorationResolvers,
  notificationResolvers,
  reportResolvers,
  routeResolvers,
  userResolvers,
  verificationResolvers
);
