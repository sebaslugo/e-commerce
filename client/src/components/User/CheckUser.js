import React from 'react';
import { useParams } from 'react-router-dom'

export const CheckUser = () => {

    const { id, token } = useParams();
    localStorage.setItem('idUser', id);
    localStorage.setItem('token', token);
    window.location.assign("http://localhost:3000/");
    return (
        <div>
            Redirigiendo...
        </div>
    )
}

export default CheckUser;