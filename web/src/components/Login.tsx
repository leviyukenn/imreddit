import { Alert, AlertIcon, Box, Button, Link } from "@chakra-ui/react";
import React, { Dispatch, SetStateAction, useCallback, useState } from "react";
import { Form, Formik, FormikHelpers } from "formik";
import { PasswordInputField, TextInputField } from "../components/InputField";
import * as Yup from "yup";
import { RegularUserFragmentDoc, useLoginMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { useRouter } from "next/router";
import { MODAL_CONTENT } from "./NavBar";

interface FormData {
  username: string;
  password: string;
}

interface LoginProps {
  onClose: () => void;
  setShowWhichContent: Dispatch<SetStateAction<MODAL_CONTENT>>;
}

const Login = ({ onClose, setShowWhichContent }: LoginProps) => {
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
        onClose();
      }
    },
    [login, setDisplayInnerError]
  );

  const goToRegisterModal = useCallback(() => {
    setShowWhichContent(MODAL_CONTENT.REGISTER);
  }, [setShowWhichContent]);

  const goToForgotPasswordModal = useCallback(() => {
    setShowWhichContent(MODAL_CONTENT.FORGOT_PASSWORD);
  }, [setShowWhichContent]);
  return (
    <Box mx="auto" w={80} mb={10}>
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
              colorScheme="blue"
              isLoading={formik.isSubmitting}
              type="submit"
            >
              Login
            </Button>
          </Form>
        )}
      </Formik>
      <Box mt={4}>
        Forgot your{" "}
        <Link color="blue.500" onClick={goToForgotPasswordModal}>
          password?
        </Link>
      </Box>
      <Box mt={4}>
        Don't have an account?{" "}
        <Link color="blue.500" onClick={goToRegisterModal}>
          SIGN UP
        </Link>
      </Box>
    </Box>
  );
};
export default Login;
