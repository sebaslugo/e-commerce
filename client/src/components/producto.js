import React,{useState, useEffect } from "react";
import "./producto.css";
import { Carousel, CarouselItem } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import store from '../redux/store/index';
import { fetchProducts } from '../redux/actions/producto.js'
import { useDispatch } from "react-redux";
import AgregarAlCarrito from './AgregarAlCarrito'

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
  const [precio, setPrecio] = useState(0);
  const [cantidad, setCantidad] = useState(0);
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
    dispatch(fetchProducts(id));

    store.subscribe(() => setProducto(() => store.getState().productos.data.producto))


  }, []);


  const onChange = (event) => {
    event.preventDefault();
    setPrecio(event.target.value * producto.price);
    setCantidad(cantidad + 1)
  };

  return (
    <Container>
      < div className="producto_product" >
        <h1>{producto.name}</h1>
        <Card className={classes.root}>
          <CardContent>
            <CardMedia className={classes.media} />
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
            </CardContent>
            <CardContent>
              <Typography variant="body2" color="textSecondary" component="p">
                Cantidad
            <input type="number" onChange={(e) => onChange(e)} />
              </Typography>
              <hr />
              <Typography variant="body2" color="textSecondary" component="p">
                Precio = $
            <span>{precio}</span>
              </Typography>
            </CardContent>
          </CardContent>
          <CardActions>
            {buyButton()}
            <Button size="small" color="primary">
              Favoritos
        </Button>
            <AgregarAlCarrito producto={producto} precio={precio} cantidad={cantidad} />
            {/* <IconButton
            type="submit"
            color="primary"
            aria-label="Añadir al carrito"
            // onSubmit={enviarDatos}
            onClick={enviarDatos}
            className={classes.submit}
          >
            <AddShoppingCartIcon />
          </IconButton> */}
          </CardActions>
        </Card>
      </div >
    </Container>

  );
}

export default Producto;
