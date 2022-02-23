import {
  Button,
  createStyles,
  Divider,
  Grid,
  LinearProgress,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import { Field, Form, Formik, FormikHelpers } from "formik";
import { useRouter } from "next/router";
import React, { useCallback, useMemo } from "react";
import { FrontendError } from "../../const/errors";
import { createCommunityValidationSchema } from "../../fieldValidateSchema/fieldValidateSchema";
import {
  useCreateCommunityMutation,
  useTopicsQuery,
} from "../../generated/graphql";
import { useSnackbarAlert } from "../../redux/hooks/useSnackbarAlert";
import { AlertSeverity } from "../../redux/types/types";
import { useIsAuth } from "../../utils/hooks/useIsAuth";
import { createCommunityHomeLink } from "../../utils/links";
import { toErrorMap } from "../../utils/toErrorMap";
import { SelectField, TextAreaField, TextInputField } from "../InputField";

interface FormData {
  name: string;
  description: string;
  topicIds: string[];
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

const useCreateCommunity = () => {
  const [createCommunity] = useCreateCommunityMutation();
  const router = useRouter();
  const { onOpenSnackbarAlert } = useSnackbarAlert();
  const { me, redirectToLoginIfNotLoggedIn } = useIsAuth();

  const onCreateCommunity = useCallback(
    async (values: FormData, actions: FormikHelpers<FormData>) => {
      if (!me) redirectToLoginIfNotLoggedIn();
      const response = await createCommunity({ variables: values }).catch(
        (err) => {
          onOpenSnackbarAlert({
            message: err.message || FrontendError.ERR0002,
            severity: AlertSeverity.ERROR,
          });

          return null;
        }
      );
      const createCommunityResult = response?.data?.createCommunity;

      if (!createCommunityResult) {
        return;
      }

      if (createCommunityResult.errors) {
        actions.setErrors(toErrorMap(createCommunityResult.errors));
        return;
      }
      if (createCommunityResult.community) {
        router.push(
          createCommunityHomeLink(createCommunityResult.community.name)
        );
      }
    },
    [me, redirectToLoginIfNotLoggedIn, createCommunity, onOpenSnackbarAlert]
  );

  const { data: topicsResponse } = useTopicsQuery({
    skip: typeof window === "undefined",
  });

  const topics = useMemo(() => topicsResponse?.topics || [], [topicsResponse]);

  return {
    onCreateCommunity,
    topics,
  };
};

const CreateCommunityForm = () => {
  const { onCreateCommunity, topics } = useCreateCommunity();

  const classes = useStyles();
  return (
    <>
      <Formik<FormData>
        initialValues={{ name: "", description: "", topicIds: [] }}
        validationSchema={createCommunityValidationSchema}
        onSubmit={onCreateCommunity}
      >
        {({ submitForm, isSubmitting, values }) => (
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
              spacing={6}
            >
              <Grid item className={classes.formItem}>
                <Typography
                  variant="h5"
                  display="block"
                  gutterBottom
                  color="textPrimary"
                >
                  Create Community
                </Typography>
                <Divider variant="fullWidth" />
              </Grid>
              <Grid item className={classes.formItem}>
                <Field
                  component={TextInputField}
                  name="name"
                  type="name"
                  label="Name"
                />
              </Grid>

              <Grid item className={classes.formItem}>
                <SelectField name="topicIds" label="Topics" options={topics} />
                <Typography
                  variant="caption"
                  display="block"
                  gutterBottom
                  color="textSecondary"
                >
                  This will help relevant users find your community.
                  {`${values.topicIds.length}/${topics.length}`}
                </Typography>
              </Grid>
              <Grid item className={classes.formItem}>
                <Field
                  component={TextAreaField}
                  name="description"
                  type="description"
                  label="Description"
                />
                <Typography
                  variant="caption"
                  display="block"
                  gutterBottom
                  color="textSecondary"
                >
                  This is how new members come to understand your community.
                </Typography>
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
                  Create Community
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </>
  );
};
export default CreateCommunityForm;
