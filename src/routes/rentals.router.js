import { Router } from "express"
import { rentalsMiddleware } from "../middlewares/rentals.middleware.js"
import { rentalsPostController } from "../controllers/rentals.controller.js"

export const rentalsRoute = Router()

rentalsRoute.get("/rentals", )

rentalsRoute.post("/rentals", rentalsMiddleware, rentalsPostController)