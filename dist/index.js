"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const Product_1 = __importDefault(require("./models/Product"));
const app = (0, express_1.default)();
mongoose_1.default.connect("mongodb+srv://yasmine:1234@cluster0.yguhmob.mongodb.net/?retryWrites=true&w=majority").then(() => {
    console.log("connected successfully");
})
    .catch((error) => {
    console.log("error with connecting with the DB ", error);
});
app.use(express_1.default.json());
//  create product 
app.post("/api/products", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newProduct = new Product_1.default();
    const proName = req.body.name;
    const proPrice = req.body.price;
    const proDescription = req.body.description;
    newProduct.name = proName;
    newProduct.price = proPrice;
    newProduct.description = proDescription;
    yield newProduct.save();
    res.json(newProduct);
}));
// Get all products
app.get('/api/products', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield Product_1.default.find();
        res.json(products);
    }
    catch (error) {
        console.error('Error in getting products:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}));
// Get a specific product by ID
app.get('/api/products/:productId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.productId;
        const product = yield Product_1.default.findById(id);
        if (product) {
            res.json(product);
        }
        else {
            res.status(404).json({ error: 'Product not found' });
        }
    }
    catch (error) {
        console.error('Error getting product:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}));
// Delete a product by ID
app.delete('/api/products/:productId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.productId;
        const deletedProduct = yield Product_1.default.findByIdAndDelete(id);
        if (deletedProduct) {
            res.json(deletedProduct);
        }
        else {
            res.status(404).json({ error: 'Product not found' });
        }
    }
    catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}));
// Update a product by ID
app.put('/api/products/:productId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, price, description } = req.body;
        const id = req.params.productId;
        const updatedProduct = yield Product_1.default.findByIdAndUpdate(id, { name, price, description }, { new: true });
        if (updatedProduct) {
            res.json(updatedProduct);
        }
        else {
            res.status(404).json({ error: 'Product not found' });
        }
    }
    catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}));
app.listen(3000, () => {
    console.log("I am listening in port 3000");
});
