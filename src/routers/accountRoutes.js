import {
  addToCart,
  clearCart,
  getCart,
  removeItem,
  unloadCart,
} from "../controllers/accountControllers.js";
import { Router } from "express";
import { validProductMiddleware } from "../middlewares/validProductMiddleware.js";
import { authValidation } from "../middlewares/authMiddleware.js";
const router = Router();

router.use(authValidation);
router.get("/cart", getCart);
router.post("/cart", validProductMiddleware, addToCart);
router.post("/cart/unload", unloadCart);
router.delete("/cart/clear", clearCart);
router.delete("/cart/remove/:id", validProductMiddleware, removeItem);

export default router;
