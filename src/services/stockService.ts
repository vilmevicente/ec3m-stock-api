import Joi from "joi";
import { getRepository, UpdateResult } from "typeorm"
import { notification } from "../entities/notificarions";
import { product } from "../entities/product";
import { stock } from "../entities/stock"

type stockTypes = {

    id?: number | undefined;
    product_id?: number;
    amount?: number;
    type?: string;
    store_id?: string;
    stockAlert?: number;
    obs?: string;

}
export default new class stockService {

    //! Add product in stock
    async insert({ product_id, amount, type, store_id, stockAlert, obs }: stockTypes): Promise<stock | Error> {
        const stockRepository = getRepository(stock)
        const productRepository = getRepository(product)

        //! Criação da estrutura de validação.
        const schema = Joi.object({
            product_id: Joi.number().integer().required(),
            amount: Joi.number().integer().required(),
            type: Joi.string().required(),
            store_id: Joi.number().integer().required(),
            stockAlert: Joi.number().integer().required(),
            obs: Joi.string().required()
        })

        //! Validação dos parâmetros.
        const { error, value } = schema.validate({ product_id, amount, type, store_id, stockAlert, obs });

        if (error) return new Error('Erro nos parâmetros da url, a seguir estão os parâmetros obrigatórios e seus tipos \n  product_id: int, amount: int, type:string, store_id:int, stockAlert:int, obs:string')

        //! Consulta de produto e verificação se já se encontra adicionado ao stock.
        const verifyExistsProduct = await productRepository.findOne(product_id)
        if (!verifyExistsProduct) return new Error("Este produto não se encontra cadastrado");

        const verifyExists = await stockRepository.findOne({ where: { productId: product_id } })
        if (verifyExists) return new Error("Este produto já se encontra no stock");

        //! Adicionar e retornar o produto adicionado.
        const data = stockRepository.create({ productId: verifyExistsProduct, amount, type, store_id, stockAlert, obs })
        await stockRepository.save(data)
        return data

    }

    async read({ id }: stockTypes): Promise<Error | stock> {
        let data
        const stockRepository = getRepository(stock)
        const productRepository = getRepository(product)

        //! Validação dos parâmetros.
        const schema = Joi.object({ id: Joi.number().integer().required() })
        const { error, value } = schema.validate({ id });
        if (error) return new Error('Erro no parâmetro id')

        const Produto = await productRepository.findOne(id)
        if (!Produto) return new Error('Este produto não existe')

        data = await stockRepository.findOne({ where:{productId: Produto} , relations:['productId']})
        if (!data) return new Error('Este produto não se encontra adicionado ao Stock')
        return data

    }

    async remove({ id, amount }: stockTypes): Promise<Error | UpdateResult> {
        const stockRepository = getRepository(stock)

        const schema = Joi.object({
            amount: Joi.number().integer().required()
        })

        //! Validação dos parâmetros.
        const { error, value } = schema.validate({ amount });
        if (error) return new Error('Erro nos parâmetros da url')
        console.log(value)
        const stockProduct = await this.read({ id })
        if (stockProduct instanceof Error) return new Error(stockProduct.message)
        const { stockAlert } = stockProduct

        const diference = stockProduct.amount - value.amount

        if (diference < 0) return new Error(`Stock insuficiente,  Apenas ${stockProduct.amount} se encontram disponíveis`)

        if (diference < stockAlert) this.sendAlert(stockProduct)
        const stockUpdated = await stockRepository.update(stockProduct.id, { amount: diference })

        return stockUpdated
    }
    async sendAlert(stockP: stock) {
        const notificationRepository = getRepository(notification)
        
        const { productId } = stockP
        const payload = {
            title: 'Alcance de stock mínimo',
            message: `O produto ${productId.title} já alcançou o seu stock mínimo, contacte o fornecedor para reabastecer o stock`,
            productStockInfo: stockP
        }

        const notificationCreated = notificationRepository.create({ title: payload.title, message: payload.message })
        await notificationRepository.save(notificationCreated)


        //! Enviar email aos users selecionados this.sendEmail()
    }
    sendEmail() {
        throw new Error("Method not implemented.");
    }

}