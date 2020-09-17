import { combineReducers } from 'redux';
import categorias from './category';
import busqueda from './search';
import productList from "./productList";
import orden from './orden'
import productos from "./producto"
import shoppingCart from "./shoppingCart"
import agregarAlCarrito from './agregarAlCarrito'
import reviews from './reviews'
import user from './user'


const rootReducer = combineReducers({
  categorias,
  productList,
  busqueda,
  orden,
  productos,
  shoppingCart,
  agregarAlCarrito,
  reviews,
  user
});

export default rootReducer;