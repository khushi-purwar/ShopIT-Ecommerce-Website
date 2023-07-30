import React ,{useEffect, useState} from 'react';
import {BrowserRouter, Route, Routes, Switch} from 'react-router-dom'
import {useSelector} from 'react-redux';

// components
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import NotFound from './components/layout/NotFound';


import Home from './components/Home';
import CategoryWise from './components/Category/CategoryWise'
import ProductDetail from './components/product/ProductDetails'

import Login from './components/user/Login';
import Register from './components/user/Register'
import Profile from './components/user/Profile';
import UpdateProfile from './components/user/UpdateProfile';
import UpdatePassword from './components/user/UpdatePassword';
import ForgotPassword from './components/user/ForgotPassword';
import NewPassword from './components/user/NewPassword';

// cart imports
import Cart from './components/cart/Cart';
import Shipping from './components/cart/Shipping';
import ConfirmOrder from './components/cart/ConfirmOrder'
import Payment from './components/cart/Payment';
import OrderSuccess from './components/cart/OrderSuccess';
import ProtectedRoute from './components/route/ProtectedRoute';

// order imports
import ListOrders from './components/order/ListOrders';
import OrderDetails from './components/order/OrderDetails';

// admin imports
import Dashboard from './components/admin/Dashboard';
import ProductsLists from './components/admin/ProductsLists';
import NewProduct from './components/admin/NewProduct';
import UpdateProduct from './components/admin/UpdateProduct';
import OrdersList from './components/admin/OrdersList';
import ProcessOrder from './components/admin/ProcessOrder';
import UsersList from './components/admin/UsersList';
import UpdateUser from './components/admin/UpdateUser';
import ProductReview from './components/admin/ProductReview';

// store
import store from './store';
import axios from 'axios';

// stripe --------------------------------
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

// functions
import { loadUser, clearErrors } from './actions/authActions';
import Category from './components/Category/CategoryWise';

function App() {

  const [stripeApiKey, setStripeApiKey] = useState('');

  useEffect(()=>{
    store.dispatch(loadUser());
    
    async function getStripeApiKey() {
      const {data} = await axios.get('/api/v1/stripeapi');
      setStripeApiKey(data.stripeAPIKey)
    }

    getStripeApiKey();

    
    
  } , [])

  const {loading, user, isAuthenticated} = useSelector(state => state.auth)
  return (
    <BrowserRouter>
    <div className="App">

       <Header /> 
        <Routes>
            <Route path="/" exact element={<Home />}/>
        </Routes>
    
       <div className="container ">
        
          <Routes> 
            <Route path="/category/:category" exact element={<CategoryWise />}/>
            <Route path="/search/:keyword" exact element={<Home />}/>
            <Route path="/product/:id" exact element={<ProductDetail />}/>
            <Route path="/login" exact element={<Login />}/>
            <Route path="/register" exact element={<Register />}/>
            <Route path="/me" exact element={
              <ProtectedRoute> 
                <Profile /> 
              </ProtectedRoute>
            }/>
            <Route path="/me/update" exact element={
              <ProtectedRoute> 
                <UpdateProfile /> 
              </ProtectedRoute>
            }/>
            <Route path="/password/update" exact element={
              <ProtectedRoute> 
                <UpdatePassword /> 
              </ProtectedRoute>
            }/>
              <Route path="/password/forgot" exact element={
                <ForgotPassword /> 
              }/>
              <Route path="/password/reset/:token" exact element={<NewPassword /> }/>
              <Route path="/cart" exact element={<Cart /> }/>

              <Route path="/shipping" exact element={
              <ProtectedRoute> 
                <Shipping /> 
              </ProtectedRoute>
            }/>

              <Route path="/confirm" exact element={
              <ProtectedRoute> 
                <ConfirmOrder /> 
              </ProtectedRoute>
              }/>

              {stripeApiKey &&
              <Route path="/payment" exact element={ 
                <Elements stripe={loadStripe(stripeApiKey)}>
                    <ProtectedRoute> 
                      <Payment /> 
                    </ProtectedRoute>
                </Elements>
              }/> 
              }

            <Route path="/success" exact element={
              <ProtectedRoute> 
                <OrderSuccess /> 
              </ProtectedRoute>
              }/>

            <Route path="/orders/me" exact element={
                <ProtectedRoute> 
                  <ListOrders /> 
                </ProtectedRoute>
            }/>

            <Route path="/order/:id" exact element={
                <ProtectedRoute> 
                  <OrderDetails /> 
                </ProtectedRoute>
            }/>
           
          </Routes>
       
        </div>
      
        <Routes>
          <Route path="/dashboard" exact isAdmin={true} element={
              <ProtectedRoute> 
                <Dashboard /> 
              </ProtectedRoute>
            }/>
          <Route path="/admin/products" exact isAdmin={true} element={
            <ProtectedRoute> 
              <ProductsLists /> 
            </ProtectedRoute>
          }/>
            <Route path="/admin/new" exact isAdmin={true} element={
            <ProtectedRoute> 
              <NewProduct /> 
            </ProtectedRoute>
          }/>
          <Route path="/admin/product/:id" exact isAdmin={true} element={
            <ProtectedRoute> 
              <UpdateProduct /> 
            </ProtectedRoute>
          }/>

          <Route path="/admin/orders" exact isAdmin={true} element={
            <ProtectedRoute> 
              <OrdersList /> 
            </ProtectedRoute>
          }/>

          <Route path="/admin/order/:id" exact isAdmin={true} element={
            <ProtectedRoute> 
              <ProcessOrder /> 
            </ProtectedRoute>
          }/>

         <Route path="/admin/users" exact isAdmin={true} element={
            <ProtectedRoute> 
              <UsersList /> 
            </ProtectedRoute>
          }/>

        <Route path="/admin/user/:id" exact isAdmin={true} element={
            <ProtectedRoute> 
              <UpdateUser /> 
            </ProtectedRoute>
          }/>

           <Route path="/admin/reviews" exact isAdmin={true} element={
            <ProtectedRoute> 
              <ProductReview /> 
            </ProtectedRoute>
          }/>

        
        
        </Routes>
       
       {/* {!loading && (!isAuthenticated || user.role !== 'Admin') && (
          <Footer />
        )} */}
         <Footer />
     
    </div>
    </BrowserRouter>
  );
}

export default App;
