// ! ************************************************
// ! ONLY FOR REFERENCE (DO NOT USE IN CURRENT APP)
// ! ************************************************
import Axios from "../../lib/axios"
import auth from "../../lib/auth"

import {
  ITEM_LIST_CATEGORY_REQUEST,
  ITEM_LIST_CATEGORY_SUCCESS,
  ITEM_LIST_CATEGORY_FAIL,
  NEWEST_ITEM_LIST_PRODUCTS_REQUEST,
  NEWEST_ITEM_LIST_PRODUCTS_SUCCESS,
  NEWEST_ITEM_LIST_PRODUCTS_FAIL,
  NEWEST_ITEM_LIST_SERVICES_REQUEST,
  NEWEST_ITEM_LIST_SERVICES_SUCCESS,
  NEWEST_ITEM_LIST_SERVICES_FAIL,
  NEWEST_ITEM_LIST_EXPERTISES_REQUEST,
  NEWEST_ITEM_LIST_EXPERTISES_SUCCESS,
  NEWEST_ITEM_LIST_EXPERTISES_FAIL,
  ITEM_GET_REQUEST,
  ITEM_GET_SUCCESS,
  ITEM_GET_FAIL,
  ITEM_CREATE_REQUEST,
  ITEM_CREATE_SUCCESS,
  ITEM_CREATE_FAIL,
  ITEM_UPDATE_REQUEST,
  ITEM_UPDATE_SUCCESS,
  ITEM_UPDATE_FAIL,
  ITEM_UPDATE_IMAGE_REQUEST,
  ITEM_UPDATE_IMAGE_SUCCESS,
  ITEM_UPDATE_IMAGE_FAIL,
  ITEM_DELETE_REQUEST,
  ITEM_DELETE_SUCCESS,
  ITEM_DELETE_FAIL,
  ITEM_LIST_USER_REQUEST,
  ITEM_LIST_USER_SUCCESS,
  ITEM_LIST_USER_FAIL,
  ITEM_LIST_SUBCATEGORY_REQUEST,
  ITEM_LIST_SUBCATEGORY_SUCCESS,
  ITEM_LIST_SUBCATEGORY_FAIL,
} from "../constants/itemConstants"
import { handleErrorPayload } from "lib/utils"
import { Dispatch } from "redux"

// create an new item and send it to backend
//xport const createItem = (category, name, price, userEmail, image, stock, description, discount, subCategoryID) => async (dispatch) => {
export const createItem =
  (
    itemName:string,
    category:string,
    subcategory:string,
    itemImage:string,
    unitPrice:number,
    stock:number,
    description: string,
    discount: string,
    communityName: string,
    province: string,
    city: string
  ) =>
  async (dispatch:Dispatch) => {
    dispatch({
      type: ITEM_CREATE_REQUEST,
      payload: {
        itemName,
        category,
        subcategory,
        itemImage,
        unitPrice,
        stock,
        description,
        discount,
        communityName,
        province,
        city,
      },
    })
    try {
      const { data } = await Axios.post(
        `/market/item/add`,
        {
          itemName,
          category,
          subcategory,
          itemImage,
          unitPrice,
          stock,
          description,
          discount,
          communityName,
          province,
          city,
        },
        { headers: await auth({}) }
      )
      // const { data } = await Axios.post('/items/item', { name, category, subCategoryName, imageURL, userEmail, price, stock, description, discount, communityName, province, city });
      dispatch({ type: ITEM_CREATE_SUCCESS, payload: data })
    } catch (error) {
      dispatch({
        type: ITEM_CREATE_FAIL,
        payload:
          handleErrorPayload(error)
      })
    }
  }

//update an item attributes
export const updateItem =
  (
    itemID:number,
    name:string,
    category:string,
    subCategoryName:string,
    imageURL:string,
    userEmail:string,
    price:number,
    stock:number,
    description:string,
    discount:number,
    communityName:string,
    province:string,
    city:string
  ) =>
  async (dispatch:Dispatch) => {
    dispatch({ type: ITEM_UPDATE_REQUEST, payload: itemID })
    try {
      const { data } = await Axios.patch(`/items/item/${itemID}`, {
        itemID,
        name,
        category,
        subCategoryName,
        imageURL,
        userEmail,
        price,
        stock,
        description,
        discount,
        communityName,
        province,
        city,
      })
      dispatch({ type: ITEM_UPDATE_SUCCESS, payload: data })
    } catch (error) {
      dispatch({
        type: ITEM_UPDATE_FAIL,
        payload:
        handleErrorPayload(error)
      })
    }
  }

