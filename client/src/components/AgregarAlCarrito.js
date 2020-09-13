import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react'
import agregarAlCarrito from '../redux/actions/agregarAlCarrito'

export default function AgregarAlCarrito({ producto, precio, cantidad }) {
    const dispatch = useDispatch();
    // const content = useSelector(state => state)
    const [datos, setDatos] = useState({
        idProducto: '',
        price: '',
        quantity: ''
    })
    const enviarDatos = (event) => {
        setDatos({
            idProducto: producto.id,
            price: precio,
            quantity: cantidad
        })
        dispatch(agregarAlCarrito(datos))
        console.log(datos);
        console.log('muestro el producto:', producto.id)
        console.log('Muestra el price', precio)
        console.log('Muestra la cantidad;', cantidad)


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