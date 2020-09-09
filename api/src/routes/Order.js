const express = require("express");
const router = express.Router();
const { Product, Order, OrderList } = require('../db.js');

router
    .route('/:id')
    .get((req,res) => {
        const {id} = req.params;
        Order.findOne({
            where:{orderId:id},
            })
        .then((orders) => {
            res.json(orders)
        })
        .catch((err) => {
            res.json({ err: "Orden no existente" });
        });
    })
    .put((req,res)=> {
        Order.findOne({where:{orderId:id}})
        .then((orders) => {
            orden = req.body;
            return orden.save();
        })
        .then((orders)=>{
            res.json(orden)
        })  
        .catch((err)=>{
            res.json({err: "Orden no existente" })
        })  
    })

    // post ((req,res)=)
module.exports = router;