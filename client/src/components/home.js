import React, { useState, useEffect } from "react";
import "./home.css";
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
import axios from 'axios';

function Home() {

  const [active, setActive] = useState(1);
  const [activeItem, setActiveItem] = useState("productos");
  const [productos, setProductos] = useState([]);
  const paginas = Math.ceil(productos.length / 6);
  const [productPage, setProductPage] = useState([]);
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/products')
      .then(res => {
        setProductos(res.data)
        let page = [];
        for (let i = 0; i < res.data.length; i += 6) {
          let seccion = res.data.slice(i, i + 6);
          page.push(seccion)
        }
        setProductPage(page)
      });
    axios.get('http://localhost:3001/products/category')
      .then(res => {
        setCategorias(res.data)
      });
  }, [])

  const handleItemClick = (e, { name }) => {
    setActiveItem(name);
    let url = '';
    if (name === 'Todos Los Productos') {
      url = 'http://localhost:3001/products';
    } else {
      url = `http://localhost:3001/products/category/${name}`;
    }
    axios.get(`${url}`)
      .then(res => {
        setProductos(res.data)
        let page = [];
        for (let i = 0; i < res.data.length; i += 6) {
          let seccion = res.data.slice(i, i + 6);
          page.push(seccion)
        }
        setProductPage(page)
      });
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
                name="Todos Los Productos"
                active={activeItem === "Todos Los Productos"}
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
                  {productPage.length > 0 && productPage[active - 1].map((producto) => (
                    <Card>
                      <Card.Content>
                        <Image size="small" src={`http://localhost:3001/${producto.imagenes[0]}`} />
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