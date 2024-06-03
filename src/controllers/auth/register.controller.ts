import { Request, Response } from "express";
import { createUser, getUserByEmail } from "../../service/user.service";
import { errorResponse, successResponse } from "../../util/response";
import { hashPassword } from "../../util/hash";
import prisma from "../../util/prisma";
import exclude from "../../util/exclude";

export async function registerUser(req: Request, res: Response) {
  const { name, email, password } = req.body;

  try {
    const user = await getUserByEmail(email);

    if (user) {
      return res
        .status(409)
        .json(errorResponse("User with this email already exists"));
    }

    const newUser = await createUser(name, email, password);
    exclude(newUser, ["name", "password", "created_at", "updated_at"]);

    return res.status(201).json(
      successResponse("User created successfully!", {
        data: newUser,
      })
    );
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error during user registration: ${error.message}`);
      return res.status(500).json(errorResponse("Internal server error"));
    } else {
      console.error("Unknown error during user registration");
      return res.status(500).json(errorResponse("Internal server error"));
    }
  }
}
