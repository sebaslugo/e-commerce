import React, { useState, useEffect } from "react";
import "./home.css";
import { Link } from "react-router-dom";
import { Image, Pagination } from "semantic-ui-react";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import portada from "../../imagenes/portada.jpg";
import ProductHome from './ProductHome';
import { getCategories } from '../../redux/actions/category';
import { getProducts, getProductCategory } from '../../redux/actions/productList';
import { useDispatch, useSelector } from 'react-redux';
import store from '../../redux/store/index';
import agregarAlCarrito from '../../redux/actions/agregarAlCarrito';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';

import { animateScroll as scroll } from 'react-scroll';
import Footer from '../Footer'
import Paper from '@material-ui/core/Paper';

let id = localStorage.getItem("idUser");
let serializedState = JSON.parse(localStorage.getItem("carrito"));


const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    display: "flex",
    flexDirection: "column",
    marginLeft: "1px solid black"
  },
  botonCat: {
    backgroundColor: "black",
    color: "whitesmoke",
    fontSize: ".9em",
    borderColor: "red",
    marginBottom: ".5rem",

  }
}));

const StyledMenu = withStyles({
  paper: {
    border: '1px solid black',
    width: "250px",
    backgroundColor: "red",
    justifyContent: "space-between"
  },
})
const StyledMenuItem = withStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

function Home() {

  const dispatch = useDispatch();
  const [active, setActive] = useState(1);
  const [activeItem, setActiveItem] = useState("Todos Los Productos");
  const [productos, setProductos] = useState()
  const [validate, setValidate] = useState(true)
  const paginas = productos && Math.ceil(productos.length / 6)
  const categorias = useSelector(state => state.categorias.data)
  const classes = useStyles()



  useEffect(() => {

    if (serializedState && id) {
      let data = {}
      dispatch(agregarAlCarrito(data, id));
    }
    if (!productos && validate) {
      dispatch(getCategories());
      dispatch(getProducts());
      store.subscribe(() => {
        setProductos(() => store.getState().productList.data)
      })
      setValidate(false)
    }
  }, [])
  const handleItemClick = (e) => {

    if (e === "todos los productos") {
      setActiveItem(e);
      dispatch(getProducts());
      setValidate(true)
      setProductos([])
    } else {


      setActiveItem(e);
      dispatch(getProductCategory(e));
      setActive(1)
      setValidate(true)
      setProductos([])
    }


  };
  const handleClick = (e, { activePage }) => {
    setActive(activePage);
  };
  return (
    <div className="home-Home">
      <div className='home_portada'>
        <Image src={portada} fluid />
      </div>
      <div className="contenedor">
        <div className={classes.paper}>
          <div className="categTitle">
            CATEGORIAS
        </div>
          {/* <StyledMenuItem className={classes.items}> */}
          <Link className={classes.botonCat} to={`/products`}>
            <Button className={classes.botonCat} onClick={() => handleItemClick("todos los productos")} name="todos los productos" key="-1" color="primary" >
              Todos los productos
          </Button>
          </Link>
          {/* </StyledMenuItem> */}
          {categorias && categorias.map((categoria, index) => (
            <Link className={classes.botonCat} to={`/${categoria.name}`}>
              <Button className={classes.botonCat} onClick={() => handleItemClick(categoria.name)} name={categoria.name} key={index}>
                {categoria.name}
              </Button>
            </Link>
          ))}
        </div>
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
      </div>
      <div className="foot">
        <Footer />
      </div>
    </div>
  );
}

export default Home;