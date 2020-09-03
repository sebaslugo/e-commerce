import React, { useState } from 'react';
import s from './home.css'
import {Card,Button,Pagination} from 'react-bootstrap'

const imagenes = ['https://i.pinimg.com/236x/b7/e3/8b/b7e38b7111481c2c72c98990ec3d3889.jpg','https://i.pinimg.com/236x/b7/e3/8b/b7e38b7111481c2c72c98990ec3d3889.jpg']



const productos = [{'name':'camiseta','price':'1200','description':'azul','imagen':imagenes[0]},
                    {'name':'carro','price':'2200','description':'rojo','imagen':imagenes[1]},
                    {'name':'moto','price':'2200','description':'amarrilo','imagen':imagenes[1]},
                    {'name':'arroz','price':'2200','description':'verde','imagen':imagenes[1]},
                    {'name':'casa','price':'2200','description':'cafe','imagen':imagenes[1]},
                    {'name':'platos','price':'2200','description':'rojo','imagen':imagenes[1]},
                    {'name':'platos','price':'2200','description':'rojo','imagen':imagenes[1]},
                    {'name':'platos','price':'2200','description':'rojo','imagen':imagenes[1]},
                    {'name':'platos','price':'2200','description':'rojo','imagen':imagenes[1]},
                    {'name':'platos','price':'2200','description':'rojo','imagen':imagenes[1]},
                    {'name':'platos','price':'2200','description':'rojo','imagen':imagenes[1]},
                    {'name':'platos','price':'2200','description':'rojo','imagen':imagenes[1]},
                    {'name':'platos','price':'2200','description':'rojo','imagen':imagenes[1]},
                    {'name':'platos','price':'2200','description':'rojo','imagen':imagenes[1]},
                    {'name':'platos','price':'2200','description':'rojo','imagen':imagenes[1]}];


var productPage = []

for (let i = 0; i < productos.length; i += 6) {
    let pedazo = productos.slice(i, i + 6);
    productPage.push(pedazo);
}


function Home (props)  {
    
    const [active,setActive] = useState (1)
    const paginas = Math.ceil(productos.length/6);    
    const handleClick = (number) => {
        setActive(number)
    }
    
    let items = [];
    for (let number = 1; number <= paginas; number++) {
    items.push(
        <Pagination.Item key={number} active={number === active} onClick = {() => handleClick(number)} >
        {number}
        </Pagination.Item>,
    );}

    return (
        <div className = 'Home' >
            <div className = 'content'>
            <div className='categoria'>
                CATEGORIAS
            </div>
            
            <div class = 'productos'>
                
                {productPage[active-1].map((producto) => 
                    <Card className = 'tarjeta' >
                    <Card.Img variant="top" src={producto.imagen} />
                    <Card.Body>
                    <Card.Title>{producto.name}</Card.Title>
                    <Card.Text>
                        {producto.price}
                    </Card.Text>
                    <Card.Text>
                        {producto.description}
                    </Card.Text>
                    <Button variant="primary">Ver mas</Button>
                    </Card.Body>
                    </Card> 
                )} 
                                                  
            </div>

            </div>
            
            <div className = 'paginacion'>
                <Pagination size="sm">{items}</Pagination>  
            </div>
        </div>
        
    )
}

export default Home;