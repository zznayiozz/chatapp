import axiosClient from './axiosClient'

const postApi = {
  getAll: () => {
    const url = '/getpost'
    return axiosClient.get(url)
  },
}

export default postApi
