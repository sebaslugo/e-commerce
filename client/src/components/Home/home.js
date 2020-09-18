import React, { useState, useEffect } from "react";
import "./home.css";
import { Link } from "react-router-dom";
import { Grid, Menu, Segment, Image, Pagination, Button } from "semantic-ui-react";
import portada from "../../imagenes/portada.jpg";
import ProductHome from './ProductHome';
import { getCategories } from '../../redux/actions/category';
import { getProducts, getProductCategory } from '../../redux/actions/productList';
import { useDispatch, useSelector } from 'react-redux';
import store from '../../redux/store/index';
import AgregarAlCarrito from '../Carrito/AgregarAlCarrito'
import { getUser } from '../../redux/actions/menuLogIn'
import axios from 'axios'
// axios.defaults.headers.common = { 'Authorization': `bearer ${localStorage.getItem('token')}` }

function Home() {


  const dispatch = useDispatch();
  const [active, setActive] = useState(1);
  const [activeItem, setActiveItem] = useState("Todos Los Productos");
  const [productos, setProductos] = useState([])
  const paginas = productos && Math.ceil(productos.length / 6);
  const [productPage, setProductPage] = useState([]);
  const categorias = useSelector(state => state.categorias.data)


  useEffect(() => {
    let page = [];
    dispatch(getCategories());
    dispatch(getProducts());
    // dispatch(getUser())
    store.subscribe(() => {
      setProductos(() => store.getState().productList.data)
    })
    // axios({
    //   method: 'GET',
    //   url: `http://localhost:3001/auth/me`,

    //   // config: {
    //   //   headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    //   // }
    // }
    // )

    //   .then((res) => {
    //     console.log(res)
    //   })
    //   .catch(err => err)

  }, [])

  const handleItemClick = (e, { name }) => {

    let page = [];
    setActiveItem(name);
    if (name === 'Todos Los Productos') {
      dispatch(getProducts());
    } else {
      dispatch(getProductCategory(name));
      setActive(1)
    }
    /* if(productos){
      for (let i = 0; i < productos.length; i += 6) {
        let seccion = productos.slice(i, i + 6);
        page.push(seccion)
      }
      setProductPage(page) 

    } */

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
            {categorias && categorias.length > 0 && categorias.map((categoria, index) => (
              <Link to={`/${categoria.name}`}>
                <Menu.Item key={index}
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
              <ProductHome productPage={productPage} productos={productos} active={active} />
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