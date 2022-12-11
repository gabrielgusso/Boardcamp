import { Router } from "express"
import { categoriesGetController, categoriesPostController } from "../controllers/categories.controller.js"
import { categoriesMiddleware } from "../middlewares/categories.middlewares.js"

export const categoriesRoute = Router()

categoriesRoute.get("/categories", categoriesGetController)

categoriesRoute.post("/categories", categoriesMiddleware, categoriesPostController)