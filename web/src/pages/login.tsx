import { Alert, AlertIcon, Box, Button } from "@chakra-ui/react";
import React, { useCallback, useState } from "react";
import { Form, Formik, FormikHelpers } from "formik";
import { PasswordInputField, TextInputField } from "../components/InputField";
import * as Yup from "yup";
import { RegularUserFragmentDoc, useLoginMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { useRouter } from "next/router";

interface loginProps {}

interface FormData {
  username: string;
  password: string;
}

const login = ({}: loginProps) => {
  const [login, { error: loginError }] = useLoginMutation({
    update(cache, { data: loginResponse }) {
      cache.modify({
        fields: {
          me() {
            if (!loginResponse?.login.user) {
              return null;
            }
            const loggedInUserRef = cache.writeFragment({
              fragment: RegularUserFragmentDoc,
              data: loginResponse.login.user,
            });
            return loggedInUserRef;
          },
        },
      });
    },
  });

  const [displayInnerError, setDisplayInnerError] = useState<boolean>(false);
  const router = useRouter();

  const onlogin = useCallback(
    async (values: FormData, actions: FormikHelpers<FormData>) => {
      const loginResult = await login({ variables: values });

      if (loginError || loginResult.errors) {
        setDisplayInnerError(true);
        return;
      }
      if (loginResult.data?.login.errors) {
        actions.setErrors(toErrorMap(loginResult.data?.login.errors));
        return;
      } else if (loginResult.data?.login.user) {
        router.push("/");
      }
    },
    [login, setDisplayInnerError, router]
  );
  return (
    <Box maxW="400px" mx="auto" mt="50px">
      {displayInnerError ? (
        <Alert status="error">
          <AlertIcon />
          Inner error.Please try it again later.
        </Alert>
      ) : null}

      <Formik
        initialValues={{ username: "", password: "" }}
        validationSchema={Yup.object({
          username: Yup.string()
            .min(3, "Username must be between 3 and 20 characters")
            .max(20, "Username must be between 3 and 20 characters")
            .matches(
              /^\w+$/,
              "Letters, numbers, underscores only. Please try again without symbols."
            )
            .required("Required"),
          password: Yup.string()
            .min(4, "Password must be at least 4 characters long")
            .matches(
              /^\w+$/,
              "Letters, numbers, underscores only. Please try again without symbols."
            )
            .required("Required"),
        })}
        onSubmit={onlogin}
      >
        {(formik) => (
          <Form>
            <TextInputField label="username" name="username" />
            <PasswordInputField label="password" name="password" />
            <Button
              mt={4}
              colorScheme="teal"
              isLoading={formik.isSubmitting}
              type="submit"
            >
              Login
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};
export default login;
