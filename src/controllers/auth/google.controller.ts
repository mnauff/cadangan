import { Request, Response } from "express";
import { oauth2Client } from "../../util/oauth";
import { google } from "googleapis";
import prisma from "../../util/prisma";
import { createUser, getUserByEmail } from "../../service/user.service";
import { errorResponse, successResponse } from "../../util/response";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";

export async function googleOauth(req: Request, res: Response) {
  try {
    const { code } = req.query;
    const { tokens } = await oauth2Client.getToken(code as string);
    oauth2Client.setCredentials(tokens);

    const oauth2 = google.oauth2({
      auth: oauth2Client,
      version: "v2",
    });

    const { data } = await oauth2.userinfo.get();

    if (!data.name || !data.email) {
      return res
        .status(400)
        .json(errorResponse("Google OAuth did not return a name and email."));
    }

    let user = await getUserByEmail(data.email);

    if (!user) {
      // Since this is OAuth, we don't have a password, so we use a placeholder
      const placeholderPassword = "OAuthUserPlaceholderPassword";
      user = await createUser(data.name, data.email, placeholderPassword);
    }

    // Generate a JWT token for the user
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "1h",
    });

    // Optionally, update the user's token in the database
    user = await prisma.user.update({
      where: { id: user.id },
      data: { token },
    });

    // Set the token as a cookie (optional)
    res.cookie("token", token, { httpOnly: true });

    // Return user information and token
    return res
      .status(200)
      .json(successResponse("OAuth login successful", { user }));
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error during Google OAuth: ${error.message}`);
      return res.status(500).json(errorResponse("Internal server error"));
    } else {
      console.error("Unknown error during Google OAuth");
      return res.status(500).json(errorResponse("Internal server error"));
    }
  }
}
