'use client'

import { Input } from '@/components/Input'
import { Link } from '@chakra-ui/next-js'
import { Button, Flex, Heading, Text } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

const validacaoLogin = yup.object().shape({
  email: yup
    .string()
    .email('Você precisa informar um e-mail válido.')
    .required('Você precisa informar um e-mail.'),
  senha: yup
    .string()
    .required('Informe sua senha')
    .min(8, 'Sua senha precisa ter ao menos 8 caracteres.'),
})

type LoginDados = {
  email: string
  senha: string
}

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { isLoading, errors },
  } = useForm<LoginDados>({
    resolver: yupResolver(validacaoLogin),
  })

  const onSubmit = (data: LoginDados) => {
    console.log(data)
  }

  return (
    <Flex
      as="main"
      minW="40vw"
      bg="white"
      padding={8}
      borderRadius="10px"
      boxShadow="0 8px 32px rgba(0, 0, 0, 0.2)"
      direction="column"
    >
      <Heading fontSize="2rem">Login</Heading>
      <Flex
        as="form"
        borderTop="1px solid rgba(0,0,0,0.1)"
        mt={2}
        direction="column"
        gap={5}
        pt={2}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          id="email"
          type="email"
          label="E-mail"
          placeholder="jhon@email.com"
          {...register('email')}
          error={errors.email}
        />
        <Input
          id="senha"
          type="password"
          label="Senha"
          {...register('senha')}
          error={errors.senha}
        />
        <Button type="submit" colorScheme="green" isLoading={isLoading}>
          Entrar
        </Button>
      </Flex>
      <Flex as="footer" borderTop="1px solid rgba(0,0,0,.1)" mt={4} pt={4}>
        <Text>
          Ainda não possui uma conta?{' '}
          <Link href="/cadastro" fontWeight={600} color="blue.200">
            Cadastre-se
          </Link>
        </Text>
      </Flex>
    </Flex>
  )
}
