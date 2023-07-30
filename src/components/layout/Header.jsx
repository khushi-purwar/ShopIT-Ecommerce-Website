import React from "react";
import { Link} from "react-router-dom";

import "../../App.css";

import Search from "../layout/Search";

import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";

// functions
import { logout } from "../../actions/authActions";

const Header = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { user, loading } = useSelector((state) => state.auth);
  const {cartItems} = useSelector((state) => state.cart);

  const logoutHandler = () =>{
    dispatch(logout());
    alert.success('Logged out Successfully!')
  }
  return (
    <>
      <nav className="navbar row ">
        <div className="col-12 col-md-3">
          <div className="navbar-brand">
            <Link to="/">
            <img src="/images/shopit_logo.png" alt="logo" />
            </Link>
          </div>
        </div>

        <div className="col-12 col-md-6 mt-2 mt-md-0">
          <Search />
        </div>

        <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
          <Link to="/cart" style={{ textDecoration: "none" }}>
            <span id="cart" className="ml-3">
              <i className="fa fa-shopping-cart"></i>
            </span>
            <span className="" id="cart_count">
              {cartItems.length}
            </span>
          </Link>
          {user ? (
            <div className="ml-3 dropdown d-inline">
              <Link
                to="#!"
                className="btn dropdown-toggle text-white mr-4"
                type="button"
                id="dropDownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <figure className="avatar avatar-nav">
                  <img
                    src={user.avatar && user.avatar.url}
                    alt={user && user.name}
                    className="rounded-circle"
                  />
                </figure>
                <span>{user && user.name}</span>

              </Link>

              <div className="dropdown-menu mt-3 ml-3" aria-labelledby="dropDownMenuButton">
                {user && user.role === "Admin" && (
                  <Link to="/dashboard" className="dropdown-item">
                  Dashoboard
                  </Link>
                )}
                <Link to="/orders/me" className="dropdown-item">
                 My Orders
                </Link>
                <Link to="/me" className="dropdown-item">
               Profile
                </Link>
                <Link to="/" className="dropdown-item text-danger" onClick={logoutHandler}>
                Logout
                </Link>
              </div>
            </div>
          ) : (
            !loading && (
              <Link to="/login" className="btn ml-5" id="login_btn">
               <i class="fa fa-sign-in-alt"></i>Login
              </Link>
            )
          )}
        </div>
      </nav>
    </>
  );
};

export default Header;
