import React, { useState,useEffect } from 'react';
import  './Home.css'

import {Pagination} from 'react-bootstrap'
import { Grid,Menu,Segment,Card,Image,Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
/* const _ = require('lodash');
const ObjCategories= []; */

const imagenes = ['https://i.pinimg.com/236x/b7/e3/8b/b7e38b7111481c2c72c98990ec3d3889.jpg','https://i.pinimg.com/236x/b7/e3/8b/b7e38b7111481c2c72c98990ec3d3889.jpg']


// estos arrays son los que se traen cuando hacemos pedidos al servidor, hay que borrarlos cuando se haga la conexion
const productos = [{'id':'10','name':'camiseta','price':'1200','description':'azul','imagen':imagenes[0],'category':'ropa'},
                    {'id':'11','name':'carro','price':'2200','description':'rojo','imagen':imagenes[1],'category':'ropa'},
                    {'id':'12','name':'moto','price':'2200','description':'amarrilo','imagen':imagenes[1],'category':'ropa'},
                    {'id':'13','name':'arroz','price':'2200','description':'verde','imagen':imagenes[1],'category':'ropa'},
                    {'id':'14','name':'casa','price':'2200','description':'cafe','imagen':imagenes[1],'category':'ropa'},
                    {'id':'15','name':'platos','price':'2200','description':'rojo','imagen':imagenes[1],'category':'platos'},
                    {'id':'16','name':'platos','price':'2200','description':'rojo','imagen':imagenes[1],'category':'platos'},
                    {'id':'17','name':'platos','price':'2200','description':'rojo','imagen':imagenes[1],'category':'platos'},
                    {'id':'18','name':'platos','price':'2200','description':'rojo','imagen':imagenes[1],'category':'platos'},
                    {'id':'19','name':'platos','price':'2200','description':'rojo','imagen':imagenes[1],'category':'platos'},
                    {'id':'20','name':'platos','price':'2200','description':'rojo','imagen':imagenes[1],'category':'platos'},
                    {'id':'21','name':'platos','price':'2200','description':'rojo','imagen':imagenes[1],'category':'platos'},
                    {'id':'22','name':'platos','price':'2200','description':'rojo','imagen':imagenes[1],'category':'platos'},
                    {'id':'23','name':'platos','price':'2200','description':'rojo','imagen':imagenes[1],'category':'platos'},
                    {'id':'24','name':'platos','price':'2200','description':'rojo','imagen':imagenes[1],'category':'platos'}];

const categorias = [{'name':'platos'},{'name':'ropa'}]


var productPage = []

for (let i = 0; i < productos.length; i += 6) {
    let seccion = productos.slice(i, i + 6);
    productPage.push(seccion);
}


function Home (props)  {
    
    const [active,setActive] = useState (1)
    const paginas = Math.ceil(productos.length/6);
    /* const [categorias,setCategorias] = useState([]) */
    const [activeItem,setActiveItem] = useState('todos') 

    const handleItemClick = (e, { name }) => {
        setActiveItem(name)
    }

    useEffect(() => {
        
        // Se recomienda hacer los pedidos de productos aca
    }, []) 

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
            <Grid>
                <Grid.Column width={4}>
                <Menu fluid vertical tabular>
                    <Menu.Item
                    name='todos'
                    active={activeItem === 'todos'}
                    onClick={handleItemClick}
                    />
                    {categorias.map((categoria) => 
                        <Menu.Item
                        name={categoria.name}
                        active={activeItem === categoria.name}
                        onClick={handleItemClick}
                        />
                    )}
                </Menu>
                </Grid.Column>

                <Grid.Column stretched width={12}>
                <Segment>
                <div className = 'content'>
                    <div className = 'productos'>
                    <Card.Group>
                        {productPage[active-1].map((producto) => 
                            
                            <Card>
                                <Card.Content>
                                <Image
                                    size='small'
                                    src={producto.imagen}
                                />
                                <Card.Header>{producto.name}</Card.Header>
                                <Card.Meta>{producto.category}</Card.Meta>
                                <Card.Description>
                                    {producto.description}
                                </Card.Description>
                                </Card.Content>
                                <Card.Content extra>
                                    <Link to={'/producto/'+ producto.id}>
                                <Button inverted color='yellow'>
                                    Detalles de Compra
                                </Button>
                                </Link>                               
                                </Card.Content>
                            </Card>
                                                       
                        )} 
                    </Card.Group> 
                    </div>                     
                    <div className = 'paginacion'>
                    <Pagination size="sm">{items}</Pagination>  
                    </div>                                                                   
                    </div>
                    
                </Segment>
                </Grid.Column>
            </Grid>                       
        </div>        
    )
}

export default Home;