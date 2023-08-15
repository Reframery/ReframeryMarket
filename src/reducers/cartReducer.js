const {
    REMOVE_FROM_CART_REQUEST,
    REMOVE_FROM_CART_SUCCESS,
    REMOVE_FROM_CART_FAIL,
    EDIT_NUMBER_IN_CART_REQUEST,
    EDIT_NUMBER_IN_CART_SUCCESS,
    EDIT_NUMBER_IN_CART_FAIL,
    ADD_ITEMS_LIST_TO_CART_REQUEST,
    ADD_ITEMS_LIST_TO_CART_SUCCESS,
    ADD_ITEMS_LIST_TO_CART_FAIL,
    CREATE_CART_REQUEST,
    CREATE_CART_SUCCESS,
    CREATE_CART_FAIL,
    GET_CART_NUMBER_REQUEST,
    GET_CART_NUMBER_SUCCESS,
    GET_CART_NUMBER_FAIL,
    GET_CARTS_REQUEST,
    GET_CARTS_SUCCESS,
    GET_CARTS_FAIL,
    GET_CART_REQUEST,
    GET_CART_SUCCESS,
    GET_CART_FAIL,
    DELETE_CART_REQUEST,
    DELETE_CART_SUCCESS,
    DELETE_CART_FAIL

}  = require("../constants/cartConstants");

// create shopping cart
export const createCartReducer = (state = {}, action) => {
    switch (action.type) {
        case CREATE_CART_REQUEST:
            return { loading: true, error: "requesting"};
        case CREATE_CART_SUCCESS:
            return { loading: false, cart: action.payload, error: "sucess" };
        case CREATE_CART_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

// get cart details
export const getCartReducer = (state = { loading: true, cart: {} }, action) => {
    switch (action.type) {
        case GET_CART_REQUEST:
            return { loading: true };
        case GET_CART_SUCCESS:
            return {
                loading: false,
                cart: action.payload
            };
        case GET_CART_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

// add a list of items with counts to the shopping cart
export const addItemsToCartRducer = (state = { loading: true }, action) => {
    switch (action.type) {
        case ADD_ITEMS_LIST_TO_CART_REQUEST:
          return { loading: true };
        case ADD_ITEMS_LIST_TO_CART_SUCCESS:
          return { loading: false, cart: action.payload };
        case ADD_ITEMS_LIST_TO_CART_FAIL:
          return { loading: false, error: action.payload };
        default:
          return state;
      }
}

// get the number of carts owned by the user
export const numOfCartsForUserReducer = (state = { loading: true }, action) => {
    switch (action.type) {
        case GET_CART_NUMBER_REQUEST:
          return { loading: true };
        case GET_CART_NUMBER_SUCCESS:
          return { loading: false, num: action.payload };
        case GET_CART_NUMBER_FAIL:
          return { loading: false, error: action.payload };
        default:
          return state;
      }
}

// update the count of an item in a shopping cart
export const updateItemCountReducer = (state = { loading: true }, action ) => {
    switch (action.type) {
        case EDIT_NUMBER_IN_CART_REQUEST:
          return { loading: true };
        case EDIT_NUMBER_IN_CART_SUCCESS:
          return { loading: false, cart: action.payload };
        case EDIT_NUMBER_IN_CART_FAIL:
          return { loading: false, error: action.payload };
        default:
          return state;
      }
}

// get all the shopping carts of the user
export const getUserCartsReducer = (state = { loading: true, carts: []}, action) => {
    switch (action.type) {
        case GET_CARTS_REQUEST:
            return { loading: true };
        case GET_CARTS_SUCCESS:
            return {
                loading: false,
                carts: action.payload
            };
        case GET_CARTS_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

// delete a cart
export const deleteCartReducer = (state = { loading: true }, action) => {
    switch (action.type) {
        case DELETE_CART_REQUEST:
            return { loading: true };
        case DELETE_CART_SUCCESS:
            return { loading: false, cart: action.payload };
        case DELETE_CART_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

// remove an item from a shopping cart
export const deleteItemFromCartReducer = (state = { loading: true }, action) => {
    switch (action.type) {
        case REMOVE_FROM_CART_REQUEST:
            return { loading: true };
        case REMOVE_FROM_CART_SUCCESS:
            return { loading: false, cart: action.payload };
        case REMOVE_FROM_CART_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}