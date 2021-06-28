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
import MuiAlert from "@material-ui/lab/Alert";
import { Field, Form, Formik, FormikHelpers } from "formik";
import React, { useCallback, useState } from "react";
import { createCommunityValidationSchema } from "../../fieldValidateSchema/fieldValidateSchema";
import {
  useCreateCommunityMutation,
  useTopicsQuery,
} from "../../generated/graphql";
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
      width: theme.spacing(50),
      margin: "20px auto",
    },
    formItem: {
      width: "100%",
      color: "",
    },
  })
);

const CreateCommunityForm = () => {
  const [
    createCommunity,
    { error: createCommunityError },
  ] = useCreateCommunityMutation();
  const [displayInnerError, setDisplayInnerError] = useState<boolean>(false);

  const onCreateCommunity = useCallback(
    async (values: FormData, actions: FormikHelpers<FormData>) => {
      const result = await createCommunity({ variables: values });

      if (createCommunityError || result.errors) {
        setDisplayInnerError(true);
        return;
      }
      if (result.data?.createCommunity.errors) {
        actions.setErrors(toErrorMap(result.data?.createCommunity.errors));
        return;
      }
      if (result.data?.createCommunity.community?.id) {
      }
    },
    []
  );

  const { loading: lodaingTopics, data: topicsResponse } = useTopicsQuery({
    skip: typeof window === "undefined",
  });

  const classes = useStyles();
  return (
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
              {displayInnerError ? (
                <MuiAlert elevation={6} variant="filled" severity="error">
                  Inner error.Please try it again later.
                </MuiAlert>
              ) : null}
            </Grid>
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
              <SelectField
                name="topicIds"
                label="Topics"
                options={topicsResponse?.topics || []}
              />
              <Typography
                variant="caption"
                display="block"
                gutterBottom
                color="textSecondary"
              >
                This will help relevant users find your community.
                {`${values.topicIds.length}/${
                  topicsResponse?.topics.length || 0
                }`}
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
  );
};
export default CreateCommunityForm;
