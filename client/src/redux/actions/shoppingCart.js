import axios from 'axios';
import { GET_CART, ADD_CART, EMPTY_CART } from '../consts/actionTypes'

export function getProductsFromCart(request) {
    return {
        type: GET_CART,
        products: request

    }
}

export function fetchProductsFromCart(userId) {
    return dispatch => {
        dispatch(getProductsFromCart())
        // console.log(id)
        axios.get(`http://localhost:3001/users/${userId}/cart`)
            .then(res => {
                dispatch({
                    type: GET_CART,
                    payload: res.data
                })
            })


    }

}

export function axiosEmptyCart(request) {
    return {
        type: EMPTY_CART,
        categories: request
    }
}

export function EmptyCart(userId) {
    return dispatch => {
        dispatch(axiosEmptyCart())
        axios.delete(`http://localhost:3001/users/${userId}/cart`)
            .then(res =>
                dispatch({
                    type: EMPTY_CART,
                    payload: res.data
                }),
                alert("Se vacio el carrito")
            );
    }
}

export function axiosPostCart(request) {
    try {
        return {
            type: ADD_CART,

            categories: request
        }
    } catch (err) {
        console.error(err.message);
    }
}

export function PostCart(newData) {
    return dispatch => {
        dispatch(axiosPostCart())
        axios({
            method: 'POST',
            url: "http://localhost:3001/products/users/",
            data: {
                name: newData.name
            }
        })
            .then(res => {
                dispatch({
                    type: ADD_CART,
                    payload: res.data.name
                })
            }
            )
            .catch(err => console.error(err.message));
    };
}

