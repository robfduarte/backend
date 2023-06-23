import express from 'express';
import { getProducts, getProductById, createProduct, updateProduct, deleteProduct } from '../controllers/products.controller.js';

const router = express.Router();

router.get('/', async (req, res) => {
    const products = await getProducts();
    res.json(products);
});

router.get('/:id', async (req, res) => {
    const {
        id
    } = req.params;
    const product = await getProductById(id);
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({
            error: 'Product not found'
        });
    }
});

router.post('/', async (req, res) => {
    const {
        body
    } = req;
    const product = await createProduct(body);
    res.status(201).json(product);
});

router.put('/:id', async (req, res) => {
    const {
        id
    } = req.params;
    const {
        body
    } = req;
    const product = await updateProduct(id, body);
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({
            error: 'Product not found'
        });
    }
});

router.delete('/:id', async (req, res) => {
    const {
        id
    } = req.params;
    const deletedProduct = await deleteProduct(id);
    if (deletedProduct) {
        res.json(deletedProduct);
    } else {
        res.status(404).json({
            error: 'Product not found'
        });
    }
});

export default router;
