import { connection } from "../dataBase/db.js"
import { categoriesSchema } from "../schemas/categories.schema.js"

export async function categoriesMiddleware(req, res, next) {
  const category = req.body
  const { name } = category

  const validation = categoriesSchema.validate(category, { abortEarly: false })
  if (validation.error) {
    const error = validation.error.details.map((detail) => detail.message)
    res.status(400).send(error)
    return
  }

  const categories = await connection.query(
    "SELECT * FROM categories WHERE name=$1",
    [name]
  )
  if(categories.rows[0]){
    return res.sendStatus(409)
  }

  req.name = name

  next()
    // console.log()
}
