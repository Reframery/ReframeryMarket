type TimeStamped<T> = T & {
  createdAt: string
  updatedAt: string
}

type MarketProfile = TimeStamped<{
  firstName: string | null
  lastName: string | null
  username: string | null
  phone: string | null
  dob: string | null
  unitNumber: string | null
  streetNumber: string | null
  addressLine1: string | null
  addressLine2: string | null
  city: string | null
  region: string | null
  postalCode: string | null
  communityName: string | null
  currentCredit: number | null
  walletAddress: string | null
  userId: number
}>

type User = {
  id: number
  email: string
  name: string | null
  image: string | null
  role: "ADMIN" | "USER"
  accessToken: string
  marketProfile: MarketProfile
}

type MarketItem = TimeStamped<{
  id: number
  userId: number
  itemName: string
  itemImage: string | null
  unitPrice: number
  discount: number
  stock: number
  description: string | null
  category: string
  subcategory: string | null
  province: string
  city: string | null
  communityName: string
  averageRating: number | null
  numberOfFeedbacks: number
}>

type CartItem = {
  id: number
  itemId: number
  userId: number
  count: number
}
