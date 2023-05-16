'use client'

import { Input } from '@/components/Input'
import { listarLojas } from '@/services/lojaService'
import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  IconButton,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Table,
  Tbody,
  Td,
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

const validacaoLoja = yup.object().shape({
  nome: yup.string().required('Informe o nome da loja.'),
  categoria: yup.string().required('Informe a categoria da loja.'),
  tempo: yup.string().required('Informe o tempo de preparo.'),
  entrega: yup
    .number()
    .typeError('Informe uma taxa de entrega')
    .required('Informe a taxa de entrega.'),
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
})

type FormularioLoja = {
  nome: string
  categoria: string
  tempo: string
  entrega: number
  logo: any
  cover: any
}

export default function LojaIndex() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormularioLoja>({
    resolver: yupResolver(validacaoLoja),
  })
  const { isOpen, onOpen, onClose } = useDisclosure()
  const dadosLoja = listarLojas()

  const salvarLoja = (dados: FormularioLoja) => {
    console.log(dados)
  }

  return (
    <Flex direction="column" grow={1} gap={4}>
      <AdminHeader title="Lojas" buttonLabel="Nova Loja" onClick={onOpen} />

      <Flex>
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
            {dadosLoja.map((loja) => (
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
                type="number"
                label="Taxa de Entrega"
                id="entrega"
                error={errors.entrega}
                {...register('entrega')}
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
