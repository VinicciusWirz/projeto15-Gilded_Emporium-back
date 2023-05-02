import { sessionsCollection } from "../../database/collections";

export default async function validateUser(req, res, next) {
    const { authorization } = req.headers;
    if (!authorization) return res.status(401).send("UNAUTHORIZED");

    const token = authorization.replace("Bearer ", "");

    try {
        const session = await sessionsCollection.findOne({ token });
        if(!session) return res.status(401).send("Necessário autenticação");

        res.locals.body = {...req.body}
        res.locals.body.userId = session.userId;

    } catch (err) {
        console.error(err);
        return res.status(422).send(err.message);
    }
    next()
}