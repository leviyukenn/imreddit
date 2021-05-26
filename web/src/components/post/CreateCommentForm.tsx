import { Reference } from "@apollo/client";
import {
  Box,
  Button,
  createStyles,
  makeStyles,
  Theme,
} from "@material-ui/core";
import { convertToRaw, EditorState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import { FormikHelpers } from "formik";
import { useRouter } from "next/router";
import React, { useCallback, useState } from "react";
import {
  RegularPostDetailFragmentDoc,
  useCreatePostMutation,
} from "../../generated/graphql";
import { useIsAuth } from "../../utils/hooks/useIsAuth";
import CommentRichEditor from "./post-editor/CommentRichEditor";

interface FormData {
  title: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    form: {
      position: "relative",
    },
    commentButton: {
      position: "absolute",
      right: 0,
      bottom: 0,
      zIndex: 1000,
    },
  })
);

const CreateComment = () => {
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

      const result = await createPost({
        variables: { title, text: postDetail },
      });

      if (createPostError || result.errors) {
        setDisplayInnerError(true);
        return;
      }
    },
    [createPost, setDisplayInnerError, router, editorState, checkIsAuth]
  );

  const classes = useStyles();
  return (
    <Box className={classes.form}>
      <CommentRichEditor {...{ editorState, setEditorState }} />
      <Button
        variant="contained"
        color="primary"
        // disabled={isSubmitting}
        // onClick={submitForm}
        className={classes.commentButton}
      >
        Post
      </Button>
    </Box>
  );
};
export default CreateComment;
