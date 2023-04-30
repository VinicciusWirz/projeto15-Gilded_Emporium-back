import { ObjectId } from "mongodb";
import { db } from "../database/databaseConnection.js";

export async function validProductMiddleware(req, res, next) {
  const _id = req.body.productId || req.params.id;
  if (!_id) return res.status(401).send("Missing id");
  if (!ObjectId.isValid(_id)) return res.sendStatus(400);
  try {
    const product = await db
      .collection("products")
      .findOne({ _id: new ObjectId(_id) });
    if (!product) return res.status(404).send("Product not found");

    next();
  } catch (error) {
    res.status(500).send(error.message);
  }
}
