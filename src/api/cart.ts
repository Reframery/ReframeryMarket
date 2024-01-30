import axios from "../lib/axios"

const BASE_URL = "/market/cart"

export const GetCart = async () => {
  const res = await axios.get(BASE_URL)

  return res.data
}

export const AddItemToCart = async (data: {
  itemId: number
  quantity: number
}) => {
  const res = await axios.post(`${BASE_URL}/add`, data, {})

  return res.data
}

export const UpdateItemQuantity = async (data: {
  cartId: number
  quantity: number
}) => {
  const res = await axios.put(`${BASE_URL}/update/${data.cartId}`, {
    quantity: data.quantity,
  })

  return res.data
}

export const DeleteItemFromCart = async (cartId: number) => {
  const res = await axios.delete(`${BASE_URL}/${cartId}`, {})

  return res.data
}
