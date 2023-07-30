import React, {useEffect} from "react";
import { useSelector , useDispatch} from "react-redux";
import {useNavigate} from 'react-router-dom'
import {useAlert} from 'react-alert';
import axios from 'axios'

// layout
import MetaData from "../layout/MetaData";

// functions
import {createOrder, clearErrors} from '../../actions/orderActions';

import CheckoutSteps from "./CheckoutSteps";

import {
    useStripe,
    useElements,
    CardNumberElement,
    CardExpiryElement,
    CardCvcElement
  } from '@stripe/react-stripe-js';

const options = {
    style: {
        base: {
            fontSize: '16px'
        },
        invalid :{
            color: '#9e2146'
        }
    }
}
  

const Payment = () => {

    const stripe = useStripe();
    const elements = useElements();
    const alert = useAlert();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {user} = useSelector(state => state.auth);
    const {shippingInfo, cartItems} = useSelector(state => state.cart);
    const {error} = useSelector(state => state.newOrder);
    
    useEffect(() => {

       if(error){
         alert.error(error);
         dispatch(clearErrors())
       }

    },[alert, dispatch, error]);

    const order = {
       orderItems: cartItems,
       shippingInfo
    }

    const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'));
    if (orderInfo) {
      order.itemsPrice = orderInfo.itemsPrice
      order.shippingPrice = orderInfo.shippingPrice
      order.taxPrice = orderInfo.taxPrice
      order.totalPrice = orderInfo.totalPrice
   }

    const paymentData = {
        amount: Math.round(orderInfo.totalPrice * 100)
    }
    const submitHandler = async(e)=>{
        e.preventDefault();
        document.querySelector('#pay_btn').disabled  = true;
     
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }

            const {data} = await axios.post('/api/v1/payment/process', paymentData, config);
            const clientSecret = data.client_secret;

            if(!stripe && !elements){
                return;
            }

            const paymentResult = await stripe.confirmCardPayment(clientSecret, {
              payment_method: {
                  card: elements.getElement(CardNumberElement),
                  billing_details: {
                    address: {
                      city: shippingInfo.city,
                      line1: shippingInfo.address,
                      postal_code: shippingInfo.postalCode,
                    },
                      name: user.name,
                      email: user.email, 
                      phone: shippingInfo.phoneNo
                  }
              }
          });


            console.log(paymentResult);

            if (paymentResult.error) {
                alert.error(paymentResult.error.message);
                document.querySelector('#pay_btn').disabled  = false;
            } else {
                if (paymentResult.paymentIntent.status === "succeeded") {
                  alert.success("Successful Transaction!");
                  order.paymentInfo={
                    id: paymentResult.paymentIntent.id,
                    status: paymentResult.paymentIntent.status
                  }
                  dispatch(createOrder(order))
                  navigate('/success');
                }else{
                    alert.error("There is some issue while payment processing!")
                }
            }

        } catch (error) {
            document.querySelector('#pay_btn').disabled  = false;
            alert.error(error.message)
        }
    }
 
    return (
        <>
            <MetaData title="Confirm Order" />
            <CheckoutSteps shipping confirmOrder payment/>

            <div className="row wrapper">
		<div className="col-10 col-lg-5">
            <form className="shadow-lg" onSubmit={submitHandler}>
                <h1 className="mb-4">Card Info</h1>
                <div className="form-group">
                  <label htmlFor="card_num_field">Card Number</label>
                  <CardNumberElement
                    type="text"
                    id="card_num_field"
                    className="form-control"
                    options={options}
                    
                  />
                </div>
				
				<div className="form-group">
                  <label htmlFor="card_exp_field">Card Expiry</label>
                  <CardExpiryElement
                    type="text"
                    id="card_exp_field"
                    className="form-control"
                    options={options}
                  />
                </div>
				
				<div className="form-group">
                  <label htmlFor="card_cvc_field">Card CVC</label>
                  <CardCvcElement
                    type="password"
                    id="card_cvc_field"
                    className="form-control"
                    options={options}
                  />
                </div>
      
            
                <button
                  id="pay_btn"
                  type="submit"
                  className="btn btn-block py-3"
                >
                  Pay - ${`${orderInfo && orderInfo.totalPrice}`}
                </button>
    
              </form>
			  </div>
        </div>
        </>
    )
}

export default Payment
