import axios from 'axios';
import { GET_PRODUCT } from '../consts/actionTypes'
import Swal from 'sweetalert2'

export function getProduct(id) {
    return function (dispatch) {
        return axios.get(`http://localhost:3001/products/${id}`)
            .then(res => {
                dispatch({
                    type: GET_PRODUCT,
                    payload: res.data
                })
            })

    };

}

export function postProduct(bodyFormData) {
    return function (dispatch) {
        return axios({
            method: 'post',
            url: 'http://localhost:3001/products',
            data: bodyFormData,
            config: { headers: { 'Content-Type': 'multipart/form-data' } }
        })
            .then(function (response) {
                //handle success
                return (response)
            })
            .then((res) => {
                Swal.fire({
                    icon: 'success',
                    title: 'Se creo el producto',
                    text: `${res.data.name}`,
                })
                getProduct(res.data.id)


            })
            .catch(err => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: `${err}`,
                })
            })

    };
}

export function editProduct(bodyFormData, id) {
    return function (dispatch) {
        return axios({
            method: 'put',
            url: `http://localhost:3001/products/${id}`,
            data: bodyFormData,
            config: { headers: { 'Content-Type': 'multipart/form-data' } }
        })
            .then(function (response) {
                //handle success
                return (response)
            })
            .then((res) => {
                Swal.fire({
                    icon: 'success',
                    title: 'Modificación',
                    text: `Se modificó el producto correctamente`,
                })
                getProduct(res.data.id)

            })
            .catch(function (response) {
                //handle error
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: `Completa todos los datos obligatorios`,
                })
            });

    };

}