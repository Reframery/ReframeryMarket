import { api } from "./api"

export type LoginRequest = {
  email: string
  password: string
}

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<User, LoginRequest>({
      query: (credentials) => ({
        url: "/market/login",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
})

export const { useLoginMutation } = authApi
