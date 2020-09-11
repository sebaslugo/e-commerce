import axios from 'axios';
import { GET_PRODUCT } from '../consts/actionTypes'

export function getProducts(request) {
    return {
        type: GET_PRODUCT,
        products: request

    }
}

export function fetchProducts(id) {
    return dispatch => {
        dispatch(getProducts())
        // console.log(id)
        axios.get(`http://localhost:3001/products/${id}`)
            .then(res => {
                dispatch({
                    type: GET_PRODUCT,
                    payload: res.data
                })
            })


    }

}