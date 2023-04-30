import { addToCart, unloadCart } from "../controllers/accountControllers.js";
import { Router } from "express";
import { validProductMiddleware } from "../middlewares/validProductMiddleware.js";
import { authValidation } from "../middlewares/authMiddleware.js";
const router = Router();

router.use(authValidation);
router.post("/cart", validProductMiddleware, addToCart);
router.post("/cart/unload", unloadCart);
router.post("/checkout", () => console.log("Placeholder"));
router.get("/checkout/orders", () => console.log("Placeholder"));

export default router;
