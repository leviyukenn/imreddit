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
import React, { useCallback, useState } from "react";
import { registerValidationSchema } from "../../fieldValidateSchema/fieldValidateSchema";
import {
  RegularUserFragmentDoc,
  useRegisterMutation,
} from "../../generated/graphql";
import { useUserModalState } from "../../redux/hooks/useUserModalState";
import { toErrorMap } from "../../utils/toErrorMap";
import { TextInputField } from "../InputField";

interface FormData {
  username: string;
  email: string;
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

const Register = () => {
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
  const { onClose, showLoginModal } = useUserModalState();

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

  const classes = useStyles();
  return (
    <Formik
      initialValues={{ username: "", password: "", email: "" }}
      validationSchema={registerValidationSchema}
      onSubmit={onRegister}u
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
                <Link onClick={showLoginModal}>LOG IN</Link>
              </Typography>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};
export default Register;
