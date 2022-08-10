import { Request, Response } from "express";
import syncService from "../services/syncService";
import stockService from "../services/stockService";


export default new class productController{

    async sync(request:Request,response:Response){
        const result = await  syncService.products()

        if(result instanceof Error) return response.status(400).json({message:result.message})

        return response.json({sycCategory:result})
    }
    async addStock(request:Request,response:Response){
        
        const{  product_id, amount, type, store_id, stockAlert, obs  }= request.body

        const result = await  stockService.insert({ product_id, amount, type, store_id, stockAlert, obs })

        if(result instanceof Error) return response.status(400).json({message:result.message})

        return response.json({sycCategory:result})
    }

    //! Consultar se o produto se encontra no stock
    async getStock(request:Request,response:Response){
        const{ id }= request.params

        const result = await stockService.read({ id:Number(id) })

        if(result instanceof Error) return response.status(400).json({message:result.message})

        return response.json({result})
    }

    //! Retirar produto do stock para a venda
    async retirar(request:Request,response:Response){
        const{ id, quantity }= request.params

        const result = await stockService.remove({ id:Number(id), amount:Number(quantity) })

        if(result instanceof Error) return response.status(400).json({message:result.message})

        return response.json({message:"Produto retirado com sucesso",result})
    }
}