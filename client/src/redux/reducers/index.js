import { combineReducers } from 'redux';
import categorias from './category';
import busqueda from './search';
import productList from "./productList";
import orden from './orden'
import productos from "./producto"

const rootReducer = combineReducers({
  categorias,
  productList,
	busqueda,
  orden, 
  productos

});

export default rootReducer;