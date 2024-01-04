import { decorations } from "../src/lib/decoration";
import { decorationImages } from "../src/lib/decorationImage";
import { prisma } from "../src/database";

export const seedDb = async () => {
  try {
    console.log("🍁 [seed]: running...");

    await prisma.decoration.createMany({
      data: decorations,
    });

    await prisma.decorationImage.createMany({
      data: decorationImages,
    });

    console.log("🍁 [seed]: Success");
  } catch (error) {
    throw new Error(`Failed to seed database - ${error}`);
  }
};
