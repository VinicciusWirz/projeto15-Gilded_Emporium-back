import { db } from "../database/databaseConnection.js";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";

export async function signUp(req, res) {
  const { name, email, password } = req.body;
  const passHash = bcrypt.hashSync(password, 10);

  try {
    const emailIncluded = await db.collection("users").findOne({ email });

    if (!name || !email || !password)
      return res.status(422).send("Dados inválidos!");

    if (emailIncluded) return res.status(409).send("Email já está em uso!");

    await db.collection("users").insertOne({ name, email, password: passHash });

    res.status(201).send("Usuário cadastrado com sucesso!");
  } catch (err) {
    res.sendStatus(500);
  }
}

export async function signIn(req, res) {
  const { email, password } = req.body;

  try {
    const emailInUse = await db.collection("users").findOne({ email });

    if (!email || !password) return res.status(422).send("Dados inválidos!");

    if (!emailInUse) return res.status(404).send("Usuário ou senha inválidos!");

    const hashPassword = bcrypt.compareSync(password, emailInUse.password);

    if (!hashPassword)
      return res.status(401).send("Usuário ou senha inválidos!");

    const token = uuidv4();

    await db
      .collection("sessions")
      .insertOne({ token, userId: emailInUse._id });

    const user = await db.collection("users").findOne({ _id: emailInUse._id });

    res.status(200).send({ name: user.name, email: user.email, token });
  } catch (err) {
    res.sendStatus(500);
  }
}
