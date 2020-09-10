const express = require("express");
const router = express.Router();
const { Product, Order, OrderList } = require('../db.js');


router

// S44 : Crear ruta que retorne todas las ordenes

    .route('/')
    .get((req,res)=>{
        Order.findAll()
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
    .get((req,res) => {       
        const {id} = req.params;
        Order.findOne({
            where:{id:id},
            })
        .then((order) => {
            res.json(order)
        })
        .catch((err) => {
            res.json({ err: "Orden no existente" });
        });
    })

// S47 : Crear Ruta para modificar una Orden

    .put((req,res)=> {
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