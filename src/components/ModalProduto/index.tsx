import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react'
import { FC } from 'react'

interface ModalProdutoProps {
  isOpen: boolean
  onClose: () => void
  id: string
}

export const ModalProduto: FC<ModalProdutoProps> = ({
  isOpen,
  onClose,
  id,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Text>Produto</Text>
          <ModalCloseButton />
        </ModalHeader>
        <ModalBody></ModalBody>
      </ModalContent>
    </Modal>
  )
}
