import { AGREGAR_AL_CARRITO } from '../consts/actionTypes'
import axios from 'axios'


export default function agregarAlCarrito(newData,id) {
    return function (dispatch) {
        console.log(newData)
        return axios({
            method: 'POST',
            url: `http://localhost:3001/users/${id}/cart`,//cambiarle el id del user en caso de ser necesario
            data: {
                product: newData
            }
        }).then((response) => {
            dispatch({ type: AGREGAR_AL_CARRITO, payload: response.data })
        })           
        .catch((err) => {
            console.log(err)
        })
    }
}

