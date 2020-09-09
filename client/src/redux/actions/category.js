/* ------------------------------------------------------------------------------- */
/* ACTIONS CREATORS */
/* ------------------------------------------------------------------------------- */
import axios from 'axios';
import { GET_CATEGORY } from '../consts/actionTypes';

export function getCategories(request) {
    try {
        return {
            type: GET_CATEGORY,
            categories: request
        }
    } catch (err) {
        console.error(err.message);
    }
}

export function fetchCategories() {
    return dispatch => {
        dispatch(getCategories())
        axios.get("http://localhost:3001/products/category")
            .then(res =>
                dispatch({
                    type: GET_CATEGORY,
                    payload: res.data
                })
            )
            .catch(err => console.error(err.message));
    };    
}


export default fetchCategories;