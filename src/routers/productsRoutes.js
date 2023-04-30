import { Router } from "express";
import {
  getProductInfo,
  getProducts,
} from "../controllers/productsControllers.js";
import { validProductMiddleware } from "../middlewares/validProductMiddleware.js";

const router = Router();

router.get("/products", getProducts);
router.get("/products/:id", validProductMiddleware, getProductInfo);

export default router;
