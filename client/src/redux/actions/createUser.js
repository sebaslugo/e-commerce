import { CREATE_USER } from '../consts/actionTypes.js';
import axios from 'axios'

export function postCreateUser(request) {
    return {
        type: CREATE_USER,
        categories: request
    }
}

export default function axiosPostCreateUser(newData) {
    return dispatch => {
        dispatch(postCreateUser())
        axios({
            method: 'POST',
            url: `http://localhost:3001/users`,

            data: {
                name: newData.firstName,
                lastName: newData.lastName,
                email: newData.email,
                password: newData.password,
            }

        })
            .then(res =>
                dispatch({
                    type: CREATE_USER,
                    payload: res.data
                })
            );
    };
}