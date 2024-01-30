import axios from "lib/axios"

const BASE_URL = "/market/item"

export const CreateItem = async (data: {
  itemName: string
  itemImage?: string
  unitPrice: number
  discount: number
  stock: number
  description?: string
  category: string
  subcategory?: string
  province: string
  city?: string
  communityName: string
}): Promise<MarketItem> => {
  const res = await axios.post(`${BASE_URL}/add`, data)
  return res.data
}

export const GetItems = async (params: {
  limit?: number
  page?: number
  reversed?: boolean
}) => {
  const res = await axios.get(`${BASE_URL}/userItem`, {
    params,
  })
  return res.data
}

export const GetItem = async (itemId: number) => {
  const res = await axios.get(`${BASE_URL}/${itemId}`)
  return res.data
}

export const DeleteItem = async (itemId: number) => {
  const res = await axios.delete(`${BASE_URL}/${itemId}`)
  return res.data
}

export type SearchItemParams = {
  community?: string
  searchTerm?: string
  category?: string
  subcategory?: string
  page: number
  limit: number
}

export const SearchItems = async (params: SearchItemParams) => {
  const res = await axios.get(`${BASE_URL}/search`, {
    params,
  })
  return res.data
}
