import { ordersCollection } from "../database/collections.js";

export async function postOrder(req, res) {
    const { body } = res.locals;
    console.log(body)
    try {
        await ordersCollection.insertOne(body)
        res.status(201).send("Pedido enviado!")
    } catch (err) {
        console.error(err)
        return res.status(422).send(err.message)
    }
}

export async function getOrders(req, res) {
    const { userId } = res.locals.body;

    try {
        const orders = await ordersCollection.findMany({userId}).toArray();
        return res.status(200).send(orders)

    } catch (err) {
        console.error(err)
        return res.status(422).send(err.message)
    }

}