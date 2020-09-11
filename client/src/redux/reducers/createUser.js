import { CREATE_USER } from '../consts/actionTypes.js';

const initialState = {}

export default function createUser(state = initialState, action) {
    switch (action.type) {
        case CREATE_USER:
            return {
                ...state,
                data: action.payload
            }

        default:
            return { ...state };
    }

}