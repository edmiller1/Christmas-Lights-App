import { Request, Response } from "express";
import { prisma } from "../../../database";
import { Decoration, DecorationImage } from "@prisma/client";
import { CreateDecorationArgs, GetDecorationArgs } from "./types";
import { authorise } from "../../../lib/helpers";
import { Cloudinary } from "../../../lib/cloudinary";

export const decorationResolvers = {
  Query: {
    getDecoration: async (
      _root: undefined,
      { input }: GetDecorationArgs,
      { _, req, res }: { _: undefined; req: Request; res: Response }
    ): Promise<Decoration> => {
      try {
        const decoration = await prisma.decoration.findFirst({
          where: {
            id: input.id,
          },
          include: {
            ratings: true,
            images: true,
          },
        });

        if (!decoration) {
          throw new Error("Decoration cannot be found");
        }

        return decoration;
      } catch (error) {
        throw new Error(`${error}`);
      }
    },
  },
  Mutation: {
    createDecoration: async (
      _root: undefined,
      { input }: CreateDecorationArgs,
      { _, req, res }: { _: undefined; req: Request; res: Response }
    ): Promise<Decoration | null> => {
      try {
        let newDecoration = null;

        const user = await authorise(req);

        if (!user) {
          throw new Error("User cannot be found");
        }

        // const regex = /\b\d{1,5}\s[\w\s'&.-]+,\s[\w\s'&.-]+\b/;

        // const isAddress = regex.test(input.address);

        // if (!isAddress) {
        //   throw new Error("Address provided is not valid.");
        // }

        const images: { id: string; url: string }[] = [];

        for (const image of input.images) {
          const newImage = await Cloudinary.upload(image);
          images.push(newImage);
        }

        if (images.length > 0) {
          newDecoration = await prisma.decoration.create({
            data: {
              name: input.name,
              address: input.address,
              city: input.city,
              country: input.country,
              latitude: input.latitude,
              longitude: input.longitude,
              region: input.region,
              num_ratings: 0,
              num_views: 0,
              rating: 0,
              verification_submitted: false,
              verified: false,
              year: new Date().getFullYear().toString(),
              creator_id: user.id,
              images: {
                create: images,
              },
            },
          });
        }

        return newDecoration;
      } catch (error) {
        //@ts-ignore
        throw new Error(error.message);
      }
    },
  },
  Decoration: {
    id: (decoration: Decoration): string => {
      return decoration.id;
    },
  },
};
