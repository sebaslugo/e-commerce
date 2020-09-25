const express = require("express");
const router = express.Router();
const { Product, Order, OrderList, User } = require('../db.js');
const authentication = require('../jwt');
const isAdmin = require('../middlewares/isAdmin');
const nodemailer = require('nodemailer');
const inlineCss = require('nodemailer-juice');
const ejs = require("ejs");
const { dirname } = require("path");
// var transporter = nodemailer.createTransport();
// transporter.use('compile', inLineCss());


router

    // S44 : Crear ruta que retorne todas las ordenes

    .route('/')
    .get(authentication.passport.authenticate('jwt', { session: false }), isAdmin, (req, res) => {
        Order.findAll({ include: { model: User, as: 'user' } })
            .then((orders) => {
                res.json(orders)
            })
            .catch((err) => {
                res.json({ err: 'no hay ordenes' })
            })

    })

router

    // S46 : Crear Ruta que retorne una orden en particular.

    .route('/:id')
    .get(authentication.passport.authenticate('jwt', { session: false }), isAdmin, (req, res) => {
        const { id } = req.params;
        let orden
        Order.findOne({
            where: { id: id },
            include: [{ model: User, as: 'user' }, { model: Product }]
        })
            .then((order) => {
                orden = order
                return OrderList.findAll({
                    where: { orderId: order.id },
                })
            })
            .then((items) => {
                res.json({ orden, items })
            })
            .catch((err) => {
                res.json({ err });
            });
    })

    // S47 : Crear Ruta para modificar una Orden

    .put(authentication.passport.authenticate('jwt', { session: false }), (req, res) => {
        const { id } = req.params;
        Order.findOne({ where: { id: id } })
            .then((order) => {
                order.status = req.body.status;
                order.total = 2000;
                return order.save();
            })
            .then((order) => {
                res.json(order)
            })
            .catch((err) => {
                res.json({ err: "Orden no existente" })
            })
    })



var transport = {
    host: 'smtp.gmail.com',
    auth: {
        user: 'ecomerce0410@gmail.com',
        pass: "henry1234."
    }
}

var transporter = nodemailer.createTransport(transport)

transporter.verify((error, success) => {
    if (error) {
        console.log(error);
    } else {
        console.log('Server is ready to take messages');
    }
});


router.post('/checkout', (req, res, next) => {
    // const [datauser, products] = req.body

    var name = req.body.dataUser.nombre
    var email = req.body.dataUser.email
    // var message = req.body.message

    const ejs = require("ejs");

    ejs.renderFile(__dirname + "/Checkout.ejs", { name: name }, function (err, data) {
        if (err) {
            console.log(err);
        } else {
            var mainOptions = {
                from: '"YOUR_NAME" YOUR_EMAIL_ADDRESS',
                to: email,
                subject: `Hola ${name}! Su compra fue realizada con Exito!`,
                html: data
            };
            console.log("html data ======================>", mainOptions.html);

            transporter.sendMail(mainOptions, function (err, info) {
                if (err) {
                    res.json({
                        msg: 'fail'
                    })
                } else {
                    res.json({
                        msg: 'success'
                    })
                }
            });
        }
    });

})



module.exports = router;
