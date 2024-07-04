import { Prisma, PrismaClient } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";

export interface ApolloContext {
  prisma: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>;
  token: string | null;
}
