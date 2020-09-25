import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, IconButton, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AssignmentIcon from '@material-ui/icons/Assignment';
import CategoryIcon from '@material-ui/icons/Category';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import HomeIcon from '@material-ui/icons/Home';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import 'fontsource-roboto';
import '../../../assets/css/Dashboard.css';

const useStyles = makeStyles(() => ({
    root: {
        flexGrow: 1
    },
    navapp: {
        background: 'linear-gradient(315deg, #fbb034 0%, #ffdd00 74%)'
    },
    menuButton: {
        marginRight: '16px'
    },
    title: {
        flexGrow: 1
    },
    imagen: {
        borderRadius: '50%'
    },
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    }
}));

const Navbar = (props) => {
    const classes = useStyles();
    const [state, setState] = useState({
        top: false,
        left: false,
        bottom: false,
        right: false
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return;
        }
        setState({ ...state, [anchor]: open });
    };

    const list = (anchor) => (
        <div
          className={clsx(classes.list, {
            [classes.fullList]: anchor === 'top' || anchor === 'bottom',
          })}
          role="presentation"
          onClick={toggleDrawer(anchor, false)}
          onKeyDown={toggleDrawer(anchor, false)}
        >
          <List>
            <Link to="/" style={{ textDecoration: 'none' }}>           
                <ListItem button>
                    <ListItemIcon><HomeIcon /></ListItemIcon>
                    <ListItemText primary="Inicio" />
                </ListItem>            
            </Link>
          </List>
          <Divider />
          <List>
            <Link to="/admin/products" style={{ textDecoration: 'none' }}>            
                <ListItem button>
                    <ListItemIcon><AssignmentIcon /></ListItemIcon>
                    <ListItemText primary="Productos" />
                </ListItem>
            </Link>
          </List>
          {/* <Divider /> */}
          <List>
            <Link to="/admin/categories" style={{ textDecoration: 'none' }}>              
                <ListItem button>
                    <ListItemIcon><CategoryIcon /></ListItemIcon>
                    <ListItemText primary="Categorías" />
                </ListItem>
            </Link>         
          </List>
          {/* <Divider /> */}
          <List>
            <Link to="/admin/orderlist" style={{ textDecoration: 'none' }}>            
                <ListItem button>
                    <ListItemIcon><AddShoppingCartIcon /></ListItemIcon>
                    <ListItemText primary="Ordenes" />
                </ListItem>
            </Link>           
          </List>
          {/* <Divider /> */}
          <List>
            <Link to="/admin/users" style={{ textDecoration: 'none' }}>           
                <ListItem button>
                    <ListItemIcon><PeopleAltIcon /></ListItemIcon>
                    <ListItemText primary="Usuarios" />
                </ListItem>
            </Link>
          </List>
          <Divider />
          <List>
            <a href="https://api.whatsapp.com/send?phone=543884799096&text=Hola,%20quisiera%20solicitar%20soporte%20t%C3%A9cnico%20en%20Henry%20Store,%20muchas%20gracias!" style={{ textDecoration: 'none' }}>         
                <ListItem button>
                    <ListItemIcon><WhatsAppIcon /></ListItemIcon>
                    <ListItemText primary="Soporte Técnico" />
                </ListItem>
            </a>
          </List>
        </div>
    );
    const anchor = 'left';
    return (
        <div className={classes.root}>
            <AppBar position="static" className={classes.navapp}>
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color='primary'>                                            
                        <Button onClick={toggleDrawer(anchor, true)}><MenuIcon /></Button>
                        <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
                            {list(anchor)}
                        </Drawer>
                    </IconButton>
                    <Typography variant="h6" className={classes.title} color='textPrimary'>
                        Panel de Administración
                    </Typography>
                    <IconButton color='inherit'>
                        <img src={require('../../../assets/img/branding.jpg')} alt="Logo" width="40px" height="40px" className={classes.imagen} />
                    </IconButton>
                </Toolbar>
            </AppBar>            
        </div>
    )
}

export default Navbar;