const server = require('express').Router();
const { User, Product, Order, OrderList } = require('../db.js');
const { json } = require('body-parser');
const Op = require('sequelize').Op;
const bcrypt = require('bcrypt');
const authentication = require('../jwt');
const nodemailer = require('nodemailer');
const isAdmin = require('../middlewares/isAdmin');


/* ------------------------------------------------------------------------------- */
/* S34 : Crear Ruta para creación de Usuario */
/* ------------------------------------------------------------------------------- */
server.post('/', async (req, res) => {
    const { name, lastName, email, password, rol } = req.body;
    if (name && email && password && lastName) {
        let hashedPassword = await bcrypt.hash(password, 10);
        console.log(hashedPassword);
        User.create({
            name: name,
            lastName: lastName,
            email: email,
            password: hashedPassword,
            rol: rol || 'user'
        })
            .then((user) => {

                var smtpTransport = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: 'ecomerce0410@gmail.com',
                        pass: "henry1234."
                    }
                });
                var mailOptions = {
                    to: email,
                    from: 'ecomerce0410@gmail.com',
                    subject: `Hola ${user.name}`,
                    text: 'Usted se ha registrado correctamente en Henry Store!\n\n' +
                        'http://' + "localhost:3000" + '\n\n'
                };
                smtpTransport.sendMail(mailOptions, function (err) {
                    /* req.flash('success', 'An e-mail has been sent to ' + email + ' with further instructions.'); */
                    done(err, 'done');
                });
                return (user)

            })
            .then(user => {
                console.log(User)
                return res.status(201).json(user)
            })
            .catch(error => {
                console.log(error)
                return res.status(400).send(error)
            })
    }


})
/* ------------------------------------------------------------------------------- */
/* S35 : Crear Ruta para modificar Usuario */
/* ------------------------------------------------------------------------------- */
server.put('/:id', authentication.passport.authenticate('jwt',{session:false}), (req, res) => {
    const { id } = req.params;
    const { name, lastName, email, password } = req.body;
    User.update(
        { name, email, password, lastName },
        {
            where: { id: id },
            returning: true,
        })
        .then(user => {
            return res.status(200).json(user)
        })
        .catch(error => {
            return res.status(400).send(error)
        })
})

/* ------------------------------------------------------------------------------- */
/* S36 : Crear Ruta para traer usuarios */
/* ------------------------------------------------------------------------------- */
server.get('/', authentication.passport.authenticate('jwt',{session:false}), isAdmin, (req, res) => {
    console.log(req.body)
    User.findAll()
        .then(users => {
            res.status(200).json(users)
        })
})

/* ------------------------------------------------------------------------------- */
/* S37 : Crear Ruta para eliminar usuario */
/* ------------------------------------------------------------------------------- */
server.delete('/:id', authentication.passport.authenticate('jwt',{session:false}), isAdmin, (req, res) => {
    const { id } = req.params;
    User.destroy({
        where: {
            id: id
        }
    })
        .then(usuario => {
            console.log(usuario, "se borro")
            if (usuario > 0) {
                return res.status(200).json({ message: 'the ID user: ' + id + ', has been deleted.' });
            } else {
                return res.json({ message: 'the ID: ' + id + ', does not correspond to any user.' });
            }
        })
        .catch(err => res.send(400).json(err.message));
});


server
    /* ------------------------------------------------------------------------------- */
    // S45 : Crear Ruta que retorne todas las Ordenes de los usuarios
    /* ------------------------------------------------------------------------------- */
    .route('/:id/orders')
    .get(authentication.passport.authenticate('jwt',{session:false}), isAdmin, (req, res) => {
        const { id } = req.params
        Order.findAll({
            where: { userId: id },
        }).then((orders) => {
            res.json(orders)
        }).catch((err) => {
            res.json({ err: "Usuario no existente" });
        })
    })



