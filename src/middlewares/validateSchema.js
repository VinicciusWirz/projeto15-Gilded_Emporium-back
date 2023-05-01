export default function validateSchema(schema) {
    return (req, res, next) => {
        const { body } = req;
        const { error } = schema.validate(body, { abortEarly: false });
        if(error) {
            const errorMessages = error.details.map(detail => detail.message);
            return res.status(422).send(errorMessages)
        }
        next()
    }
}