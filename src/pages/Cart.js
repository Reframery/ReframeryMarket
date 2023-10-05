import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { useMatch, useNavigate } from "react-router";
import { deleteUser, getUser, signout, updateUser, updateUserImage } from "../actions/userActions";
import SideBar from "components/SideBar";
import AdminSideBar from "components/AdminSidebar";
import Footer from 'components/Footer'
import CartCard from "components/CartCard";
import axios from "commons/axios";
import CartSum from "components/CartSum";
import { toast } from "react-toastify";

// import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input/input'
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import userEvent from "@testing-library/user-event";
import { getItem } from "actions/itemActions";
import { isAdmin } from "commons/auth";
import { getCart } from "actions/cartActions";



const Cart = () => {
    const dispatch = useDispatch();
    // get sign in user token
    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;
    
    // get sign in user detail informaton
    const userGet = useSelector(state => state.userGet);
    const { loading, error, user } = userGet;

    const cartGet = useSelector(state => state.getCart);
    const { loading: loadingCart, cart } = cartGet;

    useEffect(() => {
        dispatch(getUser(userInfo.email));
        dispatch(getCart());
    }, [dispatch, userInfo]);
    
    // function to update amount (after receiving calls from the CartCard component)
    const updateAmount = (id, _amount) => {
        // update the amount
        user.shoppingCart.forEach(item => {
            if(item.id === id){
                item.amount = _amount;
            }
        });
      
        // put the new cart to the backend
        axios.put("/users/"+user.id, user).then(res => {
            // Prompt the user for success
            toast.success("Item Amount Changed Successfully!");
            // rerender the page
           window.location.reload();
        })
    }

    // function to delete an item from the shopping cart (after receiving calls from the CartCard component)
    const deleteItem = (id) => {
        // delete the item
        const _cart = [];
        user.shoppingCart.forEach(item => {
            if (item.id !== id){
                _cart.push(item)
            }
        })
        user.shoppingCart = _cart;
        
        // put the new cart to the backend
        axios.put("/users/"+user.id, user).then(res => {
            // rerender the page
            window.location.reload();
        })
    }

    return (
    <div>
        {loading || loadingCart ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
                <div className="container cart">
                    <div className="columns">
                        <div className="column is-one-quarter">
                            {isAdmin(userInfo)? <AdminSideBar /> : <SideBar/>} 
                        </div>

                        <div className="column　is-half cart-body">
                            <h1 className="title is-1">Shopping Cart</h1>
                            <progress className="progress" value="25" max="100">25%</progress>       
                        </div>
                        <div>
                            {cart.map((item) => ( 
                                <p>{item.id}</p>
                            ))}
                        </div>
                    </div>
                </div>
        )}
        <Footer />
        </div>
  
  
    )
}

export default Cart;