import Axios from 'axios';

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

} from '../constants/itemConstants';

Axios.defaults.auth = {
  username: 'access_key_admin',
  password: 'secret_key_hush',
};

Axios.defaults.baseURL = 'http://localhost:4000';


// create an new item and send it to backend
//xport const createItem = (category, name, price, userEmail, image, stock, description, discount, subCategoryID) => async (dispatch) => {
export const createItem = (name, category, subCategoryName, imageURL, userEmail, price, stock, description, discount, communityName, province, city) => async (dispatch) => {

  dispatch({ type: ITEM_CREATE_REQUEST, payload: { name, category, subCategoryName, imageURL, userEmail, price, stock, description, discount, communityName, province, city } });
  try {
    const { data } = await Axios.post('/items/item', { name, category, subCategoryName, imageURL, userEmail, price, stock, description, discount, communityName, province, city });
    dispatch({ type: ITEM_CREATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ITEM_CREATE_FAIL, payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//update an item attributes 
export const updateItem = (itemID, name, category, subCategoryName, imageURL, userEmail, price, stock, description, discount, communityName, province, city
) => async (dispatch) => {
  dispatch({ type: ITEM_UPDATE_REQUEST, payload: itemID });
  try {
    const { data } = await Axios.patch(`/items/item/${itemID}`,
      {
        itemID, name, category, subCategoryName, imageURL, userEmail, price, stock, description, discount, communityName, province, city
      }
    );
    dispatch({ type: ITEM_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ITEM_UPDATE_FAIL, payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

export const updateItemName = (itemID, name
) => async (dispatch) => {
  dispatch({ type: ITEM_UPDATE_REQUEST, payload: itemID });
  try {
    const { data } = await Axios.patch(`/items/item/${itemID}`,
      {
        itemID, name
      }
    );
    dispatch({ type: ITEM_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ITEM_UPDATE_FAIL, payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

export const updateItemPrice = (itemID, price
) => async (dispatch) => {
  dispatch({ type: ITEM_UPDATE_REQUEST, payload: itemID });
  try {
    const { data } = await Axios.patch(`/items/item/${itemID}`,
      {
        itemID, price
      }
    );
    dispatch({ type: ITEM_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ITEM_UPDATE_FAIL, payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

export const updateItemStock = (itemID, stock
) => async (dispatch) => {
  dispatch({ type: ITEM_UPDATE_REQUEST, payload: itemID });
  try {
    const { data } = await Axios.patch(`/items/item/${itemID}`,
      {
        itemID, stock
      }
    );
    dispatch({ type: ITEM_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ITEM_UPDATE_FAIL, payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};


export const updateItemDescription = (itemID, description
) => async (dispatch) => {
  dispatch({ type: ITEM_UPDATE_REQUEST, payload: itemID });
  try {
    const { data } = await Axios.patch(`/items/item/${itemID}`,
      {
        itemID, description
      }
    );
    dispatch({ type: ITEM_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ITEM_UPDATE_FAIL, payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

export const updateItemCategory = (itemID, category
  ) => async (dispatch) => {
    dispatch({ type: ITEM_UPDATE_REQUEST, payload: itemID });
    try {
      const { data } = await Axios.patch(`/items/item/${itemID}`,
        {
          itemID, category
        }
      );
      dispatch({ type: ITEM_UPDATE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: ITEM_UPDATE_FAIL, payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
      });
    }
  };

  export const updateItemSubcategory = (itemID, subCategoryName
    ) => async (dispatch) => {
      dispatch({ type: ITEM_UPDATE_REQUEST, payload: itemID });
      try {
        const { data } = await Axios.patch(`/items/item/${itemID}`,
          {
            itemID, subCategoryName
          }
        );
        dispatch({ type: ITEM_UPDATE_SUCCESS, payload: data });
      } catch (error) {
        dispatch({
          type: ITEM_UPDATE_FAIL, payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message
        });
      }
    };

  export const updateItemLocation = (itemID, province, city
    ) => async (dispatch) => {
      dispatch({ type: ITEM_UPDATE_REQUEST, payload: itemID });
      try {
        const { data } = await Axios.patch(`/items/item/${itemID}`,
          {
            itemID, province, city
          }
        );
        dispatch({ type: ITEM_UPDATE_SUCCESS, payload: data });
      } catch (error) {
        dispatch({
          type: ITEM_UPDATE_FAIL, payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message
        });
      }
    };



  export const updateItemDiscount = (itemID, discount
    ) => async (dispatch) => {
      dispatch({ type: ITEM_UPDATE_REQUEST, payload: itemID });
      try {
        const { data } = await Axios.patch(`/items/item/${itemID}`,
          {
            itemID, discount
          }
        );
        dispatch({ type: ITEM_UPDATE_SUCCESS, payload: data });
      } catch (error) {
        dispatch({
          type: ITEM_UPDATE_FAIL, payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message
        });
      }
    };


//update an item image
export const updateItemImage = (itemID, imageURL) => async (dispatch) => {
  dispatch({ type: ITEM_UPDATE_IMAGE_REQUEST, payload: itemID });
  try {
    const { data } = await Axios.patch(`/items/item/${itemID}`,
      {
        itemID, imageURL
      }
    );
    dispatch({ type: ITEM_UPDATE_IMAGE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ITEM_UPDATE_IMAGE_FAIL, payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

//delete an item
export const deleteItem = (itemID) => async (dispatch) => {
  dispatch({ type: ITEM_DELETE_REQUEST, payload: itemID });
  try {
    const { data } = await Axios.delete(`/items/item/${itemID}`);
    dispatch({ type: ITEM_DELETE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ITEM_DELETE_FAIL, payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

// fetch item details from backend
export const getItem = (itemID) => async (dispatch) => {
  dispatch({ type: ITEM_GET_REQUEST, payload: itemID });
  try {
    const { data } = await Axios.get(`/items/item/${itemID}`);
    dispatch({ type: ITEM_GET_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ITEM_GET_FAIL, payload: error.message });
  }
}

// fetch item list of products
export const getNewestItemsOfProducts = (limit, communityName, category) => async (dispatch) => {
  dispatch({ type: NEWEST_ITEM_LIST_PRODUCTS_REQUEST });
  try {
    const { data } = await Axios.get(`/items/newestItems/${communityName}-${limit}?category=${category}`);
    dispatch({ type: NEWEST_ITEM_LIST_PRODUCTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: NEWEST_ITEM_LIST_PRODUCTS_FAIL, payload: error.message });
  }
};

// fetch item list of services
export const getNewestItemsOfServices = (limit, communityName, category) => async (dispatch) => {
  dispatch({ type: NEWEST_ITEM_LIST_SERVICES_REQUEST });
  try {
    const { data } = await Axios.get(`/items/newestItems/${communityName}-${limit}?category=${category}`);
    dispatch({ type: NEWEST_ITEM_LIST_SERVICES_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: NEWEST_ITEM_LIST_SERVICES_FAIL, payload: error.message });
  }
};

// fetch item list of expertises
export const getNewestItemsOfExpertises = (limit, communityName, category) => async (dispatch) => {
  dispatch({ type: NEWEST_ITEM_LIST_EXPERTISES_REQUEST });
  try {
    const { data } = await Axios.get(`/items/newestItems/${communityName}-${limit}?category=${category}`);
    dispatch({ type: NEWEST_ITEM_LIST_EXPERTISES_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: NEWEST_ITEM_LIST_EXPERTISES_FAIL, payload: error.message });
  }
};

// fetch item list in different category from backend
export const getItemsOfCategory = (category, limit, page, reversed, communityName) => async (dispatch) => {
  dispatch({ type: ITEM_LIST_CATEGORY_REQUEST });
  try {
    const { data } = await Axios.get(`/items/itemsOfCategory/${category}-${limit}-${page}-${reversed}-${communityName}`);
    dispatch({ type: ITEM_LIST_CATEGORY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ITEM_LIST_CATEGORY_FAIL, payload: error.message });
  }
};

// fetch alist of itmes for a giving user from backend
export const getItemsOfUser = (userEmail, limit, page, reversed) => async (dispatch) => {
  dispatch({ type: ITEM_LIST_USER_REQUEST });

  try {
    const { data } = await Axios.get(`/items/itemsOfUser/${userEmail}-${limit}-${page}-${reversed}`);
    dispatch({ type: ITEM_LIST_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ITEM_LIST_USER_FAIL, payload: error.message });
  }
};

// fetch item list for a giving sub-category from backend
export const getItemsOfSubCategory = (subcategoryName, limit, page, reversed, communityName) => async (dispatch) => {
  dispatch({ type: ITEM_LIST_SUBCATEGORY_REQUEST });
  try {
    const { data } = await Axios.get(`/items/getItemsOfSubCategory/${subcategoryName}-${limit}-${page}-${reversed}`, { communityName });
    dispatch({ type: ITEM_LIST_SUBCATEGORY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ITEM_LIST_SUBCATEGORY_FAIL, payload: error.message });
  }
};

