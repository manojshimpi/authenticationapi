import Product from '../models/Product.js';

// Create a Product (Only Authenticated Users)
export const createProduct = async (req, res) => {
    try {
        const { productName, price, category, description, stock, image } = req.body;
        const userId = req.user.id; // Get user ID from token

        const product = new Product({ 
            productName, 
            price, 
            category, 
            description, 
            stock, 
            image, 
            user: userId // Store reference to the logged-in user
        });

        await product.save();
        res.status(201).json({ success: true, message: 'Product created successfully', product });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get All Products for Logged-in User
export const getProducts = async (req, res) => {
    try {
        const products = await Product.find({ user: req.user.id }).populate('user', 'name email');
        res.status(200).json({ success: true, products });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get a Single Product (Only if Owned by User)
export const getProductById = async (req, res) => {
    try {
        const product = await Product.findOne({ _id: req.params.id, user: req.user.id }).populate('user', 'name email');
        if (!product) return res.status(404).json({ success: false, message: 'Product not found or access denied' });
        
        res.status(200).json({ success: true, product });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Update a Product (Only if Owned by User)
export const updateProduct = async (req, res) => {
    try {
        const product = await Product.findOneAndUpdate(
            { _id: req.params.id, user: req.user.id }, // Ensure the product belongs to the user
            req.body, 
            { new: true }
        );
        if (!product) return res.status(404).json({ success: false, message: 'Product not found or access denied' });

        res.status(200).json({ success: true, message: 'Product updated successfully', product });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Delete a Product (Only if Owned by User)
export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findOneAndDelete({ _id: req.params.id, user: req.user.id });
        if (!product) return res.status(404).json({ success: false, message: 'Product not found or access denied' });

        res.status(200).json({ success: true, message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
