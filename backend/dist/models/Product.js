"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const productSchema = new mongoose_1.Schema({
    imageUrl: String,
    name: String,
    price: Number,
    description: String,
});
const Product = (0, mongoose_1.model)('Product', productSchema);
exports.default = Product;
