import React from "react";
import { Card, Image, Button } from "semantic-ui-react";
import { Grid } from '@material-ui/core';
import { withRouter } from "react-router-dom";
import AgregarAlCarrito from '../Carrito/AgregarAlCarrito';
import './ProductResult.css';
import '../Home/ProductHome.css';

const ProductResult = ({
  id,
  name,
  description,
  price,
  stock,
  imagenes,
  history,
}) => {

  const producto = { id, name, description, price, stock, imagenes };

  const handleSeeProductClick = () => {
    history.push(`/producto/${id}`);
  };

  const verificarURL = () => {
    if (imagenes[0].includes(".png") || imagenes[0].includes(".jpg")) {
      return imagenes[0];
    } else {
      return "sin_imagen.png";
    }
  };

  return (
    // <Card style={{ margin: "1.5rem" }}>
    //   <Card.Content>
    //     <Image size="small" src={`http://localhost:3001/${verificarURL()}`} />
    //     <Card.Header className="home-header">{name}</Card.Header>
    //     {/* <Card.Meta>{category}</Card.Meta> */}
    //     <Card.Description>{description}</Card.Description>
    //   </Card.Content>
    //   <Card.Content extra>
    //     <div className="home-price">
    //       <Button onClick={handleSeeProductClick} inverted color="yellow">
    //         Ver Producto
    //       </Button>
    //       <Card.Header className="home-priceCard">{`$ ${price}`}</Card.Header>
    //     </div>
    //   </Card.Content>
    // </Card>
    <div className="container" style={{width: 'auto'}}>
            <Grid container spacing={3}>    
              <Grid item xs={12} sm={4} md={4} lg={4} xl={4} className="card" key={id}>                          
                      <img src={`http://localhost:3001/${imagenes[0]}`} alt={name} className="card__img" />
                      <div className="card__data">
                          <h1 className="card__title">{(name.length > 25) ? name.substring(0, 22) + '...' : name}</h1>
                          <span className="card__preci"><span className="signoPeso">$</span>{price}</span>
                          <p className="card__description">
                              {(description.length > 38) ? description.substring(0, 36) + '...' : description}
                          </p>
                          <div className="contenedorBotones">
                              <a className="card__button"><AgregarAlCarrito producto={producto} precio={price} cantidad={1} active={false} /></a>
                              <a href={"/producto/" + id} className="card__button">Ver</a>
                          </div>
                      </div>                    
              </Grid>               
            </Grid>
        </div>
  );
};

export default withRouter(ProductResult);
