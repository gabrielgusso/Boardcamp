import Joi from "joi"

export const gamesSchema = Joi.object({
  name: Joi.string().min(2).required(),
  image: Joi.string().min(2).required(),
  stockTotal: Joi.number().min(1).required(),
  categoryId: Joi.number().min(1).required(),
  pricePerDay: Joi.number().min(1).required(),
})
