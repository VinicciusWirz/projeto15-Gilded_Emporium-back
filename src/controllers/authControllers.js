import { db } from "../database/databaseConnection.js";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import { ObjectId } from "bson";

export async function signUp(req, res) {
  const { name, email, password } = req.body;
  const passHash = bcrypt.hashSync(password, 10);

  try {
    await db.collection("users").insertOne({ name, email, password: passHash });

    res.status(201).send("Usuário cadastrado com sucesso!");
  } catch (err) {
    res.sendStatus(500);
  }
}

export async function signIn(req, res) {
  const { _id, email, name } = res.locals.user;

  try {
    const token = uuidv4();

    await db
      .collection("sessions")
      .insertOne({ token, userId: new ObjectId(_id) });

    res.status(200).send({ token, name, email });
  } catch (err) {
    res.status(500).send(err.message);
  }
}
