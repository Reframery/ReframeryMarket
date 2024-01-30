import type { PayloadAction } from "@reduxjs/toolkit"
import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_FAIL,
  ORDER_CREATE_SUCCESS,
  ORDER_UPDATE_REQUEST,
  ORDER_UPDATE_SUCCESS,
  ORDER_UPDATE_FAIL,
  ORDER_GET_REQUEST,
  ORDER_GET_SUCCESS,
  ORDER_GET_FAIL,
  GET_BUYER_ORDERS_REQUEST,
  GET_BUYER_ORDERS_SUCCESS,
  GET_BUYER_ORDERS_FAIL,
  GET_SELLER_ORDERS_REQUEST,
  GET_SELLER_ORDERS_SUCCESS,
  GET_SELLER_ORDERS_FAIL,
} from "../constants/orderConstants"

// create an order with given attributes
export const createOrderReducer = (state = {}, action: PayloadAction) => {
  switch (action.type) {
    case ORDER_CREATE_REQUEST:
      return { loading: true, error: "requesting" }
    case ORDER_CREATE_SUCCESS:
      return { loading: false, order: action.payload, error: "sucess" }
    case ORDER_CREATE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

// update order object with ID
export const patchOrderReducer = (state = { loading: true }, action: PayloadAction) => {
  switch (action.type) {
    case ORDER_UPDATE_REQUEST:
      return { loading: true }
    case ORDER_UPDATE_SUCCESS:
      return { loading: false, order: action.payload }
    case ORDER_UPDATE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

// function to get order details with ID
export const getOrderReducer = (
  state = { loading: true, order: {} },
  action: PayloadAction
) => {
  switch (action.type) {
    case ORDER_GET_REQUEST:
      return { loading: true }
    case ORDER_GET_SUCCESS:
      return {
        loading: false,
        order: action.payload,
      }
    case ORDER_GET_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

// function to get a list of order objects that are all from buyer
export const getOrdersOfBuyerReducer = (
  state = { loading: true, orders: [] },
  action: PayloadAction
) => {
  switch (action.type) {
    case GET_BUYER_ORDERS_REQUEST:
      return { loading: true }
    case GET_BUYER_ORDERS_SUCCESS:
      return {
        loading: false,
        orders: action.payload,
      }
    case GET_BUYER_ORDERS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

// function to get a list of order objects that are all to seller
export const getOrdersOfSellerReducer = (
  state = { loading: true, orders: [] },
  action: PayloadAction
) => {
  switch (action.type) {
    case GET_SELLER_ORDERS_REQUEST:
      return { loading: true }
    case GET_SELLER_ORDERS_SUCCESS:
      return {
        loading: false,
        orders: action.payload,
      }
    case GET_SELLER_ORDERS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
