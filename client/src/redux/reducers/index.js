import { combineReducers } from 'redux';
import categorias from './category';
import busqueda from './search';

const rootReducer = combineReducers({
	categorias,
	busqueda
});

export default rootReducer;