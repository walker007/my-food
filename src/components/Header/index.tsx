import { Button, Flex, Heading } from '@chakra-ui/react'
import { Link } from '@chakra-ui/next-js'
import { FC } from 'react'
import { MenuToggle } from '../Menu/MenuToggle'
import { Menu } from '../Menu'
import { useAuth } from '@/contexts/AuthContext'
import { CheckoutButton } from '../CheckoutButton'
import { UserMenu } from '../UserMenu'

interface HeaderProps {
  isOpen: boolean
  onToggle: () => void
}

export const Header: FC<HeaderProps> = ({ isOpen, onToggle }) => {
  const { isLogged } = useAuth()
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
      maxH={{ base: 'auto', md: '130px' }}
      bg="gray.100"
      zIndex="9999"
    >
      <MenuToggle isOpen={isOpen} onToggle={onToggle} />
      <Link href="/">
        <Heading fontSize={['12px', '2rem']}>MyFood</Heading>
      </Link>

      <Menu isOpen={isOpen} />
      {isLogged ? (
        <Flex gap={4} display={{ base: isOpen ? 'flex' : 'none', md: 'flex' }}>
          <UserMenu />
          <CheckoutButton />
        </Flex>
      ) : (
        <Flex gap="4" display={{ base: isOpen ? 'flex' : 'none', md: 'flex' }}>
          <Button as={Link} href="/cadastro" variant="link" colorScheme="red">
            crie sua conta
          </Button>
          <Button as={Link} href="/login" colorScheme="red">
            Entrar
          </Button>
        </Flex>
      )}
    </Flex>
  )
}
