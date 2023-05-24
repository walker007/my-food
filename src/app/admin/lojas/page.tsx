'use client'

import { Input } from '@/components/Input'
import { Loja, cadastraLoja, listarLojas } from '@/services/lojaService'
import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  IconButton,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from '@chakra-ui/react'
import { FaPencilAlt, FaTrash } from 'react-icons/fa'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { AdminHeader } from '../components/AdminHeader'
import { getBase64 } from '@/helpers/getBase64'
import { formataMoeda } from '@/helpers/formataMoeda'
import { notify } from '@/config/toast'
import { useQuery, useQueryClient } from 'react-query'

const validacaoLoja = yup.object().shape({
  nome: yup.string().required('Informe o nome da loja.'),
  categoria: yup.string().required('Informe a categoria da loja.'),
  tempo: yup.string().required('Informe o tempo de preparo.'),
  logo: yup
    .mixed()
    .test('type', 'Envie uma imagem no Formato JPG ou PNG', (value: any) => {
      if (value.length > 0) {
        return value[0].type === 'image/jpeg' || value[0].type === 'image/png'
      }
      return false
    })
    .required('Informe a logo da loja.'),
  cover: yup
    .mixed()
    .test('type', 'Envie uma imagem no Formato JPG ou PNG', (value: any) => {
      if (value.length > 0) {
        return value[0].type === 'image/jpeg' || value[0].type === 'image/png'
      }
      return false
    })
    .required('Informe a capa da loja.'),
  pedidoMinimo: yup
    .string()
    .transform((value: string) => {
      if (!value) return '0'

      return (Number(value.replace(/\D/g, '')) / 100).toString()
    })
    .test({
      name: 'pedido-minimo',
      message: 'O pedido mínimo deve ser maior ou igual a R$ 0,0',
      test: (value) => {
        if (!value) return false

        return Number(value) >= 0
      },
    })
    .required('Informe o pedido mínimo'),
  taxaEntrega: yup
    .string()
    .transform((value: string) => {
      if (!value) return '0'

      return (Number(value.replace(/\D/g, '')) / 100).toString()
    })
    .test({
      name: 'taxa-entrega',
      message: 'O valor da taxa de entrega deve ser maior ou igual a R$ 0,0',
      test: (value) => {
        if (!value) return false

        return Number(value) >= 0
      },
    })
    .required('Informe a tava de entrega'),
})

type FormularioLoja = {
  nome: string
  categoria: string
  tempo: string
  logo: any
  cover: any
  pedidoMinimo: string
  taxaEntrega: string
}

