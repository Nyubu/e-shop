import { Box, Heading, Image, Text } from '@chakra-ui/react'
import { withUrqlClient } from 'next-urql'
import React from 'react'
import { Layout } from '../components/Layout'
import { Wrapper } from '../components/Wrapper'
import { createUrqlClient } from '../utils/createUrqlClient'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useCategoriesQuery } from '../generated/graphql'
import { CategoryCard } from '../components/CategoryCard'


const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};

interface IndexProps {}


const IndexPage: React.FC<IndexProps> = ({}) => {

  const [{data, error, fetching}] = useCategoriesQuery();

  if (!fetching && !data) {
    return (
      <div>
        <div>Query Failed</div>
        <div>{error?.message}</div>
      </div>
    )
  }

  return (
    <Layout title="Home">
      <Wrapper>
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
                Welcome!
        </Heading>
        <Box 
            height="300px" 
            overflow="hidden" 
            marginY={8}
            marginX="auto"
            rounded="15px"
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
            <Image 
                src="https://d3agmgsbgq7bt1.cloudfront.net/home/1.jpg" 
            />
        </Box>

        { !data && fetching ? ( 
          <div>Loading . . .</div> 
        ) : (
            
            <Box rounded="15px" mt={8}>
                <Carousel 
                    swipeable={true}
                    draggable={true}
                    showDots={true}
                    responsive={responsive}
                    infinite={true}
                    autoPlay={true}
                    autoPlaySpeed={6000}
                >
                    {
                    data!.categories.map((c) => (
                        <CategoryCard key={c.id} id={c.id} name={c.name}/>
                    ))
                    }              
                </Carousel>
            </Box>
        )}

        <Text m="2rem auto 0" w="800px" textAlign="center">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras volutpat porttitor porta. Maecenas accumsan leo et quam semper, vitae fermentum tortor varius. 
            Etiam quis iaculis est. Nullam imperdiet laoreet diam, a ornare purus tempus vel. 
            Integer arcu neque, accumsan a sem eu, imperdiet lobortis augue. Nullam et vulputate odio, a aliquet eros.
        </Text>
      </Wrapper>
    </Layout>

  )
}


export default withUrqlClient(createUrqlClient)(IndexPage) 
