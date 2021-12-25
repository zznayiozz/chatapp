import { useLocation, Navigate } from 'react-router-dom'
const LOCAL_STORAGE_AUTH = 'AUTH_TOCKEN'

export function NotRequireAuth({ children }: { children: JSX.Element }) {
  const currentUser = localStorage.getItem(LOCAL_STORAGE_AUTH)
  const hasUser = currentUser ? JSON.parse(currentUser) : null
  const location = useLocation()

  if (hasUser?.accessTocken) {
    return <Navigate to="/" state={{ from: location }} />
  }

  return children
}
