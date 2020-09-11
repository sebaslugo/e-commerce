import { combineReducers } from 'redux';
import categorias from './category';
import orden from './orden'

const rootReducer = combineReducers({
	categorias,
	orden
});

export default rootReducer;