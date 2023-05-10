'use client'

import { Input } from '@/components/Input'
import { useCart } from '@/contexts/CartContext'
import { formataMoeda } from '@/helpers/formataMoeda'
import { obterUsuario } from '@/services/usuarioService'
import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react'
import { redirect } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

export default function PagamentoPage() {
  const { produtos, valor } = useCart()
  const usuario = obterUsuario('1')
  const [freteTaxa, setFreteTaxa] = useState(0)
  const { register, watch, handleSubmit } = useForm()

  const finalizaCompra = (data: any) => {}

  useEffect(() => {
    setFreteTaxa(
      produtos.reduce((valorAnterior, produto) => {
        if (!produto.loja) {
          return valorAnterior
        }
        return produto.loja.taxaEntrega + valorAnterior
      }, 0),
    )
  }, [produtos])

  if (!usuario) {
    redirect('/login')
    return
  }

  return (
    <Flex minH="100vh" w="100vw" direction="column">
      <Flex
        w="100%"
        h="75px"
        p={5}
        justify="center"
        align="center"
        borderBottom="1px solid rgba(0,0,0,.3)"
      >
        <Heading color="red.500">MyFood</Heading>
      </Flex>
      <Flex as="main" grow={1} mx={16} mt={5}>
        <Flex as="section" direction="column" grow={1}>
          <Heading fontSize="20px" color="red.200">
            Entrega
          </Heading>
          <Divider />
          <Flex justify="space-between">
            <Flex direction="column">
              <Text>{usuario.endereco?.logradouro}</Text>
              <Text fontWeight={300} color="gray.400">
                {usuario.endereco?.cidade}/{usuario.endereco?.estado}
              </Text>
            </Flex>
            <Button variant="ghost" colorScheme="red">
              Alterar
            </Button>
          </Flex>
        </Flex>
        <Flex
          as="section"
          direction="column"
          ml="30px"
          minW="30vw"
          gap={3}
          p={2}
          borderRadius="7px"
          boxShadow="5px 8px 15px #000"
        >
          <Heading fontSize="20px" color="red.200">
            Resumo
          </Heading>
          <Divider />
          {produtos.map((produto) => (
            <Flex
              key={produto.id}
              gap={5}
              borderBottom="1px solid rgba(0,0,0,0.2)"
            >
              <Text>{produto.nome}</Text>
              <Text>{produto.quantidade}x</Text>
              <Text>{formataMoeda(produto.quantidade * produto.preco)}</Text>
            </Flex>
          ))}
          <Flex direction="column">
            <Flex justify="space-between" color="gray.400" align="center">
              <Text fontSize="sm">SubTotal</Text>
              <Text>{formataMoeda(valor)}</Text>
            </Flex>
            <Flex color="gray.400" align="center" justify="space-between">
              <Text>Frete</Text>
              <Text color={freteTaxa === 0 ? 'green.300' : ''}>
                {freteTaxa === 0 ? 'Grátis' : formataMoeda(freteTaxa)}
              </Text>
            </Flex>
            <Flex
              justify="space-between"
              color="black"
              align="center"
              fontWeight={600}
            >
              <Text>Total</Text>
              <Text>{formataMoeda(valor)}</Text>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      <Flex as="section" mb={5} direction="column" mx={16}>
        <Heading fontSize="20px" color="red.300">
          Pagamento
        </Heading>
        <Text>Escolha sua forma de pagamento</Text>
        <Divider />
        <Tabs mt={3} minH="40vh">
          <TabList>
            <Tab>Cartão de Cédito</Tab>
            <Tab>Pix</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Flex
                align="center"
                direction="column"
                as="form"
                onSubmit={handleSubmit(finalizaCompra)}
                grow={1}
              >
                <Flex justify="space-around" align="center">
                  <Flex
                    direction="column"
                    gap={2}
                    borderRadius="7px"
                    px={4}
                    py={8}
                    boxShadow="8px 5px 15px rgba(0,0,0,0.3)"
                  >
                    <Input
                      id="cardNumber"
                      label="Número do cartão"
                      type="number"
                      {...register('cartaoNumero')}
                    />
                    <Input
                      id="cardNome"
                      label="Nome Impresso no cartão"
                      type="text"
                      {...register('cartaoNome')}
                    />
                    <Flex gap={3}>
                      <Input
                        id="validade"
                        label="Validade"
                        type="text"
                        {...register('cartaoValidade')}
                      />
                      <Input
                        id="cvv"
                        label="CVV"
                        type="number"
                        {...register('cvv')}
                      />
                    </Flex>
                    <Input
                      id="cpf"
                      label="CPF"
                      type="text"
                      {...register('cpf')}
                    />
                  </Flex>

                  <Flex ml={8}>
                    <Flex
                      direction="column"
                      bg="red.200"
                      w="300px"
                      h="150px"
                      p={4}
                      borderRadius={8}
                      color="white"
                    >
                      <Heading>Seu Cartão</Heading>
                      <Flex direction="column" justify="flex-end" grow={1}>
                        <Text>{watch('cartaoNumero')}</Text>
                        <Flex gap={3}>
                          <Text>{watch('cartaoNome')}</Text>
                          <Text>{watch('cartaoValidade')}</Text>
                        </Flex>
                      </Flex>
                    </Flex>
                  </Flex>
                </Flex>
                <Button type="submit" colorScheme="green" mt="4" w="200px">
                  Pagar
                </Button>
              </Flex>
            </TabPanel>
            <TabPanel>Em breve...</TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>
    </Flex>
  )
}
