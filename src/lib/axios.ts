import _axios from "axios"

const axios = (baseURL = "") => {
  const instance = _axios.create({
    baseURL: baseURL || "http://localhost:7564",
    timeout: 1000,
  })

  instance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token")
    config.headers.Authorization = token ? `Bearer ${token}` : ""
    return config
  })

  return instance
}

export { axios }
export default axios()
