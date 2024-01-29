import configureStore from "redux-mock-store"
import thunk from "redux-thunk"
import data from "./testData.json"
import MockAdapter from "axios-mock-adapter"
import axios from "axios"
import {
  createItem,
  updateItem,
  updateItemImage,
  deleteItem,
  getItem,
  getNewestItems,
  getItemsOfCategory,
  getItemsOfUser,
  getItemsOfSubCategory,
} from "redux/actions/itemActions"
import {
  ITEM_CREATE_FAIL,
  ITEM_CREATE_SUCCESS,
  ITEM_DELETE_FAIL,
  ITEM_DELETE_SUCCESS,
  ITEM_GET_FAIL,
  ITEM_GET_SUCCESS,
  ITEM_LIST_CATEGORY_FAIL,
  ITEM_LIST_CATEGORY_SUCCESS,
  ITEM_LIST_FAIL,
  ITEM_LIST_SUBCATEGORY_FAIL,
  ITEM_LIST_SUBCATEGORY_SUCCESS,
  ITEM_LIST_SUCCESS,
  ITEM_LIST_USER_FAIL,
  ITEM_LIST_USER_SUCCESS,
  ITEM_UPDATE_FAIL,
  ITEM_UPDATE_IMAGE_FAIL,
  ITEM_UPDATE_IMAGE_SUCCESS,
  ITEM_UPDATE_SUCCESS,
} from "redux/constants/itemConstants"

const middlewares = [thunk]
const mockStore = configureStore(middlewares)
const mock = new MockAdapter(axios)

