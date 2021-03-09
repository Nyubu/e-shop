import { Box, Flex, Grid, Heading, Link } from '@chakra-ui/react';
import NextLink from 'next/link';
import React from 'react';


interface FooterProps {}

const Footer: React.FC<FooterProps> = ({}) => {

    

    return (
        <Box 
            zIndex={1} 
            position='sticky' 
            p={4} 
            bgGradient="linear-gradient(
                to right bottom,
                rgba(255, 255, 255, 0.6),
                rgba(255, 255, 255, 0.3)
            )"
            style={{ backdropFilter:  "blur(4px)" }}
        >
            <Grid justifyContent="center" m="auto" align="center" maxW={1000} gridTemplateColumns="repeat(auto-fit, minmax(200px, 1fr))" gap={8}>
                <Box>
                    <Heading mb={4} size="md">
                        Information
                    </Heading>
                    <Flex flexDirection="column" ml={4}>
                        <NextLink href="/about">
                            <Link>
                                Link1
                            </Link>
                        </NextLink>
                        <NextLink href="/about">
                            <Link>
                                Link2
                            </Link>
                        </NextLink>
                        <NextLink href="/about">
                            <Link>
                                Link3
                            </Link>
                        </NextLink>
                        <NextLink href="/about">
                            <Link>
                                Link4
                            </Link>
                        </NextLink>
                    </Flex>
                </Box>
                <Box>
                    <Heading mb={4} size="md">
                        My Account
                    </Heading>
                    <Flex flexDirection="column" ml={4}>
                        <NextLink href="/about">
                            <Link>
                                Link1
                            </Link>
                        </NextLink>
                        <NextLink href="/about">
                            <Link>
                                Link2
                            </Link>
                        </NextLink>
                        <NextLink href="/about">
                            <Link>
                                Link3
                            </Link>
                        </NextLink>
                        <NextLink href="/about">
                            <Link>
                                Link4
                            </Link>
                        </NextLink>
                    </Flex>
                </Box>
                <Box>
                    <Heading mb={4} size="md">
                        Useful Links
                    </Heading>
                    <Flex flexDirection="column" ml={4}>
                        <NextLink href="/about">
                            <Link>
                                Link1
                            </Link>
                        </NextLink>
                        <NextLink href="/about">
                            <Link>
                                Link2
                            </Link>
                        </NextLink>
                        <NextLink href="/about">
                            <Link>
                                Link3
                            </Link>
                        </NextLink>
                        <NextLink href="/about">
                            <Link>
                                Link4
                            </Link>
                        </NextLink>
                    </Flex>
                </Box>
            </Grid>
        </Box>
        
    )
}

export default Footer;