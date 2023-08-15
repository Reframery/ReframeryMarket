import { itemsSearchReducer } from 'reducers/searchReducers.js';
import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

// import item reducers
import {
    itemsOfCategoryGetReducer,
    itemGetReducer,
    itemCreateReducer,
    itemUpdateReducer,
    itemImageUpdateReducer,
    itemDeleteReducer,
    newestItemsOfProductsGetReducer,
    newestItemsOfServicesGetReducer,
    newestItemsOfExpertisesGetReducer,
    itemsOfUserGetReducer,
    itemsOfSubcategoryGetReducer,
} from './reducers/itemReducers.js';

// import transaction reducers
import { 
    creditAddReducer, 
    creditDeductReducer, 
    balanceGetReducer, 
    transactionCreateReducer, 
    transactionGetReducer, 
    transactionsOfUserGetReducer 
} from './reducers/transactionReducers.js';

// import user reducers
import {
    adminUsersReducer,
    unvalidatedUsersCountReducer,
    unvalidatedUsersReducer,
    userDeleteReducer,
    userGetReducer,
    userRegisterReducer,
    userSigninReducer,
    userUpdateReducer,
    userImageUpdateReducer,
    userValidateReducer,
    validatedUsersCountReducer
} from './reducers/userReducer.js';

// import feedback reducers
import {
    createFeedbackReducer,
    getFeedbackReducer,
    getFeedbacksOfUserReducer,
    getFeedbacksOfRaterReducer
} from "./reducers/feedbackReducer";

// import cart reducers
import {
    createCartReducer,
    getCartReducer,
    addItemsToCartRducer,
    numOfCartsForUserReducer,
    updateItemCountReducer,
    getUserCartsReducer,
    deleteCartReducer,
    deleteItemFromCartReducer
} from "./reducers/cartReducer";

// import order reducers
import {
    createOrderReducer,
    patchOrderReducer,
    getOrderReducer,
    getOrdersOfBuyerReducer,
    getOrdersOfSellerReducer
} from "./reducers/orderReducer";

const initialState = {
    userSignin: {
        userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
    },
};

const reducer = combineReducers({
    //reducers for users
    userSignin: userSigninReducer,
    userRegister: userRegisterReducer,
    userGet: userGetReducer,
    userUpdate: userUpdateReducer,
    userImageUpdate: userImageUpdateReducer,
    userValidate: userValidateReducer,
    userDelete: userDeleteReducer,
    adminUsers: adminUsersReducer,
    unvalidatedUsers: unvalidatedUsersReducer,
    validatedUsersCount: validatedUsersCountReducer,
    unvalidatedUsersCount: unvalidatedUsersCountReducer,

    // reducers for transactions
    transactionCreate: transactionCreateReducer,
    transactionGet: transactionGetReducer,
    transactionsOfUserGet: transactionsOfUserGetReducer,
    balanceGet: balanceGetReducer,
    creditAdd: creditAddReducer,
    creditDeduct: creditDeductReducer,

    //reducers for items
    itemCreate: itemCreateReducer,
    itemUpdate: itemUpdateReducer,
    itemImageUpdate: itemImageUpdateReducer,
    itemDelete: itemDeleteReducer,
    itemGet: itemGetReducer,
    newestItemsOfProductsGet: newestItemsOfProductsGetReducer,
    newestItemsOfServicesGet: newestItemsOfServicesGetReducer,
    newestItemsOfExpertisesGet: newestItemsOfExpertisesGetReducer,
    itemsOfCategoryGet: itemsOfCategoryGetReducer,
    itemsOfUserGet: itemsOfUserGetReducer,
    itemOfSubcategoryGet: itemsOfSubcategoryGetReducer,

    //reducers for search
    itemsSearch: itemsSearchReducer,

    //reducers for cart
    createCart: createCartReducer,
    getCart: getCartReducer,
    addItemsToCart: addItemsToCartRducer,
    numOfCartsForUser: numOfCartsForUserReducer,
    updateItemCount: updateItemCountReducer,
    getUserCarts: getUserCartsReducer,
    deleteCart: deleteCartReducer,
    deleteItemFromCart: deleteItemFromCartReducer,

    //reducers for feedback
    createFeedback: createFeedbackReducer,
    getFeedback: getFeedbackReducer,
    getFeedbacksOfUser: getFeedbacksOfUserReducer,
    getFeedbacksOfRaterReducer: getFeedbacksOfRaterReducer,

    //reducers for order
    createOrder: createOrderReducer,
    patchOrder: patchOrderReducer,
    getOrder: getOrderReducer,
    getOrdersOfBuyerReducer: getOrdersOfBuyerReducer,
    getOrdersOfSellerReducer: getOrdersOfSellerReducer

});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));

export default store;