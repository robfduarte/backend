import express from 'express';

const router= express.Router();

router.get('/', (req,res)=>{
    res.render('home'); //el home.handlebars
})

export default router;
