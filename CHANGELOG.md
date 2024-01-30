# Changes

## New Dependencies

## Migrate from CRA -> Vite

- [vite](https://vitejs.dev/)

## Migrate Old Redux Logic to New Redux Logic

- [Redux Toolkit Migrating Guide](https://redux.js.org/usage/migrating-to-modern-redux)
- [RTK](https://redux-toolkit.js.org/rtk-query/overview)
- RTK for data fetching and caching
  - app/services, is where the data fetching/mutation logic is, don't need to use axios with this approach

With this approach using `auth()` in headers is not needed as well

**app/services/api.ts**

```tsx
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
```

### Basic usage

- define a tag type in the main api file if needed (for revalidation after mutation)
- extend the base api for a new feature (transaction, item etc.)
- this example has the basic CRUD operations for an item
- hooks are automatically generated to fetch data in the component

**app/services/item.ts**

```tsx
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
  useItemQuery,
  useCreateItemMutation,
  useUpdateItemMutation,
  useDeleteItemMutation,
} = itemApi
```

**pages/item/EditItemPage.tsx**

```tsx
export default function EditItemPage() {
  const { id } = useParams()

  const { data: item, isFetching, error } = useItemQuery(Number(id))
  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Edit Item</h1>
      {isFetching ? (
        "loading..."
      ) : error ? (
        handleRTKError(error)
      ) : item ? (
        <ItemForm defaultValues={item} />
      ) : (
        "No item found"
      )}
    </>
  )
}
```

### Feature slices redux-toolkit

- feature slices for state management
- in the current auth flow the token/user are stored in the authSlice
- the initial data is fetched from local storage if exists, otherwise it is added when a user logs in

**features/auth/authSlice.ts**

```tsx
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
```

- hook for getting the user from any component/page

**hooks/useAuth.ts**

```tsx
import { useMemo } from "react"
import { useSelector } from "react-redux"
import { selectCurrentUser } from "features/auth/authSlice"

export const useAuth = () => {
  const user = useSelector(selectCurrentUser)

  return useMemo(() => ({ user }), [user])
}
```

## Better Route Layout Management

<!-- TODO -->

### Fix tests?

- dont know if this is worth doing thinking of removing testing

### Pages (Old redux)

- ProfilePage
- SearchResultsPage

### Pages (Fix/add missing functionality) Improve UI

- `ItemPage`
- `MoreItems`
- `PurchaseHistory`
- `SalesHistory`
- `UpdateUserAddressPage`
- `SearchResultPage`
- `WelcomePage`
- ... most of the components/pages

### Improvements

- cart page request should include item in cart cart:{include: items true}..
- fix multi-page form for purchase logic, `Cart` -> `AddressPage` -> `ConfirmPage` -> `PaymentPage`
- landing page links-to welcome page (so home route should be landing)
- item variants (custom seller management page, where users can add custom properties like color, style etc.)
- consistent pagination throughout the application
- multiple images for items
- Future: when the improvements are done, this entire app can easily be ported into the existing next.js frontend, making deployment a lot easier (next app, express app) only
