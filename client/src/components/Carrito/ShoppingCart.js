import React, { useState, useEffect } from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import { grey, red, yellow } from '@material-ui/core/colors/';
import store from '../../redux/store/index'
import { fetchProductsFromCart, EmptyCart } from '../../redux/actions/shoppingCart';
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

let id=1 ;

const ShoppingCart = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = useState(null);
    const [cart, setCart] = useState({products:[]});
    const [quantities,setQuantity] = useState();
    const [prices,setPrices] = useState();
    const [active,setActive] = useState(true)




    useEffect(() => {
        let precios = {};
        let cantidades = {};
        if(id && active){
            dispatch(fetchProductsFromCart(id));
            store.subscribe(() => setCart(() => store.getState().shoppingCart.data))
            setActive(false);
        }
        else if(!id && active){
            try {
                const serializedState = JSON.parse(localStorage.getItem("carrito"));
                if (serializedState === null) console.log(undefined) ;
                setCart(serializedState);
                setActive(false)
                
              } catch (e) {
                console.log(e);
            }
        }
        if(!prices && !quantities && cart.orderList){
            
            console.log(cart.orderList);
            cart.orderList.map((order) => {
                precios={
                    ...precios,
                    [order.productId]:order.price
                }
                cantidades={
                    ...cantidades,
                    [order.productId]:order.quantity
                }                 
            })
            setQuantity(cantidades)
            setPrices(precios)

        }
        
    });
    //quantities = {1:2,2:4}
    // prices = {1:10.000,2:20.000}

    const onChange = (event,product) => {
        event.preventDefault();
        let quantity = event.target.value;
        let cant = quantities[product.id];
        console.log(quantity)
        if(quantity < 1){
            setQuantity({
              ...quantities,
              [product.id]:1

            })
        }
        else if(quantity <= product.stock){
            setPrices({
              ...prices,
              [product.id]:quantity * product.price});
              setQuantity({
                ...quantities,
                [product.id]:quantity < cant ? (cant-1) : (cant+1)
  
            })
            
        } 
        else{
          alert('No hay suficientes unidades del producto')
          setQuantity({
            ...quantities,
            [product.id]:product.stock

          })
        } 
    
    };

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
            {cart.products && cart.products.length > 0 && cart.products.map((product,index) => (
            <Paper key = {index} className={classes.paper}>
                <Grid container spacing={3}>
                    <Grid item xs container direction="column" spacing={2}>
                        <ButtonBase className={classes.image}>
                            <img className={classes.img} alt="complex" src={`http://localhost:3001/${product.imagenes[0]}`} />
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
                                    <p style={{ fontWeight: "bold" }}>{product.price}</p>
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
                                <input type='number'  name = {product.id} value={quantities && quantities[product.id]} onChange={(e) => onChange(e,product)}></input>
                            </Typography>
                        </Grid>
                        
                        <Grid item>
                            <ColorButton
                                variant="contained"
                                className={classes.button}
                                startIcon={<DeleteIcon />}
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
                                <label>{prices && prices[product.id]}</label>
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>))}

        </div >
    );
}

export default ShoppingCart;