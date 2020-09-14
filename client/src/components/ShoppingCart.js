import React, { useState, useEffect } from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import { grey, red, yellow } from '@material-ui/core/colors/';
import store from '../redux/store/index'
import { fetchProductsFromCart, EmptyCart } from '../redux/actions/shoppingCart';
import { useDispatch } from 'react-redux'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';





const black = grey[900];

const ColorButton = withStyles((theme) => ({
    root: {
        color: yellow[500],
        backgroundColor: grey[900],
        '&:hover': {
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
        margin: 'auto',
        maxWidth: 1000,
    },
    image: {
        width: 128,
        height: 170,
    },
    img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    },
}));

const ShoppingCart = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = useState(null);
    const [cart, setCart] = useState([]);
    const id = document.URL.split("/").pop()



    useEffect(() => {
        dispatch(fetchProductsFromCart(id));
        store.subscribe(() => setCart(() => store.getState().shoppingCart.data.products))
    }, []);



    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const emptyCarrito = () => {
        dispatch(EmptyCart(id));

    }





    return (

        <div className={classes.root}>
            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                OPCIONES
      </Button>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleClose}>INICIO</MenuItem>
                <MenuItem onClick={emptyCarrito}>VACIAR CARRITO</MenuItem>
            </Menu>
            {cart && cart.length > 0 && cart.map(cart => (<Paper className={classes.paper}>
                <Grid container spacing={2}>
                    <Grid item>
                        <ButtonBase className={classes.image}>
                            <img className={classes.img} alt="complex" src={`http://localhost:3001/${cart.imagenes[0]}`} />
                        </ButtonBase>
                    </Grid>
                    <Grid item xs={12} sm container>
                        <Grid item xs container direction="column" spacing={2}>
                            <Grid item xs>
                                <Typography gutterBottom variant="subtitle1">
                                    <h1>{cart.name}</h1>
                                </Typography>

                                <Typography variant="body2" gutterBottom>
                                    <h6>{cart.description}</h6>
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    <p style={{ fontWeight: "bold" }}>{cart.price}</p>
                                </Typography>
                            </Grid>
                            {/* <Grid item>
                                <ColorButton
                                    variant="contained"
                                    className={classes.button}
                                    startIcon={<DeleteIcon />}
                                >
                                    BORRAR
                                 </ColorButton>

                            </Grid> */}
                        </Grid>
                        <Grid item>
                            <Typography variant="subtitle1">X</Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>))}

        </div >
    );
}

export default ShoppingCart;