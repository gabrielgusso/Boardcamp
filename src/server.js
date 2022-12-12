import express from "express"
import { categoriesRoute } from "./routes/categories.router.js"
import { gamesRoute } from "./routes/games.router.js"
import { customersRoute } from "./routes/custumers.router.js"

const app = express()
app.use(express.json())
app.use(categoriesRoute)
app.use(gamesRoute)
app.use(customersRoute)


app.listen(4000, () => {
  console.log("Server listening on port 4000.")
})
