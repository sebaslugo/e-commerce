import React, { useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Typography from '@material-ui/core/Typography';
import AddressForm from './AdressForm';
import PaymentForm from './PaymentForm';
import Review from './ReviewCheckout';
import store from '../../redux/store/index';
import { useDispatch } from 'react-redux'
import { clearStep } from '../../redux/actions/checkout'



const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
    },
    layout: {
        width: 'auto',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
            width: 600,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
        backgroundColor: "yellow",
    },
    paper: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
        marginTop: theme.spacing(6),
        marginBottom: theme.spacing(6),
        padding: theme.spacing(3),
        },
    },
    stepper: {
        padding: theme.spacing(3, 0, 5),
    },
    buttons: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    button: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(1),
    },
    saludo: {
        color: "black",
    }
}));

const steps = ['Direccion de envio', 'Detalles de pago', 'Resumen de pago'];

function getStepContent(step) {
    switch (step) {
        case 0:
        return <AddressForm />;
        case 1:
        return <PaymentForm />;
        case 2:
        return <Review />;
        default:
        throw new Error('Unknown step');
    }
}

export default function Checkout() {
    // if(!carrito){
    //     alert("Para acceder al modo de compra debes elegir un producto primero")
    //     window.location.assign("http://localhost:3000/")
    // }
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(clearStep())
    }, [])

    store.subscribe(() => setActiveStep(() => store.getState().step.data))

    return (
        <React.Fragment>
        <CssBaseline />
        <AppBar position="absolute" color="default" className={classes.appBar}>
        </AppBar>
        <main className={classes.layout}>
            <Paper className={classes.paper}>
            <Typography component="h1" variant="h4" align="center">
                Checkout
            </Typography>
            <Stepper activeStep={activeStep} className={classes.stepper}>
                {steps.map((label) => (
                <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                </Step>
                ))}
            </Stepper>
            <React.Fragment>
                {activeStep === steps.length ? (
                <React.Fragment>
                    <Typography variant="h5" gutterBottom className={classes.saludo}>
                    Los datos de la compra han sido enviados a su cuenta
                    </Typography>
                    <Typography variant="h5" gutterBottom className={classes.saludo}>
                    Gracias por su compra!.
                    </Typography>
                </React.Fragment>
                ) : (
                <React.Fragment>
                    {getStepContent(activeStep)}
                </React.Fragment>
                )}
            </React.Fragment>
            </Paper>
        </main>
        </React.Fragment>
    );
}