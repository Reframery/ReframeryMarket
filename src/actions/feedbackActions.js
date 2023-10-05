import Axios from "axios";

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
    GET_RATER_FEEDBACKS_FAIL
} from "constants/feedbackConstants";

// function to create a feedback record
export const createFeedback = (itemID, userEmail, raterEmail, rating, description) => async (dispatch) => {
    dispatch({ type: FEEDBACK_CREATE_REQUEST, payload: { itemID, userEmail, raterEmail, rating, description }});
    try{
        const { data } = await Axios.post("/feedbacks/feedback", { itemID, userEmail, raterEmail, rating, description });
        dispatch({ type: FEEDBACK_CREATE_SUCCESS, payload: data});
    }catch(error){
        dispatch({
            type: FEEDBACK_CREATE_FAIL, payload:
                error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
}

// function to get a feedback
export const getFeedback = (feedbackID) => async (dispatch) => {
    dispatch({ type: FEEDBACK_GET_REQUEST, payload: feedbackID });
    try {
        const { data } = await Axios.get(`/feedbacks/feedback/${feedbackID}`);
        dispatch({ type: FEEDBACK_GET_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: FEEDBACK_GET_FAIL, payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        });
    }
}

// function to get feedbacks of a user
export const getFeedbacksOfUser = (userEmail) => async (dispatch) => {
    dispatch({ type: GET_USER_FEEDBACKS_REQUEST, payload: data});
    try{
        const { data } = await Axios.get(`/carts/getUserFeedbacks/${userEmail}`);
        dispatch({ type: GET_USER_FEEDBACKS_SUCCESS, payload: data });
    }catch(error){
        dispatch({
            type: GET_USER_FEEDBACKS_FAIL, payload:
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}

// function to get feedbacks of a rater
export const getFeedbacksOfRater = (raterEmail) => async (dispatch) => {
    dispatch({ type: GET_RATER_FEEDBACKS_REQUEST, payload: data});
    try{
        const { data } = await Axios.get(`/carts/getRaterFeedbacks/${raterEmail}`);
        dispatch({ type: GET_RATER_FEEDBACKS_SUCCESS, payload: data });
    }catch(error){
        dispatch({
            type: GET_RATER_FEEDBACKS_FAIL, payload:
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}
