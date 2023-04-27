import { Router } from "express";

const router = Router();

router.get("/products", ()=>console.log('placeholder'));
router.get("/products/:id", ()=>console.log('placeholder'));

export default router;
