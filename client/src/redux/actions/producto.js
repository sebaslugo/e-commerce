import axios from 'axios';
import { GET_PRODUCT,POST_PRODUCT } from '../consts/actionTypes'

export function getProducts(id) {
    return function(dispatch) {
        return axios.get(`http://localhost:3001/products/${id}`)
        .then(res => {
            dispatch({
                type: GET_PRODUCT,
                payload: res.data
            })
        })
          
    };
    
}

export function postProduct(bodyFormData){
    return function(dispatch) {
        return axios({
            method: 'post',
            url: 'http://localhost:3001/products',
            data: bodyFormData,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
            })
            .then(function (response) {
                //handle success
                return(response)
            })
            .then((res) => {
                alert('se creo el producto '+ res.data.name)
                getProducts(res.data.id)
                
                            
            })
            .catch(err => alert(err))
          
    };
}

export function editProduct (bodyFormData,id) {
    return function(dispatch) {
        return axios({
            method: 'put',
            url: `http://localhost:3001/products/${id}`,
            data: bodyFormData,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
            })
            .then(function (response) {
                //handle success
                return(response)
            })
            .then((res) => {
                alert('se modifico el producto')
                getProducts(res.data.id)
                                   
            })            
            .catch(function (response) {
                //handle error
                alert('upss,completa todos los campos obligatorios')
            }); 
          
    };

}