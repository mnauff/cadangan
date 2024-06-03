import express from "express";

import { registerUser } from "../controllers/auth/register.controller";
import { loginUser } from "../controllers/auth/login.controller";
import { authenticateToken } from "../middleware/auth.middleware";
import { deleteUser, getUserDetail } from "../controllers/user.controller";

export default (router: express.Router) => {
  router.post("/auth/register", registerUser);
  router.post("/auth/login", loginUser);
  router.get("/auth/user/:id", authenticateToken, getUserDetail);
  router.delete("/auth/user/:id", authenticateToken, deleteUser);
};
