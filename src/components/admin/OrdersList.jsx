import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux';
import {Link, useNavigate} from 'react-router-dom';
import { MDBDataTable } from 'mdbreact'

// layout
import Loader from "../layout/Loader";
import MetaData from "../layout/MetaData";

import Sidebar from './Sidebar'

import {useAlert} from 'react-alert';

// fundctions
import {allOrders, deleteOrder, clearErrors} from '../../actions/orderActions';

// Types
import {DELETE_ORDER_RESET} from '../../constants/orderConstants';

const OrdersList = () => {

    const alert = useAlert();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {loading, error, orders} = useSelector(state => state.allOrders);
    const { isDeleted, error:deleteError } = useSelector(state => state.updateDeleteOrder)

    useEffect( ()=>{
        dispatch(allOrders());

        if(error) {
            alert.error(error)
            dispatch(clearErrors())
        }

        if(deleteError) {
            alert.error(deleteError)
            dispatch(clearErrors())
        }

        if(isDeleted){
            alert.success("Order Deleted Successfully!");
            navigate('/admin/orders')
            dispatch({
                type: 'DELETE_ORDER_RESET'
            })
        }

    }, [dispatch, alert, error,  navigate, deleteError, isDeleted])



    const setOrders = ()=>{
        const data = {
            columns: [
                {
                    label: 'OrderID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Date',
                    field: 'date',
                    sort: 'asc'
                },
                {
                    label: 'No. of Items',
                    field: 'numOfItems',
                    sort: 'asc'
                },
                {
                    label: 'Amount',
                    field: 'amount',
                    sort: 'asc'
                },
                {
                    label: 'Status',
                    field: 'status',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                },
            ],
            rows: []
        }

        orders.forEach(order => {
            data.rows.push({
                id: order._id,
                date : order.createdAt.split('T')[0],
                numOfItems: order.orderItems.length,
                amount: `$${order.totalPrice}`,
                status: order.orderStatus && String(order.orderStatus).includes('Delivered')
                 ? <p style={{color: 'green'}}>{order.orderStatus}</p>
                 : <p style={{color: 'red'}}>{order.orderStatus}</p>,
                actions: <>
                 <Link to={`/admin/order/${order._id}`} className="btn btn-primary py-1 px-2 mr-1">
                        <i className="fa fa-eye"></i>
                </Link>
                <button className="btn btn-danger py-1 px-2 mr-1" onClick={()=>deleteOrderHandler(order._id)}>
                    <i className="fa fa-trash"></i>
                </button>
                </>
            })
        })
    
        return data;
    }

    const deleteOrderHandler = (id) => {
        dispatch(deleteOrder(id));
    }

    return (
        <>
            <MetaData title="All Orders" />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                   <h1 className="my-5">All Orders</h1>
                   {loading ? <Loader /> : (
                   <MDBDataTable
                        data={setOrders()}
                        entriesOptions={[5, 10, 15, 20, 50, 100, 500,1000]}
                        className="px-3"
                        bordered
                        striped
                        hover      
            />
        )}
                </div>
            </div>
        </>
    )
}

export default OrdersList;
