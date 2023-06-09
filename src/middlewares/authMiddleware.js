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

export async function authValidation(req, res, next) {
  const { authorization } = req.headers;
  if (!authorization) return res.sendStatus(401);
  const token = authorization.replace("Bearer ", "");

  try {
    const session = await db.collection("sessions").findOne({ token });
    if (!session) return res.sendStatus(401);
    const user = await db.collection("users").findOne({ _id: session.userId });
    if (!user) return res.status(404).send("User does not exist");

    res.locals.session = session;

    next();
  } catch (error) {
    res.status(500).send(err.message);
  }
}
