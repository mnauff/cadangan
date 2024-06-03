import { Post } from "@prisma/client";
import prisma from "../util/prisma";

export const createNewPost = async (
  propertyId: string,
  userId: string
): Promise<Post> => {
  try {
    return await prisma.post.create({
      data: {
        propertyId: propertyId,
        userId: userId,
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Unable to create user: ${error.message}`);
    } else {
      throw new Error("Unable to create user: Unknown error");
    }
  }
};
