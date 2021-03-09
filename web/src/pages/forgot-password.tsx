import { Box, Button } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { withUrqlClient } from "next-urql";
import React from "react";
import { InputField } from "../components/InputField";
import { Wrapper } from "../components/Wrapper";
import { createUrqlClient } from "../utils/createUrqlClient";
import { useForgotPasswordMutation } from '../generated/graphql';
import { useState } from 'react'


const ForgotPassword: React.FC<{}> = ({}) => {

    const [complete, setComplete] = useState(false);
    const [, forgotPassword] = useForgotPasswordMutation();

    return (
        <Wrapper variant='small'>

            <Formik 
                initialValues={{email: ''}}
                onSubmit= { async (values, {setErrors}) => {
                    await forgotPassword(values)
                    setComplete(true);
                }}
            >
                { ({isSubmitting}) => complete ? <Box>If an account with that email exists, an email has been sent</Box> : (
                    <Form>
                        <InputField 
                            name='email' 
                            placeholder='Email' 
                            label="Email"
                            type="email"
                        />
                        <Button 
                            mt={4} 
                            type='submit' 
                            isLoading={isSubmitting} 
                            colorScheme='teal'
                        >
                            Forgot Password
                        </Button>
                    </Form>
                )}
            </Formik>
        </Wrapper>
    );
}

export default withUrqlClient(createUrqlClient)(ForgotPassword);