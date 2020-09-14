import React from "react";
import { Card, Image, Button } from "semantic-ui-react";
import { withRouter } from "react-router-dom";

import "../home.css";
import "./ProductResult.css";

const ProductResult = ({
  id,
  name,
  description,
  price,
  stock,
  imagenes,
  history,
}) => {
  const handleSeeProductClick = () => {
    history.push(`/producto/${id}`);
  };

  const verificarURL = () => {
    if (imagenes[0].includes(".png") || imagenes[0].includes(".jpg")) {
      return imagenes[0];
    } else {
      return "sin_imagen.jpg";
    }
  };

  return (
    <Card style={{ margin: "1.5rem" }}>
      <Card.Content>
        <Image size="small" src={`http://localhost:3001/${verificarURL()}`} />
        <Card.Header className="home-header">{name}</Card.Header>
        {/* <Card.Meta>{category}</Card.Meta> */}
        <Card.Description>{description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <div className="home-price">
          <Button onClick={handleSeeProductClick} inverted color="yellow">
            Ver Producto
          </Button>
          <Card.Header className="home-priceCard">{`$ ${price}`}</Card.Header>
        </div>
      </Card.Content>
    </Card>
  );
};

export default withRouter(ProductResult);
