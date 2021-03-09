import { Box, Button, Flex, Heading, Link } from '@chakra-ui/react';
import React from 'react';
import NextLink from 'next/link'
import { useLogoutMutation, useMeQuery } from '../generated/graphql';
import { isServer } from '../utils/isServer';
import { useRouter } from 'next/router'

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {

    const router = useRouter();
    const [{fetching: logoutFetching}, logout] = useLogoutMutation();
    const [{data, fetching}] = useMeQuery({
        pause: isServer(), // run in browser instead of server side
    });
    let body;

    // three states - data loading, user not logged, user logged
    if (fetching) {
        body = (
            <div>Loading..</div>
        )
    } else if (!data?.me) {
        body = (
            <>
            <NextLink href="/login"> 
                <Link mr={2}>Login</Link>
            </NextLink>
            <NextLink href="/register">
                <Link>Register</Link>                        
            </NextLink>
            </>
        );
    } else {
        body = (
            <Flex align="center">
                <Box>
                    <Box mr={2}>{data.me.username}</Box>
                    <Button 
                        onClick={ async () => {
                            await logout();
                            router.reload();
                        }}
                        isLoading={logoutFetching}
                        variant="link"                        
                    >
                        Logout
                    </Button>
                </Box>
            </Flex>
        )
        
    }

    return (
        <Box 
            mb={8}
            zIndex={1} 
            position='sticky' 
            top={0} p={4} 
            bgGradient="linear-gradient(
                to right bottom,
                rgba(255, 255, 255, 0.6),
                rgba(255, 255, 255, 0.3)
              )"
            style={{ backdropFilter:  "blur(4px)" }}
        >
            <Flex fontFamily="Poppins" flex={1} m="auto" align="center" maxW={1000}>
                <NextLink href="/">
                    <Link>
                        <Heading fontFamily="'Poppins', sans-serif">E-Commerce</Heading>
                    </Link>
                </NextLink>
                <Flex ml={8}>
                    <NextLink href="/shop">
                        <Link mr={2}>
                            Shop
                        </Link>
                    </NextLink>
                    <NextLink href="/about">
                        <Link>
                            About
                        </Link>
                    </NextLink>
                </Flex>
                <Box ml={'auto'}> {body} </Box>
            </Flex>
        </Box>
    );
}
