import Product from '../models/Product.js';



export const createProduct = async (req, res) => {
  try {
    const { productName, price, category, description, stock, producturl } = req.body;
    const userId = req.user?.id; // Ensure userId is available

    // Debugging log
    //console.log("Received Product Data:", req.body, "User ID:", userId);

    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized: User ID is missing" });
    }

    // Check if product with the same name exists for the logged-in user
    const existingProduct = await Product.findOne({ productName, user: userId });

    if (existingProduct) {
      return res.status(400).json({ success: false, message: "Product with this name already exists" });
    }

    // Create a new product
    const product = new Product({
      productName,
      price,
      category,
      description,
      stock,
      image: producturl, // Ensure this matches the database schema
      user: userId, // Store reference to the logged-in user
    });

    await product.save();

    res.status(201).json({ success: true, message: "Product created successfully", product });
  } catch (error) {
    console.error("Error in createProduct:", error);
    res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
  }
};


// Get All Products for Logged-in User
export const getProducts = async (req, res) => {
    const userId = req.user?.id; // Ensure userId is available
    try {
        const products = await Product.find({ user: userId }).populate('user', 'name email');
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
