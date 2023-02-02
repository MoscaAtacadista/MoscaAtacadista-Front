import joi from "joi";

const newProductSchema = joi.object({
  name: joi.string().min(1).required(),
  description: joi.string().min(256).max(1024),
  price: joi.number().min(0.01).precision(2).required(),
  pictures: joi.array().min(3).max(5).items(joi.string().uri()),
  category: joi.string().min(1).required(),
  promotion: joi.number().min(0).max(100).integer()
});

export { newProductSchema };
