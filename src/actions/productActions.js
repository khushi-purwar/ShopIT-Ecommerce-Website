import axios from 'axios';

import {
    ALL_PRODUCT_FAILURE,
    ALL_PRODUCT_SUCCESS,
    ALL_PRODUCT_REQUESTS,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAILURE,
    ADMIN_PRODUCT_FAILURE,
    ADMIN_PRODUCT_SUCCESS,
    ADMIN_PRODUCT_REQUESTS,
    NEW_PRODUCT_SUCCESS,
    NEW_PRODUCT_FAILURE,
    NEW_PRODUCT_REQUESTS,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAILURE,
    DELETE_PRODUCT_REQUESTS,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_FAILURE,
    UPDATE_PRODUCT_REQUESTS,
    GET_PRODUCT_BY_CATEGORY_REQUEST,
    GET_PRODUCT_BY_CATEGORY_SUCCESS,
    GET_PRODUCT_BY_CATEGORY_FAILURE,
    CLEAR_ERRORS
} from '../constants/productConstants';


// get all products
export const getProducts = (keyword='', currentPage=1, price, category, ratings = 0)=> async(dispatch) =>{
    try{
        dispatch({
            type: 'ALL_PRODUCT_REQUESTS'
        })

        // price is an array -> price[1,10000] so, price[0] = 1 & price[1] = 10000
        let route = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}&ratings[gte]=${ratings}`

        if(category){
            route = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}&category=${category}&ratings[gte]=${ratings}`
        }
        
        const {data} = await axios.get(route);

        dispatch({
            type: 'ALL_PRODUCT_SUCCESS',
            payload: data
        })
    }catch(error){
        dispatch({
            type: 'ALL_PRODUCT_FAILURE',
            payload: error.response.data
        })
    }
}

// get product detail
export const getProductDetails = (id)=> async(dispatch) =>{
    try{
        dispatch({
            type: 'PRODUCT_DETAILS_REQUEST'
        })

        const {data} = await axios.get(`/api/v1/product/${id}`);
        
        dispatch({
            type: 'PRODUCT_DETAILS_SUCCESS',
            payload: data
        })
    }catch(error){
        dispatch({
            type: 'PRODUCT_DETAILS_FAILURE',
            payload: error.response.data
        })
    }
}

// get all products (admin side)
export const getAdminProducts = ()=> async(dispatch) =>{
    try{
        dispatch({
            type: 'ADMIN_PRODUCT_REQUESTS'
        })

        const {data} = await axios.get('/api/v1/admin/products');

        dispatch({
            type: 'ADMIN_PRODUCT_SUCCESS',
            payload: data.products
        })
    }catch(error){
        dispatch({
            type: 'ADMIN_PRODUCT_FAILURE',
            payload: error.response.data
        })
    }
}

// create a new product
export const createProduct = (productData)=> async(dispatch) =>{
    try{
        dispatch({
            type: 'NEW_PRODUCT_REQUESTS'
        })

        const config = {
            headers: {
                'CONTENT-TYPE': 'multipart/form-data',
            }
        }

        const {data} = await axios.post('/api/v1/admin/product', productData, config);

        dispatch({
            type: 'NEW_PRODUCT_SUCCESS',
            payload: data
        })
    }catch(error){
        dispatch({
            type: 'NEW_PRODUCT_FAILURE',
            payload: error.response.data
        })
    }
}

// delete a product
export const deleteProduct = (id)=> async(dispatch) =>{
    try{
        dispatch({
            type: 'DELETE_PRODUCT_REQUESTS'
        })

        const {data} = await axios.delete(`/api/v1/admin/product/${id}`);

        dispatch({
            type: 'DELETE_PRODUCT_SUCCESS',
            payload: data.success
        })
    }catch(error){
        dispatch({
            type: 'DELETE_PRODUCT_FAILURE',
            payload: error.response.data
        })
    }
}

// updated a product
export const updateProduct = (id, productData)=> async(dispatch) =>{
    try{
        dispatch({
            type: 'UPDATE_PRODUCT_REQUESTS'
        })

        const config = {
            headers: {
                'CONTENT-TYPE': 'multipart/form-data',
            }
        }

        const {data} = await axios.put(`/api/v1/admin/product/${id}`, productData, config);

        dispatch({
            type: 'UPDATE_PRODUCT_SUCCESS',
            payload: data.success
        })
    }catch(error){
        dispatch({
            type: 'UPDATE_PRODUCT_FAILURE',
            payload: error.response.data
        })
    }
}

// get products by category
export const getProductsByCategory = (category)=> async(dispatch) =>{
    try{
        dispatch({
            type: 'GET_PRODUCT_BY_CATEGORY_REQUEST'
        })

        const {data} = await axios.get(`/api/v1/products/category/${category}`);
        
        dispatch({
            type: 'GET_PRODUCT_BY_CATEGORY_SUCCESS',
            payload: data
        })
    }catch(error){
        dispatch({
            type: 'GET_PRODUCT_BY_CATEGORY_FAILURE',
            payload: error.response.data
        })
    }
}

// to handle clear errors,
export const clearErrors = ()=> async(dispatch) => {
    dispatch({
        type: 'CLEAR_ERRORS'
    })
}