export const updateItemName = (itemID:number, itemName:string) => async (dispatch:Dispatch) => {
  dispatch({ type: ITEM_UPDATE_REQUEST, payload: itemID })
  try {
    const { data } = await Axios.put(
      `/market/item/update/${itemID}`,
      {
        itemName,
      },
      { headers: await auth({}) }
    )
    dispatch({ type: ITEM_UPDATE_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: ITEM_UPDATE_FAIL,
      payload:
      handleErrorPayload(error)
    })
  }
}

export const updateItemPrice = (itemID:string, unitPrice:number) => async (dispatch: Dispatch) => {
  dispatch({ type: ITEM_UPDATE_REQUEST, payload: itemID })
  try {
    const { data } = await Axios.put(
      `/market/item/update/${itemID}`,
      {
        unitPrice,
      },
      { headers: await auth({}) }
    )
    dispatch({ type: ITEM_UPDATE_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: ITEM_UPDATE_FAIL,
      payload:
      handleErrorPayload(error)
    })
  }
}

export const updateItemStock = (itemID:number, stock:number) => async (dispatch: Dispatch) => {
  dispatch({ type: ITEM_UPDATE_REQUEST, payload: itemID })
  try {
    const { data } = await Axios.put(
      `/market/item/update/${itemID}`,
      {
        stock,
      },
      { headers: await auth({}) }
    )
    dispatch({ type: ITEM_UPDATE_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: ITEM_UPDATE_FAIL,
      payload:
      handleErrorPayload(error)
    })
  }
}

export const updateItemDescription =
  (itemID:number, description:string) => async (dispatch: Dispatch) => {
    dispatch({ type: ITEM_UPDATE_REQUEST, payload: itemID })
    try {
      const { data } = await Axios.put(
        `/market/item/update/${itemID}`,
        {
          description,
        },
        { headers: await auth({}) }
      )
      dispatch({ type: ITEM_UPDATE_SUCCESS, payload: data })
    } catch (error) {
      dispatch({
        type: ITEM_UPDATE_FAIL,
        payload:
        handleErrorPayload(error)
      })
    }
  }

export const updateItemCategory = (itemID:number, category:string) => async (dispatch: Dispatch) => {
  dispatch({ type: ITEM_UPDATE_REQUEST, payload: itemID })
  try {
    const { data } = await Axios.put(
      `/market/item/update/${itemID}`,
      {
        category,
      },
      { headers: await auth({}) }
    )
    dispatch({ type: ITEM_UPDATE_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: ITEM_UPDATE_FAIL,
      payload:
      handleErrorPayload(error)
    })
  }
}

export const updateItemSubcategory =
  (itemID:number, subcategory:string) => async (dispatch: Dispatch) => {
    dispatch({ type: ITEM_UPDATE_REQUEST, payload: itemID })
    try {
      const { data } = await Axios.put(
        `/market/item/update/${itemID}`,
        {
          subcategory,
        },
        { headers: await auth({}) }
      )
      dispatch({ type: ITEM_UPDATE_SUCCESS, payload: data })
    } catch (error) {
      dispatch({
        type: ITEM_UPDATE_FAIL,
        payload:
        handleErrorPayload(error)
      })
    }
  }

export const updateItemLocation =
  (itemID:number, province:string, city:string) => async (dispatch: Dispatch) => {
    dispatch({ type: ITEM_UPDATE_REQUEST, payload: itemID })
    try {
      const { data } = await Axios.put(
        `/market/item/update/${itemID}`,
        {
          province,
          city,
        },
        { headers: await auth({}) }
      )
      dispatch({ type: ITEM_UPDATE_SUCCESS, payload: data })
    } catch (error) {
      dispatch({
        type: ITEM_UPDATE_FAIL,
        payload:
        handleErrorPayload(error)
      })
    }
  }

export const updateItemDiscount = (itemID:number, discount:number) => async (dispatch: Dispatch) => {
  dispatch({ type: ITEM_UPDATE_REQUEST, payload: itemID })
  try {
    const { data } = await Axios.put(
      `/market/item/update/${itemID}`,
      {
        discount,
      },
      { headers: await auth({}) }
    )
    dispatch({ type: ITEM_UPDATE_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: ITEM_UPDATE_FAIL,
      payload:
      handleErrorPayload(error)
    })
  }
}

//update an item image
export const updateItemImage = (itemID:number, itemImage:string) => async (dispatch: Dispatch) => {
  dispatch({ type: ITEM_UPDATE_IMAGE_REQUEST, payload: itemID })
  try {
    const { data } = await Axios.put(
      `/market/item/update/${itemID}`,
      {
        itemImage,
      },
      { headers: await auth({}) }
    )
    dispatch({ type: ITEM_UPDATE_IMAGE_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: ITEM_UPDATE_IMAGE_FAIL,
      payload:
      handleErrorPayload(error)
    })
  }
}

