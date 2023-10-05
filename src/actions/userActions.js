import Axios from "../commons/axios";
import auth from '../commons/auth';

import {
    ADMIN_LIST_FAIL,
    ADMIN_LIST_REQUEST,
    ADMIN_LIST_SUCCESS,
    USER_DELETE_FAIL,
    USER_DELETE_REQUEST,
    USER_DELETE_SUCCESS,
    USER_DETAILS_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    UNVALIDATEUSER_LIST_FAIL,
    UNVALIDATEUSER_LIST_REQUEST,
    UNVALIDATEUSER_LIST_SUCCESS,
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
    USER_VALIDATE_REQUEST,
    USER_VALIDATE_SUCCESS,
    USER_VALIDATE_FAIL,
    USER_IMAGE_UPDATE_REQUEST,
    USER_IMAGE_UPDATE_SUCCESS,
    USER_IMAGE_UPDATE_FAIL,
    USER_COUNT_VALIDATE_REQUEST,
    USER_COUNT_VALIDATE_SUCCESS,
    USER_COUNT_VALIDATE_FAIL,
    USER_COUNT_UNVALIDATE_REQUEST,
    USER_COUNT_UNVALIDATE_SUCCESS,
    USER_COUNT_UNVALIDATE_FAIL,
} from '../constants/userConstants';

//get the signin user info if the user sign in sucessfully and save it in local storage
export const signin = (email, password) => async (dispatch) => {
    dispatch({ type: USER_SIGNIN_REQUEST, payload: { email, password } });
    try {
        const { data } = await Axios.post(`/market/login`, { email, password });
        dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
        if(data.marketProfile.username === null)
            data.marketProfile.username = email;
        localStorage.setItem('username', data.marketProfile.username);
        localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
        dispatch({
            type: USER_SIGNIN_FAIL, payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

//sign out and remove the userInfo in local storage
export const signout = () => (dispatch) => {
    localStorage.removeItem('userInfo');
    dispatch({ type: USER_SIGNOUT });
};

//create a user object when a user register in the frontend
export const createUser = (username, email, password, communityName) => async (dispatch) => {
    dispatch({ type: USER_REGISTER_REQUEST, payload: { username, email, password, communityName } });
    try {
        const { data } = await Axios.post('/users/user', { username, email, password, communityName })
        dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL, payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

//get the current user details
export const getUser = () => async (dispatch, getState) => {
    dispatch({ type: USER_DETAILS_REQUEST });
    try {
        const { data } = await Axios.get(`/market/profile`, {'headers': await auth({})});
        dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: USER_DETAILS_FAIL, payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        });
    }
};

//get the user details for the given email address
export const getUserByEmail = (email) => async (dispatch) => {
    dispatch({ type: USER_DETAILS_REQUEST });
    try {
        const { data } = await Axios.get(`/market/user/${email}`, {'headers': await auth({})});
        dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
    } catch (error) {
        console.log(error);
        dispatch({
            type: USER_DETAILS_FAIL, payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        });
    }
};

//update the attribute values of the given user
export const updateProfile = (field) => async (dispatch) => { 
    dispatch({ type: USER_UPDATE_REQUEST});
    try {
        const { data } = await Axios.put(`/market/profile`,
            field,
            {'headers': await auth({})}
        );
        dispatch({ type: USER_UPDATE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: USER_UPDATE_FAIL, payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        });
    }
};

//delete a user
export const deleteUser = (email) => async (dispatch) => {
    dispatch({ type: USER_DELETE_REQUEST, payload: email });
    try {
        const { data } = await Axios.delete(`/users/user/${email}`);
        dispatch({ type: USER_DELETE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: USER_DELETE_FAIL, payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        });
    }
};


//update the validate status of the user 
export const validateUser = (id, communityName) => async (dispatch) => {
    dispatch({ type: USER_VALIDATE_REQUEST, payload: id });
    try {
        const { data } = await Axios.post(`/market/createProfile`, {id, communityName}, {'headers': await auth({})});
        dispatch({ type: USER_VALIDATE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: USER_VALIDATE_FAIL, payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        });
    }
};

//get the list of all unvalidated users from backend
export const getNonMarketUsers = () => async (dispatch) => {
    dispatch({ type: UNVALIDATEUSER_LIST_REQUEST });
    try {
        const { data } = await Axios.get(`/market/non-market`, {'headers': await auth({})});
        dispatch({ type: UNVALIDATEUSER_LIST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: UNVALIDATEUSER_LIST_FAIL, payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        });
    }
};

//get the number of validated users from backend
export const getUsersValidation = (communityName) => async (dispatch) => {
    dispatch({ type: USER_COUNT_VALIDATE_REQUEST });
    try {
        const { data } = await Axios.get(`/users/numOfValidatedUsers?communityName=${communityName}`);
        dispatch({ type: USER_COUNT_VALIDATE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: USER_COUNT_VALIDATE_FAIL, payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        });
    }
};

//get the number of validated users from backend
export const numOfUnvalidatedUsers = (communityName) => async (dispatch) => {
    dispatch({ type: USER_COUNT_UNVALIDATE_REQUEST });
    try {
        const { data } = await Axios.get(`/users/numOfUnvalidatedUsers?communityName=${communityName}`);
        dispatch({ type: USER_COUNT_UNVALIDATE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: USER_COUNT_UNVALIDATE_FAIL, payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        });
    }
};