server
    .route("/:userId/cart")
    /* ------------------------------------------------------------------------------- */
    //S38:Crear Ruta para agregar Item al Carrito
    /* ------------------------------------------------------------------------------- */
    .post((req, res) => {
        const { productId, price, quantity } = req.body.product;
        const { userId } = req.params
        let id
        Order.findOne({ where: { userId: userId, status: 'carrito' } })
            .then(order => {
                if (!order) {
                    return Order.create({
                        status: 'carrito'
                    })
                }
                return order
            })
            .then(order => {
                return order.setUser(userId)
            })
            .then((order) => {

                return OrderList.create({
                    price,
                    quantity,
                    orderId: order.id,
                    productId: productId
                })


            })
            .then((order) => {
                res.status(200).json(order)
            })
            .catch((err) => {
                res.status(400).json(err)
            })
    })



    // modificar cantidad de producto en el carrito

    .put((req, res) => {
        const id = req.params.userId
        const { productId, quantity } = req.body
        Order.findOne(
            {
                where: { userId: id, status: 'carrito' }
            })
            .then((carrito) => {
                return OrderList.findOne({
                    where: { orderId: carrito.id, productId: productId }
                })
            })
            .then((producto) => {
                producto.quantity = quantity;
                return producto.save();
            })
            .then((cambio) => {
                res.json(cambio)
            })
    })
    /* ------------------------------------------------------------------------------- */
    //S40:Crear Ruta para vaciar el carrito
    /* ------------------------------------------------------------------------------- */

    .delete((req, res) => {
        const id = req.params.userId;


        Order.destroy({
            where: { userId: id, status: 'carrito' },
        })
            .then(() => {
                res.status(200).send("Carrito eliminado");
            })
            .catch(err => res.send(err));
    })
    /* ------------------------------------------------------------------------------- */
    // S39 : Crear Ruta que retorne todos los items del Carrito
    /* ------------------------------------------------------------------------------- */
    .get((req, res) => {
        const id = req.params.userId;
        Order.findOne(

            {
                where: { userId: id, status: 'carrito' },
                include: [{ model: Product, as: 'products' }, { model: User, as: 'user' }]
            })
            .then((carrito) => {
                if (carrito) {
                    return res.status(200).json(carrito)
                }
                else {
                    return res.status(200).json([])
                }
            })
            .catch(err => res.status(400).json(err))

    })

server
    .route("/forgot")
    .post((req, res, next) => {
        const { email } = req.body
        User.findOne({
            where: { email: email }

        }).then((user) => {

            let payload = { id: user.id }
            let token = authentication.jwt.sign(payload, authentication.jwtOptions.secretOrKey)
            user.passwordToken = token;
            user.resetPasswordExpires = Date.now() + 3600000;
            user.save()
            return (token)

        })
            .then((token) => {

                var smtpTransport = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: 'ecomerce0410@gmail.com',
                        pass: "henry1234."
                    }
                });
                var mailOptions = {
                    to: email,
                    from: 'ecomerce0410@gmail.com',
                    subject: 'Node.js Password Reset',
                    text: 'Recibio esto porque usted u otra persona ha solicitado el restablecimiento de contraseña de su cuenta, para restablecer, dirigase al siguiente link :\n\n' +
                        'http://' + "localhost:3000" + '/reset/' + token + '\n\n' +
                        'Si usted no solicito un cambio de contraseña, haga caso omiso a este mensaje.\n'
                };
                smtpTransport.sendMail(mailOptions, function (err) {
                    /* req.flash('success', 'An e-mail has been sent to ' + email + ' with further instructions.'); */
                    done(err, 'done');
                });
                return res.send('Email enviado')

            },
                function (err) {
                    if (err) return next(err);
                    // res.redirect('/forgot');
                });
    })
server.post('/reset/:token', async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;
    let hashedPassword = await bcrypt.hash(password, 10);
    User.findOne({
        where: { passwordToken: token }

    }).then((user) => {
        user.password = hashedPassword;
        user.passwordToken = null;
        user.save()
        return user
    })
        .then(user => {
            return res.status(201).json(user)
        })
})

module.exports = server;