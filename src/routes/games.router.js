import { Router } from "express"
import { gamesMiddleware } from "../middlewares/games.middleware.js"
import { gamesPostController, gamesGetController } from "../controllers/games.controller.js"

export const gamesRoute = Router()

gamesRoute.get("/games", gamesGetController)

gamesRoute.post("/games", gamesMiddleware, gamesPostController)