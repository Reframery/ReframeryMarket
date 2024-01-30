import {
  type SerializedError,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit"
import {
  GetCart,
  AddItemToCart,
  UpdateItemQuantity,
  DeleteItemFromCart,
} from "api/cart"

type CartState = {
  loading: boolean
  cart: {
    id: number
    itemId: number
    userId: number
    count: number
  }[]
  error: SerializedError | null
  mutation: {
    data: {
      id?: number
      type: string
    } | null
    loading: boolean
    error: SerializedError | null
  }
}

const initialState: CartState = {
  loading: false,
  cart: [],
  error: null,
  mutation: {
    loading: false,
    data: null,
    error: null,
  },
}

const getCart = createAsyncThunk("cart/fetchCart", GetCart)

const addItemToCart = createAsyncThunk("cart/addItem", AddItemToCart)

const updateItemQuantity = createAsyncThunk(
  "cart/updateItemQuantity",
  UpdateItemQuantity
)

const deleteItemFromCart = createAsyncThunk(
  "cart/deleteItem",
  DeleteItemFromCart
)

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCart.pending, (state) => {
        state.loading = true
      })
      .addCase(getCart.fulfilled, (state, action) => {
        state.loading = false
        state.cart = action.payload
      })
      .addCase(getCart.rejected, (state, action) => {
        state.loading = false
        state.error = action.error
      })
      .addCase(addItemToCart.pending, (state) => {
        state.mutation.loading = true
      })
      .addCase(addItemToCart.fulfilled, (state, action) => {
        state.mutation.loading = false
        state.cart = [...state.cart, action.payload]
      })
      .addCase(addItemToCart.rejected, (state, action) => {
        state.mutation.loading = false
        state.mutation.error = action.error
      })
      .addCase(updateItemQuantity.pending, (state) => {
        state.mutation.loading = true
      })
      .addCase(updateItemQuantity.fulfilled, (state, action) => {
        state.mutation.loading = false
        state.cart = state.cart.map((item) =>
          item.id === action.payload.id ? action.payload : item
        )
      })
      .addCase(updateItemQuantity.rejected, (state, action) => {
        state.loading = false
        state.mutation.error = action.error
      })
      .addCase(deleteItemFromCart.pending, (state) => {
        state.mutation.loading = true
      })
      .addCase(deleteItemFromCart.fulfilled, (state, action) => {
        state.mutation.loading = false
        state.cart = state.cart.map((item) =>
          item.id === action.payload.id ? action.payload : item
        )
      })
      .addCase(deleteItemFromCart.rejected, (state, action) => {
        state.loading = false
        state.mutation.error = action.error
      })
  },
})

export { getCart, addItemToCart, updateItemQuantity, deleteItemFromCart }

export default cartSlice.reducer
