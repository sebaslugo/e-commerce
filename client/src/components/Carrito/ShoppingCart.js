import React, { useState, useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import IconButton from '@material-ui/core/IconButton';
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
import DeleteIcon from "@material-ui/icons/Delete";
import Button from "@material-ui/core/Button";
import { grey, yellow } from "@material-ui/core/colors/";
import store from "../../redux/store/index";
import agregarAlCarrito from '../../redux/actions/agregarAlCarrito';
import { fetchProductsFromCart, EmptyCart, editCantidad, editOrden, deleteProduct } from "../../redux/actions/shoppingCart";
import { useDispatch } from "react-redux";
import "./ShoppingCart.css";
import Divider from '@material-ui/core/Divider';
import CloseIcon from '@material-ui/icons/Close';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart';
import { animateScroll as scroll} from 'react-scroll';






const useStyles = makeStyles((theme) => ({
  rootButton: {
    '& > *': {

    },
  },
  margin: {
    margin: theme.spacing(3),
    color: yellow[500],
    backgroundColor: grey[900],
    alignSelf: "center",
    width: 300,
    fontWeight: "bold",
    "&:hover": {
      backgroundColor: grey[800]
    }
  },
  margin2: {
    color: yellow[500],
    backgroundColor: grey[900],
    marginLeft: 77,
    fontWeight: "bold",
    // position: "absolute",
    // marginLeft: 90,

    width: 200,
    "&:hover": {
      backgroundColor: grey[600]
    }
  },
  root: {
    // flexShrink: 1,

    display: "flex",
    justifyContent: "flex-start",
    flexDirection: "column"


  },
  paper: {

    // display: "flex",
    // justifyContent: "flex-start",

    padding: theme.spacing(3),
    margin: 15,
    maxWidth: 800,
    height: 200,
    backgroundColor: grey[100]

  },

  root2: {
    // flexShrink: 10,
    display: "flex",
    justifyContent: "flex-end",
    position: "absolute",
    bottom: 200,
    right: 50,
    width: 400


  },

  paper2: {
    padding: theme.spacing(1),


    // left: 400,
    // bottom: 400,
    height: 300,
    backgroundColor: grey[100]

  },
  checkout: {
    padding: theme.spacing(3),
    margin: "auto",
  },
  image: {
    width: 128,
    height: 170,
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  },
}));



function getSum(total, num) {
  return total + num;
}

let id = localStorage.getItem("idUser");



const ShoppingCart = () => {

  const classes = useStyles();
  const dispatch = useDispatch();
  const [cart, setCart] = useState({ products: [] });
  const [quantities, setQuantity] = useState();
  const [prices, setPrices] = useState();
  const [active, setActive] = useState(true);
  const [subtotal, setSubTotal] = useState(0);


  useEffect(() => {

    scroll.scrollTo(200);

    let precios = {};
    let cantidades = {};


    // toma el id del storage

    if (id && active) {
      localStorage.removeItem('carrito')
      dispatch(fetchProductsFromCart(id));
      store.subscribe(() => setCart(() => store.getState().shoppingCart.data));
      setActive(false);

    } else if (!id && active) {
      try {
        let serializedState = JSON.parse(localStorage.getItem("carrito"));
        if (serializedState === null) return undefined;
        setCart(serializedState);
        setActive(false);
      } catch (e) {
        console.log(e);
      }
    }

    // setea precios y cantidades

    if (!prices && !quantities && cart.orderList) {
      cart.orderList.map((order) => {
        precios = {
          ...precios,
          [order.productId]: order.price,
        };
        cantidades = {
          ...cantidades,
          [order.productId]: order.quantity,
        };
      });
      setQuantity(cantidades);
      setPrices(precios);
    }

    // realiza el calculo del subtotal

    if (prices) {
      let precio = Object.values(prices);
      setSubTotal(precio.reduce(getSum, 0));
    }

  });



  const onChange = (event, product) => {
    /* event.preventDefault(); */
    let quantity = event.target.value;
    let cant = quantities[product.id];
    if (quantity < 1) {
      setQuantity({
        ...quantities,
        [product.id]: 1,
      });
    } else if (quantity <= product.stock) {
      setPrices({
        ...prices,
        [product.id]: quantity * product.price,
      });
      setQuantity({
        ...quantities,
        [product.id]: quantity < cant ? cant - 1 : cant + 1,
      });
    } else {
      alert("No hay suficientes unidades del producto");
      setQuantity({
        ...quantities,
        [product.id]: product.stock,
      });
    }
    let data = {
      productId: product.id,
      price: product.price * quantity,
      quantity: parseInt(quantity),
    };
    if (id) {
      dispatch(editCantidad(id, data));
    }
    else {
      let local = {
        ...cart,
        orderList: cart.orderList.filter((producto) => {
          if (product.id == producto.productId && quantity <= product.stock) {
            return producto.quantity = data.quantity
          }
          else { return producto }
        })
      }
      console.log(local)
      const serializedState = JSON.stringify(local);
      localStorage.setItem("carrito", serializedState);

    }
  };

  ////// vacia el carrito

  const emptyCarrito = (e) => {
    setPrices(null);
    setSubTotal(0);
    if (id) {
      dispatch(EmptyCart(id));
      setActive(true)

    }
    else {
      localStorage.removeItem('carrito');
      setCart({})
    }

  };

  // realiza la compra


  const handleBuy = () => {
    if (id) {
      let data = {
        'status': 'creada'
      }
      /* dispatch(editOrden(cart.ordenId,data))
      setCart({}) */

    }
    else {
      window.location.assign("http://localhost:3000/login/createuser")
    }

  }



  // elimina un producto

  const productDelete = (e, product) => {
    if (id) {
      dispatch(deleteProduct(id, product.id, cart.ordenId))
      dispatch(fetchProductsFromCart(id));
    }
    else {
      delete quantities[product.id];
      delete prices[product.id];
      let local = {
        ['products']: cart.products.filter(producto => product.id !== producto.id),
        ['orderList']: cart.orderList.filter(producto => product.id !== producto.productId)
      }
      setCart(local)
      const serializedState = JSON.stringify(local);
      localStorage.setItem("carrito", serializedState);
    }
    if (!cart) {
      dispatch(EmptyCart(id));
    }

  }




  return (
    <div >
      {/* <h1 style={{ textAlign: "center", backgroundColor: grey[100] }}> Mi Carrito</h1> */}
      {/* <Divider variant="middle" /> */}
      <div className='shopping-content'>


        <div className={classes.root}>



          {cart && cart.products &&
            cart.products.length > 0 &&
            cart.products.map((product, index) => (
              <Paper key={index} className={classes.paper}>
                <Grid container spacing={2} >
                  <Grid item xs container spacing={2}>
                    <ButtonBase className={classes.image}>
                      <img
                        className={classes.img}
                        alt="complex"
                        src={`http://localhost:3001/${product.imagenes[0]}`}
                      />
                    </ButtonBase>
                  </Grid>
                  <Grid item xs={10} sm container>
                    <Grid item xs container direction="column" spacing={2}>
                      <Grid item xs style={{ position: "absolute", marginTop: 20 }}>
                        <Typography gutterBottom variant="subtitle1">
                          <h4>{product.name}</h4>
                        </Typography>

                        <Typography variant="body2" gutterBottom>
                          <h6>{product.description}</h6>
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid style={{ marginTop: 20 }} item xs>
                    <Typography gutterBottom variant="subtitle1">
                      <h4>Precio</h4>
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      <label>
                        <strong>$</strong>
                        {prices && prices[product.id]}
                      </label>
                    </Typography>
                  </Grid>
                  <Grid item xs container direction="column" spacing={2}>
                    <Grid item xs>
                      <Typography style={{ marginTop: 25 }} variant="body2" color="textSecondary">
                        <input
                          style={{ height: 40, width: 120 }}
                          type="number"
                          name={product.id}
                          value={quantities && quantities[product.id]}
                          onChange={(e) => onChange(e, product)}
                        ></input>
                      </Typography>
                      <Grid >
                        <Typography style={{ position: "relative", left: 250, bottom: 85 }}>
                          <Button style={{ backgroundColor: "transparent", outline: "none", border: "none" }}>
                            <CloseIcon onClick={(e) => productDelete(e, product)} />
                          </Button>
                        </Typography>
                      </Grid>
                    </Grid>


                    {/* 
                    <Grid item>
                      <ColorButton
                        // variant="contained"
                        className={classes.rootButton}
                        startIcon={<DeleteIcon />}
                        onClick={(e) => productDelete(e, product)}
                      >
                      </ColorButton>
                    </Grid> */}
                  </Grid>
                  <Grid item xs container direction="column" spacing={2}>

                  </Grid>
                </Grid>
              &nbsp;
              </Paper>


            ))}
          {quantities ? <div className={classes.root2}>
            <Paper className={classes.paper2}>
              <Grid boxShadow={10} container spacing={2}>
                <Grid item>
                </Grid>
                <Grid item xs={12} sm container>
                  <Grid item xs container direction="column" spacing={2}>
                    <Grid item xs>
                      <Typography style={{ position: "relative" }}>
                        <h3 >Subtotal:</h3>
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="p">
                        Suma de productos: $ {subtotal}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="p">
                        Costo de envío: <p style={{ color: "green" }}>GRATIS</p>
                      </Typography>
                    </Grid>

                    <Divider variant="middle" />
                    &nbsp;
                    <Grid item xs={12}>
                      <Typography style={{ textAlign: "center" }} variant="h6">
                        Total de la compra:
                      </Typography>
                      <Typography style={{ textAlign: "center", top: 60 }} variant="h4">
                        ${subtotal}
                      </Typography>
                      &nbsp;
                      <Button onClick={handleBuy} className={classes.margin} size="medium">
                        CONTINUAR CON LA COMPRA
                      </Button>
                      <Button onClick={emptyCarrito} className={classes.margin2} size="small">
                        <DeleteOutlineIcon />
                        &nbsp;
                        VACIAR CARRITO
                      </Button>

                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </div> : <div><h1 style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%", width: "100%" }}>Tu carrito está vacío, ¡Agrega un producto!
          </h1>
              <RemoveShoppingCartIcon style={{ fontSize: 200, marginLeft: 600 }} />
            </div>
          }




          {/* <Grid item >
          <div className='shopping_vaciar'>
            {cart && cart.orderList && <ColorButton
              variant="contained"
              className={classes.button}
              startIcon={<DeleteIcon />}
              onClick={emptyCarrito}
            >
              VACIAR CARRITO
            </ColorButton>}

          </div>


        </Grid> */}
        </div>
        {/* <footer className="footer">
        <h4>TOTAL: ${subtotal}</h4>
        <ColorButton
          variant="contained"
          className="buy_button"
          onClick={handleBuy}
        >
          COMPRAR
                    </ColorButton>
      </footer> */}


      </div>
    </div >

  );
};

export default ShoppingCart;
