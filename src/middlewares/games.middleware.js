import { connection } from "../dataBase/db.js"
import { gamesSchema } from "../schemas/games.schemas.js"

export async function gamesMiddleware(req, res, next) {
    const game = req.body
    const { name } = game
  
    const validation = gamesSchema.validate(game, { abortEarly: false })
    if (validation.error) {
      const error = validation.error.details.map((detail) => detail.message)
      res.status(400).send(error)
      return
    }
  
    const games = await connection.query(
      "SELECT * FROM games WHERE name=$1",
      [name]
    )
    if(games.rows[0]){
      return res.sendStatus(409)
    }
  
  
    next()

  }