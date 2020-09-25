import axios from 'axios';
import {GET_PRODUCTS, GET_CATEGORY, DELETE_PRODUCT, EDIT_PRODUCT,GET_PRODUCT_CATEGORY } from '../consts/actionTypes';






/*--------------------------------------------------------------------------------------- */
/*GET PRODUCTS */
/*--------------------------------------------------------------------------------------- */
export function getProducts(request) {
    return function(dispatch) {
        return axios.get("http://localhost:3001/products")
          .then(response =>{
            dispatch({ type: GET_PRODUCTS, payload: response.data });
          })
    };
}



/// tods los productos de una categoria

export function getProductCategory(name){
    return function(dispatch) {
        return axios.get(`http://localhost:3001/products/category/${name}`)
          .then(response =>{
            dispatch({ type: GET_PRODUCT_CATEGORY, payload: response.data });
          })
          
    };
  
}


/*--------------------------------------------------------------------------------------- */
/*GET CATEGORIES */
/*--------------------------------------------------------------------------------------- */



/*--------------------------------------------------------------------------------------- */
/*DELETE PRODUCTS */
/*--------------------------------------------------------------------------------------- */
export function deleteProducts(oldData) {
    return function(dispatch) {
        axios.delete(`http://localhost:3001/products/${oldData.id}`)
            .then(res => {
                
                dispatch({
                    type: DELETE_PRODUCT,
                    payload: res.data
                })
            }
            );
    };
}

/*--------------------------------------------------------------------------------------- */
/*EDIT PRODUCTS */
/*--------------------------------------------------------------------------------------- */
export function editProducts(newData) {
    return function(dispatch) {
        return axios({
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
                
                dispatch({
                    type: EDIT_PRODUCT,
                    payload: res.data
                })
            }
            );
          
    };
}

