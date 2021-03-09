import { Image, Text, Flex, Heading, Box, IconButton, Link } from '@chakra-ui/react'
import NextLink from "next/link"
import { StarIcon } from '@chakra-ui/icons'
import React from 'react'

interface ProductCardProps {
    id: number
    name: string
    price: number
    quantity: number
    description: string
}

export const ProductCard: React.FC<ProductCardProps> = ({
    id,
    name,
    price,
    quantity,
    description
}) => {


    return (
        <Box  
            rounded="20px"
            overflow="hidden"
            boxShadow= "6px 6px 20px rgba(122, 122, 122, 0.3)"
            background= "linear-gradient( to bottom right, rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.2))"
        >
            <Box
                h="200px"
                overflow="hidden"    
                position="relative"                    
            >
                <Text
                    zIndex={2}
                    p={2}
                    backgroundColor="black"
                    position="absolute"
                    justifyContent="center"
                    bottom={0}
                    color="white"
                >
                    ${price}
                </Text>
                {/* <Text>Quantity: {quantity}</Text>                     */}
                
                <IconButton
                    zIndex={2}
                    bottom={0}
                    right={0}
                    rounded="0"
                    position="absolute"
                    icon={<StarIcon />}
                    aria-label="Add to wishlist"
                    onClick={ () => {
                
                    }}
                />
                <NextLink href="/product/[id]" as={`/product/${id}`}>
                    <Image         
                        transition=
                            "transform 750ms cubic-bezier(.5, 0, .5, 1), opacity 150ms linear"
                        _hover={{
                            WebkitTransition: '-webkit-transform .5s ease',
                            WebkitTransform: 'scale(1.05,1.05)',
                            zIndex: 1
                        }}
                        cursor="pointer"          
                        src={`https://d3agmgsbgq7bt1.cloudfront.net/food/${id}.jpg`}
                        alt="Food image"
                    />
                </NextLink>

                
            </Box>
            <Flex marginX={8} marginY={2} justifyContent="center" alignItems="center">
                <NextLink href="/product/[id]" as={`/product/${id}`}>
                    <Link>
                        <Heading textAlign="center" fontSize="xl">{name}</Heading> 
                    </Link>
                </NextLink>
            </Flex>
        </Box>
    );
}
