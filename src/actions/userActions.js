import Axios from 'axios';

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

Axios.defaults.auth = {
    username: 'access_key_admin',
    password: 'secret_key_hush',
};

//get the signin user info if the user sign in sucessfully and save it in local storage
export const signin = (email, password) => async (dispatch) => {
    dispatch({ type: USER_SIGNIN_REQUEST, payload: { email, password } });
    try {
        const { data } = await Axios.post(`/users/signin/${email}`, { password });
        dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
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

//create a user object when a user register in the frontend
export const createAdminUser = (username, email, password, communityName) => async (dispatch) => {
    dispatch({ type: USER_REGISTER_REQUEST, payload: { username, email, password, communityName } });
    try {
        const { data } = await Axios.post('/users/adminUser', { username, email, password, communityName });
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

//get the user details for the given email address
export const getUser = (email) => async (dispatch, getState) => {
    dispatch({ type: USER_DETAILS_REQUEST, payload: email });
    try {
        const { data } = await Axios.get(`/users/user/${email}`);
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

//update the attribute values of the given user
export const updateUserName = (email, username
) => async (dispatch) => {
    dispatch({ type: USER_UPDATE_REQUEST, payload: email });
    try {
        const { data } = await Axios.patch(`/users/user/${email}`,
            {
                username
            }
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

//update the user company name
export const updateUserCompany = (email, company
) => async (dispatch) => {
    dispatch({ type: USER_UPDATE_REQUEST, payload: email });
    try {
        const { data } = await Axios.patch(`/users/user/${email}`,
            {
                company
            }
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

//update the user password
export const updateUserPassword = (email, password
) => async (dispatch) => {
    dispatch({ type: USER_UPDATE_REQUEST, payload: email });
    try {
        const { data } = await Axios.patch(`/users/user/${email}`,
            {
                password
            }
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

//update user phone number
export const updateUserPhone = (email, phoneNumber
) => async (dispatch) => {
    dispatch({ type: USER_UPDATE_REQUEST, payload: email });
    try {
        const { data } = await Axios.patch(`/users/user/${email}`,
            {
                phoneNumber
            }
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

//update user first name
export const updateUserFirstName = (email, firstName
) => async (dispatch) => {
    dispatch({ type: USER_UPDATE_REQUEST, payload: email });
    try {
        const { data } = await Axios.patch(`/users/user/${email}`,
            {
                firstName
            }
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

//update user last name
export const updateUserLastName = (email, lastName
) => async (dispatch) => {
    dispatch({ type: USER_UPDATE_REQUEST, payload: email });
    try {
        const { data } = await Axios.patch(`/users/user/${email}`,
            {
                lastName
            }
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

//update user birthday
export const updateUserBirthday = (email, birthday
    ) => async (dispatch) => {
        dispatch({ type: USER_UPDATE_REQUEST, payload: email });
        try {
            const { data } = await Axios.patch(`/users/user/${email}`,
                {
                    birthday
                }
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

//update the user address
export const updateUserAddress = (email, address, city, province, country, postcode,
) => async (dispatch) => {
    dispatch({ type: USER_UPDATE_REQUEST, payload: email });
    try {
        const { data } = await Axios.patch(`/users/user/${email}`,
            {
                address, city, province, country, postcode
            }
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


//update the image of the given user
export const updateUserImage = (email, userImage
) => async (dispatch) => {
    dispatch({ type: USER_IMAGE_UPDATE_REQUEST, payload: email });
    try {
        const { data } = await Axios.post(`/users/uploadUserImage/${email}`,
            {
                userImage
            }
        );
        dispatch({ type: USER_IMAGE_UPDATE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: USER_IMAGE_UPDATE_FAIL, payload:
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
export const validateUser = (email) => async (dispatch) => {
    dispatch({ type: USER_VALIDATE_REQUEST, payload: email });
    try {
        const { data } = await Axios.get(`/users/validateUser/${email}`);
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

//update user last name
export const unBanUser = (email, banned
    ) => async (dispatch) => {
        dispatch({ type: USER_UPDATE_REQUEST, payload: email });
        try {
            const { data } = await Axios.patch(`/users/user/${email}`,
                {
                    banned
                }
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
    


//promote an userer to manager 
export const promoteToManager = (email) => async (dispatch) => {
    dispatch({ type: USER_UPDATE_REQUEST, payload: email });
    try {
        const { data } = await Axios.get(`/users/promoteToManager/${email}`);
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

//update the validate status of the user 
export const banUser = (email, banned) => async (dispatch) => {
    dispatch({ type: USER_UPDATE_REQUEST, payload: email });
    try {
        const { data } = await Axios.patch(`/users/user/${email}`,
        {
            banned
        });
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

//get the list of all admin users from backend
export const searchAdminUsers = (communityName) => async (dispatch) => {
    dispatch({ type: ADMIN_LIST_REQUEST });
    try {
        const { data } = await Axios.get(`/users/searchAdminUsers?communityName=${communityName}`);
        dispatch({ type: ADMIN_LIST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: ADMIN_LIST_FAIL, payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        });
    }
};

//get the list of all unvalidated users from backend
export const searchUnvalidatedUsers = (communityName) => async (dispatch) => {
    dispatch({ type: UNVALIDATEUSER_LIST_REQUEST });
    try {
        const { data } = await Axios.get(`/users/searchUnvalidatedUsers?communityName=${communityName}`);
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
export const numOfValidatedUsers = (communityName) => async (dispatch) => {
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



