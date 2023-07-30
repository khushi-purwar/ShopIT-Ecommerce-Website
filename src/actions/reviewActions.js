import {
    NEW_REVIEW_REQUEST,
    NEW_REVIEW_SUCCESS,
    NEW_REVIEW_FAILURE,
    GET_REVIEW_REQUEST,
    GET_REVIEW_SUCCESS,
    GET_REVIEW_FAILURE,  
    DELETE_REVIEW_REQUESTS,
    DELETE_REVIEW_SUCCESS,
    DELETE_REVIEW_FAILURE,
    CLEAR_ERRORS
} from '../constants/reviewConstants';

import axios from 'axios';

// create a new product
export const newReview = (reviewData)=> async(dispatch) =>{
    try{
        dispatch({
            type: 'NEW_REVIEW_REQUEST'
        })

        const config = {
            headers: {
                'CONTENT-TYPE': 'application/json',
            }
        }

        const {data} = await axios.put('/api/v1/review', reviewData, config);

        dispatch({
            type: 'NEW_REVIEW_SUCCESS',
            payload: data.success
        })
    }catch(error){
        dispatch({
            type: 'NEW_REVIEW_FAILURE',
            payload: error.response.data.message
        })
    }
}

// get product reviews
export const getProductReviews = (id)=> async(dispatch) =>{
    try{
        dispatch({
            type: 'GET_REVIEW_REQUEST'
        })

        const {data} = await axios.get(`/api/v1/reviews?id=${id}`);

        dispatch({
            type: 'GET_REVIEW_SUCCESS',
            payload: data.reviews
        })
    }catch(error){
        dispatch({
            type: 'GET_REVIEW_FAILURE',
            payload: error.response.data.message
        })
    }
}

//  delete REVIEW
export const deleteReview = (productId, reviewId)=> async(dispatch) =>{
    try{
        dispatch({
            type: 'DELETE_REVIEW_REQUESTS'
        })

        const {data} = await axios.delete(`/api/v1/review/?productId=${productId}&reviewId=${reviewId}`);

        dispatch({
            type: 'DELETE_REVIEW_SUCCESS',
            payload: data.success
        })
    }catch(error){
        dispatch({
            type: 'DELETE_REVIEW_FAILURE',
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