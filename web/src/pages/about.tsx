import { withUrqlClient } from 'next-urql'
import { Text, Image } from '@chakra-ui/react'
import React from 'react'
import { Layout } from '../components/Layout'
import { Wrapper } from '../components/Wrapper'
import { createUrqlClient } from '../utils/createUrqlClient'

const AboutPage = () => (
  <Layout title="About | Next.js + TypeScript Example">
    <Wrapper>
        <Image 
          src="https://d3agmgsbgq7bt1.cloudfront.net/home/1.jpg" 
          w="50%"
          margin="0 auto"
          mb={8}
        />
        <Text>
            &emsp;Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras volutpat porttitor porta. Maecenas accumsan leo et quam semper, vitae fermentum tortor varius. 
            Etiam quis iaculis est. Nullam imperdiet laoreet diam, a ornare purus tempus vel. 
            Integer arcu neque, accumsan a sem eu, imperdiet lobortis augue. Nullam et vulputate odio, a aliquet eros. 
            Ut aliquet lorem non sem interdum, sit amet commodo eros varius. Interdum et malesuada fames ac ante ipsum primis in faucibus. 
            Phasellus malesuada sem ipsum, in ornare diam imperdiet vel. Quisque elit justo, cursus et feugiat id, elementum eu tellus.
        </Text>
        <br/>
        <Text>
            &emsp;Integer ultrices viverra ultr
            ices. Cras pharetra sem arcu, feugiat iaculis erat aliquet ac.
            Phasellus euismod ligula nec enim laoreet, vel malesuada massa accumsan.
            Nam facilisis, nisi et blandit faucibus, elit erat condimentum diam, ac tincidunt quam nulla sit amet sem. Donec id quam non nunc placerat varius vel hendrerit libero.
            Vivamus finibus dictum fermentum. Duis sit amet est quam. Aenean in lectus a magna vulputate venenatis. Pellentesque ut faucibus erat. Vestibulum aliquam tempor tincidunt.
            Cras pulvinar bibendum mattis. Aenean accumsan pulvinar ante sed venenatis. Fusce sit amet arcu sit amet nibh scelerisque ultricies quis vitae odio. Integer tincidunt eleifend
            lorem sed efficitur. Mauris eu turpis diam. Quisque suscipit efficitur placerat.
        </Text>
        <br/>
        <Text>
        &emsp;Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras volutpat porttitor porta. Maecenas accumsan leo et quam semper, vitae fermentum tortor varius. 
            Etiam quis iaculis est. Nullam imperdiet laoreet diam, a ornare purus tempus vel. 
            Integer arcu neque, accumsan a sem eu, imperdiet lobortis augue. Nullam et vulputate odio, a aliquet eros. 
            Ut aliquet lorem non sem interdum, sit amet commodo eros varius. Interdum et malesuada fames ac ante ipsum primis in faucibus. 
            Phasellus malesuada sem ipsum, in ornare diam imperdiet vel. Quisque elit justo, cursus et feugiat id, elementum eu tellus.
        </Text>
    </Wrapper>
  </Layout>
)


export default withUrqlClient(createUrqlClient)(AboutPage) 
