import { PUT_PASSWORD } from '../consts/actionTypes';
import axios from 'axios'
import Swal from 'sweetalert2'

export function putPassword(token, password) {
    return function (dispatch) {
        axios({
            method: 'POST',
            url: `http://localhost:3001/users/reset/${token}`,
            data: {
                password: password,
            }
        })
            .then(res => {

                dispatch({
                    type: PUT_PASSWORD,
                    payload: res.data
                })
                return res;
            })
            .then(res => {
                Swal.fire(
                    'Aviso',
                    'Se ha cambiado la contraseña correctamente',
                    'success'
                )
                window.location.assign("http://localhost:3000/")
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
