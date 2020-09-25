import React,{useEffect,useState} from "react";
/* import {Card,Image,Button,Reveal} from "semantic-ui-react"; */
import { Grid } from '@material-ui/core';
import AgregarAlCarrito from '../Carrito/AgregarAlCarrito';
import './ProductHome.css';
import { useDispatch} from 'react-redux';
import agregarAlCarrito from '../../redux/actions/agregarAlCarrito';
let id = localStorage.getItem("idUser");
let serializedState = JSON.parse(localStorage.getItem("carrito"));

function ProductHome ({active,activeItem,productos,validate}) {
    const dispatch = useDispatch()
    const [productPage, setProductPage] = useState();
    const [product,setProduct] = useState();
    
    
    
    
    useEffect(() => {
        
        let page=[]
        if(productos !== product){
            const serializedState = JSON.stringify(productos);
            localStorage.setItem("Recomendaciones", serializedState); 
            for (let i = 0; i < productos.length; i += 6) {
                let seccion = productos.slice(i, i + 6);
                page.push(seccion)
            }
            setProductPage(page)
            setProduct(productos)
            
        }
           
        
          
    })
    return (                  
        <div className="container">
            <Grid container spacing={3}>
                    {productPage && productPage.length > 0 && productPage[active - 1].map((producto, index) => (                     
                    <Grid item xs={12} sm={4} md={4} lg={4} xl={4} className="card" key={index}>                          
                            <img src={`http://localhost:3001/${producto.imagenes[0]}`} alt={producto.name} className="card__img" />
                            <div className="card__data">
                                <h1 className="card__title">{(producto.name.length > 25) ? producto.name.substring(0, 22) + '...' : producto.name}</h1>
                                <span className="card__preci"><span className="signoPeso">$</span>{producto.price}</span>
                                <p className="card__description">
                                    {(producto.description.length > 38) ? producto.description.substring(0, 36) + '...' : producto.description}
                                </p>
                                <div className="contenedorBotones">
                                    <a className="card__button"><AgregarAlCarrito producto={producto} precio={producto.price} cantidad={1} active={false} /></a>
                                    <a href={"/producto/" + producto.id} className="card__button">Ver</a>
                                </div>
                            </div>                    
                    </Grid>               
                    ))}
            </Grid>
        </div>                    
    )
}

export default ProductHome;