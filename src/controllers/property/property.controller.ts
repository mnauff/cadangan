import express from "express";
import { createNewProperty } from "../../service/property.service";
import { createNewPost } from "../../service/post.service";
import { successResponse } from "../../util/response";

export const newProperty = async (
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
