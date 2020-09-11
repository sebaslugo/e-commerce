/* ------------------------------------------------------------------------------- */
/* ACTIONS CREATORS */
/* ------------------------------------------------------------------------------- */
import axios from 'axios';
import { GET_CATEGORY, DELETE_CATEGORY, CREATE_CATEGORY, EDIT_CATEGORY } from '../consts/actionTypes';


export function getCategories(request) {
    return {
        type: GET_CATEGORY,
        categories: request
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
            );
    };
}

export function delCategory(request) {
    return {
        type: DELETE_CATEGORY,
        categories: request
    }
}

export function deleteCategory(oldData) {
    return dispatch => {
        dispatch(delCategory())
        axios.delete(`http://localhost:3001/products/category/${oldData.id}`)
            .then(res =>
                dispatch({
                    type: DELETE_CATEGORY,
                    payload: res.data
                })
            );
    }
}

export function postCategories(request) {
    try {
        return {
            type: CREATE_CATEGORY,

            categories: request
        }
    } catch (err) {
        console.error(err.message);
    }
}

export function axiosPostCategories(newData) {    
    return dispatch => {        
        dispatch(postCategories())
        axios({
            method: 'POST',
            url: "http://localhost:3001/products/category",
            data: {
                name: newData.name
            }
        })
        .then(res => {
            dispatch({
                type: CREATE_CATEGORY,
                payload: res.data.name
            })
        }
        )
        .catch(err => console.error(err.message));
    };
}

export function putCategories(request) {
    return {
        type: EDIT_CATEGORY,
        categories: request
    }
}

export function axiosPutCategories(newData, oldData) {
    return dispatch => {    
        dispatch(putCategories());
        axios({
            method: 'PUT',
            url: `http://localhost:3001/products/category/${newData.id}`,
            data: {
                name: newData.name
            }
        })
        .then(res => {
            dispatch({
                type: EDIT_CATEGORY,
                payload: res.data.name
            })            
        }
        )
        .catch(err => console.error(err.message));
    };
}