import {
  Button,
  createStyles,
  Grid,
  LinearProgress,
  makeStyles,
  Theme,
} from "@material-ui/core";
import { Field, Form, Formik, FormikHelpers } from "formik";
import { useRouter } from "next/router";
import React, { useCallback } from "react";
import { TextInputField } from "../../components/InputField";
import { FrontendError } from "../../const/errors";
import { changePasswordValidationSchema } from "../../fieldValidateSchema/fieldValidateSchema";
import {
  RegularUserFragmentDoc,
  useChangePasswordMutation,
} from "../../generated/graphql";
import { useSnackbarAlert } from "../../redux/hooks/useSnackbarAlert";
import { AlertSeverity } from "../../redux/types/types";
import { toErrorMap } from "../../utils/toErrorMap";

interface FormData {
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

const useChangePassword = () => {
  const [changePassword] = useChangePasswordMutation({
    update(cache, { data: changePasswordResponse }) {
      cache.modify({
        fields: {
          me() {
            if (!changePasswordResponse?.changePassword.user) return null;
            const loggedInUserRef = cache.writeFragment({
              fragment: RegularUserFragmentDoc,
              data: changePasswordResponse.changePassword.user,
            });
            return loggedInUserRef;
          },
        },
      });
    },
  });

  const router = useRouter();
  const { onOpenSnackbarAlert } = useSnackbarAlert();

  const onChangePassword = useCallback(
    async (values: FormData, actions: FormikHelpers<FormData>) => {
      const token = router.query.token as string;
      const changePasswordResponse = await changePassword({
        variables: { token, newPassword: values.password },
      }).catch(() => null);
      const changePasswordResult = changePasswordResponse?.data?.changePassword;

      if (!changePasswordResult) {
        onOpenSnackbarAlert({
          message: FrontendError.ERR0002,
          severity: AlertSeverity.ERROR,
        });
        return;
      }

      if (changePasswordResult.errors) {
        actions.setErrors(toErrorMap(changePasswordResult.errors));
        const tokenError = changePasswordResult.errors.find(
          (fieldError) => fieldError.field === "token"
        );
        if (tokenError) {
          onOpenSnackbarAlert({
            message: tokenError.message,
            severity: AlertSeverity.ERROR,
          });
        }
        return;
      }
      if (changePasswordResult.user) {
        router.push("/");
      }
    },
    [changePassword, router]
  );
  return { onChangePassword };
};

const ChangePasswordForm = () => {
  const classes = useStyles();
  const { onChangePassword } = useChangePassword();

  return (
    <>
      <Formik
        initialValues={{ password: "" }}
        validationSchema={changePasswordValidationSchema}
        onSubmit={onChangePassword}
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
                  Change Password
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default ChangePasswordForm;
