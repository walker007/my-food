'use client'

import { CardDestaque } from '@/components/CardDestaque'
import { CardLoja } from '@/components/CardLoja'
import {
  Button,
  Flex,
  FormControl,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputLeftAddon,
} from '@chakra-ui/react'
import { useState } from 'react'

import { GoSearch } from 'react-icons/go'

export default function Page() {
  const [busca, setBusca] = useState('')
  return (
    <Flex direction="column" align="center" grow={1}>
      <Flex as="hgroup" direction="column" align="center">
        <Heading as="h1" fontSize="2.25rem">
          Tudo pra facilitar seu dia a dia
        </Heading>
        <Heading as="h2" fontSize="1rem" color="blackAlpha.400">
          O que você precisa está aqui. Peça e receba onde estiver
        </Heading>
      </Flex>
      <Flex as="section" w="100%">
        <FormControl
          flexDirection="row"
          display="flex"
          gap={4}
          marginX="48"
          marginTop="8"
        >
          <InputGroup>
            <InputLeftAddon bg="none" border="none">
              <Icon as={GoSearch} />
            </InputLeftAddon>
            <Input
              type="text"
              placeholder="Pesquise um item"
              value={busca}
              onChange={(evento) => setBusca(evento.target.value)}
              borderRadius="none"
            />
          </InputGroup>
          <Button colorScheme="red" borderRadius="none">
            Buscar
          </Button>
        </FormControl>
      </Flex>
      <Flex as="section" mt={10} gap={4}>
        <CardDestaque
          src="/restaurant.avif"
          path="/"
          titulo="Restaurantes"
          color="red"
        />
        <CardDestaque
          src="/market.avif"
          path="/"
          titulo="Compras"
          color="green"
        />
      </Flex>
      <Flex
        as="section"
        maxW="90vw"
        marginLeft="5vw"
        direction={'column'}
        mt={10}
      >
        <Heading fontSize="1.25rem">Lojas</Heading>
        <Flex gap={8} mt={2} wrap="wrap" align="center">
          <CardLoja
            path="/"
            nome="EmiCi Donaldi"
            nota={4.5}
            categoria="Lanches"
            distancia="1.2km"
            tempo="30-40 min"
            taxaEntrega={2.25}
          />
          <CardLoja
            path="/"
            nome="EmiCi Donaldi"
            nota={4.5}
            categoria="Lanches"
            distancia="1.2km"
            tempo="30-40 min"
            taxaEntrega={0}
          />
          <CardLoja
            path="/"
            nome="EmiCi Donaldi"
            nota={4.5}
            categoria="Lanches"
            distancia="1.2km"
            tempo="30-40 min"
            taxaEntrega={38.9}
          />
          <CardLoja
            path="/"
            nome="EmiCi Donaldi"
            nota={4.5}
            categoria="Lanches"
            distancia="1.2km"
            tempo="30-40 min"
            taxaEntrega={0}
          />
        </Flex>
      </Flex>
    </Flex>
  )
}
