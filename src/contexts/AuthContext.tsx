'use client'
import { apiClient } from '@/config/axios'
import { notify } from '@/config/toast'
import { Usuario, createLogin } from '@/services/usuarioService'
import {
  FC,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'
import decode from 'jwt-decode'

type LoginData = {
  email: string
  senha: string
}

interface TokenClaims {
  iss?: number | string
  sub: number | string
  name: string
  email: string
  permissoes: string[]
  exp: number
}

interface AuthContextProps {
  isLogged: boolean
  login: (loginData: LoginData) => Promise<boolean>
  logout: () => void
  userData: Usuario
  hasPermission: (permission: string) => boolean
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps)

export const useAuth = () => useContext(AuthContext)

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [isLogged, setIsLogged] = useState(
    JSON.parse(window.localStorage.getItem('isLogged') || 'false'),
  )
  const [userData, setUserData] = useState<Usuario>(
    JSON.parse(window.localStorage.getItem('userData') || '{}'),
  )
  const [token, setToken] = useState(
    window.localStorage.getItem('access_token'),
  )

  useEffect(() => {
    window.localStorage.setItem('userData', JSON.stringify(userData))
  }, [userData])

  useEffect(() => {
    window.localStorage.setItem('access_token', token || '')
    apiClient.defaults.headers.common.Authorization = `Bearer ${token}`
    if (!token) return
    const { exp } = decode<TokenClaims>(token || '')
    const expTimesTamp = exp * 1000

    const isTokenExpired = Date.now() >= expTimesTamp

    setIsLogged(!isTokenExpired)
  }, [token])

  useEffect(() => {
    window.localStorage.setItem('isLogged', JSON.stringify(isLogged))
    if (!isLogged) {
      setToken(null)
      setUserData({} as Usuario)
    }
  }, [isLogged])

  const login = async (loginData: LoginData) => {
    try {
      const { data } = await createLogin<LoginData>(loginData)
      if (data.token !== null) {
        setToken(data.token)

        const tokenClaims = decode<TokenClaims>(data.token)

        setUserData({
          id: tokenClaims.sub as string,
          nome: tokenClaims.name,
          email: tokenClaims.email,
          permissions: tokenClaims.permissoes,
        })
        setIsLogged(true)
        notify(data.message, 'success')
        return true
      }
    } catch (e: any) {
      setIsLogged(true)
      setUserData({} as Usuario)
      if (e.response) {
        notify(e.response.data.message, 'error')
        return false
      }

      notify('Ocorreu um erro inesperado', 'error')
      return false
    }

    return false
  }

  const hasPermission = (permission: string) => {
    if (!userData.permissions) {
      return false
    }

    return userData.permissions.includes(permission)
  }

  const logout = () => {
    setIsLogged(false)
    setUserData({} as Usuario)
    window.localStorage.removeItem('access_token')
  }

  return (
    <AuthContext.Provider
      value={{ hasPermission, isLogged, login, logout, userData }}
    >
      {children}
    </AuthContext.Provider>
  )
}
