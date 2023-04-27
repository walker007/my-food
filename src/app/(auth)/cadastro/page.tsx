'use client'
import { Input } from '@/components/Input'
import { Link } from '@chakra-ui/next-js'
import { Button, Flex, Heading, Text } from '@chakra-ui/react'

export default function Cadastro() {
  return (
    <Flex
      as="main"
      bg="white"
      minW="40vw"
      padding={8}
      borderRadius="10px"
      direction="column"
      boxShadow="0 8px 32px rgba(0, 0, 0, 0.2)"
    >
      <Heading fontSize="2rem">Cadastre-se</Heading>
      <Flex
        as="form"
        direction="column"
        gap={5}
        mt={2}
        pt={2}
        borderTop="1px solid rgba(0,0,0,.1)"
      >
        <Input label="Nome" id="nome" type="text" placeholder="Jhon Doe" />
        <Input
          label="email"
          id="email"
          type="email"
          placeholder="jhon@email.com"
        />
        <Input type="password" id="senha" label="Senha" />
        <Input type="password" id="confirma-senha" label="Confirme sua senha" />
        <Button colorScheme="green">Cadastrar</Button>
      </Flex>
      <Flex as="footer" borderTop="1px solid rgba(0,0,0,.1)" mt={4} pt={4}>
        <Text>
          Já possui uma conta?{' '}
          <Link href="/login" fontWeight={600} color="blue.200">
            Acesse sua conta
          </Link>
        </Text>
      </Flex>
    </Flex>
  )
}
