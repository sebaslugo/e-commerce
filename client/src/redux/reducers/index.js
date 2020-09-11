import { combineReducers } from 'redux';
import categorias from './category';
import busqueda from './search';
import productList from "./productList";

const rootReducer = combineReducers({
	categorias,
  productList,
	busqueda
});

export default rootReducer;