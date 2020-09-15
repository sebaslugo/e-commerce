import React,{useState, useEffect } from "react";
import "./producto.css";
import { Carousel, CarouselItem } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { makeStyles } from '@material-ui/core/styles';
import {Card,CardActionArea,CardActions,CardContent,CardMedia,Button,IconButton,AddShoppingCartIcon,Container,Typography } from '@material-ui/core/';
import store from '../../redux/store/index';
import { getProducts } from '../../redux/actions/producto.js'
import { useDispatch } from "react-redux";
import AgregarAlCarrito from '../Carrito/AgregarAlCarrito'



import Reviews from './reviews'

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});


function Producto(props) {
  const dispatch = useDispatch();
  const [precio, setPrecio] = useState();
  const [cantidad, setCantidad] = useState(1);
  const [producto, setProducto] = useState({
    imagenes: []
  })
  const classes = useStyles();
  const id = document.URL.split("/").pop()


  const buyButton = () => {
    if (producto.stock > 1) {
      return <Button size="small" color="primary">
        Comprar
     </Button>
    }
    else {
      return <> <p style={{ color: "red" }}>NO HAY STOCK!</p>
      </>
    }
  }

  useEffect(() => {
    dispatch(getProducts(id));

    store.subscribe(() => {
      setProducto(() => store.getState().productos.data.producto)
      setPrecio(() => store.getState().productos.data.producto.price )
    })


  }, []);


  const onChange = (event) => {
    event.preventDefault();
    let quantity = event.target.value;
    if(quantity <= 1){
      setCantidad(1)
    }
    else if(quantity <= producto.stock){
      setPrecio(quantity * producto.price);
      setCantidad(quantity < cantidad ? (cantidad-1) : (cantidad+1))     
    }
    else{
      alert('No hay suficientes unidades del producto')
      setCantidad(producto.stock)
    }
    
  };

  return (
    <Container>
      <h1 className = "producto_title">{producto.name}</h1>  
      <hr/>
      < div className="producto_product" >
        <div className = 'producto_card'>
          <Card className={classes.root}>
            <CardContent>
              <Carousel>
                {producto.imagenes.map((img, id) =>
                  <Carousel.Item key={id}>
                    <img key={id} src={`http://localhost:3001/${img}`} ></img>
                  </Carousel.Item>
                )}
              </Carousel>
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {producto.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {producto.description}
                </Typography>
                <Typography gutterBottom variant="h6" component="h6">                  
                  {'stock: ' + producto.stock}
                </Typography>               
              </CardContent>
              <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                  Cantidad
                </Typography>
                {producto.stock>1 && <input type="number"  value = {cantidad} onChange={(e) => onChange(e)} />}
                <hr />
                <Typography variant="body2" color="textSecondary" component="p">
                  Precio = $
              <span>{precio}</span>
                </Typography>
              </CardContent>
            </CardContent>
            <CardActions>
              {producto.stock > 1 ? <Button size="small" color="primary">Comprar</Button> : <p style={{ color: "red" }}>NO HAY STOCK!</p>}
              {producto.stock> 1 && <AgregarAlCarrito producto={producto} precio={precio} cantidad={cantidad} />}
            </CardActions>
          </Card>
        </div>           
        <Reviews productoId = {producto.id}/>
      </div >
    </Container>

  );
}

export default Producto;
