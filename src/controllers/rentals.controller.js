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

  if (custumerId) {
    const custumerRental = await connection.query(
      `SELECT rentals.*, JSON_BUILD_OBJECT('name', customers.name, 'id', customers.id) AS customers, JSON_BUILD_OBJECT('name', games.name, 'id', games.id, 'categoryId', games."categoryId", 'categoryName', categories.name) AS game FROM customers JOIN rentals ON customers.id = rentals."customerId" JOIN games ON rentals."gameId" = games.id JOIN categories ON games."categoryId" = categories.id WHERE "customerId"=$1`,
      [custumerId]
    )
    res.send(custumerRental.rows)
    return
  }

  if (gameId) {
    const gameRental = await connection.query(
      `SELECT rentals.*, JSON_BUILD_OBJECT('name', customers.name, 'id', customers.id) AS customers, JSON_BUILD_OBJECT('name', games.name, 'id', games.id, 'categoryId', games."categoryId", 'categoryName', categories.name) AS game FROM customers JOIN rentals ON customers.id = rentals."customerId" JOIN games ON rentals."gameId" = games.id JOIN categories ON games."categoryId" = categories.id WHERE "gameId"=$1`,
      [gameId]
    )
    res.send(gameRental.rows)
    return
  }

  const rentals = await connection.query(
    `SELECT rentals.*, JSON_BUILD_OBJECT('name', customers.name, 'id', customers.id) AS customers, JSON_BUILD_OBJECT('name', games.name, 'id', games.id, 'categoryId', games."categoryId", 'categoryName', categories.name) AS game FROM customers JOIN rentals ON customers.id = rentals."customerId" JOIN games ON rentals."gameId" = games.id JOIN categories ON games."categoryId" = categories.id`
  )
  res.send(rentals.rows)
}

export async function rentalsResturnPostController(req, res) {
  const id = req.params.id
  let today = dayjs().locale("pt-br").format("YYYY-MM-DD")
  let dalayFee = 0
  const searchRentDay = await connection.query(
    'SELECT rentals."rentDate", rentals."daysRented", rentals."originalPrice", rentals."returnDate" FROM rentals WHERE id=$1',
    [id]
  )

  if (!id) {
    res.sendStatus(404)
    return
  }
  if (searchRentDay.rows[0].returnDate !== null) {
    res.sendStatus(400)
    return
  }
  const rendDay = searchRentDay.rows[0].rentDate
  let daysRentdAtNow = dayjs(today).diff(rendDay, "day")
  const tax = daysRentdAtNow - searchRentDay.rows[0].daysRented
  const pricePerDay =
    searchRentDay.rows[0].originalPrice / searchRentDay.rows[0].daysRented
  if (tax > 0) {
    dalayFee = tax * pricePerDay
  }

  try {
    await connection.query(
      'UPDATE rentals SET "returnDate"=$1, "delayFee"=$2 WHERE id=$3',
      [today, dalayFee, id]
    )
    res.sendStatus(201)
  } catch (error) {
    console.log(error)
  }
}

export async function rentalsDeleteController(req, res) {
  const id = req.params.id

  const rentals = await connection.query(`SELECT * FROM rentals WHERE id=$1`, [
    id,
  ])
  if (!rentals.rows[0]) {
    res.sendStatus(404)
    return
  }
  if (rentals.rows[0].returnDate === null) {
    res.sendStatus(400)
    return
  }

  try {
    await connection.query(`DELETE FROM rentals WHERE id=$1;`, [id])
    res.sendStatus(200)
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
}
