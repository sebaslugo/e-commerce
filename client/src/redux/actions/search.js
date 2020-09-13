/* ------------------------------------------------------------------------------- */
/* ACTIONS CREATORS */
/* ------------------------------------------------------------------------------- */

import axios from 'axios'

import { SEARCH_PRODUCT } from '../consts/actionTypes';

export function searchProduct(request) {
    return {
        type: SEARCH_PRODUCT,
        results: request
    }
}

export function axiosSearchProduct(query) {
    return dispatch => {
        dispatch(searchProduct())
        axios.get(`http://localhost:3001/search/?s=${query}`)
            .then(res =>
                dispatch({
                    type: SEARCH_PRODUCT,
                    payload: res.data
                })
            );
    };
}