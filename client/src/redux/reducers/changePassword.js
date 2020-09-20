import { PUT_PASSWORD } from '../consts/actionTypes';

const initialState = {}

export default function putPassword(state = initialState, action) {
    switch (action.type) {
        case PUT_PASSWORD:
            return {
                ...state,
                data: action.payload
            }

        default:
            return { ...state };
    }

}