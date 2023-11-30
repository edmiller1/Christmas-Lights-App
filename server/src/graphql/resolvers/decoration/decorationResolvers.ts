import { Request, Response } from "express";
import { prisma } from "../../../database";
import { Decoration, DecorationImage, User } from "@prisma/client";
import {
  AddViewArgs,
  CreateDecorationArgs,
  DeleteRatingArgs,
  EditDecorationArgs,
  EditRatingArgs,
  FavouriteDecorationArgs,
  GetDecorationArgs,
  RateDecorationArgs,
  ReportDecorationArgs,
  SubmitDecorationForVerificationArgs,
  unfavouriteDecorationArgs,
} from "./types";
import { authorise, calculateRating } from "../../../lib/helpers";
import { Cloudinary } from "../../../lib/cloudinary";
import { Resend } from "resend";

const resend = new Resend("re_H1GDoBf9_Kwqwhasy8MZsLo6Tn3ej8bBc");

export const decorationResolvers = {
  Query: {
    getDecoration: async (
      _root: undefined,
      { input }: GetDecorationArgs,
      { _, req, res }: { _: undefined; req: Request; res: Response }
    ): Promise<Decoration> => {
      try {
        const user = await authorise(req);

        const decoration = await prisma.decoration.findFirst({
          where: {
            id: input.id,
          },
          include: {
            creator: true,
            ratings: true,
            images: true,
            views: true,
          },
        });

        if (!decoration) {
          throw new Error("Decoration cannot be found");
        }

        if (user) {
          if (!decoration.verified && decoration.creator_id === user.id) {
            return decoration;
          } else {
            throw new Error("Decoration is not verified");
          }
        } else if (!user && !decoration.verified) {
          throw new Error("Decoration is not verified");
        }

        return decoration;
      } catch (error) {
        throw new Error(`${error}`);
      }
    },
    getVerificationSubmissions: async (
      _root: undefined,
      {},
      { _, req, res }: { _: undefined; req: Request; res: Response }
    ): Promise<Decoration[]> => {
      try {
        const decorations = await prisma.decoration.findMany({
          where: {
            verification_submitted: true,
          },
        });

        return decorations;
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
        throw new Error(`${error}`);
      }
    },
    editDecoration: async (
      _root: undefined,
      { input }: EditDecorationArgs,
      { _, req, res }: { _: undefined; req: Request; res: Response }
    ): Promise<Decoration> => {
      try {
        const user = await authorise(req);

        if (!user) {
          throw new Error("User cannot be found");
        }

        const newImages: { id: string; url: string }[] = [];
        if (input.newImages) {
          for (const image of input.newImages) {
            const newImage = await Cloudinary.upload(image);
            newImages.push(newImage);
          }
        }

        if (input.deletedImages) {
          for (const image of input.deletedImages) {
            await Cloudinary.destroy(image.id);
          }
        }

        const updatedDecoration = await prisma.decoration.update({
          where: {
            id: input.id,
          },
          data: {
            name: input.name,
            address: input.address,
            latitude: input.latitude,
            longitude: input.longitude,
            country: input.country,
            region: input.region,
            city: input.city,
            images: {
              create: newImages ? newImages : [],
              deleteMany: input.deletedImages ? input.deletedImages : [],
            },
          },
        });

        return updatedDecoration;
      } catch (error) {
        throw new Error(`${error}`);
      }
    },
    favouriteDecoration: async (
      _root: undefined,
      { input }: FavouriteDecorationArgs,
      { _, req, res }: { _: undefined; req: Request; res: Response }
    ): Promise<User> => {
      try {
        const user = await authorise(req);

        if (!user) {
          throw new Error("User cannot be found");
        }

        const updatedUser = await prisma.user.update({
          where: {
            id: user.id,
          },
          data: {
            favourites: {
              connect: {
                id: input.id,
              },
            },
          },
        });

        return updatedUser;
      } catch (error) {
        throw new Error(`${error}`);
      }
    },
    unfavouriteDecoration: async (
      _root: undefined,
      { input }: unfavouriteDecorationArgs,
      { _, req, res }: { _: undefined; req: Request; res: Response }
    ): Promise<User> => {
      try {
        const user = await authorise(req);

        if (!user) {
          throw new Error("User cannot be found");
        }

        const updatedUser = await prisma.user.update({
          where: {
            id: user.id,
          },
          data: {
            favourites: {
              disconnect: {
                id: input.id,
              },
            },
          },
        });

        return updatedUser;
      } catch (error) {
        throw new Error(`${error}`);
      }
    },
    addView: async (
      _root: undefined,
      { input }: AddViewArgs,
      { _, req, res }: { _: undefined; req: Request; res: Response }
    ): Promise<Decoration> => {
      try {
        const updatedDecoration = await prisma.decoration.update({
          where: {
            id: input.id,
          },
          data: {
            num_views: input.numViews + 1,
            views: {
              create: {},
            },
          },
        });

        return updatedDecoration;
      } catch (error) {
        throw new Error(`${error}`);
      }
    },
    rateDecoration: async (
      _root: undefined,
      { input }: RateDecorationArgs,
      { _, req, res }: { _: undefined; req: Request; res: Response }
    ): Promise<Decoration> => {
      try {
        const user = await authorise(req);

        if (!user) {
          throw new Error("User cannot be found");
        }

        const decoration = await prisma.decoration.findFirst({
          where: {
            id: input.id,
          },
        });

        if (!decoration) {
          throw new Error("Decoration doesn't exist");
        }

        if (user.id === decoration.creator_id) {
          throw new Error("Owner cannot rate their own decoration.");
        }

        const alreadyRated = await prisma.rating.findFirst({
          where: {
            user_id: user.id,
          },
        });

        if (alreadyRated) {
          throw new Error(
            "Decoration has already been rated by user. Please edit your rating."
          );
        }

        await prisma.rating.create({
          data: {
            rating: input.rating,
            decoration_id: input.id,
            user_id: user.id,
          },
        });

        const owner = await prisma.user.findFirst({
          where: {
            id: decoration.creator_id,
          },
        });

        if (!owner) {
          throw new Error("Decoration must have an owner");
        }

        if (owner.notifications_by_email_rating) {
          //send email to owner
          await resend.emails.send({
            from: "Acme <onboarding@resend.dev>",
            to: "edmiller.me@gmail.com",
            subject: "New Decoration Rating",
            html: `<p>New Decoration Rating</p>
            <p>Your decoration ${decoration.name} has recieved a new rating</p>
            &nbsp;
            <p>${decoration.name} recieved a rating of ${input.rating}</p>
            `,
          });
        }
        if (owner.notifications_on_app_rating) {
          //create notification
          await prisma.notification.create({
            data: {
              body: `⭐️ A new rating of ${input.rating} was recieved for your decoration: ${decoration.name}. ⭐️`,
              title: "New Decoration Rating ⭐️",
              unread: true,
              user_id: owner.id,
            },
          });
        }

        return decoration;
      } catch (error) {
        throw new Error(`${error}`);
      }
    },
    editRating: async (
      _root: undefined,
      { input }: EditRatingArgs,
      { _, req, res }: { _: undefined; req: Request; res: Response }
    ): Promise<User> => {
      try {
        const user = await authorise(req);

        if (!user) {
          throw new Error("User cannot be found");
        }

        await prisma.rating.update({
          where: {
            id: input.id,
          },
          data: {
            rating: input.rating,
          },
        });

        return user;
      } catch (error) {
        throw new Error(`${error}`);
      }
    },
    deleteRating: async (
      _root: undefined,
      { input }: DeleteRatingArgs,
      { _, req, res }: { _: undefined; req: Request; res: Response }
    ): Promise<User> => {
      try {
        const user = await authorise(req);

        if (!user) {
          throw new Error("User cannot be found");
        }

        await prisma.rating.delete({
          where: {
            id: input.id,
          },
        });

        return user;
      } catch (error) {
        throw new Error(`${error}`);
      }
    },
    reportDecoration: async (
      _root: undefined,
      { input }: ReportDecorationArgs,
      { _, req, res }: { _: undefined; req: Request; res: Response }
    ): Promise<Decoration> => {
      try {
        const user = await authorise(req);

        if (!user) {
          throw new Error("User canot be found");
        }

        const decoration = await prisma.decoration.findFirst({
          where: {
            id: input.id,
          },
        });

        if (!decoration) {
          throw new Error("Decoration cannot be found");
        }

        //create report
        await prisma.report.create({
          data: {
            additional_info: input.additionalDetails,
            unresolved: true,
            decoration_id: decoration.id,
            user_id: user.id,
            reasons: input.reportOptions,
          },
        });

        //Send email to CLA admin
        await resend.emails.send({
          from: "Acme <onboarding@resend.dev>",
          to: "edmiller.me@gmail.com",
          subject: "New Decoration Report",
          html: `<p>New Decoration Report</p>
          <p>Reported by: ${user.name}</p>
          <ul>
            <li>ID: ${user.id}</li>
            <li>Email: ${user.email}</li>
          </ul>
          <p>Reported Decoration:</p>
          <ul>
          <li>ID: ${decoration.id}</li>
          <li>Name: ${decoration.name}</li>
          <li>Address: ${decoration.address}</li>
          <li>ChristmasLightsApp link: http://localhost:3000/decoration/${
            decoration.id
          }/</li>
          </ul>
          <span>Reasons for Report</span>
          <ul>
          <li>${input.reportOptions.map((ro) => ro)}</li>
          </ul>
          <p>Additional Details:</p>
          <p>${input.additionalDetails}</p>
          `,
          text: "It Worked!!!",
          tags: [
            {
              name: "decoration_report",
              value: "decoration_report",
            },
          ],
        });

        return decoration;
      } catch (error) {
        throw new Error(`${error}`);
      }
    },
    submitDecorationForVerification: async (
      _root: undefined,
      { input }: SubmitDecorationForVerificationArgs,
      { _, req, res }: { _: undefined; req: Request; res: Response }
    ): Promise<Decoration> => {
      try {
        const user = await authorise(req);

        if (!user) {
          throw new Error("User cannot be found");
        }

        const decoration = await prisma.decoration.findFirst({
          where: {
            id: input.id,
          },
        });

        if (decoration?.verification_submitted || decoration?.verified) {
          throw new Error(
            "Decoration has already submitted a request for verification or is already verified"
          );
        }

        //upload image to Cloudinary
        const document = await Cloudinary.uploadVerification(input.document);

        const updatedDecoration = await prisma.decoration.update({
          where: {
            id: input.id,
          },
          data: {
            verification_submitted: true,
          },
        });

        await prisma.verification.create({
          data: {
            document: document.url,
            decoration_id: updatedDecoration.id,
            new: true,
            archived: false,
            approved: false,
            rejected: false,
            rejected_reason: "",
          },
        });

        //email admin about new verification_submitted
        await resend.emails.send({
          from: "Acme <onboarding@resend.dev>",
          to: "edmiller.me@gmail.com",
          subject: "New Verification Request",
          html: `<h1>New Verification Request<h1>
                  <p>User:</p>
                  <ul>
                  <li>ID: ${user.id}</li>
                  <li>Email: ${user.email}</li>
                  <li>Name: ${user.name}</li>
                </ul>
        
                <p>Decoration to be verified:</p>
                <ul>
                <li>URL: http://localhost:3000/decoration/${updatedDecoration.id}</li>
                <li>ID: ${updatedDecoration.id}</li>
                <li>Name: ${updatedDecoration.name}</li>
                <li>Address: ${updatedDecoration.address}</li>
                <li>Verification Image: ${document.url}</li>
                </ul>
                `,
        });

        //email user if they have allowed emails through notification settings
        if (user.notifications_by_email_verification) {
        }

        //create a notification for the user if they have allowed in app notifications
        if (user.notifications_on_app_verification) {
          await prisma.notification.create({
            data: {
              body: `Your verification submission for decoration: ${updatedDecoration.name} was successful. 
              We will notify you on whether your decoration is verified or not.`,
              title: "Verification Submission",
              unread: true,
              user_id: user.id,
            },
          });
        }

        return updatedDecoration;
      } catch (error) {
        throw new Error(`${error}`);
      }
    },
  },
  Decoration: {
    id: (decoration: Decoration): string => {
      return decoration.id;
    },
    rating: (decoration: Decoration): Promise<number> => {
      return calculateRating(decoration.id);
    },
  },
};
