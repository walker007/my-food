import { formataMoeda } from '@/helpers/formataMoeda'
import { Card, CardBody, Heading, Image, Stack, Text } from '@chakra-ui/react'
import { FC } from 'react'

export interface CardProdutoProps {
  nome: string
  preco: number
  descricao: string
  image: string
}

export const CardProduto: FC<CardProdutoProps> = ({
  nome,
  preco,
  descricao,
  image,
}) => {
  return (
    <Card maxW="sm" _hover={{ transform: 'scale(1.01)' }} transition="all 0.2s">
      <CardBody padding={0}>
        <Image src={image} alt={'Imagem do produto: ' + nome} />
        <Stack mt={5} mx={5}>
          <Heading size="md">{nome}</Heading>
          <Text noOfLines={3}>{descricao}</Text>
          <Text color="green.500">{formataMoeda(preco)}</Text>
        </Stack>
      </CardBody>
    </Card>
  )
}
