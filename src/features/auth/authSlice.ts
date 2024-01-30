import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "app/store"

type AuthState = {
  user: User | null
  token: string | null
}

const initialState: AuthState = {
  user: (() => {
    const user = localStorage.getItem("userInfo")
    if (user) return JSON.parse(user) as User
    return null
  })(),
  token: localStorage.getItem("token"),
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      { payload: { user, token } }: PayloadAction<{ user: User; token: string }>
    ) => {
      state.user = user
      state.token = token
    },
    updateProfile: (state, action: PayloadAction<User["marketProfile"]>) => {
      if (state.user) {
        return {
          ...state,
          user: {
            ...state.user,
            marketProfile: action.payload,
          },
        }
      }
      return state
    },
    signOut: (state) => {
      localStorage.removeItem("userInfo")
      localStorage.removeItem("token")
      state.user = null
    },
  },
})

export const { setCredentials, signOut } = authSlice.actions

export default authSlice.reducer

export const selectCurrentUser = (state: RootState) => state.auth.user
