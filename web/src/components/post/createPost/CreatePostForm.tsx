import {
  Button,
  createStyles,
  Grid,
  LinearProgress,
  makeStyles,
  Theme,
} from "@material-ui/core";
import { EditorState } from "draft-js";
import { Field, Form, Formik, FormikHelpers } from "formik";
import React, { useCallback, useState } from "react";
import * as Yup from "yup";
import { useCreateImagePost } from "../../../graphql/hooks/useCreateImagePost";
import { useCreateTextPost } from "../../../graphql/hooks/useCreateTextPost";
import { TextInputField } from "../../InputField";
import { PostType, UploadedImage } from "../../types/types";
import ImagePostEditor from "./postEditor/ImagePostEditor";
import PostEditor from "./postEditor/PostEditor";

interface FormData {
  title: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    form: {
      display: "flex",
      justifyContent: "center",
      width: "100%",
      marginTop: 20,
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
  const {
    createTextPost,
    loading: createTextPostLoading,
  } = useCreateTextPost();
  const {
    createImagePost,
    loading: createImagePostLoading,
  } = useCreateImagePost();

  const [getPostDetailCallback, setGetPostDetailCallback] = useState<
    () => string
  >(() => () => "");
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onCreatePost = useCallback(
    async ({ title }: FormData, actions: FormikHelpers<FormData>) => {
      setIsSubmitting(true);
      let success: boolean;
      if (postType === PostType.TEXT_POST) {
        const postDetail = getPostDetailCallback();

        success = await createTextPost({
          title,
          text: postDetail,
          communityId,
        });
      } else {
        success = await createImagePost({
          communityId,
          title,
          images: uploadedImages,
        });
      }
      if (success) {
        actions.resetForm();
      }
      setIsSubmitting(false);
    },
    [getPostDetailCallback, postType, uploadedImages, communityId]
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
      {({ submitForm }) => (
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
