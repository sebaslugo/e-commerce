const express = require("express");
const router = express.Router();
const { Product, Order, OrderList } = require('../db.js');

router
    .route('/')
    .get((req,res)=>{
        OrderList.findAll()
        .then((orders) => {
            res.json(orders)
        })
        .catch((err) => {
            res.json({err:'no hay ordenes'})
        })
        
    })
router
    .route('/:id')
    .get((req,res) => {
        const {id} = req.params;
        OrderList.findOne({
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
        OrderList.findOne({where:{orderId:id}})
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
module.exports = router;
