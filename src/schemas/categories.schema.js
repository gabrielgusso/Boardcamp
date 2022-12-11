import Joi from "joi"

export const categoriesSchema = Joi.object({
  name: Joi.string().min(2).required(),
})