export default function LojaIndex() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<FormularioLoja>({
    resolver: yupResolver(validacaoLoja),
  })

  const { isLoading, isError, data, isFetching } = useQuery({
    queryKey: ['lojas', 'adm'],
    queryFn: listarLojas,
  })
  const queryClient = useQueryClient()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const salvarLoja = async ({
    logo,
    cover,
    pedidoMinimo,
    taxaEntrega,
    ...resto
  }: FormularioLoja) => {
    const imageLogo = await getBase64(logo[0])
    const imageCover = await getBase64(cover[0])

    const submitData: Loja = {
      ...resto,
      imageCover,
      imageLogo,
      nota: 0,
      pedidoMinimo: Number(pedidoMinimo.replace(/\D/g, '')) / 100,
      taxaEntrega: Number(taxaEntrega.replace(/\D/g, '')) / 100,
    }

    try {
      const response = await cadastraLoja(submitData)
      notify(response.data.message, 'success')
      onClose()
      reset()
      queryClient.invalidateQueries({ queryKey: ['lojas', 'adm'] })
    } catch (e: any) {
      if (e.response) {
        notify(e.response.data.message, 'error')
        return
      }

      notify('Um erro ocorreu', 'error')
    }
  }
  return (
    <Flex direction="column" grow={1} gap={4}>
      <AdminHeader
        title="Lojas"
        buttonLabel="Nova Loja"
        onClick={onOpen}
        isFetching={isFetching}
      />

      <Flex>
        {isLoading ? (
          <Spinner size="md" />
        ) : isError ? (
          <Text>Ocorreu um erro ao carregar as lojas</Text>
        ) : (
          <Table variant="striped">
            <Thead>
              <Tr>
                <Th>Id</Th>
                <Th>Nome da Loja</Th>
                <Th>Avaliação</Th>
                <Th>Ações</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data?.data?.map((loja) => (
                <Tr key={loja.id}>
                  <Td>{loja.id}</Td>
                  <Td>{loja.nome}</Td>
                  <Td>{loja.nota}</Td>
                  <Td>
                    <Flex gap={3}>
                      <IconButton
                        aria-label="Editar"
                        icon={<FaPencilAlt />}
                        colorScheme="yellow"
                      />
                      <IconButton
                        aria-label="Apagar"
                        icon={<FaTrash />}
                        colorScheme="red"
                      />
                    </Flex>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        )}
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Nova Loja</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex
              as="form"
              p={4}
              direction="column"
              gap={1}
              onSubmit={handleSubmit(salvarLoja)}
            >
              <Input
                label="Nome"
                type="text"
                id="nome"
                {...register('nome')}
                error={errors.nome}
              />
              <Input
                label="Categoria"
                type="text"
                id="categoria"
                error={errors.categoria}
                {...register('categoria')}
              />
              <Input
                label="Tempo de Preparo"
                id="tempo"
                type="text"
                error={errors.tempo}
                {...register('tempo')}
              />
              <Input
                label="Pedido mínimo"
                type="text"
                id="pedidoMinimo"
                error={errors.pedidoMinimo}
                {...register('pedidoMinimo')}
                onChange={({ target }) => {
                  setValue(
                    'pedidoMinimo',
                    formataMoeda(Number(target.value.replace(/\D/g, '')) / 100),
                  )
                }}
              />
              <Input
                label="Taxa de entrega"
                type="text"
                id="taxaEntrega"
                error={errors.taxaEntrega}
                {...register('taxaEntrega')}
                onChange={({ target }) => {
                  setValue(
                    'taxaEntrega',
                    formataMoeda(Number(target.value.replace(/\D/g, '')) / 100),
                  )
                }}
              />
              <Input
                type="file"
                label="Logo"
                id="logo"
                {...register('logo')}
                display={'none'}
              />
              <FormControl isInvalid={!!errors.logo}>
                <FormLabel htmlFor="logo">
                  <Image
                    alt="Imagem do logo"
                    src={
                      typeof watch('logo') !== 'undefined' &&
                      typeof watch('logo')[0] === 'object'
                        ? URL.createObjectURL(watch('logo')[0])
                        : 'https://placehold.it/100x100'
                    }
                    w="100px"
                    h="100px"
                    objectFit="cover"
                    cursor={'pointer'}
                  />
                </FormLabel>
                {!!errors.logo && (
                  <FormErrorMessage>
                    {errors.logo?.message as String}
                  </FormErrorMessage>
                )}
              </FormControl>
              <Input
                type="file"
                label="Capa"
                id="cover"
                display={'none'}
                {...register('cover')}
              />
              <FormControl isInvalid={!!errors.cover}>
                <FormLabel htmlFor="cover">
                  <Image
                    alt="Imagem da capa"
                    src={
                      typeof watch('cover') !== 'undefined' &&
                      typeof watch('cover')[0] === 'object'
                        ? URL.createObjectURL(watch('cover')[0])
                        : 'https://placehold.co/1200x250'
                    }
                    w="100%"
                    h="250px"
                    objectFit="cover"
                    cursor={'pointer'}
                  />
                </FormLabel>
                {!!errors.cover && (
                  <FormErrorMessage>
                    {errors.cover?.message as String}
                  </FormErrorMessage>
                )}
              </FormControl>
              <Button type="submit" colorScheme="green">
                Salvar
              </Button>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Flex>
  )
}
