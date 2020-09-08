const { Router } = require('express');
// import all routers;
const express = require('express')
const productRouter = require('./product.js');
const searchRouter = require('./search.js')
const path = require('path');

const router = Router();
router.use(express.static('images'));
// load each router on a route
// i.e: router.use('/auth', authRouter);
// router.use('/auth', authRouter--);
router.use('/products', productRouter);
router.use('/search', searchRouter)
router.use(express.static('images'));

module.exports = router;