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
import { EditorState } from "draft-js";
import { Field, Form, Formik, FormikHelpers } from "formik";
import { useRouter } from "next/router";
import React, { useCallback, useState } from "react";
import * as Yup from "yup";
import {
  CreatePostMutationVariables,
  RegularPostDetailFragmentDoc,
  useCreatePostMutation,
} from "../../generated/graphql";
import { createPostDetailPageLink } from "../../utils/links";
import { useIsAuth } from "../../utils/hooks/useIsAuth";
import { TextInputField } from "../InputField";
import { PostType, UploadedImage } from "../types/types";
import ImagePostEditor from "./post-editor/ImagePostEditor";
import PostEditor from "./post-editor/PostEditor";

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

interface CreatePostFormProps {
  postType: PostType;
  communityId: string;
}

const CreatePost = ({ postType, communityId }: CreatePostFormProps) => {
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

  const [getPostDetailCallback, setGetPostDetailCallback] = useState<
    () => string
  >(() => () => "");
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);

  const onCreatePost = useCallback(
    async ({ title }: FormData, actions: FormikHelpers<FormData>) => {
      if (!checkIsAuth()) return;
      let inputVariable: CreatePostMutationVariables;

      if (postType === PostType.TEXT_POST) {
        const postDetail = getPostDetailCallback();
        inputVariable = {
          communityId,
          title,
          text: postDetail,
        };
      } else {
        inputVariable = { communityId, title, images: uploadedImages };
      }

      const result = await createPost({
        variables: inputVariable,
      });

      if (createPostError || result.errors) {
        setDisplayInnerError(true);
        return;
      }
      if (result.data?.createPost) {
        router.push(
          createPostDetailPageLink(
            result.data.createPost.community.name,
            result.data.createPost.id
          )
        );
      }
    },
    [
      createPost,
      setDisplayInnerError,
      router,
      checkIsAuth,
      getPostDetailCallback,
      postType,
      uploadedImages,
      communityId,
    ]
  );

  const classes = useStyles();
  return (
    <Formik
      initialValues={{ title: "" }}
      validationSchema={Yup.object({
        title: Yup.string().required("Required"),
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
              {postType === PostType.TEXT_POST ? (
                <PostEditor
                  {...{ setGetPostDetailCallback, setEditorState, editorState }}
                />
              ) : postType === PostType.IMAGE_POST ? (
                <ImagePostEditor {...{ uploadedImages, setUploadedImages }} />
              ) : null}
            </Grid>
            {isSubmitting && <LinearProgress />}
            <br />
            <Grid item className={classes.formItem}>
              <Button
                variant="contained"
                color="primary"
                disabled={isSubmitting || !communityId}
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
