import { Router } from "express"
import { rentalsMiddleware } from "../middlewares/rentals.middleware.js"
import { rentalsPostController, rentalsGetController } from "../controllers/rentals.controller.js"

export const rentalsRoute = Router()

rentalsRoute.get("/rentals", rentalsGetController)

rentalsRoute.post("/rentals", rentalsMiddleware, rentalsPostController)