'use client'

import { Input } from '@/components/Input'
import { listarLojas } from '@/services/lojaService'
import {
  Button,
  Flex,
  Heading,
  IconButton,
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

export default function LojaIndex() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const dadosLoja = listarLojas()
  return (
    <Flex direction="column" grow={1} gap={4}>
      <Flex align="center" justify="space-between" px={2}>
        <Heading fontSize="xx-large">Lojas</Heading>
        <Button colorScheme="green" onClick={onOpen}>
          Nova Loja
        </Button>
      </Flex>

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
            <Flex as="form" p={4} direction="column" gap={1}>
              <Input label="Nome" type="text" id="nome" />
              <Input label="Categoria" type="text" id="categoria" />
              <Input label="Tempo de Preparo" id="tempo" type="text" />
              <Input type="number" label="Taxa de Entrega" id="entrega" />
              <Input type="file" label="Logo" id="logo" />
              <Input type="file" label="Capa" id="cover" />
              <Button colorScheme="green">Salvar</Button>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Flex>
  )
}
