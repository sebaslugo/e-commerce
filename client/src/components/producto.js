import React, { useState } from "react";
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

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});
const validate = (price) => {
  return price;
};

function Producto(props) {
  const [price, setPrice] = useState(0);
  const classes = useStyles();

  const onChange = (event) => {
    event.preventDefault();
    setPrice(event.target.value * props.price);
  };

  return (
    <div className="producto_product">
      <h1> Producto </h1>
      <Card className={classes.root}>
      <CardContent>
        <CardMedia className={classes.media}/>
        <Carousel>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="https://i.pinimg.com/236x/b7/e3/8b/b7e38b7111481c2c72c98990ec3d3889.jpg"
                alt="First slide"
              />
            </Carousel.Item>
          </Carousel>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.description}
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
