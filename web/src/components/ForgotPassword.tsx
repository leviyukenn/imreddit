import {
  Button,
  createStyles,
  Grid,
  LinearProgress,
  Link,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import { Alert, AlertTitle } from "@material-ui/lab";
import MuiAlert from "@material-ui/lab/Alert";
import { Field, Form, Formik, FormikHelpers } from "formik";
import React, { Dispatch, SetStateAction, useCallback, useState } from "react";
import * as Yup from "yup";
import { TextInputField } from "../components/InputField";
import { useForgotPasswordMutation } from "../generated/graphql";
import { MODAL_CONTENT } from "./NavBar";

interface FormData {
  username: string;
  email: string;
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

  const classes = useStyles();

  const onForgotPassword = useCallback(
    async (values: FormData, actions: FormikHelpers<FormData>) => {
      setCompleteSendingEmail(false);
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
                name="email"
                type="email"
                label="EMAIL"
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
                Reset Password
              </Button>
            </Grid>
            <Grid item className={classes.formItem}>
              <Breadcrumbs separator="-" aria-label="breadcrumb">
                <Typography variant="caption">
                  <Link color="primary" href="#" onClick={goToLoginModal}>
                    LOG IN
                  </Link>
                </Typography>
                <Typography variant="caption">
                  <Link color="primary" href="#" onClick={goToRegisterModal}>
                    SIGN UP
                  </Link>
                </Typography>
              </Breadcrumbs>
            </Grid>
            {completeSendingEmail ? (
              <Grid item className={classes.formItem}>
                <Alert severity="success">
                  <AlertTitle>Success</AlertTitle>
                  Thanks! If your username and email address match, you'll get
                  an email with a link to reset your password shortly.
                </Alert>
              </Grid>
            ) : null}
          </Grid>
        </Form>
      )}
    </Formik>
  );
};
export default ForgotPassword;
