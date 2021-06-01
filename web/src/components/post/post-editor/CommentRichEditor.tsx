import { Reference } from "@apollo/client";
import { Button, createStyles, makeStyles, Theme } from "@material-ui/core";
import { convertToRaw, EditorState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useCallback, useState } from "react";
import { EditorProps } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import {
  RegularPostDetailFragment,
  RegularPostDetailFragmentDoc,
  useCreatePostMutation,
} from "../../../generated/graphql";
import { useIsAuth } from "../../../utils/hooks/useIsAuth";
import { createCommentToolbarConfig } from "./ToolbarComponents";
const Editor = dynamic<EditorProps>(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrapper: {
      border: "1px solid #EDEFF1",
      display: "flex",
      flexDirection: "column-reverse",

      borderRadius: "4px",
    },
    editor: {
      paddingLeft: "10px",
      minHeight: "200px",
    },
    toolbar: {
      backgroundColor: "#F6F7F8",
      position: "sticky",
      display: "flex",
      alignItems: "center",
      padding: 0,
      top: "64px",
      zIndex: 1000,
      marginBottom: 0,
    },
    commentButton: {
      //   position: "absolute",
      borderRadius: "9999px",
      marginLeft: "auto",
      marginRight: "20px",
      height: "24px",
      //   right: "20px",
      //   bottom: "10px",
      //   zIndex: 1000,
    },
  })
);

const CommentButton = ({
  replyTo,
  editorState,
  setEditorState,
}: {
  replyTo: RegularPostDetailFragment;
  editorState: EditorState;
  setEditorState: Dispatch<SetStateAction<EditorState>>;
}) => {
  const [createPost, { error: createPostError }] = useCreatePostMutation({
    update(cache, { data: createPostResponse }) {
      cache.modify({
        id: cache.identify(replyTo),
        fields: {
          children(existingPostRefs: Reference[]) {
            const commentRef = cache.writeFragment({
              fragment: RegularPostDetailFragmentDoc,
              data: createPostResponse?.createPost,
              fragmentName: "RegularPostDetail",
            });

            return [commentRef, ...existingPostRefs];
          },
        },
      });
    },
  });
  const [displayInnerError, setDisplayInnerError] = useState<boolean>(false);

  const router = useRouter();
  const { checkIsAuth } = useIsAuth();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onCreatePost = useCallback(async () => {
    try {
      setIsSubmitting(true);
      if (!checkIsAuth()) return;
      const postDetail = draftToHtml(
        convertToRaw(editorState.getCurrentContent())
      );

      const result = await createPost({
        variables: { text: postDetail, parentId: replyTo.id },
      });

      if (createPostError || result.errors) {
        setDisplayInnerError(true);
        return;
      }
    } catch (err) {
      alert(err);
    } finally {
      setEditorState(EditorState.createEmpty());
      setIsSubmitting(false);
    }
  }, [
    createPost,
    setDisplayInnerError,
    router,
    editorState,
    checkIsAuth,
    replyTo,
  ]);

  const classes = useStyles();
  return (
    <Button
      variant="contained"
      color="primary"
      size="small"
      onClick={onCreatePost}
      className={classes.commentButton}
      disabled={isSubmitting || !editorState.getCurrentContent().hasText()}
    >
      Comment
    </Button>
  );
};

export default function RichTextEditor({
  replyTo,
}: {
  replyTo: RegularPostDetailFragment;
}) {
  const classes = useStyles();
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  return (
    <div>
      {typeof window !== "undefined" ? (
        <Editor
          editorState={editorState}
          editorClassName={classes.editor}
          wrapperClassName={classes.wrapper}
          toolbarClassName={classes.toolbar}
          onEditorStateChange={setEditorState}
          toolbar={createCommentToolbarConfig}
          placeholder="What are your thoughts?"
          toolbarCustomButtons={[
            <CommentButton
              replyTo={replyTo}
              editorState={editorState}
              setEditorState={setEditorState}
            />,
          ]}
        />
      ) : null}
    </div>
  );
}
