import { CLEAR_STEP,NEXT_STEP, BACK_STEP } from '../consts/actionTypes'

const initialState = {}

export default function step(state = initialState, action){
    switch (action.type) {
        case CLEAR_STEP:
            return {
                ...state,
                data: action.payload
            }
        case NEXT_STEP:
            return {
                ...state,
                data: action.payload
            }
        case BACK_STEP: 
            return {
                ...state,
                data: action.payload
            }
        default:
            return {
                ...state
            };
    }
}