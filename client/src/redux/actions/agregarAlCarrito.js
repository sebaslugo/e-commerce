import { AGREGAR_AL_CARRITO } from '../consts/actionTypes'
import axios from 'axios'


export default function agregarAlCarrito(newData) {
    return function (dispatch) {
        console.log(newData)
        return axios({
            method: 'POST',
            url: 'http://localhost:3001/users/1/cart',//cambiarle el id del user en caso de ser necesario
            data: {
                "product": {
                    "productId": newData.idProducto,
                    "price": newData.price,
                    "quantity": newData.quantity
                }
            }
        }).then((response) => {
            console.log('response');
            dispatch({ type: AGREGAR_AL_CARRITO, payload: response.data })
        })
            .then((res) => {
                alert('Se añadio el producto al carrito')
            })
            .catch((err) => {
                alert('El producto ya esta agregado en el carrito')
            })
    }
    // return dispatch => {
    //     dispatch(postCreateUser())
    //     axios({
    //         method: 'POST',
    //         url: `http://localhost:3001/users`,

    //         data: {
    //             name: newData.firstName,
    //             lastName: newData.lastName,
    //             email: newData.email,
    //             password: newData.password,
    //         }

    //     })
    //         .then(res =>
    //             dispatch({
    //                 type: CREATE_USER,
    //                 payload: res.data
    //             })
    //         );
    // };
}