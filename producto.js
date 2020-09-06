import React, { useState } from "react";
import "./producto.css";
import { Carousel, CarouselItem } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const validate = (price) => {
  return price;
};

function Producto(props) {
  const [price, setPrice] = useState(0);

  const onChange = (event) => {
    event.preventDefault();
    setPrice(event.target.value * props.price);
  };

  return (
    <div className="product">
      <div className="producto__producto">Producto</div>
      <div className="head">
        <div className="imagen">
          <Carousel>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="https://cnnespanol.cnn.com/wp-content/uploads/2019/12/s_64a163f16ecbb099e52f2f8271f73cbbfcfc9034be4d646f7375e4db1ca6f3d7_1573501883482_ap_19001106049831-1.jpg?quality=100&strip=info&w=320&h=240&crop=1"
                alt="First slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="https://images.ctfassets.net/hrltx12pl8hq/VZW7M82mrxByGHjvze4wu/216d9ff35b6980d850d108a50ae387bf/Carousel_01_FreeTrial.jpg?fit=fill&w=800&h=450"
                alt="Third slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="https://cde.laprensa.e3.pe/ima/0/0/2/3/8/238082.jpg"
                alt="Third slide"
              />
            </Carousel.Item>
          </Carousel>
        </div>

        <div className="info">
          <h1>{props.title}</h1>
          <div>
            <span>Cantidad</span>
            <input type="number" onChange={onChange} />
          </div>
          <div>
            <span>Precio = $</span>
            <span>{price}</span>
          </div>
        </div>
      </div>

      <>
        <span>description</span>
        <p>{props.description}</p>
      </>
    </div>
  );
}

export default Producto;
