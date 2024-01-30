import { handleErrorPayload } from "lib/utils"
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
  GET_CART_REQUEST,
  GET_CART_SUCCESS,
  GET_CART_FAIL,
} from "redux/constants/cartConstants"

import {
  GetCart,
  AddItemToCart,
  DeleteItemFromCart,
  UpdateItemQuantity,
} from "api/cart"

import type { Dispatch } from "redux"

// get a cart details
export const getCart = () => async (dispatch: Dispatch) => {
  dispatch({ type: GET_CART_REQUEST })
  try {
    const data = await GetCart()
    dispatch({ type: GET_CART_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: GET_CART_FAIL,
      payload: handleErrorPayload(error),
    })
  }
}

// add a list of items with counts to the shopping cart
export const addItemToCart =
  (itemId: number, quantity: number) => async (dispatch: Dispatch) => {
    dispatch({ type: ADD_ITEMS_LIST_TO_CART_REQUEST })
    try {
      const data = await AddItemToCart({ itemId, quantity })
      dispatch({ type: ADD_ITEMS_LIST_TO_CART_SUCCESS, payload: data })
    } catch (error) {
      dispatch({
        type: ADD_ITEMS_LIST_TO_CART_FAIL,
        payload: handleErrorPayload(error),
      })
    }
  }

// Function: update an item's count in a cart
export const updateItemCount =
  (cartId: number, _: number, quantity: number) =>
  async (dispatch: Dispatch) => {
    dispatch({ type: EDIT_NUMBER_IN_CART_REQUEST })
    try {
      const data = await UpdateItemQuantity({cartId, quantity})
      dispatch({ type: EDIT_NUMBER_IN_CART_SUCCESS, payload: data })
    } catch (error) {
      dispatch({
        type: EDIT_NUMBER_IN_CART_FAIL,
        payload: handleErrorPayload(error),
      })
    }
  }

// Function: delete an item from a cart previously passed cartID and itemID
export const deleteItemFromCart =
  (cartID: number) => async (dispatch: Dispatch) => {
    dispatch({ type: REMOVE_FROM_CART_REQUEST })
    try {
      const data = await DeleteItemFromCart(cartID)
      dispatch({ type: REMOVE_FROM_CART_SUCCESS, payload: data })
    } catch (error) {
      dispatch({
        type: REMOVE_FROM_CART_FAIL,
        payload: handleErrorPayload(error),
      })
    }
  }

// TODO: Admin gets user's cart
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
