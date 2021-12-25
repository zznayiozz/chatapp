import axios from 'axios'
const LOCAL_STORAGE_AUTH = 'AUTH_TOCKEN'

interface ILogin {
  userName: string
  password: string
}

const signin = async ({ userName, password }: ILogin) => {
  const response = await axios.post('http://localhost:5000/api/auth/login', { userName, password })

  if (response.data.success) {
    localStorage.setItem(LOCAL_STORAGE_AUTH, JSON.stringify(response.data))
  } else {
    localStorage.removeItem(LOCAL_STORAGE_AUTH)
  }
}

export { signin }
