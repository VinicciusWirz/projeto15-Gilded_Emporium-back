export default function getTotal(req, res, next) {
    const { products } = req.body;
    let total = 0;
    products.foreEach(product => total += product.price)
    res.locals.body.total = total;
    next()
}