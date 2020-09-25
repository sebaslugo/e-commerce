import React, { useState, useEffect } from 'react';
import { Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox, Link, Grid, Box, LockOutlinedIcon, Typography } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { yellow, purple, grey } from '@material-ui/core/colors';
import { useDispatch, useSelector } from 'react-redux';
import { getEmail } from '../../redux/actions/forgotPassword';
import { Select } from 'semantic-ui-react'
import LockIcon from '@material-ui/icons/Lock';
import Swal from 'sweetalert2'

const rolOptions = [
    { key: 'user', value: 'user', text: 'Usuario' },
    { key: 'user', value: 'admin', text: 'Administrador' },
]

const ColorButton = withStyles((theme) => ({
    root: {
        color: theme.palette.getContrastText(purple[500]),
        backgroundColor: grey[900],
        '&:hover': {
            color: grey[900],
            backgroundColor: yellow[500],
        },
    },
}))(Button);

const greyHenry = grey[900]

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Henry Store
      </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    paper: {
        // backgroundColor: grey,
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: greyHenry,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function CreateUser() {
    const dispatch = useDispatch();
    const content = useSelector(state => state)

    const classes = useStyles();
    const [datos, setDatos] = useState({
        email: '',
    })

    const handleInputChange = (event, value) => {
        // console.log(event.target.name)
        // console.log(event.target.value)        
        if (value) {
            let rol = value.value;
            setDatos({
                ...datos,
                rol
            })
        }
        if (event.target.name) {
            setDatos({
                ...datos,
                [event.target.name]: event.target.value
            })
        }

        // console.log(event)
    }

    const enviarDatos = (event) => {
        event.preventDefault()
        console.log(datos)
        if (datos.email) {
            dispatch(getEmail(datos))
        }
        else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Por favor, indique un mail válido',
            })
        }

    }

    return (
        <Container component="main" maxWidth="xs" >
            <CssBaseline />
            <div className={classes.paper}>
                <LockIcon style={{ fontSize: 40 }} />
                <Typography style={{ color: "black" }} component="h1" variant="h5">
                    ¿Olvidaste tu contraseña?
                </Typography>
                &nbsp;
                <Typography>
                    Ingresa tu correo electrónico con el que te diste de alta.
                    </Typography>

                <Typography>
                    Te enviaremos un link para recuperar tu clave.
                    </Typography>
                <form className={classes.form} onSubmit={enviarDatos} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                onChange={handleInputChange}
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email"
                                name="email"
                                autoComplete="email"
                            />
                        </Grid>

                        {/* <Grid item xs={12}>
                            <FormControlLabel
                                control={<Checkbox value="allowExtraEmails" color="primary" />}
                                label="I want to receive inspiration, marketing promotions and updates via email."
                            />
                        </Grid> */}
                    </Grid>
                    <ColorButton
                        type="submit"
                        fullWidth
                        variant="contained"
                        // color="primary"
                        className={classes.submit}
                    >
                        Enviar correo
          </ColorButton>
                    <Grid container justify="flex-end">
                    </Grid>
                </form>
            </div>
            <Box mt={5}>
                <Copyright />
            </Box>
        </Container>
    );
}