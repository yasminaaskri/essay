"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const articleSchema = new mongoose_1.Schema({
    title: String,
    body: String,
    numberOfLikes: Number,
});
const Article = (0, mongoose_1.model)('Article', articleSchema);
exports.default = Article;
