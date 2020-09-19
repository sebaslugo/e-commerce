import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react'
import agregarAlCarrito from '../../redux/actions/agregarAlCarrito'

let id = localStorage.getItem('idUser');

export default function AgregarAlCarrito({ producto, precio, cantidad }) {
    const dispatch = useDispatch();
    // const content = useSelector(state => state)
    
    
    const enviarDatos = (event) => {
        let carrito = []
        
        if(id){  
            let product = {
                productId:producto.id,
                price:parseInt(precio),
                quantity:parseInt(cantidad)
            }          
            dispatch(agregarAlCarrito(product,id))
            alert('producto agregado al carrito')
            
        }
        else{
            let product= {products:[producto],orderList:[{productId:producto.id,price:parseInt(precio),quantity:parseInt(cantidad)}]};
            let local =  JSON.parse(localStorage.getItem("carrito"));  
            
            
            if(local){
                local.products.map((producto)=>{
                    if(producto.id == product.products[0].id){
                        console.log('aqui toy')
                        product = false;
                        return alert('producto ya esta en el carrito')
                    }
                }) 
                if(product){
                    local = {
                        ['products']:local.products.concat(product.products),
                        ['orderList']:local.orderList.concat(product.orderList)
                    }
                    alert('producto agregado al carrito')
                }
                
            } 
            else{
                local=product
                alert('producto agregado al carrito')          
            } 
            
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