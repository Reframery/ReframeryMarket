// ! ************************************************
// ! ONLY FOR REFERENCE (DO NOT USE IN CURRENT APP)
// ! ************************************************
import Axios from "axios"

import {
  ITEM_SEARCH_FAIL,
  ITEM_SEARCH_REQUEST,
  ITEM_SEARCH_SUCCESS,
} from "../constants/searchConstants"
import { handleErrorPayload } from "lib/utils"
import { Dispatch } from "redux"

// search a list of item by the filter
export const searchItems =
  (
    searchKeyword: string,
    category: string,
    subCategoryName: string,
    limit: number,
    page: number,
    communityName: string
  ) =>
  async (dispatch: Dispatch) => {
    dispatch({ type: ITEM_SEARCH_REQUEST })
    try {
      const { data } = await Axios.post(
        `/items/searchItem/${searchKeyword}-${limit}-${page}`,
        { category, subCategoryName, communityName }
      )
      dispatch({ type: ITEM_SEARCH_SUCCESS, payload: data })
    } catch (error) {
      dispatch({ type: ITEM_SEARCH_FAIL, payload: handleErrorPayload(error) })
    }
  }
