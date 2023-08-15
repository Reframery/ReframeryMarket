import { signout } from "actions/userActions";
import React from "react";
import cart from "img/cart.png";
import logo from "img/logo.png";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

export default function SideBar() {
  const currentPath = window.location.pathname;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const signoutHandler = () => {
    const r = window.confirm("Do you want to Sign Out?");
    if (r) {
      dispatch(signout());
      navigate('/');
      window.location.reload();
    }
  }

  return (
    <div className="sidebar-container">
      <div className="sidebar">
        <div className="sidebar-logo">
          <Link className="link" to="/">
            <img src={logo} alt="sidebar logo" />
          </Link>
          <Link className="link" to="/"> <h2 className="is-size-5">Marketplace</h2></Link>
        </div>

        <p className="menu-label"><i className="fas fa-id-card"></i> <strong>Account</strong> </p>
        <ul className="menu-list">
          <li><Link className="link" to="/my-profile">My Profile</Link></li>
          <li><Link className="link" to={currentPath} onClick={signoutHandler}>Sign Out</Link></li>
        </ul>

        <p className="menu-label">
          <i className="fas fa-wallet"></i>
          <strong>Wallet</strong>
        </p>

        <ul className="menu-list">
          <li><Link className="link" to="/my-wallet" >My wallet</Link></li>
        </ul>


        <p className="menu-label">
          <i className="fas fa-history"></i>
          <strong>History</strong>
        </p>

        <ul className="menu-list">
          <li><Link className="link" to="/purchase-history">Purchase</Link></li>
          <li><Link className="link" to="/sales-history">Sales</Link></li>
        </ul>

        <p className="menu-label">
          <i className="fas fa-list-alt"></i>
          <strong>My Items</strong>
        </p>

        <ul className="menu-list">
          <li><Link className="link" to="/my-item">Items</Link></li>
          <li><Link className="link" to="/create-item">Create Item</Link></li>
        </ul>

        <div className="cart-icon">
          <img src={cart} alt="shopping cart icon" />
          <div > <Link className="link" to="/cart">MY CART</Link></div>
        </div>

      </div>
    </div>
  );
}
