import axios from 'axios'
import { SET_ADDRESS_FORM, SET_PAYMENT_FORM, CLEAR_STEP, NEXT_STEP, BACK_STEP, CREATE_CHECKOUT } from '../consts/actionTypes'



export function userPurchaseData(data) {
    return function (dispatch) {
        console.log(data)
        return dispatch({
            type: SET_ADDRESS_FORM,
            payload: data
        })

    }
}

export function paymentForm(data) {
    console.log(data)
    return function (dispatch) {
        return dispatch({
            type: SET_PAYMENT_FORM,
            payload: data
        })
    }
}

export function clearStep() {
    return function (dispatch) {
        return dispatch({
            type: CLEAR_STEP,
            payload: 0
        })
    }
}

export function nextStep(data) {
    return function (dispatch) {
        return dispatch({
            type: NEXT_STEP,
            payload: data
        })
    }
}

export function backStep(data) {
    return function (dispatch) {
        return dispatch({
            type: BACK_STEP,
            payload: data
        })
    }
}

export function createCheckout(data) {
    console.log(data)
    console.log('estoy antes del axios', data.products)
    console.log('estoy antes del axios', data.userData)
    return function (dispatch) {
        return axios({
            method: "POST",
            url: `http://localhost:3001/orders/checkout/`,
            data: {
                products: data.products,
                dataUser: data.userData
            }
        })
            .then(res => {
                console.log("estoy en el .then", data)
                dispatch({
                    type: CREATE_CHECKOUT,
                    payload: res
                })
                return res
            })
    }
}