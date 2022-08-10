"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const syncService_1 = __importDefault(require("../services/syncService"));
const stockService_1 = __importDefault(require("../services/stockService"));
exports.default = new class productController {
    async sync(request, response) {
        const result = await syncService_1.default.products();
        if (result instanceof Error)
            return response.status(400).json({ message: result.message });
        return response.json({ sycCategory: result });
    }
    async addStock(request, response) {
        const { product_id, amount, type, store_id, stockAlert, obs } = request.body;
        const result = await stockService_1.default.insert({ product_id, amount, type, store_id, stockAlert, obs });
        if (result instanceof Error)
            return response.status(400).json({ message: result.message });
        return response.json({ sycCategory: result });
    }
    //! Consultar se o produto se encontra no stock
    async getStock(request, response) {
        const { id } = request.params;
        const result = await stockService_1.default.read({ id: Number(id) });
        if (result instanceof Error)
            return response.status(400).json({ message: result.message });
        return response.json({ result });
    }
    //! Retirar produto do stock para a venda
    async retirar(request, response) {
        const { id, quantity } = request.params;
        const result = await stockService_1.default.remove({ id: Number(id), amount: Number(quantity) });
        if (result instanceof Error)
            return response.status(400).json({ message: result.message });
        return response.json({ message: "Produto retirado com sucesso", result });
    }
};
