import { Card, CardBody, Heading, Image, Stack, Text } from '@chakra-ui/react'
import { FC } from 'react'

interface CardProdutoProps {
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
    <Card maxW="sm">
      <CardBody padding={0}>
        <Image
          src="https://placehold.co/398x157"
          alt={'Imagem do produto: Nome do produto'}
        />
        <Stack mt={5} mx={5}>
          <Heading size="md">Nome do produto</Heading>
          <Text noOfLines={3}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odio
            incidunt error hic atque modi. Impedit, expedita in repellendus
            soluta harum vel atque perferendis quas excepturi officia
            voluptatibus! Provident, nesciunt tenetur!
          </Text>
          <Text color="green.500">R$ 75,28</Text>
        </Stack>
      </CardBody>
    </Card>
  )
}
