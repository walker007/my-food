'use client'

import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider } from '@chakra-ui/react'
import { ReactNode, FC } from 'react'
import { tema } from '../config/tema'
import { CartProvider } from '@/contexts/CartContext'
import { AuthProvider } from '@/contexts/AuthContext'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

interface ProvidersProps {
  children: ReactNode
}

const queryClient = new QueryClient()

export const Providers: FC<ProvidersProps> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CartProvider>
          <CacheProvider>
            <ChakraProvider theme={tema}>
              {children}
              <ToastContainer />
              <ReactQueryDevtools />
            </ChakraProvider>
          </CacheProvider>
        </CartProvider>
      </AuthProvider>
    </QueryClientProvider>
  )
}
