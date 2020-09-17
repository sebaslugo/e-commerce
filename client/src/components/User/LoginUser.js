import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
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
    const classes = useStyles();
    const [state, setState] = useState({
        email: "",
        password: ""
    })
    const dispatch = useDispatch();
    
    
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
        console.log(data.loginUser)
    })
    // console.log("este es el dataStore del loginUser ", dataStore)
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(e)
        if (state.email && state.password) {
            console.log(state)
            dispatch(loginUser(state))
        } else {
            alert("Debes completar todos los campos")
        }
    }
    return (
        <form onSubmit={handleSubmit} >
            <Grid container component="main" className={classes.root}>
                <CssBaseline />
                <Grid item xs={false} sm={4} md={7} className={classes.image} />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <div className={classes.paper}>
                        <Avatar className={classes.avatar}>
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <form className={classes.form} noValidate>
                            <TextField
                                onChange={handleInputChange}
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                            />
                            <TextField
                                onChange={handleInputChange}
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Remember me"
                            />
                            <ColorButton
                                type="submit"
                                fullWidth
                                variant="contained"
                                className={classes.submit}
                            >
                                Sign In
                            </ColorButton>
                            <Grid container>
                                <Grid item xs>
                                    <Link href="#" variant="body2">
                                        Olvidaste tu contraseña?
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link href="/Login/createuser" variant="body2">
                                        {"No tienes cuenta? registrate"}
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