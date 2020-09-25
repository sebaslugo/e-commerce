import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import Custom from './Custom'
import IconButton from '@material-ui/core/IconButton';

function Copyright() {
    return (
        <Typography variant="body2" color="#fafafa">
            {'Copyright © '}
            <Link color="#fafafa" href="https://www.soyhenry.com/">
                HenryStore
      </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '200vh',
    },
    footer: {
        display: "flex",
        justifyContent: "center",
        color: '#ffffff',
        padding: theme.spacing(4, 2),
        marginTop: 'auto',
        backgroundColor: "#000000",
    },
    contenedor: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        // width: "25%"
    },
    contenedor: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    },
    facebook: {
        color: '#fafafa',
        '&:hover': {
            color: '#0778E9'
        },
    },
    instagram: {
        color: '#fafafa',
        '&:hover': {
            color: '#D92E6C'
            // color: '#F28249'
        },
    },
    linkedin: {
        color: '#fafafa',
        '&:hover': {
            color: '#0077B5'
        },
    },
    link: {
        color: '#fafafa'
    },
}));

export default function Footer() {
    const classes = useStyles();
    const preventDefault = (event) => event.preventDefault();

    return (
        <div>
            <footer className={classes.footer}>
                <Container maxWidth="sm" className={classes.contenedor}>
                    {/* <Typography variant="h6" widht="100%">Nuestras Redes</Typography> */}
                    <Container>
                        <IconButton href="https://www.instagram.com/soyhenry_ok/" className={classes.instagram} >
                            <InstagramIcon style={{ fontSize: 50 }} />
                        </IconButton>
                        <IconButton href="https://www.facebook.com/HENRY-108437840594440/" className={classes.facebook}>
                            <FacebookIcon style={{ fontSize: 50 }} />
                        </IconButton>
                        <IconButton href="https://www.linkedin.com/school/soyhenry/" className={classes.linkedin}>
                            <LinkedInIcon style={{ fontSize: 50 }} />
                        </IconButton>
                    </Container>
                </Container>


                <Container maxWidth="sm" className={classes.contenedor}>
                    <Typography variant="h5">Newsletter</Typography>
                    <Typography variant="body1">Informate de lo último en HenryStore.</Typography>
                    <Custom />
                </Container>


                <Container maxWidth="sm" className={classes.contenedor}>
                    <Typography variant="h5">Created By</Typography>
                    <Typography variant="body2" >
                        <Link href="https://www.linkedin.com/in/david-alvarez-0179651b3/" color="inherit">
                            David Alvarez
                        </Link>
                    </Typography>
                    <Typography variant="body2" >
                        <Link href="https://www.linkedin.com/in/manuel-de-la-torre-928b45152/" onClick={preventDefault} color="inherit">
                            Manuel de la Torre
                        </Link>
                    </Typography>
                    <Typography variant="body2">
                        <Link href="https://www.linkedin.com/in/ariel-lizarraga-35871b1b0/" color="inherit">
                            Ariel Lizarraga
                        </Link>
                    </Typography>
                    <Typography variant="body2" >
                        <Link href="https://www.linkedin.com/in/jhoan-sebastian-lugo-ruiz-8577b01b6/" color="inherit">
                            Jhoan Sebastian Lugo
                        </Link>
                    </Typography>
                    <Typography variant="body2" >
                        <Link href="https://www.linkedin.com/in/tomas-maldonado-668b251b1/" color="inherit">
                            Tomas Maldonado
                        </Link>
                    </Typography>
                    <Typography variant="body2" >
                        <Link href="https://www.linkedin.com/in/pablo-misael-peloc-b37884133/" color="inherit">
                            Pablo Misael Peloc
                        </Link>
                    </Typography>
                </Container>


                <Container maxWidth="sm" className={classes.contenedor}>
                    <Typography variant="body1">Hecho con 💛 por alumnos de Henry.</Typography>
                    <Copyright />
                </Container>
            </footer>
        </div >
    );
}