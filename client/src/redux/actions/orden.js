import axios from 'axios';
import { GET_ORDEN, GET_ORDERS } from '../consts/actionTypes';

export function getOrden(request) {
    return {
        type: GET_ORDEN,
        orders: request
    }
}

export function axiosOrden(id) {
    return dispatch => {
        dispatch(getOrden())
        axios.get(`http://localhost:3001/orders/${id}`)
            .then(res =>
                dispatch({
                    type: GET_ORDEN,
                    payload: res.data
                })
            );
    };
}

export function getOrders(request) {
    return {
        type: GET_ORDERS,
        orders: request
    }
}

export function axiosGetOrders() {
    return dispatch => {
        dispatch(getOrders());
        axios.get(`http://localhost:3001/orders`)
            .then(res => 
                dispatch({
                    type: GET_ORDERS,
                    payload: res.data
                })
            );
    };
}