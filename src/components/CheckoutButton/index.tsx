'use client'
import { formataMoeda } from '@/helpers/formataMoeda'
import {
  Button,
  Flex,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Stack,
  StackItem,
  Image,
  Text,
  IconButton,
  PopoverFooter,
  Heading,
} from '@chakra-ui/react'
import { FC } from 'react'
import { FaCreditCard, FaShoppingBasket, FaTrashAlt } from 'react-icons/fa'
import { useCart } from '@/contexts/CartContext'
import { Link } from '@chakra-ui/next-js'
import { cadastraPedido, checkout } from '@/services/pagamentoService'

export const CheckoutButton: FC = () => {
  const { quantidade, valor, produtos, removeFromCart } = useCart()

  const handlePayment = async () => {
    const pedidoData = { produtos }
    const response = await cadastraPedido(pedidoData)

    if (response) {
      const {
        // eslint-disable-next-line camelcase
        data: { payment_url },
      } = await checkout(response.data.id)
      window.open(payment_url, '_blank')
    }
  }
  return (
    <>
      <Popover>
        <PopoverTrigger>
          <Button leftIcon={<FaShoppingBasket />}>
            <Flex direction="column" fontSize="10px" fontWeight={500}>
              <Text>{formataMoeda(valor)}</Text>
              <Text>{quantidade} Itens</Text>
            </Flex>
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader>Seus Itens</PopoverHeader>
          <PopoverBody>
            <Stack>
              {produtos.map((produto, i) => {
                if (!produto) return null
                return (
                  <StackItem key={i}>
                    <Flex gap={3} align="center">
                      <Image
                        src={produto.imagem}
                        w={8}
                        h={8}
                        fit="cover"
                        alt={`Imagem do produto ${produto.nome}`}
                        borderRadius="full"
                      />
                      <Flex direction="column">
                        <Text fontWeight={700} fontSize="12px" noOfLines={1}>
                          {produto.nome}
                        </Text>
                        <Text fontWeight={500} fontSize="12px">
                          {produto.quantidade}x{' '}
                          {formataMoeda(produto.preco * produto.quantidade)}
                        </Text>
                      </Flex>
                      <IconButton
                        aria-label="Remover Item"
                        icon={<FaTrashAlt />}
                        colorScheme="red"
                        onClick={() => {
                          removeFromCart(produto.id)
                        }}
                        ml="auto"
                      />
                    </Flex>
                  </StackItem>
                )
              })}
              {produtos.length === 0 && (
                <StackItem>
                  <Heading fontSize="15px">
                    Não existe nenhum item no seu carrinho...
                  </Heading>
                </StackItem>
              )}
            </Stack>
          </PopoverBody>
          <PopoverFooter>
            <Button
              width="100%"
              colorScheme="green"
              leftIcon={<FaCreditCard />}
              onClick={handlePayment}
            >
              Ir para o Pagamento
            </Button>
          </PopoverFooter>
        </PopoverContent>
      </Popover>
    </>
  )
}
