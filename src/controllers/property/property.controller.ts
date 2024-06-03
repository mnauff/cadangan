import express from "express";
import {
  createNewProperty,
  queryProperties,
} from "../../service/property.service";
import { createNewPost } from "../../service/post.service";
import { successResponse } from "../../util/response";
import pick from "../../util/pick";

export const createProperty = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const {
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
    } = req.body;

    const property = await createNewProperty(
      propertyImage,
      propertyName,
      location,
      description,
      bedroom,
      bathroom,
      buildingArea,
      landArea,
      floor,
      year
    );

    await createNewPost(property.id, req.body.token.id);

    return res.status(201).json(
      successResponse("Property created successfully!", {
        data: property,
      })
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getAllProperty = async (
  req: express.Request,
  res: express.Response
) => {
  {
    const limit = parseInt(req.query.limit as string) ?? 10;
    const page = parseInt(req.query.page as string) ?? 1;

    const sortBy = req.query.sort_by as string | undefined;
    const sortOrder = (req.query.sort_order as string) ?? "desc";

    const options = { limit, page, sortBy, sortOrder };

    const props = await queryProperties(
      pick(req.query, [
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
      ]),
      options
    );
    return res
      .status(200)
      .json(successResponse("Properties retrieved successfully", props));
  }
};
