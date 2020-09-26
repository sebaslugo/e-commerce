import { GET_USER, LOGOUT } from '../consts/actionTypes';
import axios from 'axios';
import Swal from 'sweetalert2'

export function getUser() {
    return function (dispatch) {
        return axios({
            method: 'GET',
            url: `http://localhost:3001/auth/me`,
        })

            .then((res) => {
                console.log(res.data.message)
                localStorage.setItem('idUser', res.data.user.id)
                localStorage.setItem('name', res.data.user.name)
                localStorage.setItem('lastName', res.data.user.lastName)
                localStorage.setItem('fullName', res.data.user.fullName)
                localStorage.setItem('rol', res.data.user.rol)
                localStorage.setItem('statusToken', res.data.message)
                localStorage.setItem('email', res.data.user.email)
            })
            .then((res) => {
                dispatch({
                    type: GET_USER,
                    payload: res.data
                })
                return res;
            })
            .catch(err => {
                if (err.message == "Cannot read property 'data' of undefined") {
                    return console.log('err:: ', err.message);
                }
                localStorage.setItem('statusToken', 'Token expirado.');
                console.error('detalle error:', err.message);
            })

    };

}

export function logOut() {
    return function (dispatch) {
        return axios({
            method: 'GET',
            url: `http://localhost:3001/auth/logout`,
        })

            .then((res) => {

                localStorage.clear()
                return res
            })
            .then((res) => {
                dispatch({
                    type: LOGOUT,
                    payload: res.data
                })
                return res;
            }).then(() =>
                window.location.assign('http://localhost:3000'))
            .catch(err => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: `${err}`,
                })
            })
    }
}
