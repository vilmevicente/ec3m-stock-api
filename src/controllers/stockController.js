"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const stockService_1 = __importDefault(require("../services/stockService"));
exports.default = new class stockController {
    async addStock(request, response) {
        const { id, product_id, amount, type, store_id, stockAlert, obs } = request.body;
        const result = await stockService_1.default.insert({ id, product_id, amount, type, store_id, stockAlert, obs });
        if (result instanceof Error)
            return response.status(400).json({ message: result.message });
        return response.json({ sycCategory: result });
    }
    async getStock(request, response) {
        const result = await stockService_1.default.read();
        if (result instanceof Error)
            return response.status(400).json({ message: result.message });
        return response.json({ stocks: result });
    }
};
