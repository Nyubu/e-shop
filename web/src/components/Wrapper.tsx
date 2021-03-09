import { Box } from '@chakra-ui/react';
import React from 'react'

export type WrapperVariant = 'small' | 'regular';

interface WrapperProps {
    variant?: WrapperVariant;
}

export const Wrapper: React.FC<WrapperProps> = ({
    children,
    variant = 'regular'
}) => {


    return (
        <Box 
            mx="auto" 
            maxW={ variant === 'regular' ? "1200px" : '400px'}
            w="100%"
            borderRadius={15}
            bgGradient="linear-gradient(
                to right bottom,
                rgba(255, 255, 255, 0.6),
                rgba(255, 255, 255, 0.3)
              )"
            padding={8}
            style={{ boxShadow: "6px 6px 20px rgba(122, 122, 122, 0.4)"}}
        >
            {/* Render children inside wrapper box */}
            {children} 
        </Box>
    )
}
