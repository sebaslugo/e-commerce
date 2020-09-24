import { GET_REVIEW,DELETE_REVIEW,EDIT_REVIEW} from '../consts/actionTypes.js'

const initialState = {
}
export default function productos(state = initialState, action) {
    switch (action.type) {
        case GET_REVIEW:
            return {
                ...state,
                data: action.payload
            }
            break;
        case DELETE_REVIEW:
            return {
                ...state,
                data: state.data.filter(review => review.id !== action.payload)
            }
            break;
        case EDIT_REVIEW:
            return {
                ...state,
                data: state.data.map(review => {
                    if(review.id === action.payload.id){
                        return review = action.payload
                    }else{
                        return review
                    }
                })
            }
            break;
        
        default:
            return { ...state };
    }
}