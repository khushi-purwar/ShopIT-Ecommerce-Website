import React, {useEffect} from "react";
import { useSelector , useDispatch} from "react-redux";
import {Link, useNavigate} from 'react-router-dom';
import {useAlert} from 'react-alert';
import {MDBDataTable} from 'mdbreact';
 
// layout
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader";

// functions
import {myOrders, clearErrors} from '../../actions/orderActions';

const ListOrders = () => {

    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();
    const {loading, error, orders} = useSelector(state => state.myOrders);

    useEffect(() => {
        dispatch(myOrders());

        if(error) {
            alert.error(error.message);
            dispatch(clearErrors())
        }

    }, [dispatch, alert, navigate, error]);

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
                 <Link to={`/order/${order._id}`} className="btn btn-primary py-1 px-2 mr-1">
                        <i className="fa fa-eye"></i>
                </Link>
                </>
            })
        })
    
        return data;
    }

   

    return (
        <>
         <MetaData title="My Orders" />
         <h1 className="my-5">My Orders</h1>
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
        </>
    )
}

export default ListOrders;
