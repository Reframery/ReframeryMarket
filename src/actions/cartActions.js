import Axios from "../commons/axios";
import auth from "../commons/auth";

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
  DELETE_CART_FAIL,
} from "constants/cartConstants";

// get a cart details
export const getCart = () => async (dispatch) => {
  dispatch({ type: GET_CART_REQUEST });
  try {
    const { data } = await Axios.get(`/market/cart`, {'headers': await auth({})});
    dispatch({ type: GET_CART_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_CART_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// // TODO: Admin gets user's cart
// export const getUserCarts = (userEmail) => async (dispatch) => {
//     dispatch({ type: GET_CARTS_REQUEST, payload: userEmail});
//     try{
//         const { data } = await Axios.get(`/carts/getUserCarts/${userEmail}`);
//         dispatch({ type: GET_CART_SUCCESS, payload: data });
//     }catch(error){
//         dispatch({
//             type: GET_CARTS_FAIL, payload:
//             error.response && error.response.data.message
//                 ? error.response.data.message
//                 : error.message
//         })
//     }
// }

// add a list of items with counts to the shopping cart
export const addItemToCart = (itemId, quantity) => async (dispatch) => {
  dispatch({ type: ADD_ITEMS_LIST_TO_CART_REQUEST });
  try {
    const { data } = await Axios.post(
      `/market/cart/add`,
      { itemId, quantity },
      { headers: await auth({}) }
    );
    dispatch({ type: ADD_ITEMS_LIST_TO_CART_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ADD_ITEMS_LIST_TO_CART_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Function: update an item's count in a cart
export const updateItemCount =
  (cartID, itemID, quantity) => async (dispatch) => {
    dispatch({ type: EDIT_NUMBER_IN_CART_REQUEST });
    try {
      const { data } = await Axios.put(
        `/market/cart/update/${cartID}`,
        { quantity },
        { headers: await auth({}) }
      );
      dispatch({ type: EDIT_NUMBER_IN_CART_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: EDIT_NUMBER_IN_CART_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

// Function: delete an item from a cart
export const deleteItemFromCart = (cartID, itemID) => async (dispatch) => {
  dispatch({ type: REMOVE_FROM_CART_REQUEST });
  try {
    const { data } = await Axios.delete(`/market/cart/${cartID}`, {
      headers: await auth({})
    });
    dispatch({ type: REMOVE_FROM_CART_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: REMOVE_FROM_CART_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
