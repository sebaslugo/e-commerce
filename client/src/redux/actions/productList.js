import axios from 'axios';
<<<<<<< HEAD
import { GET_PRODUCTS,  DELETE_PRODUCT, EDIT_PRODUCT,GET_PRODUCT_CATEGORY } from '../consts/actionTypes';
=======

import { GET_PRODUCT, GET_CATEGORY, DELETE_PRODUCT, EDIT_PRODUCT,GET_PRODUCT_CATEGORY } from '../consts/actionTypes';
>>>>>>> master





/*--------------------------------------------------------------------------------------- */
/*GET PRODUCTS */
/*--------------------------------------------------------------------------------------- */
export function getProducts(request) {
    return function(dispatch) {
        return axios.get("http://localhost:3001/products")
          .then(response =>{
<<<<<<< HEAD
            dispatch({ type: GET_PRODUCTS, payload: response.data });
=======
            dispatch({ type: GET_PRODUCT_CATEGORY, payload: response.data });
>>>>>>> master
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


<<<<<<< HEAD
=======

/*--------------------------------------------------------------------------------------- */
/*GET CATEGORIES */
/*--------------------------------------------------------------------------------------- */


>>>>>>> master
/*--------------------------------------------------------------------------------------- */
/*DELETE PRODUCTS */
/*--------------------------------------------------------------------------------------- */
export function deleteProducts(oldData) {
    return function(dispatch) {
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
                console.log('ESTOY EN EL .THEN edit', res)
                dispatch({
                    type: EDIT_PRODUCT,
                    payload: res.data
                })
            }
            );
          
    };
}

