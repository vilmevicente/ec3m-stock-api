import { getRepository } from "typeorm"
import { stock } from "../entities/stock"

type productTypes = {

    reference: string,
    barcode: number,
    supplier_code: string,
    title: string,
    description: string,
    supply_price: number,
    gross_price: number,
    unit_id: number,
    type_id: string,
    stock_control: number,
    stock_type: string,
    tax_id: string,
    category_id: number,
    brand_id: number,
    status: string

}
export default new class stockService {

    // Add product in stock
    async insert({
        reference,
        barcode,
        supplier_code,
        title,
        description,
        supply_price,
        gross_price,
        unit_id,
        type_id,
        stock_control,
        stock_type,
        tax_id,
        category_id,
        brand_id,
        status,
    
    }: productTypes) {
        const stockRepository = getRepository(stock)

        const verifyExists = await stockRepository.findOne(product_id)
        if (verifyExists) throw new Error(Este produto já se encontra no stock);
        
        const data = stockRepository.create()
        await stockRepository.save(data)
    }

}