import './App.css'
import { ThemeProvider } from '@material-ui/core'
import theme from 'customization/theme'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Login from 'layouts/authentication/Login'
import Register from 'layouts/authentication/Register'
import Home from 'layouts/home'
import Post from 'layouts/post'

import { AuthProvider } from 'auth/AuthProvider'
import { RequireAuth } from 'auth/RequireAuth'
import { NotRequireAuth } from 'auth/NotRequireAuth'

function App() {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <Router>
          <Routes>
            <Route
              path="/login"
              element={
                <NotRequireAuth>
                  <Login />
                </NotRequireAuth>
              }
            />

            <Route
              path="/register"
              element={
                <NotRequireAuth>
                  <Register />
                </NotRequireAuth>
              }
            />

            <Route
              path="/"
              element={
                <RequireAuth>
                  <Home />
                </RequireAuth>
              }
            />
            <Route
              path="/post"
              element={
                <RequireAuth>
                  <Post />
                </RequireAuth>
              }
            />
          </Routes>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  )
}

export default App
