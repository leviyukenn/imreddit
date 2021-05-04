import { Reference } from "@apollo/client";
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
import { useRouter } from "next/router";
import React, { useCallback, useState } from "react";
import * as Yup from "yup";
import {
  RegularPostFragmentDoc,
  useCreatePostMutation,
} from "../../generated/graphql";
import { TextAreaField, TextInputField } from "../InputField";

interface FormData {
  title: string;
  text: string;
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

const CreatePost = () => {
  const [CreatePost, { error: createPostError }] = useCreatePostMutation({
    update(cache, { data: createPostResponse }) {
      cache.modify({
        fields: {
          posts(
            existingPostRefs: {
              posts: { [key: string]: Reference };
              hasMore: boolean;
            } = { posts: {}, hasMore: false }
          ) {
            const merged = { ...existingPostRefs.posts };

            if (createPostResponse?.createPost) {
              const newPostRef = cache.writeFragment({
                data: createPostResponse.createPost,
                fragment: RegularPostFragmentDoc,
                fragmentName: "RegularPost",
              });

              merged[createPostResponse.createPost.id] = newPostRef!;
            }
            return { posts: merged, hasMore: existingPostRefs.hasMore };
          },
        },
      });
    },
  });
  const [displayInnerError, setDisplayInnerError] = useState<boolean>(false);

  const router = useRouter();

  const onCreatePost = useCallback(
    async (values: FormData, actions: FormikHelpers<FormData>) => {
      const result = await CreatePost({ variables: values });

      if (createPostError || result.errors) {
        setDisplayInnerError(true);
        return;
      }
      if (result.data?.createPost) {
        router.push("/");
      }
    },
    [CreatePost, setDisplayInnerError, router]
  );

  const classes = useStyles();
  return (
    <Formik
      initialValues={{ title: "", text: "" }}
      validationSchema={Yup.object({
        title: Yup.string().required("Required"),
        text: Yup.string().required("Required"),
      })}
      onSubmit={onCreatePost}
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
                name="title"
                type="text"
                label="TITLE"
              />
            </Grid>
            <Grid item className={classes.formItem}>
              <Field
                component={TextAreaField}
                type="textarea"
                label="TEXT"
                name="text"
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
                Post
              </Button>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};
export default CreatePost;
