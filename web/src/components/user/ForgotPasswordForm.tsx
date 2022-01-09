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
import { Field, Form, Formik, FormikHelpers } from "formik";
import React, { useCallback, useState } from "react";
import { FrontendError } from "../../const/errors";
import { forgotPasswordValidationSchema } from "../../fieldValidateSchema/fieldValidateSchema";
import { useForgotPasswordMutation } from "../../generated/graphql";
import { useSnackbarAlert } from "../../redux/hooks/useSnackbarAlert";
import { useUserModalState } from "../../redux/hooks/useUserModalState";
import { AlertSeverity } from "../../redux/types/types";
import { toErrorMap } from "../../utils/toErrorMap";
import { TextInputField } from "../InputField";

interface FormData {
  username: string;
  email: string;
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

function useForgotPassword() {
  const [forgotPassword] = useForgotPasswordMutation();
  const [completeSendingEmail, setCompleteSendingEmail] = useState(false);

  const { onOpenSnackbarAlert } = useSnackbarAlert();

  const onForgotPassword = useCallback(
    async (values: FormData, actions: FormikHelpers<FormData>) => {
      setCompleteSendingEmail(false);
      const response = await forgotPassword({ variables: values }).catch(
        () => null
      );
      const result = response?.data?.forgotPassword;

      if (!result) {
        onOpenSnackbarAlert({
          message: FrontendError.ERR0002,
          severity: AlertSeverity.ERROR,
        });
        return;
      }
      if (result.errors) {
        actions.setErrors(toErrorMap(result.errors));
        return;
      }
      actions.resetForm();
      setCompleteSendingEmail(true);
    },
    [forgotPassword]
  );

  return {
    onForgotPassword,
    completeSendingEmail,
  };
}

const ForgotPasswordForm = () => {
  const {
    isOpen,
    showLoginModal,
    showRegisterModal,
    showLoginPage,
    showRegisterPage,
  } = useUserModalState();

  const classes = useStyles();

  const { onForgotPassword, completeSendingEmail } = useForgotPassword();

  return (
    <>
      <Formik
        initialValues={{ username: "", email: "" }}
        validationSchema={forgotPasswordValidationSchema}
        onSubmit={onForgotPassword}
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
                    <Link
                      color="primary"
                      href="#"
                      onClick={isOpen ? showLoginModal : showLoginPage}
                    >
                      LOG IN
                    </Link>
                  </Typography>
                  <Typography variant="caption">
                    <Link
                      color="primary"
                      href="#"
                      onClick={isOpen ? showRegisterModal : showRegisterPage}
                    >
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
    </>
  );
};
export default ForgotPasswordForm;
