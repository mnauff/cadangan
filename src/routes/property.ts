import express from "express";
import { authenticateToken } from "../middleware/auth.middleware";
import { newProperty } from "../controllers/property/property.controller";

export default (router: express.Router) => {
  // router.get("/post/property", authenticateToken, queryProperty);
  router.post("/post/property", authenticateToken, newProperty);
};
