/* ------------------------------------------------------------------------------- */
/* ACTIONS CREATORS */
/* ------------------------------------------------------------------------------- */

import axios from 'axios'

import { SEARCH_PRODUCT } from '../consts/actionTypes';

export function searchProducts(query) {
    return dispatch => {        
        axios.get(`http://localhost:3001/search/?s=${query}`)
            .then(res =>
                dispatch({
                    type: SEARCH_PRODUCT,
                    payload: res.data
                })
            );
    };
}