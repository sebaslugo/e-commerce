import React, { useEffect } from 'react';
import IconButton from '@material-ui/core/IconButton';
import { Button, Icon } from 'semantic-ui-react'
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import { useDispatch } from 'react-redux';
import { useState } from 'react'
import agregarAlCarrito from '../../redux/actions/agregarAlCarrito'
import './AgregarCart.css'

import Swal from 'sweetalert2'

export default function AgregarAlCarrito({ producto, precio, cantidad, active }) {
    const dispatch = useDispatch();
    const [id, setId] = useState()
    // const content = useSelector(state => state)
    useEffect(() => {
        if (!id) {
            setId(localStorage.getItem('idUser'))
        }
    })

    const enviarDatos = (event) => {
        let carrito = []

        if (id) {
            let product = {
                productId: producto.id,
                price: parseInt(precio),
                quantity: parseInt(cantidad)
            }
            dispatch(agregarAlCarrito(product, id))
            Swal.fire({
                icon: 'success',
                title: 'Al Carrito',
                text: 'Producto agregado al carrito exitosamente',
            })

        }
        else {
            let product = { products: [producto], orderList: [{ productId: producto.id, price: parseInt(precio), quantity: parseInt(cantidad) }] };
            let local = JSON.parse(localStorage.getItem("carrito"));


            if (local) {
                local.products.map((producto) => {
                    if (producto.id == product.products[0].id) {
                        console.log('aqui toy')
                        product = false;
                        return Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: 'El producto ya esta en el carrito',
                        })
                    }
                })
                if (product) {
                    local = {
                        ['products']: local.products.concat(product.products),
                        ['orderList']: local.orderList.concat(product.orderList)
                    }
                    Swal.fire({
                        icon: 'success',
                        title: 'Al Carrito',
                        text: 'Producto agregado al carrito exitosamente',
                    })
                }

            }
            else {
                local = product
                Swal.fire({
                    icon: 'success',
                    title: 'Al Carrito',
                    text: 'Producto agregado al carrito exitosamente',
                })
            }

            const serializedState = JSON.stringify(local);
            localStorage.setItem("carrito", serializedState);


        }
    }
    return (
        <div>
            {active ? <Button id='cart_Boton' onClick={() => (enviarDatos())}>
                <Icon name='add to cart' />
                Al Carrito
            </Button> :
                <a color="primary" aria-label="Añadir al carrito" className="addCarrito"
                    onClick={() => (enviarDatos())}
                >    Al Carrito
            </a>}
        </div>
    );
}