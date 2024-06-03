import { Property } from "@prisma/client";
import prisma from "../util/prisma";

export const createNewProperty = async (
  propertyImage: string,
  propertyName: string,
  location: string,
  description: string,
  bedroom: number,
  bathroom: number,
  buildingArea: number,
  landArea: number,
  floor: number,
  year: number
): Promise<Property> => {
  try {
    return await prisma.property.create({
      data: {
        propertyImage,
        propertyName,
        location,
        description,
        bedroom,
        bathroom,
        buildingArea,
        landArea,
        floor,
        year,
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
