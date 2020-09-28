import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Grid, Segment, Card } from "semantic-ui-react";

import ProductResult from "./ProductResult";

export default function ResultSearch({ location }) {

  const content = useSelector((state) => state.busqueda.data);
  console.log(content);

  useEffect(() => {
    /* sin uso por el momento */
  });
  const renderProducts = () => {
    if (content) {
      return content.map((value, index) => (
        <ProductResult key={index} {...value} />
      ));
    }
  };
  return (
    <Grid container spacing={3}>
      <Grid.Column width={15}>
        <Segment>
          <div className="home-content">
            <div className="home-productos">
                {(content) ? <h2>Resultados de la búsqueda</h2> : <h2 style={{marginBottom: '3rem'}}>No se encontraron resultados.</h2>}
              <Card.Group>{renderProducts()}</Card.Group>
            </div>
          </div>
        </Segment>
      </Grid.Column>
    </Grid>
  );
}
