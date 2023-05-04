import { Produto } from '@/services/produtoService'
import {
  FC,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'

export interface ProdutoProps extends Produto {
  quantidade: number
}

interface CartContextData {
  produtos: ProdutoProps[]
  quantidade: number
  valor: number
  addToCart: (item: ProdutoProps) => void
  removeFromCart: (id: any) => void
}

interface CartProviderProps {
  children: ReactNode
}

const CartContext = createContext<CartContextData>({} as CartContextData)

export const CartProvider: FC<CartProviderProps> = ({ children }) => {
  const [produtos, setProdutos] = useState<ProdutoProps[]>([])
  const [quantidade, setQuantidade] = useState(0)
  const [valor, setValor] = useState(0)
  const addToCart = (item: ProdutoProps) => {
    setProdutos([item, ...produtos])
    setQuantidade(quantidade + item.quantidade)
  }

  useEffect(() => {
    setValor(
      produtos.reduce((valorAnterior, produto) => {
        return valorAnterior + produto.preco * produto.quantidade
      }, 0),
    )
  }, [produtos])

  const removeFromCart = (id: any) => {}
  return (
    <CartContext.Provider
      value={{
        produtos,
        quantidade,
        valor,
        addToCart,
        removeFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
