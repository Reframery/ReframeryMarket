import axios from "../lib/axios"

export const SignIn = async (data: {
  email: string
  password: string
}): Promise<User> => {
  const { data: resData } = await axios.post("/market/login", data)
  localStorage.setItem("userInfo", JSON.stringify(resData))
  localStorage.setItem("token", resData.accessToken)
  return resData
}

export const GetProfile = async () => {
  const res = await axios.get("/market/profile")
  return res.data
}
