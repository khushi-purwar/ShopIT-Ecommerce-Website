import {
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAILURE,
    UPDATE_PROFILE_RESET ,
    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_FAILURE,
    UPDATE_PASSWORD_RESET,
    ALL_USERS_REQUEST,
    ALL_USERS_SUCCESS,
    ALL_USERS_FAILURE,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAILURE,
    UPDATE_USER_REQUESTS,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAILURE,
    UPDATE_USER_RESET,
    DELETE_USER_REQUESTS,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAILURE,
    DELETE_USER_RESET,
    CLEAR_ERRORS
} from '../constants/userConstants';

// update user profile and change password
export const userReducer = (state = {}, action) => { 
    switch (action.type) {
        case UPDATE_PROFILE_REQUEST: 
        case UPDATE_PASSWORD_REQUEST: {
            return {
                ...state,
                loading : true,
                
            }
        }
        case UPDATE_PROFILE_SUCCESS:
        case UPDATE_PASSWORD_SUCCESS:{
            return {
                ...state,
                loading : false,
                isUpdated: action.payload
            }
        }

        case UPDATE_PROFILE_RESET :
        case UPDATE_PASSWORD_RESET: { 
            return {
                ...state,
                isUpdated: false
            }
        }
        case UPDATE_PROFILE_FAILURE: 
        case UPDATE_PASSWORD_FAILURE: {
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

// get all user
export const allUsersReducer = (state = {users : []}, action) => {
    switch (action.type) {

        case ALL_USERS_REQUEST : {
            return {
                loading : true,
                users : []
            }
        }
        case ALL_USERS_SUCCESS : {
            return {
                loading : false,
                users: action.payload
            }
        }

        case ALL_USERS_FAILURE : {
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

//  get a specific user details
export const userDetailsReducer = (state = {user : {}}, action) => {
    switch (action.type) {
        case USER_DETAILS_REQUEST : {
            return {
                ...state,
                loading : true,
            }
        }
        case USER_DETAILS_SUCCESS : {
            return {
                loading : false,
                user : action.payload,
            
            }
        }
        case USER_DETAILS_FAILURE : {
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

//  for delete as well as for update users
export const updateDeleteUserReducer = (state = {}, action) => {
    switch (action.type) {
        case DELETE_USER_REQUESTS :
        case UPDATE_USER_REQUESTS: {
            return {
                ...state,
                loading:true,
            }
        }
        case DELETE_USER_SUCCESS : {
            return {
                ...state,
                loading : false,
                isDeleted : action.payload,
            }
        }

        case UPDATE_USER_SUCCESS : {
            return {
                ...state,
                loading : false,
                isUpdated : action.payload,
            }
        }

        case DELETE_USER_FAILURE :
        case  UPDATE_USER_FAILURE : {
            return {
                ...state,
                loading : false,
                error : action.payload
            }
        }
        case DELETE_USER_RESET :{
            return {
                ...state,
                isDeleted: false
            }
        }
        case UPDATE_USER_RESET :{
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

