import axios, { AxiosResponse } from "axios";
import { getRepository } from "typeorm"
import { stock } from "../entities/stock"
import { category } from "../entities/category"
import { store } from "../entities/store";
import { product } from "../entities/product";
import { image } from "../entities/image";
import { price } from "../entities/price";

type storeTypes = {

    id: number

    title: string

    type: string

    tax_id: string

    tax_exemption: string

    tax_exemption_law: string

    status: string

    sync_pos: string

    sync_pos_ping: string

}
type productTypes = {

    id: number

    reference: string

    barcode: string

    supplier_code: string

    title: string

    description: string

    include_description: string

    supply_price: string

    gross_price: string

    unit_id: string

    type_id: string

    class_id: string

    stock_control: string

    stock_type: string

    tax_id: string

    tax_exemption: string

    tax_exemption_law: string

    category_id: string

    brand_id: string,
    images: Array<any>



    status: string

}


type categoryTypes = {

    id: number;
    title: string;
    status: string;
    order: number;
    all_stores: string;
    products_order: string;
    kitchen_request: string;

}
axios.defaults.baseURL = 'https://www.vendus.co.ao/ws/v1.1'
axios.defaults.params = { api_key: process.env.API_KEY }
export default new class syncService {

    // Add product in stock


    async category(): Promise<Error | any> {
        const productsFromVendus: any = await axios.get('/products/categories').catch(e => {
            console.log(e)
            return new Error('Falha na comunicação com a API')
        })
        if (productsFromVendus.status = 200) {

            productsFromVendus.data.forEach(async (element: categoryTypes) => {
                const categoryRepository = getRepository(category)
                const verify = await categoryRepository.findOne(element.id)
                if (verify) {
                    const category = categoryRepository.create(
                        element
                    )
                    await categoryRepository.save(category)
                    console.log('category created')
                }

            });
            return productsFromVendus.data
        }
    }
    async store(): Promise<Error | any> {
        const productsFromVendus: any = await axios.get('/stores').catch(e => {
            console.log(e)
            return new Error('Falha na comunicação com a API')
        })
        if (productsFromVendus.status = 200) {

            productsFromVendus.data.forEach(async (element: storeTypes) => {
                const repository = getRepository(store)
                const verify = await repository.findOne(element.id)
                if (verify) {
                    const Store = repository.create(
                        element
                    )
                    await repository.save(Store)
                    console.log('store created')
                }

            });
            return productsFromVendus.data
        }
    }
    async products(): Promise<Error | any> {
        const productsFromVendus: any = await axios.get('/products').catch(e => {
            console.log(e)
            return new Error('Falha na comunicação com a API')
        })
        if (productsFromVendus.status = 200) {
            
            productsFromVendus.data.forEach(async (
                element:any) => {
                    console.log( element.prices[0])
                const repository = getRepository(product)
                const imageRepository = getRepository(image)
                const categoryRepository = getRepository(category)
                const storeRepository = getRepository(store)
                const priceRepository = getRepository(price)
                let imageR
                let Price

                if (element.images.length>0) {
                    
                    imageR = imageRepository.create({
                        m:element.images.m,
                        xs:element.images.xs
                    })
                    await imageRepository.save(imageR)
                }

                let priceId=(element.prices[0]) ? element.prices[0].id : 0
console.log('priceId', priceId)
                const verifyP= await priceRepository.findOne({id:priceId})

                const cat= await categoryRepository.findOne({id: element.category_id})

                const sto= await storeRepository.findOne({id: element.stores.store_id})
            

                const verify = await repository.findOne(element.id)
                if (!verify) {
                 console.log('prices',   element.prices)
                    if (!verifyP) {
                        let priceVerify= (!element.prices[0]) ? element.prices.price : element.prices[0].price
                        let Tax= (!element.prices[0]) ? element.prices.price_without_tax :element.prices[0].price_without_tax
                        console.log("priceVerify", priceVerify)
                         Price = priceRepository.create(
                            {
                               price:priceVerify,
                               price_without_tax:Tax
                            }
                        )
                        await priceRepository.save(Price)
                        console.log('price created')
                    }
                    
                    const product = repository.create(
                        {
                           category:cat,
                           store:sto,
                           id:element.id,
                           image:imageR,
                           prices:Price,
                           barcode:element.barcode,
                           brand_id: element.brand_id,
                           class_name:element.class_name,
                           description:element.description,
                           gross_price:element.gross_price,
                           include_description:element.include_description,
                           order:element.order,
                           price_without_tax:element.price_without_tax,
                           reference:element.reference,
                           status:element.status,
                           stock_control:element.stock_control,
                           stock_type:element.stock_type,
                           tax_exemption: element.tax_exemption,
                           supplier_code:element.supplier_code,
                           supply_price:element.supply_price,
                           tax_exemption_law:element.tax_exemption_law,
                           tax_id:element.tax_id,
                           title:element.title,
                           type_id:element.type_id,
                           unit_id:element.unit_id
                        }
                    )
                    await repository.save(product)
                    console.log('product created')
                }
                

            });
            return productsFromVendus.data
        }
    }


}