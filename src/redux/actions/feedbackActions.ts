// ! ************************************************
// ! ONLY FOR REFERENCE (DO NOT USE IN CURRENT APP)
// ! ************************************************
import Axios from "axios"

import {
  FEEDBACK_CREATE_SUCCESS,
  FEEDBACK_CREATE_FAIL,
  FEEDBACK_CREATE_REQUEST,
  FEEDBACK_GET_REQUEST,
  FEEDBACK_GET_SUCCESS,
  FEEDBACK_GET_FAIL,
  GET_USER_FEEDBACKS_SUCCESS,
  GET_USER_FEEDBACKS_FAIL,
  GET_RATER_FEEDBACKS_SUCCESS,
  GET_RATER_FEEDBACKS_FAIL,
} from "redux/constants/feedbackConstants"

import { handleErrorPayload } from "lib/utils"
import { Dispatch } from "redux"

// function to create a feedback record
export const createFeedback =
  (itemID: number, userEmail:string, raterEmail: string, rating: number, description: string) => async (dispatch: Dispatch) => {
    dispatch({
      type: FEEDBACK_CREATE_REQUEST,
      payload: { itemID, userEmail, raterEmail, rating, description },
    })
    try {
      const { data } = await Axios.post("/feedbacks/feedback", {
        itemID,
        userEmail,
        raterEmail,
        rating,
        description,
      })
      dispatch({ type: FEEDBACK_CREATE_SUCCESS, payload: data })
    } catch (error) {
      dispatch({
        type: FEEDBACK_CREATE_FAIL,
        payload: handleErrorPayload(error)
      })
    }
  }

// function to get a feedback
export const getFeedback = (feedbackID: number) => async (dispatch: Dispatch) => {
  dispatch({ type: FEEDBACK_GET_REQUEST, payload: feedbackID })
  try {
    const { data } = await Axios.get(`/feedbacks/feedback/${feedbackID}`)
    dispatch({ type: FEEDBACK_GET_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: FEEDBACK_GET_FAIL,
      payload:
      handleErrorPayload(error)
    })
  }
}

// function to get feedbacks of a user
export const getFeedbacksOfUser = (userEmail: string) => async (dispatch:Dispatch) => {
  try {
    const { data } = await Axios.get(`/carts/getUserFeedbacks/${userEmail}`)
    dispatch({ type: GET_USER_FEEDBACKS_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: GET_USER_FEEDBACKS_FAIL,
      payload:
      handleErrorPayload(error)
    })
  }
}

// function to get feedbacks of a rater
export const getFeedbacksOfRater = (raterEmail: string) => async (dispatch: Dispatch) => {
  try {
    const { data } = await Axios.get(`/carts/getRaterFeedbacks/${raterEmail}`)
    dispatch({ type: GET_RATER_FEEDBACKS_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: GET_RATER_FEEDBACKS_FAIL,
      payload:
      handleErrorPayload(error)
    })
  }
}
