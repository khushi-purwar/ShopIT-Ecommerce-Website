import React, {useState} from "react";
import { useSelector , useDispatch} from "react-redux";
import { useHistory } from "react-router-dom";
import {Link, useNavigate} from 'react-router-dom';

// layout
import MetaData from "../layout/MetaData";

// functions
import {addItemToCart, removeItemFromCart} from '../../actions/cartActions';

const Cart = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {cartItems } = useSelector(state=> state.cart)

    const decreaseQty = (id, quantity) =>{
        const newQty = quantity - 1
        if(newQty <= 0)
          return;
        dispatch(addItemToCart(id, newQty))
      }
    
      const increaseQty = (id, quantity, stock)=>{
        const newQty = quantity + 1
        if(newQty > stock)
          return;
        dispatch(addItemToCart(id, newQty))
      }

      const removeItemHandler = (id)=>{
          dispatch(removeItemFromCart(id))
      }

      const checkoutHandler = ()=>{
          navigate('/login?redirect=shipping')
      }
    return (
        <>
        <MetaData title="Your Cart" />
        {cartItems.length === 0 
           ? <img src="./images/empty-cart.png" alt="empty-cart"  />
           : (
               <>
               <h2 className="mt-5">Your Cart: <b>{cartItems.length} items</b></h2>
        
        <div className="row d-flex justify-content-between">
            {/* cart */}
            <div className="col-12 col-lg-8">
               
                {cartItems.map (item => (
                    <>
                    <hr />
                    <div className="cart-item" key={item.productId}>
                    <div className="row" >
                        <div className="col-4 col-lg-3">
                            <img src={item.image} alt={item.name} height="90" width="115" />
                        </div>

                        <div className="col-5 col-lg-3">
                            <Link to={`/product/${item.productId}`} style={{textDecoration: "none"}}>{item.name}</Link>
                        </div>


                        <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                            <p id="card_item_price">${item.price}</p>
                        </div>

                        <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                            <div className="stockCounter d-inline">
                                <span className="btn btn-danger minus" onClick={()=>  decreaseQty(item.productId, item.quantity)}>-</span>
                                <input type="number" className="form-control count d-inline" value={item.quantity} readOnly />

								<span className="btn btn-primary plus" onClick={()=> increaseQty(item.productId, item.quantity, item.stock)}>+</span>
                            </div>
                        </div>

                        <div className="col-4 col-lg-1 mt-4 mt-lg-0">
                            <i id="delete_cart_item" className="fa fa-trash btn btn-danger" style={{fontSize: "22px"}} onClick={()=>removeItemHandler(item.productId)}></i>
                        </div>

                    </div>
                    </div>
                    <hr />
                    </>
                ))}
                
            </div>

           {/* order summary */}
            <div className="col-12 col-lg-3 my-4">
                <div id="order_summary">
                    <h4>Order Summary</h4>
                    <hr />
                    <p>Subtotal:  <span className="order-summary-values">
                        {cartItems.reduce( (acc,item)=> acc + item.quantity , 0)}
                        {cartItems.reduce( (acc,item)=> acc + item.quantity , 0) === 1 ? " Unit" :" Units"}</span></p>
                    <p>Est. total: <span className="order-summary-values">
                        ${cartItems.reduce( (acc,item)=> acc + (item.quantity) * (item.price), 0).toFixed(2)}
                    </span></p>
    
                    <hr />
                    <button 
                       id="checkout_btn" 
                       className="btn btn-primary btn-block"
                       onClick={checkoutHandler}
                    >Check out</button>
                </div>
            </div>
        </div>
               </>
           )
        }
        </>
    )
}

export default Cart;
