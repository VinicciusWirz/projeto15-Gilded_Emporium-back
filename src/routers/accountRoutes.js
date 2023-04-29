import { addToCart } from "../controllers/accountControllers.js";
import { Router } from "express";
import { validProductMiddleware } from "../middlewares/validProductMiddleware.js";
const router = Router();

router.post("/cart", validProductMiddleware, addToCart);
router.post("/checkout", () => console.log("Placeholder"));
router.get("/checkout/orders", () => console.log("Placeholder"));

export default router;
