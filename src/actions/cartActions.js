import axios from 'axios';
import {server} from '../store.js'

import {
    ADD_TO_CART,
    SAVE_SHIPPING_INFO
} from '../constants/cartConstants';


// add item to cart
export const addItemToCart = (id, quantity) => async( dispatch , getState)=>{
    const {data} = await axios.get(`${server}/product/${id}`);
    dispatch({
        type: 'ADD_TO_CART',
        payload: { 
            productId: data.product._id,
            name: data.product.name,
            price: data.product.price,
            image: data.product.images[0].url,
            stock: data.product.stock,
            quantity
        }
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

// delete item from cart
export const removeItemFromCart = (id) => async( dispatch , getState)=>{
   
    dispatch({
        type: 'REMOVE_CART_ITEM',
        payload: id
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}


// save  shipping info
export const saveShippingInfo = (data) => async( dispatch , getState)=>{
   
    dispatch({
        type: 'SAVE_SHIPPING_INFO',
        payload: data
    })

    localStorage.setItem('shippingInfo', JSON.stringify(data))
}