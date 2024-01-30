import { AxiosHeaders } from "axios"

export default async function auth(
  headers: AxiosHeaders | Record<string, never>
) {
  const token = JSON.parse(
    localStorage.getItem("userInfo") as string
  ).accessToken
  return token ? { ...headers, Authorization: `Bearer ${token}` } : headers
}

export const isAdmin = (userInfo: Pick<User, "role">) =>
  userInfo.role === "ADMIN"
