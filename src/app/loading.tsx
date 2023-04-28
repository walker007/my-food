'use client'
import { Flex, Heading } from '@chakra-ui/react'

export default function Loading() {
  return (
    <Flex
      w="100vw"
      h="100vh"
      bg="red.300"
      color="white"
      align="center"
      justify="center"
      direction="column"
    >
      <Heading fontSize="2rem">MyFood</Heading>
      <Heading fontSize="1rem">Caregando</Heading>
    </Flex>
  )
}
