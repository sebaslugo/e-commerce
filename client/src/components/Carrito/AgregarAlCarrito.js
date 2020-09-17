import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react'
import agregarAlCarrito from '../../redux/actions/agregarAlCarrito'

let id;

export default function AgregarAlCarrito({ producto, precio, cantidad }) {
    const dispatch = useDispatch();
    // const content = useSelector(state => state)
    console.log(producto)
    
    const enviarDatos = (event) => {
        let carrito = []
        
        if(id){  
            let product = {
                productId:producto.id,
                price:parseInt(precio),
                quantity:parseInt(cantidad)
            }          
            dispatch(agregarAlCarrito(product))
        }
        /* else{
            
            localStorage.removeItem('carrito');
        } */
        else{
            let product= {producto,price:parseInt(precio),quantity:parseInt(cantidad)};
            let local =  JSON.parse(localStorage.getItem("carrito"));  
            console.log(local)          
            if(local){
                local.push(product)
                console.log(local)
            } 
            else{
                local=[product]          
            } 
            console.log(local)
            
            const serializedState = JSON.stringify(local);
            localStorage.setItem("carrito", serializedState);        
                
        }             
    }
    return (
        <div >
            <IconButton color="primary" aria-label="Añadir al carrito"
                onClick={() => (enviarDatos())}
            >
                <AddShoppingCartIcon />
            </IconButton>
        </div>
    );
}