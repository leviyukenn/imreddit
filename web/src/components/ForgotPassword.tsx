import {
  Alert,
  AlertIcon,
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
} from "@chakra-ui/react";
import React, { Dispatch, SetStateAction, useCallback, useState } from "react";
import { Form, Formik, FormikHelpers } from "formik";
import { TextInputField } from "../components/InputField";
import * as Yup from "yup";
import { useForgotPasswordMutation } from "../generated/graphql";

import { MODAL_CONTENT } from "./NavBar";

interface FormData {
  username: string;
  email: string;
}

interface ForgotPasswordProps {
  setShowWhichContent: Dispatch<SetStateAction<MODAL_CONTENT>>;
}

const ForgotPassword = ({ setShowWhichContent }: ForgotPasswordProps) => {
  const [
    forgotPassword,
    { error: forgotPasswordError },
  ] = useForgotPasswordMutation();
  const [displayInnerError, setDisplayInnerError] = useState<boolean>(false);
  const [completeSendingEmail, setCompleteSendingEmail] = useState(false);

  const onForgotPassword = useCallback(
    async (values: FormData, actions: FormikHelpers<FormData>) => {
      const result = await forgotPassword({ variables: values });

      if (forgotPasswordError || result.errors) {
        setDisplayInnerError(true);
        return;
      }
      actions.resetForm();
      setCompleteSendingEmail(true);
    },
    [forgotPassword, setDisplayInnerError, forgotPasswordError]
  );

  const goToRegisterModal = useCallback(() => {
    setShowWhichContent(MODAL_CONTENT.REGISTER);
  }, [setShowWhichContent]);

  const goToLoginModal = useCallback(() => {
    setShowWhichContent(MODAL_CONTENT.LOGIN);
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
        initialValues={{ username: "", email: "" }}
        validationSchema={Yup.object({
          username: Yup.string()
            .min(3, "Username must be between 3 and 20 characters")
            .max(20, "Username must be between 3 and 20 characters")
            .matches(
              /^\w+$/,
              "Letters, numbers, underscores only. Please try again without symbols."
            )
            .required("Required"),
          email: Yup.string().email().required("Required"),
        })}
        onSubmit={onForgotPassword}
      >
        {(formik) => (
          <Form>
            <TextInputField label="username" name="username" />
            <TextInputField label="email" name="email" />

            <Button
              mt={4}
              colorScheme="blue"
              isLoading={formik.isSubmitting}
              type="submit"
              isDisabled={completeSendingEmail}
            >
              Reset Password
            </Button>

            <Breadcrumb separator="-" mt={4}>
              <BreadcrumbItem>
                <BreadcrumbLink color="blue.500" onClick={goToLoginModal}>
                  LOGIN
                </BreadcrumbLink>
              </BreadcrumbItem>

              <BreadcrumbItem>
                <BreadcrumbLink color="blue.500" onClick={goToRegisterModal}>
                  SIGN UP
                </BreadcrumbLink>
              </BreadcrumbItem>
            </Breadcrumb>
          </Form>
        )}
      </Formik>

      {completeSendingEmail ? (
        <Box mt={10}>
          <Alert status="success">
            <AlertIcon />
            Thanks! If your username and email address match, you'll get an
            email with a link to reset your password shortly.
          </Alert>
        </Box>
      ) : null}
    </Box>
  );
};
export default ForgotPassword;
