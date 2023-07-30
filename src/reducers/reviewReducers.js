import {
    NEW_REVIEW_REQUEST,
    NEW_REVIEW_SUCCESS,
    NEW_REVIEW_FAILURE,
    NEW_REVIEW_RESET,
    GET_REVIEW_REQUEST,
    GET_REVIEW_SUCCESS,
    GET_REVIEW_FAILURE,
    DELETE_REVIEW_REQUESTS,
    DELETE_REVIEW_SUCCESS,
    DELETE_REVIEW_FAILURE,
    DELETE_REVIEW_RESET,
    CLEAR_ERRORS
} from '../constants/reviewConstants';

// create new review
export const newReviewReducer = (state = {}, action) => {
    switch (action.type) {
        case NEW_REVIEW_REQUEST :{
            return {
                ...state,
                loading:true,
            }
        }
        case NEW_REVIEW_SUCCESS : {
            return {
                loading : false,
                success:action.payload
            }
        }
        case NEW_REVIEW_FAILURE :{
            return {
                ...state,
                error : action.payload
            }
        }
        case NEW_REVIEW_RESET :{
            return {
                ...state,
                success: false
            }
        }
        case CLEAR_ERRORS : {
            return {
                ...state,
                error: null
            }
        }
        default: 
             return state
    }
}

// get reviews
export const productReviewsReducer = (state = {reviews: []}, action) => {
    switch (action.type) {
        case GET_REVIEW_REQUEST :{
            return {
                ...state,
                loading:true,
            }
        }
        case GET_REVIEW_SUCCESS : {
            return {
                loading : false,
                reviews: action.payload
            }
        }
        case GET_REVIEW_FAILURE :{
            return {
                error : action.payload
            }
        }
       
        case CLEAR_ERRORS : {
            return {
                ...state,
                error: null
            }
        }
        default: 
             return state
    }
}

// delete reviews
export const deleteReviewReducer = (state = {}, action) => {
    switch (action.type) {
        case DELETE_REVIEW_REQUESTS :{
            return {
                ...state,
                loading:true,
            }
        }
        case DELETE_REVIEW_SUCCESS : {
            return {
                ...state,
                loading : false,
                isDeleted : action.payload,
            }
        }

        case DELETE_REVIEW_FAILURE :{
            return {
                ...state,
                error : action.payload
            }
        }
        case DELETE_REVIEW_RESET :{
            return {
                ...state,
                isDeleted: false
            }
        }
        case CLEAR_ERRORS : {
            return {
                ...state,
                success: false
            }
        }
        default: 
             return state
    }
}