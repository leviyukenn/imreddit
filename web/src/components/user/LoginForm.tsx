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
      width: theme.spacing(45),
      margin: "20px auto",
    },
    formItem: {
      width: "100%",
    },
  })
);

const Login = () => {
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
    onClose,
    showRegisterModal,
    showForgotPasswordModal,
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
        onClose();
        if (typeof router.query.next === "string") {
          router.push(router.query.next);
        }
      }
    },
    [login, setDisplayInnerError]
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
                <Link onClick={showForgotPasswordModal}>PASSWORD?</Link>
              </Typography>
            </Grid>
            <Grid item className={classes.formItem}>
              <Typography variant="caption">
                Don't have an account?{" "}
                <Link onClick={showRegisterModal}>SIGN UP</Link>
              </Typography>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};
export default Login;
