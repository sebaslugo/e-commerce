const express = require("express");
const router = express.Router();
const { Product, Order, OrderList,User } = require('../db.js');
const authentication = require('../jwt');
const isAdmin = require('../middlewares/isAdmin');

router

// S44 : Crear ruta que retorne todas las ordenes

    .route('/')
    .get(authentication.passport.authenticate('jwt',{session:false}), isAdmin, (req,res)=>{
        Order.findAll({include:{model:User,as:'user'}})
        .then((orders) => {
            res.json(orders)
        })
        .catch((err) => {
            res.json({err:'no hay ordenes'})
        })
        
    })

router

// S46 : Crear Ruta que retorne una orden en particular.

    .route('/:id')
    .get(authentication.passport.authenticate('jwt',{session:false}), isAdmin, (req,res) => {     
        const {id} = req.params;
        let orden
        Order.findOne({
            where:{id:id},
            include:[{model:User,as:'user'},{model:Product}]
            })
        .then((order) => {
            orden = order
            return OrderList.findAll({
                where:{orderId:order.id},     
            })
        })
        .then((items)=>{
            res.json({orden,items})
        })
        .catch((err) => {
            res.json({ err });
        });
    })

// S47 : Crear Ruta para modificar una Orden

    .put(authentication.passport.authenticate('jwt',{session:false}),(req,res)=> {
        const {id} = req.params;
        Order.findOne({where:{id:id}})
        .then((order) => {
            order.status = req.body.status;
            order.total=2000;
            return order.save();
        })
        .then((order)=>{
            res.json(order)
        })  
        .catch((err)=>{
            res.json({err: "Orden no existente" })
        })  
    })
module.exports = router;
