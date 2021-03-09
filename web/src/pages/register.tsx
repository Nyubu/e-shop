import React from 'react'
import { Formik, Form  } from 'formik'
import { Box, Button, Flex, Heading } from '@chakra-ui/react';
import { Wrapper } from '../components/Wrapper';
import { InputField } from '../components/InputField';
import { useRegisterMutation } from '../generated/graphql';
import { toErrorMap } from '../utils/toErrorMap';
import { useRouter } from 'next/router';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../utils/createUrqlClient';
import { Layout } from '../components/Layout';

interface registerProps {}


const Register: React.FC<registerProps> = ({}) => {


    const router = useRouter();
    const [, register] = useRegisterMutation(); // custom hook generated from graphql code generator

    return (
        <Layout>
            <Flex flexDirection="column" m="32px auto 0" alignSelf="center" h="65vh">    
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
                <Wrapper variant='small'>
                    <Formik
                        initialValues={{email: '', username: '', password: ''}}
                        onSubmit= { async (values, {setErrors}) => {
                
                            const response = await register({ options: values });
                            if (response.data?.register.errors) {
                                setErrors(toErrorMap(response.data.register.errors));
                            } else if (response.data?.register.user) {
                                router.push('/');
                            }
                        }}
                    >
                        { ({isSubmitting}) => (
                            <Form>
                                <InputField
                                    name='username'
                                    placeholder='username'
                                    label="Username"
                                />
                                <Box mt={4}>
                                    <InputField
                                        name='email'
                                        placeholder='email'
                                        label="Email"
                                        type='email'
                                    />
                                </Box>
                                <Box mt={4}>
                                    <InputField
                                        name='password'
                                        placeholder='password'
                                        label="Password"
                                        type='password'
                                    />
                                </Box>
                                <Button
                                    m="16px auto 0"
                                    type='submit'
                                    isLoading={isSubmitting}
                                    colorScheme='teal'
                                >
                                    Register
                                </Button>
                            </Form>
                        )}
                    </Formik>
                </Wrapper>
            </Flex>
        </Layout>
    );
}

export default withUrqlClient(createUrqlClient)(Register)