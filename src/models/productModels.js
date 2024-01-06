// models/productModel.js

import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    // other fields as needed
});

// Check if the model exists before creating it
const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);

export default Product;