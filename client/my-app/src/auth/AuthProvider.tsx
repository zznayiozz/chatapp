import axios from 'axios'
import * as React from 'react'
const LOCAL_STORAGE_AUTH = 'AUTH_TOCKEN'

interface AuthContextType {
  user: any
  signin: (userName: string, password: string, callback: VoidFunction) => void
  signout: (callback: VoidFunction) => void
}

let AuthContext = React.createContext<AuthContextType>(null!)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  let [user, setUser] = React.useState<any>({
    userName: '',
    password: '',
  })

  const signin = async (userName = '', password = '', callback: VoidFunction) => {
    const response = await axios.post('http://localhost:5000/api/auth/login', { userName, password })

    if (response.data.success) {
      setUser(response.data)
      localStorage.setItem(LOCAL_STORAGE_AUTH, JSON.stringify(response.data))
    } else {
      localStorage.removeItem(LOCAL_STORAGE_AUTH)
    }

    callback()
  }

  const signout = async (callback: VoidFunction) => {
    setUser({ userName: '', password: '' })
    localStorage.removeItem(LOCAL_STORAGE_AUTH)
    callback()
  }

  const value = { user, signin, signout }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return React.useContext(AuthContext)
}
