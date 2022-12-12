import { connection } from "../dataBase/db.js"

export async function customersGetController(req, res) {
  const cpf = req.query.cpf
  if (cpf) {
    const customers = await connection.query(
      "SELECT * FROM customers WHERE cpf ILIKE $1",
      [`${cpf}%`]
    )
    res.send(customers.rows)
    return
  }
  const customers = await connection.query("SELECT * FROM customers")
  res.send(customers.rows)
}

export async function customersGetControllerByID(req, res) {
  const id = req.params.id
  try {
    const customers = await connection.query(
      "SELECT * FROM customers WHERE id=$1",
      [id]
    )
    if (!customers.rows[0]) {
      res.sendStatus(404)
      return
    }
    res.send(customers.rows[0])
    return
  } catch (error) {
    console.log(error)
  }
}

export async function customersPostController(req, res) {
  const { name, image, stockTotal, categoryId, pricePerDay } = req.body

  try {
    await connection.query(
      'INSERT INTO customers (name, image, "stockTotal", "categoryId", "pricePerDay") VALUES ($1, $2, $3, $4, $5)',
      [name, image, stockTotal, categoryId, pricePerDay]
    )
    res.sendStatus(201)
  } catch (error) {
    console.log(error)
  }
}
