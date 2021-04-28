import {
  Button,
  createStyles,
  Grid,
  LinearProgress,
  makeStyles,
  Theme,
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import { Field, Form, Formik, FormikHelpers } from "formik";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useCallback, useState } from "react";
import * as Yup from "yup";
import { TextInputField } from "../../components/InputField";
import {
  RegularUserFragmentDoc,
  useChangePasswordMutation,
} from "../../generated/graphql";
import { toErrorMap } from "../../utils/toErrorMap";

interface FormData {
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

const ChangePassword: NextPage<{ token: string }> = ({ token }) => {
  const [
    changePassword,
    { error: changePasswordError },
  ] = useChangePasswordMutation({
    update(cache, { data: changePasswordResponse }) {
      cache.modify({
        fields: {
          me() {
            console.log(changePasswordResponse);
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

  const [displayInnerError, setDisplayInnerError] = useState<boolean>(false);
  const [tokenError, setTokenError] = useState("");
  const router = useRouter();
  const classes = useStyles();

  const onChangePassword = useCallback(
    async (values: FormData, actions: FormikHelpers<FormData>) => {
      const changePasswordResult = await changePassword({
        variables: { token, newPassword: values.password },
      });

      if (changePasswordError || changePasswordResult.errors) {
        setDisplayInnerError(true);
        return;
      }

      const fieldErrors = changePasswordResult.data?.changePassword.errors;
      if (fieldErrors) {
        actions.setErrors(toErrorMap(fieldErrors));
        const tokenError = fieldErrors.find(
          (fieldError) => fieldError.field === "token"
        );
        if (tokenError) {
          setTokenError(tokenError.message);
        }
        return;
      } else if (changePasswordResult.data?.changePassword.user) {
        router.push("/");
      }
    },
    [changePassword, setDisplayInnerError, router]
  );
  return (
    <Formik
      initialValues={{ password: "" }}
      validationSchema={Yup.object({
        password: Yup.string()
          .min(4, "Password must be at least 4 characters long")
          .matches(
            /^\w+$/,
            "Letters, numbers, underscores only. Please try again without symbols."
          )
          .required("Required"),
      })}
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
              {displayInnerError ? (
                <MuiAlert elevation={6} variant="filled" severity="error">
                  Inner error.Please try it again later.
                </MuiAlert>
              ) : null}

              {tokenError ? (
                <MuiAlert elevation={6} variant="filled" severity="error">
                  {tokenError}
                </MuiAlert>
              ) : null}
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
                Change Password
              </Button>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};

ChangePassword.getInitialProps = ({ query }) => {
  return {
    token: query.token as string,
  };
};

export default ChangePassword;
