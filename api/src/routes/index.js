const { Router } = require('express');
// import all routers;
const express = require('express')
const productRouter = require('./product.js');
const searchRouter = require('./search.js')
const userRouter = require('./user.js')
const order = require("./order");
const authRouter = require('./auth');

const router = Router();
router.use(express.static('images'));
// load each router on a route
// i.e: router.use('/auth', authRouter);
// router.use('/auth', authRouter--);
router.use('/products', productRouter);
router.use('/search', searchRouter);
router.use('/orders', order);
router.use('/users', userRouter);
router.use('/auth', authRouter);
router.use(express.static('images'));

module.exports = router;