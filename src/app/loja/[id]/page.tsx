'use client'
import { CardProduto } from '@/components/CardProduto'
import { CardProdutoHorizontal } from '@/components/CardProdutoHorizontal'
import { ModalProduto } from '@/components/ModalProduto'
import { StarRating } from '@/components/StarRating'
import { formataMoeda } from '@/helpers/formataMoeda'
import { Loja, obterLoja } from '@/services/lojaService'
import { Produto, getProdutos } from '@/services/produtoService'
import {
  Button,
  Divider,
  Flex,
  Heading,
  Icon,
  Image,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { AiFillDollarCircle } from 'react-icons/ai'
import { redirect } from 'next/navigation'

type LojaProps = {
  params: {
    id: string
  }
}

export default function LojaPage({ params: { id } }: LojaProps) {
  const { isOpen, onClose, onOpen } = useDisclosure()
  const [addId, setAddId] = useState('')
  const [dadosLoja, setDadosLoja] = useState<Loja>({} as Loja)
  const [produtos, setProdutos] = useState<Produto[]>([])

  useEffect(() => {
    obterLoja(id).then((loja) => {
      setDadosLoja(loja.data)

      if (loja.data?.produtos) {
        setProdutos(loja.data?.produtos || [])
      }
    })
  }, [id])

  if (!dadosLoja) {
    redirect('/')
    return
  }

  const handleOpenModal = (id: string) => {
    setAddId(id)
    onOpen()
  }

  return (
    <Flex
      w="95vw"
      minH="100vh"
      marginX="2.5vw"
      direction="column"
      align="center"
      justify="flex-start"
      mt={2}
      overflowX="hidden"
    >
      <Flex as="header" direction="column">
        <Image
          src={dadosLoja.imageCover}
          alt={'Imagem de capa da empresa: ' + dadosLoja.nome}
          borderRadius="10px"
        />
        <Flex align="center" gap={4} mt={2}>
          <Image
            src={dadosLoja.imageLogo}
            alt={'Logo da empresa: ' + dadosLoja.nome}
            borderRadius="full"
          />
          <Heading fontSize="1.5rem">{dadosLoja.nome}</Heading>
          <StarRating nota={dadosLoja.nota} />
          <Flex ml="auto" gap={5}>
            <Button variant="link" colorScheme="red">
              Ver mais
            </Button>
            <Text
              as="small"
              verticalAlign="center"
              display="flex"
              alignItems="center"
              justifyContent="center"
              gap="3px"
            >
              <Icon as={AiFillDollarCircle} />
              Pedido Mínimo {formataMoeda(dadosLoja.pedidoMinimo)}
            </Text>
          </Flex>
        </Flex>
      </Flex>
      <Flex as="section" direction="column" grow={1} maxW="1200px" mt={2}>
        <Heading fontSize="1rem">Destaques</Heading>
        <Divider />

        <Flex wrap="wrap" gap={6} mt={2}>
          {produtos.map((produto) => (
            <CardProduto
              handleOpenModal={handleOpenModal}
              produto={produto}
              key={produto.id}
            />
          ))}
        </Flex>
      </Flex>
      <Flex as="section" direction="column" grow={1} mt={2} maxW="1200px">
        <Heading fontSize="1rem">Produtos</Heading>
        <Divider />
        <Flex
          direction={{ base: 'column', md: 'row' }}
          gap={4}
          wrap="wrap"
          mt={2}
          p={1}
        >
          {produtos.map((produto) => (
            <CardProdutoHorizontal
              handleOpenModal={handleOpenModal}
              produto={produto}
              key={produto.id}
            />
          ))}
        </Flex>
      </Flex>
      <ModalProduto isOpen={isOpen} onClose={onClose} id={addId} />
    </Flex>
  )
}
