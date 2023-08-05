'use client'
import {
  Loja,
  apagaLoja,
  atualizaLoja,
  cadastraLoja,
  listarLojas,
} from '@/services/lojaService'
import {
  Flex,
  IconButton,
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
import { AdminHeader } from '../components/AdminHeader'
import { getBase64 } from '@/helpers/getBase64'
import { notify } from '@/config/toast'
import { useQuery, useQueryClient } from 'react-query'
import { useState } from 'react'
import { ConfirmDelete } from '@/components/ConfirmDelete'
import { FormLoja } from './FormLoja'

export type FormularioLoja = {
  nome: string
  categoria: string
  tempo: string
  logo: any
  cover: any
  pedidoMinimo: string
  taxaEntrega: string
}

export default function LojaIndex() {
  const { isLoading, isError, data, isFetching } = useQuery({
    queryKey: ['lojas', 'adm'],
    queryFn: listarLojas,
  })
  const queryClient = useQueryClient()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const {
    isOpen: isOpenDelete,
    onOpen: onOpenDelete,
    onClose: onCloseDelete,
  } = useDisclosure()

  const [loja, setLoja] = useState<Loja | null>()

  const handleDelete = (loja: Loja) => {
    setLoja(loja)
    onOpenDelete()
  }

  const handleEdit = (loja: Loja) => {
    setLoja(loja)
    onOpen()
  }

  const updateLoja = async ({
    logo,
    cover,
    pedidoMinimo,
    taxaEntrega,
    ...resto
  }: FormularioLoja) => {
    const imageLogo = logo[0] ? await getBase64(logo[0]) : loja?.imageLogo
    const imageCover = cover[0] ? await getBase64(cover[0]) : loja?.imageCover

    const lojaData: Partial<Loja> = {
      ...resto,
      imageCover,
      imageLogo,
      pedidoMinimo: Number(pedidoMinimo.replace(/\D/g, '')) / 100,
      taxaEntrega: Number(taxaEntrega.replace(/\D/g, '')) / 100,
    }
    try {
      const { data } = await atualizaLoja(loja?.id || '', lojaData)
      notify(data.message, 'success')
      onClose()
      queryClient.invalidateQueries({ queryKey: ['lojas', 'adm'] })
    } catch (e: any) {
      notify(
        e?.response?.data?.message || 'Ocorreu um erro ao atulizar',
        'error',
      )
    }
  }

  const deleteLoja = async () => {
    const { data } = await apagaLoja(loja?.id || 0)
    await queryClient.invalidateQueries({ queryKey: ['lojas', 'adm'] })
    notify(data.message, 'success')
    onCloseDelete()
  }

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
                        onClick={() => handleEdit(loja)}
                      />
                      <IconButton
                        aria-label="Apagar"
                        icon={<FaTrash />}
                        colorScheme="red"
                        onClick={() => handleDelete(loja)}
                      />
                    </Flex>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        )}
      </Flex>

      <ConfirmDelete
        isOpen={isOpenDelete}
        onClose={onCloseDelete}
        onConfirm={deleteLoja}
        mensagem={`Tem certeza que deseja apagar a loja ${loja?.nome}?`}
      />
      <FormLoja
        isOpen={isOpen}
        onClose={onClose}
        salvarLoja={loja ? updateLoja : salvarLoja}
        loja={loja as Loja}
      />
    </Flex>
  )
}
