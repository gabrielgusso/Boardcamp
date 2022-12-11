import { Router } from "express"
import { connection } from "../dataBase/db.js"

export const categoriesRoute = Router()

categoriesRoute.get("/categories", async (req, res) => {
    const categories = await connection.query("SELECT * FROM categories")
    res.send(categories.rows)
  })