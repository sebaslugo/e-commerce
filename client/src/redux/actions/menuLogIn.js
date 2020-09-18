import { GET_USER, LOGOUT } from '../consts/actionTypes';
import axios from 'axios';
// axios.defaults.headers.common = { 'Authorization': `bearer ${localStorage.getItem('token')}` }

export function getUser() {
    return function (dispatch) {
        return axios({
            method: 'GET',
            url: `http://localhost:3001/auth/me`,
        })

            .then((res) => {
                console.log(res)
                localStorage.setItem('idUser', res.data.user.id)
                localStorage.setItem('name', res.data.user.name)
                localStorage.setItem('lastName', res.data.user.lastName)
                localStorage.setItem('fullName', res.data.user.fullName)
                localStorage.setItem('rol', res.data.user.rol)
            })
            .then((res) => {
                dispatch({
                    type: GET_USER,
                    payload: res.data
                })
                return res;
            })
            .catch(err => console.error(err.message))

    };

}

export function logOut() {
    return function (dispatch) {
        return axios({
            method: 'GET',
            url: `http://localhost:3001/auth/logout`,
        })

            .then((res) => {
                // console.log(res)
                localStorage.clear()
                return res
            })
            .then((res) => {
                dispatch({
                    type: LOGOUT,
                    payload: res.data
                })
                return res;
            })
            .catch(err => alert(err))
    }
}
