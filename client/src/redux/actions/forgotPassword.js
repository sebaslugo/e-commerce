import { GET_EMAIL } from '../consts/actionTypes';
import axios from 'axios'
import store from '../store/index'
import Swal from 'sweetalert2'

export function getEmail(loginData) {
    return function (dispatch) {
        console.log(loginData)
        axios({
            method: 'POST',
            url: `http://localhost:3001/users/forgot`,
            data: {
                email: loginData.email,
            }
        })
            .then(res => {
                localStorage.setItem("tokenforgot", res.data.token);
                return res;
            })
            // .then(res => localStorage.setItem('token', res.data.token))
            .then(res => {

                dispatch({
                    type: GET_EMAIL,
                    payload: res.data
                })
                Swal.fire({
                    icon: 'info',
                    title: 'Info Importante',
                    text: "Se ha enviado un email con instrucciones",
                })
            })
            .catch(() => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: "Los datos del Usuario no concuerdan con un usuario existente...vuelva a intentarlo",
                })
            })
    }
}
