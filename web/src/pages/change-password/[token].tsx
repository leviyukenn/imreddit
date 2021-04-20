import { Alert, AlertIcon, Box, Button, Flex, Link } from "@chakra-ui/react";
import React, { useCallback, useState } from "react";
import { Form, Formik, FormikHelpers } from "formik";
import { PasswordInputField } from "../../components/InputField";
import * as Yup from "yup";
import {
  RegularUserFragmentDoc,
  useChangePasswordMutation,
} from "../../generated/graphql";
import { toErrorMap } from "../../utils/toErrorMap";
import { useRouter } from "next/router";
import { NextPage } from "next";
import NextLink from "next/link";

interface FormData {
  password: string;
}

const ChangePassword: NextPage<{ token: string }> = ({ token }) => {
  const [
    changePassword,
    { error: changePasswordError },
  ] = useChangePasswordMutation({
    update(cache, { data: changePasswordResponse }) {
      cache.modify({
        fields: {
          me() {
            if (!changePasswordResponse?.changePassword.user) return null;
            const loggedInUserRef = cache.writeFragment({
              fragment: RegularUserFragmentDoc,
              data: changePasswordResponse.changePassword.user,
            });
            return loggedInUserRef;
          },
        },
      });
    },
  });

  const [displayInnerError, setDisplayInnerError] = useState<boolean>(false);
  const [tokenError, setTokenError] = useState("");
  const router = useRouter();

  const onChangePassword = useCallback(
    async (values: FormData, actions: FormikHelpers<FormData>) => {
      const changePasswordResult = await changePassword({
        variables: { token, newPassword: values.password },
      });

      if (changePasswordError || changePasswordResult.errors) {
        setDisplayInnerError(true);
        return;
      }

      const fieldErrors = changePasswordResult.data?.changePassword.errors;
      if (fieldErrors) {
        actions.setErrors(toErrorMap(fieldErrors));
        const tokenError = fieldErrors.find(
          (fieldError) => fieldError.field === "token"
        );
        if (tokenError) {
          setTokenError(tokenError.message);
        }
        return;
      } else if (changePasswordResult.data?.changePassword.user) {
        router.push("/");
      }
    },
    [changePassword, setDisplayInnerError, router]
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
        initialValues={{ password: "" }}
        validationSchema={Yup.object({
          password: Yup.string()
            .min(4, "Password must be at least 4 characters long")
            .matches(
              /^\w+$/,
              "Letters, numbers, underscores only. Please try again without symbols."
            )
            .required("Required"),
        })}
        onSubmit={onChangePassword}
      >
        {(formik) => (
          <Form>
            <PasswordInputField label="password" name="password" />

            <Button
              mt={4}
              colorScheme="teal"
              isLoading={formik.isSubmitting}
              type="submit"
            >
              Reset Password
            </Button>
          </Form>
        )}
      </Formik>
      {tokenError ? (
        <Box mt={5}>
          <Alert status="error">
            <AlertIcon />
            {tokenError}
          </Alert>
          <Box mt={4}>
            <NextLink href="/forgot-password">
              <Link color="blue.400">Go send email again</Link>
            </NextLink>
          </Box>
        </Box>
      ) : null}
    </Box>
  );
};

ChangePassword.getInitialProps = ({ query }) => {
  return {
    token: query.token as string,
  };
};

export default ChangePassword;
