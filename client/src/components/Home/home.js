import React, { useState, useEffect } from "react";
import "./home.css";
import { Link } from "react-router-dom";
import { Grid, Menu, Segment, Image, Pagination, Button,Icon } from "semantic-ui-react";
import portada from "../../imagenes/portada.jpg";
import ProductHome from './ProductHome';
import { getCategories } from '../../redux/actions/category';
import { getProducts, getProductCategory } from '../../redux/actions/productList';
import { useDispatch, useSelector } from 'react-redux';
import store from '../../redux/store/index';
import agregarAlCarrito from '../../redux/actions/agregarAlCarrito';

let id = localStorage.getItem("idUser");
let serializedState = JSON.parse(localStorage.getItem("carrito"));


function Home() {

  const dispatch = useDispatch();
  const [active, setActive] = useState(1);
  const [activeItem, setActiveItem] = useState("Todos Los Productos");
  const [productos, setProductos] = useState()
  const [validate,setValidate] = useState(true)
  const paginas = productos && Math.ceil(productos.length / 6)
  const categorias = useSelector(state => state.categorias.data)
 

  


  useEffect(() => {
    
    
      
    if(serializedState && id){
      let order = serializedState.orderList.shift()
      console.log(order)
      dispatch(agregarAlCarrito(order,id)) 
      /* for (let index = 0; index < serializedState.orderList.length; index++) {
        dispatch(agregarAlCarrito(serializedState.orderList[index],id)) 
      } 
    
       localStorage.removeItem('carrito')    */        
    }
    if(!serializedState && id){
      localStorage.removeItem('carrito') 
    }
    /* while(serializedState && serializedState.orderList){
      
 
      dispatch(agregarAlCarrito(serializedState.orderList.shift(),id)) 

    
       /* localStorage.removeItem('carrito')             
    } */
       

    if(!productos && validate) {
      dispatch(getCategories());
      dispatch(getProducts());
      store.subscribe(() => {
        setProductos(() => store.getState().productList.data)
      })
      setValidate(false)

    }       
   
    

  })

  const handleItemClick = (e, { name }) => {

    
    setActiveItem(name);
    if (name === 'Todos Los Productos') {
      dispatch(getProducts());
    } else {
      dispatch(getProductCategory(name));
      setActive(1)
    }
    setValidate(true)
    setProductos([])
    
    

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
              <ProductHome productos={productos} active={active} validate={validate} />
              <div className="home-paginacion">
                {paginas && <Pagination
                  defaultActivePage={active}
                  onPageChange={handleClick}
                  firstItem={null}
                  lastItem={null}
                  pointing
                  secondary
                  totalPages={paginas}
                />}
              </div>
            </div>
          </Segment>
        </Grid.Column>
      </Grid>
    </div>
  );
}

export default Home;