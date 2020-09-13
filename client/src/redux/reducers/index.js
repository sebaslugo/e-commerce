import { combineReducers } from 'redux';
import categorias from './category';
import busqueda from './search';
import productList from "./productList";
import orden from './orden'
import productos from "./producto"
import shoppingCart from "./shoppingCart"

const rootReducer = combineReducers({
  categorias,
  productList,
  busqueda,
  orden,
  productos,
  shoppingCart

});

export default rootReducer;