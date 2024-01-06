// pages/api/products.js
import Product from '../../models/productModels';
import mongoose from 'mongoose';
import connectDB from '../../utils/db'; // Adjust the path based on your project structure

connectDB();

// const ProductSchema = new mongoose.Schema({
//     name: String,
//     description: String,
//     price: Number,
//     // other fields as needed
// });

// const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);

export default async function handler(req, res) {
    try {
        switch (req.method) {
            case 'GET':
                const products = await Product.find({});
                res.status(200).json(products);
                break;
            case 'POST':
                const { name, description, price } = req.body;
                const newProduct = new Product({ name, description, price });
                const savedProduct = await newProduct.save();
                res.status(200).json(savedProduct);
                break;
            case 'PUT':
                const { id, name: updatedName, description: updatedDescription, price: updatedPrice } = req.body;
                const updatedProduct = await Product.findByIdAndUpdate(
                    id, { name: updatedName, description: updatedDescription, price: updatedPrice }, { new: true }
                );
                res.status(200).json(updatedProduct);
                break;
            case 'DELETE':
                const { productId } = req.body;
                await Product.findByIdAndRemove(productId);
                res.status(200).json({ success: true });
                break;
            default:
                res.status(405).json({ error: 'Method not allowed' });
                break;
        }
    } catch (error) {
        res.status(500).json({ error: error.message || 'Server error' });
    }
}