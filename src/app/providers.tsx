'use client'

import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider } from '@chakra-ui/react'
import { ReactNode, FC } from 'react'
import { tema } from '../config/tema'
import { CartProvider } from '@/contexts/CartContext'

interface ProvidersProps {
  children: ReactNode
}

export const Providers: FC<ProvidersProps> = ({ children }) => {
  return (
    <CartProvider>
      <CacheProvider>
        <ChakraProvider theme={tema}>{children}</ChakraProvider>
      </CacheProvider>
    </CartProvider>
  )
}
