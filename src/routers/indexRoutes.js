import { Router } from "express";
import authRouter from "./authRoutes.js";
import productsRouter from "./productsRoutes.js";
import accountRouter from "./accountRoutes.js";

const router = Router();
router.use(authRouter);
router.use(productsRouter);
router.use(accountRouter);

export default router;
