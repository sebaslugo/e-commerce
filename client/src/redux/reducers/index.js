import { combineReducers } from 'redux';
import categorias from './category';
import busqueda from './search';
import productList from "./productList";
import orden from './orden'
import productos from "./producto"
import shoppingCart from "./shoppingCart"
import agregarAlCarrito from './agregarAlCarrito'


const rootReducer = combineReducers({
  categorias,
  productList,
  busqueda,
  orden,
  productos,
  shoppingCart,
  agregarAlCarrito


});

export default rootReducer;