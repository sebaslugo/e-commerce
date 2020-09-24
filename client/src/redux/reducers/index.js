import { combineReducers } from 'redux';
import categorias from './category';
import busqueda from './search';
import productList from "./productList";
import orden from './orden';
import productos from "./producto";
import shoppingCart from "./shoppingCart";
import reviews from './reviews';
import createUser from './createUser';
import loginUser from './loginUser';
import menuLogin from './menuLogin';
import forgotPassword from './forgotPassword';
import putPassword from './changePassword';
import userPurchaseData from './userPurchaseData';
import userPaymentData from './userPaymentData';
import step from './checkoutStep';
import users from './users';

const rootReducer = combineReducers({
  categorias,
  productList,
  busqueda,
  orden,
  productos,
  shoppingCart,
  reviews,
  createUser,
  loginUser,
  menuLogin,
  forgotPassword,
  putPassword,
  userPurchaseData,
  userPaymentData,
  step,
  users
});

export default rootReducer;