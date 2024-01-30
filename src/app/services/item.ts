import { api } from "./api"
import type { CreateItem } from "components/forms/ItemForm"

const BASE_URL = "/market/item"

export type ItemParams = {
  limit?: number
  page?: number
  reversed?: boolean
}

export type SearchItemParams = {
  communityName?: string
  searchTerm: string
  category?: string
  subcategory?: string
  limit?: number
}

export type CategoryItemParams = {
  limit?: number
  communityName?: string
  category: string
}

type ItemMutationRequest = CreateItem & { communityName: string }

const itemApi = api.injectEndpoints({
  endpoints: (builder) => ({
    items: builder.query<MarketItem[], ItemParams>({
      query: (params) => ({
        url: `${BASE_URL}/userItem`,
        params,
      }),
      providesTags: ["Item"],
    }),
    searchItems: builder.query<MarketItem[], SearchItemParams>({
      query: (params) => ({
        url: `${BASE_URL}/search`,
        params,
      }),
      providesTags: ["Item"],
    }),
    categoryItems: builder.query<MarketItem[], CategoryItemParams>({
      query: (params) => ({
        url: `${BASE_URL}/category`,
        params,
      }),
      providesTags: ["Item"],
    }),
    newItems: builder.query<
      MarketItem[],
      Omit<CategoryItemParams, "category"> & { category?: string }
    >({
      query: (params) => ({
        url: `${BASE_URL}/newest`,
        params,
      }),
      providesTags: ["Item"],
    }),
    item: builder.query<MarketItem, number>({
      query: (id) => ({ url: `${BASE_URL}/${id}` }),
      providesTags: ["Item"],
    }),
    createItem: builder.mutation<string, ItemMutationRequest>({
      query: (body) => ({
        url: BASE_URL,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Item"],
    }),
    updateItem: builder.mutation<string, ItemMutationRequest & { id: number }>({
      query: ({ id, ...body }) => ({
        url: `${BASE_URL}/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Item"],
    }),
    deleteItem: builder.mutation<string, number>({
      query: (id) => ({
        url: `${BASE_URL}/${id}`,
        method: "DELETE",
        invalidateTags: ["Item"],
      }),
    }),
  }),
})

export const {
  useItemsQuery,
  useSearchItemsQuery,
  useCategoryItemsQuery,
  useNewItemsQuery,
  useItemQuery,
  useCreateItemMutation,
  useUpdateItemMutation,
  useDeleteItemMutation,
} = itemApi
