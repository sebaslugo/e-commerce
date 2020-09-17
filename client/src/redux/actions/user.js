import axios from 'axios';
import { USER_LOGIN } from '../consts/actionTypes'


export function postLogin (data) {
    return function(dispatch) {
        return axios({
            method: 'POST',
            url: `http://localhost:3001/auth/login`,
            data: data

        })
            .then(res => {
                console.log('ESTOY EN EL .THEN edit', res)
                dispatch({
                    type: USER_LOGIN,
                    payload: res.data.token
                })
            }
            );
          
    };
}