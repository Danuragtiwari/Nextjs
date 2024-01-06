// pages/displayProducts.js

import { useState, useEffect } from 'react';
import axios from 'axios';

const DisplayProducts = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('/api/products');
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/api/products/${id}`);
            setProducts(products.filter(product => product._id !== id)); // Update state to remove deleted product
        } catch (error) {
            console.error('Error deleting product', error);
        }
    };

    const handleUpdate = async (id, newData) => {
        try {
            await axios.put(`/api/products/${id}`, newData);
            fetchProducts(); // Fetch products again after update
        } catch (error) {
            console.error('Error updating product', error);
        }
    };

    return (
        <div>
            <h1>Display Products</h1>
            <ul>
                {products.map((product) => (
                    <li key={product._id}>
                        <p>Name: {product.name}</p>
                        <p>Description: {product.description}</p>
                        <p>Price: {product.price}</p>
                        {/* Update form */}
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            const newName = e.target.name.value;
                            const newDescription = e.target.description.value;
                            const newPrice = e.target.price.value;
                            handleUpdate(product._id, { name: newName, description: newDescription, price: newPrice });
                        }}>
                            <input type="text" name="name" placeholder="New Name" />
                            <input type="text" name="description" placeholder="New Description" />
                            <input type="number" name="price" placeholder="New Price" />
                            <button type="submit">Update</button>
                        </form>
                        {/* Delete button */}
                        <button onClick={() => handleDelete(product._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DisplayProducts;
