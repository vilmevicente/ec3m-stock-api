import { Router } from "express";
import productController from "../controllers/productController";

export const productRoutes = Router();

productRoutes.get('/product',productController.sync)
productRoutes.post('/product/stock',productController.addStock)
productRoutes.get('/product/stock/retirar/:id/:quantity',productController.retirar)
productRoutes.get('/product/stock/:id',productController.getStock)
