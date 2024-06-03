import dotenv from "dotenv";
import cors from "cors";
import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import { authorizationUrl } from "./util/oauth";
import router from "./routes";
import { googleOauth } from "./controllers/auth/google.controller";
import session from "express-session";

const app = express();
const port = process.env.PORT || 8080;

dotenv.config();
app.use(bodyParser.json());
app.use(
  cors({
    origin: "*",
  })
);

app.use(
  session({
    secret: process.env.JWT_SECRET as string,
    resave: false,
    saveUninitialized: true,
  })
);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript Express!");
});

app.use("/v1", router());

app.get("/auth/google", (req, res) => {
  res.redirect(authorizationUrl);
});
app.get("/auth/google/callback", googleOauth);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
