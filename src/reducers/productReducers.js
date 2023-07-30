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
    NEW_PRODUCT_RESET,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAILURE,
    DELETE_PRODUCT_REQUESTS,
    DELETE_PRODUCT_RESET,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_FAILURE,
    UPDATE_PRODUCT_REQUESTS,
    UPDATE_PRODUCT_RESET,
    GET_PRODUCT_BY_CATEGORY_REQUEST,
    GET_PRODUCT_BY_CATEGORY_SUCCESS,
    GET_PRODUCT_BY_CATEGORY_FAILURE,
    CLEAR_ERRORS
} from '../constants/productConstants';


export const productsReducer = (state = {products : []}, action) => {
    switch (action.type) {
        case ALL_PRODUCT_REQUESTS :
        case ADMIN_PRODUCT_REQUESTS : {
            return {
                loading : true,
                products : []
            }
        }
        case ALL_PRODUCT_SUCCESS : {
            return {
                loading : false,
                products : action.payload.products,
                productCount : action.payload.productCount,
                resPerPage : action.payload.resPerPage,
                filteredCount : action.payload.filteredProductsCount
            }
        }

        case ADMIN_PRODUCT_SUCCESS : {
            return {
                loading : false,
                products : action.payload,
              
            }
        }

        case ALL_PRODUCT_FAILURE :
        case ADMIN_PRODUCT_FAILURE :{
            return {
                loading : false,
                error : action.payload.error
            }
        }
        case CLEAR_ERRORS : {
            return {
                ...state,
                error : null
            }
        }
        default: 
             return state
    }
}

export const productDetailsReducer = (state = {product : {}}, action) => {
    switch (action.type) {
        case PRODUCT_DETAILS_REQUEST : {
            return {
                ...state,
                loading : true,
            }
        }
        case PRODUCT_DETAILS_SUCCESS : {
            return {
                loading : false,
                product : action.payload.product,
                recommendedProducts : action.payload.recommendedProducts
            }
        }
        case PRODUCT_DETAILS_FAILURE : {
            return {
                ...state,
                error : action.payload
            }
        }
        case CLEAR_ERRORS : {
            return {
                ...state,
                error : null
            }
        }
        default: 
             return state
    }
}

export const newProductReducer = (state = {product : {}}, action) => {
    switch (action.type) {
        case NEW_PRODUCT_REQUESTS :{
            return {
                ...state,
                loading:true,
            }
        }
        case NEW_PRODUCT_SUCCESS : {
            return {
                loading : false,
                success : action.payload.success,
                product : action.payload.product,
            }
        }
        case NEW_PRODUCT_FAILURE :{
            return {
                ...state,
                loading: false,
                error : action.payload.message
            }
        }
        case NEW_PRODUCT_RESET :{
            return {
                ...state,
                success: false
            }
        }
        case CLEAR_ERRORS : {
            return {
                ...state,
                error:null,
            }
        }
        default: 
             return state
    }
}

//  for delete as well as for update
export const updateDeleteProductReducer = (state = {}, action) => {
    switch (action.type) {
        case DELETE_PRODUCT_REQUESTS :
        case UPDATE_PRODUCT_REQUESTS :{
            return {
                ...state,
                loading:true,
            }
        }
        case DELETE_PRODUCT_SUCCESS : {
            return {
                ...state,
                loading : false,
                isDeleted : action.payload,
            }
        }

        case UPDATE_PRODUCT_SUCCESS : {
            return {
                ...state,
                loading : false,
                isUpdated : action.payload,
            }
        }
        case DELETE_PRODUCT_FAILURE :
        case UPDATE_PRODUCT_FAILURE :{
            return {
                ...state,
                loading : false,
                error : action.payload.message
            }
        }
        case DELETE_PRODUCT_RESET :{
            return {
                ...state,
                isDeleted: false
            }
        }
        case UPDATE_PRODUCT_RESET :{
            return {
                ...state,
                isUpdated: false
            }
        }
        case CLEAR_ERRORS : {
            return {
                ...state,
                error:null
            }
        }
        default: 
             return state
    }
}


// get products by category

export const getProductsByCategoryReducer = (state = {products : []}, action) => {
    switch (action.type) {
       
        case GET_PRODUCT_BY_CATEGORY_REQUEST : {
            return {
                loading : true,
                products : []
            }
        }
        case GET_PRODUCT_BY_CATEGORY_SUCCESS : {
            return {
                loading : false,
                products : action.payload.products,
                productCount : action.payload.productCount,
            }
        }

        case GET_PRODUCT_BY_CATEGORY_FAILURE : {
            return {
                loading : false,
                products : action.payload.message,
              
            }
        }

        case CLEAR_ERRORS : {
            return {
                ...state,
                error : null
            }
        }
        default: 
             return state
    }
}




