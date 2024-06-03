import { Request, Response } from "express";
import { getUserByEmail, updateUserToken } from "../../service/user.service";
import { errorResponse, successResponse } from "../../util/response";
import { comparePassword } from "../../util/hash";
import { generateToken } from "../../util/jwt";

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await getUserByEmail(email);
    const passwordMatch = await comparePassword(
      password,
      user?.password as string
    );

    if (!user || !passwordMatch) {
      return res
        .status(401)
        .json(errorResponse("Email or password incorrect!"));
    }
    const token = generateToken({ id: user.id, email: user.email });

    const loggedUser = await updateUserToken(user.id, token);

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
    });

    return res.status(200).json(
      successResponse("Login successfully", {
        token: loggedUser.token,
      })
    );
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error during user login: ${error.message}`);
      return res.status(500).json(errorResponse("Internal server error"));
    } else {
      console.error("Unknown error during user login");
      return res.status(500).json(errorResponse("Internal server error"));
    }
  }
};
