import { connection } from "../dataBase/db.js"
import { rentalsSchema } from "../schemas/rentals.schema.js"

export async function rentalsMiddleware(req, res, next) {
    const rental = req.body
    const { customerId, gameId } = rental
  
    const validation = rentalsSchema.validate(rental, { abortEarly: false })
    if (validation.error) {
      const error = validation.error.details.map((detail) => detail.message)
      res.status(400).send(error)
      return
    }
  
    const customers = await connection.query(
      "SELECT * FROM customers WHERE id=$1",
      [customerId]
    )
    if(!customers.rows[0]){
      return res.sendStatus(400)
    }

    const games = await connection.query(
        "SELECT * FROM games WHERE id=$1",
        [gameId]
      )
      if(!games.rows[0]){
        return res.sendStatus(400)
      }

    next()

  }