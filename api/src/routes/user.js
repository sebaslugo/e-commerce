const server = require('express').Router();
const { User,Product, Order, OrderList } = require('../db.js');
const { json } = require('body-parser');
const Op = require('sequelize').Op


server.post('/', (req, res) => {
    const { name, email, password, birthday } = req.body;
    console.log(req.body)
    if(name && email && password && birthday){
        User.create({
            name: name,
            email: email,
            Password: password,
            birthday: birthday
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
server.put('/:id', (req, res) => {
    const { id } = req.params;
    const { name, email, password, birthday } = req.body;
    User.update(
		{ name, email, password, birthday},
        {where: { id: id },
        returning: true,
    })
    .then(user => {
        return res.status(200).json(user)
    })
    .catch(error => {
        return res.status(400).send(error)
    })
})

server.get('/', (req, res) => {
    console.log(req.body)
    User.findAll()
    .then(users => {
        res.status(200).json(users)
    })
})

server.delete('/:id', (req, res) => {
	const { id } = req.params;
	User.destroy({
		where: {
			id: id
		}
	})
	.then(usuario => {
        console.log(usuario, "se borro")
		if (usuario > 0) {
			return res.status(200).json({message: 'the ID user: ' + id + ', has been deleted.'});
		} else {
			return res.json({message: 'the ID: ' + id + ', does not correspond to any user.'});
		}
	})
	.catch(err => res.send(400).json(err.message));	
});


server

// S45 : Crear Ruta que retorne todas las Ordenes de los usuarios

    .route('/:id/orders')
    .get((req,res)=>{
        const {id} = req.params
        Order.findAll({where:{userId:id},
        }).then((orders)=>{
            res.json(orders)
        }).catch((err) => {
            res.json({ err: "Usuario no existente" });
        })
    })






server
    .route("/:userId/cart")

//S38:Crear Ruta para agregar Item al Carrito

    .post( (req, res) => {   
    const { productId,price,quantity } = req.body.product;
    const {userId} = req.params
    let id
    Order.findOne({where:{userId:userId,status:'carrito'}})
    .then(order => {
        if(!order){
            return Order.create({
                status:'carrito'
            })
        }
        return order        
    })
    .then(order => {        
        return order.setUser(userId)                    
    })
    .then((order)=>{
        return OrderList.create({
            price,
            quantity,
            orderId:order.id,
            productId:productId           
        })  
    })
    .then((order) => {
        res.status(200).json(order)
    })
    .catch((err)=>{
        res.status(400).json(err)
    })
    })

//S40:Crear Ruta para vaciar el carrito

    .delete((req, res) => {
    const id = req.params.userId;
  
    Order.destroy({
      where: { userId: id,status:'carrito' },
    })
    .then(() => {
        res.status(200).send("Carrito eliminado");
    })
    .catch(err => res.send(err));
    })

// S39 : Crear Ruta que retorne todos los items del Carrito

    .get((req,res) => {
        const id = req.params.userId;
        Order.findOne({where:{userId:id,status:'carrito'}})
        .then((carrito) =>{
            return OrderList.findAll({where:{orderId:carrito.id}})
        })
        .then((item) => {
            res.status(200).json(item)
        }).catch(err => res.status(400).json(err))

    })
  
module.exports = server;