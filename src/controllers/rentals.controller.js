import { connection } from "../dataBase/db.js"

export async function rentalsPostController(req, res) {
  const rental = req.body
  const { customerId, gameId } = rental
}