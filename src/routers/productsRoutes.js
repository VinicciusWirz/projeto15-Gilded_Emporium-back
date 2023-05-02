import { Router } from "express";
import {
  getMany,
  getProductInfo,
  getProducts,
} from "../controllers/productsControllers.js";
import { validProductMiddleware } from "../middlewares/validProductMiddleware.js";

const router = Router();

router.get("/products", getProducts);
router.get("/products/:id", validProductMiddleware, getProductInfo);
router.get("/products/cart/items", getMany);

export default router;
