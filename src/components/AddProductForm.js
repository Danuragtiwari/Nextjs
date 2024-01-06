import { useState } from 'react';
import axios from 'axios';

const AddProductForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: 0,
        // other fields as needed
    });

    const [isProductAdded, setIsProductAdded] = useState(false); // State to track if product is added

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async(e) => {
        e.preventDefault();

        try {
            await axios.post('/api/products', formData);
            // Update state to indicate product addition
            setIsProductAdded(true);
        } catch (error) {
            console.error('Error adding product', error);
        }
    };

    return ( <
        div > {
            isProductAdded ? ( // Conditionally render based on product addition
                <
                div >
                <
                p > Product added successfully! < /p> { / * Redirect or display a link to navigate to displayproduct page * / } <
                a href = "/display-products" > Go to Display Product < /a> < /
                div >
            ) : ( <
                form onSubmit = { handleSubmit } > { /* ... your form inputs */ } <
                input type = "text"
                name = "name"
                value = { formData.name }
                onChange = { handleChange }
                placeholder = "Product Name" / >
                <
                textarea name = "description"
                value = { formData.description }
                onChange = { handleChange }
                placeholder = "Description" / >
                <
                input type = "number"
                name = "price"
                value = { formData.price }
                onChange = { handleChange }
                placeholder = "Price" / > { /* Add other fields as needed */ } <
                button type = "submit" > Add Product < /button> < /
                form >
            )
        } <
        /div>
    );
};

export default AddProductForm;