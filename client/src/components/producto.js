import React, { useState,useEffect } from "react";
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
import Typography from '@material-ui/core/Typography';
import axios from 'axios';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});
/* const validate = (price) => {
  return price;
}; */


function Producto(props) {
  const [price, setPrice] = useState(0);
  const [producto,setProducto] = useState({})
  const classes = useStyles();

  const onChange = (event) => {
    event.preventDefault();
    setPrice(event.target.value * producto.price);
  };
  useEffect(() => {
    axios
    .get(`http://localhost:3001/products/${props.match.params.id}`)
        .then(res => {
          console.log(res)
        setProducto(res.data.producto)

        })
  },{})
  return (
    <div className="producto_product">
      <h1> Producto </h1>
      <Card className={classes.root}>
      <CardContent>
        <CardMedia className={classes.media}/>
        <Carousel>
           {producto.imagenes && producto.imagenes.map((img)=>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={`http://localhost:3001/${img}`}
                alt="First slide"
              />
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
            <input type="number" onChange={onChange} />
          </Typography>
          <hr/>
          <Typography variant="body2" color="textSecondary" component="p">
            Precio = $ 
            <span>{price}</span>
          </Typography>
        </CardContent>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary">
          Comprar
        </Button>
        <Button size="small" color="primary">
          Favoritos
        </Button>
      </CardActions>
    </Card>
    </div>
  );
}

export default Producto;
