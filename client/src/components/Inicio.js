import React, { useState, useEffect } from "react";
import { config, Spring } from 'react-spring/renderprops'
import './Inicio.css'
import { Button } from 'semantic-ui-react'
import logoStore from '../imagenes/store.png'
import { Link } from "react-router-dom";
import { animateScroll as scroll } from 'react-scroll';


function Inicio() {

    const onClickDown = () => {
        scroll.scrollTo(700);
    }

    return (
        <div className="inicio_intro">
            <Spring
                config={config.default}
                from={{ opacity: 0 }}
                to={{ opacity: 1 }}>
                {props =>
                    <div style={props}>
                        <img
                            className='inicio_logo'
                            src="data:image/png;base64,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"
                            alt="Henry Store">
                        </img>
                    </div>}
            </Spring>
            <Spring
                config={config.default}
                from={{ opacity: 0 }}
                to={{ opacity: 1 }}>
                {props =>
                    <div style={props}>
                        <img
                            className='inicio_logoStore'
                            src={logoStore}
                            alt="Henry Store">
                        </img>
                    </div>}
            </Spring>
            <Spring
                config={config.default}
                from={{ opacity: 0 }}
                to={{ opacity: 1 }}>
                {props =>
                    <div className="inicio_boton" style={props}>
                        <Link to='/products'>
                            <Button onClick={onClickDown} size='large' inverted color='yellow'>
                                Tienda
                        </Button>
                        </Link>
                    </div>}
            </Spring>
        </div>

    )
}

export default Inicio

