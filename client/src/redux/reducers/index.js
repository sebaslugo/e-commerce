import { combineReducers } from 'redux';
import categorias from './category';
import productList from "./productList";
const rootReducer = combineReducers({
	categorias, productList
});

export default rootReducer;