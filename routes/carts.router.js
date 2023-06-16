import express from 'express';
import { Router } from 'express';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';

const router = express.Router();

// Ruta POST /api/carts/
router.post('/', async (req, res) => {
    try {
        const cartId = uuidv4();
        const cart = {
            id: cartId,
            products: []
        };
        await saveCart(cart);
        res.status(201).json({
            cart
        });
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

// Ruta GET /api/carts/:cid
router.get('/:cid', async (req, res) => {
    const cartId = req.params.cid;
    try {
        const cart = await getCart(cartId);

        if (!cart) {
            res.status(404).json({
                error: `Cart with ID ${cartId} not found`
            });
            return;
        }

        res.json({
            cart
        });
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

// Ruta POST /api/carts/:cid/product/:pid
router.post('/:cid/product/:pid', async (req, res) => {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    try {
        const cart = await getCart(cartId);

        if (!cart) {
            res.status(404).json({
                error: `Cart with ID ${cartId} not found`
            });
            return;
        }

        const product = {
            id: productId,
            quantity: 1
        };

        const existingProduct = cart.products.find((p) => p.id === productId);
        if (existingProduct) {
            existingProduct.quantity++;
        } else {
            cart.products.push(product);
        }

        await saveCart(cart);
        res.json({
            cart
        });
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

// Función para obtener el carrito desde el archivo JSON
async function getCart(cartId) {
    const data = await fs.promises.readFile('cart.json', 'utf-8');
    const carts = JSON.parse(data);
    return carts.find((cart) => cart.id === cartId);
}

// Función para guardar el carrito en el archivo JSON
async function saveCart(cart) {
    const data = await fs.promises.readFile('cart.json', 'utf-8');
    const carts = JSON.parse(data);
    const index = carts.findIndex((c) => c.id === cart.id);

    if (index === -1) {
        carts.push(cart);
    } else {
        carts[index] = cart;
    }

    await fs.promises.writeFile('cart.json', JSON.stringify(carts, null, 2));
}

export default router;
