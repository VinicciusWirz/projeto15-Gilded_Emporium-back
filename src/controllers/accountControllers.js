import { ObjectId } from "mongodb";
import { db } from "../database/databaseConnection.js";

// Falta middleware de authenticação de login
export async function addToCart(req, res) {
  const productId = req.body.productId;
  const session = res.locals.session;
  try {
    const product = await db
      .collection("products")
      .findOne({ _id: new ObjectId(id) });
    if (!product) return res.status(404).send("Product not found");
    await db
      .collection("carts")
      .insertOne({ userId: session.userId, productId });
    res.status(201).send("Product added to the cart");
  } catch (error) {
    res.status(500).send(error.message);
  }
}
