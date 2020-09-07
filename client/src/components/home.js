import React, { useState, useEffect } from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import {
  Grid,
  Menu,
  Segment,
  Card,
  Image,
  Pagination,
  Button,
} from "semantic-ui-react";
import portada from "../imagenes/portada.jpg";

const imagenes = ['https://i.pinimg.com/236x/b7/e3/8b/b7e38b7111481c2c72c98990ec3d3889.jpg','https://i.pinimg.com/236x/b7/e3/8b/b7e38b7111481c2c72c98990ec3d3889.jpg']

const productos = [{'id':0,'name':'camiseta','price':'1200','description':'azul','imagen':imagenes[0],'category':'platos'},
                    {'id':1,'name':'carro','price':'2200','description':'rojo','imagen':imagenes[0],'category':'ropa'},
                    {'id':2,'name':'moto','price':'2200','description':'amarrilo','imagen':imagenes[0],'category':'ropa'},
                    {'id':3,'name':'arroz','price':'2200','description':'verde','imagen':imagenes[0],'category':'ropa'},
                    {'id':4,'name':'casa','price':'2200','description':'cafe','imagen':imagenes[0],'category':'ropa'},
                    {'id':5,'name':'platos','price':'2200','description':'rojo','imagen':imagenes[0],'category':'platos'},
                    {'id':6,'name':'platos','price':'2200','description':'rojo','imagen':imagenes[0],'category':'platos'},
                    {'id':7,'name':'platos','price':'2200','description':'rojo','imagen':imagenes[0],'category':'platos'},
                    {'id':8,'name':'platos','price':'2200','description':'rojo','imagen':imagenes[0],'category':'platos'},
                    {'id':9,'name':'platos','price':'2200','description':'rojo','imagen':imagenes[0],'category':'platos'},
                    {'id':10,'name':'platos','price':'2200','description':'rojo','imagen':imagenes[0],'category':'platos'},
                    {'id':11,'name':'platos','price':'2200','description':'rojo','imagen':imagenes[0],'category':'platos'},
                    {'id':12,'name':'platos','price':'2200','description':'rojo','imagen':imagenes[0],'category':'platos'},
                    {'id':13,'name':'platos','price':'2200','description':'rojo','imagen':imagenes[0],'category':'platos'},
                    {'id':14,'name':'platos','price':'2200','description':'rojo','imagen':imagenes[0],'category':'platos'}];

const categorias = [{ name: "platos" }, { name: "ropa" }];

var productPage = [];

for (let i = 0; i < productos.length; i += 6) {
  let seccion = productos.slice(i, i + 6);
  productPage.push(seccion);
}

function Home(props) {
  const [active, setActive] = useState(1);
  const paginas = Math.ceil(productos.length / 6);
  const [activeItem, setActiveItem] = useState("productos");

  const handleItemClick = (e, { name }) => {
    setActiveItem(name);
  };

  const handleClick = (e, { activePage }) => {
    setActive(activePage);
  };

  return (
    <div className="home-Home">
      <Image src={portada} fluid />
      <Grid>
        <Grid.Column width={4}>
          <Menu fluid vertical tabular>
            <Link to="/products">
              <Menu.Item
                name="productos"
                active={activeItem === "productos"}
                onClick={handleItemClick}
              />
            </Link>
            {categorias.map((categoria) => (
              <Link to={`/${categoria.name}`}>
                <Menu.Item
                  name={categoria.name}
                  active={activeItem === categoria.name}
                  onClick={handleItemClick}
                />
              </Link>
            ))}
          </Menu>
        </Grid.Column>
        <Grid.Column stretched width={12}>
          <Segment>
            <div className="home-content">
              <div className="home-productos">
                <Card.Group>
                  {productPage[active - 1].map((producto) => (
                    <Card>
                      <Card.Content>
                        <Image size="small" src={producto.imagen} />
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
                            Detalles de Compra
                          </Button>
                        </Link>
                          <Card.Header className="home-priceCard">
                            {`$ ${producto.price}`}
                          </Card.Header>
                        </div>
                      </Card.Content>
                    </Card>
                  ))}
                </Card.Group>
              </div>
              <div className="home-paginacion">
                <Pagination
                  defaultActivePage={active}
                  onPageChange={handleClick}
                  firstItem={null}
                  lastItem={null}
                  pointing
                  secondary
                  totalPages={paginas}
                />
              </div>
            </div>
          </Segment>
        </Grid.Column>
      </Grid>
    </div>
  );
}

export default Home;
