import axiosClient from './axiosClient'

const userApi = {
  login: ({ userName, password }: { userName: string; password: string }) => {
    const url = '/auth/login'
    return axiosClient.post(url, { userName, password })
  },
}

export default userApi
