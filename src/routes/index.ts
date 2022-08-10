import { Router } from "express";
import { stockRoutes } from "./stockRoutes";
import { productRoutes } from "./productRoutes";

export const initRoutes= Router()

initRoutes.use(stockRoutes)
initRoutes.use(productRoutes)