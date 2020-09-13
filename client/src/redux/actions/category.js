/* ------------------------------------------------------------------------------- */
/* ACTIONS CREATORS */
/* ------------------------------------------------------------------------------- */
import axios from 'axios';
import { GET_CATEGORY, DELETE_CATEGORY, CREATE_CATEGORY, EDIT_CATEGORY } from '../consts/actionTypes';


export function getCategories() {
    return function(dispatch) {
        return axios.get("http://localhost:3001/products/category")
          .then(response =>{
            console.log(response);
            dispatch({ type: GET_CATEGORY, payload: response.data });
          })
          
    };

}



export function deleteCategory(oldData) {
    return function(dispatch) {
        return axios.delete(`http://localhost:3001/products/category/${oldData.id}`)
          .then(response =>{
            console.log(response);
            dispatch({ type: DELETE_CATEGORY, payload: response.data });
          })
          
    };
}


export function postCategories(newData) {
    return function(dispatch) {
        return axios({
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

export function putCategories(newData, oldData) {
    return function(dispatch) {
        return axios({
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
        })
        .catch(err => console.error(err.message));
        };   
}

