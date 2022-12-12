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
  const { name, phone, cpf, birthday } = req.body

  try {
    await connection.query(
      'INSERT INTO customers (name, phone, "cpf", "birthday") VALUES ($1, $2, $3, $4)',
      [name, phone, cpf, birthday]
    )
    res.sendStatus(201)
  } catch (error) {
    console.log(error)
  }
}

export async function customersPutController(req, res) {
    const { name, phone, cpf, birthday } = req.body
    const id = req.params.id

    try {
      await connection.query(
        'UPDATE customers SET name=$1, phone=$2, cpf=$3, birthday=$4 WHERE id=$5',
        [name, phone, cpf, birthday, id]
      )
      res.sendStatus(200)
    } catch (error) {
      console.log(error)
    }
  }