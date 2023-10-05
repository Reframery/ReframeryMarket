import React, { useEffect, useLayoutEffect,  } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import { useSelector, useDispatch } from 'react-redux';
import { signout } from '../actions/userActions'
import { getUser } from "../actions/userActions";
import { isAdmin } from "commons/auth"

export default function Header(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentPath = window.location.pathname;
  const { community } = props;
  // console.log(cartNum); 

  const userSignin = useSelector(state => state.userSignin);
  const { userInfo } = userSignin;

  const userCommunity = (userInfo? userInfo.marketProfile.communityName : community);

  const username =  (userInfo ? userInfo.marketProfile.username : "")

  const signoutHandler = () => {
    const r = window.confirm("Do you want to Sign Out?");
    if (r) {
      dispatch(signout());
      navigate('/');
      window.location.reload();
    }
  }

  return (
    <header >
      <div className="header-container">
        <div className="navbar-logo">
          <Link to="/"><img className="logo" src="/images/logo.png" alt="logo" width="50"></img ></Link>
        </div>
        <div className="navbar-start">
          <Link to={"/" + userCommunity} className="link"> <span className="nav-item link">Home</span></Link>
          <Link to="/about"> <span className="nav-item link">About</span></Link>
          <Link to="/contact"> <span className="nav-item link">Contact</span></Link>
        </div>
        <div className="navbar-search">
          <SearchBar community={userCommunity}/>
        </div>

        <div className="navbar-end">
          {/* if the user sign in, then show the user name, else show the link of sign in */}
          {
            userInfo ? (
              <div className="dropdown">
                {
                  isAdmin(userInfo) ?
                    (
                      <Link to="/admin" className="nav-item">{username} <i className="fa fa-caret-down"></i></Link>
                    ) : (
                      <Link to={"/" + userCommunity +"/products"}  className="nav-item">{username} <i className="fa fa-caret-down"></i></Link>)
                }
                <ul className="dropdown-content" >
                  <Link className="link" to={currentPath} onClick={signoutHandler}>Sign out</Link>
                </ul>
              </div>
            ) : (
                <div>
                  <Link to="/signin">
                    <span className="nav-item link">Signin</span>
                  </Link>
                  <Link to="/register">
                    <span className="nav-item link">Register</span>
                  </Link>
                  {/* <Link to="/cart">
              <span className="nav-item link">Cart({cartNum})</span>
            </Link> */}
                </div>

              )}
        </div>
      </div>
    </header>
  );
}
