import axios from "axios"
import config from "@/config"

const axiosInstance = axios.create({
  baseURL: config?.API_URL,
  timeout: 40000,
  headers: {
    Accept: "application/json, text/plain, */*",
    "Content-Type": "application/json; charset=utf-8",
  },
})

export default axiosInstance
