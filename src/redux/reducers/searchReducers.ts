// ! ************************************************
// ! ONLY FOR REFERENCE (DO NOT USE IN CURRENT APP)
// ! ************************************************
import type { PayloadAction } from "@reduxjs/toolkit"
import {
  ITEM_SEARCH_REQUEST,
  ITEM_SEARCH_SUCCESS,
  ITEM_SEARCH_FAIL,
} from "../constants/searchConstants"

export const itemsSearchReducer = (state = {}, action: PayloadAction) => {
  switch (action.type) {
    case ITEM_SEARCH_REQUEST:
      return { loading: true }
    case ITEM_SEARCH_SUCCESS:
      return { loading: false, items: action.payload }
    case ITEM_SEARCH_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
