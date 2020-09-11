import axios from 'axios';
import { GET_ORDEN} from '../consts/actionTypes';

export function getOrden(request) {
    return {
        type: GET_ORDEN,
        categories: request
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