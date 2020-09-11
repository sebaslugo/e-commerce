import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Grid,
  Segment,
  Card
} from "semantic-ui-react";
import queryString from "query-string";

import { axiosSearchProduct } from "../redux/actions/search";
import ProductResult from "./ProductResult";

export default function ResultSearch({ location }) {
  const dispatch = useDispatch();

  const content = useSelector((state) => state.busqueda.data);
  console.log(content);

  useEffect(() => {
    const { productName } = queryString.parse(location.search);
    if (productName && !content) {
      dispatch(axiosSearchProduct(productName));
    }
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
                <h2>Resultados de la búsqueda</h2>
              <Card.Group>{renderProducts()}</Card.Group>
            </div>
          </div>
        </Segment>
      </Grid.Column>
    </Grid>
  );
}
