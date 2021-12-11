import {
  Button,
  createStyles,
  Grid,
  LinearProgress,
  Link,
  makeStyles,
  Theme,
} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { Field, Form, Formik, FormikHelpers } from "formik";
import { useRouter } from "next/router";
import React, { useCallback, useState } from "react";
import { FrontendError } from "../../const/errors";
import { registerValidationSchema } from "../../fieldValidateSchema/fieldValidateSchema";
import {
  RegularUserFragmentDoc,
  useRegisterMutation,
} from "../../generated/graphql";
import { useUserModalState } from "../../redux/hooks/useUserModalState";
import { toErrorMap } from "../../utils/toErrorMap";
import { AlertSeverity, SnackbarAlert } from "../errorHandling/SnackbarAlert";
import { TextInputField } from "../InputField";

interface FormData {
  username: string;
  email: string;
  password: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formContainer: {
      width: "100%",
      margin: "20px auto",
    },
    formItem: {
      width: "100%",
      marginBottom: "1.25rem",
      "& input": {
        boxSizing: "border-box",
        height: 48,
        fontSize: "0.875rem",
        padding: "1.375rem 0.75rem 0.625rem",
      },
      "& label": {
        fontSize: "0.875rem",
      },
    },
  })
);

interface RegisterFormProps {
  isSubmitting: boolean;
  setIsSubmitting: (isSubmitting: boolean) => void;
}

function useRegister(setIsSubmitting: (isSubmitting: boolean) => void) {
  const [register] = useRegisterMutation({
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
  const [errorMessage, setErrorMessage] = useState("");
  const { isOpen, onClose } = useUserModalState();
  const router = useRouter();

  const onRegister = useCallback(
    async (values: FormData, actions: FormikHelpers<FormData>) => {
      setIsSubmitting(true);
      const registerResponse = await register({ variables: values }).catch(
        () => null
      );

      const registerResult = registerResponse?.data?.register;

      if (!registerResult) {
        setIsSubmitting(false);
        setErrorMessage(FrontendError.ERR0002);
        return;
      }

      if (registerResult?.errors) {
        setIsSubmitting(false);
        actions.setErrors(toErrorMap(registerResult.errors));
        return;
      }
      if (registerResult.user) {
        if (isOpen) {
          onClose();
          return;
        }
        router.back();
      }
    },
    [register, isOpen, router]
  );

  return { onRegister, errorMessage, setErrorMessage };
}

const RegisterForm = ({ isSubmitting, setIsSubmitting }: RegisterFormProps) => {
  const { isOpen, showLoginModal, showLoginPage } = useUserModalState();

  const { onRegister, setErrorMessage, errorMessage } = useRegister(
    setIsSubmitting
  );

  const classes = useStyles();
  return (
    <>
      <Formik
        initialValues={{ username: "", password: "", email: "" }}
        validationSchema={registerValidationSchema}
        onSubmit={onRegister}
      >
        {({ submitForm }) => (
          <Form
            onKeyPress={(event) => {
              if (event.key === "Enter") submitForm();
            }}
          >
            <Grid
              container
              direction="column"
              justify="flex-start"
              alignItems="center"
              className={classes.formContainer}
            >
              <Grid item className={classes.formItem}>
                <Field
                  component={TextInputField}
                  name="email"
                  type="email"
                  label="EMAIL"
                />
              </Grid>

              <Grid item className={classes.formItem}>
                <Field
                  component={TextInputField}
                  name="username"
                  type="text"
                  label="USERNAME"
                />
              </Grid>
              <Grid item className={classes.formItem}>
                <Field
                  component={TextInputField}
                  type="password"
                  label="PASSWORD"
                  name="password"
                />
              </Grid>
              {isSubmitting && <LinearProgress />}
              <br />
              <Grid item className={classes.formItem}>
                <Button
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                  onClick={submitForm}
                >
                  Sign Up
                </Button>
              </Grid>
              <Grid item className={classes.formItem}>
                <Typography variant="caption">
                  Already has a account?{" "}
                  <Link onClick={isOpen ? showLoginModal : showLoginPage}>
                    LOG IN
                  </Link>
                </Typography>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
      <SnackbarAlert
        {...{
          message: errorMessage,
          setMessage: setErrorMessage,
          severity: AlertSeverity.ERROR,
        }}
      />
    </>
  );
};
export default RegisterForm;
