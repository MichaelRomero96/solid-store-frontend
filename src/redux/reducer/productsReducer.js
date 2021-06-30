import { CLEAN_UPDATE_PRODUCT_DATA, GET_PRODUCTS, GET_UPDATE_PRODUCT_DATA } from "../types";


const initialState = {
    products: [],
    updateProductData: {}
}

export const productsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_PRODUCTS:
            return {
                ...state,
                products: action.payload
            };
        case GET_UPDATE_PRODUCT_DATA:
            return {
                ...state,
                updateProductData: action.payload
            };
        case CLEAN_UPDATE_PRODUCT_DATA:
            return {
                ...state,
                updateProductData: {}
            };
        default: return state;
    };
};

export default productsReducer;

