import React, { useEffect,useState } from 'react';
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { getUser } from '../../redux/actions/menuLogIn';

export const CheckUser = () => {
    const dispatch = useDispatch()
    const { id, token } = useParams();

    useEffect(() => {

        dispatch(getUser()) 
        localStorage.setItem('idUser', id);
        localStorage.setItem('token', token);
        window.location.reload()
        if(id){
            window.location.assign("http://localhost:3000/");
        }
        
    })
    
    return (
        <div>
            Redirigiendo...
        </div>
    )
}

export default CheckUser;