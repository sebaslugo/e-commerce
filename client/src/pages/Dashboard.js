import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import AssignmentIcon from '@material-ui/icons/Assignment';
import CategoryIcon from '@material-ui/icons/Category';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import Navbar from '../components/Admin/AdminPanel/Navbar';
import CardsHeader from '../components/Admin/AdminPanel/CardsHeader';
import Cards from '../components/Admin/AdminPanel/Cards';
import Graphics from '../components/Admin/AdminPanel/Graphics';
import TableMaterial from '../components/Admin/AdminPanel/TableMaterial';
import GraphicsDona from '../components/Admin/AdminPanel/GraphicsDona';
import GraphicsDonaDyn from '../components/Admin/AdminPanel/GraphicsDonaDyn';
import GraphicsPie from '../components/Admin/AdminPanel/GraphicsPie';
import '../assets/css/Dashboard.css';

const useStyles = makeStyles(() => ({
    root: {
        flexGrow: 1
    },
    iconos: {
        color: 'black',
        fontSize: '90px'
    },
    container: {
        paddingTop: '40px',
        alignItems: 'center'
    },
    containerCards: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around'
    },
    containerGrafica: {
        marginTop: '40px'
    },
    containerTabla: {
        marginTop: '40px'
    },
    title: {
        textAlign: 'center',
        fontSize: 18
    }
}));

const data = [
    {
        id:1,
        video: "Remera para varones, estilo moderno y de excelente calidad. Disponibles todos los talles.",
        fecha: "6 de sep. 2020",
        visualizaciones: 32,
        imagen: require("../assets/img/01.jpg"),
    },
    {
        id:2,
        video: "Barbijo oficial de Henry con Sistema de Doble Protección. Ideal para lavar a mano o en lavarropas.",
        fecha: "5 de sep. 2020",
        visualizaciones: 31,
        imagen: require("../assets/img/03.jpg"),
    },
    {
        id:3,
        video: "Remera para mujeres, estilo moderno y de excelente calidad. Disponibles solo en color Negro y Amarrillo.",
        fecha: "4 de sep. 2020",
        visualizaciones: 21,
        imagen: require("../assets/img/02.jpg"),
    },
];

function Dashboard(props) {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Navbar />
                </Grid>
                <Grid item xs={12} sm={4} md={4} lg={4} xl={4} className="grow">
                    <Link href="http://localhost:3000/admin/products" style={{ textDecoration: 'none' }}>                        
                        <CardsHeader icono={<AssignmentIcon className={classes.iconos} />} titulo="PRODUCTOS" texto="Administre todos sus productos (Alta, Baja y Modificación)" color="linear-gradient(315deg, #fbb034 0%, #ffdd00 74%)" font="black"/>                        
                    </Link>
                </Grid>
                <Grid item xs={12} sm={4} md={4} lg={4} xl={4} className="grow">
                    <Link href="http://localhost:3000/admin/categories" style={{ textDecoration: 'none' }}>                        
                        <CardsHeader icono={<CategoryIcon className={classes.iconos} />} titulo="CATEGORÍAS" texto="Administre todas sus categorías  (Alta, Baja y Modificación)" color="linear-gradient(315deg, #fbb034 0%, #ffdd00 74%)" font="black"/>                        
                    </Link>
                </Grid>
                <Grid item xs={12} sm={4} md={4} lg={4} xl={4} className="grow">
                    <Link href="http://localhost:3000/admin/orderlist" style={{ textDecoration: 'none' }}>
                        <CardsHeader icono={<AddShoppingCartIcon className={classes.iconos} />} titulo="ORDENES" texto="Administre todas sus ordenes  (Alta, Baja y Modificación)" color="linear-gradient(315deg, #fbb034 0%, #ffdd00 74%)" font="black"/>
                    </Link>
                </Grid>            
                <Grid item className={classes.containerCards} xs={12} sm={6} md={6} lg={6} xl={6}>
                    <Link href="http://localhost:3000/admin/users" style={{ textDecoration: 'none' }} className="grow">
                        <Cards titulo="PROMOVER A ADMINISTRADOR" texto="Convertir un Usuario a Administrador" />
                    </Link>
                    <Link href="http://localhost:3000/admin/users" style={{ textDecoration: 'none' }} className="grow">
                        <Cards titulo="CONSULTAR UN USUARIO" texto="Consulta la información de un Usuario" />
                    </Link>
                    <Link href="http://localhost:3000/admin/users" style={{ textDecoration: 'none' }} className="grow">
                        <Cards titulo="ELIMINAR UN USUARIO" texto="Eliminar a un usuario de Henry Store" />
                    </Link>                    
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6} xl={6} className={classes.containerGrafica}>
                    <Graphics />
                </Grid>
                <Grid item xs={12} sm={4} md={4} lg={4} xl={4} className="grow">
                    <Typography className={classes.title}>
                        TIPOS DE USUARIOS
                    </Typography>                    
                    <GraphicsDona />
                </Grid>
                <Grid item xs={12} sm={4} md={4} lg={4} xl={4} className="grow">
                    <Typography className={classes.title}>
                        LO MÁS VENDIDO
                    </Typography>
                    <GraphicsDonaDyn />
                </Grid>
                <Grid item xs={12} sm={4} md={4} lg={4} xl={4} className="grow">
                    <Typography className={classes.title}>
                        PRODUCTOS CON MAS REVIEWS
                    </Typography>
                    <GraphicsPie />
                </Grid>
                <Grid item xs={12} className={classes.containerTabla}>
                    <Typography className={classes.title}>
                        PRODUCTOS MÁS RECIENTES
                    </Typography>
                    <TableMaterial data={data}/>
                </Grid>
            </Grid>           
        </div>
    )
}

export default Dashboard;