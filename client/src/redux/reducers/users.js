import { GET_USERS, DELETE_USER, PROMOTE_USER } from '../consts/actionTypes';

const initialState = {}

export default function users(state = initialState, action) {
    switch (action.type) {
        case GET_USERS:
            return {
                ...state,
                data: action.payload
            }
            break;
        case DELETE_USER: 
            return {
                ...state,
                data: state.data.filter(user => user.id !== action.payload)
            }
            break;
        case PROMOTE_USER:
            return {
                ...state,
                data: state.data.map(user => {
                    if(user.id === action.payload.id){
                        return user = action.payload
                    }else{
                        return user
                    }
                })
            }
        default:
            return { ...state };
    }
}