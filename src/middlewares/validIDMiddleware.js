import { ObjectId } from "mongodb";
import { db } from "../database/databaseConnection.js";

export async function validIDMiddleware(req, res, next) {
  if (!req.params.id) return res.status(401).send("Missing id");
  if (!ObjectId.isValid(req.params.id)) return res.sendStatus(400);
  next();
}
