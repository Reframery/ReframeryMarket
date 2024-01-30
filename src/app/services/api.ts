import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import type { RootState } from "app/store"

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:7564",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token

      if (token) headers.set("Authorization", `Bearer ${token}`)

      return headers
    },
  }),
  tagTypes: [
    "Cart",
    "Item",
    "AdminUser",
    "AdminUserSearch",
    "UserProfile",
    "Transaction",
  ],
  endpoints: () => ({}),
})
