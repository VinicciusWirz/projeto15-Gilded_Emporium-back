import { Router } from "express";
import {
  getProductInfo,
  getProducts,
} from "../controllers/productsControllers.js";
import { validIDMiddleware } from "../middlewares/validIDMiddleware.js";

const router = Router();

router.get("/products", getProducts);
router.get("/products/:id", validIDMiddleware, getProductInfo);

export default router;
