import { Text, Box, Flex, Heading, Link } from "@chakra-ui/react";
import { withUrqlClient } from 'next-urql';
import React from "react";
import { Layout } from '../../components/Layout';
import { createUrqlClient } from '../../utils/createUrqlClient';
import { useGetProductFromUrl } from "../../utils/useGetProductFromUrl";


const Product = ({}) => {
    
    const [{data, error, fetching}] = useGetProductFromUrl();

    if (fetching) {
        return (
            <Layout>
                <div>Loading. . .</div>
            </Layout>
        )
    }

    if (error) {
        return <div>{error.message}</div>
    }

    if (!data?.product) {
        return (
            <Layout>
                <Box>Could not find product</Box>
            </Layout>
        )
    }
    
    return (
        <Layout>
            <Flex p={5} shadow="md" borderWidth="1px">
                <Box flex={1}>
                    <Link>
                        <Heading fontSize="xl">{data.product.name}</Heading> 
                    </Link>
                    <Text>{data.product.description}</Text>
                    <Flex align="center">              
                        <Text flex={1} mt={4}>{data.product.price}</Text>
                        <Text flex={1} mt={4}>{data.product.quantity}</Text>                    
                    </Flex>
                </Box>
            </Flex>
        </Layout>
    );
}

export default withUrqlClient(createUrqlClient, {ssr: true})(Product);