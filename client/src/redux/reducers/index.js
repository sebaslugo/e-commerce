import { combineReducers } from 'redux';
import categorias from './category';
import busqueda from './search';
import productList from "./productList";
import orden from './orden'

const rootReducer = combineReducers({
	categorias,
  productList,
	busqueda,
  orden
});

export default rootReducer;