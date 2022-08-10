import { Router } from "express";
import stockController from "../controllers/productController";

export const stockRoutes = Router();
//stockRoutes.get('/stock',stockController.get)
stockRoutes.get('/stock',stockController.sync)