import React, { ReactNode } from 'react'
import Head from 'next/head'
import { NavBar } from './NavBar'
import Footer from './Footer'
import { Flex, Box } from '@chakra-ui/react'

type Props = {
  children?: ReactNode
  title?: string
}

export const Layout = ({ children, title = 'E-commerce' }: Props) => (
  <Box fontFamily="Poppins" backgroundColor="gray.200">
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <header>
    <NavBar />
    </header>
    <Flex m={'0 auto'} pb={8} w={'1200px'}>        
        {children}
    </Flex>
    <Footer />
  </Box>
)

