import { ObjectId } from "mongodb";
import { db } from "../database/databaseConnection.js";
import { regexFilter } from "../utils/regexFilter.js";

export async function getProducts(req, res) {
  const searchQuery = req.query.search_query || "";
  const searchTerms = searchQuery.split(" ");
  const filter = searchQuery ? regexFilter(searchTerms) : {};
  try {
    const products = await db.collection("products").find(filter).toArray();
    res.status(200).send(products);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function getProductInfo(req, res) {
  const id = req.params.id;
  try {
    const products = await db
      .collection("products")
      .findOne({ _id: new ObjectId(id) });
    res.status(200).send(products);
  } catch (error) {
    res.status(500).send(error.message);
  }
}
