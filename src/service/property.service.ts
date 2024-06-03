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

export const queryProperties = async <Key extends keyof Property>(
  filter: object,
  options: {
    search?: string;
    limit?: number;
    page?: number;
    sortBy?: string;
    sortOrder?: string;
  },
  keys: Key[] = [
    "id",
    "bathroom",
    "bedroom",
    "buildingArea",
    "description",
    "floor",
    "landArea",
    "location",
    "propertyImage",
    "propertyName",
    "year",
  ] as Key[]
): Promise<Pick<Property, Key>[]> => {
  const page = options.page ?? 1;
  const limit = options.limit ?? 10;
  const sortBy = options.sortBy;
  const sortOrder = options.sortOrder ?? "desc";

  const props = await prisma.property.findMany({
    where: filter,
    select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {}),
    take: limit,
    skip: (page - 1) * limit,
    orderBy: sortBy ? { [sortBy]: sortOrder } : undefined,
  });
  return props as Pick<Property, Key>[];
};
