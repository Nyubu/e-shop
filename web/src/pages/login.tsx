import React from 'react'
import { Formik, Form  } from 'formik'
import { Box, Button, Flex, Link, Heading } from '@chakra-ui/react';
import { Wrapper } from '../components/Wrapper';
import { InputField } from '../components/InputField';
import { useLoginMutation } from '../generated/graphql';
import { toErrorMap } from '../utils/toErrorMap';
import { useRouter } from 'next/router';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../utils/createUrqlClient';
import NextLink from "next/link";
import { Layout } from '../components/Layout';


const Login: React.FC<{}> = ({}) => {


    const router = useRouter();
    const [, login] = useLoginMutation(); // custom urql hook generated from graphql code generator

    return (
        <Layout>
            <Flex flexDirection="column" m="32px auto 0" alignSelf="center" h="60vh">    
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
                        Welcome Back!
                </Heading>  
                <Wrapper variant='small'>
                    <Formik
                        initialValues={{usernameOrEmail: '', password: ''}}
                        onSubmit= { async (values, {setErrors}) => {
                            const response = await login( values );
                            if (response.data?.login.errors) {
                                setErrors(toErrorMap(response.data.login.errors));
                            } else if (response.data?.login.user) {
                                // We got a user back / worked
                                if (typeof router.query.next == "string") {
                                    router.push(router.query.next); // push next if we get string as a query parameter
                                }
                                router.push("/");
                            }
                        }}
                    >
                        { ({isSubmitting}) => (
                            <Form>
                                <InputField
                                    name='usernameOrEmail'
                                    placeholder='Username or Email'
                                    label="Username or Email"
                                />
                                <Box mt={4}>
                                    <InputField
                                        name='password'
                                        placeholder='Password'
                                        label="Password"
                                        type='password'
                                    />
                                </Box>
                                <Flex mt={2}>
                                    <NextLink href="/forgot-password">
                                            <Link ml="auto">
                                            Forgot Password
                                            </Link>
                                    </NextLink>
                                </Flex>
                                <Button
                                    mt={4}
                                    type='submit'
                                    isLoading={isSubmitting}
                                    colorScheme='teal'
                                >
                                    Login
                                </Button>
                            </Form>
                        )}
                    </Formik>
                </Wrapper>
            </Flex>
        </Layout>
    );
}

export default withUrqlClient(createUrqlClient)(Login) // So we can call the mutation