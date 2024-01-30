// ! ************************************************
// ! ONLY FOR REFERENCE (DO NOT USE IN CURRENT APP)
// ! ************************************************
import type { PayloadAction } from "@reduxjs/toolkit"
import {
  BALANCE_ADD_FAIL,
  BALANCE_ADD_REQUEST,
  BALANCE_ADD_SUCCESS,
  BALANCE_DEDUCT_FAIL,
  BALANCE_DEDUCT_REQUEST,
  BALANCE_DEDUCT_SUCCESS,
  BALANCE_GET_FAIL,
  BALANCE_GET_REQUEST,
  BALANCE_GET_SUCCESS,
  TRANSACTION_CREATE_FAIL,
  TRANSACTION_CREATE_REQUEST,
  TRANSACTION_CREATE_SUCCESS,
  TRANSACTION_GET_FAIL,
  TRANSACTION_GET_REQUEST,
  TRANSACTION_GET_SUCCESS,
  TRANSACTION_OF_USER_GET_FAIL,
  TRANSACTION_OF_USER_GET_REQUEST,
  TRANSACTION_OF_USER_GET_SUCCESS,
} from "../constants/transactionConstants"

export const transactionCreateReducer = (state = {}, action: PayloadAction) => {
  switch (action.type) {
    case TRANSACTION_CREATE_REQUEST:
      return { loading: true }
    case TRANSACTION_CREATE_SUCCESS:
      return { loading: false, transaction: action.payload }
    case TRANSACTION_CREATE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const transactionGetReducer = (state = {}, action: PayloadAction) => {
  switch (action.type) {
    case TRANSACTION_GET_REQUEST:
      return { loading: true }
    case TRANSACTION_GET_SUCCESS:
      return { loading: false, transaction: action.payload }
    case TRANSACTION_GET_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const transactionsOfUserGetReducer = (state = {}, action: PayloadAction) => {
  switch (action.type) {
    case TRANSACTION_OF_USER_GET_REQUEST:
      return { loading: true }
    case TRANSACTION_OF_USER_GET_SUCCESS:
      return { loading: false, transactions: action.payload }
    case TRANSACTION_OF_USER_GET_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const balanceGetReducer = (state = {}, action: PayloadAction) => {
  switch (action.type) {
    case BALANCE_GET_REQUEST:
      return { loading: true }
    case BALANCE_GET_SUCCESS:
      return { loading: false, balance: action.payload }
    case BALANCE_GET_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const creditAddReducer = (state = {}, action: PayloadAction) => {
  switch (action.type) {
    case BALANCE_ADD_REQUEST:
      return { loading: true }
    case BALANCE_ADD_SUCCESS:
      return { loading: false, transaction: action.payload }
    case BALANCE_ADD_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const creditDeductReducer = (state = {}, action: PayloadAction) => {
  switch (action.type) {
    case BALANCE_DEDUCT_REQUEST:
      return { loading: true }
    case BALANCE_DEDUCT_SUCCESS:
      return { loading: false, transaction: action.payload }
    case BALANCE_DEDUCT_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
