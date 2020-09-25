import { GET_CARTG } from '../consts/actionTypes'
import axios from 'axios'


export default function agregarAlCarrito(newData,id) {
    return function (dispatch) {
        return  axios({
            method: 'POST',
            url: `http://localhost:3001/users/${id}/cart`,
            data: {
                product: newData
            }
        }).then(res => {
            dispatch({
                type: GET_CARTG,
                payload: res.data
            })
        })      
        .catch((err) => {
            console.log(err)
        })
    }
}

