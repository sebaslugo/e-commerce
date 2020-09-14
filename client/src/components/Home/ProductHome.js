import React,{useEffect,useState} from "react";
import {Card,Image,Button} from "semantic-ui-react";
import AgregarAlCarrito from '../AgregarAlCarrito';
import { Link } from "react-router-dom";
import {getProducts,getProductCategory} from '../../redux/actions/productList';
import { useDispatch,useSelector } from 'react-redux';

function ProductHome ({active,activeItem,productos}) {
    
    
    useEffect(() => {
        
        
    },[])
    console.log(productos)
    return (
        <div className="home-productos">
            <Card.Group>
                
                {/* {productPage.length > 0 && productPage[active - 1].map((producto, index) => (  */} 
                {productos && productos.length>0 && productos.map((producto,index) => (             
                <Card key = {index}>
                    <Card.Content>
                    {producto.imagenes && producto.imagenes.length > 0 && <Image size="small" src={`http://localhost:3001/${producto.imagenes[0]}`} />}
                    <Card.Header className="home-header">
                        {producto.name}
                    </Card.Header>
                    <Card.Meta>{producto.category}</Card.Meta>
                    <Card.Description>
                        {producto.description}
                    </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                    <div className="home-price">
                        <Link to={"/producto/" + producto.id}>
                        <Button inverted color="yellow">
                            Ver Producto
                        </Button>
                        </Link>

                        <AgregarAlCarrito producto={producto} precio={producto.price} cantidad={1} />

                        <Card.Header className="home-priceCard">
                        {`$ ${producto.price}`}
                        </Card.Header>
                    </div>
                    </Card.Content>
                </Card>
                ))}
            </Card.Group>
        </div>

    )
    

}

export default ProductHome;