describe("Item actions testing", () => {
  var initialState
  var store

  beforeEach(() => {
    initialState = {}
    store = mockStore(initialState)
  })

  describe("Item actions testing", () => {
    describe("createItem action", () => {
      it("should create a new item for a request with all required values", async () => {
        mock.onPost("/items/item").reply(200, data.items[0])
        await store.dispatch(
          createItem(
            "Products",
            "Birthday Cake",
            20,
            "user02@gmail.com",
            "/images/product_cake.jpg",
            100,
            "",
            0.9,
            ""
          )
        )
        const actions = store.getActions()
        const expectedPayload = {
          payload: data.items[0],
          type: ITEM_CREATE_SUCCESS,
        }
        expect(actions[1]).toEqual(expectedPayload)
      })

      it("should not create a new item for a request without product name", async () => {
        mock
          .onPost("/items/item")
          .reply(400, { message: "You should filled in the required fields" })
        await store.dispatch(
          createItem(
            "Products",
            "",
            20,
            "user02@gmail.com",
            "/images/product_cake.jpg",
            100,
            "",
            0.9,
            ""
          )
        )
        const actions = store.getActions()
        const expectedPayload = {
          payload: "You should filled in the required fields",
          type: ITEM_CREATE_FAIL,
        }
        expect(actions[1]).toEqual(expectedPayload)
      })
    })

    describe("updateItem action", () => {
      it("should update the item information successfully", async () => {
        mock
          .onPut("/items/item/5ff49fdb2b3346baec7b48ea")
          .reply(200, data.updateItems[1])
        await store.dispatch(
          updateItem(
            "5ff49fdb2b3346baec7b48ea",
            "Products",
            "Birthday Cake",
            20,
            "/images/product_cake.jpg",
            100,
            "",
            0.9,
            ""
          )
        )
        const actions = store.getActions()
        const expectedPayload = {
          payload: data.updateItems[1],
          type: ITEM_UPDATE_SUCCESS,
        }
        expect(actions[1]).toEqual(expectedPayload)
      })

      it("should not update the item information when the server is down", async () => {
        mock
          .onPut("/items/item/5ff49fdb2b3346baec7b48ea")
          .reply(444, { message: "No Response" })
        await store.dispatch(
          updateItem(
            "5ff49fdb2b3346baec7b48ea",
            "Products",
            "Birthday Cake",
            20,
            "/images/product_cake.jpg",
            100,
            "",
            0.9,
            ""
          )
        )
        const actions = store.getActions()
        const expectedPayload = {
          payload: "No Response",
          type: ITEM_UPDATE_FAIL,
        }
        expect(actions[1]).toEqual(expectedPayload)
      })
    })

    describe("updateItemImage action", () => {
      it("should update the item image with new uploaded image", async () => {
        mock
          .onPut("/items/item/5ff49fdb2b3346baec7b48ea")
          .reply(200, data.updateItems[2])
        await store.dispatch(
          updateItemImage("5ff49fdb2b3346baec7b48ea", "imageBinaryData")
        )
        const actions = store.getActions()
        const expectedPayload = {
          payload: data.updateItems[2],
          type: ITEM_UPDATE_IMAGE_SUCCESS,
        }
        expect(actions[1]).toEqual(expectedPayload)
      })

      it("should not update the item image when the input is empty", async () => {
        mock
          .onPut("/items/item/5ff49fdb2b3346baec7b48ea")
          .reply(400, { message: "You should choose a new image" })
        await store.dispatch(
          updateItemImage(
            "5ff49fdb2b3346baec7b48ea",
            "Products",
            "Birthday Cake",
            20,
            "/images/product_cake.jpg",
            100,
            "",
            0.9,
            ""
          )
        )
        const actions = store.getActions()
        const expectedPayload = {
          payload: "You should choose a new image",
          type: ITEM_UPDATE_IMAGE_FAIL,
        }
        expect(actions[1]).toEqual(expectedPayload)
      })
    })
  })

  describe("deleteItem action", () => {
    it("delete the item sucessfully", async () => {
      mock.onDelete("/items/item/5ff49fdb2b3346baec7b48ea").reply(200, "done")
      await store.dispatch(deleteItem("5ff49fdb2b3346baec7b48ea"))
      const actions = store.getActions()
      const expectedPayload = {
        payload: "done",
        type: ITEM_DELETE_SUCCESS,
      }
      expect(actions[1]).toEqual(expectedPayload)
    })

    it("should fail to delete the item if it has been sold", async () => {
      mock.onDelete("/items/item/5ff49fdb2b3346baec7b48ea").reply(400, {
        message: "You can not delete the item since some people bought it",
      })
      await store.dispatch(deleteItem("5ff49fdb2b3346baec7b48ea"))
      const actions = store.getActions()
      const expectedPayload = {
        type: ITEM_DELETE_FAIL,
        payload: "You can not delete the item since some people bought it",
      }
      expect(actions[1]).toEqual(expectedPayload)
    })
  })

  describe("getItem action", () => {
    it("should get the item sucessfully if the user exists", async () => {
      mock
        .onGet("/items/item/5ff49fdb2b3346baec7b48ea")
        .reply(200, data.items[0])
      await store.dispatch(getItem("5ff49fdb2b3346baec7b48ea"))
      const actions = store.getActions()
      const expectedPayload = {
        payload: data.items[0],
        type: ITEM_GET_SUCCESS,
      }
      expect(actions[1]).toEqual(expectedPayload)
    })

    it("should fail to get the item if the item does not exit", async () => {
      mock.onGet("/items/item/2222").reply(404, { message: "" })
      await store.dispatch(getItem("2222"))
      const actions = store.getActions()
      const expectedPayload = {
        payload: "Request failed with status code 404",
        type: ITEM_GET_FAIL,
      }
      expect(actions[1]).toEqual(expectedPayload)
    })
  })

  describe("getNewestItems action", () => {
    it("should get a list of newest items", async () => {
      mock.onGet("/items/getNewestItems/1-20").reply(200, data.items)
      await store.dispatch(getNewestItems(20, 1))
      const actions = store.getActions()
      const expectedPayload = {
        payload: data.items,
        type: ITEM_LIST_SUCCESS,
      }
      expect(actions[1]).toEqual(expectedPayload)
    })

    it("should not get any items if the server is down", async () => {
      mock.onGet("/items/getNewestItems/1-10").reply(444, { message: "" })
      await store.dispatch(getNewestItems(10, 1))
      const actions = store.getActions()
      const expectedPayload = {
        payload: "Request failed with status code 444",
        type: ITEM_LIST_FAIL,
      }
      expect(actions[1]).toEqual(expectedPayload)
    })
  })

  describe("getItemsOfCategory action", () => {
    it("should get a list of items for the given category", async () => {
      mock
        .onGet("/items/getItemsOfCategory/products-10-1-reversed")
        .reply(200, data.products)
      await store.dispatch(getItemsOfCategory("products", 10, 1, "reversed"))
      const actions = store.getActions()
      const expectedPayload = {
        payload: data.products,
        type: ITEM_LIST_CATEGORY_SUCCESS,
      }
      expect(actions[1]).toEqual(expectedPayload)
    })

    it("should not get any items for the given category if the server is down", async () => {
      mock
        .onGet("/items/getItemsOfCategory/products-10-1-reversed")
        .reply(444, { message: "" })
      await store.dispatch(getItemsOfCategory("products", 10, 1, "reversed"))
      const actions = store.getActions()
      const expectedPayload = {
        payload: "Request failed with status code 444",
        type: ITEM_LIST_CATEGORY_FAIL,
      }
      expect(actions[1]).toEqual(expectedPayload)
    })
  })

  describe("getItemsOfUser action", () => {
    it("should get a list of items for the given user", async () => {
      mock
        .onGet("/items/getItemsOfUser/user02@gmail.com-10-1-reversed")
        .reply(200, data.products)
      await store.dispatch(
        getItemsOfUser("user02@gmail.com", 10, 1, "reversed")
      )
      const actions = store.getActions()
      const expectedPayload = {
        payload: data.products,
        type: ITEM_LIST_USER_SUCCESS,
      }
      expect(actions[1]).toEqual(expectedPayload)
    })

    it("should not get any items for the given user if the server is down", async () => {
      mock
        .onGet("/items/getItemsOfUser/user02@gmail.com-10-1-reversed")
        .reply(444, { message: "" })
      await store.dispatch(
        getItemsOfUser("user02@gmail.com", 10, 1, "reversed")
      )
      const actions = store.getActions()
      const expectedPayload = {
        payload: "Request failed with status code 444",
        type: ITEM_LIST_USER_FAIL,
      }
      expect(actions[1]).toEqual(expectedPayload)
    })
  })

  describe("getItemsOfSubCategory action", () => {
    it("should get a list of items for the given subcategory", async () => {
      mock
        .onGet("/items/getItemsOfSubCategory/food-10-1-reversed")
        .reply(200, data.products)
      await store.dispatch(getItemsOfSubCategory("food", 10, 1, "reversed"))
      const actions = store.getActions()
      const expectedPayload = {
        payload: data.products,
        type: ITEM_LIST_SUBCATEGORY_SUCCESS,
      }
      expect(actions[1]).toEqual(expectedPayload)
    })

    it("should not get any items for the given subcategory if the server is down", async () => {
      mock
        .onGet("/items/getItemsOfSubCategory/food-10-1-reversed")
        .reply(444, { message: "" })
      await store.dispatch(getItemsOfSubCategory("food", 10, 1, "reversed"))
      const actions = store.getActions()
      const expectedPayload = {
        payload: "Request failed with status code 444",
        type: ITEM_LIST_SUBCATEGORY_FAIL,
      }
      expect(actions[1]).toEqual(expectedPayload)
    })
  })
})
