import { Button, Flex, Heading } from '@chakra-ui/react'
import { FC } from 'react'

interface AdminHeaderProps {
  onClick?: () => void
  buttonLabel?: string
  title: string
}

export const AdminHeader: FC<AdminHeaderProps> = ({
  onClick,
  buttonLabel,
  title,
}) => {
  return (
    <Flex align="center" justify="space-between" px={2}>
      <Heading fontSize="xx-large">{title}</Heading>
      {onClick && buttonLabel && (
        <Button colorScheme="green" onClick={onClick}>
          {buttonLabel}
        </Button>
      )}
    </Flex>
  )
}
