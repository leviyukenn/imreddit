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
import React, { Dispatch, SetStateAction, useCallback, useState } from "react";
import * as Yup from "yup";
import { RegularUserFragmentDoc, useLoginMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { TextInputField } from "./InputField";
import { MODAL_CONTENT } from "./NavBar";

interface FormData {
  username: string;
  password: string;
}

interface LoginProps {
  onClose: () => void;
  setShowWhichContent: Dispatch<SetStateAction<MODAL_CONTENT>>;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formContainer: {
      width: theme.spacing(45),
      margin: "20px auto",
    },
    formItem: {
      width: "100%",
    },
  })
);

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

  const classes = useStyles();
  return (
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
      {({ submitForm, isSubmitting }) => (
        <Form>
          <Grid
            container
            direction="column"
            justify="flex-start"
            alignItems="center"
            className={classes.formContainer}
            spacing={3}
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
                <Link onClick={goToForgotPasswordModal}>PASSWORD?</Link>
              </Typography>
            </Grid>
            <Grid item className={classes.formItem}>
              <Typography variant="caption">
                Don't have an account?{" "}
                <Link onClick={goToRegisterModal}>SIGN UP</Link>
              </Typography>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};
export default Login;
