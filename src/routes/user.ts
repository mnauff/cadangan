import express from "express";

import { authenticateToken } from "../middleware/auth.middleware";
import {
  deleteUser,
  getUserDetail,
  queryAllUsers,
} from "../controllers/user.controller";

export default (router: express.Router) => {
  router.get("/user", authenticateToken, queryAllUsers);
  router.get("/user/:id", authenticateToken, getUserDetail);
  router.delete("/user/:id", authenticateToken, deleteUser);
};
