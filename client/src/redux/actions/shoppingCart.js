import axios from 'axios';
import { GET_CART,EDIT_ORDEN } from '../consts/actionTypes'

export function fetchProductsFromCart(userId) {
    return dispatch => {
        axios.get(`http://localhost:3001/users/${userId}/cart`)
            .then(res => {
                dispatch({
                    type: GET_CART,
                    payload: res.data
                })
            })


    }

}


export function EmptyCart(userId) {
    return dispatch => {
        axios.delete(`http://localhost:3001/users/${userId}/cart`)
            .then(res =>
                alert("Se vacio el carrito")
            );
    }
}


export function editCantidad (id,data) {

    return function(dispatch) {    
        return axios({
            method: 'PUT',
            url: `http://localhost:3001/users/${id}/cart`,
            data: data
        })
        .catch(err => alert(err))
          
    };
    

}

export function editOrden (id,data) {

    return function(dispatch) {    
        return axios({
            method: 'PUT',
            url: `http://localhost:3001/orders/${id}`,
            data: data

            
        }).then((res) => {
            dispatch({
                type: EDIT_ORDEN,
                payload: res.data
            })
        })
        .then(() => alert('se creo la compra'))
        .catch(err => alert(err))
          
    };
    

}

export function deleteProduct(userId,productId,orderId) {
    return dispatch => {
        return axios({
            method: 'DELETE',
            url: `http://localhost:3001/users/${userId}/cart/${productId}`,
            data: {orderId:orderId}
        })
        .catch(err => console.log(err))
            
    }
}