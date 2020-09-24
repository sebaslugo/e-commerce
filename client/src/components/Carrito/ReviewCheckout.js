import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import Button from '@material-ui/core/Button';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import store from '../../redux/store/index'
import { useDispatch } from "react-redux";
import { fetchProductsFromCart, editOrden } from "../../redux/actions/shoppingCart";
import { nextStep, backStep, createCheckout } from '../../redux/actions/checkout'


const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(1, 1),
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
    color: "yellow",
    backgroundColor: "black",
    "&:hover, &:focus": {
      backgroundColor: "yellow",
      color: "black"
    }
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  }
}));



export default function Review() {
  const [products, setProducts] = useState([])
  const [addresses, setAddresses] = useState([])
  const [payments, setPayments] = useState([])
  const [subtotal, setSubtotal] = useState()
  const [orderId, setOrderId] = useState()
  const classes = useStyles();
  const dispatch = useDispatch()
  var total = 0

  useEffect(() => {
    var id = localStorage.getItem("idUser")
    if (id) {
      dispatch(fetchProductsFromCart(id))
    }
    store.subscribe(() => {
      setOrderId(() => store.getState().shoppingCart.data.ordenId)
      setProducts(() => store.getState().shoppingCart.data.products)
      setAddresses(() => store.getState().userPurchaseData.data)
      setPayments(() => store.getState().userPaymentData.data)
      store.getState().shoppingCart.data.orderList && store.getState().shoppingCart.data.orderList.map(producto => { return total += producto.price })
      actualizarPrecio()
    })

  }, [])

  const handleSubmit = () => {
    dispatch(nextStep(store.getState().step.data + 1))
    let data = {
      userData: addresses,
      products: products,
    }
    dispatch(createCheckout(data))
    let carrito = {
      "status": "creada"
    }
    dispatch(editOrden(orderId, carrito))

  }

  const handleBack = () => {
    dispatch(backStep(store.getState().step.data - 1))
  };


  const actualizarPrecio = () => {
    setSubtotal(total)
  }
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Resumen de pago
      </Typography>
      <List >
        {products && products.map((product) => (
          <ListItem className={classes.listItem} key={product.name}>
            <ListItemText primary={product.name} secondary={product.desc} />

            <Typography variant="body2">total: ${product.price * product.orderList.quantity}</Typography>
          </ListItem>
        ))}
        <ListItem className={classes.listItem}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" className={classes.total}>
            ${subtotal}
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Envio a:
          </Typography>
          <Typography gutterBottom>{addresses.nombre} {addresses.apellido}</Typography>
          <Typography gutterBottom>{addresses.ciudad}, {addresses.provincia} {addresses.cPostal}</Typography>
          <Typography gutterBottom>Barrio {addresses.barrio} {addresses.direccion}</Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Detalles de forma de pago
          </Typography>
          <Grid container>
            <Typography gutterBottom>{payments.tTarjeta} {payments.nTarjeta}</Typography>
            <Typography gutterBottom>Expiracion: {payments.fExpiracion}</Typography>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <div className={classes.buttons}>
            <Button
              onClick={handleBack}
              variant="contained"
              color="primary"
              className={classes.button}>
              Atras
        </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              className={classes.button}
            >
              Listo
        </Button>
          </div>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
