import { api } from "./api"

const BASE_URL = "/market"

const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    profile: builder.query<User["marketProfile"], void>({
      query: () => `${BASE_URL}/profile`,
      providesTags: ["UserProfile"],
    }),
    updateProfile: builder.mutation<string, User["marketProfile"]>({
      query: (body) => ({
        url: `${BASE_URL}/profile`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["UserProfile"],
    }),
  }),
})

export const { useProfileQuery, useUpdateProfileMutation } = userApi
