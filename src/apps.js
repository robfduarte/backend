const express = require('express');
const ProductManager = require('./ProductManager.js');

const app = express();
const productManager = new ProductManager('products.json');

// Endpoint para obtener productos
app.get('/products', (req, res) => {
    const limit = req.query.limit;
    const products = productManager.getProducts();

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
});

// Endpoint para obtener un producto por ID
app.get('/products/:pid', (req, res) => {
    const productId = parseInt(req.params.pid);
    try {
        const product = productManager.getProductById(productId);
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
