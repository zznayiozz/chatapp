import { unwrapResult } from '@reduxjs/toolkit'
import { fetchUserLogin } from 'features/authentication/userSlice'
import * as React from 'react'
import { useDispatch } from 'react-redux'

const LOCAL_STORAGE_AUTH = 'AUTH_TOCKEN'

interface AuthContextType {
  user: any
  signin: (userName: string, password: string, callback: VoidFunction) => void
  signout: (callback: VoidFunction) => void
}

let AuthContext = React.createContext<AuthContextType>(null!)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch()
  let [user, setUser] = React.useState<any>({
    userName: '',
    password: '',
  })

  const signin = async (userName = '', password = '', callback: VoidFunction) => {
    try {
      const resultAction: any = await dispatch(fetchUserLogin({ userName, password }))
      const originalPromiseResult = unwrapResult(resultAction)
      const { success } = originalPromiseResult

      if (success) {
        setUser(originalPromiseResult)
        localStorage.setItem(LOCAL_STORAGE_AUTH, JSON.stringify(originalPromiseResult))
      } else {
        localStorage.removeItem(LOCAL_STORAGE_AUTH)
      }
    } catch (rejectedValueOrSerializedError) {
      // handle error here
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
