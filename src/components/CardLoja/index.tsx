import { FC } from 'react'

interface CardLojaProps {
  path: string
  nome: string
  nota: number
  tempo: string
  taxaEntrega: number
  categoria: string
  distancia: string
  logo?: string
}

export const CardLoja: FC<CardLojaProps> = ({
  path,
  nome,
  nota,
  tempo,
  taxaEntrega,
}) => {
  return null
}
