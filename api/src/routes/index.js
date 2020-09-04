const { Router } = require('express');
// import all routers;
const productRouter = require('./product.js');
const search = require('./search.js')


const router = Router();

// load each router on a route
// i.e: router.use('/auth', authRouter);
// router.use('/auth', authRouter--);
router.use('/products', productRouter);
router.use('/search', search)

module.exports = router;
