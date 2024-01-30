import { api } from "./api"

const BASE_URL = "/market/cart"

export type AddItemRequest = {
  itemId: number
  quantity: number
}

export type UpdateItemQuantityRequest = {
  cartId: number
  quantity: number
}

const cartApi = api.injectEndpoints({
  endpoints: (builder) => ({
    cart: builder.query<CartItem[], void>({
      query: () => BASE_URL,
      providesTags: ["Cart"],
    }),
    addCartItem: builder.mutation<string, AddItemRequest>({
      query: (body) => ({
        url: `${BASE_URL}/add`,
        method: "POST",
        body,
        invalidateTags: ["Cart"],
      }),
    }),
    updateCartItemQuantity: builder.mutation<
      CartItem,
      UpdateItemQuantityRequest
    >({
      query: ({ cartId, quantity }) => ({
        url: `${BASE_URL}/update/${cartId}`,
        method: "PUT",
        body: { quantity },
        invalidateTags: ["Cart"],
      }),
    }),
    deleteCartItem: builder.mutation<string, number>({
      query: (cartItemId) => ({
        url: `${BASE_URL}/${cartItemId}`,
        method: "DELETE",
        invalidateTags: ["Cart"],
      }),
    }),
  }),
})

export const {
  useCartQuery,
  useAddCartItemMutation,
  useUpdateCartItemQuantityMutation,
  useDeleteCartItemMutation,
} = cartApi
