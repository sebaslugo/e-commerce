import React, { useEffect } from 'react';
import IconButton from '@material-ui/core/IconButton';
import { Button,Icon } from 'semantic-ui-react'
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import { useDispatch } from 'react-redux';
import { useState } from 'react'
import agregarAlCarrito from '../../redux/actions/agregarAlCarrito'
import './AgregarCart.css'



export default function AgregarAlCarrito({ producto, precio, cantidad,active }) {
    const dispatch = useDispatch();
    const [id,setId] = useState()
    // const content = useSelector(state => state)
    useEffect(()=>{
        if(!id){
            setId(localStorage.getItem('idUser'))
        }
    })
    
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
        <div>
            {active ? <Button id = 'cart_Boton'  onClick={() => (enviarDatos())}>
                <Icon name='add to cart'/>
                Agregar al Carrito                
            </Button> :
            <IconButton color="primary" aria-label="Añadir al carrito"
                onClick={() => (enviarDatos())}
            >    <AddShoppingCartIcon color='yellow' />
            </IconButton>}
        </div>
    );
}