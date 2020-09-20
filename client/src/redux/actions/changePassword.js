import { PUT_PASSWORD } from '../consts/actionTypes';
import axios from 'axios'

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
                alert("Se ha cambiado la contraseña");
                window.location.assign("http://localhost:3000/")
            })
            .catch(() => alert("Los datos del Usuario no concuerdan con un usuario existente...vuelva a intentarlo"))
    }
}
