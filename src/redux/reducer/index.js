// función para manejar los reducer dentro del store
import { combineReducers } from "redux";
import productsReducer from "./productsReducer";

// importamos los distintos reducer que creemos


export default combineReducers({
    products: productsReducer
})