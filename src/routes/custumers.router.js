import { Router } from "express"
import { customersGetController, customersPostController, customersGetControllerByID } from "../controllers/customers.controller.js"

export const customersRoute = Router()

customersRoute.get("/customers", customersGetController)

customersRoute.get("/customers/:id", customersGetControllerByID)

customersRoute.post("/customers", customersPostController)