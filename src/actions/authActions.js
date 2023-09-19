import axios from 'axios';
import {server} from '../store.js'

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

// login
export const login = (email, password) => async( dispatch )=>{
    try{
        dispatch({
            type: 'LOGIN_REQUEST'
        })

        const config = {
            headers: {
                'CONTENT-TYPE': 'application/json'
            },
            withCredentials: true
        }

        const {data} = await axios.post(`${server}/login` , {email, password} ,config);

        dispatch({
            type: 'LOGIN_SUCCESS',
            payload: data.user
        })
    }catch(error){
        dispatch({
            type: 'LOGIN_FAILURE',
            payload: error.response.data
        })
    }
}

// regsiter
export const register = (userData) => async( dispatch )=>{
    try{
        dispatch({
            type: 'REGISTER_REQUEST'
        })

        const config = {
            headers: {
                'CONTENT-TYPE': 'multipart/form-data',
            }
        }

        const {data} = await axios.post(`${server}/register` , userData ,config);

        dispatch({
            type: 'REGISTER_SUCCESS',
            payload: data.user
        })

    }catch(error){
        dispatch({
            type: 'REGISTER_FAILURE',
            payload: error.response.data
        })
    }
}

// load user
export const loadUser = () => async( dispatch )=>{
    try{
        dispatch({
            type: 'LOAD_USER_REQUEST'
        })

        const {data} = await axios.get(`${server}/me` );

        dispatch({
            type: 'LOAD_USER_SUCCESS',
            payload: data.user
        })

    }catch(error){
        dispatch({
            type: 'LOAD_USER_FAILURE',
            payload: error.response.data
        })
    }
}

// logout
export const logout = () => async( dispatch )=>{
    try{
     
        await axios.get(`${server}/logout`);

        dispatch({
            type: 'LOGOUT_SUCCESS', 
        })

    }catch(error){
        dispatch({
            type: 'LOGOUT_FAILURE',
            payload: error.response.data
        })
    }
}

// forgot password
export const forgotPassword = (email) => async( dispatch )=>{
    try{
        dispatch({
            type: 'FORGOT_PASSWORD_REQUEST'
        })

        const config = {
            headers: {
                'CONTENT-TYPE': 'application/json'
            }
        }

        const {data} = await axios.post(`${server}/password/forgot`, email ,config);

        dispatch({
            type: 'FORGOT_PASSWORD_SUCCESS',
            payload: data.message
        })
    }catch(error){
        dispatch({
            type: 'FORGOT_PASSWORD_FAILURE',
            payload: error.response.data
        })
    }
}

// reset password
export const resetPassword = (token, passwords) => async( dispatch )=>{
    try{
        dispatch({
            type: 'NEW_PASSWORD_REQUEST'
        })

        const config = {
            headers: {
                'CONTENT-TYPE': 'application/json'
            }
        }

        const {data} = await axios.put(`${server}/password/reset/${token}`, passwords ,config);

        dispatch({
            type: 'NEW_PASSWORD_SUCCESS',
            payload: data.success
        })
    }catch(error){
        dispatch({
            type: 'NEW_PASSWORD_FAILURE',
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

