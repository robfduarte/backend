import express from 'express';
import { getProducts } from '../controllers/products.controller.js';


const router = express.Router();

router.get('/', async (req, res) => {
    const products = await getProducts();
    res.render('home', {
        products
    });
});

export default (io) => {
    router.get('/realtimeproducts', async (req, res) => {
        const products = await getProducts();
        res.render('realTimeProducts', {
            products
        });
    });

    return router;
};



// import express from 'express';
// import { Server } from 'socket.io';
// import { getProducts } from '../controllers/products.controller.js';

// const router = express.Router();

// router.get('/', async (req, res) => {
//   const products = await getProducts();
//   res.render('index', { products });
// });

// router.get('/realtimeproducts', (req, res) => {
//   res.render('realTimeProducts');
// });

// export default router;




