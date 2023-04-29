import { userSchema } from "../Schemas/authSchema.js";
import bcrypt from "bcrypt";
import { db } from "../database/databaseConnection.js";

export async function signUpMiddleware(req, res) {
  const user = req.body;

  const { error } = userSchema.validate(user, { abortEarly: false });

  if (error) {
    const errors = error.details.map((err) => err.message);
    return res.status(400).send(errors);
  }

  const checkUser = await db.collection("users").findOne({ email: user.email });
  if (checkUser) return res.status(409).send("Email já está em uso!");

  res.local.user = user;
  next();
}

export async function signInMiddleware(req, res) {
  const { email, password } = req.body;

  try {
    const userExist = await db.collection("users").findOne({ email });

    if (!userExist) return res.status(400).send("Usuário ou senha inválidos!");

    const hashPassword = bcrypt.compareSync(password, userExist.password);

    if (!hashPassword)
      return res.status(400).send("Usuário ou senha inválidos!");

    res.locals.user = userExist;
  } catch (err) {
    res.sendStatus(500);
  }

  next();
}
