import { Request, Response } from "express";
import syncService from "../services/syncService";
import stockService from "../services/stockService";

export default new class stockController{

   
    async addStock(request:Request,response:Response){
        
        const{  id, product_id, amount, type, store_id, stockAlert, obs  }= request.body

        const result = await  stockService.insert({ id, product_id, amount, type, store_id, stockAlert, obs })

        if(result instanceof Error) return response.status(400).json({message:result.message})

        return response.json({sycCategory:result})
    }
    
    async getStock(request:Request,response:Response){
        
        const result = await  stockService.read()

        if(result instanceof Error) return response.status(400).json({message:result.message})

        return response.json({stocks:result})
    }
}