import express from 'express';
import { Router } from 'express';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';

const router = express.Router();

// Ruta raíz GET /api/products/
router.get('/', async (req, res) => {
    try {
        const limit = req.query.limit;
        const products = await getProducts();

        if (limit) {
            const limitedProducts = products.slice(0, limit);
            res.json({
                products: limitedProducts
            });
        } else {
            res.json({
                products
            });
        }
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

// Ruta id GET /api/products/:pid
router.get('/:pid', async (req, res) => {
    const productId = req.params.pid;
    try {
        const products = await getProducts();
        const product = products.find((p) => p.id === productId);

        if (!product) {
            res.status(404).json({
                error: `Product with ID ${productId} not found`
            });
            return;
        }

        res.json({
            product
        });
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

// Ruta POST /api/products/
router.post('/', async (req, res) => {
    try {
        const {
            title,
            description,
            code,
            price,
            stock,
            category
        } = req.body;

        if (!title || !description || !code || !price || !stock || !category) {
            res.status(400).json({
                error: 'Todos los campos son obligatorios'
            });
            return;
        }

        const product = {
            id: uuidv4(),
            title,
            description,
            code,
            price,
            status: true,
            stock,
            category,
            thumbnails: []
        };

        const products = await getProducts();
        products.push(product);
        await saveProducts(products);

        res.status(201).json({
            product
        });
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

// Ruta PUT /api/products/:pid
router.put('/:pid', async (req, res) => {
    const productId = req.params.pid;
    try {
        const products = await getProducts();
        const index = products.findIndex((p) => p.id === productId);

        if (index === -1) {
            res.status(404).json({
                error: `Product with ID ${productId} not found`
            });
            return;
        }

        const existingProduct = products[index];
        const updatedProduct = {
            ...existingProduct,
            ...req.body
        };

        products[index] = updatedProduct;
        await saveProducts(products);

        res.json({
            product: updatedProduct
        });
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});
// Ruta DELETE /api/products/:pid
router.delete('/:pid', async (req, res) => {
    const productId = req.params.pid;
    try {
        const products = await getProducts();
        const index = products.findIndex((p) => p.id === productId);

        if (index === -1) {
            res.status(404).json({
                error: `Product with ID ${productId} not found`
            });
            return;
        }

        products.splice(index, 1);
        await saveProducts(products);

        res.json({
            message: `Product with ID ${productId} deleted successfully`
        });
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

// Función para obtener los productos desde el archivo JSON
async function getProducts() {
    const data = await fs.promises.readFile('products.json', 'utf-8');
    return JSON.parse(data);
}

// Función para guardar los productos en el archivo JSON
async function saveProducts(products) {
    await fs.promises.writeFile('products.json', JSON.stringify(products, null, 2));
}

export default router;
