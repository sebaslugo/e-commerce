import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles, } from '@material-ui/core/styles';
import { yellow, purple, grey } from '@material-ui/core/colors';
import { withStyles } from '@material-ui/core/styles';
import { loginUser } from '../../redux/actions/loginUser.js'
import { CgGoogle } from 'react-icons/cg';
import { AiFillGithub } from 'react-icons/ai';
import './LoginUser.css';


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

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
      </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const greyHenry = grey[900]
const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',

    },
    image: {
        backgroundImage: 'url(https://source.unsplash.com/collection/1203900)',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8, 4),
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
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function UserLogin() {
    const dispatch = useDispatch();
    const classes = useStyles();

    const [state, setState] = useState({
        email: "",
        password: "",
    })
    const [errors, setErrors] = useState({});


    const handleInputChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })

        console.log(state)

    }
    const dataStore = useSelector(data => {
        data.loginUser = {
            token: state.password
        }
    })

    const validate = (state) => {
        let errors = {};
        if (!state.email) {
            errors.email = 'Por favor, introduzca un email';
        } else if (!state.email.includes("@")) {
            errors.email = 'Por favor, introduzca un formato de email valido';
        }

        if (!state.password) {
            errors.password = 'Por favor, introduzca una contraseña';

        }
        return errors;

    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors(validate({
            ...state,
            [e.target.name]: e.target.value
        }));
        console.log(e)
        if (state.email && state.password) {
            console.log(state)
            dispatch(loginUser(state))
        }
    }
    return (
        <form onSubmit={handleSubmit} >
            <Grid container component="main" className={classes.root}>
                <CssBaseline />
                <Grid item xs={false} sm={4} md={7} className={classes.image} />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <div className={classes.paper}>
                        <div className={"circle"}>
                            <img src="https://downloads.intercomcdn.com/i/o/223280/9d3a2ca7768cd9b5174f2bf0/e913a6773f7911dcc0e1a3e82d200231.png" alt="" style={{ maxHeight: 35, position: "relative", left: 11, top: 12 }}></img>
                        </div>
                        <Typography style={{ color: "black" }} component="h1" variant="h5">
                            Accedé a tu cuenta
                        </Typography>
                        <form className={classes.form} noValidate>
                            <TextField
                                onChange={handleInputChange}
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Dirección de email"
                                name="email"
                                autoComplete="email"
                                autoFocus
                            />
                            {errors.email && (
                                <p style={{ color: "red" }}>{errors.email}</p>
                            )}
                            <TextField
                                onChange={handleInputChange}
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Contraseña"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                            {errors.password && (
                                <p style={{ color: "red" }}>{errors.password}</p>
                            )}
                            {/* <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Recuérdame"
                            /> */}
                            <ColorButton
                                type="submit"
                                fullWidth
                                variant="contained"
                                className={classes.submit}
                            >
                                INGRESAR
                            </ColorButton>

                            <Link href="http://localhost:3001/auth/google" style={{ textDecoration: 'none' }}>
                                <ColorButton
                                    fullWidth
                                    variant="contained"
                                    className={classes.submit}
                                >
                                    <CgGoogle className="iconGoogle" />
                                    Ingresar con Google

                                </ColorButton>

                            </Link>
                            <Link href="http://localhost:3001/auth/github" style={{ textDecoration: 'none' }}>
                                <ColorButton
                                    fullWidth
                                    variant="contained"
                                    className={classes.submit}
                                >
                                    <AiFillGithub className="iconGithub" />
                                    Ingresar con GitHub
                                </ColorButton>
                            </Link>
                            <Grid container>
                                <Grid item xs>
                                    <Link href="/login/forgot" variant="body2">
                                        Olvidé mi contraseña
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link href="/Login/createuser" variant="body2">
                                        {"¿No tienes cuenta? registrate"}
                                    </Link>
                                </Grid>
                            </Grid>
                            <Box mt={5}>
                                <Copyright />
                            </Box>
                        </form>
                    </div>
                </Grid>
            </Grid>
        </form>
    );
}