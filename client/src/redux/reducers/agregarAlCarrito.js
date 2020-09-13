import { AGREGAR_AL_CARRITO } from '../consts/actionTypes'

const initialState = {}

export default function createUser(state = initialState, action) {
    switch (action.type) {
        case AGREGAR_AL_CARRITO:
            return {
                ...state,
                data: action.payload
            }

        default:
            return { ...state };
    }

}