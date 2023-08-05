import { apiClient } from '@/config/axios'
import { Produto } from './produtoService'

export interface Loja {
  id?: string
  nome: string
  nota: number
  categoria: string
  distancia?: string
  tempo: string
  taxaEntrega: number
  pedidoMinimo: number
  imageLogo: string
  imageCover: string
  produtos?: Produto[]
}

export interface PaginatedLojas {
  data: Loja[]
}

export const listarLojas = () => {
  return apiClient.get<PaginatedLojas>('/lojas')
}

export const obterLoja = (id: string) => {
  return apiClient.get<Loja>(`/lojas/${id}`)
}

interface CadastraLojaDTO {
  message: string
}

export const cadastraLoja = (lojaData: Loja) => {
  return apiClient.post<CadastraLojaDTO>('/lojas', lojaData)
}

export const apagaLoja = (id: string | number) => {
  return apiClient.delete<CadastraLojaDTO>(`/lojas/${id}`)
}

export const atualizaLoja = (id: string | number, lojaData: Partial<Loja>) => {
  return apiClient.put<CadastraLojaDTO>(`/lojas/${id}`, lojaData)
}
