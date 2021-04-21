import { Alert, AlertIcon, Box, Button, Link } from "@chakra-ui/react";
import React, { Dispatch, SetStateAction, useCallback, useState } from "react";
import { Form, Formik, FormikHelpers } from "formik";
import { PasswordInputField, TextInputField } from "./InputField";
import * as Yup from "yup";
import {
  RegularUserFragmentDoc,
  useRegisterMutation,
} from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { MODAL_CONTENT } from "./NavBar";

interface FormData {
  username: string;
  email: string;
  password: string;
}

interface RegisterProps {
  onClose: () => void;
  setShowWhichContent: Dispatch<SetStateAction<MODAL_CONTENT>>;
}

const Register = ({ onClose, setShowWhichContent }: RegisterProps) => {
  const [register, { error: registerError }] = useRegisterMutation({
    update(cache, { data: registerResponse }) {
      cache.modify({
        fields: {
          me() {
            if (!registerResponse?.register.user) {
              return null;
            }
            const registeredUserRef = cache.writeFragment({
              fragment: RegularUserFragmentDoc,
              data: registerResponse.register.user,
            });
            return registeredUserRef;
          },
        },
      });
    },
  });
  const [displayInnerError, setDisplayInnerError] = useState<boolean>(false);

  const onRegister = useCallback(
    async (values: FormData, actions: FormikHelpers<FormData>) => {
      const result = await register({ variables: values });

      if (registerError || result.errors) {
        setDisplayInnerError(true);
        return;
      }
      if (result.data?.register.errors) {
        actions.setErrors(toErrorMap(result.data?.register.errors));
        return;
      } else if (result.data?.register.user) {
        onClose();
      }
    },
    [register, setDisplayInnerError]
  );

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
        initialValues={{ username: "", password: "", email: "" }}
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
          password: Yup.string()
            .min(4, "Password must be at least 4 characters long")
            .matches(
              /^\w+$/,
              "Letters, numbers, underscores only. Please try again without symbols."
            )
            .required("Required"),
        })}
        onSubmit={onRegister}
      >
        {(formik) => (
          <Form>
            <TextInputField label="username" name="username" />
            <TextInputField label="email" name="email" />
            <PasswordInputField label="password" name="password" />
            <Button
              mt={4}
              colorScheme="blue"
              isLoading={formik.isSubmitting}
              type="submit"
            >
              Register
            </Button>
            <Box mt={4}>
              Already has a account?{" "}
              <Link color="blue.500" onClick={goToLoginModal}>
                LOG IN
              </Link>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
};
export default Register;
