"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const stock_1 = require("../entities/stock");
exports.default = new class stockService {
    // Add product in stock
    async insert({ reference, barcode, supplier_code, title, description, supply_price, gross_price, unit_id, type_id, stock_control, stock_type, tax_id, category_id, brand_id, status, }) {
        const stockRepository = (0, typeorm_1.getRepository)(stock_1.stock);
        const verifyExists = await stockRepository.findOne(product_id);
        if (verifyExists)
            throw new Error(Este, produto, já, se, encontra, no, stock_1.stock);
        const data = stockRepository.create();
        await stockRepository.save(data);
    }
};
