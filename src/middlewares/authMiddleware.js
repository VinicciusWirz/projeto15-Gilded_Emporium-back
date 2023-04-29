import { userSchema } from "../Schemas/authSchema.js";
import bcrypt from "bcrypt";
import { db } from "../database/databaseConnection.js";

export async function signUpMiddleware(req, res, next) {
  const user = req.body;
  const { error } = userSchema.validate(user, { abortEarly: false });
  if (error) {
    const errorLog = error.details.map((err) => err.message);
    return res.status(422).send(errorLog);
  }
  try {
    const checkUser = await db
      .collection("users")
      .findOne({ email: user.email });
    if (checkUser) return res.status(409).send("Email já está em uso!");

    next();
  } catch (error) {
    console.error(error);
    return res.status(500).send("Ocorreu um erro no servidor.");
  }
}

export async function signInMiddleware(req, res, next) {
  const { email, password } = req.body;
  if (!email || !password) return res.status(422).send("Dados inválidos!");
  try {
    const userExist = await db.collection("users").findOne({ email });

    if (!userExist) return res.status(404).send("Usuário não encontrado!");

    const hashPassword = bcrypt.compareSync(password, userExist.password);

    if (!hashPassword) return res.status(401).send("Senha inválida!");

    res.locals.user = userExist;

    next();
  } catch (err) {
    res.sendStatus(500);
  }
}
