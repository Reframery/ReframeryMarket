import { combineReducers, legacy_createStore as createStore } from "redux"

import { itemsSearchReducer } from "redux/reducers/searchReducers"

// import item reducers
import {
  itemCreateReducer,
  itemDeleteReducer,
  itemGetReducer,
  itemImageUpdateReducer,
  itemUpdateReducer,
  itemsOfCategoryGetReducer,
  itemsOfSubcategoryGetReducer,
  itemsOfUserGetReducer,
  newestItemsOfExpertisesGetReducer,
  newestItemsOfProductsGetReducer,
  newestItemsOfServicesGetReducer,
} from "./reducers/itemReducers"

// import transaction reducers
import {
  balanceGetReducer,
  creditAddReducer,
  creditDeductReducer,
  transactionCreateReducer,
  transactionGetReducer,
  transactionsOfUserGetReducer,
} from "./reducers/transactionReducers"

// import user reducers
import {
  adminUsersReducer,
  unvalidatedUsersCountReducer,
  unvalidatedUsersReducer,
  userDeleteReducer,
  userGetReducer,
  userImageUpdateReducer,
  userRegisterReducer,
  userSigninReducer,
  userUpdateReducer,
  userValidateReducer,
  validatedUsersCountReducer,
} from "./reducers/userReducer"

// import feedback reducers
import {
  createFeedbackReducer,
  getFeedbackReducer,
  getFeedbacksOfRaterReducer,
  getFeedbacksOfUserReducer,
} from "./reducers/feedbackReducer"

// import cart reducers
import {
  addItemsToCartRducer,
  createCartReducer,
  deleteCartReducer,
  deleteItemFromCartReducer,
  getCartReducer,
  getUserCartsReducer,
  numOfCartsForUserReducer,
  updateItemCountReducer,
} from "./reducers/cartReducer"

// import order reducers
import {
  createOrderReducer,
  getOrderReducer,
  getOrdersOfBuyerReducer,
  getOrdersOfSellerReducer,
  patchOrderReducer,
} from "./reducers/orderReducer"

type User = Record<string, unknown>

type State = {
  userSignin: {
    userInfo: null | User
  }
}

const initialState: State = {
  userSignin: {
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo") as string)
      : null,
  },
}

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
  getOrdersOfSellerReducer: getOrdersOfSellerReducer,
})

// const composeEnhancer =
//   (
//     window as {
//       __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: string
//     }
//   ).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  reducer,
  initialState as Record<string, unknown>
  // composeEnhancer(applyMiddleware(thunk as unknown as any))
)

export default store
