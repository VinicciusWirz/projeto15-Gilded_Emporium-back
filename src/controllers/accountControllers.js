import { ObjectId } from "mongodb";
import { db } from "../database/databaseConnection.js";

// Falta middleware de authenticação de login
export async function addToCart(req, res) {
  const productId = req.body.productId;
  const session = res.locals.session;
  try {
    const product = await db
      .collection("products")
      .findOne({ _id: new ObjectId(productId) });
    if (!product) return res.status(404).send("Product not found");
    await db
      .collection("carts")
      .insertOne({ productId, userId: session.userId });
    res.status(201).send("Product added to the cart");
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function unloadCart(req, res) {
  const { cart } = req.body;
  if (!cart) return res.status(422).send("Missing Products");
  const session = res.locals.session;
  const assignedId = cart.map((p) => ({ ...p, userId: session.userId }));
  try {
    const result = await db.collection("carts").insertMany(assignedId);
    if (result.insertedCount === 0) return res.sendStatus(400);
    res.status(201).send("The shopping cart got updated");
  } catch (error) {
    res.status(500).send(err.message);
  }
}
