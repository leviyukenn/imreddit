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
import MuiAlert from "@material-ui/lab/Alert";
import { Field, Form, Formik, FormikHelpers } from "formik";
import { useRouter } from "next/router";
import React, { useCallback, useState } from "react";
import { loginValidationSchema } from "../../fieldValidateSchema/fieldValidateSchema";
import {
  RegularUserFragmentDoc,
  useLoginMutation,
} from "../../generated/graphql";
import { useUserModalState } from "../../redux/hooks/useUserModalState";
import { toErrorMap } from "../../utils/toErrorMap";
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

const LoginForm = () => {
  //post login mutation to graphql server and updtate the me query cache
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

  const {
    isOpen,
    onClose,
    showRegisterModal,
    showForgotPasswordModal,
    showRegisterPage,
    showForgotPasswordPage,
  } = useUserModalState();

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
      }
      if (loginResult.data?.login.user) {
        if (!isOpen) {
          router.back();
          return;
        }
        onClose();

        if (typeof router.query.next === "string") {
          router.push(router.query.next);
        }
      }
    },
    [login, setDisplayInnerError, isOpen, router]
  );

  const classes = useStyles();
  return (
    <Formik
      initialValues={{ username: "", password: "" }}
      validationSchema={loginValidationSchema}
      onSubmit={onlogin}
    >
      {({ submitForm, isSubmitting }) => (
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
              {displayInnerError ? (
                <MuiAlert elevation={6} variant="filled" severity="error">
                  Inner error.Please try it again later.
                </MuiAlert>
              ) : null}
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
  );
};
export default LoginForm;
