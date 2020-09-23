import { AGREGAR_AL_CARRITO } from '../consts/actionTypes'
import axios from 'axios'


export default function agregarAlCarrito(newData,id) {
    return function (dispatch) {
        return axios({
            method: 'POST',
            url: `http://localhost:3001/users/${id}/cart`,
            data: {
                product: newData
            }
        }).then((response) => {
            console.log(response)
            
        })           
        .catch((err) => {
            console.log(err)
        })
    }
}

