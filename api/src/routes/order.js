const express = require("express");
const router = express.Router();
const { Product, Order, OrderList, User } = require('../db.js');
const authentication = require('../jwt');
const isAdmin = require('../middlewares/isAdmin');
const nodemailer = require('nodemailer');
const inlineCss = require('nodemailer-juice');
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

router
    .route('/checkout/')
    .post((req, res, next) => {
        // const { email, name, lastName, direccion, provincia, ciudad, codigoPostal, barrio, tipoDeTarjeta, fechaDeExpiracion, numeroDeTarjeta, cvv } = req.body
        console.log(req.body)
        res.send('recibido')

        // User.findOne({
        //     where: { email: email }

        // })
        //     .then((user) => {

        //         var smtpTransport = nodemailer.createTransport({
        //             service: 'gmail',
        //             auth: {
        //                 user: 'ecomerce0410@gmail.com',
        //                 pass: "henry1234."
        //             }
        //         })
        //         // nodemailer.createTransport().use('compile', inLineCss());
        //         var mailOptions = {
        //             to: email,
        //             from: 'ecomerce0410@gmail.com',
        //             subject: `Hola ${name} ${lastName}, su compra fue realizada con Exito!`,
        //             // text: 'Recibio este correo porque usted u otra persona ha solicitado el restablecimiento de contraseña de su cuenta, para restablecer, dirigase al siguiente link :\n\n' +
        //             //     "http://localhost:3000/login/changepass/" +
        //             //     'Si usted no solicito un cambio de contraseña, haga caso omiso a este mensaje.\n'
        //             text: 'For clients with plaintext support only',
        //             html: `<div>Hola ${name}, su compra fue realizada con exito!</div>` +
        //                 `<div> Se depachara a la direccion ${direccion} proximamente.</div>` +
        //                 `<div> Cualquier duda responda este mail!</div>`,
        //         };
        //         smtpTransport.sendMail(mailOptions, function (err) {
        //             done(err, 'done');
        //         });
        //         return res.status(200).json({ "token": 'Hola, el mail se despacho' })

        //     },
        //         function (err) {
        //             if (err) return next(err);
        //         });
    })



module.exports = router;
