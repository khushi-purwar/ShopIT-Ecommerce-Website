import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAILURE,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAILURE,
    LOGOUT_SUCCESS,
    LOGOUT_FAILURE,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAILURE,
    NEW_PASSWORD_REQUEST,
    NEW_PASSWORD_SUCCESS,
    NEW_PASSWORD_FAILURE,
    CLEAR_ERRORS
} from '../constants/authConstants';

export const authReducer = (state = {user : {}}, action) => {
    switch (action.type) {
        case LOGIN_REQUEST :
        case REGISTER_REQUEST :
        case LOAD_USER_REQUEST :{
            return {
                loading : true,
                isAuthenticated : false
            }
        }
        case LOGIN_SUCCESS :
        case REGISTER_SUCCESS :
        case LOAD_USER_SUCCESS :{
            return {
                ...state,
                loading : false,
                isAuthenticated : true,
                user : action.payload
                
                
            }
        }
        case LOGOUT_SUCCESS : {
            return {
                loading: false,
                isAuthenticated : false,
                user:null
            }
        }
        
        case LOGIN_FAILURE : 
        case REGISTER_FAILURE : 
        {
            return {
                ...state,
                loading : false,
                isAuthenticated : false,
                user: null,
                error : action.payload.message
            }
        }

        case LOGOUT_FAILURE :{
            return {
                ...state,
                error : action.payload.message
            }
        }

        case LOAD_USER_FAILURE : {
            return {
               
                loading : false,
                isAuthenticated : false,
                user: null,
                error : action.payload.message
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


export const forgotPasswordReducer = (state = {user : {}}, action) => {
    switch (action.type) {
        
        case FORGOT_PASSWORD_REQUEST :
        case NEW_PASSWORD_REQUEST : {
            return {
                ...state,
                error : null,
                loading : true
            }
        }
        case FORGOT_PASSWORD_SUCCESS : {
            return {
                ...state,
                loading : false,
                message : action.payload
            }
        }

        case NEW_PASSWORD_SUCCESS : {
            return {
                ...state,
                success : action.payload
            }
        }

        case FORGOT_PASSWORD_FAILURE :
        case NEW_PASSWORD_FAILURE : {
            return {
                ...state,
                loading : false,
                error: action.payload.message
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
