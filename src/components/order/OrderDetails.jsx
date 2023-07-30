import React, {useEffect} from "react";
import { useSelector , useDispatch} from "react-redux";
import { useParams } from "react-router-dom";
import {Link, useNavigate} from 'react-router-dom';
import {useAlert} from 'react-alert';
 
// layout
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader";

// functions
import {getOrderDetails, clearErrors} from '../../actions/orderActions';


const OrderDetails = () => {

    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();
    const {id} = useParams();

    const {loading, error, order} = useSelector(state => state.orderDetails);

    useEffect(() => {
        dispatch(getOrderDetails(id));

        if(error) {
            alert.error(error.message);
            dispatch(clearErrors())
        }

    }, [dispatch, alert, navigate, error, id]);

    // const isPaid = order.paymentInfo && order.paymentInfo.status === 'succeeded' ? true : false;

    return (
        <>
           <MetaData title="Order Details" />

           {loading? <Loader/> : (
               <>
                <div className="row d-flex justify-content-between">
                    <div className="col-12 col-lg-8 mt-5 order-details">

                        <h1 className="my-5">Order #{order._id}</h1>

                        <h4 className="mb-4">Shipping Info</h4>
                        <p><b>Name: </b>{order.user && order.user.name}</p>
                        <p><b>Email: </b>{order.user && order.user.email}</p>
                        <p><b>Phone Number: </b>{order.shippingInfo && order.shippingInfo.phoneNo}</p>
                        <p className="mb-4"><b>Address: </b>
                        {order.shippingInfo && `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.postalCode}, ${order.shippingInfo.country}`}
                        </p>

                        <hr />

                        <h4 className="my-4">Payment Status:</h4>
                        <p className={(order.paymentInfo && order.paymentInfo.status === 'succeeded'  ? "greenColor": "redColor")} ><b>{order.paymentInfo && order.paymentInfo.status === 'succeeded' ? "PAID": "NOT PAID"}</b></p>
                        <p><b>Amount:</b> ${order.totalPrice} </p>


                        <h4 className="my-4">Order Status:</h4>
                        <p className={order.orderStatus && String(order.orderStatus).includes('Delivered') ? "greenColor" : "redColor"}><b>{order.orderStatus}</b></p>


                        <h4 className="my-4">Order Items:</h4>
                        <hr />
                        {order.orderItems && order.orderItems.map((item)=> (
                                                 
                        <div className="cart-item my-1">
                            <div className="row my-5">
                                <div className="col-4 col-lg-2">
                                    <img src={item.image} alt="Laptop" height="45" width="65" />
                                </div>

                                <div className="col-5 col-lg-5">
                                    <Link to= {`/product/${item.productId}`} style={{"textDecoration": "none"}}>{item.name}</Link>
                                </div>

                                <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                                    <p>${item.price}</p>
                                </div>

                                <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                                    <p>{item.quantity} Piece(s)</p>
                                </div>
                            </div>
                        </div>
                      
                          
                        ))}
                        <hr />


                    </div>
                </div>
               </>
           )}
           
        </>
    )
}

export default OrderDetails;
