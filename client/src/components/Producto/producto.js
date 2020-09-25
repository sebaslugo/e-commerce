import React, { useState, useEffect } from "react";
import "./producto.css";
import Reveal from 'react-reveal/Fade';
import "bootstrap/dist/css/bootstrap.min.css";
import { Image, Grid } from 'semantic-ui-react'
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core/';
import store from '../../redux/store/index';
import { getProduct } from '../../redux/actions/producto.js'
import { useDispatch } from "react-redux";
import AgregarAlCarrito from '../Carrito/AgregarAlCarrito'
import { animateScroll as scroll } from 'react-scroll';
import Recommend from './Recomend'
import Reviews from './reviews'
import publ1 from '../../imagenes/publicidad1.jpg'
import Swal from 'sweetalert2'



function Producto(props) {
  const dispatch = useDispatch();
  const [precio, setPrecio] = useState();
  const [cantidad, setCantidad] = useState(1);
  const [producto, setProducto] = useState({
    imagenes: []
  })
  const [category, setCategory] = useState();
  const [image, setImage] = useState()
  const id = document.URL.split("/").pop()


  useEffect(() => {
    if (!producto.id) {
      scroll.scrollToTop();
      dispatch(getProduct(id));


      store.subscribe(() => {
        setProducto(() => store.getState().productos.data.producto)
        setPrecio(() => store.getState().productos.data.producto.price)
      })
    }

    if (producto && !image) {
      handleImage()
    }

  });


  const onChange = (event) => {
    event.preventDefault();
    let quantity = event.target.value;
    if (quantity <= 1) {
      setCantidad(1)
    }
    else if (quantity <= producto.stock) {
      setPrecio(quantity * producto.price);
      setCantidad(quantity < cantidad ? (cantidad - 1) : (cantidad + 1))
    }
    else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No hay suficientes unidades del producto',
      })
      setCantidad(producto.stock)
    }

  };

  const handleImage = (image) => {
    if (!image) {
      setImage(producto.imagenes[0])
    }
    else {
      setImage(image)
    }

  }

  return (
    <div className='producto_todo'>
      <div className="producto_product">

        <div className='producto_imagenList'>
          {producto.imagenes.map((img, id) =>
            <Image src={`http://localhost:3001/${img}`} size='tiny' rounded onClick={() => handleImage(img)} />
          )}
        </div>
        <div className='producto_imagen'>
          <Reveal effect="fadeInUp">
            {image && <Image src={`http://localhost:3001/${image}`} size='huge' rounded />}
          </Reveal>
        </div>
        <div className='producto_info'>
          <Typography gutterBottom variant="h3" component="h2" className='producto_titulo'>
            {producto.name}
          </Typography>
          <Typography variant="h5" >
            $ {producto.price}
          </Typography>
          <Typography variant="body1" component="p" className='producto_description'>
            {producto.description}
          </Typography>
          <div className='product_price'>
            <div>
              <Typography variant="subtitle1" gutterBottom className='producto_cantidad'>
                Cantidad
            </Typography>
              {producto.stock > 1 &&
                <input type="number" className='producto_input' value={cantidad} onChange={(e) => onChange(e)} />}
            </div>
            <div>
              <Typography variant="h5" className='producto_price' >
                Total:
            </Typography>
              <Typography variant="h5" className='producto_price' >
                $ {precio}
              </Typography>
            </div>


          </div>
          <div className='product_carrito'>
            {producto.stock > 1 ? <AgregarAlCarrito producto={producto} precio={precio} cantidad={cantidad} active={true} /> : <p style={{ color: "red" }}>NO HAY STOCK!</p>}
          </div>

        </div>
      </div>


      <div className='product_recommend'>
        <Recommend productoId={producto.id} />
      </div>

      <div className='product_down'>
        <Reviews productoId={producto.id} />
        <Image
          id='product_public'
          src={publ1}
          size='large'
          href='https://www.soyhenry.com/' />
      </div>
    </div>

  );
}

export default Producto;
