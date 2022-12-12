import { connection } from "../dataBase/db.js"
import dayjs from "dayjs"

export async function rentalsPostController(req, res) {
  const rental = req.body
  const { customerId, gameId, daysRented } = rental
  let rentDate = dayjs().locale("pt-br").format("YYYY-MM-DD")
  const returnDate = null
  const delayFee = null
  const pricePerDay = req.price
  let originalPrice = pricePerDay * daysRented

  try {
    await connection.query(
      'INSERT INTO rentals ("customerId", "gameId", "rentDate" ,"daysRented", "returnDate", "originalPrice", "delayFee") VALUES ($1, $2, $3, $4, $5, $6, $7)',
      [
        customerId,
        gameId,
        rentDate,
        daysRented,
        returnDate,
        originalPrice,
        delayFee,
      ]
    )
    res.sendStatus(201)
  } catch (error) {
    console.log(error)
  }
}

export async function rentalsGetController(req, res) {
  const custumerId = req.query.custumerId
  const gameId = req.query.gameId
  console.log(custumerId)

  if(custumerId){
    const custumerRental = await connection.query(
      `SELECT rentals.*, JSON_BUILD_OBJECT('name', customers.name, 'id', customers.id) AS customers, JSON_BUILD_OBJECT('name', games.name, 'id', games.id, 'categoryId', games."categoryId", 'categoryName', categories.name) AS game FROM customers JOIN rentals ON customers.id = rentals."customerId" JOIN games ON rentals."gameId" = games.id JOIN categories ON games."categoryId" = categories.id WHERE "customerId"=$1`, [custumerId]
    )
    res.send(custumerRental.rows)
    return
  }

  if(gameId){
    const gameRental = await connection.query(
      `SELECT rentals.*, JSON_BUILD_OBJECT('name', customers.name, 'id', customers.id) AS customers, JSON_BUILD_OBJECT('name', games.name, 'id', games.id, 'categoryId', games."categoryId", 'categoryName', categories.name) AS game FROM customers JOIN rentals ON customers.id = rentals."customerId" JOIN games ON rentals."gameId" = games.id JOIN categories ON games."categoryId" = categories.id WHERE "gameId"=$1`, [gameId]
    )
    res.send(gameRental.rows)
    return
  }

  const rentals = await connection.query(
    `SELECT rentals.*, JSON_BUILD_OBJECT('name', customers.name, 'id', customers.id) AS customers, JSON_BUILD_OBJECT('name', games.name, 'id', games.id, 'categoryId', games."categoryId", 'categoryName', categories.name) AS game FROM customers JOIN rentals ON customers.id = rentals."customerId" JOIN games ON rentals."gameId" = games.id JOIN categories ON games."categoryId" = categories.id`
  )
  res.send(rentals.rows)
}
