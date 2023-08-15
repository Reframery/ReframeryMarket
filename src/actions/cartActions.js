import Axios from "axios";

import {
    REMOVE_FROM_CART_REQUEST,
    REMOVE_FROM_CART_SUCCESS,
    REMOVE_FROM_CART_FAIL,
    EDIT_NUMBER_IN_CART_REQUEST,
    EDIT_NUMBER_IN_CART_SUCCESS,
    EDIT_NUMBER_IN_CART_FAIL,
    ADD_ITEMS_LIST_TO_CART_REQUEST,
    ADD_ITEMS_LIST_TO_CART_SUCCESS,
    ADD_ITEMS_LIST_TO_CART_FAIL,
    CREATE_CART_REQUEST,
    CREATE_CART_SUCCESS,
    CREATE_CART_FAIL,
    GET_CART_NUMBER_REQUEST,
    GET_CART_NUMBER_SUCCESS,
    GET_CART_NUMBER_FAIL,
    GET_CARTS_REQUEST,
    GET_CARTS_SUCCESS,
    GET_CARTS_FAIL,
    GET_CART_REQUEST,
    GET_CART_SUCCESS,
    GET_CART_FAIL,
    DELETE_CART_REQUEST,
    DELETE_CART_SUCCESS,
    DELETE_CART_FAIL

} from "constants/cartConstants";

Axios.defaults.auth = {
    username: 'access_key_admin',
    password: 'secret_key_hush',
  };

// create a shopping cart
export const createCart = (userEmail, cartName) => async (dispatch) => {
    dispatch({ type: CREATE_CART_REQUEST, payload: {userEmail, cartName}});
    try{
        const { data } = await Axios.post("/carts/createCart", {userEmail, cartName});
        console.log(data);
        dispatch({ type: CREATE_CART_SUCCESS, payload: data});
    }catch(error){
        dispatch({
            type: CREATE_CART_FAIL, payload:
                error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
}

// delete a shopping cart
export const deleteCart = (cartID) => async (dispatch) => {
    dispatch({ type: DELETE_CART_REQUEST, payload: {cartID}});
    try{
        const { data } = await Axios.delete(`/carts/deleteCart/${cartID}`);
        dispatch({ type: DELETE_CART_SUCCESS, payload: data});
    }catch(error){
        dispatch({
            type: DELETE_CART_FAIL, payload:
                error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
}

// get a cart details 
export const getCart = (cartID) => async (dispatch) => {
    dispatch({ type: GET_CART_REQUEST, payload: cartID });
    try {
        const { data } = await Axios.get(`/carts/getCart/${cartID}`);
        dispatch({ type: GET_CARTS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: GET_CART_FAIL, payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        });
    }
};

// get all the carts of the user
export const getUserCarts = (userEmail) => async (dispatch) => {
    dispatch({ type: GET_CARTS_REQUEST, payload: userEmail});
    try{
        const { data } = await Axios.get(`/carts/getUserCarts/${userEmail}`);
        dispatch({ type: GET_CART_SUCCESS, payload: data });
    }catch(error){
        dispatch({
            type: GET_CARTS_FAIL, payload:
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}

// get the numbet of carts owned by the user
export const numOfCartsForUser = (userEmail) => async (dispatch) => {
    dispatch({ type: GET_CART_NUMBER_REQUEST, payload: userEmail});
    try{
        const { data } = await Axios.get(`/carts/numOfCartsForUser/${userEmail}`);
        dispatch({ type: GET_CART_NUMBER_SUCCESS, payload: data });
    }catch(error){
        dispatch({
            type: GET_CART_NUMBER_FAIL, payload:
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}

// add a list of items with counts to the shopping cart
export const addItemsToCart = (cartID, itemList) => async (dispatch) => {
    dispatch({ type: ADD_ITEMS_LIST_TO_CART_REQUEST, payload: {cartID, itemList}});
    try{
        const { data } = await Axios.patch(`/carts/addItemsToCart/${cartID}`, {itemList});
        dispatch({ type: ADD_ITEMS_LIST_TO_CART_SUCCESS, payload: data });
    }catch(error){
        dispatch({
            type: ADD_ITEMS_LIST_TO_CART_FAIL, payload:
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}

// Function: update an item's count in a cart
export const updateItemCount = (cartID, itemID, count) => async (dispatch) => {
    dispatch({ type: EDIT_NUMBER_IN_CART_REQUEST, payload: {cartID, itemID, count}});
    try{
        const { data } = await Axios.patch(`/carts/updateItemCount/${cartID}-${itemID}-${count}`, { cartID, itemID, count });
        dispatch({ type: EDIT_NUMBER_IN_CART_SUCCESS, payload: data });
    }catch(error){
        dispatch({
            type: EDIT_NUMBER_IN_CART_FAIL, payload:
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}

// Function: delete an item from a cart
export const deleteItemFromCart = (cartID, itemID) => async (dispatch) => {
    dispatch({ type: REMOVE_FROM_CART_REQUEST, payload: {cartID, itemID}});
    try{
        const { data } = await Axios.patch(`/carts/deleteItemFromCart/${cartID}-${itemID}`, { cartID, itemID });
        dispatch({ type: REMOVE_FROM_CART_SUCCESS, payload: data });
    }catch(error){
        dispatch({
            type: REMOVE_FROM_CART_FAIL, payload:
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}