import Axios from "axios"

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
} from "redux/constants/orderConstants"

import { Dispatch } from "redux"
import { handleErrorPayload } from "lib/utils"

// function to create an order with given attributes
export const createUser =
  (
    buyerEmail: string,
    sellerEmail: string,
    itemID: number,
    quantity: number,
    status: string,
    address: string,
    city: string,
    province: string,
    country: string,
    postcode: string,
    totalItemPrice: number,
    taxPrice: number
  ) =>
  async (dispatch: Dispatch) => {
    dispatch({
      type: ORDER_CREATE_REQUEST,
      payload: {
        buyerEmail,
        sellerEmail,
        itemID,
        quantity,
        status,
        address,
        city,
        province,
        country,
        postcode,
        totalItemPrice,
        taxPrice,
      },
    })
    try {
      const { data } = await Axios.post("/orders/order", {
        buyerEmail,
        sellerEmail,
        itemID,
        quantity,
        status,
        address,
        city,
        province,
        country,
        postcode,
        totalItemPrice,
        taxPrice,
      })
      dispatch({ type: ORDER_CREATE_SUCCESS, payload: data })
    } catch (error) {
      dispatch({
        type: ORDER_CREATE_FAIL,
        payload: handleErrorPayload(error),
      })
    }
  }

// function to update order object with ID
export const patchOrder =
  (orderID: number, changedAttributes: unknown) =>
  async (dispatch: Dispatch) => {
    dispatch({ type: ORDER_UPDATE_REQUEST, payload: orderID })
    try {
      const { data } = await Axios.patch(`/orders/order/${orderID}`, {
        changedAttributes,
      })
      dispatch({ type: ORDER_UPDATE_SUCCESS, payload: data })
    } catch (error) {
      dispatch({
        type: ORDER_UPDATE_FAIL,
        payload: handleErrorPayload(error),
      })
    }
  }

// function to get order details with ID
export const getOrder = (orderID: number) => async (dispatch: Dispatch) => {
  dispatch({ type: ORDER_GET_REQUEST, payload: orderID })
  try {
    const { data } = await Axios.get(`/orders/order/${orderID}`)
    dispatch({ type: ORDER_GET_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: ORDER_GET_FAIL,
      payload: handleErrorPayload(error),
    })
  }
}

// function to get a list of order objects that are all from buyer
export const getOrdersOfBuyer =
  (buyerEmail: string, limit: number, page: number, reversed: boolean) =>
  async (dispatch: Dispatch) => {
    dispatch({ type: GET_BUYER_ORDERS_REQUEST })
    try {
      const { data } = await Axios.get(
        `/orders/ordersOfBuyer/${buyerEmail}-${limit}-${page}-${reversed}`
      )
      dispatch({ type: GET_BUYER_ORDERS_SUCCESS, payload: data })
    } catch (error) {
      dispatch({
        type: GET_BUYER_ORDERS_FAIL,
        payload: handleErrorPayload(error),
      })
    }
  }

// function to get a list of order objects that are all to seller
export const getOrdersOfSeller =
  (sellerEmail: string, limit: number, page: number, reversed: boolean) =>
  async (dispatch: Dispatch) => {
    dispatch({ type: GET_SELLER_ORDERS_REQUEST })
    try {
      const { data } = await Axios.get(
        `/orders/ordersOfSeller/${sellerEmail}-${limit}-${page}-${reversed}`
      )
      dispatch({ type: GET_SELLER_ORDERS_SUCCESS, payload: data })
    } catch (error) {
      dispatch({
        type: GET_SELLER_ORDERS_FAIL,
        payload: handleErrorPayload(error),
      })
    }
  }
