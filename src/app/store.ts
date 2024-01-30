import { configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"
import {
  useDispatch as useAppDispatch,
  type TypedUseSelectorHook,
  useSelector as useAppSelector,
} from "react-redux"

import { api } from "./services/api"
import authReducer from "../features/auth/authSlice"
import searchReducer from "../features/searchSlice"

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    auth: authReducer,
    search: searchReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export const useDispatch: () => AppDispatch = useAppDispatch

export const useSelector: TypedUseSelectorHook<RootState> = useAppSelector

export default store

setupListeners(store.dispatch)
