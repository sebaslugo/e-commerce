import React,{useEffect,useState} from "react";
import {Card,Image,Button,Reveal} from "semantic-ui-react";
import AgregarAlCarrito from '../Carrito/AgregarAlCarrito';
import { Link } from "react-router-dom";
import './ProductHome.css'

function ProductHome ({active,activeItem,productos,validate}) {

    const [productPage, setProductPage] = useState();
    const [product,setProduct] = useState();
    
    
    
    
    useEffect(() => {
        
        let page=[]
        if(productos !== product){
            for (let i = 0; i < productos.length; i += 6) {
                let seccion = productos.slice(i, i + 6);
                page.push(seccion)
            }
            setProductPage(page)
            setProduct(productos)
        }
        
        
          
    })
    console.log(productPage)
    return (
        <div className="home-productos">
            
            <Card.Group>
                
                {productPage && productPage.length > 0 && productPage[active - 1].map((producto, index) => (         
                <Card key = {index}>
                    <Card.Content>                    
                        <Image src={`http:/localhost:3001/${producto.imagenes[0]}`} size='small' />                         
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

                        <AgregarAlCarrito producto={producto} precio={producto.price} cantidad={1} active={false} />

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