import { Router } from "express"
import { rentalsMiddleware } from "../middlewares/rentals.middleware.js"
import { rentalsPostController, rentalsGetController, rentalsResturnPostController, rentalsDeleteController } from "../controllers/rentals.controller.js"

export const rentalsRoute = Router()

rentalsRoute.get("/rentals", rentalsGetController)

rentalsRoute.post("/rentals", rentalsMiddleware, rentalsPostController)

rentalsRoute.post("/rentals/:id/return", rentalsResturnPostController)


rentalsRoute.delete("/rentals/:id", rentalsDeleteController)