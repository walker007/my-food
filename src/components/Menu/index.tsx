import { Link } from '@chakra-ui/next-js'
import { Box, Stack, StackItem } from '@chakra-ui/react'
import { FC } from 'react'

interface MenuProps {
  isOpen: boolean
}

export const Menu: FC<MenuProps> = ({ isOpen }) => {
  return (
    <Box
      display={{ base: isOpen ? 'block' : 'none', md: 'block' }}
      flexBasis={{ base: '100%', md: 'auto' }}
      marginLeft={4}
      marginRight="auto"
    >
      <Stack
        spacing={8}
        align="center"
        pt={[4, 4, 0]}
        direction={['column', 'row']}
      >
        <StackItem>
          <Link href="/">Entregador</Link>
        </StackItem>
        <StackItem>
          <Link href="/">Restaurante e Mercado</Link>
        </StackItem>
        <StackItem>
          <Link href="/">Carreiras</Link>
        </StackItem>
        <StackItem>
          <Link href="/">myFood Card</Link>
        </StackItem>
      </Stack>
    </Box>
  )
}
