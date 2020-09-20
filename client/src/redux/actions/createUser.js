import { CREATE_USER } from '../consts/actionTypes.js';
import axios from 'axios'

export function postCreateUser(newData) {
    return function(dispatch) {
        return axios({
            method: 'POST',
            url: `http://localhost:3001/users`,

            data: {
                name: newData.firstName,
                lastName: newData.lastName,
                email: newData.email,
                password: newData.password,
            }

        })
            .then(res =>{
                dispatch({
                    type: CREATE_USER,
                    payload: res.data
                })
                return res
            }
                
            ).then((res) => {
                alert('se creo el usuario')
                console.log(res)
                window.location.assign("http://localhost:3000/login/loginuser")
            })
            .catch(() => alert('este email ya tiene una cuenta creada'))
    };
    
}

