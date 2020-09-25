import axios from 'axios';
import { GET_REVIEW, DELETE_REVIEW, EDIT_REVIEW } from '../consts/actionTypes'
import Swal from 'sweetalert2'

export function getReviews(productid) {
    return function (dispatch) {
        return axios.get(`http://localhost:3001/products/${productid}/review`)
            .then(res => {
                console.log(res)
                dispatch({
                    type: GET_REVIEW,
                    payload: res.data
                })
            })

    };

}

export function postReview(productid, comentario) {
    return function (dispatch) {
        return axios({
            method: 'POST',
            url: `http://localhost:3001/products/${productid}/review`,
            data: comentario
        })
            .catch((err) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: `Inicia sesion!`,
                })
            })

    };

}

export function putReview(productid, reviewId, comentario) {
    return function (dispatch) {
        return axios({
            method: 'PUT',
            url: `http://localhost:3001/products/${productid}/review/${reviewId}`,
            data: comentario
        }).then(() => {
            dispatch({
                type: EDIT_REVIEW,
                payload: comentario
            })
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

export function deleteReview(productid, reviewId) {
    return function (dispatch) {
        return axios({
            method: 'DELETE',
            url: `http://localhost:3001/products/${productid}/review/${reviewId}`
        }).then(() => {
            dispatch({
                type: DELETE_REVIEW,
                payload: reviewId
            })
        })
            .catch(err => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops... Ha ocurrido un error inesperado',
                    text: `Recarga la página para poder eliminarlo`,
                })
            })
    };

}