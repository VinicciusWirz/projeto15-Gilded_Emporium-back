import Joi from "joi";

const paymentMethods = ['PIX', 'CREDITO', 'DINHEIRO'];

const productSchema = Joi.object({
  productId: Joi.string().required(),
  price: Joi.number().min(0).required(),
});

const orderSchema = Joi.object({
  address: Joi.string().required(),
  name: Joi.string().required(),
  paymentMethod: Joi.string().valid(...paymentMethods).required(),
  complement: Joi.string().optional(),
  products: Joi.array().items(productSchema).min(1).required(),
});

export default orderSchema;
