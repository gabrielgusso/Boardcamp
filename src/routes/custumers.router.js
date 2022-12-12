import { Router } from "express"
import { customersGetController, customersPostController, customersGetControllerByID, customersPutController } from "../controllers/customers.controller.js"
import { customersMiddleware, customersPutMiddleware } from "../middlewares/customers.middleware.js"

export const customersRoute = Router()

customersRoute.get("/customers", customersGetController)

customersRoute.get("/customers/:id", customersGetControllerByID)

customersRoute.post("/customers", customersMiddleware, customersPostController)

customersRoute.put("/customers/:id", customersPutMiddleware, customersPutController)