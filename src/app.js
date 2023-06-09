import express from 'express';
import ProductManager from './ProductManager.js';

const app = express();
const productManager = new ProductManager('products.json');

// Endpoint para obtener productos
app.get('/products', async (req, res) => {
    try {
        const limit = req.query.limit;
        const products = await productManager.getProducts();

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

// Endpoint para obtener un producto por ID
app.get('/products/:pid', async (req, res) => {
    const productId = parseInt(req.params.pid);
    try {
        const product = await productManager.getProductById(productId);
        res.json({
            product
        });
    } catch (error) {
        res.status(404).json({
            error: error.message
        });
    }
});

// Iniciar el servidor en el puerto 8080
app.listen(8080, () => {
    console.log('Servidor iniciado en el puerto 8080');
});
