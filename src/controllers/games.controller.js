import { connection } from "../dataBase/db.js"

export async function gamesGetController(req, res) {
const name = req.query.name
if(name){
    const games = await connection.query("SELECT * FROM games WHERE name ILIKE $1",
    [`${name}%`])
    res.send(games.rows)
    return
}
  const games = await connection.query("SELECT * FROM games")
  res.send(games.rows)
}

export async function gamesPostController(req, res) {
    const {name, image, stockTotal, categoryId, pricePerDay} = req.body

  try {
    await connection.query('INSERT INTO games (name, image, "stockTotal", "categoryId", "pricePerDay") VALUES ($1, $2, $3, $4, $5)', 
    [name, image, stockTotal, categoryId, pricePerDay])
    res.sendStatus(201)
  } catch (error) {
    console.log(error)
  }
}