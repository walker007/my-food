import { Link } from '@chakra-ui/next-js'
import {
  Button,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react'
import { FC } from 'react'
import { FaCog, FaDoorOpen, FaUserAlt, FaUserCog } from 'react-icons/fa'
import { useAuth } from '@/contexts/AuthContext'
import { redirect } from 'next/navigation'

export const UserMenu: FC = () => {
  const { logout } = useAuth()
  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="Informações do Usuário"
        icon={<FaUserAlt />}
      />
      <MenuList>
        <MenuItem as={Link} href="/perfil" icon={<FaUserCog />}>
          Perfil
        </MenuItem>
        <MenuItem
          as={Button}
          onClick={() => {
            logout()
            redirect('/')
          }}
          color="red.500"
          icon={<FaDoorOpen />}
        >
          Sair
        </MenuItem>
      </MenuList>
    </Menu>
  )
}