//delete an item
export const deleteItem = (itemID:number) => async (dispatch: Dispatch) => {
  dispatch({ type: ITEM_DELETE_REQUEST, payload: itemID })
  try {
    const { data } = await Axios.delete(`/market/item/${itemID}`, {
      headers: await auth({}),
    })
    dispatch({ type: ITEM_DELETE_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: ITEM_DELETE_FAIL,
      payload:
      handleErrorPayload(error)
    })
  }
}

// fetch item details from backend
export const getItem = (itemID:number) => async (dispatch: Dispatch) => {
  dispatch({ type: ITEM_GET_REQUEST, payload: itemID })
  try {
    const { data } = await Axios.get(`/market/item/${itemID}`, {
      headers: await auth({}),
    })
    dispatch({ type: ITEM_GET_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ type: ITEM_GET_FAIL, payload: handleErrorPayload(error) })
  }
}

export const getNewestItemsOfProducts =
  (limit:number, communityName:string, category:string) => async (dispatch: Dispatch) => {
    dispatch({ type: NEWEST_ITEM_LIST_PRODUCTS_REQUEST })
    try {
      const { data } = await Axios.get(`/market/item/newest`, {
        params: { communityName, category, limit },
        headers: await auth({})
      })
      dispatch({ type: NEWEST_ITEM_LIST_PRODUCTS_SUCCESS, payload: data })
    } catch (error) {
      dispatch({ type: NEWEST_ITEM_LIST_PRODUCTS_FAIL, payload: handleErrorPayload(error) })
    }
  }

export const getNewestItemsOfServices =
  (limit:number, communityName:string, category:string) => async (dispatch: Dispatch) => {
    dispatch({ type: NEWEST_ITEM_LIST_SERVICES_REQUEST })
    try {
      const { data } = await Axios.get(`/market/item/newest`, {
        params: { communityName, category, limit },
        headers: await auth({})
      })
      dispatch({ type: NEWEST_ITEM_LIST_SERVICES_SUCCESS, payload: data })
    } catch (error) {
      dispatch({ type: NEWEST_ITEM_LIST_SERVICES_FAIL, payload: handleErrorPayload(error) })
    }
  }

export const getNewestItemsOfExpertises =
  (limit:number, communityName:string, category:string) => async (dispatch: Dispatch) => {
    dispatch({ type: NEWEST_ITEM_LIST_EXPERTISES_REQUEST })
    try {
      const { data } = await Axios.get(`/market/item/newest`, {
        params: { communityName, category, limit },
        headers: await auth({})
      })
      dispatch({ type: NEWEST_ITEM_LIST_EXPERTISES_SUCCESS, payload: data })
    } catch (error) {
      dispatch({
        type: NEWEST_ITEM_LIST_EXPERTISES_FAIL,
        payload: handleErrorPayload(error),
      })
    }
  }

// fetch item list in different category from backend
//(category:string, limit:number, page, reversed:boolean, communityName:string) 
export const getItemsOfCategory =
  (category:string, limit:number, communityName:string) => async (dispatch: Dispatch) => {
    dispatch({ type: ITEM_LIST_CATEGORY_REQUEST })
    try {
      const { data } = await Axios.get(`/market/item/category`, {
        headers: await auth({}),
        params: { communityName, category, limit },
      })
      dispatch({ type: ITEM_LIST_CATEGORY_SUCCESS, payload: data })
    } catch (error) {
      dispatch({ type: ITEM_LIST_CATEGORY_FAIL, payload: handleErrorPayload(error) })
    }
  }

// fetch a list of itmes for a giving user from backend (limit:number, page:number, reversed:boolean)
export const getItemsOfUser = (limit:number) => async (dispatch: Dispatch) => {
  dispatch({ type: ITEM_LIST_USER_REQUEST })

  try {
    const { data } = await Axios.get(`/market/item/userItem`, {
      headers: await auth({}),
      params: { limit },
    })
    console.log(data)
    dispatch({ type: ITEM_LIST_USER_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ type: ITEM_LIST_USER_FAIL, payload: handleErrorPayload(error) })
  }
}

// fetch item list for a giving sub-category from backend
export const getItemsOfSubCategory =
  (subcategoryName:string, limit:number, page:number, reversed:boolean, communityName:string) =>
  async (dispatch: Dispatch) => {
    dispatch({ type: ITEM_LIST_SUBCATEGORY_REQUEST })
    try {
      const { data } = await Axios.get(
        `/items/getItemsOfSubCategory/${subcategoryName}-${limit}-${page}-${reversed}`,
        {data: communityName }
      )
      dispatch({ type: ITEM_LIST_SUBCATEGORY_SUCCESS, payload: data })
    } catch (error) {
      dispatch({ type: ITEM_LIST_SUBCATEGORY_FAIL, payload: handleErrorPayload(error) })
    }
  }


