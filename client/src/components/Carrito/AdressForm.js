import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux'
import store from '../../redux/store/index'
import { userPurchaseData } from '../../redux/actions/checkout'
import { nextStep } from '../../redux/actions/checkout'
import Swal from 'sweetalert2'

const useStyles = makeStyles((theme) => ({
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
  contenedor: {
    backgroundColor: "black",
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  }
}))

export default function AddressForm() {
  const classes = useStyles();
  const dispatch = useDispatch()
  const [permiso, setPermiso] = useState(false)
  const [state, setState] = useState({
    nombre: "",
    apellido: "",
    direccion: "",
    ciudad: "",
    provincia: "",
    cPostal: "",
    barrio: "",
    email: ""
  })


  useEffect(() => {
    store.subscribe(() => store.getState().shoppingCart.data)
    //store.subscribe(() => store.getState().shoppingCart.data? setPermiso(true)
    //: 
    //                Swal.fire({
    //                icon: 'error',
    //                title: 'Oops...',
    //                text: 'Debes agregar productos si quieres entrar a la forma de pago',
    //            }),
    //window.location.assign("http:localhost:3000/")
    //)

  }, [])
  
  const handleInputChange = (e) => {
    e.preventDefault();
    setState({
      ...state,
      [e.target.name]: e.target.value
    })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    if (state.nombre && state.apellido && state.direccion && state.ciudad && state.provincia && state.cPostal && state.barrio && state.email) {
      dispatch(userPurchaseData(state));
      dispatch(nextStep(store.getState().step.data + 1))
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Campos incompletos',
        text: 'Debes completar todos los campos',
      })
    }
  }
  return (
    <div >
      <React.Fragment >
        <Typography variant="h6" gutterBottom>
          Direccion de envio
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              placeholder="nombre"
              id="firstName"
              name="nombre"
              label="nombre"
              fullWidth
              autoComplete="given-name"
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              placeholder="apellido"
              id="lastName"
              name="apellido"
              label="apellido"
              fullWidth
              autoComplete="family-name"
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              required
              id="cvv"
              name="email"
              label="email"
              fullWidth
              autoComplete="cc-email"
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              required
              id="address1"
              name="direccion"
              label="direccion"
              fullWidth
              autoComplete="shipping address-line1"
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="city"
              name="ciudad"
              label="ciudad"
              fullWidth
              autoComplete="shipping address-level2"
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField id="state" name="provincia" label="Estado/Provincia/Region" fullWidth onChange={handleInputChange} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="zip"
              name="cPostal"
              label="codigo postal"
              fullWidth
              autoComplete="shipping postal-code"
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="country"
              name="barrio"
              label="barrio"
              fullWidth
              autoComplete="shipping country"
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <div className={classes.buttons}>
              <Button
                variant="contained"
                // color="yellow"
                onClick={handleSubmit}
                className={classes.button}
              >
                Siguiente
            </Button>
            </div>
          </Grid>
        </Grid>
      </React.Fragment>
    </div>
  )
}