// ! ************************************************
// ! ONLY FOR REFERENCE (DO NOT USE IN CURRENT APP)
// ! ************************************************
//constants for creating an order
export const ORDER_CREATE_REQUEST = "ORDER_CREATE_REQUEST";
export const ORDER_CREATE_SUCCESS = "ORDER_CREATE_SUCCESS";
export const ORDER_CREATE_FAIL = "ORDER_CREATE_FAIL";

//constants for updating an order (when deleted, the status will be set to deleted, but the record will remain)
export const ORDER_UPDATE_REQUEST = "ORDER_UPDATE_REQUEST";
export const ORDER_UPDATE_SUCCESS = "ORDER_UPDATE_SUCCESS";
export const ORDER_UPDATE_FAIL = "ORDER_UPDATE_FAIL"

// constants for getting the details of an order
export const ORDER_GET_REQUEST = "ORDER_GET_REQUEST";
export const ORDER_GET_SUCCESS = "ORDER_GET_SUCCESS";
export const ORDER_GET_FAIL = "ORDER_GET_FAIL";

// constants for get a list of order objects that are all from a buyer
export const GET_BUYER_ORDERS_REQUEST = "GET_BUYER_ORDERS_REQUEST";
export const GET_BUYER_ORDERS_SUCCESS = "GET_BUYER_ORDERS_SUCCESS";
export const GET_BUYER_ORDERS_FAIL = "GET_BUYER_ORDERS_FAIL";

// constants for get a list of order objects that are all to seller
export const GET_SELLER_ORDERS_REQUEST = "GET_SELLER_ORDERS_REQUEST";
export const GET_SELLER_ORDERS_SUCCESS = "GET_SELLER_ORDERS_SUCCESS";
export const GET_SELLER_ORDERS_FAIL = "GET_SELLER_ORDERS_FAIL";

