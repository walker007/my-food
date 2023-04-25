import { Button, Flex, Heading } from '@chakra-ui/react'
import { Link } from '@chakra-ui/next-js'
import { FC } from 'react'
import { MenuToggle } from '../Menu/MenuToggle'
import { Menu } from '../Menu'

interface HeaderProps {
  isOpen: boolean
  onToggle: () => void
}

export const Header: FC<HeaderProps> = ({ isOpen, onToggle }) => {
  return (
    <Flex
      gap="5px"
      w="100%"
      wrap="wrap"
      justify="space-between"
      paddingX={8}
      paddingY={10}
      align="center"
      position="fixed"
      transition="all 0.2s"
      maxH="130px"
    >
      <Link href="/">
        <Heading>My Food</Heading>
      </Link>
      <MenuToggle isOpen={isOpen} onToggle={onToggle} />
      <Menu isOpen={isOpen} />
      <Flex gap="4">
        <Button as={Link} href="/" variant="link" colorScheme="red">
          crie sua conta
        </Button>
        <Button as={Link} href="/" colorScheme="red">
          Entrar
        </Button>
      </Flex>
    </Flex>
  )
}
