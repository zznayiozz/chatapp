import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import queryString from 'query-string'
const LOCAL_STORAGE_AUTH = 'AUTH_TOCKEN'

// Set up default config for http requests here
// Please have a look at here `https://github.com/axios/axios#request- config` for the full list of configs
const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'content-type': 'application/json',
  },
  paramsSerializer: (params) => queryString.stringify(params),
})

axiosClient.interceptors.request.use(async (config: AxiosRequestConfig) => {
  const currentUser = localStorage.getItem(LOCAL_STORAGE_AUTH)
  const hasUser = currentUser ? JSON.parse(currentUser) : null
  const token = hasUser ? hasUser.accessTocken : null

  if (token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    }
  }

  return config
})

axiosClient.interceptors.response.use(
  (response: AxiosResponse<any, any>) => {
    if (response && response.data) {
      return response.data
    }

    return response
  },
  (error) => {
    // Handle errors
    throw error
  }
)

export default axiosClient
