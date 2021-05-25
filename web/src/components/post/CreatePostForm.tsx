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
import { convertToRaw, EditorState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import { Field, Form, Formik, FormikHelpers } from "formik";
import { useRouter } from "next/router";
import React, { useCallback, useState } from "react";
import * as Yup from "yup";
import {
  RegularPostDetailFragmentDoc,
  useCreatePostMutation,
} from "../../generated/graphql";
import { useIsAuth } from "../../utils/hooks/useIsAuth";
import { TextInputField } from "../InputField";
import PostRichEditor from "./post-editor/PostRichEditor";

interface FormData {
  title: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    form: {
      display: "flex",
      justifyContent: "center",
      width: "100%",
    },
    formContainer: {
      width: "calc(100% - 16px)",
    },
    formItem: {
      width: "100%",
    },
  })
);

const CreatePost = () => {
  const [createPost, { error: createPostError }] = useCreatePostMutation({
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
                fragment: RegularPostDetailFragmentDoc,
                fragmentName: "RegularPostDetail",
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
  const { checkIsAuth } = useIsAuth();

  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const onCreatePost = useCallback(
    async ({ title }: FormData, actions: FormikHelpers<FormData>) => {
      if (!checkIsAuth()) return;
      const postDetail = draftToHtml(
        convertToRaw(editorState.getCurrentContent())
      );

      console.log(postDetail);
      const result = await createPost({
        variables: { title, text: postDetail },
      });
      console.log(result);

      if (createPostError || result.errors) {
        setDisplayInnerError(true);
        return;
      }
      if (result.data?.createPost) {
        router.push("/");
      }
    },
    [createPost, setDisplayInnerError, router, editorState, checkIsAuth]
  );

  const classes = useStyles();
  return (
    <Formik
      initialValues={{ title: "" }}
      validationSchema={Yup.object({
        title: Yup.string().required("Required"),
        // t: Yup.string().required("Required"),
      })}
      onSubmit={onCreatePost}
    >
      {({ submitForm, isSubmitting }) => (
        <Form className={classes.form}>
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
              <PostRichEditor {...{ editorState, setEditorState }} />
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
