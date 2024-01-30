import {
  PayloadAction,
  SerializedError,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit"
import axios from "lib/axios"

type SearchItemParams = {
  community?: string
  searchTerm?: string
  category?: string
  subcategory?: string
  page: number
  limit: number
}

type SearchState = {
  loading: boolean
  items: MarketItem[]
  params: SearchItemParams | null
  error: SerializedError | null
}

const initialState: SearchState = {
  loading: false,
  items: [],
  params: null,
  error: null,
}

// ! old thunk approach needs to be replaced with RTK query
const searchItems = createAsyncThunk(
  "/search",
  async (params: SearchItemParams) => {
    const res = await axios.get("/market/item/search", {
      params,
    })
    return res.data
  }
)

const searchSlice = createSlice({
  name: "item",
  initialState,
  reducers: {
    setSearchParams: (state, action: PayloadAction<SearchItemParams>) => {
      state.params = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchItems.pending, (state) => {
        state.loading = true
      })
      .addCase(searchItems.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload
      })
      .addCase(searchItems.rejected, (state, action) => {
        state.loading = false
        state.error = action.error
      })
  },
})

export { searchItems }

export const { setSearchParams } = searchSlice.actions

export default searchSlice.reducer
