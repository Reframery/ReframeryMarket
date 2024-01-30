// ! ************************************************
// ! ONLY FOR REFERENCE (DO NOT USE IN CURRENT APP)
// ! ************************************************
import type { PayloadAction } from "@reduxjs/toolkit"
import {
  ADMIN_LIST_FAIL,
  ADMIN_LIST_REQUEST,
  ADMIN_LIST_SUCCESS,
  UNVALIDATEUSER_LIST_FAIL,
  UNVALIDATEUSER_LIST_REQUEST,
  UNVALIDATEUSER_LIST_SUCCESS,
  USER_COUNT_UNVALIDATE_FAIL,
  USER_COUNT_UNVALIDATE_REQUEST,
  USER_COUNT_UNVALIDATE_SUCCESS,
  USER_COUNT_VALIDATE_FAIL,
  USER_COUNT_VALIDATE_REQUEST,
  USER_COUNT_VALIDATE_SUCCESS,
  USER_DELETE_FAIL,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_IMAGE_UPDATE_FAIL,
  USER_IMAGE_UPDATE_REQUEST,
  USER_IMAGE_UPDATE_SUCCESS,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNOUT,
  USER_UPDATE_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_VALIDATE_FAIL,
  USER_VALIDATE_REQUEST,
  USER_VALIDATE_SUCCESS,
} from "../constants/userConstants"

export const userSigninReducer = (state = {}, action: PayloadAction) => {
  switch (action.type) {
    case USER_SIGNIN_REQUEST:
      return { loading: true }
    case USER_SIGNIN_SUCCESS:
      return { loading: false, userInfo: action.payload }
    case USER_SIGNIN_FAIL:
      return { loading: false, error: action.payload }
    case USER_SIGNOUT:
      return {}
    default:
      return state
  }
}

export const userRegisterReducer = (state = {}, action: PayloadAction) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true }
    case USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload }
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const userGetReducer = (state = { loading: true }, action: PayloadAction) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return { loading: true }
    case USER_DETAILS_SUCCESS:
      return { loading: false, success: true, user: action.payload }
    case USER_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const userUpdateReducer = (state = { loading: true }, action: PayloadAction) => {
  switch (action.type) {
    case USER_UPDATE_REQUEST:
      return { loading: true }
    case USER_UPDATE_SUCCESS:
      return { loading: false, user: action.payload }
    case USER_UPDATE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const userImageUpdateReducer = (state = { loading: true }, action: PayloadAction) => {
  switch (action.type) {
    case USER_IMAGE_UPDATE_REQUEST:
      return { loading: true }
    case USER_IMAGE_UPDATE_SUCCESS:
      return { loading: false, user: action.payload }
    case USER_IMAGE_UPDATE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const userValidateReducer = (state = { loading: true }, action: PayloadAction) => {
  switch (action.type) {
    case USER_VALIDATE_REQUEST:
      return { loading: true }
    case USER_VALIDATE_SUCCESS:
      return { loading: false, user: action.payload }
    case USER_VALIDATE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const userDeleteReducer = (state = { loading: true }, action: PayloadAction) => {
  switch (action.type) {
    case USER_DELETE_REQUEST:
      return { loading: true }
    case USER_DELETE_SUCCESS:
      return { loading: false, user: action.payload }
    case USER_DELETE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const adminUsersReducer = (
  state = { loadingAdmin: true, admins: [] },
  action: PayloadAction
) => {
  switch (action.type) {
    case ADMIN_LIST_REQUEST:
      return { loadingAdmin: true }
    case ADMIN_LIST_SUCCESS:
      return { loadingAdmin: false, admins: action.payload }
    case ADMIN_LIST_FAIL:
      return { loadingAdmin: false, error: action.payload }
    default:
      return state
  }
}

export const unvalidatedUsersReducer = (
  state = { loadingUser: true, unvalidatedList: [] },
  action: PayloadAction
) => {
  switch (action.type) {
    case UNVALIDATEUSER_LIST_REQUEST:
      return { loadingUser: true }
    case UNVALIDATEUSER_LIST_SUCCESS:
      return { loadingUser: false, unvalidatedList: action.payload }
    case UNVALIDATEUSER_LIST_FAIL:
      return { loadingUser: false, error: action.payload }
    default:
      return state
  }
}

export const validatedUsersCountReducer = (
  state = { loading: true, counterOfValidated: 0 },
  action: PayloadAction
) => {
  switch (action.type) {
    case USER_COUNT_VALIDATE_REQUEST:
      return { loading: true }
    case USER_COUNT_VALIDATE_SUCCESS:
      return { loading: false, counterOfValidated: action.payload }
    case USER_COUNT_VALIDATE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const unvalidatedUsersCountReducer = (
  state = { loading: true, counterOfUnvalidated: 0 },
  action: PayloadAction
) => {
  switch (action.type) {
    case USER_COUNT_UNVALIDATE_REQUEST:
      return { loading: true }
    case USER_COUNT_UNVALIDATE_SUCCESS:
      return { loading: false, counterOfUnvalidated: action.payload }
    case USER_COUNT_UNVALIDATE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
