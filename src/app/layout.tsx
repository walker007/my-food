'use client'
import { ReactNode } from 'react'
import { Providers } from './providers'

interface RootLayoutProps {
  children: ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="pt-br">
      <head />
      <body style={{ overflowX: 'hidden' }}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
