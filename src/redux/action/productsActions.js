import axiosClient from "../../services/axiosClient";
import { CLEAN_UPDATE_PRODUCT_DATA, GET_PRODUCTS, GET_UPDATE_PRODUCT_DATA } from "../types";


export const getProductsAction = () => async dispatch => {
    try {
        const response = await axiosClient.get('/products');
        console.log(response);
        dispatch({
            type: GET_PRODUCTS,
            payload: response.data
        })
    } catch (e) {
        console.log(e);
        dispatch({
            type: GET_PRODUCTS,
            payload: []
        })
    }
};

export const createProductAction = product => async () => {
    try {
        const response = await axiosClient.post('/products', product);
        console.log(response.data);
        return response.data
    } catch (e) {
        console.log(e);
        return e.response.data

    }
};

export const updateProductAction = product => async () => {
    try {
        const response = await axiosClient.put(`/products/${product.id}`, product);
        console.log(response.data);
        return response.data
    } catch (e) {
        console.log(e);
        return e.response.data

    }
};

export const deleteProductAction = id => async () => {
    try {
        const response = await axiosClient.delete(`/products/${id}`);
        console.log(response.data);
        return response.data
    } catch (e) {
        console.log(e);
        return e.response.data

    }
};

export const getUpdateProductDataAction = updateProductData => async dispatch => {
    dispatch({
        type: GET_UPDATE_PRODUCT_DATA,
        payload: updateProductData
    })
}

export const cleanUpdateProductDataAction = () => async dispatch => {
    dispatch({
        type: CLEAN_UPDATE_PRODUCT_DATA
    })
}