"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const typeorm_1 = require("typeorm");
const category_1 = require("../entities/category");
const store_1 = require("../entities/store");
const product_1 = require("../entities/product");
const image_1 = require("../entities/image");
const price_1 = require("../entities/price");
axios_1.default.defaults.baseURL = 'https://www.vendus.co.ao/ws/v1.1';
axios_1.default.defaults.params = { api_key: process.env.API_KEY };
exports.default = new class syncService {
    // Add product in stock
    async category() {
        const productsFromVendus = await axios_1.default.get('/products/categories').catch(e => {
            console.log(e);
            return new Error('Falha na comunicação com a API');
        });
        if (productsFromVendus.status = 200) {
            productsFromVendus.data.forEach(async (element) => {
                const categoryRepository = (0, typeorm_1.getRepository)(category_1.category);
                const verify = await categoryRepository.findOne(element.id);
                if (verify) {
                    const category = categoryRepository.create(element);
                    await categoryRepository.save(category);
                    console.log('category created');
                }
            });
            return productsFromVendus.data;
        }
    }
    async store() {
        const productsFromVendus = await axios_1.default.get('/stores').catch(e => {
            console.log(e);
            return new Error('Falha na comunicação com a API');
        });
        if (productsFromVendus.status = 200) {
            productsFromVendus.data.forEach(async (element) => {
                const repository = (0, typeorm_1.getRepository)(store_1.store);
                const verify = await repository.findOne(element.id);
                if (verify) {
                    const Store = repository.create(element);
                    await repository.save(Store);
                    console.log('store created');
                }
            });
            return productsFromVendus.data;
        }
    }
    async products() {
        const productsFromVendus = await axios_1.default.get('/products').catch(e => {
            console.log(e);
            return new Error('Falha na comunicação com a API');
        });
        if (productsFromVendus.status = 200) {
            productsFromVendus.data.forEach(async (element) => {
                console.log(element.prices[0]);
                const repository = (0, typeorm_1.getRepository)(product_1.product);
                const imageRepository = (0, typeorm_1.getRepository)(image_1.image);
                const categoryRepository = (0, typeorm_1.getRepository)(category_1.category);
                const storeRepository = (0, typeorm_1.getRepository)(store_1.store);
                const priceRepository = (0, typeorm_1.getRepository)(price_1.price);
                let imageR;
                let Price;
                if (element.images.length > 0) {
                    imageR = imageRepository.create({
                        m: element.images.m,
                        xs: element.images.xs
                    });
                    await imageRepository.save(imageR);
                }
                let priceId = (element.prices[0]) ? element.prices[0].id : 0;
                console.log('priceId', priceId);
                const verifyP = await priceRepository.findOne({ id: priceId });
                const cat = await categoryRepository.findOne({ id: element.category_id });
                const sto = await storeRepository.findOne({ id: element.stores.store_id });
                const verify = await repository.findOne(element.id);
                if (!verify) {
                    console.log('prices', element.prices);
                    if (!verifyP) {
                        let priceVerify = (!element.prices[0]) ? element.prices.price : element.prices[0].price;
                        let Tax = (!element.prices[0]) ? element.prices.price_without_tax : element.prices[0].price_without_tax;
                        console.log("priceVerify", priceVerify);
                        Price = priceRepository.create({
                            price: priceVerify,
                            price_without_tax: Tax
                        });
                        await priceRepository.save(Price);
                        console.log('price created');
                    }
                    const product = repository.create({
                        category: cat,
                        store: sto,
                        id: element.id,
                        image: imageR,
                        prices: Price,
                        barcode: element.barcode,
                        brand_id: element.brand_id,
                        class_name: element.class_name,
                        description: element.description,
                        gross_price: element.gross_price,
                        include_description: element.include_description,
                        order: element.order,
                        price_without_tax: element.price_without_tax,
                        reference: element.reference,
                        status: element.status,
                        stock_control: element.stock_control,
                        stock_type: element.stock_type,
                        tax_exemption: element.tax_exemption,
                        supplier_code: element.supplier_code,
                        supply_price: element.supply_price,
                        tax_exemption_law: element.tax_exemption_law,
                        tax_id: element.tax_id,
                        title: element.title,
                        type_id: element.type_id,
                        unit_id: element.unit_id
                    });
                    await repository.save(product);
                    console.log('product created');
                }
            });
            return productsFromVendus.data;
        }
    }
};
