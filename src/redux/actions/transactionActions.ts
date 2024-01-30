// ! ************************************************
// ! ONLY FOR REFERENCE (DO NOT USE IN CURRENT APP)
// ! ************************************************
import Axios from "axios"
import {
  TRANSACTION_CREATE_REQUEST,
  TRANSACTION_CREATE_FAIL,
  TRANSACTION_CREATE_SUCCESS,
  TRANSACTION_GET_REQUEST,
  TRANSACTION_GET_FAIL,
  TRANSACTION_GET_SUCCESS,
  BALANCE_GET_REQUEST,
  BALANCE_GET_SUCCESS,
  BALANCE_GET_FAIL,
  BALANCE_ADD_FAIL,
  BALANCE_ADD_REQUEST,
  BALANCE_ADD_SUCCESS,
  BALANCE_DEDUCT_FAIL,
  BALANCE_DEDUCT_REQUEST,
  BALANCE_DEDUCT_SUCCESS,
  TRANSACTION_OF_USER_GET_REQUEST,
  TRANSACTION_OF_USER_GET_SUCCESS,
  TRANSACTION_OF_USER_GET_FAIL,
} from "../constants/transactionConstants"
import { Dispatch } from "redux"
import { handleErrorPayload } from "lib/utils"

// create a transaction
export const createTransaction =
  (
    senderEmail: string,
    receiverEmail: string,
    creditUnit: number,
    transactionToken: number
  ) =>
  async (dispatch: Dispatch) => {
    dispatch({
      type: TRANSACTION_CREATE_REQUEST,
      payload: { senderEmail, receiverEmail, creditUnit, transactionToken },
    })
    try {
      const { data } = await Axios.post(`/transactions/transaction`, {
        senderEmail,
        receiverEmail,
        creditUnit,
        transactionToken,
      })
      dispatch({ type: TRANSACTION_CREATE_SUCCESS, payload: data })
    } catch (error) {
      dispatch({
        type: TRANSACTION_CREATE_FAIL,
        payload: handleErrorPayload(error),
      })
    }
  }

// get transaction details from backend
export const getTransaction =
  (transactionID: number) => async (dispatch: Dispatch) => {
    dispatch({ type: TRANSACTION_GET_REQUEST, payload: transactionID })
    try {
      const { data } = await Axios.get(
        `/transactions/transactionsOfUser/${transactionID}`
      )
      dispatch({ type: TRANSACTION_GET_SUCCESS, payload: data })
    } catch (error) {
      dispatch({
        type: TRANSACTION_GET_FAIL,
        payload: handleErrorPayload(error),
      })
    }
  }

// get a list of transactions for a user from backend
export const getTransactionsOfUser =
  (userEmail: string, limit: number, startingFrom: string, reversed: boolean) =>
  async (dispatch: Dispatch) => {
    dispatch({ type: TRANSACTION_OF_USER_GET_REQUEST, payload: userEmail })
    try {
      const { data } = await Axios.get(
        `/transactions/transactionsOfUser/${userEmail}-${limit}-${startingFrom}-${reversed}`
      )
      dispatch({ type: TRANSACTION_OF_USER_GET_SUCCESS, payload: data })
    } catch (error) {
      dispatch({
        type: TRANSACTION_OF_USER_GET_FAIL,
        payload: handleErrorPayload(error),
      })
    }
  }

//get user balance  from backend
export const getBalance = (userEmail: string) => async (dispatch: Dispatch) => {
  dispatch({ type: BALANCE_GET_REQUEST, payload: userEmail })
  try {
    const { data } = await Axios.get(`/transactions/balance/${userEmail}`)
    dispatch({ type: BALANCE_GET_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ type: BALANCE_GET_FAIL, payload: handleErrorPayload(error) })
  }
}

//add credits to a user
export const adminAddCreditToUser =
  (adminEmail: string, receiverEmail: string, creditUnit: number) =>
  async (dispatch: Dispatch) => {
    dispatch({
      type: BALANCE_ADD_REQUEST,
      payload: { adminEmail, receiverEmail, creditUnit },
    })
    try {
      const { data } = await Axios.post("/transactions/adminAddCreditToUser", {
        adminEmail,
        receiverEmail,
        creditUnit,
      })
      dispatch({ type: BALANCE_ADD_SUCCESS, payload: data })
    } catch (error) {
      dispatch({
        type: BALANCE_ADD_FAIL,
        payload: handleErrorPayload(error),
      })
    }
  }

//deduct redits from a user
export const adminDeductCreditFromUser =
  (adminEmail: string, senderEmail: string, creditUnit: number) =>
  async (dispatch: Dispatch) => {
    dispatch({
      type: BALANCE_DEDUCT_REQUEST,
      payload: { adminEmail, senderEmail, creditUnit },
    })
    try {
      const { data } = await Axios.post(
        "/transactions/adminDeductCreditFromUser",
        { adminEmail, senderEmail, creditUnit }
      )
      dispatch({ type: BALANCE_DEDUCT_SUCCESS, payload: data })
    } catch (error) {
      dispatch({
        type: BALANCE_DEDUCT_FAIL,
        payload: handleErrorPayload(error),
      })
    }
  }
