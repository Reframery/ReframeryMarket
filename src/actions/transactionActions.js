import Axios from 'axios';
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
    TRANSACTION_OF_USER_GET_FAIL    
} from '../constants/transactionConstants';


// create a transaction
export const createTransaction = (senderEmail, receiverEmail, creditUnit, transactionToken) => async (dispatch) => {
    dispatch({ type: TRANSACTION_CREATE_REQUEST, payload: { senderEmail, receiverEmail, creditUnit, transactionToken } });
    try {
        const { data } = await Axios.post(`/transactions/transaction`, { senderEmail, receiverEmail, creditUnit, transactionToken});
        dispatch({ type: TRANSACTION_CREATE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: TRANSACTION_CREATE_FAIL, payload: error.message });
    }
}

// get transaction details from backend
export const getTransaction = (transactionID) => async (dispatch) => {
    dispatch({ type: TRANSACTION_GET_REQUEST, payload: transactionID });
    try {
        const { data } = await Axios.get(`/transactions/transactionsOfUser/${transactionID}`);
        dispatch({ type: TRANSACTION_GET_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: TRANSACTION_GET_FAIL, payload: error.message });
    }
}

// get a list of transactions for a user from backend
export const getTransactionsOfUser = (userEmail, limit, startingFrom, reversed) => async (dispatch) => {
    dispatch({ type: TRANSACTION_OF_USER_GET_REQUEST, payload: userEmail });
    try {
        const { data } = await Axios.get(`/transactions/transactionsOfUser/${userEmail}-${limit}-${startingFrom}-${reversed}`);
        dispatch({ type: TRANSACTION_OF_USER_GET_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: TRANSACTION_OF_USER_GET_FAIL, payload: error.message });
    }
}

//get user balance  from backend
export const getBalance = (userEmail) => async (dispatch) => {
    dispatch({ type: BALANCE_GET_REQUEST, payload: userEmail });
    try {
        const { data } = await Axios.get(`/transactions/balance/${userEmail}`);
        dispatch({ type: BALANCE_GET_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: BALANCE_GET_FAIL, payload: error.message });
    }
}

//add credits to a user
export const adminAddCreditToUser = (adminEmail, receiverEmail, creditUnit) => async (dispatch) => {
    dispatch({ type: BALANCE_ADD_REQUEST, payload: { adminEmail, receiverEmail, creditUnit } });
    try {
        const { data } = await Axios.post('/transactions/adminAddCreditToUser', { adminEmail, receiverEmail, creditUnit });
        dispatch({ type: BALANCE_ADD_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: BALANCE_ADD_FAIL, payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        });
    }
};

//deduct redits from a user
export const adminDeductCreditFromUser = (adminEmail, senderEmail, creditUnit) => async (dispatch) => {
    dispatch({ type: BALANCE_DEDUCT_REQUEST, payload: { adminEmail, senderEmail, creditUnit } });
    try {
        const { data } = await Axios.post('/transactions/adminDeductCreditFromUser', { adminEmail, senderEmail, creditUnit });
        dispatch({ type: BALANCE_DEDUCT_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: BALANCE_DEDUCT_FAIL, payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        });
    }
};

