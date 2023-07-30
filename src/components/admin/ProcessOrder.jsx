import React, {useEffect, useState} from "react";
import { useSelector , useDispatch} from "react-redux";
import { useParams } from "react-router-dom";
import {Link} from 'react-router-dom';
import {useAlert} from 'react-alert';
 
// layout
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader";
import Sidebar from "../admin/Sidebar";

// functions
import {getOrderDetails, updateOrder, clearErrors} from '../../actions/orderActions';

// Types
import {UPDATE_ORDER_RESET} from '../../constants/orderConstants';

const ProcessOrder = () => {

    const dispatch = useDispatch();
    const alert = useAlert();
    const {id} = useParams();

    const { loading, order={}} = useSelector(state => state.orderDetails);
    const { error, isUpdated} = useSelector(state => state.updateDeleteOrder);

    const[status, setStatus] =  useState(order.orderStatus);

    useEffect(() => {
        dispatch(getOrderDetails(id));

        if(error) {
            alert.error(error.message);
            dispatch(clearErrors())
        }

        if(isUpdated){
            alert.success("Order Updated Successfully!");
            dispatch({
                type: 'UPDATE_ORDER_RESET'
            })
        }

    } ,[id, dispatch, error, isUpdated, alert])

    const updatedOrderHandler = (e)=>{
        e.preventDefault();
        const formData = new FormData();
        formData.set('status', status);

        dispatch(updateOrder(id, formData));
    }

    return (
        <>
            <MetaData title={`Process Order #${id}`} />
        <div className="row">
            <div className="col-12 col-md-2">
                <Sidebar />
            </div>

            <div className="col-12 col-md-10">
            {loading ? <Loader/> : (
                <div className="row d-flex justify-content-around">
                <div className="col-12 col-lg-7 order-details">

                    <h2 className="my-5">Order #{id}</h2>

                    <h4 className="mb-4">Shipping Info</h4>
                    <p><b>Name:</b> {order.user && order.user.name}</p>
                    <p><b>Email:</b> {order.user && order.user.email}</p>
                    <p><b>Phone:</b> {order.shippingInfo&&order.shippingInfo.phoneNo}</p>
                    <p className="mb-4"><b>Address: </b>
                        {order.shippingInfo && `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.postalCode}, ${order.shippingInfo.country}`}
                    </p>
                   
                    <hr />

                    <h4 className="my-4">Payment</h4>
            
       <p className={(order.paymentInfo && order.paymentInfo.status === 'succeeded'  ? "greenColor": "redColor")} > <b style={{color: 'black'}}>Status: </b> <b>{order.paymentInfo && order.paymentInfo.status === 'succeeded' ? "PAID": "NOT PAID"}</b></p>
                  <p><b>Amount:</b> ${order.totalPrice} </p>

                    <h4 className="my-4">Stripe ID</h4>
                    <p className="greenColor"><b>{order.paymentInfo && order.paymentInfo.id}</b></p>


                    <h4 className="my-4">Order Status</h4>
                    <p className={order.orderStatus && String(order.orderStatus).includes('Delivered') ? "greenColor" : "redColor"}><b>{order.orderStatus}</b></p>

                   {order.orderStatus && String(order.orderStatus).includes('Delivered') && (
                       <>
                       <h4 className="my-4">Delivered At</h4>
                       <p>{order.deliveredAt}</p>
                       </>
                   ) }

                    <h4 className="my-4">Order Items</h4>

                    <hr />
                    {order.orderItems && order.orderItems.map((item)=> (
                    <div className="cart-item my-1">
                                <div className="row my-5">
                                    <div className="col-4 col-lg-2">
                                        <img src={item.image} alt={item.name} height="45" width="65" />
                                    </div>

                                    <div className="col-5 col-lg-5">
                                        <Link to={`/product/${item.productId}`} style={{textDecoration: "none"}}>{item.name}</Link>
                                    </div>


                                    <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                                        <p>${item.price}</p>
                                    </div>

                                    <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                                        <p>{ item.quantity} Piece(s)</p>
                                    </div>
                                </div>
                    </div>
                    ))}

                    <hr />
                </div>
                
                <div className="col-12 col-lg-3 mt-5">
                                <h4 className="my-4">Status</h4>

                                <div className="form-group">
                                    <select
                                        className="form-control"
                                        name='status'
                                        value={status}
                                        onChange={(e) => setStatus(e.target.value)}
                                    >
                                        <option value="Processing">Processing</option>
                                        <option value="Shipped">Shipped</option>
                                        <option value="Delivered">Delivered</option>
                                    </select>
                                </div>

                                <button className="btn btn-primary btn-block" onClick={updatedOrderHandler}>
                                    Update Status
                            </button>
                            </div>
                
            </div>
            )}
    
            </div>
        </div>
        </>
    )
}

export default ProcessOrder;
