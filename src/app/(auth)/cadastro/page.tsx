'use client'
import { Input } from '@/components/Input'
import { notify } from '@/config/toast'
import { createUser } from '@/services/usuarioService'
import { Link } from '@chakra-ui/next-js'
import { Button, Flex, Heading, Text } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

const validacaoCadastro = yup.object().shape({
  nome: yup
    .string()
    .required('Informe seu nome')
    .test({
      name: 'sobrenome',
      test: (value) => {
        const nome = value.trim()
        return nome.split(' ').length > 1
      },
      message: 'Informe ao menos 1 sobrenome',
    }),
  email: yup
    .string()
    .email('Você precisa informar um e-mail válido.')
    .required('Você precisa informar um e-mail.'),
  senha: yup
    .string()
    .required('Informe sua senha')
    .min(8, 'Sua senha precisa ter ao menos 8 caracteres.'),
  confirmaSenha: yup
    .string()
    .required('confirme a senha')
    .min(8, 'Sua senha precisa ter ao menos 8 caracteres')
    .oneOf([yup.ref('senha'), ''], 'As senhas não coincidem'),
})

type FormularioCadastro = {
  nome: string
  email: string
  senha: string
  confirmaSenha: string
}

export default function Cadastro() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<FormularioCadastro>({
    resolver: yupResolver(validacaoCadastro),
  })

  const cadastraUsuario = async (dados: FormularioCadastro) => {
    try {
      const resposta = await createUser(dados)
      notify(resposta.data.message, 'success')

      setTimeout(() => {
        window.location.href = '/login'
      }, 9000)
    } catch (e: any) {
      if (typeof e.response !== 'undefined') {
        const {
          data: { message },
        } = e.response
        notify(message, 'error')
        return
      }
      notify('Um erro inesperado aconteceu', 'error')
    }
  }

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
        onSubmit={handleSubmit(cadastraUsuario)}
      >
        <Input
          label="Nome"
          id="nome"
          type="text"
          placeholder="Jhon Doe"
          {...register('nome')}
          error={errors.nome}
        />
        <Input
          label="email"
          id="email"
          type="email"
          placeholder="jhon@email.com"
          {...register('email')}
          error={errors.email}
        />
        <Input
          type="password"
          id="senha"
          label="Senha"
          {...register('senha')}
          error={errors.senha}
        />
        <Input
          type="password"
          id="confirma-senha"
          label="Confirme sua senha"
          {...register('confirmaSenha')}
          error={errors.confirmaSenha}
        />
        <Button type="submit" isLoading={isSubmitting} colorScheme="green">
          Cadastrar
        </Button>
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
