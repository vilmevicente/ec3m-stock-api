import "reflect-metadata";
import "./database/index"; // database connection
import * as dotenv from 'dotenv' 
import express, { Request, Response } from "express";
import { initRoutes } from "./routes"; // initialize routes
import syncService from "./services/syncService";
import bodyParser from "body-parser";

//! Variáveis e inicialização de módulos.
dotenv.config()
const port = process.env.PORT || 3000;
const app = express();
app.use(bodyParser.json())
app.use(initRoutes);

//! Rota padrão.
app.get("/", async (req, res) => {
  return res.json({message:'Stock API'}).status(200)
});

//! Inicialização da aplicação.
app.listen(port, () => {
  console.log(`app is running in ${port}`);
});
