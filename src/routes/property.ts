import express from "express";
import { authenticateToken } from "../middleware/auth.middleware";
import {
  createProperty,
  getAllProperty,
} from "../controllers/property/property.controller";

export default (router: express.Router) => {
  router.get("/post/property", authenticateToken, getAllProperty);
  router.post("/post/property", authenticateToken, createProperty);
};
