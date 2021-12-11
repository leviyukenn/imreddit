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
import { loginValidationSchema } from "../../fieldValidateSchema/fieldValidateSchema";
import {
  RegularUserFragmentDoc,
  useLoginMutation,
} from "../../generated/graphql";
import { useUserModalState } from "../../redux/hooks/useUserModalState";
import { toErrorMap } from "../../utils/toErrorMap";
import { AlertSeverity, SnackbarAlert } from "../errorHandling/SnackbarAlert";
import { TextInputField } from "../InputField";

interface FormData {
  username: string;
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

interface LoginFormProps {
  isSubmitting: boolean;
  setIsSubmitting: (isSubmitting: boolean) => void;
}

function useLogin(setIsSubmitting: (isSubmitting: boolean) => void) {
  //post login mutation to graphql server and updtate the me query cache
  const [login] = useLoginMutation({
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

  const { isOpen, onClose } = useUserModalState();

  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const onLogin = useCallback(
    async (values: FormData, actions: FormikHelpers<FormData>) => {
      setIsSubmitting(true);
      const loginResponse = await login({ variables: values }).catch(
        () => null
      );
      const loginResult = loginResponse?.data?.login;

      if (!loginResult) {
        setErrorMessage(FrontendError.ERR0002);
        setIsSubmitting(false);
        return;
      }
      if (loginResult.errors) {
        actions.setErrors(toErrorMap(loginResult.errors));
        setIsSubmitting(false);
        return;
      }
      if (loginResult.user) {
        if (isOpen) {
          onClose();
          return;
        }
        router.back();
      }
    },
    [login, isOpen, router]
  );

  return { onLogin, errorMessage, setErrorMessage };
}

const LoginForm = ({ isSubmitting, setIsSubmitting }: LoginFormProps) => {
  const {
    isOpen,
    showRegisterModal,
    showForgotPasswordModal,
    showRegisterPage,
    showForgotPasswordPage,
  } = useUserModalState();

  const { onLogin, errorMessage, setErrorMessage } = useLogin(setIsSubmitting);

  const classes = useStyles();
  return (
    <>
      <Formik
        initialValues={{ username: "", password: "" }}
        validationSchema={loginValidationSchema}
        onSubmit={onLogin}
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
                  Log In
                </Button>
              </Grid>
              <Grid item className={classes.formItem}>
                <Typography variant="caption">
                  Forgot your{" "}
                  <Link
                    onClick={
                      isOpen ? showForgotPasswordModal : showForgotPasswordPage
                    }
                  >
                    PASSWORD?
                  </Link>
                </Typography>
              </Grid>
              <Grid item className={classes.formItem}>
                <Typography variant="caption">
                  Don't have an account?{" "}
                  <Link onClick={isOpen ? showRegisterModal : showRegisterPage}>
                    SIGN UP
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
export default LoginForm;
