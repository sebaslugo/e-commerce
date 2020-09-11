import { combineReducers } from 'redux';
import categorias from './category';
import busqueda from './search';
import productList from "./productList";
import productos from "./producto"

const rootReducer = combineReducers({
	categorias,
	productList,
	busqueda,
	productos
});

export default rootReducer;