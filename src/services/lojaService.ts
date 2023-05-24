import { apiClient } from '@/config/axios'

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
}

export const listarLojas = () => {
  return apiClient.get<Loja[]>('/loja')
}

export const obterLoja = (id: string) => {
  return apiClient.get<Loja>(`/loja/${id}`)
}

interface CadastraLojaDTO {
  message: string
}

export const cadastraLoja = (lojaData: Loja) => {
  return apiClient.post<CadastraLojaDTO>('/loja', lojaData)
}
