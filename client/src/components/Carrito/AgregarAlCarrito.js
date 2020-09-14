import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react'
import agregarAlCarrito from '../../redux/actions/agregarAlCarrito'

export default function AgregarAlCarrito({ producto, precio, cantidad }) {
    const dispatch = useDispatch();
    // const content = useSelector(state => state)
    
    const enviarDatos = (event) => {
        
        let product = {
            productId:producto.id,
            price:parseInt(precio),
            quantity:parseInt(cantidad)
        }
        dispatch(agregarAlCarrito(product))
        


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