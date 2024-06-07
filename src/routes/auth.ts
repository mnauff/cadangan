import express from "express";
import { registerUser } from "../controllers/auth/register.controller";
import { loginUser } from "../controllers/auth/login.controller";
import { authenticateToken } from "../middleware/auth.middleware";
import { deleteUser, getUserDetail } from "../controllers/user.controller";

const router = express.Router();

/**
 * @openapi
 * /auth/register:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateUserInput'
 *     responses:
 *       201:
 *         description: Successfully registered
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateUserResponse'
 *       409:
 *         description: User already exists
 *       500:
 *         description: Internal server error
 */
router.post("/auth/register", registerUser);

/**
 * @openapi
 * /auth/login:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Login a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginUserInput'
 *     responses:
 *       200:
 *         description: Successfully logged in
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginUserResponse'
 *       401:
 *         description: Email or password incorrect
 *       500:
 *         description: Internal server error
 */
router.post("/auth/login", loginUser);

router.get("/auth/user/:id", authenticateToken, getUserDetail);
router.delete("/auth/user/:id", authenticateToken, deleteUser);

export default (router: express.Router) => {
  router.use(router);
};
