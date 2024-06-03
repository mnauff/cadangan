import express from "express";
import { getUserById, queryUsers, removeUser } from "../service/user.service";
import { errorResponse, successResponse } from "../util/response";
import pick from "../util/pick";
import prisma from "../util/prisma";

export async function queryAllUsers(
  req: express.Request,
  res: express.Response
) {
  const limit = parseInt(req.query.limit as string) ?? 10;
  const page = parseInt(req.query.page as string) ?? 1;

  const sortBy = req.query.sort_by as string | undefined;
  const sortOrder = (req.query.sort_order as string) ?? "desc";

  const options = { limit, page, sortBy, sortOrder };

  const user = await queryUsers(pick(req.query, ["name", "email"]), options);
  return res
    .status(200)
    .json(successResponse("User retrieved successfully", user));
}

export async function getUserDetail(
  req: express.Request,
  res: express.Response
) {
  try {
    const user = await getUserById(req.params.id);
    return res
      .status(200)
      .json(successResponse("User details retrieved successfully", user));
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error during fetching user detail: ${error.message}`);
      return res.status(500).json(errorResponse("Internal server error"));
    } else {
      console.error("Unknown error during fetching user detail");
      return res.status(500).json(errorResponse("Internal server error"));
    }
  }
}

export const deleteUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;

    // Attempt to delete the user
    const deletedUser = await removeUser(id);

    if (!deletedUser) {
      // If the user is not found, return a 404 error
      return res.status(404).json(errorResponse("User not found"));
    }

    // Return a success response
    return res
      .status(200)
      .json(successResponse("User deleted successfully", null));
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error during delete user: ${error.message}`);
      return res.status(500).json(errorResponse("Internal server error"));
    } else {
      console.error("Unknown error during delete user");
      return res.status(500).json(errorResponse("Internal server error"));
    }
  }
};
