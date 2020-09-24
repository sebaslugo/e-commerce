import React from 'react';
import { Card, Typography, CardContent } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    root: {
        textAlign: 'center',
        background: 'linear-gradient(315deg, #fbb034 0%, #ffdd00 74%)'
    },
    texto: {
        fontSize: 18,
        color: 'black'
    },
    titulo: {
        fontWeight: 'bold',
        fontSize: 20,
        color: 'black'
    }
}));

const Cards = (props) => {
    const classes = useStyles();
    return (
        <Card className={classes.root}>
            <CardContent>
                <Typography className={classes.titulo}>
                {props.titulo}
                </Typography>
                <Typography className={classes.texto}>
                {props.texto}
                </Typography>
            </CardContent>
        </Card>
    )
}

export default Cards;