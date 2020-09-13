import axios from 'axios';
import { GET_ORDEN, GET_ORDERS } from '../consts/actionTypes';

export function getOrden(id) {
    return function(dispatch) {
        return axios.get(`http://localhost:3001/orders/${id}`)
        .then(res =>
            dispatch({
                type: GET_ORDEN,
                payload: res.data
            })
        );
          
    };
    
}



export function getOrders(request) {
    return function(dispatch) {
        return axios.get(`http://localhost:3001/orders`)
        .then(res => 
            dispatch({
                type: GET_ORDERS,
                payload: res.data
            })
        );
          
    };
}

