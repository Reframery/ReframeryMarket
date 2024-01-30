import { api } from "./api"

const BASE_URL = "/market"

type NonMarketUsers = Omit<User, "accessToken" | "marketProfile">[]

type ValidateUserRequest = {
  id: number
  communityName: string
}

const adminApi = api.injectEndpoints({
  endpoints: (builder) => ({
    nonMarketUsers: builder.query<NonMarketUsers, void>({
      query: () => `${BASE_URL}/non-market`,
      providesTags: ["AdminUser"],
    }),
    searchUser: builder.query<MarketProfile & { email: string }, string>({
      query: (arg) => `${BASE_URL}/user/${arg}`,
      providesTags: ["AdminUserSearch"],
    }),
    validateUser: builder.mutation<string, ValidateUserRequest>({
      query: (body) => ({
        url: `${BASE_URL}/profile`,
        method: "POST",
        body,
        invalidateTags: ["AdminUser"],
      }),
    }),
  }),
})

export const {
  useNonMarketUsersQuery,
  useSearchUserQuery,
  useValidateUserMutation,
} = adminApi
