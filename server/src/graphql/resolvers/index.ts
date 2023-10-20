import { merge } from "lodash";
import { decorationResolvers } from "./decoration/decorationResolvers";
import { userResolvers } from "./user/userResolvers";

export const resolvers = merge(decorationResolvers, userResolvers);
