import React, { useState, useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
import DeleteIcon from "@material-ui/icons/Delete";
import Button from "@material-ui/core/Button";
import { grey, yellow } from "@material-ui/core/colors/";
import store from "../../redux/store/index";
import agregarAlCarrito from '../../redux/actions/agregarAlCarrito';
import {fetchProductsFromCart,EmptyCart,editCantidad,editOrden,deleteProduct} from "../../redux/actions/shoppingCart";
import { useDispatch } from "react-redux";
import "./ShoppingCart.css";

const ColorButton = withStyles((theme) => ({
  root: {
    color: yellow[500],
    backgroundColor: grey[900],
    "&:hover": {
      backgroundColor: grey[800],
    },
  },
}))(Button);

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    maxWidth: 1000,
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
let carritoLocal = JSON.parse(localStorage.getItem("carrito"))



const ShoppingCart = () => {

  const classes = useStyles();
  const dispatch = useDispatch();
  const [cart, setCart] = useState({ products: [] });
  const [quantities, setQuantity] = useState();
  const [prices, setPrices] = useState();
  const [active, setActive] = useState(true);
  const [subtotal, setSubTotal] = useState(0);

  

  useEffect(() => {

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
      price: prices[product.id],
      quantity: parseInt(quantity),
    };
    if (id) {
      dispatch(editCantidad(id, data));
    }
    else{
      let local = {
        ...cart,
        orderList:cart.orderList.filter((producto) => {
          if(product.id == producto.productId && quantity <= product.stock){
            return producto.quantity= data.quantity
          }
          else{return producto}
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
    if(id){
      dispatch(EmptyCart(id));
      setActive(true)
      
    }
    else{      
      localStorage.removeItem('carrito');
      setCart({})
    }
    
  };

  // realiza la compra

  const handleBuy= () => {
    if(id){
      let data = {
        'status':'creada'
      }
      dispatch(editOrden(cart.ordenId,data))
      setCart({})
    }
    else {
      window.location.assign("http://localhost:3000/login/createuser")
    }

  }
 
  // elimina un producto

  const productDelete = (e,product) => {    
    if(id){
      dispatch(deleteProduct(id,product.id,cart.ordenId))
      dispatch(fetchProductsFromCart(id));
    }
    else {
      delete quantities[product.id];
      delete prices[product.id];
      let local = {
        ['products']:cart.products.filter(producto => product.id !== producto.id),
        ['orderList']:cart.orderList.filter(producto => product.id !== producto.productId)
      }
      setCart(local)
      const serializedState = JSON.stringify(local);
      localStorage.setItem("carrito", serializedState);  
    }
    if(!cart){
      dispatch(EmptyCart(id));
    }
    
  }

  

  return (
    <div className = 'shopping-content'>
        <div className={classes.root}>
        <div className="shopping_subtotal">
          <div>
            <p>
              Subtotal<strong> ${subtotal} </strong>
            </p>
          </div>
          <button onClick = {handleBuy}>COMPRAR</button>
        </div>
        {cart && cart.products &&
          cart.products.length > 0 &&
          cart.products.map((product, index) => (
            <Paper key={index} className={classes.paper}>
              <Grid container spacing={3}>
                <Grid item xs container direction="column" spacing={2}>
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
                    <Grid item xs>
                      <Typography gutterBottom variant="subtitle1">
                        <h1>{product.name}</h1>
                      </Typography>

                      <Typography variant="body2" gutterBottom>
                        <h6>{product.description}</h6>
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        <p style={{ fontWeight: "bold" }}>
                          <strong>$</strong>
                          {product.price}
                        </p>
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs container direction="column" spacing={2}>
                  <Grid item xs>
                    <Typography gutterBottom variant="subtitle1">
                      <h3>Cantidad</h3>
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      <input
                        type="number"
                        name={product.id}
                        value={quantities && quantities[product.id]}
                        onChange={(e) => onChange(e, product)}
                      ></input>
                    </Typography>

                  </Grid>

                  <Grid item>
                    <ColorButton
                      variant="contained"
                      className={classes.button}
                      startIcon={<DeleteIcon />}
                      onClick={(e) => productDelete(e,product)}
                    >
                      BORRAR
                    </ColorButton>
                  </Grid>
                </Grid>
                <Grid item xs container direction="column" spacing={2}>
                  <Grid item xs>
                    <Typography gutterBottom variant="subtitle1">
                      <h3>Price</h3>
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      <label>
                        <strong>$</strong>
                        {prices && prices[product.id]}
                      </label>
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          ))}

        <Grid item >
          <div className = 'shopping_vaciar'>
            {cart && cart.orderList && <ColorButton
              variant="contained"
              className={classes.button}
              startIcon={<DeleteIcon />}
              onClick={emptyCarrito}
            >
              VACIAR CARRITO
            </ColorButton>}

          </div>
          
        </Grid>
      </div>
    </div>
    
  );
};

export default ShoppingCart;
