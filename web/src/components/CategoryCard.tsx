import { Box, Heading, Image  } from '@chakra-ui/react'
import Link from "next/link"
import React from 'react'

interface CategoryCardProps {
    id: number
    name: string
}

export const CategoryCard: React.FC<CategoryCardProps> = ({
    id,
    name
}) => {


    return (
        <Box  
            rounded="20px"
            overflow="hidden"
            boxShadow= "md"
            background= "linear-gradient( to bottom right, rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.2))"
            position="relative" 
            marginX={4}
            h="300px"
        >
            <Heading 
                zIndex={2}
                margin="0 auto"
                paddingY={2}
                top="75%"
                color="white" 
                textAlign="center"
                w="100%" 
                backgroundColor="black" 
                position="absolute" 
                fontSize="xl">
                    {name}
            </Heading> 
            <Link href={`/shop?name=${name}`}>
                <Image
                    transition=
                        "transform 750ms cubic-bezier(.5, 0, .5, 1), opacity 150ms linear"
                    _hover={{
                        WebkitTransition: '-webkit-transform .5s ease',
                        WebkitTransform: 'scale(1.05,1.05)'}}
                    cursor="pointer"
                    roundedTop="15px"
                    src={`https://d3agmgsbgq7bt1.cloudfront.net/home/${id}.jpg`} 
                    alt="Food image"
                    objectFit="cover"                        
                />
            </Link>
        </Box>
    );
}
