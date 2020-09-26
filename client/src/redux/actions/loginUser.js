import { LOGIN_USER } from '../consts/actionTypes.js';
import axios from 'axios'
import store from '../store/index'
import Swal from 'sweetalert2'

export function loginUser(loginData) {
    // console.log("esta es la data que llega al actions", loginData)
    return function (dispatch) {
        axios({
            method: 'POST',
            url: `http://localhost:3001/auth/login`,
            data: {
                email: loginData.email,
                password: loginData.password,
            }
        })
            .then(res => {
                dispatch({
                    type: LOGIN_USER,
                    payload: res.data
                })
                return res;
            })
            .then(res => {
                localStorage.setItem('token', res.data.token)
                localStorage.setItem('statusToken', 'Usted está autorizado correctamente!')
                window.location.assign("http://localhost:3000/checkuser/auth/login")
            })
            .catch(() => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Los datos ingresados son erroneos',
                })
            })
    }
}
