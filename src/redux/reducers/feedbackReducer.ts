import type { PayloadAction } from "@reduxjs/toolkit"
import {
  FEEDBACK_CREATE_SUCCESS,
  FEEDBACK_CREATE_FAIL,
  FEEDBACK_CREATE_REQUEST,
  FEEDBACK_GET_REQUEST,
  FEEDBACK_GET_SUCCESS,
  FEEDBACK_GET_FAIL,
  GET_USER_FEEDBACKS_REQUEST,
  GET_USER_FEEDBACKS_SUCCESS,
  GET_USER_FEEDBACKS_FAIL,
  GET_RATER_FEEDBACKS_REQUEST,
  GET_RATER_FEEDBACKS_SUCCESS,
  GET_RATER_FEEDBACKS_FAIL,
} from "../constants/feedbackConstants"

// create a feedback record
export const createFeedbackReducer = (state = {}, action: PayloadAction) => {
  switch (action.type) {
    case FEEDBACK_CREATE_REQUEST:
      return { loading: true, error: "requesting" }
    case FEEDBACK_CREATE_SUCCESS:
      return { loading: false, feedback: action.payload, error: "sucess" }
    case FEEDBACK_CREATE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

// get a specific feedback
export const getFeedbackReducer = (
  state = { loading: true, feedback: {} },
  action: PayloadAction
) => {
  switch (action.type) {
    case FEEDBACK_GET_REQUEST:
      return { loading: true }
    case FEEDBACK_GET_SUCCESS:
      return {
        loading: false,
        feedback: action.payload,
      }
    case FEEDBACK_GET_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

// get feedbacks of specific user
export const getFeedbacksOfUserReducer = (
  state = { loading: true, feedbacks: [] },
  action: PayloadAction
) => {
  switch (action.type) {
    case GET_USER_FEEDBACKS_REQUEST:
      return { loading: true }
    case GET_USER_FEEDBACKS_SUCCESS:
      return {
        loading: false,
        feedbacks: action.payload,
      }
    case GET_USER_FEEDBACKS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

// get feedbacks of specific rater
export const getFeedbacksOfRaterReducer = (
  state = { loading: true, feedbacks: [] },
  action: PayloadAction
) => {
  switch (action.type) {
    case GET_RATER_FEEDBACKS_REQUEST:
      return { loading: true }
    case GET_RATER_FEEDBACKS_SUCCESS:
      return {
        loading: false,
        feedbacks: action.payload,
      }
    case GET_RATER_FEEDBACKS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
