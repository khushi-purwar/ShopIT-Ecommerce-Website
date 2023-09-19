import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

// reducers
import {
    productsReducer,  
    productDetailsReducer, 
    newProductReducer,
    updateDeleteProductReducer,
    getProductsByCategoryReducer
} from './reducers/productReducers';

import {
    authReducer, 
    forgotPasswordReducer
}from './reducers/authReducers';

import {
    userReducer,
    allUsersReducer,
    userDetailsReducer,
    updateDeleteUserReducer
} from './reducers/userReducers';

import {cartReducer} from './reducers/cartReducers';

import {
    newOrderReducer, 
    myOrdersReducer, 
    orderDetailsReducer, 
    allOrdersReducer, 
    updateDeleteOrderReducer
} from './reducers/orderReducers';

import {
    newReviewReducer,
    productReviewsReducer,
    deleteReviewReducer
} from './reducers/reviewReducers';

const reducer = combineReducers({
    products: productsReducer,
    getProductsByCategory: getProductsByCategoryReducer,
    productDetails: productDetailsReducer,
    auth: authReducer,
    user: userReducer,
    forgotPassword: forgotPasswordReducer,
    cart: cartReducer,
    newProduct: newProductReducer,
    updateDeleteProduct: updateDeleteProductReducer,
    newOrder: newOrderReducer,
    myOrders : myOrdersReducer,
    orderDetails: orderDetailsReducer, 
    newReview: newReviewReducer,
    allOrders :allOrdersReducer,
    updateDeleteOrder: updateDeleteOrderReducer,
    allUsers: allUsersReducer,
    userDetails: userDetailsReducer,
    updateDeleteUser : updateDeleteUserReducer,
    productReviews : productReviewsReducer,
    deleteReview: deleteReviewReducer,
    
})

let initialState = {
    cart: {
        cartItems: localStorage.getItem('cartItems') 
         ? JSON.parse(localStorage.getItem('cartItems'))
         : [],
        shippingInfo : localStorage.getItem('shippingInfo')
         ? JSON.parse(localStorage.getItem('shippingInfo'))
         : {}
    }
};

const middleware = [thunk];

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;

export const server = "https://shopit-5e8j.onrender.com/api/v1";
