import axios from 'axios';
import { GET_PRODUCT, GET_CATEGORY, DELETE_PRODUCT, EDIT_PRODUCT } from '../consts/actionTypes';
/*--------------------------------------------------------------------------------------- */
/*GET PRODUCTS */
/*--------------------------------------------------------------------------------------- */
export function getProducts(request) {
    return {
        type: GET_PRODUCT,
        categories: request
    }
}

export function axiosProducts() {
    return dispatch => {
        dispatch(getProducts())
        axios.get("http://localhost:3001/products")
            .then(res => {
                console.log('ESTOY EN EL .THEN', res)
                dispatch({
                    type: GET_PRODUCT,
                    payload: res.data
                })
            }
            );
    };
}

/*--------------------------------------------------------------------------------------- */
/*GET CATEGORIES */
/*--------------------------------------------------------------------------------------- */

export function getCategories(request) {
    return {
        type: GET_CATEGORY,
        categories: request
    }
}

export function axiosCategories() {
    return dispatch => {
        dispatch(getCategories())
        axios.get("http://localhost:3001/products/category")
            .then(res => {
                console.log('ESTOY EN EL .THEN de categories', res)
                dispatch({
                    type: GET_CATEGORY,
                    payload: res.data
                })
            }
            );
    };
}
/*--------------------------------------------------------------------------------------- */
/*DELETE PRODUCTS */
/*--------------------------------------------------------------------------------------- */
export function deleteProducts(request) {
    return {
        type: DELETE_PRODUCT,
        categories: request
    }
}

export function axiosDeleteProducts(oldData) {
    return dispatch => {
        dispatch(deleteProducts())
        axios.delete(`http://localhost:3001/products/${oldData.id}`)
            .then(res => {
                console.log('ESTOY EN EL .THEN DELETE', res)
                dispatch({
                    type: DELETE_PRODUCT,
                    payload: res.data
                })
            }
            );
    };
}
/*--------------------------------------------------------------------------------------- */
/*DELETE PRODUCTS */
/*--------------------------------------------------------------------------------------- */
export function editProducts(request) {
    return {
        type: EDIT_PRODUCT,
        categories: request
    }
}

export function axiosEditProducts(newData) {
    return dispatch => {
        console.log(newData)
        dispatch(editProducts())
        axios({
            method: 'PUT',
            url: `http://localhost:3001/products/${newData.id}`,

            data: {
                name: newData.name,
                price: newData.price,
                description: newData.description,
                stock: newData.stock

            }

        })
            .then(res => {
                console.log('ESTOY EN EL .THEN edit', res)
                dispatch({
                    type: EDIT_PRODUCT,
                    payload: res.data
                })
            }
            );
    };
}