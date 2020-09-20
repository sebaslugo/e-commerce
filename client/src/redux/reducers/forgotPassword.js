import { GET_EMAIL } from '../consts/actionTypes';

const initialState = {}

export default function forgotPassword(state = initialState, action) {
    switch (action.type) {
        case GET_EMAIL:
            return {
                ...state,
                data: action.payload
            }

        default:
            return { ...state };
    }

}