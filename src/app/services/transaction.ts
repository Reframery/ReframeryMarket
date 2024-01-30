import { api } from "./api"

const BASE_URL = "/market/transaction"

const transactionApi = api.injectEndpoints({
  endpoints: (builder) => ({
    transactions: builder.query<MarketTransaction[], void>({
      query: () => BASE_URL,
      providesTags: ["Transaction"],
    }),
  }),
})

export const { useTransactionsQuery } = transactionApi
