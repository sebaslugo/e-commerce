import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { paymentForm } from '../../redux/actions/checkout'
import { useDispatch } from 'react-redux'
import store from '../../redux/store/index'
import { nextStep, backStep } from '../../redux/actions/checkout'
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
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  }
}))

export default function PaymentForm() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [state, setState] = useState({
    nTarjeta: "",
    CVV: "",
    fExpiracion: "",
    tTarjeta: "",

  })

  const handleInputChange = (e) => {
    e.preventDefault()
    setState({
      ...state,
      [e.target.name]: e.target.value
    })
  }

  const handleBack = () => {
    dispatch(backStep(store.getState().step.data - 1))
  };

  const handleSubmit = e => {
    e.preventDefault()
    if (state.nTarjeta && state.CVV && state.fExpiracion && state.tTarjeta) {
      dispatch(paymentForm(state));
      dispatch(nextStep(store.getState().step.data + 1))
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Debes completar todos los cambios',
      })
    }
  }
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Metodo de pago
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField required id="cardName" onChange={handleInputChange} name="tTarjeta" label="Tipo de tarjeta" fullWidth autoComplete="cc-name" />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cardNumber"
            name="nTarjeta"
            label="numero de tarjeta"
            fullWidth
            autoComplete="cc-number"
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField required id="expDate" onChange={handleInputChange} name="fExpiracion" label="fecha de expiracion" fullWidth autoComplete="cc-exp" />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cvv"
            name="CVV"
            label="CVV"
            helperText="Last three digits on signature strip"
            fullWidth
            autoComplete="cc-csc"
            onChange={handleInputChange}
          />
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
              Siguiente
        </Button>
          </div>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}