import axios from 'axios';

import { 
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAILURE,
    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_FAILURE,
    ALL_USERS_REQUEST,
    ALL_USERS_SUCCESS,
    ALL_USERS_FAILURE,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAILURE,
    UPDATE_USER_REQUESTS,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAILURE,
    DELETE_USER_REQUESTS,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAILURE,
    CLEAR_ERRORS
}from '../constants/userConstants';


// update user profile 
export const updateProfile = (userData) => async( dispatch )=>{
    try{
        dispatch({
            type: 'UPDATE_PROFILE_REQUEST'
        })

        const config = {
            headers: {
                'CONTENT-TYPE': 'multipart/form-data',
            }
        }

        const {data} = await axios.put('/api/v1/me/update' , userData ,config);

        dispatch({
            type: 'UPDATE_PROFILE_SUCCESS',
            payload: data.success
        })

    }catch(error){
        dispatch({
            type: 'UPDATE_PROFILE_FAILURE',
            payload: error.response.data
        })
    }
}

// update user password
export const updatePassword = (passwords) => async( dispatch )=>{
    try{
        dispatch({
            type: 'UPDATE_PASSWORD_REQUEST'
        })

        const config = {
            headers: {
                'CONTENT-TYPE': 'application/json',
            }
        }

        const {data} = await axios.put('/api/v1/password/update' , passwords ,config);

        dispatch({
            type: 'UPDATE_PASSWORD_SUCCESS',
            payload: data.success
        })

    }catch(error){
        dispatch({
            type: 'UPDATE_PASSWORD_FAILURE',
            payload: error.response.data
        })
    }
}

// get all users from admin side--------------------------------
export const getAllUsers = ()=> async(dispatch) =>{
    try{
        dispatch({
            type: 'ALL_USERS_REQUEST'
        })

        const {data} = await axios.get('/api/v1/admin/users');

        dispatch({
            type: 'ALL_USERS_SUCCESS',
            payload: data.users
        })
    }catch(error){
        dispatch({
            type: 'ALL_USERS_FAILURE',
            payload: error.response.data
        })
    }
}

// get user detail
export const getUserDetails = (id)=> async(dispatch) =>{
    try{
        dispatch({
            type: 'USER_DETAILS_REQUEST'
        })

        const {data} = await axios.get(`/api/v1/admin/user/${id}`);
        
        dispatch({
            type: 'USER_DETAILS_SUCCESS',
            payload: data.user
        })
    }catch(error){
        dispatch({
            type: 'USER_DETAILS_FAILURE',
            payload: error.response.data
        })
    }
}

// delete a user
export const deleteUser = (id)=> async(dispatch) =>{
    try{
        dispatch({
            type: 'DELETE_USER_REQUESTS'
        })

        const {data} = await axios.delete(`/api/v1/admin/user/${id}`);

        dispatch({
            type: 'DELETE_USER_SUCCESS',
            payload: data.success
        })
    }catch(error){
        dispatch({
            type: 'DELETE_USER_FAILURE',
            payload: error.response.data
        })
    }
}

// updated a user
export const updateUser = (id, userData)=> async(dispatch) =>{
    try{
        dispatch({
            type: 'UPDATE_USER_REQUESTS'
        })

        const config = {
            headers: {
                'CONTENT-TYPE': 'application/json',
            }
        }

        const {data} = await axios.put(`/api/v1/admin/user/${id}`, userData, config);

        dispatch({
            type: 'UPDATE_USER_SUCCESS',
            payload: data.success
        })
    }catch(error){
        dispatch({
            type: 'UPDATE_USER_FAILURE',
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