import { connection } from "../dataBase/db.js"
import { customersSchema } from "../schemas/customers.schemas.js"

export async function customersMiddleware(req, res, next) {
    const customer = req.body
    const { cpf } = customer
  
    const validation = customersSchema.validate(customer, { abortEarly: false })
    if (validation.error) {
      const error = validation.error.details.map((detail) => detail.message)
      res.status(400).send(error)
      return
    }
  
    const customers = await connection.query(
      "SELECT * FROM customers WHERE cpf=$1",
      [cpf]
    )
    if(customers.rows[0]){
      return res.sendStatus(409)
    }
    next()
  }

  export async function customersPutMiddleware(req, res, next) {
    const customer = req.body
    const { cpf } = customer
    const id = req.params.id
  
    const validation = customersSchema.validate(customer, { abortEarly: false })
    if (validation.error) {
      const error = validation.error.details.map((detail) => detail.message)
      res.status(400).send(error)
      return
    }
  
    const customers = await connection.query(
      "SELECT * FROM customers WHERE cpf=$1 AND id<>$2",
      [cpf, id]
    )
    if(customers.rows[0]){
      return res.sendStatus(409)
    }
    next()
  }