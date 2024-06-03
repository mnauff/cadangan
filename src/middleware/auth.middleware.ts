import { NextFunction, Request, Response } from "express";
import { errorResponse } from "../util/response";

import jwt, { JwtPayload } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;

export interface CustomRequest extends Request {
  token: string | JwtPayload;
}

export const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new Error();
    }

    const decoded = jwt.verify(token, JWT_SECRET);

    (req as CustomRequest).body.token = decoded;

    next();
  } catch (err) {
    res.status(403).json(errorResponse("Invalid token."));
  }
};
