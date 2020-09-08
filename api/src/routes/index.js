const { Router } = require('express');
// import all routers;
const productRouter = require('./product.js');
const searchRouter = require('./search.js')
const express = require('express')


const router = Router();
router.use(express.static('images'));
// load each router on a route
// i.e: router.use('/auth', authRouter);
// router.use('/auth', authRouter--);
router.use('/products', productRouter);
router.use('/search', searchRouter)

module.exports = router;
