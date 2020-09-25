import { CREATE_USER } from '../consts/actionTypes.js';
import axios from 'axios'
import Swal from 'sweetalert2'

export function postCreateUser(newData) {
    return function (dispatch) {
        return axios({
            method: 'POST',
            url: `http://localhost:3001/users`,

            data: {
                name: newData.firstName,
                lastName: newData.lastName,
                email: newData.email,
                password: newData.password,
            }

        })
            .then(res => {
                dispatch({
                    type: CREATE_USER,
                    payload: res.data
                })
                return res
            }

            ).then((res) => {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Se creo la cuenta correctamente',
                    showConfirmButton: false,
                    timer: 1500
                })
                console.log(res)
                window.location.assign("http://localhost:3000/login/loginuser")
            })
            .catch(() => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'El mail ingresado ya tiene cuenta creada',
                })
            }
            )
    };

}

