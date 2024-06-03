import express from 'express';
import ProductController from '../controllers/ProductController.js';

const router = express.Router();

router.post('/create', ProductController.createProduct);
router.patch('/update/:id', ProductController.updateProduct);
router.delete('/delete/:id', ProductController.deleteProduct);
router.delete('/delete-many', ProductController.deleteManyProduct);
router.get('/get/:id', ProductController.getProduct);
router.get('/get-all', ProductController.getProducts);

export default router;
