import axios from 'axios';
import { GET_USERS, PROMOTE_USER, DELETE_USER } from '../consts/actionTypes';
import Swal from 'sweetalert2'

export function getUsers() {
    return function (dispatch) {
        return axios({
            method: 'GET',
            url: `http://localhost:3001/users`,
        })
            .then(res => {
                console.log('Test getUsers: ', res)
                dispatch({
                    type: GET_USERS,
                    payload: res.data
                })
            }
            );
    };
}

export function promoteUser(userId) {
    return function (dispatch) {
        return axios({
            method: 'POST',
            url: `http://localhost:3001/auth/promote/${userId}`
        }).then(res => {
            dispatch({
                type: PROMOTE_USER,
                payload: res.data
            });
            Swal.fire({
                icon: 'success',
                title: 'Promocion',
                text: `Usuario promovido a Administrador correctamente`,
            })
        })
            .catch(err => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: `${err}`,
                })
            })
    };
}

export function deleteUser(userId) {
    return function (dispatch) {
        return axios({
            method: 'DELETE',
            url: `http://localhost:3001/users/${userId}`
        }).then(() => {
            dispatch({
                type: DELETE_USER,
                payload: userId
            })
        })
            .catch(err => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...Ha ocurrido un error',
                    text: `Recarga la pagina para poder eliminarlo`,
                })
            })
    };
}