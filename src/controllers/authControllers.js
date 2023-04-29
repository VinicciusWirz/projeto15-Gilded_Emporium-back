import { db } from "../database/databaseConnection.js";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";

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
  const emailInUse = res.locals.user;

  try {
    const user = await db.collection("users").findOne({ email });

    if (!email || !password) return res.status(422).send("Dados inválidos!");

    const token = uuidv4();

    await db.collection("sessions").insertOne({ token, userId: user._id });

    res.status(200).send(token, emailInUse.name, emailInUse.email);
  } catch (err) {
    res.sendStatus(500);
  }
}
