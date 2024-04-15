import { Request, Response } from "express";
import { prisma } from "../../../database";
import { Decoration, DecorationImage, User } from "@prisma/client";
import {
  AddDecorationToHistoryArgs,
  AddViewArgs,
  CreateDecorationArgs,
  DecorationsViaMapArgs,
  DeleteDecorationArgs,
  DeleteRatingArgs,
  EditDecorationArgs,
  EditRatingArgs,
  FavouriteDecorationArgs,
  GetDecorationArgs,
  GetRecommendedDecorationsArgs,
  RateDecorationArgs,
  ReportDecorationArgs,
  SearchForDecorationsArgs,
  SubmitDecorationForVerificationArgs,
  getDecorationsViaSearchArgs,
  removeDecorationFromHistoryArgs,
  unfavouriteDecorationArgs,
} from "./types";
import { authorise, calculateRating } from "../../../lib/helpers";
import { Cloudinary } from "../../../lib/cloudinary";
import { Resend } from "resend";
import fetch from "node-fetch";

const resend = new Resend("re_H1GDoBf9_Kwqwhasy8MZsLo6Tn3ej8bBc");

export const decorationResolvers = {
  Query: {
    getDecoration: async (
      _root: undefined,
      { input }: GetDecorationArgs,
      { _, req, res }: { _: undefined; req: Request; res: Response }
    ): Promise<Decoration> => {
      try {
        const user = await prisma.user.findFirst({
          where: {
            id: input.userId,
          },
        });

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

        //rethink verified logic
        if (user && !decoration.verified && decoration.creator_id !== user.id) {
          throw new Error("decoration is not verified");
        }

        return decoration;
      } catch (error) {
        throw new Error(`${error}`);
      }
    },
    getRecommendedDecorations: async (
      _root: undefined,
      { input }: GetRecommendedDecorationsArgs,
      { _, req, res }: { _: undefined; req: Request; res: Response }
    ): Promise<Decoration[]> => {
      try {
        const decorations = await prisma.decoration.findMany({
          where: {
            city: input.city,
            verified: true,
            NOT: {
              id: input.id,
            },
          },
          skip: 0,
          take: 8,
          include: {
            images: true,
          },
        });

        if (!decorations) {
          throw new Error("Decorations cannot be found!");
        }

        return decorations;
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
    getDecorationsByCity: async (
      _root: undefined,
      {},
      { _, req, res }: { _: undefined; req: Request; res: Response }
    ): Promise<Decoration[]> => {
      try {
        let city: { text: string } | null = null;
        let decorations: Decoration[] | null = null;
        const latitude = req.get("latitude");
        const longitude = req.get("longitude");

        if (latitude && longitude) {
          const response = await fetch(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${process.env.MAPBOX_API_KEY}`
          );
          const jsonData: any = await response.json();
          if (jsonData.features) {
            city = jsonData.features.find((item: any) => {
              item.place_type.includes("place");
            });
          }
          decorations = await prisma.decoration.findMany({
            where: {
              city: city?.text,
              verified: true,
            },
            include: {
              images: true,
            },
            skip: 0,
            take: 18,
          });
        } else {
          decorations = await prisma.decoration.findMany({
            where: {
              OR: [
                {
                  country: "New Zealand",
                },
                {
                  country: "Australia",
                },
              ],
              verified: true,
            },
            include: {
              images: true,
            },
            skip: 0,
            take: 18,
          });
        }

        return decorations;
      } catch (error) {
        throw new Error(`${error}`);
      }
    },
    getDecorationsByRating: async (
      _root: undefined,
      {},
      { _, req, res }: { _: undefined; req: Request; res: Response }
    ): Promise<Decoration[]> => {
      try {
        const decorations = await prisma.decoration.findMany({
          where: {
            rating: {
              gt: 3.5,
            },
            verified: true,
          },
          include: {
            images: true,
          },
          skip: 0,
          take: 18,
        });

        return decorations;
      } catch (error) {
        throw new Error(`${error}`);
      }
    },
    getDecorationsViaCountry: async (
      _root: undefined,
      { input }: DecorationsViaMapArgs,
      { _, req, res }: { _: undefined; req: Request; res: Response }
    ): Promise<{ decorations: Decoration[]; count: number; type: string }> => {
      try {
        let country: { text: string } | null = null;
        let decorations: Decoration[] | null = null;
        let count: number = 0;

        if (input.latitude && input.longitude) {
          const response = await fetch(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${input.longitude},${input.latitude}.json?types=country&access_token=${process.env.MAPBOX_API_KEY}&proximity=${input.longitude},${input.latitude}`
          );
          const jsonData = await response.json();
          if (jsonData.features) {
            country = jsonData.features[0];
          }
          decorations = await prisma.decoration.findMany({
            where: {
              country: country?.text,
              verified: true,
            },
            include: {
              images: true,
            },
            skip: input.skip,
            take: 18,
          });
          count = await prisma.decoration.count({
            where: {
              country: country?.text,
              verified: true,
            },
          });
        } else {
          throw new Error("Latitude and Longitude not provided.");
        }

        return { decorations: decorations, count: count, type: "country" };
      } catch (error) {
        throw new Error(`${error}`);
      }
    },
    getDecorationsViaRegion: async (
      _root: undefined,
      { input }: DecorationsViaMapArgs,
      { _, req, res }: { _: undefined; req: Request; res: Response }
    ): Promise<{ decorations: Decoration[]; count: number; type: string }> => {
      try {
        let region: { text: string } | null = null;
        let decorations: Decoration[] | null = null;
        let count: number = 0;

        if (input.latitude && input.longitude) {
          const response = await fetch(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${input.longitude},${input.latitude}.json?types=region&access_token=${process.env.MAPBOX_API_KEY}&proximity=${input.longitude},${input.latitude}`
          );
          const jsonData = await response.json();
          if (jsonData.features) {
            region = jsonData.features[0];
          }
          decorations = await prisma.decoration.findMany({
            where: {
              region: region?.text,
              verified: true,
            },
            include: {
              images: true,
            },
            skip: input.skip,
            take: 18,
          });
          count = await prisma.decoration.count({
            where: {
              region: region?.text,
              verified: true,
            },
          });
        } else {
          throw new Error("Latitude and Longitude not provided.");
        }

        return { decorations: decorations, count: count, type: "region" };
      } catch (error) {
        throw new Error(`${error}`);
      }
    },
    getDecorationsViaCity: async (
      _root: undefined,
      { input }: DecorationsViaMapArgs,
      { _, req, res }: { _: undefined; req: Request; res: Response }
    ): Promise<{ decorations: Decoration[]; count: number; type: string }> => {
      try {
        let city: { text: string } | null = null;
        let decorations: Decoration[] | null = null;
        let count: number = 0;

        if (input.latitude && input.longitude) {
          const response = await fetch(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${input.longitude},${input.latitude}.json?types=place&access_token=${process.env.MAPBOX_API_KEY}&proximity=${input.longitude},${input.latitude}`
          );
          const jsonData = await response.json();
          if (jsonData.features) {
            city = jsonData.features[0];
          }
          decorations = await prisma.decoration.findMany({
            where: {
              city: city?.text,
              verified: true,
            },
            include: {
              images: true,
            },
            skip: input.skip,
            take: 18,
          });
          count = await prisma.decoration.count({
            where: {
              city: city?.text,
              verified: true,
            },
          });
        } else {
          throw new Error("Latitude and Longitude not provided.");
        }

        return { decorations: decorations, count: count, type: "city" };
      } catch (error) {
        throw new Error(`${error}`);
      }
    },
    searchForDecorations: async (
      _root: undefined,
      { input }: SearchForDecorationsArgs,
      { _, req, res }: { _: undefined; req: Request; res: Response }
    ): Promise<{
      decorations: Decoration[];
      count: number;
      type: "search";
    }> => {
      try {
        const [decorations, count] = await prisma.$transaction([
          prisma.decoration.findMany({
            skip: input.skip,
            take: 18,
            where: {
              OR: [
                {
                  name: {
                    contains: input.searchTerm,
                    mode: "insensitive",
                  },
                },
                {
                  city: {
                    contains: input.searchTerm,
                    mode: "insensitive",
                  },
                },
                {
                  address: {
                    contains: input.searchTerm,
                    mode: "insensitive",
                  },
                },
              ],
            },
            include: {
              images: true,
            },
          }),
          prisma.decoration.count({
            where: {
              OR: [
                {
                  name: {
                    contains: input.searchTerm,
                    mode: "insensitive",
                  },
                },
                {
                  city: {
                    contains: input.searchTerm,
                    mode: "insensitive",
                  },
                },
                {
                  address: {
                    contains: input.searchTerm,
                    mode: "insensitive",
                  },
                },
              ],
            },
          }),
        ]);

        return { decorations: decorations, count: count, type: "search" };
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
          throw new Error("Not authenticated");
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
              route_id: null,
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
          throw new Error("Not authenticated");
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
          throw new Error("Not authenticated");
        }

        await prisma.user.update({
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

        return user;
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
          throw new Error("Not authenticated");
        }

        await prisma.user.update({
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

        return user;
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
          throw new Error("Not authenticated");
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
            from: "christmaslightsapp.com",
            to: owner.email,
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
          throw new Error("Not authenticated");
        }

        await prisma.rating.update({
          where: {
            id: input.id,
          },
          data: {
            rating: input.rating,
          },
        });

        if (!user) {
          throw new Error("Failed to edit rating");
        }

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
          throw new Error("Not authenticated");
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
          from: "christmaslightsapp.com",
          to: "edmiller.me@gmail.com", //Change to admin email when deploying to prod
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
          throw new Error("Not authenticated");
        }

        const decoration = await prisma.decoration.findFirst({
          where: {
            id: input.id,
          },
        });

        if (!decoration) {
          throw new Error("Decoration does not exist");
        }

        if (decoration.verification_submitted || decoration.verified) {
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
          from: "christmaslightsapp.com",
          to: "edmiller.me@gmail.com", //TODO: Change to admin email when deploying to prod
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
          //TODO: send email to user
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
    addDecorationToHistory: async (
      _root: undefined,
      { input }: AddDecorationToHistoryArgs,
      { _, req, res }: { _: undefined; req: Request; res: Response }
    ): Promise<User> => {
      try {
        const user = await authorise(req);

        if (!user) {
          throw new Error("Not authenticated");
        }

        const firstDecoration = user.history[0];
        const userHistoryCount = user.history.length;

        const exists = user.history.some(
          (item: Decoration) => item.id === input.id
        );

        //decoration already exists in user history
        if (exists) {
          return user;
        }

        if (user.premium && !exists) {
          if (userHistoryCount < 24) {
            await prisma.user.update({
              where: {
                id: user.id,
              },
              data: {
                history: {
                  connect: {
                    id: input.id,
                  },
                },
              },
            });
          } else if (userHistoryCount === 24) {
            await prisma.user.update({
              where: {
                id: user.id,
              },
              data: {
                history: {
                  disconnect: {
                    id: firstDecoration.id,
                  },
                  connect: {
                    id: input.id,
                  },
                },
              },
            });
          }
        } else if (!user.premium && !exists) {
          if (userHistoryCount < 12) {
            await prisma.user.update({
              where: {
                id: user.id,
              },
              data: {
                history: {
                  connect: {
                    id: input.id,
                  },
                },
              },
            });
          } else {
            await prisma.user.update({
              where: {
                id: user.id,
              },
              data: {
                history: {
                  disconnect: {
                    id: firstDecoration.id,
                  },
                  connect: {
                    id: input.id,
                  },
                },
              },
            });
          }
        }

        return user;
      } catch (error) {
        throw new Error(`${error}`);
      }
    },
    removeDecorationFromHistory: async (
      _root: undefined,
      { input }: removeDecorationFromHistoryArgs,
      { _, req, res }: { _: undefined; req: Request; res: Response }
    ): Promise<User> => {
      try {
        const user = await authorise(req);

        if (!user) {
          throw new Error("Not authenticated");
        }

        await prisma.user.update({
          where: {
            id: user.id,
          },
          data: {
            history: {
              disconnect: {
                id: input.id,
              },
            },
          },
        });

        return user;
      } catch (error) {
        throw new Error(`${error}`);
      }
    },
    deleteDecoration: async (
      _root: undefined,
      { input }: DeleteDecorationArgs,
      { _, req, res }: { _: undefined; req: Request; res: Response }
    ): Promise<String> => {
      try {
        const user = await authorise(req);

        if (!user) {
          throw new Error("Not authenticated");
        }

        const decoration = await prisma.decoration.findFirst({
          where: {
            id: input.decorationId,
          },
          include: {
            images: true,
          },
        });

        const decorationImages = decoration?.images;

        const deleteViews = prisma.view.deleteMany({
          where: {
            decoration_id: input.decorationId,
          },
        });

        const deleteRatings = prisma.rating.deleteMany({
          where: {
            decoration_id: input.decorationId,
          },
        });

        const deleteImages = prisma.decorationImage.deleteMany({
          where: {
            decoration_id: input.decorationId,
          },
        });

        const deleteDecoration = prisma.decoration.delete({
          where: {
            id: input.decorationId,
          },
        });

        const transaction = await prisma.$transaction([
          deleteViews,
          deleteRatings,
          deleteImages,
          deleteDecoration,
        ]);

        if (!transaction) {
          throw new Error("An error occurred deleting the decoration");
        }

        decorationImages?.forEach((image) => {
          Cloudinary.destroy(image.id);
        });

        return "Success";
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
