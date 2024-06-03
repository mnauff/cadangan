import express from "express";
import auth from "./auth";
import user from "./user";
import post from "./property";

const router = express.Router();

export default (): express.Router => {
  auth(router);
  user(router);
  post(router);
  return router;
};
