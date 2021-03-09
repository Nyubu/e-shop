import { Box, Button, Flex, Grid, Heading, Image } from "@chakra-ui/react";
import React, { useContext, useState } from 'react';
import { ProductCard } from '../components/ProductCard';
import { Wrapper } from "../components/Wrapper";
import { usePageCountQuery, useProductsAllQuery } from "../generated/graphql";
import { CategoryContext } from "./CategoryContext";

interface ProductSectionProps {

}

export const ProductSection: React.FC<ProductSectionProps> = ({}) => {

    const {categories} = useContext(CategoryContext);

    const [variables] = useState({
        limit: 4, 
        offset: 0
    })
    const pageCountData = usePageCountQuery({
        variables: {
            limit: variables.limit,
            category: categories
        }
    });
    
    const [bounds, setBounds] = useState({
        lower: 0,
        upper: variables.limit
    })
    
    const [{ data, error, fetching}] = useProductsAllQuery({        
        variables: {
            category: categories
        }
    });    
  

    if (!fetching && !data) {
        return (
            <div>
                <div>Query Failed</div>
                <div>{error?.message}</div>
            </div>
        )
    }

    const createPageNumbers = () => {

        let pages: any = [];
        for (let i = 0; i < pageCountData[0].data!.pageCount; i++) {
        pages.push(
            <Button 
            key={i} 
            mx={2} my={8}
            onClick={ () => 
                setBounds({
                lower: variables.limit * (i),
                upper: variables.limit * (i) + variables.limit
            })
            }>
                {i+1}
            </Button> 
        )
        }   

        
        return pages;
    }


    return (
        <>
            { !data && fetching ? ( 
                <div>Loading . . .</div> 
            ) : (
                <Wrapper variant="regular">
                    <Heading 
                        fontFamily="Poppins" 
                        textAlign="center"
                        _after={{
                            content: `""`,
                            display: "block",
                            width: "70%",
                            height: "2px",
                            margin: "0.5em auto 1em",
                            background: "black",
                            opacity: "0.1em"
                        }}
                    >
                            Highest Quality Produce!
                    </Heading>
                    <Grid 
                        mt={8} 
                        gridTemplateColumns="repeat(2, 1fr)" 
                        gridTemplateRows="repeat(2, 1fr)" 
                        gap={8}
                    >
                    {
                        data!.productsAll.slice(bounds.lower, bounds.upper).map((p) => (
                            <ProductCard key={p.id} id={p.id} name={p.name} price={p.price} quantity={p.quantity} description={p.description}/>
                        ))
                    }
                    </Grid>
                    <Flex justifyContent="center">
                        {
                            createPageNumbers()
                        }
                    </Flex>
                </Wrapper>
            )}
        </>
    );
}