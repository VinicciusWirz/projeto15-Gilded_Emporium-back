import { Router } from "express";
import validateSchema from "../middlewares/validateSchema.js";
import orderSchema from "../Schemas/orderSchema.js";
import validateUser from "../middlewares/checkout/validateUser.js";
import { getOrders, postOrder } from "../controllers/checkOutControllers.js";
import getTotal from "../middlewares/checkout/getTotal.js";

const router = Router();

router.use(validateUser)
router.post("/orders", validateSchema(orderSchema), getTotal, postOrder);
router.get("/orders", getOrders);

export default router