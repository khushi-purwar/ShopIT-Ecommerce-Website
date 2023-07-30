import React, {useEffect} from 'react'
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';

import { Doughnut, Line } from "react-chartjs-2";

// layout
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader";

// components
import Sidebar from './Sidebar';

// fundctions
import {getAdminProducts} from '../../actions/productActions';
import {allOrders} from '../../actions/orderActions';
import {getAllUsers} from '../../actions/userActions';

const Dashboard = () => {

    const dispatch = useDispatch();

    const { products } = useSelector(state => state.products)
    const {totalAmount, orders, loading} = useSelector(state => state.allOrders)
    const {users} = useSelector(state => state.allUsers)

    let outOfStock = 0;
    products.forEach(product => {
        if(product.stock === 0) {
            outOfStock++;
        }
    })

    let noOfAdmins = 0;

    users.forEach(user => {
        if(user.role === 'Admin') {
            noOfAdmins++;
        }
    })

    let deliveredOrders = 0;
    let shippedOrders = 0;

    orders && orders.forEach(order => {
        if(order.orderStatus === 'Delivered') {
            deliveredOrders++;
           
        }

        if(order.orderStatus === 'Shipped') {
            shippedOrders++;
           
        }
    })


    useEffect( ()=>{
        dispatch(getAdminProducts());
        dispatch(allOrders());
        dispatch(getAllUsers());
    }, [dispatch]);

    const lineState = {
        labels: ["Initial Amount", "Amount Earned"],
        datasets: [
          {
            label: "TOTAL AMOUNT",
            backgroundColor: ["tomato"],
            hoverBackgroundColor: ["rgb(197, 72, 49)"],
            data: [0, totalAmount],
          },
        ],
      };

      
    const doughnutOrderState = {
        labels: ["Out of Stock", "InStock"],
        datasets: [
          {
            backgroundColor: ["#F45759", "#4A9D56"],
            hoverBackgroundColor: ["#FD0105", "#067717"],
            data: [outOfStock, products.length - outOfStock],
          },
        ],
      };

      const doughnutUserRoleState = {
        labels: ["Customer", "Admin"],
        datasets: [
          {
            backgroundColor: ["#0CEFBE", "#E826C7"],
            hoverBackgroundColor: ["#18C8A2", "#BB129E"],
            data: [noOfAdmins, users.length - noOfAdmins],
          },
        ],
      };

      const doughnutDeliveredState = {
        labels: ["Delivered", "Shipping", "Processing"],
        datasets: [
          {
            backgroundColor: ["#4A9D56", "#F0F05B", "#F45759"],
            hoverBackgroundColor: ["#067717", "#F5F50A", "#FD0105"],
            data: [deliveredOrders, shippedOrders, orders && orders.length - shippedOrders-deliveredOrders],
          },
        ],
      };

    return (
        <>
        <MetaData title="Dashboard" />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <h1 className="mt-4 mb-3">Dashboard</h1>

                    {loading ? <Loader /> : (
                        <>
                         <div className="row pr-4">
                                <div className="col-xl-12 col-sm-12 mb-3">
                                    <div className="card text-white bg-primary o-hidden h-100">
                                        <div className="card-body">
                                            <div className="text-center card-font-size">Total Amount<br /> 
                                               <b>${totalAmount}</b>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row pr-4">
                                <div className="col-xl-4 col-sm-6 mb-3">
                                    <div className="card text-white bg-success o-hidden h-100">
                                        <div className="card-body">
                                            <div className="text-center card-font-size">Products<br /> 
                                                <b>{products && products.length}</b>
                                            </div>
                                        </div>
                                        <Link className="card-footer text-white clearfix small z-1" to="/admin/products">
                                            <span className="float-left">View Details</span>
                                            <span className="float-right">
                                                <i className="fa fa-angle-right"></i>
                                            </span>
                                        </Link>
                                    </div>
                                </div>


                                <div className="col-xl-4 col-sm-6 mb-3">
                                    <div className="card text-white bg-danger o-hidden h-100">
                                        <div className="card-body">
                                            <div className="text-center card-font-size">Orders<br /> 
                                              <b>{orders && orders.length}</b>
                                            </div>
                                        </div>
                                        <Link className="card-footer text-white clearfix small z-1" to="/admin/orders">
                                            <span className="float-left">View Details</span>
                                            <span className="float-right">
                                                <i className="fa fa-angle-right"></i>
                                            </span>
                                        </Link>
                                    </div>
                                </div>


                                <div className="col-xl-4 col-sm-6 mb-3">
                                    <div className="card text-white bg-info o-hidden h-100">
                                        <div className="card-body">
                                            <div className="text-center card-font-size">Users<br /> 
                                               <b>{users && users.length}</b>
                                            </div>
                                        </div>
                                        <Link className="card-footer text-white clearfix small z-1" to="/admin/users">
                                            <span className="float-left">View Details</span>
                                            <span className="float-right">
                                                <i className="fa fa-angle-right"></i>
                                            </span>
                                        </Link>
                                    </div>
                                </div>


                                {/* <div className="col-xl-3 col-sm-6 mb-3">
                                    <div className="card text-white bg-warning o-hidden h-100">
                                        <div className="card-body">
                                            <div className="text-center card-font-size">Out of Stock<br /> 
                                              <b>{outOfStock}</b>
                                            </div>
                                        </div>
                                    </div>
                                </div> */}

         
                            </div>

                            {/*  Doughnut----- */}
                                <div className="row mt-5 mr-5">
                                   <div className="col-xl-4 col-sm-6">
                                        <div className="doughnutChart pr-5">
                                            <Doughnut data={doughnutOrderState} />
                                        </div>
                                    </div>

                                  
                                    <div className="col-xl-4 col-sm-6 ">
                                        <div className="doughnutChart pr-5">
                                            <Doughnut data={doughnutDeliveredState} />
                                        </div>
                                    </div>

                                    <div className="col-xl-4 col-sm-6 ">
                                        <div className="doughnutChart pr-5">
                                            <Doughnut data={doughnutUserRoleState} />
                                        </div>
                                    </div>                                    
                                
                                </div>


                                {/* line chart */}

                                <div className="row pr-4 mt-5">
                                    <div className="col-xl-12 col-sm-12 mb-3">
                                       {/* <div className="lineChart">
                                          <Line data={lineState} />
                                        </div>  */}
                                    </div>
                                </div>

                                
                           
                        </>
                    )}
                           
                </div>
            </div>
        </>
    )
}

export default Dashboard;
