import { connection } from "../dataBase/db.js"

export async function categoriesGetController(req, res) {
  const categories = await connection.query("SELECT * FROM categories")
  res.send(categories.rows)
}

export async function categoriesPostController(req, res) {
  try {
    await connection.query("INSERT INTO categories (name) VALUES ($1)", [
      req.name,
    ])
    res.sendStatus(201)
  } catch (error) {
    res.send(error)
  }
}
