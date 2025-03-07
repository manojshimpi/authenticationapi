import express from 'express';
import { isAuthenticated } from '../middlewares/authMiddleware.js';
import { createProduct, deleteProduct, getProductById, getProducts, updateProduct } from '../controllers/productController.js';


const productRouter = express.Router();

productRouter.post('/createproduct', isAuthenticated, createProduct); //http://localhost:7000/api/v1/createproduct
productRouter.get('/getallproducts',isAuthenticated, getProducts); //http://localhost:7000/api/v1/getallproducts
productRouter.get('/:id', isAuthenticated, getProductById); //http://localhost:7000/api/v1/67caf7db96536168c0b24805
productRouter.put('/:id', isAuthenticated, updateProduct); //http://localhost:7000/api/v1/67caf7db96536168c0b24805
productRouter.delete('/:id', isAuthenticated, deleteProduct); //http://localhost:7000/api/v1/67caf7db96536168c0b24805

export default productRouter;
