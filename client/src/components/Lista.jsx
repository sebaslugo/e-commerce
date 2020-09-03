import React,{useState} from 'react';
import {useSelector,useDispatch} from 'react-redux'
import {eliminarProducto,selectProducto} from '../redux/actions'
let key = 0;

function Lista ()  {
    const dispatch = useDispatch()
    const productos = useSelector(state => state.productos)
    const handleClick = (id) => {
        dispatch(eliminarProducto(id))
    }
    const handleEdit = (producto) => {
        dispatch(selectProducto(producto))
        dispatch(eliminarProducto(producto.id))
    }

    return (

        <div>
            <ul>
                {productos.map((producto) =>
                <li key={key++}>            
                {producto.productName}
                <button onClick = {() => handleEdit(producto)}>Editar</button>
                <button onClick = {() => handleClick(producto.id)}>Eliminar</button>
                </li>)}
            </ul>
        </div>
    )
}

export default Lista;