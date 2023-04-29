import { Router } from "express";
import { signIn, signUp } from "../controllers/authControllers.js";
import {
  signUpMiddleware,
  signInMiddleware,
} from "../middlewares/authMiddleware.js";

const authRouter = Router();

authRouter.post("/sign-up", signUpMiddleware, signUp);
authRouter.post("/sign-in", signInMiddleware, signIn);

export default authRouter;
